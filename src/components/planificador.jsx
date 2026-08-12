// DHARMA — Planificador: grilla tipo planilla para armar varias clases en paralelo.
// Columnas = clases · Filas = bloques. Sirve para darle coherencia a la semana/mes,
// comparar clases entre sí y detectar ejercicios repetidos. Cada columna puede
// enviarse a la Biblioteca como clase real proyectable.
//
// Persistencia: localStorage "dharma-planificador-v1" (entra en la Copia de datos).
// Formato de celda: un ejercicio por línea. Dosis opcional tras " · " (ej: "Sentadilla · 4x6").

const PLAN_CLAVE = "dharma-planificador-v1";

function planCargar() {
  try { const v = localStorage.getItem(PLAN_CLAVE); if (v) return JSON.parse(v); } catch (e) {}
  return null;
}
function planTablerosIniciales() {
  return {
    activo: "t1",
    tableros: [{
      id: "t1", titulo: "FUERZA Y POTENCIA",
      bloques: ["Preparación", "Activación", "Principal", "Cierre"],
      clases: [
        { id: "c1", nombre: "Clase 1", celdas: {} },
        { id: "c2", nombre: "Clase 2", celdas: {} },
        { id: "c3", nombre: "Clase 3", celdas: {} }
      ]
    }]
  };
}

