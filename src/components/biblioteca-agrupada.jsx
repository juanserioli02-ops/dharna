// DHARMA — Biblioteca agrupada por secciones (crear/renombrar/eliminar sección, crear/mover/eliminar clase)

function PromptModal({ titulo, valorInicial, ok, onOk, onCancel }) {
  const [v, setV] = React.useState(valorInicial || "");
  React.useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onCancel(); if (e.key === "Enter" && v.trim()) onOk(v.trim()); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [v]);
  return (
    <div>
      <div className="telon" onClick={onCancel}></div>
      <div className="mini-modal">
        <h3>{titulo}</h3>
        <input autoFocus value={v} onChange={(e) => setV(e.target.value)} placeholder="Nombre"></input>
        <div className="mini-modal-pie">
          <button className="btn-secundario" onClick={onCancel}>Cancelar</button>
          <button className="btn-primario" disabled={!v.trim()} onClick={() => onOk(v.trim())}>{ok || "Guardar"}</button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ titulo, texto, ok, onOk, onCancel }) {
  return (
    <div>
      <div className="telon" onClick={onCancel}></div>
      <div className="mini-modal">
        <h3>{titulo}</h3>
        <p className="mm-texto">{texto}</p>
        <div className="mini-modal-pie">
          <button className="btn-secundario" onClick={onCancel}>Cancelar</button>
          <button className="btn-primario peligro" onClick={onOk}>{ok || "Eliminar"}</button>
        </div>
      </div>
    </div>
  );
}

