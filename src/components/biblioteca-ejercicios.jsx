// DHARMA — Biblioteca de Ejercicios: catálogo por sección (referencia para profes).
// Secciones editables, ejercicios con nota + link a YouTube, y progresión por niveles
// solo en las secciones que lo admiten (fuerza/potencia y core/estabilidad).

const EJ_CLAVE_EJ = "dharma-ejercicios-v2";
const EJ_CLAVE_SEC = "dharma-ej-secciones-v2";
const EJ_FAMILIAS = [
  { id: "preparacion", nombre: "Preparación" },
  { id: "activacion", nombre: "Activación" },
  { id: "principal", nombre: "Principales (fuerza / potencia)" },
  { id: "accesorios", nombre: "Accesorios (por músculo)" },
  { id: "deportivo", nombre: "Técnica deportiva" },
  { id: "carrera", nombre: "Técnica de carrera" }
];
const EJ_PLANOS = { sagital: "Sagital", frontal: "Frontal", transversal: "Transversal", multiplanar: "Multiplanar", fs: "Multiplanar", ft: "Multiplanar", sf: "Multiplanar" };
const ejCarga = (k, fb) => { try { const v = localStorage.getItem(k); if (v) return JSON.parse(v); } catch (e) {} return fb; };
// Suma los items de `defaults` que falten (por id) a lo guardado, sin pisar ediciones del usuario.
const ejMerge = (guardados, defaults) => { const ids = new Set((guardados || []).map((x) => x.id)); return [...(guardados || []), ...(defaults || []).filter((d) => !ids.has(d.id))]; };
// Igual que ejMerge pero, para ejercicios ya guardados, completa la progresión por niveles y la nota
// si todavía no las tienen (no pisa lo que el usuario haya cargado a mano).
const ejMergeEj = (guardados, defaults) => {
  const out = (guardados || []).map((e) => ({ ...e }));
  const byId = {}; out.forEach((e) => { byId[e.id] = e; });
  (defaults || []).forEach((d) => {
    const ex = byId[d.id];
    if (!ex) { const c = { ...d }; out.push(c); byId[d.id] = c; }
    else {
      if ((!ex.niveles || !ex.niveles.some((x) => x)) && d.niveles) ex.niveles = d.niveles;
      if (!ex.nota && d.nota) ex.nota = d.nota;
    }
  });
  // Normaliza planos antiguos (combinados) al esquema actual de 4: Sagital / Frontal / Transversal / Multiplanar.
  out.forEach((e) => { if (e.plano === "fs" || e.plano === "ft" || e.plano === "sf") e.plano = "multiplanar"; });
  return out;
};

function ytId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
}
// Google Drive: /file/d/<id>/... → se puede embeber como preview.
function driveId(url) {
  if (!url) return null;
  const m = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
  return m ? m[1] : null;
}
// ¿hay algún video reproducible o abrible? (YouTube embebido, Drive embebido, o cualquier link como fallback)
const tieneVideo = (url) => !!(url && url.trim());

