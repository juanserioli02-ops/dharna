// DHARMA — Editor de manuales (crear / editar): metadata + módulos + bloques de contenido.
// Los bloques salen de un set fijo (paleta), por eso todos los manuales quedan en línea.

const TIPOS_BLOQUE = [
  { tipo: "titulo", label: "Subtítulo" },
  { tipo: "texto", label: "Párrafo" },
  { tipo: "clave", label: "Concepto clave" },
  { tipo: "lista", label: "Lista" },
  { tipo: "pasos", label: "Pasos" },
  { tipo: "cita", label: "Cita" },
  { tipo: "imagen", label: "Imagen" },
  { tipo: "video", label: "Video" },
  { tipo: "tabla", label: "Tabla" },
  { tipo: "regla", label: "Regla" },
  { tipo: "preguntas", label: "Preguntas" },
  { tipo: "resumen", label: "Para recordar" },
];

function bloqueVacio(tipo, manId, modId) {
  const uid = manId + "_" + modId + "_" + Math.random().toString(36).slice(2, 7);
  switch (tipo) {
    case "titulo": return { tipo, texto: "" };
    case "texto": return { tipo, texto: "", intro: false };
    case "clave": return { tipo, texto: "" };
    case "lista": return { tipo, items: ["", ""] };
    case "pasos": return { tipo, items: [{ titulo: "", texto: "" }] };
    case "cita": return { tipo, texto: "", autor: "" };
    case "imagen": return { tipo, slot: uid, epigrafe: "" };
    case "video": return { tipo, epigrafe: "" };
    case "tabla": return { tipo, columnas: ["", ""], filas: [["", ""]] };
    case "regla": return { tipo, numero: 1, texto: "", autor: "" };
    case "preguntas": return { tipo, titulo: "Para pensar", items: ["", ""] };
    case "resumen": return { tipo, items: ["", ""] };
    default: return { tipo };
  }
}

function manualVacio(categoriaId) {
  const id = "man" + Date.now();
  return {
    id, categoria: categoriaId || "fundamentos", titulo: "", descripcion: "",
    autor: "", actualizado: "", visibleAlumnos: false, custom: true,
    modulos: [{ id: "mod1", titulo: "Módulo 1", lectura: 5, bloques: [] }]
  };
}