function ListaClasesReordenable({ lista, secciones, seccionActual, subActual, subseccionesSeccion, onMoverSub, esVisibleFn, onToggleVisible, onAbrir, onMover, onDuplicar, onEditar, onEliminar, onReordenar }) {
  const [drag, setDrag] = React.useState(null);
  const [over, setOver] = React.useState(null);
  const [menuId, setMenuId] = React.useState(null);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    if (menuId == null) return;
    const fuera = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuId(null); };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [menuId]);

  const soltar = (destId) => {
    if (drag == null || drag === destId) { setDrag(null); setOver(null); return; }
    const ids = lista.map((c) => c.id);
    const from = ids.indexOf(drag), to = ids.indexOf(destId);
    ids.splice(from, 1);
    ids.splice(to, 0, drag);
    onReordenar(ids);
    setDrag(null); setOver(null);
  };

  const otrasDe = (c) => secciones.filter((s) => s.id !== seccionActual);

  return (
    <div className="lista-clases">
      {lista.map((c) => (
        <div key={c.id} className={"fila-clase" + (over === c.id ? " over" : "") + (drag === c.id ? " arrastrando" : "")}
          onDragOver={(e) => { e.preventDefault(); if (over !== c.id) setOver(c.id); }}
          onDrop={(e) => { e.preventDefault(); soltar(c.id); }}
          onClick={() => onAbrir(c.id)}>
          <span className="fc-drag" draggable onClick={(e) => e.stopPropagation()} onDragStart={() => setDrag(c.id)} onDragEnd={() => { setDrag(null); setOver(null); }} title="Arrastrar para reordenar">⠿</span>
          <span className="fc-icono"><IconoCat tipo={c.icono} size={16}></IconoCat></span>
          <span className="fc-nombre">{c.nombre}</span>
          <span className="fc-meta">{(c.duracionTotal || c.duracion) ? (c.duracionTotal || c.duracion) + "′" : ""}</span>
          <span className="fc-meta">{c.horarios || "A definir"}</span>
          {esVisibleFn(c.id) ? <span className="fc-badge">Visible</span> : null}
          <div className="card-menu-wrap" ref={menuId === c.id ? menuRef : null} onClick={(e) => e.stopPropagation()}>
            <button className="btn-cardmenu" onClick={() => setMenuId(menuId === c.id ? null : c.id)} aria-label="Opciones"><IconMenu></IconMenu></button>
            {menuId === c.id ? (
              <div className="card-menu">
                <button className={esVisibleFn(c.id) ? "opc-visible on" : "opc-visible"} onClick={() => { setMenuId(null); onToggleVisible(c.id); }}>
                  {esVisibleFn(c.id) ? "✓ Visible para alumnos" : "Mostrar a alumnos"}
                </button>
                <div className="card-menu-sep"></div>
                <button onClick={() => { setMenuId(null); onDuplicar(c.id); }}>Duplicar clase</button>
                <button onClick={() => { setMenuId(null); onEditar(c.id); }}>Editar clase</button>
                <button className="peligro" onClick={() => { setMenuId(null); onEliminar(c.id, c.nombre); }}>Eliminar clase</button>
                <div className="card-menu-sep"></div>
                <div className="card-menu-label">Mover a sub-sección</div>
                <button className={!subActual ? "on" : ""} onClick={() => { setMenuId(null); onMoverSub(c.id, ""); }}>Sin sub-sección</button>
                {(subseccionesSeccion || []).map((n) => (
                  <button key={n} className={subActual === n ? "on" : ""} onClick={() => { setMenuId(null); onMoverSub(c.id, n); }}>{n}</button>
                ))}
                <div className="card-menu-sep"></div>
                <div className="card-menu-label">Mover a sección</div>
                {otrasDe(c).map((s) => (
                  <button key={s.id} onClick={() => { setMenuId(null); onMover(c.id, s.id); }}>{s.nombre}</button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function TarjetaClase({ clase, personas, secciones, seccionActual, subActual, subseccionesSeccion, onMoverSub, esVisible, onToggleVisible, onAbrir, onMover, onDuplicar, onEditar, onEliminar }) {
  const [menu, setMenu] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!menu) return;
    const fuera = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [menu]);

  const otras = secciones.filter((s) => s.id !== seccionActual);
  const crearSubAqui = () => {
    const n = window.prompt("Nombre de la sub-sección");
    if (n && n.trim()) { setMenu(false); onMoverSub(clase.id, n.trim()); }
  };

  return (
    <article className="tarjeta-clase" onClick={() => onAbrir(clase.id)} data-screen-label={"Clase — " + clase.nombre}>
      <div className="fila-icono">
        <span className="icono-cat"><IconoCat tipo={clase.icono} size={20}></IconoCat></span>
        <div className="ti-derecha">
          <div className="card-menu-wrap" ref={ref} onClick={(e) => e.stopPropagation()}>
            <button className="btn-cardmenu" onClick={() => setMenu((m) => !m)} aria-label="Opciones"><IconMenu></IconMenu></button>
            {menu ? (
              <div className="card-menu">
                <button className={esVisible ? "opc-visible on" : "opc-visible"} onClick={() => { setMenu(false); onToggleVisible(clase.id); }}>
                  {esVisible ? "✓ Visible para alumnos" : "Mostrar a alumnos"}
                </button>
                <div className="card-menu-sep"></div>
                <button onClick={() => { setMenu(false); onDuplicar(clase.id); }}>Duplicar clase</button>
                <button onClick={() => { setMenu(false); onEditar(clase.id); }}>Editar clase</button>
                <button className="peligro" onClick={() => { setMenu(false); onEliminar(clase.id); }}>Eliminar clase</button>
                <div className="card-menu-sep"></div>
                <div className="card-menu-label">Mover a sub-sección</div>
                <button className={!subActual ? "on" : ""} onClick={() => { setMenu(false); onMoverSub(clase.id, ""); }}>Sin sub-sección</button>
                {(subseccionesSeccion || []).map((n) => (
                  <button key={n} className={subActual === n ? "on" : ""} onClick={() => { setMenu(false); onMoverSub(clase.id, n); }}>{n}</button>
                ))}
                <button className="opc-nueva-sub" onClick={crearSubAqui}>+ Nueva sub-sección…</button>
                <div className="card-menu-sep"></div>
                <div className="card-menu-label">Mover a sección</div>
                {otras.length === 0 ? <div className="card-menu-vacio">No hay otras secciones</div> : null}
                {otras.map((s) => (
                  <button key={s.id} onClick={() => { setMenu(false); onMover(clase.id, s.id); }}>{s.nombre}</button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <h3>{clase.nombre || "Sin nombre"}</h3>
      {esVisible ? <span className="badge-visible">Visible para alumnos</span> : null}
      <p className="desc">{clase.descripcion}</p>
      <div className="fila-meta">
        <ChipNivel nivel={clase.nivel}></ChipNivel>
        <span className="tc-meta">{clase.duracion}′{clase.horarios ? " · " + clase.horarios : ""}</span>
      </div>
      <div className="pie-tarjeta">
        <span className="dato-pie">Coach <strong>{clase.coach}</strong></span>
      </div>
    </article>
  );
}

/* ---------- panel "Hoy" — qué pasa hoy en el centro, a la vista apenas se abre ---------- */
const HOY_CLAVE_CAL = "dharma-calendario-v1";
const HOY_DIAS_LARGO = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
function HoyBanner({ clases, onAbrir }) {
  const hoy = new Date();
  const iso = hoy.toISOString().slice(0, 10);
  const wd = (hoy.getDay() + 6) % 7; // 0=lunes
  const eventos = React.useMemo(() => {
    let all = [];
    try { all = JSON.parse(localStorage.getItem(HOY_CLAVE_CAL)) || []; } catch (e) {}
    return all
      .filter((e) => (e.repite || []).length ? (e.repite.includes(wd) && e.fecha <= iso) : e.fecha === iso)
      .sort((a, b) => (a.inicio || "").localeCompare(b.inicio || ""));
  }, []);
  if (!eventos.length) return (
    <section className="hoy-banner">
      <div className="hoy-banner-cab">
        <span className="hoy-banner-eyebrow">Hoy · {HOY_DIAS_LARGO[wd]}</span>
        <h2>Agenda de hoy</h2>
      </div>
      <p className="hoy-banner-vacio">Sin actividades programadas para hoy. Cargalas desde Calendario.</p>
    </section>
  );
  return (
    <section className="hoy-banner">
      <div className="hoy-banner-cab">
        <span className="hoy-banner-eyebrow">Hoy · {HOY_DIAS_LARGO[wd]}</span>
        <h2>Esta es la agenda de hoy</h2>
      </div>
      <div className="hoy-banner-lista">
        {eventos.map((ev) => {
          const clase = ev.claseId ? clases.find((c) => c.id === ev.claseId) : null;
          const clickable = !!clase;
          return (
            <button
              key={ev.id}
              className={"hoy-item" + (clickable ? "" : " sin-clase")}
              onClick={() => clickable && onAbrir(clase.id)}
              disabled={!clickable}
            >
              <span className="hoy-item-fila">
                <span className="hoy-item-hora">{ev.inicio}</span>
                <span className="hoy-item-color" style={{ background: ev.color || "var(--acento)" }}></span>
                <span className="hoy-item-tit">{ev.titulo || (clase ? clase.nombre : "Actividad")}</span>
                {ev.coach ? <span className="hoy-item-coach">{ev.coach}</span> : null}
                {clickable ? <span className="hoy-item-flecha">Ver clase →</span> : null}
              </span>
              {ev.nota ? <span className="hoy-item-nota"><b>Nota:</b> {ev.nota}</span> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function IconoCarpeta({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    </svg>
  );
}

function Biblioteca({ clases, secciones, personas, getSeccionDe, getSubseccionDe, subseccionesList, onMoverSubseccion, onNuevaSubseccion, onRenombrarSubseccion, onEliminarSubseccion, clasesVisibles, onToggleVisible, onAbrir, onNuevaSeccion, onRenombrarSeccion, onEliminarSeccion, onNuevaClase, onMoverClase, onReordenarClases, ordenClases, onDuplicarClase, onEditarClase, onEliminarClase, nav, setNav }) {
  const [modal, setModal] = React.useState(null);
  const [menuSeccion, setMenuSeccion] = React.useState(null);
  const [busca, setBusca] = React.useState("");
  const [menuSub, setMenuSub] = React.useState(null); // "seccionId::sub"
  const [vistaFormato, setVistaFormatoRaw] = React.useState(() => { try { return localStorage.getItem("dharma-biblio-formato") || "grilla"; } catch (e) { return "grilla"; } });
  const setVistaFormato = (v) => { setVistaFormatoRaw(v); try { localStorage.setItem("dharma-biblio-formato", v); } catch (e) {} };
  const ordenar = (lista) => lista.slice().sort((a, b) => {
    const oa = ordenClases[a.id], ob = ordenClases[b.id];
    if (oa == null && ob == null) return 0;
    if (oa == null) return 1;
    if (ob == null) return -1;
    return oa - ob;
  });
  React.useEffect(() => {
    if (menuSub == null) return;
    const fuera = () => setMenuSub(null);
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [menuSub]);

  // clases agrupadas por sección
  const porSeccion = {};
  secciones.forEach((s) => { porSeccion[s.id] = []; });
  clases.forEach((c) => { const sid = getSeccionDe(c); (porSeccion[sid] || porSeccion[secciones[0] && secciones[0].id] || []).push(c); });

  // sub-secciones de una sección: gestionadas + en uso + "sin sub-sección" si aplica
  const subsDe = (sid) => {
    const gestionadas = (subseccionesList || []).filter((x) => x.seccion === sid).map((x) => x.nombre);
    const enUso = (porSeccion[sid] || []).map((c) => getSubseccionDe(c)).filter(Boolean);
    return [...new Set([...gestionadas, ...enUso])].sort((a, b) => a.localeCompare(b));
  };
  const clasesDe = (sid, sub) => ordenar((porSeccion[sid] || []).filter((c) => getSubseccionDe(c) === sub));
  const sueltasDe = (sid) => ordenar((porSeccion[sid] || []).filter((c) => !getSubseccionDe(c)));

  const cerrarMenuSec = () => setMenuSeccion(null);
  React.useEffect(() => {
    if (menuSeccion == null) return;
    const fuera = () => setMenuSeccion(null);
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [menuSeccion]);

  // ---------- NIVEL 2: dentro de una sub-sección (listado de clases) ----------
  if (nav && nav.tipo === "sub") {
    const sec = secciones.find((s) => s.id === nav.seccionId);
    if (!sec) { setNav({ tipo: "root" }); return null; }
    const esSueltas = nav.sub === "";
    const lista = esSueltas ? sueltasDe(sec.id) : clasesDe(sec.id, nav.sub);
    const subNombres = subsDe(sec.id);
    return (
      <main className="contenido" data-screen-label={"Biblioteca — " + (esSueltas ? "Sin sub-sección" : nav.sub)}>
        <button className="volver" onClick={() => setNav({ tipo: "root" })}>← Biblioteca</button>
        <div className="biblio-breadcrumb">
          <button onClick={() => setNav({ tipo: "root" })}>{sec.nombre}</button>
          <span className="bc-sep">/</span>
          <span className="bc-actual">{esSueltas ? "Sin sub-sección" : nav.sub}</span>
        </div>
        <div className="encabezado-vista">
          <div>
            <h1 className="titulo-vista">{esSueltas ? "Sin sub-sección" : nav.sub}</h1>
            <p className="subtitulo-vista">{lista.length} {lista.length === 1 ? "clase" : "clases"} en este tipo.</p>
          </div>
          <div className="acciones-vista">
            <div className="formato-toggle">
              <button className={vistaFormato === "grilla" ? "activo" : ""} onClick={() => setVistaFormato("grilla")} title="Vista en tarjetas"><UIIcon sw={2}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect></UIIcon></button>
              <button className={vistaFormato === "lista" ? "activo" : ""} onClick={() => setVistaFormato("lista")} title="Vista en lista (reordenable)"><UIIcon sw={2}><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></UIIcon></button>
            </div>
            <button className="btn-primario" onClick={() => onNuevaClase(sec.id, esSueltas ? "" : nav.sub)}>+ Nueva clase</button>
            {!esSueltas ? (
              <div className="card-menu-wrap" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                <button className="btn-cardmenu grande" onClick={() => setMenuSub(menuSub === "lvl2" ? null : "lvl2")} aria-label="Opciones de sub-sección"><IconMenu></IconMenu></button>
                {menuSub === "lvl2" ? (
                  <div className="card-menu">
                    <button onClick={() => { setMenuSub(null); setModal({ tipo: "renombrar-sub", seccion: sec, sub: nav.sub }); }}>Renombrar sub-sección</button>
                    <button className="peligro" onClick={() => { setMenuSub(null); setModal({ tipo: "eliminar-sub", seccion: sec, sub: nav.sub, n: lista.length }); }}>Eliminar sub-sección</button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        {lista.length === 0 ? (
          <div className="seccion-vacia">
            <span>Todavía no hay clases en {esSueltas ? "esta sección" : "“" + nav.sub + "”"}.</span>
            <button className="btn-agregar-item" onClick={() => onNuevaClase(sec.id, esSueltas ? "" : nav.sub)}>+ Agregar clase</button>
          </div>
        ) : vistaFormato === "lista" ? (
          <ListaClasesReordenable
            lista={lista}
            secciones={secciones}
            seccionActual={sec.id}
            subActual={esSueltas ? "" : nav.sub}
            subseccionesSeccion={subNombres}
            onMoverSub={onMoverSubseccion}
            esVisibleFn={(id) => (clasesVisibles || []).includes(id)}
            onToggleVisible={onToggleVisible}
            onAbrir={onAbrir}
            onMover={onMoverClase}
            onDuplicar={onDuplicarClase}
            onEditar={onEditarClase}
            onEliminar={(id, nombre) => setModal({ tipo: "eliminar-clase", id, nombre })}
            onReordenar={onReordenarClases}
          ></ListaClasesReordenable>
        ) : (
          <div className="grilla-clases">
            {lista.map((c) => (
              <TarjetaClase
                key={c.id}
                clase={c}
                personas={personas}
                secciones={secciones}
                seccionActual={sec.id}
                subActual={getSubseccionDe(c)}
                subseccionesSeccion={subNombres}
                onMoverSub={onMoverSubseccion}
                esVisible={(clasesVisibles || []).includes(c.id)}
                onToggleVisible={onToggleVisible}
                onAbrir={onAbrir}
                onMover={onMoverClase}
                onDuplicar={onDuplicarClase}
                onEditar={onEditarClase}
                onEliminar={(id) => setModal({ tipo: "eliminar-clase", id, nombre: c.nombre })}
              ></TarjetaClase>
            ))}
          </div>
        )}

        {modal && modal.tipo === "eliminar-clase" ? (
          <ConfirmModal titulo="Eliminar clase" texto={"Se eliminará “" + modal.nombre + "” definitivamente."} onCancel={() => setModal(null)} onOk={() => { onEliminarClase(modal.id); setModal(null); }}></ConfirmModal>
        ) : null}
        {modal && modal.tipo === "renombrar-sub" ? (
          <PromptModal titulo="Renombrar sub-sección" valorInicial={modal.sub} onCancel={() => setModal(null)} onOk={(n) => { onRenombrarSubseccion(modal.seccion.id, modal.sub, n); setNav({ tipo: "sub", seccionId: modal.seccion.id, sub: n }); setModal(null); }}></PromptModal>
        ) : null}
        {modal && modal.tipo === "eliminar-sub" ? (
          <ConfirmModal
            titulo="Eliminar sub-sección"
            texto={modal.n > 0 ? ("Las " + modal.n + " clases de “" + modal.sub + "” quedarán sin sub-sección (no se eliminan). ¿Continuar?") : ("Se eliminará la sub-sección “" + modal.sub + "”. ¿Continuar?")}
            onCancel={() => setModal(null)}
            onOk={() => { onEliminarSubseccion(modal.seccion.id, modal.sub); setNav({ tipo: "root" }); setModal(null); }}
          ></ConfirmModal>
        ) : null}
      </main>
    );
  }

  // ---------- NIVEL 1: secciones + carpetas de sub-secciones ----------
  const q = busca.trim().toLowerCase();
  const nombreSec = (sid) => (secciones.find((s) => s.id === sid) || {}).nombre || "";
  const resultados = q
    ? clases.filter((c) => (
        (c.nombre || "") + " " + (c.descripcion || "") + " " + nombreSec(getSeccionDe(c)) + " " + getSubseccionDe(c)
      ).toLowerCase().includes(q))
    : null;

  return (
    <main className="contenido" data-screen-label="Biblioteca de clases">
      <div className="encabezado-vista">
        <div>
          <h1 className="titulo-vista">Biblioteca de clases</h1>
          <p className="subtitulo-vista">Organizadas por sección y tipo.</p>
        </div>
        <div className="acciones-vista">
          <label className="buscador">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
            </svg>
            <input type="search" placeholder="Buscar clase…" value={busca} onChange={(e) => setBusca(e.target.value)}></input>
          </label>
          <button className="btn-primario" onClick={() => setModal({ tipo: "nueva-seccion" })}>+ Nueva sección</button>
        </div>
      </div>

      {resultados ? (
        <div className="biblio-resultados">
          <p className="resultados-info">{resultados.length} {resultados.length === 1 ? "resultado" : "resultados"} para “{busca.trim()}”</p>
          {resultados.length === 0 ? (
            <div className="seccion-vacia"><span>No se encontraron clases.</span></div>
          ) : (
            <div className="grilla-clases">
              {resultados.map((c) => {
                const sid = getSeccionDe(c);
                const sub = getSubseccionDe(c);
                return (
                  <div className="resultado-wrap" key={c.id}>
                    <div className="resultado-ruta">{nombreSec(sid)}{sub ? " / " + sub : ""}</div>
                    <TarjetaClase
                      clase={c}
                      personas={personas}
                      secciones={secciones}
                      seccionActual={sid}
                      subActual={sub}
                      subseccionesSeccion={subsDe(sid)}
                      onMoverSub={onMoverSubseccion}
                      esVisible={(clasesVisibles || []).includes(c.id)}
                      onToggleVisible={onToggleVisible}
                      onAbrir={onAbrir}
                      onMover={onMoverClase}
                      onDuplicar={onDuplicarClase}
                      onEditar={onEditarClase}
                      onEliminar={(id) => setModal({ tipo: "eliminar-clase", id, nombre: c.nombre })}
                    ></TarjetaClase>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : null}

      {!resultados ? secciones.map((s) => {
        const subs = subsDe(s.id);
        const sueltas = sueltasDe(s.id);
        const totalSec = (porSeccion[s.id] || []).length;
        return (
          <section className={"biblio-seccion" + (totalSec === 0 ? " vacia" : "")} key={s.id}>
            <div className="seccion-cab">
              <div className="seccion-titulo-wrap">
                <h2 className="seccion-titulo">{s.nombre}</h2>
                <span className="seccion-conteo">{totalSec}</span>
              </div>
              <div className="seccion-acciones">
                <button className="btn-mini nueva-clase" onClick={() => onNuevaClase(s.id)}>+ Nueva clase</button>
                <div className="card-menu-wrap" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                  <button className="btn-cardmenu" onClick={() => setMenuSeccion(menuSeccion === s.id ? null : s.id)} aria-label="Opciones de sección"><IconMenu></IconMenu></button>
                  {menuSeccion === s.id ? (
                    <div className="card-menu">
                      <button onClick={() => { cerrarMenuSec(); setModal({ tipo: "nueva-sub", seccion: s }); }}>Nueva sub-sección</button>
                      <button onClick={() => { cerrarMenuSec(); setModal({ tipo: "renombrar", seccion: s }); }}>Renombrar sección</button>
                      {secciones.length > 1 ? (
                        <button className="peligro" onClick={() => { cerrarMenuSec(); setModal({ tipo: "eliminar-seccion", seccion: s }); }}>Eliminar sección</button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {subs.length === 0 && sueltas.length === 0 ? (
              <div className="seccion-vacia">
                <span>Sin clases en esta sección.</span>
                <button className="btn-agregar-item" onClick={() => setModal({ tipo: "nueva-sub", seccion: s })}>+ Nueva sub-sección</button>
              </div>
            ) : (
              <div className="grilla-carpetas">
                {subs.map((sub) => {
                  const n = clasesDe(s.id, sub).length;
                  const key = s.id + "::" + sub;
                  return (
                    <div className="tarjeta-carpeta" key={sub} onClick={() => setNav({ tipo: "sub", seccionId: s.id, sub })}>
                      <span className="carpeta-icono"><IconoCarpeta></IconoCarpeta></span>
                      <span className="carpeta-info">
                        <span className="carpeta-nombre">{sub}</span>
                        <span className="carpeta-conteo">{n} {n === 1 ? "clase" : "clases"}</span>
                      </span>
                      <div className="card-menu-wrap" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                        <button className="btn-cardmenu" onClick={() => setMenuSub(menuSub === key ? null : key)} aria-label="Opciones de sub-sección"><IconMenu></IconMenu></button>
                        {menuSub === key ? (
                          <div className="card-menu">
                            <button onClick={() => { setMenuSub(null); setNav({ tipo: "sub", seccionId: s.id, sub }); }}>Abrir</button>
                            <button onClick={() => { setMenuSub(null); setModal({ tipo: "renombrar-sub", seccion: s, sub }); }}>Renombrar</button>
                            <button className="peligro" onClick={() => { setMenuSub(null); setModal({ tipo: "eliminar-sub", seccion: s, sub, n }); }}>Eliminar</button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
                {sueltas.length > 0 ? (
                  <button className="tarjeta-carpeta suelta" onClick={() => setNav({ tipo: "sub", seccionId: s.id, sub: "" })}>
                    <span className="carpeta-icono"><IconoCarpeta></IconoCarpeta></span>
                    <span className="carpeta-info">
                      <span className="carpeta-nombre">Sin sub-sección</span>
                      <span className="carpeta-conteo">{sueltas.length} {sueltas.length === 1 ? "clase" : "clases"}</span>
                    </span>
                    <span className="carpeta-flecha">→</span>
                  </button>
                ) : null}
                <button className="tarjeta-carpeta nueva" onClick={() => setModal({ tipo: "nueva-sub", seccion: s })}>
                  <span className="carpeta-mas">+</span>
                  <span className="carpeta-nombre">Nueva sub-sección</span>
                </button>
              </div>
            )}
          </section>
        );
      }) : null}

      {modal && modal.tipo === "nueva-seccion" ? (
        <PromptModal titulo="Nueva sección" ok="Crear" onCancel={() => setModal(null)} onOk={(n) => { onNuevaSeccion(n); setModal(null); }}></PromptModal>
      ) : null}
      {modal && modal.tipo === "nueva-sub" ? (
        <PromptModal titulo={"Nueva sub-sección en " + modal.seccion.nombre} ok="Crear" onCancel={() => setModal(null)} onOk={(n) => { onNuevaSubseccion(modal.seccion.id, n); setNav({ tipo: "sub", seccionId: modal.seccion.id, sub: n }); setModal(null); }}></PromptModal>
      ) : null}
      {modal && modal.tipo === "renombrar-sub" ? (
        <PromptModal titulo="Renombrar sub-sección" valorInicial={modal.sub} onCancel={() => setModal(null)} onOk={(n) => { onRenombrarSubseccion(modal.seccion.id, modal.sub, n); if (nav && nav.tipo === "sub" && nav.sub === modal.sub) setNav({ tipo: "sub", seccionId: modal.seccion.id, sub: n }); setModal(null); }}></PromptModal>
      ) : null}
      {modal && modal.tipo === "eliminar-sub" ? (
        <ConfirmModal
          titulo="Eliminar sub-sección"
          texto={modal.n > 0 ? ("Las " + modal.n + " clases de “" + modal.sub + "” quedarán sin sub-sección (no se eliminan). ¿Continuar?") : ("Se eliminará la sub-sección “" + modal.sub + "”. ¿Continuar?")}
          onCancel={() => setModal(null)}
          onOk={() => { onEliminarSubseccion(modal.seccion.id, modal.sub); setModal(null); }}
        ></ConfirmModal>
      ) : null}

      {modal && modal.tipo === "eliminar-clase" ? (
        <ConfirmModal titulo="Eliminar clase" texto={"Se eliminará “" + modal.nombre + "” definitivamente."} onCancel={() => setModal(null)} onOk={() => { onEliminarClase(modal.id); setModal(null); }}></ConfirmModal>
      ) : null}

      {modal && modal.tipo === "renombrar" ? (
        <PromptModal titulo="Renombrar sección" valorInicial={modal.seccion.nombre} onCancel={() => setModal(null)} onOk={(n) => { onRenombrarSeccion(modal.seccion.id, n); setModal(null); }}></PromptModal>
      ) : null}
      {modal && modal.tipo === "eliminar-seccion" ? (
        <ConfirmModal
          titulo="Eliminar sección"
          texto={"Las clases de “" + modal.seccion.nombre + "” se moverán a la primera sección. ¿Continuar?"}
          onCancel={() => setModal(null)}
          onOk={() => { onEliminarSeccion(modal.seccion.id); setModal(null); }}
        ></ConfirmModal>
      ) : null}
    </main>
  );
}

Object.assign(window, { Biblioteca, PromptModal, ConfirmModal, HoyBanner });
