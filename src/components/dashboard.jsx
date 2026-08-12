// DHARMA — Dashboard: pantalla de inicio visual con acceso directo a cada sección.
// Se abre primero al iniciar la app; complementa (no reemplaza) la barra superior.

const DASH_ICONOS = {
  biblioteca: (<path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 1-2-2zM13 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5z"></path>),
  planificador: (<><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 9h18M9 4v16"></path></>),
  calendario: (<><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></>),
  personas: (<><circle cx="9" cy="8" r="3.2"></circle><path d="M3.5 20c.8-3.8 3.2-6 5.5-6s4.7 2.2 5.5 6"></path><circle cx="17" cy="8.5" r="2.4"></circle><path d="M15.5 14.3c1.9.4 3.6 2.3 4.2 5.2"></path></>),
  alumnos: (<><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path><path d="M7 14.5h4"></path></>),
  estudio: (<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v16H6.5A2.5 2.5 0 0 0 4 21z"></path><path d="M4 5.5v15.5"></path></>),
  ejercicios: (<><rect x="2.5" y="9" width="4" height="6" rx="1"></rect><rect x="17.5" y="9" width="4" height="6" rx="1"></rect><path d="M6.5 12h11"></path><rect x="8.5" y="7" width="2" height="10" rx="0.6"></rect><rect x="13.5" y="7" width="2" height="10" rx="0.6"></rect></>),
  herramientas: (<><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7v5l3.2 2"></path></>)
};
function DashIcono({ tipo, size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {DASH_ICONOS[tipo] || null}
    </svg>
  );
}

function PodioSemanalDash({ personas, onIr }) {
  if (!window.Gamif) return null;
  const reservas = window.Reservas ? window.Reservas.cargar() : [];
  const socios = (() => { try { return JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) { return {}; } })();
  const r = window.Gamif.rankingSemana(personas || [], { reservas, socios });
  if (r.podio.length === 0) return null;
  return (
    <button className="dash-podio" onClick={() => onIr("personas")}>
      <span className="dash-podio-tit">Roles de esta semana <span className="dash-podio-sub">— según el ranking de la semana pasada</span></span>
      <div className="dash-podio-lista">
        {r.podio.map((pu) => (
          <div className="dash-podio-item" key={pu.rol.id}>
            <span className="dash-podio-icono">{pu.rol.icono}</span>
            <span className="dash-podio-rol">{pu.rol.nombre}</span>
            <span className="dash-podio-nombres">{pu.ganadores.map((g) => g.nombre).join(" · ")}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

/* estado de alumnos: tabla rápida tipo planilla — bienestar + plan de un vistazo, ordenada por urgencia */
function EstadoAlumnosDash({ personas, onAbrirPersona, onIr }) {
  const [expandido, setExpandido] = React.useState(false);
  const datos = React.useMemo(() => {
    let socios = {}, planes = [];
    try { socios = JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) {}
    try { planes = JSON.parse(localStorage.getItem("dharma-planes-v1")) || (window.DHARMA_DATA.planes || []); } catch (e) {}
    const filas = (personas || []).filter((p) => p.activo !== false).map((p) => {
      const alertas = window.calcularAlertasWellness ? window.calcularAlertasWellness(p.wellness).alertas : [];
      const alta = alertas.some((a) => a.nivel === "alta");
      const sub = socios[p.id];
      const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
      const est = window.Membresia ? window.Membresia.estado(sub, plan) : { key: "sinplan", label: "Sin plan", cls: "sinplan" };
      const urg = (alta ? 4 : alertas.length ? 2 : 0) + (["vencida", "sincreditos"].includes(est.key) ? 3 : est.key === "porvencer" ? 1 : 0);
      return { p, alertas, alta, est, urg };
    });
    filas.sort((a, b) => b.urg - a.urg || a.p.nombre.localeCompare(b.p.nombre));
    return filas;
  }, [personas]);
  if (!datos.length) return null;
  const visibles = expandido ? datos : datos.slice(0, 6);
  return (
    <section className="dash-estado">
      <div className="de-cab">
        <span className="ds-titulo" style={{ marginBottom: 0 }}>Estado de alumnos</span>
        <button className="de-vertodo" onClick={() => onIr("personas")}>Ver personas →</button>
      </div>
      <div className="de-tabla">
        {visibles.map(({ p, alertas, alta, est }) => (
          <button className="de-fila" key={p.id} onClick={() => onAbrirPersona(p.id)}>
            <span className={"de-dot " + (alta ? "rojo" : alertas.length ? "amarillo" : "verde")}></span>
            <span className="de-nombre">{p.nombre}</span>
            <span className="de-bienestar">{alertas.length ? alertas[0].texto : "—"}</span>
            <span className={"mb-badge " + est.cls}>{est.label}</span>
          </button>
        ))}
      </div>
      {datos.length > 6 ? <button className="de-mas" onClick={() => setExpandido((v) => !v)}>{expandido ? "Mostrar menos" : "Mostrar " + (datos.length - 6) + " más"}</button> : null}
    </section>
  );
}

/* ---------- coach: sus propias clases de la semana y el total del mes (para liquidar horas) ---------- */
function TusClasesDash({ eventosCal, coachActual }) {
  const [abierto, setAbierto] = React.useState(false);
  const datos = React.useMemo(() => {
    if (!coachActual || !window.CalendarioHelpers) return null;
    const H = window.CalendarioHelpers;
    const hoy = new Date();
    const lunes = H.lunesDe(hoy);
    const domingo = H.sumarDias(lunes, 6);
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    const ocSemana = H.ocurrenciasEnRango(eventosCal, H.isoDe(lunes), H.isoDe(domingo)).filter((o) => (o.coach || "").trim() === coachActual);
    const ocMes = H.ocurrenciasEnRango(eventosCal, H.isoDe(primerDiaMes), H.isoDe(ultimoDiaMes)).filter((o) => (o.coach || "").trim() === coachActual);
    const horas = (min) => (min / 60).toLocaleString("es-CR", { maximumFractionDigits: 1 });
    return { ocSemana, cantMes: ocMes.length, minMes: ocMes.reduce((a, o) => a + o.minutos, 0), horas };
  }, [eventosCal, coachActual]);
  if (!datos) return null;
  return (
    <section className="dash-tusclases">
      <button className="tc-toggle" onClick={() => setAbierto((v) => !v)}>
        <span className="tc-encabezado"><span className="ds-titulo" style={{ marginBottom: 0 }}>Tus clases</span></span>
        <span className="tc-stats">
          <span className="tc-stat"><span className="tc-stat-num">{datos.ocSemana.length}</span><span className="tc-stat-lbl">Esta semana</span></span>
          <span className="tc-stat"><span className="tc-stat-num">{datos.cantMes}</span><span className="tc-stat-lbl">{datos.horas(datos.minMes)} hs · mes</span></span>
          <span className={"tc-chevron" + (abierto ? " abierto" : "")}>⌄</span>
        </span>
      </button>
      {abierto ? (
        <div className="tc-lista">
          {datos.ocSemana.length ? datos.ocSemana.map((o, i) => (
            <div className="tc-fila" key={o.id + o.ocurrencia + i}>
              <span className="tc-dia">{window.CalendarioHelpers.DIAS_LARGO[(new Date(o.ocurrencia + "T00:00:00").getDay() + 6) % 7].slice(0, 3)} {o.ocurrencia.slice(8, 10)}</span>
              <span className="tc-hora">{o.inicio}</span>
              <span className="tc-tit">{o.titulo || "Clase"}</span>
            </div>
          )) : <p className="tc-vacio">No tenés clases asignadas esta semana.</p>}
        </div>
      ) : null}
    </section>
  );
}

function Dashboard({ clases, secciones, personas, manuales, ejerciciosCount, onIr, onAbrirClase, modoCoach, coachActual, eventosCal, notifItems, onIrNotif, solicitudes, onAprobar, onVerPersona, onAbrirPersona }) {
  const [solicitudesExpandidas, setSolicitudesExpandidas] = React.useState(false);
  
  const sinPlan = React.useMemo(() => {
    try {
      const socios = JSON.parse(localStorage.getItem("dharma-socios-v1")) || {};
      const planes = JSON.parse(localStorage.getItem("dharma-planes-v1")) || [];
      const activos = (personas || []).filter((p) => p.activo !== false);
      return activos.filter((p) => {
        const sub = socios[p.id];
        const plan = sub && planes.find((pl) => pl.id === sub.planId);
        return window.Membresia ? window.Membresia.estado(sub, plan).key === "sinplan" : !sub;
      }).length;
    } catch (e) { return 0; }
  }, [personas]);

  // Solicitudes de planes + renovaciones — ordenadas por urgencia
  const solicitudesPrioritarias = React.useMemo(() => {
    const todas = (solicitudes || []).sort((a, b) => (b.fechaSolicitud || "").localeCompare(a.fechaSolicitud || ""));
    return todas.slice(0, solicitudesExpandidas ? todas.length : 3);
  }, [solicitudes, solicitudesExpandidas]);

  const tarjetas = [
    { id: "biblioteca", nombre: "Clases", desc: "Clases grupales, secciones y proyección en pizarra.", metric: (clases || []).length ? (clases.length + (clases.length === 1 ? " clase" : " clases")) : null },
    { id: "planificador", nombre: "Planificador", desc: "Armá varias clases en paralelo, sin repetir ejercicios." },
    { id: "calendario", nombre: "Calendario", desc: "La agenda del centro: qué ocupa cada horario." },
    { id: "personas", nombre: "Personas", desc: "Perfiles, rutinas, planes y pagos.", metric: sinPlan ? sinPlan + " sin plan" : null },
    { id: "estudio", nombre: "Estudio", desc: "Manuales de formación interna para coaches." },
    { id: "ejercicios", nombre: "Ejercicios", desc: "Catálogo con progresiones, planos y videos.", metric: ejerciciosCount ? (ejerciciosCount + " en catálogo") : null },
    { id: "herramientas", nombre: "Herramientas", desc: "Cronómetro, cuestionarios y registro de cargas." }
  ].filter((t) => !modoCoach || !["ejercicios", "estudio", "planificador"].includes(t.id));

  return (
    <main className="contenido dash-main" data-screen-label="Inicio">
      <div className="dash-cab">
        <span className="dash-eyebrow">{modoCoach ? "Panel de coach" : "Panel de administración"}</span>
        <h1>{(() => { const h = new Date().getHours(); return h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches"; })()}{coachActual ? ", " + coachActual.split(" ")[0] : ""}</h1>
        <span className="dash-fecha">{new Date().toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "long" })}</span>
      </div>
      <div className="dash-grid">
      <div className="dash-col-principal">
      <HoyBanner clases={clases} onAbrir={onAbrirClase}></HoyBanner>
      {!modoCoach ? <NoticiasAdmin></NoticiasAdmin> : null}
      {!modoCoach ? <ActividadReciente></ActividadReciente> : null}
      {(solicitudes || []).length ? (
        <section className="dash-solicitudes">
          <span className="ds-titulo">Solicitudes pendientes · {solicitudes.length}</span>
          {solicitudes.map(({ p, tipo, plan }) => (
            <div className="ds-fila" key={tipo + p.id}>
              <button className="ds-quien" onClick={() => onVerPersona && onVerPersona(p)} title="Ver perfil">
                <Avatar persona={p} size={30}></Avatar>
                <span className="ds-tx">
                  <span className="ds-nombre">{p.nombre}</span>
                  <span className="ds-que">{tipo === "renov" ? "Renovar " + (plan ? plan.nombre : "su plan") : "Pidió " + (plan ? plan.nombre : "un plan")}{plan && plan.precio ? " · ₡" + plan.precio.toLocaleString("es-CR") : ""}</span>
                </span>
              </button>
              {plan ? <button className="btn-primario ds-ok" onClick={() => onAprobar(p)}>Confirmar pago</button> : <span className="ds-que">Plan ya no existe</span>}
            </div>
          ))}
        </section>
      ) : null}
      <NotifCard items={notifItems || []} onIr={onIrNotif}></NotifCard>
      {modoCoach && coachActual ? <TusClasesDash eventosCal={eventosCal} coachActual={coachActual}></TusClasesDash> : null}
      <PodioSemanalDash personas={personas} onIr={onIr}></PodioSemanalDash>
      <EstadoAlumnosDash personas={personas} onAbrirPersona={onAbrirPersona} onIr={onIr}></EstadoAlumnosDash>
      </div>
      <div className="dash-col-accesos">
      <div className="dash-lista">
        {tarjetas.map((t) => (
          <button className="dash-fila" key={t.id} onClick={() => onIr(t.id)}>
            <span className="dash-fila-icono"><DashIcono tipo={t.id}></DashIcono></span>
            <span className="dash-fila-tx">
              <span className="dash-fila-nombre">{t.nombre}</span>
              <span className="dash-fila-desc">{t.desc}</span>
            </span>
            {t.metric ? <span className="dash-fila-metric">{t.metric}</span> : null}
          </button>
        ))}
      </div>
      </div>
      </div>
    </main>
  );
}

/* ---------- noticias del centro: admin carga, alumno ve en Inicio ---------- */
const NOTICIAS_CLAVE = "dharma-noticias-v1";
function noticiasLeer() { try { const v = JSON.parse(localStorage.getItem(NOTICIAS_CLAVE)); return Array.isArray(v) ? v : []; } catch (e) { return []; } }
function noticiasGuardar(next) { try { localStorage.setItem(NOTICIAS_CLAVE, JSON.stringify(next)); } catch (e) {} }
window.noticiasLeer = noticiasLeer;

function NoticiasAdmin() {
  const [tick, setTick] = React.useState(0);
  const [texto, setTexto] = React.useState("");
  const noticias = React.useMemo(() => noticiasLeer(), [tick]);

  const publicar = () => {
    if (!texto.trim()) return;
    const nueva = { id: "n" + Date.now(), texto: texto.trim(), fecha: new Date().toISOString().slice(0, 10) };
    noticiasGuardar([nueva, ...noticias]);
    setTexto("");
    setTick((t) => t + 1);
  };
  const borrar = (id) => { noticiasGuardar(noticias.filter((n) => n.id !== id)); setTick((t) => t + 1); };

  return (
    <section className="dash-noticias">
      <span className="ds-titulo">Noticias para alumnos</span>
      <div className="dn-form">
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Ej: Esta semana nos visita un osteópata — turnos con tu coach" maxLength={140} onKeyDown={(e) => { if (e.key === "Enter") publicar(); }}></input>
        <button className="btn-primario" disabled={!texto.trim()} onClick={publicar}>Publicar</button>
      </div>
      {noticias.length ? (
        <div className="dn-lista">
          {noticias.map((n) => (
            <div className="dn-fila" key={n.id}>
              <span className="dn-tx">{n.texto}</span>
              <button className="btn-icono" onClick={() => borrar(n.id)} aria-label="Quitar">✕</button>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/* ---------- actividad reciente: quién dio de baja/alta o confirmó un plan ---------- */
function ActividadReciente() {
  const [abierto, setAbierto] = React.useState(false);
  const entradas = React.useMemo(() => { try { return JSON.parse(localStorage.getItem("dharma-auditoria-v1")) || []; } catch (e) { return []; } }, [abierto]);
  if (!entradas.length) return null;
  const visibles = abierto ? entradas.slice(0, 30) : entradas.slice(0, 4);
  const fmt = (iso) => { const d = new Date(iso); return d.toLocaleDateString("es-CR", { day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit" }); };
  return (
    <section className="dash-actividad">
      <button className="ds-titulo dash-act-toggle" onClick={() => setAbierto((v) => !v)}>Actividad reciente {abierto ? "▲" : "▼"}</button>
      <div className="dn-lista">
        {visibles.map((e) => (
          <div className="dn-fila act-fila" key={e.id}>
            <span className="dn-tx"><strong>{e.accion}</strong> — {e.detalle} <span className="act-quien">({e.quien})</span></span>
            <span className="act-fecha">{fmt(e.fecha)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Dashboard });