/* ---------- editor de un bloque (según tipo) ---------- */
function BloqueEditor({ b, onChange }) {
  const set = (patch) => onChange({ ...b, ...patch });
  const setItem = (i, v) => { const items = [...b.items]; items[i] = v; set({ items }); };
  const setPaso = (i, patch) => { const items = b.items.map((x, k) => k === i ? { ...x, ...patch } : x); set({ items }); };

  switch (b.tipo) {
    case "titulo":
      return <input className="be-inp grande" value={b.texto} placeholder="Subtítulo de sección" onChange={(e) => set({ texto: e.target.value })}></input>;
    case "texto":
      return (
        <div className="be-col">
          <textarea className="be-inp" rows={3} value={b.texto} placeholder="Texto del párrafo…" onChange={(e) => set({ texto: e.target.value })}></textarea>
          <label className="be-check"><input type="checkbox" checked={!!b.intro} onChange={(e) => set({ intro: e.target.checked })}></input> Destacar como introducción</label>
        </div>
      );
    case "clave":
      return <textarea className="be-inp" rows={2} value={b.texto} placeholder="La idea clave que el coach debe recordar…" onChange={(e) => set({ texto: e.target.value })}></textarea>;
    case "lista":
    case "resumen":
      return (
        <div className="be-col">
          {b.items.map((x, i) => (
            <div className="be-fila" key={i}>
              <span className="be-bullet">{b.tipo === "resumen" ? "✓" : "•"}</span>
              <input className="be-inp" value={x} placeholder="Punto…" onChange={(e) => setItem(i, e.target.value)}></input>
              <button className="btn-icono borrar" title="Quitar" onClick={() => set({ items: b.items.filter((_, k) => k !== i) })}><IconX></IconX></button>
            </div>
          ))}
          <button className="btn-mini" onClick={() => set({ items: [...b.items, ""] })}>+ Punto</button>
        </div>
      );
    case "preguntas":
      return (
        <div className="be-col">
          <input className="be-inp" value={b.titulo || ""} placeholder="Título (ej: Para pensar)" onChange={(e) => set({ titulo: e.target.value })}></input>
          {b.items.map((x, i) => {
            const it = (typeof x === "string") ? { q: x } : x;
            const esOpcion = Array.isArray(it.opciones);
            const setIt = (patch) => setItem(i, { ...it, ...patch });
            const toggleTipo = () => setItem(i, esOpcion ? { q: it.q || "", respuesta: "" } : { q: it.q || "", opciones: ["", ""], correcta: 0, explicacion: "" });
            return (
              <div className="be-preg" key={i}>
                <div className="be-preg-cab">
                  <span className="be-bullet">{i + 1}</span>
                  <input className="be-inp" value={it.q || ""} placeholder="Pregunta…" onChange={(e) => setIt({ q: e.target.value })}></input>
                  <div className="be-preg-tipo">
                    <button className={!esOpcion ? "on" : ""} onClick={() => { if (esOpcion) toggleTipo(); }} title="Reflexión">Reflexión</button>
                    <button className={esOpcion ? "on" : ""} onClick={() => { if (!esOpcion) toggleTipo(); }} title="Opción múltiple">Opción</button>
                  </div>
                  <button className="btn-icono borrar" title="Quitar pregunta" onClick={() => set({ items: b.items.filter((_, k) => k !== i) })}><IconX></IconX></button>
                </div>
                {esOpcion ? (
                  <div className="be-preg-cuerpo">
                    {it.opciones.map((op, k) => (
                      <div className="be-fila" key={k}>
                        <button className={"be-correcta" + (it.correcta === k ? " on" : "")} title="Marcar como correcta" onClick={() => setIt({ correcta: k })}>{it.correcta === k ? "✓" : String.fromCharCode(65 + k)}</button>
                        <input className="be-inp" value={op} placeholder={"Opción " + String.fromCharCode(65 + k)} onChange={(e) => { const opciones = it.opciones.map((o, y) => y === k ? e.target.value : o); setIt({ opciones }); }}></input>
                        <button className="btn-icono borrar" title="Quitar opción" disabled={it.opciones.length <= 2} onClick={() => setIt({ opciones: it.opciones.filter((_, y) => y !== k), correcta: Math.min(it.correcta, it.opciones.length - 2) })}><IconX></IconX></button>
                      </div>
                    ))}
                    <button className="btn-mini" onClick={() => setIt({ opciones: [...it.opciones, ""] })}>+ Opción</button>
                    <input className="be-inp" value={it.explicacion || ""} placeholder="Explicación (se muestra al responder)" onChange={(e) => setIt({ explicacion: e.target.value })}></input>
                  </div>
                ) : (
                  <div className="be-preg-cuerpo">
                    <textarea className="be-inp" rows={2} value={it.respuesta || ""} placeholder="Respuesta sugerida (opcional → botón 'Revelar respuesta')" onChange={(e) => setIt({ respuesta: e.target.value })}></textarea>
                  </div>
                )}
              </div>
            );
          })}
          <button className="btn-mini" onClick={() => set({ items: [...b.items, { q: "", respuesta: "" }] })}>+ Pregunta</button>
        </div>
      );
    case "regla":
      return (
        <div className="be-col">
          <div className="be-fila">
            <span className="be-bullet">#</span>
            <input className="be-inp" type="number" min="1" value={b.numero} placeholder="Nº" onChange={(e) => set({ numero: e.target.value === "" ? "" : Number(e.target.value) })} style={{ maxWidth: 80 }}></input>
            <input className="be-inp" value={b.texto} placeholder="Enunciado de la regla…" onChange={(e) => set({ texto: e.target.value })}></input>
          </div>
          <input className="be-inp" value={b.autor || ""} placeholder="Autor / fuente (opcional)" onChange={(e) => set({ autor: e.target.value })}></input>
        </div>
      );
    case "pasos":
      return (
        <div className="be-col">
          {b.items.map((x, i) => (
            <div className="be-fila" key={i}>
              <span className="be-bullet">{i + 1}</span>
              <input className="be-inp" value={x.titulo} placeholder="Título del paso" onChange={(e) => setPaso(i, { titulo: e.target.value })} style={{ maxWidth: 200 }}></input>
              <input className="be-inp" value={x.texto} placeholder="Descripción" onChange={(e) => setPaso(i, { texto: e.target.value })}></input>
              <button className="btn-icono borrar" title="Quitar" onClick={() => set({ items: b.items.filter((_, k) => k !== i) })}><IconX></IconX></button>
            </div>
          ))}
          <button className="btn-mini" onClick={() => set({ items: [...b.items, { titulo: "", texto: "" }] })}>+ Paso</button>
        </div>
      );
    case "cita":
      return (
        <div className="be-col">
          <textarea className="be-inp" rows={2} value={b.texto} placeholder="Frase a destacar…" onChange={(e) => set({ texto: e.target.value })}></textarea>
          <input className="be-inp" value={b.autor} placeholder="Autor / fuente (opcional)" onChange={(e) => set({ autor: e.target.value })}></input>
        </div>
      );
    case "imagen":
      return (
        <div className="be-col">
          <div className="be-imagen-prev"><image-slot id={b.slot} shape="rounded" radius="2" placeholder="Arrastrá la imagen"></image-slot></div>
          <input className="be-inp" value={b.epigrafe} placeholder="Epígrafe (opcional)" onChange={(e) => set({ epigrafe: e.target.value })}></input>
        </div>
      );
    case "video":
      return <input className="be-inp" value={b.epigrafe} placeholder="Descripción del video (ej: Demo — bisagra de cadera 2:40)" onChange={(e) => set({ epigrafe: e.target.value })}></input>;
    case "tabla":
      return (
        <div className="be-col">
          <div className="be-tabla-edit">
            <div className="be-tabla-fila cab">
              {b.columnas.map((c, k) => (
                <input key={k} className="be-inp" value={c} placeholder={"Col " + (k + 1)} onChange={(e) => { const columnas = [...b.columnas]; columnas[k] = e.target.value; set({ columnas }); }}></input>
              ))}
              <button className="btn-mini" title="Agregar columna" onClick={() => set({ columnas: [...b.columnas, ""], filas: b.filas.map((f) => [...f, ""]) })}>+col</button>
            </div>
            {b.filas.map((f, ri) => (
              <div className="be-tabla-fila" key={ri}>
                {f.map((cel, ci) => (
                  <input key={ci} className="be-inp" value={cel} onChange={(e) => { const filas = b.filas.map((row, x) => x === ri ? row.map((c, y) => y === ci ? e.target.value : c) : row); set({ filas }); }}></input>
                ))}
                <button className="btn-icono borrar" title="Quitar fila" onClick={() => set({ filas: b.filas.filter((_, x) => x !== ri) })}><IconX></IconX></button>
              </div>
            ))}
          </div>
          <button className="btn-mini" onClick={() => set({ filas: [...b.filas, b.columnas.map(() => "")] })}>+ Fila</button>
        </div>
      );
    default: return null;
  }
}

