// DHARMA — sección Personas: lista, formulario de perfil, vista completa y rutina individual

/* ====================================================================
   LISTA DE PERSONAS
   ==================================================================== */
function Personas({ personas, planes, socios, onGuardarSocio, onGuardarPlanes, infoAlumno, onGuardarInfoAlumno, onToggleActivo, onEliminarPersona, onEliminarPersonasMasivo, config, onConfig, grupos, busqueda, setBusqueda, onAbrirPersona, onNuevo, onMulti, onNuevoGrupo, onRenombrarGrupo, onEliminarGrupo, onAsignarGrupo, onGuardarPersonas }) {
  const [filtro, setFiltro] = React.useState("todos"); // "todos" | grupoId | "sin"
  const [filtroMemb, setFiltroMemb] = React.useState("todos"); // todos | activa | porvencer | vencida | sinplan | pendiente
  const [filtrosAbiertos, setFiltrosAbiertos] = React.useState(() => { try { return localStorage.getItem("dharma-filtros-personas-abiertos") === "1" || filtro !== "todos"; } catch (e) { return false; } });
  const [modal, setModal] = React.useState(null);
  const [menuGrupo, setMenuGrupo] = React.useState(null);
  const [editarPlanes, setEditarPlanes] = React.useState(false);
  const [editarInfo, setEditarInfo] = React.useState(false);
  const [vista, setVista] = React.useState("planilla"); // tarjetas | planilla
  const [masAcciones, setMasAcciones] = React.useState(false);

  const estadoMembDe = (p) => {
    const sub = socios[p.id];
    const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
    const est = window.Membresia ? window.Membresia.estado(sub, plan) : { key: "sinplan", label: "Sin plan", cls: "sinplan" };
    const pendiente = !sub && p.planSolicitado && planes.some((pl) => pl.id === p.planSolicitado);
    return { sub, plan, est, pendiente };
  };
  const pasaMemb = (p) => {
    if (filtroMemb === "todos") return true;
    const { est, pendiente } = estadoMembDe(p);
    if (filtroMemb === "pendiente") return pendiente;
    return est.key === filtroMemb;
  };
  const contMemb = (k) => personas.filter((p) => (k === "pendiente" ? estadoMembDe(p).pendiente : estadoMembDe(p).est.key === k)).length;

  const q = busqueda.trim().toLowerCase();
  const ordenadas = [...personas].sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
  const buscadas = (q
    ? ordenadas.filter((p) => (p.nombre + " " + p.objetivo + " " + p.nivel + " " + (p.deporte || "") + " " + (p.email || "") + " " + (p.telefono || "")).toLowerCase().includes(q))
    : ordenadas).filter(pasaMemb);

  // alertas de wellness por persona
  const alertasDe = (p) => (window.calcularAlertasWellness ? window.calcularAlertasWellness(p.wellness).alertas : []);

  const grupoNombre = (id) => (grupos.find((g) => g.id === id) || {}).nombre;
  const enGrupo = (p, gid) => gid === "sin" ? !p.grupo || !grupos.some((g) => g.id === p.grupo) : p.grupo === gid;

  const visibles = filtro === "todos" ? buscadas : buscadas.filter((p) => enGrupo(p, filtro));

  // secciones a mostrar cuando filtro = todos
  const sinGrupo = buscadas.filter((p) => enGrupo(p, "sin"));
  const seccionesG = grupos.map((g) => ({ g, items: buscadas.filter((p) => p.grupo === g.id) }))
    .concat(sinGrupo.length ? [{ g: { id: "sin", nombre: "Sin grupo" }, items: sinGrupo }] : []);

  const conteoFiltro = (gid) => personas.filter((p) => enGrupo(p, gid)).length;

  React.useEffect(() => {
    if (menuGrupo == null) return;
    const fuera = () => setMenuGrupo(null);
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [menuGrupo]);

  React.useEffect(() => {
    if (!masAcciones) return;
    const fuera = () => setMasAcciones(false);
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [masAcciones]);

  const Tarjeta = (p) => {
    const al = alertasDe(p);
    const tieneAlta = al.some((a) => a.nivel === "alta");
    const { plan, est, pendiente } = estadoMembDe(p);
    return (
      <button className="tarjeta-persona" key={p.id} onClick={() => onAbrirPersona(p.id)}>
        <Avatar persona={p} size={44}></Avatar>
        <span style={{ minWidth: 0, flex: 1 }}>
          <div className="nombre">{p.nombre}{p.edad ? <span className="edad-inline"> · {p.edad}</span> : null}</div>
          <div className="objetivo">{p.objetivo}</div>
          <div className="fila-meta">
            <ChipNivel nivel={p.nivel}></ChipNivel>
            {plan ? <span className="chip mb-plan-chip-mini" style={{ "--cat": plan.color }}><span className="dot"></span>{plan.nombre}</span>
              : pendiente ? <span className="chip mb-pend-mini">Pidió plan</span>
              : est.key === "sinplan" ? <span className="chip mb-sinplan-mini">Sin plan</span> : null}
            {al.length > 0 ? <span className={"chip" + (tieneAlta ? " alerta" : " aviso")}><IconoAlerta size={11}></IconoAlerta> bienestar</span> : null}
            {(p.lesiones && p.lesiones.length > 0) ? <span className="chip alerta"><IconoAlerta size={11}></IconoAlerta> {p.lesiones.length} adaptación{p.lesiones.length > 1 ? "es" : ""}</span> : null}
          </div>
        </span>
      </button>
    );
  };

  return (
    <main className="contenido" data-screen-label="Personas">
      <div className="encabezado-vista">
        <div>
          <h1 className="titulo-vista">Personas</h1>
          <p className="subtitulo-vista">Perfiles, procesos, bienestar y membresías. {personas.length} total.</p>
        </div>
        <div className="acciones-vista">
          <label className="buscador">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="16.5" y1="16.5" x2="21" y2="21"></line>
            </svg>
            <input type="search" placeholder="Buscar persona…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
          </label>
          <button className="btn-primario" onClick={onNuevo}>+ Nuevo perfil</button>
          <div className="acciones-mas-wrap">
            <button className="btn-secundario" onClick={() => setMasAcciones((v) => !v)}>Más ⋯</button>
            {masAcciones ? (
              <div className="card-menu" onMouseDown={(e) => e.stopPropagation()}>
                <button onClick={() => { setMasAcciones(false); onMulti(); }}>Sala de personalizados</button>
                <button onClick={() => { setMasAcciones(false); setEditarPlanes(true); }}>Planes</button>
                <button onClick={() => { setMasAcciones(false); setEditarInfo(true); }}>Información (alumno)</button>
              </div>
            ) : null}
          </div>
          <div className="switch-vista">
            <button className={vista === "planilla" ? "on" : ""} onClick={() => setVista("planilla")} title="Lista">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="1"></rect><line x1="3" y1="10" x2="21" y2="10"></line><line x1="9" y1="10" x2="9" y2="20"></line></svg>
              <span className="switch-vista-lbl">Lista</span>
            </button>
            <button className={vista === "tarjetas" ? "on" : ""} onClick={() => setVista("tarjetas")} title="Tarjetas">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>
              <span className="switch-vista-lbl">Tarjetas</span>
            </button>
            <button className={vista === "puntajes" ? "on" : ""} onClick={() => setVista("puntajes")} title="Puntajes y rachas">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 20V10M12 20V4M18 20v-7"></path></svg>
              <span className="switch-vista-lbl">Puntajes</span>
            </button>
          </div>
        </div>
      </div>

      <div className="filtros-colapsable">
        <button className="filtros-toggle" onClick={() => setFiltrosAbiertos((v) => { const next = !v; try { localStorage.setItem("dharma-filtros-personas-abiertos", next ? "1" : "0"); } catch (e) {} return next; })}>
          <UIIcon sw={2}><path d="M4 6h16M7 12h10M10 18h4"></path></UIIcon>
          Filtros{(filtro !== "todos" || filtroMemb !== "todos") ? <span className="gf-num on">activos</span> : null}
          <span className={"filtros-caret" + (filtrosAbiertos ? " abierto" : "")}>⌄</span>
        </button>
        {filtrosAbiertos ? (
          <>
            <div className="grupos-filtro">
              <span className="gf-label">Grupo</span>
              <button className={"gf-chip" + (filtro === "todos" ? " activo" : "")} onClick={() => setFiltro("todos")}>Todos <span className="gf-num">{personas.length}</span></button>
              {grupos.map((g) => (
                <span className="gf-wrap" key={g.id}>
                  <button className={"gf-chip" + (filtro === g.id ? " activo" : "")} onClick={() => setFiltro(g.id)}>
                    {g.nombre} <span className="gf-num">{conteoFiltro(g.id)}</span>
                  </button>
                  <button className="gf-menu-btn" onClick={(e) => { e.stopPropagation(); setMenuGrupo(menuGrupo === g.id ? null : g.id); }} aria-label="Opciones del grupo"><IconMenu></IconMenu></button>
                  {menuGrupo === g.id ? (
                    <div className="card-menu" onMouseDown={(e) => e.stopPropagation()} style={{ top: 40 }}>
                      <button onClick={() => { setMenuGrupo(null); setModal({ tipo: "renombrar", grupo: g }); }}>Renombrar grupo</button>
                      <button className="peligro" onClick={() => { setMenuGrupo(null); setModal({ tipo: "eliminar", grupo: g }); }}>Eliminar grupo</button>
                    </div>
                  ) : null}
                </span>
              ))}
              {conteoFiltro("sin") > 0 ? (
                <button className={"gf-chip" + (filtro === "sin" ? " activo" : "")} onClick={() => setFiltro("sin")}>Sin grupo <span className="gf-num">{conteoFiltro("sin")}</span></button>
              ) : null}
              <button className="gf-nuevo" onClick={() => setModal({ tipo: "nuevo" })}>+ Grupo</button>
            </div>

            <div className="grupos-filtro memb-filtro">
              <span className="gf-label">Membresía</span>
              <button className={"gf-chip" + (filtroMemb === "todos" ? " activo" : "")} onClick={() => setFiltroMemb("todos")}>Todas</button>
              <button className={"gf-chip" + (filtroMemb === "activa" ? " activo" : "")} onClick={() => setFiltroMemb(filtroMemb === "activa" ? "todos" : "activa")}>Activos <span className="gf-num">{contMemb("activa")}</span></button>
              <button className={"gf-chip" + (filtroMemb === "porvencer" ? " activo" : "")} onClick={() => setFiltroMemb(filtroMemb === "porvencer" ? "todos" : "porvencer")}>Por vencer <span className="gf-num">{contMemb("porvencer")}</span></button>
              <button className={"gf-chip" + (filtroMemb === "vencida" ? " activo" : "")} onClick={() => setFiltroMemb(filtroMemb === "vencida" ? "todos" : "vencida")}>Vencidos <span className="gf-num">{contMemb("vencida")}</span></button>
              <button className={"gf-chip" + (filtroMemb === "sinplan" ? " activo" : "")} onClick={() => setFiltroMemb(filtroMemb === "sinplan" ? "todos" : "sinplan")}>Sin plan <span className="gf-num">{contMemb("sinplan")}</span></button>
              {contMemb("pendiente") > 0 ? (
                <button className={"gf-chip pend" + (filtroMemb === "pendiente" ? " activo" : "")} onClick={() => setFiltroMemb(filtroMemb === "pendiente" ? "todos" : "pendiente")}>Pendientes de pago <span className="gf-num">{contMemb("pendiente")}</span></button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>

      {vista === "puntajes" ? (
        <PersonasGamif personas={buscadas}></PersonasGamif>
      ) : vista === "planilla" ? (
        <PersonasExcel personas={visibles} grupos={grupos} planes={planes} socios={socios} estadoMembDe={estadoMembDe} onCampo={(id, campo, valor) => onGuardarPersonas(personas.map((p) => p.id === id ? { ...p, [campo]: valor } : p))} onAbrir={onAbrirPersona} onToggleActivo={onToggleActivo} onEliminarMasivo={onEliminarPersonasMasivo}></PersonasExcel>
      ) : filtro === "todos" ? (
        seccionesG.filter((s) => s.items.length).map((s) => (
          <section className="personas-seccion" key={s.g.id}>
            <h2 className="ps-titulo">{s.g.nombre} <span className="ps-num">{s.items.length}</span></h2>
            <div className="grilla-personas">{s.items.map(Tarjeta)}</div>
          </section>
        ))
      ) : (
        <div className="grilla-personas">{visibles.map(Tarjeta)}</div>
      )}

      {(vista !== "planilla" && (filtro === "todos" ? buscadas.length === 0 : visibles.length === 0)) ? (
        <p style={{ color: "var(--ink-3)", marginTop: 24 }}>{q ? "No hay resultados para “" + busqueda + "”." : "No hay personas en este grupo."}</p>
      ) : null}

      {modal && modal.tipo === "nuevo" ? (
        <PromptModal titulo="Nuevo grupo" ok="Crear" onCancel={() => setModal(null)} onOk={(n) => { onNuevoGrupo(n); setModal(null); }}></PromptModal>
      ) : null}
      {modal && modal.tipo === "renombrar" ? (
        <PromptModal titulo="Renombrar grupo" valorInicial={modal.grupo.nombre} onCancel={() => setModal(null)} onOk={(n) => { onRenombrarGrupo(modal.grupo.id, n); setModal(null); }}></PromptModal>
      ) : null}
      {modal && modal.tipo === "eliminar" ? (
        <ConfirmModal
          titulo="Eliminar grupo"
          texto={"Las personas de “" + modal.grupo.nombre + "” quedarán sin grupo (no se eliminan). ¿Continuar?"}
          onCancel={() => setModal(null)}
          onOk={() => { onEliminarGrupo(modal.grupo.id); if (filtro === modal.grupo.id) setFiltro("todos"); setModal(null); }}
        ></ConfirmModal>
      ) : null}

      {editarPlanes ? (
        <PlanesEditorModal planes={planes} config={config} onConfig={onConfig} onCerrar={() => setEditarPlanes(false)} onGuardar={(nuevos) => { onGuardarPlanes(nuevos); window.dharmaToast && window.dharmaToast("Planes actualizados", "ok"); }}></PlanesEditorModal>
      ) : null}

      {editarInfo ? (
        <InfoAlumnoEditorModal info={infoAlumno} onCerrar={() => setEditarInfo(false)} onGuardar={(next) => { onGuardarInfoAlumno(next); window.dharmaToast && window.dharmaToast("Información del alumno actualizada", "ok"); setEditarInfo(false); }}></InfoAlumnoEditorModal>
      ) : null}
    </main>
  );
}

/* ---------- editor de la sección Información del alumno ---------- */
function InfoAlumnoEditorModal({ info, onCerrar, onGuardar }) {
  const base = info && Object.keys(info).length ? info : (window.DHARMA_DATA.info || {});
  const [f, setF] = React.useState(() => ({
    centro: { comoReservar: "", cancelacion: "", vencimiento: "", pagos: [], comoPagar: "", ...(base.centro || {}) },
    nutricion: (base.nutricion || []).map((a) => ({ ...a })),
    descanso: (base.descanso || []).map((a) => ({ ...a })),
    blog: (base.blog || []).map((b) => ({ ...b }))
  }));
  const setCentro = (campo, val) => setF((p) => ({ ...p, centro: { ...p.centro, [campo]: val } }));
  const setPagos = (texto) => setCentro("pagos", texto.split(",").map((s) => s.trim()).filter(Boolean));

  const setArt = (grupo, id, campo, val) => setF((p) => ({ ...p, [grupo]: p[grupo].map((a) => a.id === id ? { ...a, [campo]: val } : a) }));
  const addArt = (grupo) => setF((p) => ({ ...p, [grupo]: [...p[grupo], { id: "n" + Date.now(), titulo: "", texto: "" }] }));
  const delArt = (grupo, id) => setF((p) => ({ ...p, [grupo]: p[grupo].filter((a) => a.id !== id) }));

  const addPost = () => setF((p) => ({ ...p, blog: [{ id: "b" + Date.now(), fecha: new Date().toISOString().slice(0, 7), titulo: "", texto: "" }, ...p.blog] }));
  const setPost = (id, campo, val) => setF((p) => ({ ...p, blog: p.blog.map((b) => b.id === id ? { ...b, [campo]: val } : b) }));
  const delPost = (id) => setF((p) => ({ ...p, blog: p.blog.filter((b) => b.id !== id) }));

  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="mb-modal grande" onClick={(e) => e.stopPropagation()}>
        <header className="mb-modal-cab">
          <div><div className="mb-modal-eyebrow">Panel del alumno</div><h2>Editar Información</h2></div>
          <button className="btn-icono" onClick={onCerrar}><IconX></IconX></button>
        </header>
        <div className="mb-modal-cuerpo" style={{ gap: 26 }}>
          <section className="iae-seccion">
            <h4>Sobre el centro</h4>
            <label className="campo"><span>Cómo reservar</span><textarea rows={3} value={f.centro.comoReservar} onChange={(e) => setCentro("comoReservar", e.target.value)}></textarea></label>
            <label className="campo"><span>Política de cancelación</span><textarea rows={3} value={f.centro.cancelacion} onChange={(e) => setCentro("cancelacion", e.target.value)}></textarea></label>
            <label className="campo"><span>Vencimiento del plan</span><textarea rows={3} value={f.centro.vencimiento} onChange={(e) => setCentro("vencimiento", e.target.value)}></textarea></label>
            <label className="campo"><span>Medios de pago (separados por coma)</span><input value={(f.centro.pagos || []).join(", ")} onChange={(e) => setPagos(e.target.value)}></input></label>
            <label className="campo"><span>Cómo pagar</span><textarea rows={2} value={f.centro.comoPagar} onChange={(e) => setCentro("comoPagar", e.target.value)}></textarea></label>
            <p className="iae-nota">Los precios se toman automáticamente de tus Planes — se editan desde el botón “Planes”.</p>
          </section>

          {[["nutricion", "Nutrición"], ["descanso", "Descanso"]].map(([grupo, tit]) => (
            <section className="iae-seccion" key={grupo}>
              <h4>{tit}</h4>
              {f[grupo].map((a) => (
                <div className="iae-articulo" key={a.id}>
                  <input placeholder="Título" value={a.titulo} onChange={(e) => setArt(grupo, a.id, "titulo", e.target.value)}></input>
                  <textarea rows={2} placeholder="Texto" value={a.texto} onChange={(e) => setArt(grupo, a.id, "texto", e.target.value)}></textarea>
                  <button className="iae-borrar" onClick={() => delArt(grupo, a.id)}>Quitar</button>
                </div>
              ))}
              <button className="btn-secundario chico" onClick={() => addArt(grupo)}>+ Agregar tarjeta</button>
            </section>
          ))}

          <section className="iae-seccion">
            <h4>Blog</h4>
            <button className="btn-secundario chico" onClick={addPost}>+ Nueva nota</button>
            {f.blog.map((b) => (
              <div className="iae-articulo" key={b.id}>
                <div className="form-fila-2">
                  <input placeholder="Título" value={b.titulo} onChange={(e) => setPost(b.id, "titulo", e.target.value)}></input>
                  <input placeholder="AAAA-MM" value={b.fecha} onChange={(e) => setPost(b.id, "fecha", e.target.value)}></input>
                </div>
                <textarea rows={3} placeholder="Texto de la nota" value={b.texto} onChange={(e) => setPost(b.id, "texto", e.target.value)}></textarea>
                <button className="iae-borrar" onClick={() => delPost(b.id)}>Quitar</button>
              </div>
            ))}
          </section>
        </div>
        <footer className="mb-modal-pie">
          <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
          <button className="btn-primario" onClick={() => onGuardar(f)}>Guardar</button>
        </footer>
      </div>
    </div>
  );
}

/* ---------- vista planilla (Excel) editable ---------- */
function PersonasExcel({ personas, grupos, planes, socios, estadoMembDe, onCampo, onAbrir, onToggleActivo, onEliminarMasivo }) {
  const NIVELES = ["Inicial", "Intermedio", "Avanzado"];
  const [sel, setSel] = React.useState(() => new Set());
  const [confirmarBorrado, setConfirmarBorrado] = React.useState(false);
  React.useEffect(() => { setSel((s) => new Set([...s].filter((id) => personas.some((p) => p.id === id)))); }, [personas]);
  const todosSel = personas.length > 0 && personas.every((p) => sel.has(p.id));
  const toggleTodos = () => setSel(todosSel ? new Set() : new Set(personas.map((p) => p.id)));
  const toggleUno = (id) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const bulkGrupo = (grupoId) => { sel.forEach((id) => onCampo(id, "grupo", grupoId || null)); };
  const bulkActivo = (activo) => { sel.forEach((id) => onToggleActivo && onToggleActivo(id, activo)); };
  const bulkBorrar = () => {
    onEliminarMasivo && onEliminarMasivo([...sel]);
    window.dharmaToast && window.dharmaToast(sel.size + " alumno" + (sel.size === 1 ? "" : "s") + " eliminado" + (sel.size === 1 ? "" : "s"), "borrado");
    setSel(new Set());
    setConfirmarBorrado(false);
  };
  return (
    <div className="ej-excel-wrap">
      {sel.size > 0 ? (
        <div className="bulk-bar">
          <span className="bulk-bar-cont">{sel.size} seleccionado{sel.size === 1 ? "" : "s"}</span>
          <select defaultValue="" onChange={(e) => { bulkGrupo(e.target.value); e.target.value = ""; }}>
            <option value="" disabled>Asignar grupo…</option>
            {grupos.map((g) => <option key={g.id} value={g.id}>{g.nombre}</option>)}
          </select>
          <button className="btn-secundario" onClick={() => bulkActivo(true)}>Activar</button>
          <button className="btn-secundario" onClick={() => bulkActivo(false)}>Desactivar</button>
          <button className="btn-secundario peligro" onClick={() => setConfirmarBorrado(true)}>Eliminar</button>
          <button className="bulk-bar-cerrar" onClick={() => setSel(new Set())} aria-label="Cerrar selección">✕</button>
        </div>
      ) : null}
      {confirmarBorrado ? (
        <ConfirmModal titulo="Eliminar alumnos" texto={"¿Eliminar " + sel.size + " alumno" + (sel.size === 1 ? "" : "s") + " seleccionado" + (sel.size === 1 ? "" : "s") + "? Se borra su cuenta, rutina y pagos. No se puede deshacer. Si preferís conservar su historial, usá \"Desactivar\" en su lugar."} onCancel={() => setConfirmarBorrado(false)} onOk={bulkBorrar}></ConfirmModal>
      ) : null}
      <table className="ej-excel">
        <thead>
          <tr><th style={{ width: 34 }}><input type="checkbox" checked={todosSel} onChange={toggleTodos} aria-label="Seleccionar todos"></input></th><th style={{ width: 210 }}>Nombre</th><th style={{ width: 60 }} className="col-sec">Edad</th><th style={{ width: 140 }}>Grupo</th><th style={{ width: 120 }} className="col-sec">Nivel</th><th style={{ width: 210 }}>Plan</th><th style={{ width: 190 }} className="col-sec">Mail</th><th style={{ width: 130 }} className="col-sec">Teléfono</th><th style={{ width: 40 }}></th></tr>
        </thead>
        <tbody>
          {personas.map((p) => {
            const { plan, est } = estadoMembDe(p);
            return (
              <tr key={p.id} className={sel.has(p.id) ? "fila-sel" : ""}>
                <td><input type="checkbox" checked={sel.has(p.id)} onChange={() => toggleUno(p.id)} aria-label={"Seleccionar " + p.nombre}></input></td>
                <td><button className="ej-excel-nombre" onClick={() => onAbrir(p.id)} title="Abrir perfil"><Avatar persona={p} size={26}></Avatar><span>{p.nombre}</span></button></td>
                <td className="col-sec"><input type="number" min="0" value={p.edad || ""} onChange={(e) => onCampo(p.id, "edad", e.target.value ? Number(e.target.value) : null)}></input></td>
                <td>
                  <select value={p.grupo || ""} onChange={(e) => onCampo(p.id, "grupo", e.target.value || null)} className={p.grupo ? "" : "cel-vacia"}>
                    <option value="">—</option>
                    {grupos.map((g) => <option key={g.id} value={g.id}>{g.nombre}</option>)}
                  </select>
                </td>
                <td className="col-sec">
                  <select value={p.nivel || "Inicial"} onChange={(e) => onCampo(p.id, "nivel", e.target.value)}>
                    {NIVELES.map((n) => <option key={n} value={n}>{n}</option>)}
                  </select>
                </td>
                <td>{plan ? <span className="ej-excel-plan"><span className="ep-nom">{plan.nombre}</span><span className={"mb-badge " + est.cls}>{est.label}</span></span> : <span className="vacio-cel">Sin plan</span>}</td>
                <td className="col-sec"><input type="email" value={p.email || ""} onChange={(e) => onCampo(p.id, "email", e.target.value)} placeholder="—"></input></td>
                <td className="col-sec"><input value={p.telefono || ""} onChange={(e) => onCampo(p.id, "telefono", e.target.value)} placeholder="—"></input></td>
                <td><button className="ej-excel-abrir" onClick={() => onAbrir(p.id)} aria-label="Abrir perfil">→</button></td>
              </tr>);

          })}
        </tbody>
      </table>
      {personas.length === 0 ? <p style={{ color: "var(--ink-3)", marginTop: 16 }}>No hay personas para mostrar.</p> : null}
    </div>);

}

function PersonasGamif({ personas }) {
  const [orden, setOrden] = React.useState({ col: "total", dir: -1 });
  const reservas = window.Reservas ? window.Reservas.cargar() : [];
  const socios = (() => { try { return JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) { return {}; } })();
  const r = window.Gamif.rankingSemana(personas, { reservas, socios });
  const filas = personas.map((p) => {
    const g = window.Gamif.calcular(p, { reservas, socios });
    return { persona: p, g };
  }).sort((a, b) => {
    const va = orden.col === "total" ? a.g.total : orden.col === "sueno" ? a.g.rachaSueno : a.g.pilares[orden.col];
    const vb = orden.col === "total" ? b.g.total : orden.col === "sueno" ? b.g.rachaSueno : b.g.pilares[orden.col];
    return (va - vb) * orden.dir;
  });
  const col = (id, label) => <button className={"ad-th" + (orden.col === id ? " on" : "")} onClick={() => setOrden((o) => ({ col: id, dir: o.col === id ? -o.dir : -1 }))}>{label}</button>;
  return (
    <div className="ad-gamif-wrap">
      <div className="ad-semana-wrap">
        <div className="ad-semana-cab">
          <h4>Ranking semanal <span>({r.semanaActual.desde} al {r.semanaActual.hasta})</span></h4>
          <p>Los roles activos ahora salen del podio de la semana anterior. Se resetea cada lunes.</p>
        </div>
        {r.podio.length > 0 ? (
          <div className="ad-podio-fila">
            {r.podio.map((pu) => (
              <div className="ad-podio-chip" key={pu.rol.id}>
                <span className="ico">{pu.rol.icono}</span>
                <span className="rol">{pu.rol.nombre}</span>
                <span className="nombres">{pu.ganadores.map((g) => g.nombre).join(" · ")}</span>
                <span className="pts">{pu.pts} pts (sem. pasada)</span>
              </div>
            ))}
          </div>
        ) : <p className="ad-semana-vacio">Nadie sumó puntos la semana pasada todavía.</p>}
        {r.tablaActual.length > 0 ? (
          <div className="ad-semana-tabla">
            {r.tablaActual.slice(0, 10).map((f, i) => (
              <div className="ad-semana-fila" key={f.persona.id}><span className="pos">#{i + 1}</span><span className="nom">{f.persona.nombre}</span><span className="pt">{f.pts} pts</span></div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="ad-gamif-head">
        <span>Alumno</span><span>Nivel</span><span>Sub</span>
        {col("constancia", "Constan.")}{col("compromiso", "Compr.")}{col("fuerza", "Fuerza")}{col("movilidad", "Movil.")}{col("total", "Total")}{col("sueno", "Racha sueño")}
      </div>
      {filas.map(({ persona, g }) => {
        const debil = g.pilarMasDebil;
        return (
          <div className="ad-gamif-row" key={persona.id}>
            <span className="nombre"><span className="ad-medalla">{g.nivel.slice(0, 2).toUpperCase()}</span>{persona.nombre}</span>
            <span>{window.Gamif.cap(g.nivel)}</span>
            <span>{g.subnivel}</span>
            <span className={debil === "constancia" ? "flag" : ""}>{g.pilares.constancia}</span>
            <span className={debil === "compromiso" ? "flag" : ""}>{g.pilares.compromiso}</span>
            <span className={debil === "fuerza" ? "flag" : ""}>{g.pilares.fuerza}</span>
            <span className={debil === "movilidad" ? "flag" : ""}>{g.pilares.movilidad}</span>
            <span className="total">{g.total}</span>
            <span className={g.rachaSueno === 0 ? "flag" : ""}>{g.rachaSueno} noches</span>
          </div>
        );
      })}
      <p style={{ fontSize: "12px", color: "var(--ink-3)", padding: "14px 16px 0" }}>La columna en rojo marca el pilar m\u00e1s d\u00e9bil de cada alumno. Racha de sue\u00f1o en 0 puede ser se\u00f1al de sobrecarga.</p>
    </div>
  );
}

/* ====================================================================
   VISTA COMPLETA DE PERSONA (perfil + rutina)
   ==================================================================== */
function PersonaDetalle({ persona, clases, secciones, getSeccionDe, tab, onTab, onVolver, onEditar, onIrAClase, onGuardarProceso, onGuardarPersona, onProyectar, planes, sub, onGuardarSocio, onToggleActivo, onEliminarPersona }) {
  const tieneProceso = persona.proceso && persona.proceso.sesiones && persona.proceso.sesiones.length > 0;
  const tieneEval = persona.evaluaciones && persona.evaluaciones.length > 0;
  const plan = window.Membresia && planes ? window.Membresia.planDe(planes, sub) : null;
  const pendienteAprobacion = !sub && persona.planSolicitado && (planes || []).some((pl) => pl.id === persona.planSolicitado);

  return (
    <main className="contenido" data-screen-label={"Persona — " + persona.nombre}>
      <button className="volver" onClick={onVolver}>← Personas</button>

      <header className="cabecera-persona">
        <div className="cp-id">
          <Avatar persona={persona} size={64}></Avatar>
          <div>
            <h1>{persona.nombre}</h1>
            <p className="cp-objetivo">{persona.objetivo}</p>
            <div className="metas">
              <ChipNivel nivel={persona.nivel}></ChipNivel>
              {persona.edad ? <span className="chip">{persona.edad} años</span> : null}
              {persona.experiencia ? <span className="chip">{persona.experiencia}</span> : null}
              {persona.asistencia ? <span className="chip">{persona.asistencia.mes} clases/mes</span> : null}
            </div>
          </div>
        </div>
        <button className="btn-secundario" onClick={onEditar}>Editar perfil</button>
      </header>

      <div className="tabs-persona">
        <button className={tab === "perfil" ? "activo" : ""} onClick={() => onTab("perfil")}>Perfil</button>
        <button className={tab === "rutina" ? "activo" : ""} onClick={() => onTab("rutina")}>
          Proceso (mesociclo){tieneProceso ? <span className="punto-rutina"></span> : null}
        </button>
        <button className={tab === "evaluacion" ? "activo" : ""} onClick={() => onTab("evaluacion")}>
          Evaluación física{tieneEval ? <span className="punto-rutina"></span> : null}
        </button>
        <button className={tab === "membresia" ? "activo" : ""} onClick={() => onTab("membresia")}>
          Membresía{pendienteAprobacion ? <span className="punto-rutina pend"></span> : null}
        </button>
      </div>

      {tab === "perfil" ? (
        <PerfilCompleto persona={persona} clases={clases} onIrAClase={onIrAClase} onGuardarPersona={onGuardarPersona}></PerfilCompleto>
      ) : tab === "evaluacion" ? (
        <EvaluacionFisica persona={persona} onGuardar={onGuardarPersona}></EvaluacionFisica>
      ) : tab === "membresia" ? (
        <TabMembresia persona={persona} planes={planes} sub={sub} plan={plan} pendienteAprobacion={pendienteAprobacion}
          onGuardarSocio={onGuardarSocio} onToggleActivo={onToggleActivo} onEliminarPersona={onEliminarPersona} onVolver={onVolver} onGuardarPersona={onGuardarPersona}></TabMembresia>
      ) : (
        <Proceso
          persona={persona}
          clases={clases}
          secciones={secciones}
          getSeccionDe={getSeccionDe}
          onGuardar={onGuardarProceso}
          onProyectar={onProyectar}
        ></Proceso>
      )}
    </main>
  );
}

/* ---------- pestaña MEMBRESÍA ---------- */
function TabMembresia({ persona, planes, sub, plan, pendienteAprobacion, onGuardarSocio, onToggleActivo, onEliminarPersona, onVolver, onGuardarPersona }) {
  const [modal, setModal] = React.useState(false);
  const [ajustar, setAjustar] = React.useState(false);
  const [confirmarBorrado, setConfirmarBorrado] = React.useState(false);
  const renovPendiente = !!(window.Renovaciones && window.Renovaciones.leer()[persona.id]);
  const est = window.Membresia ? window.Membresia.estado(sub, plan) : { key: "sinplan", label: "Sin plan", cls: "sinplan" };
  const money = window.Membresia ? window.Membresia.money : (n) => "₡" + n;
  const fmt = window.Membresia ? window.Membresia.fmt : (d) => d;

  const eliminar = () => {
    onEliminarPersona(persona.id);
    window.dharmaToast && window.dharmaToast("Alumno eliminado", "borrado");
    onVolver();
  };

  return (
    <div className="perfil-grid">
      <div className="perfil-col">
        <section className="bloque-info">
          <h4>Plan actual</h4>
          {plan ? (
            <div className="tm-plan-actual">
              <span className="mb-plan-chip" style={{ "--cat": plan.color }}><span className="dot"></span>{plan.nombre}</span>
              <span className={"mb-badge " + est.cls}>{est.label}</span>
              <div className="tm-datos">
                <span><em>Créditos</em>{plan.tipo === "ilimitada" ? "∞" : (sub.creditos + "/" + plan.creditos)}</span>
                <span><em>Vence</em>{fmt(sub.vencimiento)}</span>
              </div>
            </div>
          ) : (
            <p className="vacio">
              {pendienteAprobacion ? <>Pidió el plan <b>{planes.find((pl) => pl.id === persona.planSolicitado)?.nombre}</b> desde su ingreso — falta aprobar el pago.</> : "Sin plan asignado."}
            </p>
          )}
          {renovPendiente ? <p className="vacio" style={{ marginTop: 10 }}><b>{persona.nombre.split(" ")[0]} pidió renovar su plan</b> — confirmá el pago y renovalo.</p> : null}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <button className={"btn-secundario" + (pendienteAprobacion || renovPendiente ? " aprobar" : "")} onClick={() => setModal(true)}>
              {pendienteAprobacion ? "Aprobar pago" : renovPendiente ? "Renovar (solicitado)" : plan ? "Renovar / cambiar plan" : "Asignar plan"}
            </button>
            {sub ? <button className="btn-secundario" onClick={() => setAjustar(true)}>{est.key === "congelada" ? "Ver congelamiento" : "Ajustar fecha / congelar"}</button> : null}
          </div>
        </section>
        <PlanSecundario persona={persona} planes={planes} onGuardarPersona={onGuardarPersona}></PlanSecundario>

        <section className="bloque-info">
          <h4>Historial de pagos</h4>
          {(!sub || !sub.pagos || sub.pagos.length === 0) ? <p className="vacio">Sin pagos registrados.</p> : (
            <div className="mb-pagos">
              {sub.pagos.slice().reverse().map((pg, i) => (
                <div className="mb-pago" key={i}><span className="f">{fmt(pg.fecha)}</span><span className="c">{pg.concepto}</span><span className="m">{money(pg.monto)}</span><span className="me">{pg.metodo}</span>{pg.saldo ? <span className={"mb-saldo-chip" + (pg.saldo < 0 ? " deudor" : " favor")}>{pg.saldo < 0 ? "Debe " + money(Math.abs(pg.saldo)) : "A favor " + money(pg.saldo)}</span> : null}</div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="perfil-col">
        <section className="bloque-info">
          <h4>Cuenta</h4>
          <p className="vacio" style={{ marginBottom: 12 }}>{persona.activo === false ? "Esta cuenta está desactivada — no ve nada hasta reactivarla." : "Cuenta activa."}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {persona.activo === false ? (
              <button className="btn-secundario" onClick={() => onToggleActivo(persona.id, true)}>Reactivar</button>
            ) : (
              <button className="btn-secundario" onClick={() => onToggleActivo(persona.id, false)}>Desactivar</button>
            )}
            <button className="btn-secundario peligro" onClick={() => setConfirmarBorrado(true)}>Eliminar definitivamente</button>
          </div>
        </section>
      </div>

      {modal ? (
        <PlanModal persona={persona} planes={planes} subActual={sub} onCerrar={() => setModal(false)}
          onGuardar={(nuevoSub) => { onGuardarSocio(persona.id, nuevoSub); setModal(false); window.dharmaToast && window.dharmaToast("Membresía actualizada: " + persona.nombre, "ok"); }}></PlanModal>
      ) : null}

      {ajustar && sub ? (
        <window.AjustarMembresiaModal persona={persona} sub={sub} onCerrar={() => setAjustar(false)}
          onGuardar={(nuevoSub) => onGuardarSocio(persona.id, nuevoSub)}></window.AjustarMembresiaModal>
      ) : null}

      {confirmarBorrado ? (
        <ConfirmModal titulo="Eliminar definitivamente"
          texto={"¿Eliminar a " + persona.nombre + "? Esto borra su cuenta, rutina y pagos. No se puede deshacer. Si preferís conservar su historial, usá \"Desactivar\" en su lugar."}
          onCancel={() => setConfirmarBorrado(false)} onOk={eliminar}></ConfirmModal>
      ) : null}
    </div>
  );
}

/* ---------- pestaña PERFIL ---------- */
function PerfilCompleto({ persona, clases, onIrAClase, onGuardarPersona }) {
  const clasesDe = clases.filter((c) => (persona.clases || []).includes(c.id));
  const restablecerClave = () => {
    if (!window.confirm("¿Restablecer la clave de " + persona.nombre + " a 1234?")) return;
    onGuardarPersona({ ...persona, pin: "1234", pinPorDefecto: true });
    window.dharmaToast && window.dharmaToast("Clave restablecida a 1234 — se le pedirá cambiarla al entrar", "ok");
  };
  return (
    <div className="perfil-grid">
      <div className="perfil-col">
        <section className="bloque-info">
          <h4>Ficha</h4>
          <dl className="ficha">
            <div><dt>Mail</dt><dd>{persona.email || "—"}</dd></div>
            <div><dt>Teléfono</dt><dd>{persona.telefono || "—"}</dd></div>
            <div><dt>Tipo de trabajo</dt><dd>{persona.tipoTrabajo || "—"}</dd></div>
            <div><dt>Deporte que practica</dt><dd>{persona.deporte || "—"}</dd></div>
            <div><dt>Experiencia</dt><dd>{persona.experiencia || "—"}</dd></div>
            <div><dt>Objetivo</dt><dd>{persona.objetivo || "—"}</dd></div>
          </dl>
          {onGuardarPersona ? <button className="btn-secundario chico" style={{ marginTop: 10 }} onClick={restablecerClave}>Restablecer clave a 1234</button> : null}
        </section>

        <section className="bloque-info">
          <h4>Lesiones y adaptaciones</h4>
          {(!persona.lesiones || persona.lesiones.length === 0) ? (
            <p className="vacio">Sin restricciones activas.</p>
          ) : persona.lesiones.map((l, i) => (
            <div className="tarjeta-lesion" key={i}>
              <div className="zona">{l.zona}</div>
              {l.detalle ? <div className="detalle">{l.detalle}</div> : null}
              {l.adaptacion ? <div className="adaptacion">→ {l.adaptacion}</div> : null}
            </div>
          ))}
        </section>

        <section className="bloque-info">
          <h4>Dolores frecuentes</h4>
          {(!persona.doloresFrecuentes || persona.doloresFrecuentes.length === 0) ? (
            <p className="vacio">No registrados.</p>
          ) : (
            <ul className="lista-dolores">
              {persona.doloresFrecuentes.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          )}
        </section>

        {window.RegistroPersonalizado && window.RegistroPersonalizado.dePersona(persona.id).length > 0 ? (
          <section className="bloque-info">
            <h4>Historial de clases 1 a 1</h4>
            <div className="mp-pagos">
              {window.RegistroPersonalizado.dePersona(persona.id).map((r) => (
                <div className="mp-pago" key={r.id}>
                  <span className="mp-pago-fecha">{r.fecha}</span>
                  <span className="mp-pago-concepto">{r.titulo}</span>
                  <span className="mp-pago-metodo">{r.coach || "—"}</span>
                  <span></span>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <div className="perfil-col">
        {(() => {
          const wel = window.calcularAlertasWellness ? window.calcularAlertasWellness(persona.wellness) : { alertas: [], ultima: null };
          if (!wel.ultima) return null;
          const u = wel.ultima;
          return (
            <section className={"bloque-info wellness-coach" + (wel.alertas.length ? " con-alerta" : "")}>
              <h4>Bienestar — último check-in <span className="wc-fecha">{u.fecha}</span></h4>
              {wel.alertas.length > 0 ? (
                <div className="wa-chips" style={{ marginBottom: 10 }}>
                  {wel.alertas.map((a, i) => <span key={i} className={"wa-chip " + a.nivel}>{a.texto}</span>)}
                </div>
              ) : <p className="vacio" style={{ marginBottom: 10 }}>Sin alertas. Valores dentro de su media.</p>}
              <div className="wc-datos">
                <span><em>Sueño</em>{u.sueno || "—"}h</span>
                <span><em>Energía</em>{u.energia || "—"}</span>
                <span><em>Ánimo</em>{u.animo || "—"}</span>
                <span><em>Dolor</em>{u.dolor || "—"}</span>
                <span><em>Estrés</em>{u.estres || "—"}</span>
              </div>
            </section>
          );
        })()}

        {persona.alertas ? (
          <section className="alerta-obs">
            <h4><IconoAlerta size={13}></IconoAlerta> Alertas / observaciones</h4>
            <p>{persona.alertas}</p>
          </section>
        ) : null}

        {(persona.metricas && persona.metricas.length > 0) ? (
          <section className="bloque-info">
            <h4>Métricas de progreso</h4>
            <div className="grilla-metricas">
              {persona.metricas.map((m, i) => (
                <div className="metrica" key={i}>
                  <div className="nombre">{m.nombre}</div>
                  <div className="valor">{m.valor}</div>
                  {m.delta ? <div className="delta">{m.delta}</div> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {(persona.notas && persona.notas.length > 0) ? (
          <section className="bloque-info">
            <h4>Notas del coach</h4>
            {persona.notas.map((n, i) => (
              <div className="nota-coach" key={i}>
                <div className="fecha">{n.fecha}</div>
                {n.texto}
              </div>
            ))}
          </section>
        ) : null}

        {clasesDe.length > 0 ? (
          <section className="bloque-info">
            <h4>Clases grupales</h4>
            <div className="chips-clases">
              {clasesDe.map((c) => (
                <button key={c.id} className="chip" style={{ cursor: "pointer" }} onClick={() => onIrAClase(c.id)}>
                  <IconoCat tipo={c.icono} size={13}></IconoCat> {c.nombre}
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

Object.assign(window, { Personas, PersonaDetalle, PerfilCompleto });