// Parsea una celda de texto en items {ej, dosis}. Ignora líneas vacías.
function planParseCelda(texto) {
  return (texto || "").split("\n").map((l) => l.trim()).filter(Boolean).map((l) => {
    const p = l.split(/\s*·\s*/);
    if (p.length >= 2) { const dosis = p.pop(); return { ej: p.join(" · ").trim(), dosis: dosis.trim() }; }
    return { ej: l };
  });
}
// Normaliza un nombre de ejercicio para comparar repeticiones (sin dosis, sin acentos, minúsculas).
function planNorm(s) {
  return (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

function Planificador({ secciones, subseccionesList, onEnviarClases }) {
  const [estado, setEstado] = React.useState(() => planCargar() || planTablerosIniciales());
  const guardar = (next) => { setEstado(next); try { localStorage.setItem(PLAN_CLAVE, JSON.stringify(next)); } catch (e) {} };

  const tablero = estado.tableros.find((t) => t.id === estado.activo) || estado.tableros[0];
  const [enviar, setEnviar] = React.useState(null); // {claseIdx} | {todas:true}

  // ---- helpers de mutación del tablero activo ----
  const updTablero = (patch) => guardar({ ...estado, tableros: estado.tableros.map((t) => (t.id === tablero.id ? { ...t, ...patch } : t)) });
  const updClase = (idx, patch) => updTablero({ clases: tablero.clases.map((c, i) => (i === idx ? { ...c, ...patch } : c)) });
  const setCelda = (idx, bloque, texto) => updClase(idx, { celdas: { ...tablero.clases[idx].celdas, [bloque]: texto } });

  const addClase = () => updTablero({ clases: [...tablero.clases, { id: "c" + Date.now(), nombre: "Clase " + (tablero.clases.length + 1), celdas: {} }] });
  const delClase = (idx) => { if (tablero.clases.length <= 1) return; updTablero({ clases: tablero.clases.filter((_, i) => i !== idx) }); };
  const renClase = (idx, nombre) => updClase(idx, { nombre });

  const addBloque = () => { const n = window.prompt("Nombre del bloque (fila)", ""); if (n && n.trim()) updTablero({ bloques: [...tablero.bloques, n.trim()] }); };
  const delBloque = (b) => {
    updTablero({
      bloques: tablero.bloques.filter((x) => x !== b),
      clases: tablero.clases.map((c) => { const cc = { ...c.celdas }; delete cc[b]; return { ...c, celdas: cc }; })
    });
  };
  const renBloque = (viejo, nuevo) => {
    const n = (nuevo || "").trim(); if (!n || n === viejo) return;
    updTablero({
      bloques: tablero.bloques.map((x) => (x === viejo ? n : x)),
      clases: tablero.clases.map((c) => { const cc = { ...c.celdas }; if (cc[viejo] != null) { cc[n] = cc[viejo]; delete cc[viejo]; } return { ...c, celdas: cc }; })
    });
  };
  const moverBloque = (b, dir) => {
    const i = tablero.bloques.indexOf(b); const j = i + dir;
    if (i < 0 || j < 0 || j >= tablero.bloques.length) return;
    const arr = [...tablero.bloques]; arr.splice(i, 1); arr.splice(j, 0, b);
    updTablero({ bloques: arr });
  };

  // ---- tableros ----
  const nuevoTablero = () => {
    const n = window.prompt("Título del tablero (ej: FUERZA Y POTENCIA, SEMANA 2…)", "");
    if (!n || !n.trim()) return;
    const id = "t" + Date.now();
    guardar({ activo: id, tableros: [...estado.tableros, { id, titulo: n.trim().toUpperCase(), bloques: ["Preparación", "Activación", "Principal", "Cierre"], clases: [{ id: "c1", nombre: "Clase 1", celdas: {} }, { id: "c2", nombre: "Clase 2", celdas: {} }] }] });
  };
  const delTablero = () => {
    if (activos.length <= 1) { window.dharmaToast && window.dharmaToast("Tiene que quedar al menos un tablero activo", "info"); return; }
    if (!window.confirm("¿Eliminar el tablero “" + tablero.titulo + "”? Esto no toca las clases que ya enviaste a la Biblioteca.")) return;
    const rest = estado.tableros.filter((t) => t.id !== tablero.id);
    guardar({ activo: rest[0].id, tableros: rest });
  };
  const renTablero = () => { const n = window.prompt("Título del tablero", tablero.titulo); if (n && n.trim()) updTablero({ titulo: n.trim().toUpperCase() }); };

  // ---- archivo: una vez enviado a producción, el tablero se puede archivar ("Semana 1"…)
  // para sacarlo de la vista activa sin perderlo — sigue disponible en "Archivados".
  const archivarTablero = () => {
    const etiqueta = window.prompt("Archivar como… (ej: Semana 1, Julio — Fuerza)", tablero.titulo);
    if (etiqueta == null) return;
    const activos = estado.tableros.filter((t) => t.id !== tablero.id && !t.archivado);
    const siguienteActivo = activos[0] ? activos[0].id : null;
    const tableros = estado.tableros.map((t) => (t.id === tablero.id ? { ...t, archivado: true, etiquetaArchivo: (etiqueta.trim() || tablero.titulo), fechaArchivo: new Date().toISOString() } : t));
    if (siguienteActivo) {
      guardar({ activo: siguienteActivo, tableros });
    } else {
      // no queda ningún tablero activo: crear uno nuevo en blanco para no dejar la pantalla vacía
      const nuevo = { id: "t" + Date.now(), titulo: "NUEVA SEMANA", bloques: ["Preparación", "Activación", "Principal", "Cierre"], clases: [{ id: "c1", nombre: "Clase 1", celdas: {} }, { id: "c2", nombre: "Clase 2", celdas: {} }] };
      guardar({ activo: nuevo.id, tableros: [...tableros, nuevo] });
    }
    window.dharmaToast && window.dharmaToast("Tablero archivado", "ok");
  };
  const desarchivarTablero = (id) => {
    guardar({ activo: id, tableros: estado.tableros.map((t) => (t.id === id ? { ...t, archivado: false } : t)) });
  };
  const activos = estado.tableros.filter((t) => !t.archivado);
  const archivados = estado.tableros.filter((t) => t.archivado);
  const [verArchivados, setVerArchivados] = React.useState(false);

  // ---- detección de repetidos: por bloque (fila), un ejercicio que aparece en ≥2 clases ----
  const repetidosPorBloque = React.useMemo(() => {
    const map = {}; // bloque -> Set(normalizado repetido)
    tablero.bloques.forEach((b) => {
      const cuenta = {};
      tablero.clases.forEach((c) => planParseCelda(c.celdas[b]).forEach((it) => { const k = planNorm(it.ej); if (k) cuenta[k] = (cuenta[k] || 0) + 1; }));
      map[b] = new Set(Object.keys(cuenta).filter((k) => cuenta[k] >= 2));
    });
    return map;
  }, [tablero]);

  // repetidos DENTRO de una misma clase (columna) — no deberían repetirse ejercicios
  const repetidosEnClase = (c) => {
    const cuenta = {};
    tablero.bloques.forEach((b) => planParseCelda(c.celdas[b]).forEach((it) => { const k = planNorm(it.ej); if (k) cuenta[k] = (cuenta[k] || 0) + 1; }));
    return new Set(Object.keys(cuenta).filter((k) => cuenta[k] >= 2));
  };

  const totalEjs = (c) => tablero.bloques.reduce((n, b) => n + planParseCelda(c.celdas[b]).length, 0);

  return (
    <main className="contenido plan-main" data-screen-label="Planificador">
      <header className="cabecera-editor plan-cab">
        <div>
          <h1>Planificador</h1>
          <p className="plan-sub">Cada columna es una clase; cada fila, un bloque. Un ejercicio por línea (ej: <em>Sentadilla · 4x6</em>).</p>
        </div>
      </header>

      <div className="plan-tableros">
        <div className="plan-tabs">
          {activos.map((t) => (
            <button key={t.id} className={"plan-tab" + (t.id === tablero.id ? " activo" : "")} onClick={() => guardar({ ...estado, activo: t.id })}>{t.titulo}</button>
          ))}
          <button className="plan-tab nuevo" onClick={nuevoTablero} title="Nuevo tablero">+ Tablero</button>
          {archivados.length ? (
            <button className={"plan-tab archivo" + (verArchivados ? " activo" : "")} onClick={() => setVerArchivados((v) => !v)}>📁 Archivados ({archivados.length})</button>
          ) : null}
        </div>
        <div className="plan-tablero-acc">
          <button className="plan-mini" onClick={renTablero} title="Renombrar tablero">Renombrar</button>
          <button className="plan-mini archivar" onClick={archivarTablero} title="Archivar este tablero (ya en producción)">Archivar</button>
          <button className="plan-mini borrar" onClick={delTablero} title="Eliminar tablero">Eliminar</button>
        </div>
      </div>

      {verArchivados && archivados.length ? (
        <div className="plan-archivados">
          {archivados.map((t) => (
            <div className="plan-archivado-fila" key={t.id}>
              <span className="plan-archivado-etq">{t.etiquetaArchivo || t.titulo}</span>
              <span className="plan-archivado-fecha">{t.fechaArchivo ? new Date(t.fechaArchivo).toLocaleDateString("es-AR") : ""}</span>
              <button className="plan-mini" onClick={() => desarchivarTablero(t.id)}>Reabrir</button>
            </div>
          ))}
        </div>
      ) : null}

      <div className="plan-scroll">
        <table className="plan-tabla" style={{ minWidth: 220 + tablero.clases.length * 260 }}>
          <colgroup>
            <col style={{ width: 190 }}></col>
            {tablero.clases.map((c) => <col key={c.id} style={{ width: 260 }}></col>)}
          </colgroup>
          <thead>
            <tr className="plan-head">
              <th className="plan-th-bloque">bloque</th>
              {tablero.clases.map((c, i) => {
                const reps = repetidosEnClase(c);
                return (
                  <th key={c.id} className="plan-th-clase">
                    <input className="plan-clase-nom" value={c.nombre} onChange={(e) => renClase(i, e.target.value)}></input>
                    <div className="plan-clase-meta">
                      <span className="plan-clase-cuenta">{totalEjs(c)} ej.</span>
                      {reps.size > 0 ? <span className="plan-clase-warn" title="Ejercicios repetidos dentro de esta clase">⚠ {reps.size} repetido{reps.size > 1 ? "s" : ""}</span> : null}
                      <button className="plan-clase-x" onClick={() => delClase(i)} title="Eliminar clase" disabled={tablero.clases.length <= 1}>✕</button>
                    </div>
                    <button className="plan-enviar-uno" onClick={() => setEnviar({ claseIdx: i })}>Enviar a Biblioteca →</button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tablero.bloques.map((b) => (
              <tr key={b} className="plan-fila">
                <th className="plan-td-bloque">
                  <input className="plan-bloque-nom" value={b} onChange={(e) => renBloque(b, e.target.value)}></input>
                  <div className="plan-bloque-acc">
                    <button onClick={() => moverBloque(b, -1)} title="Subir">↑</button>
                    <button onClick={() => moverBloque(b, 1)} title="Bajar">↓</button>
                    <button className="borrar" onClick={() => delBloque(b)} title="Eliminar fila">✕</button>
                  </div>
                </th>
                {tablero.clases.map((c, i) => {
                  const items = planParseCelda(c.celdas[b]);
                  const reps = repetidosPorBloque[b];
                  const hayRep = items.some((it) => reps.has(planNorm(it.ej)));
                  return (
                    <td key={c.id} className={"plan-celda" + (hayRep ? " con-rep" : "")}>
                      <textarea
                        className="plan-ta"
                        value={c.celdas[b] || ""}
                        onChange={(e) => setCelda(i, b, e.target.value)}
                        placeholder="Un ejercicio por línea…"
                        rows={Math.max(2, items.length + 1)}
                      ></textarea>
                      {hayRep ? (
                        <div className="plan-rep-tags">
                          {items.filter((it) => reps.has(planNorm(it.ej))).map((it, k) => (
                            <span key={k} className="plan-rep-tag" title="También aparece en otra clase de esta fila">↔ {it.ej}</span>
                          ))}
                        </div>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="plan-add-bloque"><button onClick={addBloque}>+ Bloque</button></td>
              <td className="plan-add-clase" colSpan={tablero.clases.length}><button onClick={addClase}>+ Clase (columna)</button></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="plan-pie">
        <div className="plan-leyenda"><span className="plan-chip-rep"></span> Ejercicio repetido en la misma fila (otra clase lo usa). Sirve para variar y no repetir en la semana.</div>
        <button className="btn-primario" onClick={() => setEnviar({ todas: true })}>Enviar todas a la Biblioteca</button>
      </div>

      {enviar ? (
        <PlanEnviar
          tablero={tablero}
          claseIdx={enviar.claseIdx}
          todas={enviar.todas}
          secciones={secciones}
          subseccionesList={subseccionesList}
          onCerrar={() => setEnviar(null)}
          onConfirmar={(clasesSimples, seccionId, subseccion) => { onEnviarClases(clasesSimples, seccionId, subseccion); setEnviar(null); }}
        ></PlanEnviar>
      ) : null}
    </main>
  );
}

// Modal para enviar una o todas las clases del tablero a la Biblioteca.
function PlanEnviar({ tablero, claseIdx, todas, secciones, subseccionesList, onCerrar, onConfirmar }) {
  const [seccionId, setSeccionId] = React.useState((secciones[0] && secciones[0].id) || "");
  const subsDe = [...new Set((subseccionesList || []).filter((s) => s.seccion === seccionId).map((s) => s.nombre))];
  const [subseccion, setSubseccion] = React.useState("");

  const clasesElegidas = todas ? tablero.clases : [tablero.clases[claseIdx]];
  const armarClase = (col) => {
    const bloques = tablero.bloques
      .map((b) => ({ nombre: b, items: planParseCelda(col.celdas[b]) }))
      .filter((bl) => bl.items.length > 0);
    return {
      id: "clase" + Date.now() + Math.floor(Math.random() * 1000),
      nombre: col.nombre.trim() || "Clase",
      descripcion: "Creada desde el Planificador · " + tablero.titulo,
      nivel: "Todos los niveles", duracion: 60, horarios: "A definir", coach: "—",
      icono: "fuerza", custom: true, inscriptos: [],
      sesiones: [{ id: "A", nombre: col.nombre.trim() || "Clase", foco: "", bloques }]
    };
  };
  const vacias = clasesElegidas.filter((c) => tablero.bloques.every((b) => planParseCelda(c.celdas[b]).length === 0));
  const confirmar = () => {
    const clases = clasesElegidas.filter((c) => !tablero.bloques.every((b) => planParseCelda(c.celdas[b]).length === 0)).map(armarClase);
    if (!clases.length) { window.dharmaToast && window.dharmaToast("No hay ejercicios cargados para enviar", "info"); return; }
    onConfirmar(clases, seccionId, subseccion.trim());
  };

  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal chico" onClick={(e) => e.stopPropagation()}>
        <header className="mb-modal-cab">
          <div><div className="mb-modal-eyebrow">Planificador → Biblioteca</div><h2>{todas ? "Enviar todas las clases" : "Enviar clase"}</h2></div>
          <button className="btn-icono" onClick={onCerrar}><IconX></IconX></button>
        </header>
        <div className="mb-modal-cuerpo">
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-2)" }}>
            {todas ? <>Se crearán <b>{clasesElegidas.length - vacias.length}</b> clases nuevas en la Biblioteca, listas para proyectar.</> : <>Se creará la clase <b>{clasesElegidas[0].nombre}</b> en la Biblioteca, lista para proyectar.</>}
          </p>
          <label className="campo">
            <span>Carpeta (sección)</span>
            <select value={seccionId} onChange={(e) => { setSeccionId(e.target.value); setSubseccion(""); }}>
              {secciones.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
            </select>
          </label>
          <label className="campo">
            <span>Sub-sección (opcional)</span>
            <input list="plan-subs" value={subseccion} onChange={(e) => setSubseccion(e.target.value)} placeholder={tablero.titulo}></input>
            <datalist id="plan-subs">{subsDe.map((s) => <option key={s} value={s}></option>)}</datalist>
          </label>
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.5 }}>
            Crea clases nuevas (no reemplaza las existentes). Los bloques con niveles Guerrero/Ninja/Mago/Maestro se arman después desde el editor completo de la clase.
          </p>
        </div>
        <footer className="mb-modal-pie">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={confirmar}>Crear en la Biblioteca</button>
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { Planificador });