/* ---------- editor de bloques de un módulo ---------- */
function EditorBloquesContenido({ bloques, manId, modId, onChange }) {
  const [paleta, setPaleta] = React.useState(false);
  const add = (tipo) => { onChange([...bloques, bloqueVacio(tipo, manId, modId)]); setPaleta(false); };
  const upd = (i, nb) => onChange(bloques.map((b, x) => x === i ? nb : b));
  const del = (i) => onChange(bloques.filter((_, x) => x !== i));
  const mover = (i, d) => { const j = i + d; if (j < 0 || j >= bloques.length) return; const next = [...bloques]; [next[i], next[j]] = [next[j], next[i]]; onChange(next); };
  const labelDe = (t) => (TIPOS_BLOQUE.find((x) => x.tipo === t) || {}).label || t;

  return (
    <div className="ebc">
      {bloques.map((b, i) => (
        <div className="ebc-bloque" key={i}>
          <div className="ebc-cab">
            <span className="ebc-tipo">{labelDe(b.tipo)}</span>
            <div className="ebc-controles">
              <button className="btn-icono" title="Subir" disabled={i === 0} onClick={() => mover(i, -1)}><UIIcon sw={2}><polyline points="6 14 12 8 18 14"></polyline></UIIcon></button>
              <button className="btn-icono" title="Bajar" disabled={i === bloques.length - 1} onClick={() => mover(i, 1)}><UIIcon sw={2}><polyline points="6 10 12 16 18 10"></polyline></UIIcon></button>
              <button className="btn-icono borrar" title="Eliminar bloque" onClick={() => del(i)}><IconX></IconX></button>
            </div>
          </div>
          <BloqueEditor b={b} onChange={(nb) => upd(i, nb)}></BloqueEditor>
        </div>
      ))}

      {paleta ? (
        <div className="ebc-paleta">
          {TIPOS_BLOQUE.map((t) => (
            <button key={t.tipo} className="ebc-paleta-op" onClick={() => add(t.tipo)}>{t.label}</button>
          ))}
          <button className="ebc-paleta-cerrar" onClick={() => setPaleta(false)}>Cancelar</button>
        </div>
      ) : (
        <button className="btn-agregar-bloque" onClick={() => setPaleta(true)}>+ Agregar bloque de contenido</button>
      )}
    </div>
  );
}

