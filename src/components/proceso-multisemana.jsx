// DHARMA — Proceso: programa de varias semanas con trackeo (S×R / Carga / RPE por semana)

const letra = (i) => String.fromCharCode(65 + i);
const RPE_PROC = ["", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"];

function mkSemanas(sxr, n) {
  return Array.from({ length: n }, () => ({ sxr: sxr || "", kg: "", rpe: "" }));
}

function normalizarProceso(proc) {
  const n = Math.max(1, proc.semanas || 4);
  const sesiones = (proc.sesiones || []).map((s) => ({
    ...s,
    bloques: (s.bloques || []).map((b) => ({
      ...b,
      items: (b.items || []).map((it) => {
        let sem = it.semanas || [];
        if (sem.length < n) {
          const ult = sem.length ? sem[sem.length - 1].sxr : "";
          sem = [...sem, ...Array.from({ length: n - sem.length }, () => ({ sxr: ult, kg: "", rpe: "" }))];
        } else if (sem.length > n) {
          sem = sem.slice(0, n);
        }
        return { ...it, semanas: sem };
      })
    }))
  }));
  return { ...proc, semanas: n, sesiones };
}

// convierte una sesión de la biblioteca en una sesión de proceso trackeable
function plantillaASesion(clase, sesion, nivelPersona, semanas) {
  const nivelIdx = ({ Inicial: 0, Intermedio: 1, Avanzado: 2 })[nivelPersona] || 0;
  const bloques = (sesion.bloques || []).map((b) => {
    let ci = 0;
    const items = [];
    (b.items || []).forEach((it) => {
      if (it.comun != null) return;
      if (b.niveles) {
        const idx = Math.min(nivelIdx, it.variantes.length - 1);
        const ej = it.variantes[idx] || it.variantes.find(Boolean) || "";
        if (!ej) return;
        items.push({ codigo: letra(ci++), ej, semanas: mkSemanas(b.dosisGlobal || "", semanas) });
      } else {
        items.push({ codigo: letra(ci++), ej: it.ej, nota: it.nota || "", semanas: mkSemanas(it.dosis || "", semanas) });
      }
    });
    return { nombre: b.nombre, items };
  }).filter((b) => b.items.length);
  return { nombre: clase.nombre + " · " + sesion.nombre, bloques };
}

function Proceso({ persona, clases, secciones, getSeccionDe, onGuardar, onProyectar }) {
  const inicial = persona.proceso && persona.proceso.sesiones
    ? normalizarProceso(persona.proceso)
    : { nombre: "Proceso de " + persona.nombre.split(" ")[0], objetivo: "", semanas: 4, sesiones: [] };
  const [proc, setProc] = React.useState(inicial);
  const [ses, setSes] = React.useState(0);
  const [semActiva, setSemActiva] = React.useState(0);
  const [plantilla, setPlantilla] = React.useState(false);

  const commit = (next) => { setProc(next); onGuardar(next); };
  const setMeta = (k, v) => commit({ ...proc, [k]: v });

  const n = proc.semanas;
  const sesiones = proc.sesiones;
  const sActual = sesiones[Math.min(ses, sesiones.length - 1)];

  // ---- semanas ----
  const setSemanas = (nuevo) => {
    nuevo = Math.max(1, Math.min(16, nuevo));
    const sesiones2 = sesiones.map((s) => ({
      ...s,
      bloques: s.bloques.map((b) => ({
        ...b,
        items: b.items.map((it) => {
          let sem = it.semanas.slice();
          if (sem.length < nuevo) {
            const ult = sem.length ? sem[sem.length - 1].sxr : "";
            while (sem.length < nuevo) sem.push({ sxr: ult, kg: "", rpe: "" });
          } else sem = sem.slice(0, nuevo);
          return { ...it, semanas: sem };
        })
      }))
    }));
    commit({ ...proc, semanas: nuevo, sesiones: sesiones2 });
    if (semActiva >= nuevo) setSemActiva(nuevo - 1);
  };

  // ---- sesiones ----
  const updSesion = (i, patch) => commit({ ...proc, sesiones: sesiones.map((s, x) => (x === i ? { ...s, ...patch } : s)) });
  const addSesion = (nueva) => {
    const s = nueva || { nombre: "Sesión " + (sesiones.length + 1), bloques: [] };
    commit({ ...proc, sesiones: [...sesiones, s] });
    setSes(sesiones.length);
  };
  const delSesion = (i) => {
    const next = sesiones.filter((_, x) => x !== i);
    commit({ ...proc, sesiones: next });
    setSes((p) => Math.max(0, p - (i <= p ? 1 : 0)));
  };

  // ---- bloques ----
  const updBloques = (bloques) => updSesion(ses, { bloques });
  const addBloque = () => updBloques([...sActual.bloques, { nombre: "Nuevo bloque", items: [{ codigo: "A", ej: "", semanas: mkSemanas("", n) }] }]);
  const delBloque = (bi) => updBloques(sActual.bloques.filter((_, x) => x !== bi));
  const renBloque = (bi, nombre) => updBloques(sActual.bloques.map((b, x) => (x === bi ? { ...b, nombre } : b)));

  // ---- items ----
  const updItems = (bi, items) => updBloques(sActual.bloques.map((b, x) => (x === bi ? { ...b, items } : b)));
  const addItem = (bi) => {
    const items = sActual.bloques[bi].items;
    updItems(bi, [...items, { codigo: letra(items.length), ej: "", semanas: mkSemanas("", n) }]);
  };
  const delItem = (bi, ii) => updItems(bi, sActual.bloques[bi].items.filter((_, x) => x !== ii));
  const updItem = (bi, ii, patch) => updItems(bi, sActual.bloques[bi].items.map((it, x) => (x === ii ? { ...it, ...patch } : it)));
  const updSem = (bi, ii, wi, field, val) => {
    const it = sActual.bloques[bi].items[ii];
    const sem = it.semanas.map((w, x) => (x === wi ? { ...w, [field]: val } : w));
    updItem(bi, ii, { semanas: sem });
  };
  const fillSxr = (bi, ii) => {
    const it = sActual.bloques[bi].items[ii];
    const base = it.semanas.find((w) => w.sxr)?.sxr || it.semanas[0].sxr;
    updItem(bi, ii, { semanas: it.semanas.map((w) => ({ ...w, sxr: base })) });
  };

  // ---- plantilla ----
  const anexarPlantilla = (clase, sesion) => {
    addSesion(plantillaASesion(clase, sesion, persona.nivel, n));
    setPlantilla(false);
  };

  // ---- proyectar ----
  const proyectar = () => {
    if (!sActual) return;
    const bloques = sActual.bloques.map((b) => ({
      nombre: b.nombre,
      items: b.items.map((it) => ({ ej: (it.codigo ? it.codigo + " · " : "") + it.ej, dosis: (it.semanas[semActiva] || {}).sxr || "" }))
    }));
    onProyectar({ titulo: persona.nombre, sesion: { nombre: (sActual.nombre || "Sesión") + " · Semana " + (semActiva + 1), foco: proc.objetivo, bloques } });
  };

  const hayContenido = sesiones.length > 0;

  return (
    <div className="proc-wrap">
      <div className="proc-cabecera">
        <div className="proc-campos">
          <input className="inp-titulo" value={proc.nombre} placeholder="Nombre del proceso" onChange={(e) => setMeta("nombre", e.target.value)}></input>
          <textarea className="inp-area" value={proc.objetivo} rows={1} placeholder="Objetivo del proceso (opcional)…" onChange={(e) => setMeta("objetivo", e.target.value)}></textarea>
        </div>
        <div className="proc-control-semanas">
          <span className="paso-label">Semanas</span>
          <div className="paso-controles">
            <button onClick={() => setSemanas(n - 1)} disabled={n <= 1}>−</button>
            <input type="number" min="1" max="16" value={n} onChange={(e) => setSemanas(Number(e.target.value) || 1)}></input>
            <button onClick={() => setSemanas(n + 1)} disabled={n >= 16}>+</button>
          </div>
        </div>
      </div>

      {!hayContenido ? (
        <div className="rutina-vacia">
          <p>Todavía no hay sesiones en el proceso de {persona.nombre.split(" ")[0]}. Empezá desde cero o anexá una plantilla de la biblioteca para arrancar con una estructura predeterminada.</p>
          <div className="proc-vacia-acciones">
            <button className="btn-primario" onClick={() => addSesion()}>+ Sesión vacía</button>
            <button className="btn-secundario" onClick={() => setPlantilla(true)}>Anexar plantilla de biblioteca</button>
          </div>
        </div>
      ) : (
        <>
          <div className="proc-barra">
            <div className="tabs-sesion">
              {sesiones.map((s, i) => (
                <button key={i} className={i === ses ? "activo" : ""} onClick={() => setSes(i)}>{s.nombre || "Sesión " + (i + 1)}</button>
              ))}
              <button className="tab-add" onClick={() => addSesion()} title="Agregar sesión">+ Sesión</button>
              <button className="tab-add" onClick={() => setPlantilla(true)} title="Anexar plantilla">+ Plantilla</button>
            </div>
            <div className="proc-barra-der">
              <label className="proc-sem-activa">
                <span>Proyectar semana</span>
                <select value={semActiva} onChange={(e) => setSemActiva(Number(e.target.value))}>
                  {Array.from({ length: n }).map((_, i) => <option key={i} value={i}>Semana {i + 1}</option>)}
                </select>
              </label>
              <button className="btn-pizarra chico" onClick={proyectar}>▶ Proyectar</button>
            </div>
          </div>

          {sActual ? (
            <div className="proc-sesion">
              <div className="ce-sesion-fila">
                <input className="inp-bloque-nombre grande" value={sActual.nombre} placeholder="Nombre de la sesión" onChange={(e) => updSesion(ses, { nombre: e.target.value })}></input>
                {sesiones.length > 1 ? <button className="btn-secundario peligro chico" onClick={() => delSesion(ses)}>Eliminar sesión</button> : null}
              </div>

              <div className="proc-scroll">
                <table className="proc-tabla" style={{ "--nsem": n }}>
                  <thead>
                    <tr className="proc-h1">
                      <th className="col-cod" rowSpan={2}>BLOQUE</th>
                      <th className="col-ej" rowSpan={2}>EJERCICIO</th>
                      {Array.from({ length: n }).map((_, w) => (
                        <th key={w} className={"grupo-sem" + (w === semActiva ? " activa" : "")} colSpan={3}>SEMANA {w + 1}</th>
                      ))}
                    </tr>
                    <tr className="proc-h2">
                      {Array.from({ length: n }).map((_, w) => (
                        <React.Fragment key={w}>
                          <th className={"sub sxr" + (w === semActiva ? " activa" : "")}>S×R</th>
                          <th className={"sub" + (w === semActiva ? " activa" : "")}>CARGA</th>
                          <th className={"sub" + (w === semActiva ? " activa" : "")}>RPE</th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sActual.bloques.map((b, bi) => (
                      <React.Fragment key={bi}>
                        <tr className="proc-bloque-fila">
                          <td className="col-cod"></td>
                          <td className="col-ej">
                            <input className="inp-bloque-inline" value={b.nombre} placeholder="Nombre del bloque" onChange={(e) => renBloque(bi, e.target.value)}></input>
                            <button className="btn-icono borrar mini" title="Eliminar bloque" onClick={() => delBloque(bi)}>✕</button>
                          </td>
                          {Array.from({ length: n * 3 }).map((_, k) => <td key={k} className="celda-bloque"></td>)}
                        </tr>
                        {b.items.map((it, ii) => (
                          <tr key={ii} className="proc-item">
                            <td className="col-cod">
                              <input className="inp-codigo" value={it.codigo || ""} placeholder="—" onChange={(e) => updItem(bi, ii, { codigo: e.target.value })}></input>
                            </td>
                            <td className="col-ej">
                              <div className="ej-cell">
                                <input className="inp-ej-proc" value={it.ej} placeholder="Ejercicio" onChange={(e) => updItem(bi, ii, { ej: e.target.value })}></input>
                                <button className="btn-fill" title="Copiar S×R de semana 1 a todas" onClick={() => fillSxr(bi, ii)}>⇢</button>
                                <button className="btn-icono borrar mini" title="Eliminar ejercicio" onClick={() => delItem(bi, ii)}>✕</button>
                              </div>
                            </td>
                            {it.semanas.map((w, wi) => (
                              <React.Fragment key={wi}>
                                <td className={"celda sxr" + (wi === semActiva ? " activa" : "")}>
                                  <input value={w.sxr} placeholder="—" onChange={(e) => updSem(bi, ii, wi, "sxr", e.target.value)}></input>
                                </td>
                                <td className={"celda" + (wi === semActiva ? " activa" : "")}>
                                  <input value={w.kg} placeholder="" onChange={(e) => updSem(bi, ii, wi, "kg", e.target.value)}></input>
                                </td>
                                <td className={"celda rpe" + (wi === semActiva ? " activa" : "")}>
                                  <select value={w.rpe} onChange={(e) => updSem(bi, ii, wi, "rpe", e.target.value)}>
                                    {RPE_PROC.map((v) => <option key={v} value={v}>{v || "—"}</option>)}
                                  </select>
                                </td>
                              </React.Fragment>
                            ))}
                          </tr>
                        ))}
                        <tr className="proc-add-fila">
                          <td className="col-cod"></td>
                          <td className="col-ej"><button className="btn-agregar-item" onClick={() => addItem(bi)}>+ Ejercicio</button></td>
                          {Array.from({ length: n * 3 }).map((_, k) => <td key={k}></td>)}
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              <button className="btn-agregar-bloque" onClick={addBloque}>+ Agregar bloque</button>
            </div>
          ) : null}
        </>
      )}

      {plantilla ? (
        <PlantillaPicker
          clases={clases}
          secciones={secciones}
          getSeccionDe={getSeccionDe}
          onElegir={anexarPlantilla}
          onCerrar={() => setPlantilla(false)}
        ></PlantillaPicker>
      ) : null}
    </div>
  );
}

/* ---------- selector de plantilla (clase → sesión) ---------- */
function PlantillaPicker({ clases, secciones, getSeccionDe, onElegir, onCerrar }) {
  const [claseSel, setClaseSel] = React.useState(null);
  React.useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onCerrar(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onCerrar]);

  return (
    <div>
      <div className="telon" onClick={onCerrar}></div>
      <div className="plantilla-modal">
        <header className="form-cabecera">
          <h2>{claseSel ? "Elegí la sesión" : "Anexar plantilla"}</h2>
          <button className="cerrar" onClick={onCerrar} aria-label="Cerrar">✕</button>
        </header>
        <div className="plantilla-cuerpo">
          {!claseSel ? (
            secciones.map((s) => {
              const cls = clases.filter((c) => getSeccionDe(c) === s.id);
              if (cls.length === 0) return null;
              return (
                <div className="plantilla-seccion" key={s.id}>
                  <div className="plantilla-seccion-tit">{s.nombre}</div>
                  <div className="plantilla-clases">
                    {cls.map((c) => (
                      <button key={c.id} className="plantilla-clase" onClick={() => setClaseSel(c)}>
                        <span className="icono-cat chico"><IconoCat tipo={c.icono} size={16}></IconoCat></span>
                        <span className="pc-nombre">{c.nombre}</span>
                        <span className="pc-meta">{(c.sesiones || []).length} sesiones</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="plantilla-sesiones">
              <button className="volver chico" onClick={() => setClaseSel(null)}>← Otra clase</button>
              {(claseSel.sesiones || []).map((se, i) => (
                <button key={i} className="plantilla-sesion-op" onClick={() => onElegir(claseSel, se)}>
                  <span className="ps-nombre">{se.nombre}</span>
                  <span className="ps-meta">{(se.bloques || []).length} bloques · {(se.bloques || []).reduce((a, b) => a + (b.items || []).filter((it) => it.comun == null).length, 0)} ejercicios</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Proceso, PlantillaPicker, plantillaASesion, normalizarProceso });