function EjerciciosBiblioteca({ soloLectura }) {
  const datos = window.DHARMA_DATA;
  const [secciones, setSecciones] = React.useState(() => ejMerge(ejCarga(EJ_CLAVE_SEC, datos.ejerciciosSecciones || []), datos.ejerciciosSecciones || []));
  const [ejercicios, setEjercicios] = React.useState(() => ejMergeEj(ejCarga(EJ_CLAVE_EJ, datos.ejercicios || []), datos.ejercicios || []));
  const [busqueda, setBusqueda] = React.useState("");
  const [editor, setEditor] = React.useState(null);     // {modo, ej}
  const [editSecciones, setEditSecciones] = React.useState(false);
  const [video, setVideo] = React.useState(null);        // ejercicio a previsualizar
  const [familiaF, setFamiliaF] = React.useState("todas");
  const [vista, setVista] = React.useState("lista");      // lista (excel) | tarjetas

  const guardarEj = (next) => { setEjercicios(next); try { localStorage.setItem(EJ_CLAVE_EJ, JSON.stringify(next)); } catch (e) {} };
  const guardarSec = (next) => { setSecciones(next); try { localStorage.setItem(EJ_CLAVE_SEC, JSON.stringify(next)); } catch (e) {} };

  const secDe = (id) => secciones.find((s) => s.id === id) || { nombre: "—", niveles: false };
  const q = busqueda.trim().toLowerCase();
  const total = ejercicios.length;

  const guardarEjercicio = (ej) => {
    const existe = ejercicios.some((e) => e.id === ej.id);
    guardarEj(existe ? ejercicios.map((e) => e.id === ej.id ? ej : e) : [...ejercicios, ej]);
    setEditor(null);
    window.dharmaToast && window.dharmaToast(existe ? "Ejercicio guardado" : "Ejercicio agregado", "ok");
  };
  const eliminarEjercicio = (id) => { guardarEj(ejercicios.filter((e) => e.id !== id)); setEditor(null); };

  // edición inline (vista planilla)
  const editarCampo = (id, campo, valor) => {
    guardarEj(ejercicios.map((e) => {
      if (e.id !== id) return e;
      if (campo === "familia") { const prim = secciones.find((s) => s.familia === valor); return { ...e, seccion: prim ? prim.id : e.seccion }; }
      if (campo === "plano") return { ...e, plano: valor || undefined };
      return { ...e, [campo]: valor };
    }));
  };
  const reordenar = (fromId, toId) => {
    if (!fromId || fromId === toId) return;
    const arr = [...ejercicios];
    const fi = arr.findIndex((e) => e.id === fromId);
    const ti = arr.findIndex((e) => e.id === toId);
    if (fi < 0 || ti < 0) return;
    const [m] = arr.splice(fi, 1); arr.splice(ti, 0, m);
    guardarEj(arr);
  };

  return (
    <main className="contenido" data-screen-label="Biblioteca de Ejercicios">
      <div className="est-hero ag-hero">
        <div className="et-eyebrow">Referencia para profes</div>
        <h1>Ejercicios</h1>
        <p className="et-sub">El catálogo del método, por sección. Tocá un ejercicio para ver su video o editarlo.</p>
      </div>

      <div className="encabezado-vista" style={{ marginBottom: 18 }}>
        <h2 className="seccion-titulo" style={{ fontSize: 20 }}>{total} ejercicios</h2>
        <div className="acciones-vista" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <label className="buscador">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><line x1="16.5" y1="16.5" x2="21" y2="21"></line></svg>
            <input type="search" placeholder="Buscar ejercicio…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
          </label>
          {soloLectura ? null : <button className="btn-secundario" onClick={() => setEditSecciones((v) => !v)}>{editSecciones ? "✓ Listo" : "Editar secciones"}</button>}
          {soloLectura ? null : <button className="btn-primario" onClick={() => setEditor({ modo: "nuevo", ej: { id: "ej" + Date.now(), seccion: secciones[0].id, nombre: "", nota: "", video: "" } })}>+ Nuevo ejercicio</button>}
        </div>
      </div>

      {editSecciones ? (
        <SeccionesEditor secciones={secciones} familias={EJ_FAMILIAS} onGuardar={guardarSec} ejercicios={ejercicios}></SeccionesEditor>
      ) : null}

      <div className="ejb-barra">
        <div className="ejb-filtros">
          <button className={"ejb-chip" + (familiaF === "todas" ? " on" : "")} onClick={() => setFamiliaF("todas")}>Todas</button>
          {EJ_FAMILIAS.map((f) => (
            <button key={f.id} className={"ejb-chip" + (familiaF === f.id ? " on" : "")} onClick={() => setFamiliaF(f.id)}>{f.nombre}</button>
          ))}
        </div>
        <div className="ejb-vista-toggle">
          <button className={vista === "lista" ? "on" : ""} onClick={() => setVista("lista")} title="Lista"><UIIcon sw={2}><line x1="8" y1="6" x2="20" y2="6"></line><line x1="8" y1="12" x2="20" y2="12"></line><line x1="8" y1="18" x2="20" y2="18"></line><line x1="3.5" y1="6" x2="3.6" y2="6"></line><line x1="3.5" y1="12" x2="3.6" y2="12"></line><line x1="3.5" y1="18" x2="3.6" y2="18"></line></UIIcon> Lista</button>
          <button className={vista === "tarjetas" ? "on" : ""} onClick={() => setVista("tarjetas")} title="Tarjetas"><UIIcon sw={2}><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></UIIcon> Tarjetas</button>
          {soloLectura ? null : <button className={vista === "planilla" ? "on" : ""} onClick={() => setVista("planilla")} title="Planilla editable"><UIIcon sw={2}><rect x="3" y="4" width="18" height="16" rx="1"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="14" x2="21" y2="14"></line><line x1="9" y1="4" x2="9" y2="20"></line></UIIcon> Planilla</button>}
        </div>
      </div>

      {vista === "planilla" ? (
        <VistaExcel ejercicios={ejercicios} secciones={secciones} familias={EJ_FAMILIAS} q={q} familiaF={familiaF} onCampo={editarCampo} onReorder={reordenar} onAbrir={(e) => setEditor({ modo: "editar", ej: e })}></VistaExcel>
      ) : EJ_FAMILIAS.filter((fam) => familiaF === "todas" || familiaF === fam.id).map((fam) => {
        const secsFam = secciones.filter((s) => s.familia === fam.id);
        if (!secsFam.length) return null;
        // ¿hay algo que mostrar en esta familia con el filtro?
        const algo = secsFam.some((s) => ejercicios.some((e) => e.seccion === s.id && (!q || e.nombre.toLowerCase().includes(q))));
        if (q && !algo) return null;
        return (
          <section className="ejb-familia" key={fam.id}>
            <h2 className="ejb-familia-tit">{fam.nombre}</h2>
            {secsFam.map((s) => {
              const lista = ejercicios.filter((e) => e.seccion === s.id && (!q || e.nombre.toLowerCase().includes(q)));
              if (q && !lista.length) return null;
              return (
                <div className="ejb-seccion" key={s.id}>
                  <div className="ejb-seccion-cab">
                    <h3>{s.nombre}</h3>
                    {s.niveles ? <span className="ejb-tag-niveles">progresa por niveles</span> : null}
                    <span className="ejb-conteo">{lista.length}</span>
                  </div>
                  {lista.length === 0 ? <div className="ejb-vacio">Sin ejercicios en esta sección.</div> : vista === "lista" ? (
                    <table className="ejb-tabla">
                      <thead>
                        <tr>
                          <th>Ejercicio</th>
                          {s.niveles ? <><th>Guerrero</th><th>Ninja</th><th>Mago</th><th>Maestro</th></> : <th className="ejb-th-nota">Nota</th>}
                          <th className="ejb-th-acc"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {lista.map((e, i) => (
                          <tr key={e.id} onClick={() => { if (soloLectura) { if (tieneVideo(e.video)) setVideo(e); return; } setEditor({ modo: "editar", ej: e }); }} style={soloLectura && !tieneVideo(e.video) ? { cursor: "default" } : undefined}>
                            <td className="ejb-td-nom">{s.familia === "carrera" ? <span className="ejb-td-paso">{i + 1}</span> : null}{e.nombre}{e.plano ? <span className="ejb-td-plano">{EJ_PLANOS[e.plano] || e.plano}</span> : null}{e.nota && s.niveles ? <span className="ejb-td-cue">{e.nota}</span> : null}</td>
                            {s.niveles ? (
                              [0, 1, 2, 3].map((k) => <td key={k} className="ejb-td-niv">{(e.niveles && e.niveles[k]) ? e.niveles[k] : <span className="ejb-td-vacio">—</span>}</td>)
                            ) : <td className="ejb-td-cue solo">{e.nota || (s.familia === "carrera" ? "" : "—")}</td>}
                            <td className="ejb-td-acc">
                              {tieneVideo(e.video) ? <button className="ejb-play chico" title="Ver video" onClick={(ev) => { ev.stopPropagation(); setVideo(e); }}><IconPlay size={11}></IconPlay></button> : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="ejb-grilla">
                      {lista.map((e) => (
                        <div className="ejb-card" key={e.id} onClick={() => { if (soloLectura) { if (tieneVideo(e.video)) setVideo(e); return; } setEditor({ modo: "editar", ej: e }); }} style={soloLectura && !tieneVideo(e.video) ? { cursor: "default" } : undefined}>
                          <div className="ejb-card-top">
                            <span className="ejb-card-nombre">{e.nombre}</span>
                            {tieneVideo(e.video) ? (
                              <button className="ejb-play" title="Ver video" onClick={(ev) => { ev.stopPropagation(); setVideo(e); }}><IconPlay size={13}></IconPlay></button>
                            ) : null}
                          </div>
                          {e.plano ? <div className="ejb-card-plano">{EJ_PLANOS[e.plano] || e.plano}</div> : null}
                          {e.nota ? <div className="ejb-card-nota">{e.nota}</div> : null}
                          {e.niveles && e.niveles.some((x) => x) ? (
                            <div className="ejb-card-niveles">{e.niveles.filter((x) => x).length} niveles cargados</div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        );
      })}

      {editor ? (
        <EjercicioEditor ejercicio={editor.ej} modo={editor.modo} secciones={secciones} secDe={secDe}
          onGuardar={guardarEjercicio} onEliminar={eliminarEjercicio} onCerrar={() => setEditor(null)}></EjercicioEditor>
      ) : null}

      {video ? (
        <div className="mb-overlay" onClick={() => setVideo(null)}>
          <div className="mb-modal" onClick={(e) => e.stopPropagation()} style={{ width: 720 }}>
            <header className="mb-modal-cab"><div><div className="mb-modal-eyebrow">Video</div><h2>{video.nombre}</h2></div><button className="btn-icono" onClick={() => setVideo(null)}><IconX></IconX></button></header>
            <div className="mb-modal-cuerpo">
              <div className="ejb-video">
                {driveId(video.video) ? (
                  <iframe src={"https://drive.google.com/file/d/" + driveId(video.video) + "/preview"} title={video.nombre} frameBorder="0" allowFullScreen></iframe>
                ) : (
                  <div className="ejb-video-externo">
                    <p>Se abre en YouTube, igual que desde tu Excel.</p>
                    <a href={video.video} target="_blank" rel="noopener noreferrer" className="btn-primario">Ver en YouTube ↗</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

/* ---------- editor de un ejercicio ---------- */
function EjercicioEditor({ ejercicio, modo, secciones, secDe, onGuardar, onEliminar, onCerrar }) {
  const [e, setE] = React.useState(() => ({ ...ejercicio }));
  const set = (k, v) => setE((p) => ({ ...p, [k]: v }));
  const sec = secDe(e.seccion);
  const tieneNiveles = !!(e.niveles && e.niveles.length);
  const setNivel = (i, v) => { const n = [...(e.niveles || ["", "", "", ""])]; n[i] = v; set("niveles", n); };
  const NIV = ["GUERRERO", "NINJA", "MAGO", "MAESTRO"];
  const valido = (e.nombre || "").trim().length > 0;

  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal" onClick={(ev) => ev.stopPropagation()}>
        <header className="mb-modal-cab">
          <div><div className="mb-modal-eyebrow">{modo === "nuevo" ? "Nuevo ejercicio" : "Editar ejercicio"}</div><h2>Biblioteca</h2></div>
          <button className="btn-icono" onClick={onCerrar}><IconX></IconX></button>
        </header>
        <div className="mb-modal-cuerpo">
          <label className="campo"><span>Nombre del ejercicio *</span><input autoFocus value={e.nombre} placeholder="Ej: Sentadilla goblet" onChange={(ev) => set("nombre", ev.target.value)}></input></label>
          <label className="campo"><span>Sección</span>
            <select value={e.seccion} onChange={(ev) => set("seccion", ev.target.value)}>
              {secciones.map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
            </select>
          </label>
          <label className="campo"><span>Plano (opcional)</span>
            <select value={e.plano || ""} onChange={(ev) => set("plano", ev.target.value || undefined)}>
              <option value="">—</option>
              <option value="sagital">Sagital</option>
              <option value="frontal">Frontal</option>
              <option value="transversal">Transversal</option>
              <option value="multiplanar">Multiplanar</option>
            </select>
          </label>
          <label className="campo"><span>Nota / cue técnico (opcional)</span><input value={e.nota || ""} placeholder="Ej: rodillas afuera, pecho alto" onChange={(ev) => set("nota", ev.target.value)}></input></label>
          <label className="campo"><span>Link de YouTube (opcional)</span><input value={e.video || ""} placeholder="https://youtube.com/…" onChange={(ev) => set("video", ev.target.value)}></input></label>

          {sec.niveles ? (
            <div className="ejb-niveles-edit">
              <div className="ejb-niveles-cab">
                <span>Progresión por niveles</span>
                {!tieneNiveles ? <button className="btn-mini" onClick={() => set("niveles", ["", "", "", ""])}>+ Agregar progresión</button>
                  : <button className="btn-mini" onClick={() => set("niveles", undefined)}>Quitar progresión</button>}
              </div>
              {tieneNiveles ? (
                <div className="ejb-niveles-filas">
                  {e.niveles.map((v, i) => (
                    <div className="ejb-nivel-fila" key={i}>
                      <span className="ejb-nivel-lbl">{NIV[i] || "NIVEL " + (i + 1)}</span>
                      <input value={v} placeholder="Variante para este nivel" onChange={(ev) => setNivel(i, ev.target.value)}></input>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <footer className="mb-modal-pie">
          {modo === "editar" ? <button className="btn-secundario peligro" onClick={() => onEliminar(e.id)}>Eliminar</button> : <span></span>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
            <button className="btn-primario" disabled={!valido} onClick={() => onGuardar({ ...e, nombre: e.nombre.trim() })}>Guardar</button>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ---------- editor de secciones ---------- */
function SeccionesEditor({ secciones, familias, onGuardar, ejercicios }) {
  const [nueva, setNueva] = React.useState({ nombre: "", familia: "principal", niveles: true });
  const renombrar = (id, nombre) => onGuardar(secciones.map((s) => s.id === id ? { ...s, nombre } : s));
  const toggleNiv = (id) => onGuardar(secciones.map((s) => s.id === id ? { ...s, niveles: !s.niveles } : s));
  const borrar = (id) => {
    if (ejercicios.some((e) => e.seccion === id)) { window.dharmaToast && window.dharmaToast("No se puede: la sección tiene ejercicios", "info"); return; }
    onGuardar(secciones.filter((s) => s.id !== id));
  };
  const agregar = () => {
    if (!nueva.nombre.trim()) return;
    onGuardar([...secciones, { id: "sec" + Date.now(), nombre: nueva.nombre.trim(), familia: nueva.familia, niveles: nueva.niveles }]);
    setNueva({ nombre: "", familia: "principal", niveles: true });
  };
  return (
    <div className="ejb-sec-editor">
      <div className="ejb-sec-lista">
        {secciones.map((s) => (
          <div className="ejb-sec-fila" key={s.id}>
            <input value={s.nombre} onChange={(e) => renombrar(s.id, e.target.value)}></input>
            <select value={s.familia} onChange={(e) => onGuardar(secciones.map((x) => x.id === s.id ? { ...x, familia: e.target.value } : x))}>
              {familias.map((f) => <option key={f.id} value={f.id}>{f.nombre}</option>)}
            </select>
            <button className={"ejb-sec-niv" + (s.niveles ? " on" : "")} onClick={() => toggleNiv(s.id)} title="¿Admite progresión por niveles?">niveles</button>
            <button className="btn-icono borrar" onClick={() => borrar(s.id)}><IconX></IconX></button>
          </div>
        ))}
      </div>
      <div className="ejb-sec-nueva">
        <input value={nueva.nombre} placeholder="Nueva sección…" onChange={(e) => setNueva((n) => ({ ...n, nombre: e.target.value }))} onKeyDown={(e) => { if (e.key === "Enter") agregar(); }}></input>
        <select value={nueva.familia} onChange={(e) => setNueva((n) => ({ ...n, familia: e.target.value }))}>
          {familias.map((f) => <option key={f.id} value={f.id}>{f.nombre}</option>)}
        </select>
        <button className="btn-mini" onClick={agregar}>+ Agregar sección</button>
      </div>
    </div>
  );
}

/* ---------- vista planilla (Excel) editable + reordenable ---------- */
function VistaExcel({ ejercicios, secciones, familias, q, familiaF, onCampo, onReorder, onAbrir }) {
  const [drag, setDrag] = React.useState(null);
  const [over, setOver] = React.useState(null);
  const famDe = (secId) => { const s = secciones.find((x) => x.id === secId); return s ? s.familia : ""; };
  const PLN = [["", "—"], ["sagital", "Sagital"], ["frontal", "Frontal"], ["transversal", "Transversal"], ["multiplanar", "Multiplanar"]];
  const filtrados = ejercicios.filter((e) => (familiaF === "todas" || famDe(e.seccion) === familiaF) && (!q || e.nombre.toLowerCase().includes(q)));
  if (!filtrados.length) return <div className="ejb-vacio">No hay ejercicios con este filtro.</div>;
  return (
    <div className="ejx-wrap">
      <div className="ejx-hint">Editá cualquier celda. Arrastrá ⠿ para reordenar. Tocá <b>abrir</b> para ver y editar las progresiones del ejercicio.</div>
      <table className="ejx-tabla">
        <thead><tr><th className="ejx-h-drag"></th><th>Clasificación</th><th>Subclasificación</th><th>Nombre</th><th>Plano</th><th className="ejx-h-acc"></th></tr></thead>
        <tbody>
          {filtrados.map((e) => (
            <tr key={e.id}
              className={"ejx-fila" + (over === e.id ? " over" : "") + (drag === e.id ? " dragging" : "")}
              onDragOver={(ev) => { ev.preventDefault(); if (over !== e.id) setOver(e.id); }}
              onDrop={(ev) => { ev.preventDefault(); onReorder(drag, e.id); setDrag(null); setOver(null); }}>
              <td className="ejx-drag" draggable onDragStart={() => setDrag(e.id)} onDragEnd={() => { setDrag(null); setOver(null); }} title="Arrastrar para reordenar">⠿</td>
              <td><select className="ejx-sel" value={famDe(e.seccion)} onChange={(ev) => onCampo(e.id, "familia", ev.target.value)}>
                {familias.map((f) => <option key={f.id} value={f.id}>{f.nombre}</option>)}
              </select></td>
              <td><select className="ejx-sel" value={e.seccion} onChange={(ev) => onCampo(e.id, "seccion", ev.target.value)}>
                {secciones.filter((s) => s.familia === famDe(e.seccion)).map((s) => <option key={s.id} value={s.id}>{s.nombre}</option>)}
              </select></td>
              <td><input className="ejx-nom" value={e.nombre} onChange={(ev) => onCampo(e.id, "nombre", ev.target.value)}></input></td>
              <td><select className="ejx-sel chico" value={e.plano || ""} onChange={(ev) => onCampo(e.id, "plano", ev.target.value)}>
                {PLN.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select></td>
              <td className="ejx-acc"><button className="ejx-abrir" onClick={() => onAbrir(e)}>abrir ›</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

Object.assign(window, { EjerciciosBiblioteca });
