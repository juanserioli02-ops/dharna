// DHARMA — Editor de bloques reutilizable (bloques simples, por niveles y comentario)
// Soporta DIVISORES de grupo dentro de un bloque: { divisor: "Grupo 1" }.
// Los grupos corren en paralelo (estaciones) y se muestran juntos en la misma slide.
const NIVELES_DEFAULT = ["GUERRERO", "NINJA", "MAGO", "MAESTRO"];
// catálogo (solo lectura acá: el catálogo se edita desde la Biblioteca de Ejercicios)
const EB_CAT_EJ = () => { try { const v = localStorage.getItem("dharma-ejercicios-v2"); if (v) return JSON.parse(v); } catch (e) {} return (window.DHARMA_DATA.ejercicios || []); };
const EB_CAT_SEC = () => { try { const v = localStorage.getItem("dharma-ej-secciones-v2"); if (v) return JSON.parse(v); } catch (e) {} return (window.DHARMA_DATA.ejerciciosSecciones || []); };
const EB_GUARDAR_EJ = (lista) => { try { localStorage.setItem("dharma-ejercicios-v2", JSON.stringify(lista)); } catch (e) {} };
// normaliza para comparar nombres sin importar acentos/mayúsculas
const ebNorm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim();

function EditorBloques({ bloques, onChange }) {
  const [picker, setPicker] = React.useState(null); // { i, tipo: "simple" | "niveles" }
  const setB = (next) => onChange(next);
  const updBloque = (i, patch) => setB(bloques.map((b, x) => (x === i ? { ...b, ...patch } : b)));
  const delBloque = (i) => setB(bloques.filter((_, x) => x !== i));
  const addBloque = () => setB([...bloques, { nombre: "Nuevo bloque", duracion: 10, items: [{ ej: "", dosis: "" }] }]);

  const toggleNiveles = (i) => {
    const b = bloques[i];
    if (b.niveles) {
      const items = b.items.filter((it) => it.comun == null && it.divisor == null).map((it) => ({ ej: (it.variantes && it.variantes[0]) || "", dosis: "" }));
      updBloque(i, { niveles: undefined, dosisGlobal: undefined, items: items.length ? items : [{ ej: "", dosis: "" }] });
    } else {
      const niveles = [...NIVELES_DEFAULT];
      const items = b.items.filter((it) => it.divisor == null).map((it) => ({ variantes: niveles.map((_, k) => (k === 0 ? (it.ej || "") : "")) }));
      updBloque(i, { niveles, dosisGlobal: "", items: items.length ? items : [{ variantes: niveles.map(() => "") }] });
    }
  };

  const updNivel = (i, k, val) => { const niv = [...bloques[i].niveles]; niv[k] = val; updBloque(i, { niveles: niv }); };
  const addNivel = (i) => {
    const b = bloques[i]; if (b.niveles.length >= 5) return;
    const niv = [...b.niveles, "NIVEL " + (b.niveles.length + 1)];
    const items = b.items.map((it) => (it.comun != null || it.divisor != null ? it : { variantes: [...it.variantes, ""] }));
    updBloque(i, { niveles: niv, items });
  };
  const delNivel = (i, k) => {
    const b = bloques[i]; if (b.niveles.length <= 2) return;
    const niv = b.niveles.filter((_, x) => x !== k);
    const items = b.items.map((it) => (it.comun != null || it.divisor != null ? it : { variantes: it.variantes.filter((_, x) => x !== k) }));
    updBloque(i, { niveles: niv, items });
  };

  const addItem = (i) => {
    const b = bloques[i];
    const nuevo = b.niveles ? { variantes: b.niveles.map(() => "") } : { ej: "", dosis: "" };
    const com = b.items.filter((it) => it.comun != null);
    const resto = b.items.filter((it) => it.comun == null);
    updBloque(i, { items: [...resto, nuevo, ...com] });
  };
  const updItem = (i, j, patch) => updBloque(i, { items: bloques[i].items.map((it, x) => (x === j ? { ...it, ...patch } : it)) });
  const updVariante = (i, j, k, val) => { const v = [...bloques[i].items[j].variantes]; v[k] = val; updItem(i, j, { variantes: v }); };
  const delItem = (i, j) => updBloque(i, { items: bloques[i].items.filter((_, x) => x !== j) });

  // partir: inserta un divisor de grupo antes de la posición j (índice real en items)
  const partirEnPos = (i, j) => {
    const b = bloques[i];
    const items = [...b.items];
    const hayDiv = items.some((it) => it.divisor != null);
    const nGrupos = items.filter((it) => it.divisor != null).length;
    items.splice(j, 0, { divisor: "Grupo " + (hayDiv ? nGrupos + 1 : 2) });
    if (!hayDiv) {
      const firstPos = items.findIndex((it) => it.comun == null && it.divisor == null);
      items.splice(firstPos, 0, { divisor: "Grupo 1" });
    }
    updBloque(i, { items });
  };
  const updDivisor = (i, j, val) => updItem(i, j, { divisor: val });
  const delDivisor = (i, j) => {
    const b = bloques[i];
    let items = b.items.filter((_, x) => x !== j);
    // si queda un solo divisor, quitarlo también (el bloque vuelve a no tener grupos)
    if (items.filter((it) => it.divisor != null).length <= 1) items = items.filter((it) => it.divisor == null);
    updBloque(i, { items });
  };

  const getComentario = (b) => { const c = b.items.find((it) => it.comun != null); return c ? c.comun : ""; };
  const setComentario = (i, val) => {
    const b = bloques[i];
    const sinCom = b.items.filter((it) => it.comun == null);
    updBloque(i, { items: val.trim() ? [...sinCom, { comun: val }] : sinCom });
  };

  // agregar ejercicio copiándolo del catálogo (copia: editar acá no toca el catálogo)
  const agregarDesdeCat = (i, ex) => {
    const b = bloques[i];
    const com = b.items.filter((it) => it.comun != null);
    const resto = b.items.filter((it) => it.comun == null);
    let nuevo;
    if (b.niveles) {
      const variantes = b.niveles.map((_, k) => (ex.niveles && ex.niveles[k]) ? ex.niveles[k] : (k === 0 ? ex.nombre : ""));
      nuevo = { variantes };
    } else {
      nuevo = { ej: ex.nombre, nota: ex.nota || "", dosis: "" };
    }
    updBloque(i, { items: [...resto, nuevo, ...com] });
  };

  // divisor editable (barra de grupo), reutilizado en ambas variantes
  const DivisorFila = (i, j, it) => (
    <div className="ed-divisor" key={j}>
      <span className="ed-divisor-icono">▸</span>
      <input value={it.divisor} placeholder="Nombre del grupo / estación" onChange={(e) => updDivisor(i, j, e.target.value)}></input>
      <button className="btn-icono borrar" title="Quitar divisor" onClick={() => delDivisor(i, j)}><IconX></IconX></button>
    </div>
  );

  return (
    <div className="ed-bloques">
      {bloques.map((b, i) => {
        // filas visibles = ejercicios + divisores, en orden; el comentario va aparte
        const visibles = b.items.map((it, j) => ({ it, j })).filter((o) => o.it.comun == null);
        let ejerciciosVistos = 0;
        return (
          <div className="bloque editable" key={i}>
            <div className="bloque-cabecera edit">
              <span className="bloque-num">{String(i + 1).padStart(2, "0")}</span>
              <input className="inp-bloque-nombre" value={b.nombre} placeholder="Nombre del bloque" onChange={(e) => updBloque(i, { nombre: e.target.value })}></input>
              <button className={"toggle-niveles" + (b.niveles ? " on" : "")} onClick={() => toggleNiveles(i)} title="Alternar bloque por niveles">
                {b.niveles ? <><UIIcon fill sw={0}><circle cx="12" cy="12" r="6"></circle></UIIcon> Por niveles</> : <><UIIcon><circle cx="12" cy="12" r="6"></circle></UIIcon> Por niveles</>}
              </button>
              <span className="inp-dur-wrap">
                <input className="inp-dur" type="number" min="0" value={b.duracion} onChange={(e) => updBloque(i, { duracion: e.target.value === "" ? "" : Number(e.target.value) })}></input>′
              </span>
              <button className="btn-icono borrar" title="Eliminar bloque" onClick={() => delBloque(i)}><IconX></IconX></button>
            </div>

            {b.niveles ? (
              <div className="ed-niveles">
                <div className="ed-niveles-cab">
                  <span className="ed-niveles-titulo">Niveles</span>
                  <input className="inp-dosis-global" value={b.dosisGlobal || ""} placeholder="Dosis global (ej: 8–12 reps)" onChange={(e) => updBloque(i, { dosisGlobal: e.target.value })}></input>
                </div>
                <div className="ed-niveles-nombres">
                  {b.niveles.map((nv, k) => (
                    <div className="ed-nivel-nombre" key={k}>
                      <input value={nv} onChange={(e) => updNivel(i, k, e.target.value)}></input>
                      {b.niveles.length > 2 ? <button className="btn-icono borrar" title="Quitar nivel" onClick={() => delNivel(i, k)}><IconX></IconX></button> : null}
                    </div>
                  ))}
                  {b.niveles.length < 5 ? <button className="btn-mini" onClick={() => addNivel(i)}>+ Nivel</button> : null}
                </div>
                <div className="ed-variantes">
                  {visibles.map(({ it, j }) => {
                    if (it.divisor != null) return DivisorFila(i, j, it);
                    const esPrimera = ejerciciosVistos === 0; ejerciciosVistos++;
                    return (
                      <React.Fragment key={j}>
                        {!esPrimera ? <button className="ed-partir" onClick={() => partirEnPos(i, j)} title="Partir el bloque en grupos paralelos"><span>✂ partir en grupo</span></button> : null}
                        <div className="ed-variante-fila" style={{ gridTemplateColumns: `repeat(${b.niveles.length}, 1fr) 28px` }}>
                          {it.variantes.map((v, k) => (
                            <input key={k} value={v} placeholder={b.niveles[k]} onChange={(e) => updVariante(i, j, k, e.target.value)}></input>
                          ))}
                          <button className="btn-icono borrar" title="Quitar fila" onClick={() => delItem(i, j)}><IconX></IconX></button>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  <button className="btn-agregar-item" onClick={() => addItem(i)}>+ Ejercicio (fila)</button>
                  <button className="btn-agregar-item cat" onClick={() => setPicker({ i, tipo: "niveles" })}>+ del catálogo</button>
                </div>
                <input className="inp-comentario" value={getComentario(b)} placeholder="Comentario del bloque (opcional)" onChange={(e) => setComentario(i, e.target.value)}></input>
              </div>
            ) : (
              <div className="items-edit">
                {visibles.map(({ it, j }) => {
                  if (it.divisor != null) return DivisorFila(i, j, it);
                  const esPrimera = ejerciciosVistos === 0; ejerciciosVistos++;
                  return (
                    <React.Fragment key={j}>
                      {!esPrimera ? <button className="ed-partir" onClick={() => partirEnPos(i, j)} title="Partir el bloque en grupos paralelos"><span>✂ partir en grupo</span></button> : null}
                      <div className="item-edit">
                        <div className="item-campos">
                          <EjAutocomplete
                            valor={it.ej || ""}
                            onCambiar={(v) => updItem(i, j, { ej: v })}
                          ></EjAutocomplete>
                          <input className="inp-nota" value={it.nota || ""} placeholder="Nota / aclaración (opcional)" onChange={(e) => updItem(i, j, { nota: e.target.value })}></input>
                        </div>
                        <input className="inp-dosis" value={it.dosis || ""} placeholder="4×8" onChange={(e) => updItem(i, j, { dosis: e.target.value })}></input>
                        <button className="btn-icono borrar" title="Eliminar ejercicio" onClick={() => delItem(i, j)}><IconX></IconX></button>
                      </div>
                    </React.Fragment>
                  );
                })}
                <button className="btn-agregar-item" onClick={() => addItem(i)}>+ Ejercicio</button>
                <button className="btn-agregar-item cat" onClick={() => setPicker({ i, tipo: "simple" })}>+ del catálogo</button>
              </div>
            )}
          </div>
        );
      })}
      <button className="btn-agregar-bloque" onClick={addBloque}>+ Agregar bloque</button>
      {picker ? (
        <CatalogoPicker soloNiveles={picker.tipo === "niveles"} onElegir={(ex) => { agregarDesdeCat(picker.i, ex); setPicker(null); }} onCerrar={() => setPicker(null)}></CatalogoPicker>
      ) : null}
    </div>
  );
}

/* ---------- selector de ejercicios del catálogo ---------- */
function CatalogoPicker({ soloNiveles, onElegir, onCerrar }) {
  const [q, setQ] = React.useState("");
  const ejercicios = EB_CAT_EJ();
  const secciones = EB_CAT_SEC();
  const secDe = (id) => secciones.find((s) => s.id === id) || { nombre: "—" };
  const term = q.trim().toLowerCase();
  const lista = ejercicios.filter((e) => !term || e.nombre.toLowerCase().includes(term));
  // agrupar por sección, respetando orden de secciones
  const grupos = secciones.map((s) => ({ s, items: lista.filter((e) => e.seccion === s.id) })).filter((g) => g.items.length);
  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal" onClick={(e) => e.stopPropagation()} style={{ width: 600, maxHeight: "86vh" }}>
        <header className="mb-modal-cab">
          <div><div className="mb-modal-eyebrow">Biblioteca de ejercicios</div><h2>Elegir ejercicio</h2></div>
          <button className="btn-icono" onClick={onCerrar}><IconX></IconX></button>
        </header>
        <div className="mb-modal-cuerpo">
          <label className="buscador" style={{ width: "100%" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
            <input autoFocus type="search" placeholder="Buscar ejercicio…" value={q} onChange={(e) => setQ(e.target.value)}></input>
          </label>
          {soloNiveles ? <div className="cat-pick-hint">Si el ejercicio tiene progresión cargada, se copian sus 4 niveles. Si no, queda en el primer nivel para completar.</div> : null}
          <div className="cat-pick-lista">
            {grupos.length === 0 ? <div className="ejb-vacio">Sin resultados.</div> : grupos.map((g) => (
              <div className="cat-pick-grupo" key={g.s.id}>
                <div className="cat-pick-sec">{g.s.nombre}</div>
                {g.items.map((e) => {
                  const tieneProg = e.niveles && e.niveles.some((x) => x);
                  return (
                    <button className="cat-pick-ej" key={e.id} onClick={() => onElegir(e)}>
                      <span className="cat-pick-nom">{e.nombre}</span>
                      {tieneProg ? <span className="cat-pick-prog">{e.niveles.filter((x) => x).length} niveles</span> : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- input de ejercicio con autocompletado en vivo + alta rápida ---------- */
function EjAutocomplete({ valor, onCambiar }) {
  const [abierto, setAbierto] = React.useState(false);
  const [altaAbierta, setAltaAbierta] = React.useState(false);
  const [seccionAlta, setSeccionAlta] = React.useState("");
  const boxRef = React.useRef(null);

  const term = valor.trim();
  const ejercicios = term.length >= 2 ? EB_CAT_EJ() : [];
  const secciones = EB_CAT_SEC();
  const secDe = (id) => (secciones.find((s) => s.id === id) || { nombre: "—" }).nombre;
  const coincidencias = term.length >= 2
    ? ejercicios.filter((e) => ebNorm(e.nombre).includes(ebNorm(term))).slice(0, 8)
    : [];
  const existeExacto = term.length > 0 && ejercicios.some((e) => ebNorm(e.nombre) === ebNorm(term));

  React.useEffect(() => {
    const fuera = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) { setAbierto(false); setAltaAbierta(false); } };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, []);

  const elegir = (nombre) => { onCambiar(nombre); setAbierto(false); };

  const confirmarAlta = () => {
    if (!seccionAlta) return;
    const lista = EB_CAT_EJ();
    const nuevo = { id: "ej" + Date.now(), seccion: seccionAlta, nombre: term };
    EB_GUARDAR_EJ([...lista, nuevo]);
    window.dharmaToast && window.dharmaToast("Agregado a la Biblioteca de ejercicios", "ok");
    setAltaAbierta(false); setAbierto(false);
  };

  return (
    <div className="ej-autocomp" ref={boxRef}>
      <input
        className="inp-ej"
        value={valor}
        placeholder="Ejercicio"
        onChange={(e) => { onCambiar(e.target.value); setAbierto(true); setAltaAbierta(false); }}
        onFocus={() => setAbierto(true)}
      ></input>
      {abierto && term.length >= 2 ? (
        <div className="ej-autocomp-drop">
          {coincidencias.length > 0 ? coincidencias.map((e) => (
            <button key={e.id} className="ej-autocomp-item" onMouseDown={() => elegir(e.nombre)}>
              <span className="ej-autocomp-nom">{e.nombre}</span>
              <span className="ej-autocomp-sec">{secDe(e.seccion)}</span>
            </button>
          )) : (
            <div className="ej-autocomp-sin">Sin coincidencias en la Biblioteca</div>
          )}
          {!existeExacto ? (
            altaAbierta ? (
              <div className="ej-autocomp-alta" onMouseDown={(e) => e.stopPropagation()}>
                <span>Agregar “{term}” a…</span>
                <select value={seccionAlta} onChange={(e) => setSeccionAlta(e.target.value)}>
                  <option value="">Elegir sección…</option>
                  {secciones.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                </select>
                <button className="btn-primario chico" disabled={!seccionAlta} onClick={confirmarAlta}>Guardar</button>
              </div>
            ) : (
              <button className="ej-autocomp-nueva" onMouseDown={() => setAltaAbierta(true)}>+ Agregar “{term}” a la Biblioteca</button>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { EditorBloques, NIVELES_DEFAULT, EjAutocomplete });