/* ---------- editor del manual completo ---------- */
function ManualEditor({ manual, categorias, modo, onGuardar, onCancelar }) {
  const [m, setM] = React.useState(() => JSON.parse(JSON.stringify(manual)));
  const [modIdx, setModIdx] = React.useState(0);
  const set = (k, v) => setM((p) => ({ ...p, [k]: v }));
  React.useEffect(() => { window.scrollTo(0, 0); }, []);

  const mods = m.modulos;
  const updMod = (i, patch) => set("modulos", mods.map((mo, x) => x === i ? { ...mo, ...patch } : mo));
  const addMod = () => {
    const n = mods.length;
    setM((p) => ({ ...p, modulos: [...p.modulos, { id: "mod" + (n + 1) + Date.now(), titulo: "Módulo " + (n + 1), lectura: 5, bloques: [] }] }));
    setModIdx(n);
  };
  const delMod = (i) => {
    if (mods.length <= 1) return;
    setM((p) => ({ ...p, modulos: p.modulos.filter((_, x) => x !== i) }));
    setModIdx((s) => Math.max(0, s - (i <= s ? 1 : 0)));
  };

  const mod = mods[Math.min(modIdx, mods.length - 1)];
  const valido = m.titulo.trim().length > 0;
  const guardar = () => {
    if (!valido) return;
    onGuardar({
      ...m,
      titulo: m.titulo.trim(),
      descripcion: m.descripcion.trim(),
      autor: m.autor.trim() || "—",
      modulos: mods.map((mo) => ({ ...mo, titulo: mo.titulo.trim() || "Módulo", lectura: Number(mo.lectura) || 0, bloques: mo.bloques || [] }))
    });
  };

  return (
    <main className="contenido" data-screen-label={modo === "nuevo" ? "Nuevo manual" : "Editar manual"}>
      <button className="volver" onClick={onCancelar}>← Cancelar</button>

      <header className="cabecera-editor">
        <h1>{modo === "nuevo" ? "Nuevo manual" : "Editar manual"}</h1>
        <div className="ce-acciones">
          <button className="btn-secundario" onClick={onCancelar}>Cancelar</button>
          <button className="btn-primario" disabled={!valido} onClick={guardar}>{modo === "nuevo" ? "Crear manual" : "Guardar cambios"}</button>
        </div>
      </header>

      <section className="ce-metadata">
        <div className="form-fila-2">
          <label className="campo grande">
            <span>Título del manual *</span>
            <input value={m.titulo} onChange={(e) => set("titulo", e.target.value)} placeholder="Ej: Fundamentos de la fuerza"></input>
          </label>
          <label className="campo">
            <span>Categoría</span>
            <select value={m.categoria} onChange={(e) => set("categoria", e.target.value)}>
              {categorias.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </label>
        </div>
        <label className="campo">
          <span>Descripción</span>
          <textarea value={m.descripcion} rows={2} onChange={(e) => set("descripcion", e.target.value)} placeholder="De qué trata y a quién apunta…"></textarea>
        </label>
        <div className="ce-meta-grid">
          <label className="campo"><span>Autor</span><input value={m.autor} onChange={(e) => set("autor", e.target.value)} placeholder="Nombre"></input></label>
          <label className="campo"><span>Actualizado</span><input value={m.actualizado} onChange={(e) => set("actualizado", e.target.value)} placeholder="Ej: Jun 2026"></input></label>
          <label className="campo" style={{ justifyContent: "flex-end" }}>
            <span>Visibilidad</span>
            <label className="be-check" style={{ paddingTop: 8 }}><input type="checkbox" checked={!!m.visibleAlumnos} onChange={(e) => set("visibleAlumnos", e.target.checked)}></input> Visible para alumnos</label>
          </label>
        </div>
      </section>

      <div className="ce-sesiones-cab">
        <h2 className="ce-subtitulo">Módulos</h2>
      </div>

      <div className="man-edit-tabs">
        {mods.map((mo, i) => (
          <button key={i} className={"met-tab" + (i === modIdx ? " activo" : "")} onClick={() => setModIdx(i)}>
            <span>{String(i + 1).padStart(2, "0")}</span> {mo.titulo || "Módulo"}
          </button>
        ))}
        <button className="met-tab nuevo" onClick={addMod}>+ Módulo</button>
      </div>

      <section className="ce-sesion-edit">
        <div className="form-fila-2">
          <label className="campo grande">
            <span>Título del módulo</span>
            <input value={mod.titulo} onChange={(e) => updMod(modIdx, { titulo: e.target.value })} placeholder="Ej: ¿Qué es la fuerza?"></input>
          </label>
          <label className="campo chico">
            <span>Lectura (min)</span>
            <input type="number" min="0" value={mod.lectura} onChange={(e) => updMod(modIdx, { lectura: e.target.value === "" ? "" : Number(e.target.value) })}></input>
          </label>
        </div>
        {mods.length > 1 ? (
          <button className="btn-secundario peligro" style={{ alignSelf: "flex-start" }} onClick={() => delMod(modIdx)}><IconX></IconX> Eliminar módulo</button>
        ) : null}

        <EditorBloquesContenido bloques={mod.bloques || []} manId={m.id} modId={mod.id} onChange={(bloques) => updMod(modIdx, { bloques })}></EditorBloquesContenido>
      </section>
    </main>
  );
}

Object.assign(window, { ManualEditor, EditorBloquesContenido, BloqueEditor, manualVacio, TIPOS_BLOQUE });
