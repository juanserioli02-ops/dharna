// DHARMA — Centro de notificaciones: vencimientos de membresía (alumno), clases del día (coach/admin)
// y solicitudes de plan pendientes de aprobar (admin). Corre en el cliente (sin backend), y si el
// navegador lo permite dispara además una notificación nativa mientras la app está abierta.

function NOTIF_diasHasta(fechaIso) {
  if (!fechaIso) return null;
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const v = new Date(fechaIso + "T00:00:00");
  return Math.round((v - hoy) / 86400000);
}

function useNotifPermiso() {
  const [permiso, setPermiso] = React.useState(() => (typeof Notification !== "undefined" ? Notification.permission : "unsupported"));
  const pedir = () => {
    if (typeof Notification === "undefined") return;
    Notification.requestPermission().then(setPermiso);
  };
  return [permiso, pedir];
}

function notifNativa(titulo, cuerpo, clave) {
  if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
  try {
    const yaKey = "dharma-notif-enviada-" + clave;
    if (sessionStorage.getItem(yaKey)) return;
    new Notification(titulo, { body: cuerpo, icon: undefined });
    sessionStorage.setItem(yaKey, "1");
  } catch (e) {}
}

// ---- renovaciones: solicitudes del alumno pendientes de resolver por el admin (localStorage) ----
const RENOV_CLAVE = "dharma-renovaciones-v1";
function renovLeer() { try { return JSON.parse(localStorage.getItem(RENOV_CLAVE)) || {}; } catch (e) { return {}; } }
function renovPedir(personaId) { const r = renovLeer(); r[personaId] = { fecha: new Date().toISOString().slice(0, 10) }; try { localStorage.setItem(RENOV_CLAVE, JSON.stringify(r)); } catch (e) {} }
function renovQuitar(personaId) { const r = renovLeer(); if (!(personaId in r)) return; delete r[personaId]; try { localStorage.setItem(RENOV_CLAVE, JSON.stringify(r)); } catch (e) {} }
window.Renovaciones = { leer: renovLeer, pedir: renovPedir, quitar: renovQuitar };

// ---- alumno: estado de su propia membresía ----
function notifsAlumno(persona, planes, socios) {
  const items = [];
  if (!persona) return items;
  const sub = socios[persona.id];
  const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
  if (renovLeer()[persona.id]) items.push({ id: "renov", tipo: "info", texto: "Tu solicitud de renovación fue enviada — el centro la confirma al recibir el pago." });
  if (plan && sub && plan.tipo !== "ilimitada" && sub.vencimiento) {
    const dias = NOTIF_diasHasta(sub.vencimiento);
    if (dias != null) {
      if (dias < 0) items.push({ id: "venc", tipo: "urgente", texto: "Tu plan venció — renovalo para poder reservar clases." });
      else if (dias <= 5) items.push({ id: "venc", tipo: "aviso", texto: "Tu plan vence en " + dias + (dias === 1 ? " día" : " días") + " — pensá en renovarlo." });
    }
    if (sub.creditos != null && sub.creditos <= 1) items.push({ id: "creditos", tipo: "aviso", texto: sub.creditos === 0 ? "No te quedan clases disponibles en tu plan." : "Te queda 1 clase disponible en tu plan." });
  }
  if (!sub && persona.planSolicitado) items.push({ id: "solic", tipo: "info", texto: "Tu solicitud de plan está esperando aprobación del centro." });
  return items;
}

// ---- coach/admin: clases del día ----
function notifsClasesHoy(eventos) {
  const hoyIso = new Date().toISOString().slice(0, 10);
  const wd = (new Date().getDay() + 6) % 7;
  const hoy = (eventos || []).filter((e) => {
    if (e.privado) return false;
    const rep = e.repite || [];
    if (rep.length) return rep.includes(wd) && e.fecha <= hoyIso;
    return e.fecha === hoyIso;
  }).sort((a, b) => a.inicio.localeCompare(b.inicio));
  if (!hoy.length) return { items: [], hoy };
  const items = [{ id: "clasehoy", tipo: "info", texto: hoy.length === 1 ? "Hoy tenés 1 clase: " + hoy[0].titulo + " a las " + hoy[0].inicio + "." : "Hoy tenés " + hoy.length + " clases — la primera es " + hoy[0].titulo + " a las " + hoy[0].inicio + "." }];
  return { items, hoy };
}

// ---- admin: solicitudes de plan y renovaciones pendientes ----
function notifsPendientesAdmin(personas, planes, socios) {
  const pend = (personas || []).filter((p) => !socios[p.id] && p.planSolicitado && (planes || []).some((pl) => pl.id === p.planSolicitado) && p.activo !== false);
  const renovs = renovLeer();
  const renovPend = (personas || []).filter((p) => renovs[p.id] && p.activo !== false);
  const items = [];
  if (pend.length) items.push({ id: "pend", tipo: "urgente", texto: pend.length === 1 ? "1 alumno esperando aprobación de pago: " + pend[0].nombre + "." : pend.length + " alumnos esperando aprobación de pago." });
  if (renovPend.length) items.push({ id: "renov", tipo: "urgente", texto: renovPend.length === 1 ? renovPend[0].nombre + " pidió renovar su plan." : renovPend.length + " alumnos pidieron renovar su plan." });
  return { items, pend, renovPend };
}

// ---- admin: membresías vencidas o por vencer ----
function notifsMembresiasAdmin(personas, planes, socios) {
  let vencidas = 0, porVencer = 0;
  (personas || []).forEach((p) => {
    if (p.activo === false) return;
    const sub = socios[p.id];
    if (!sub) return;
    const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
    if (!plan) return;
    const key = window.Membresia.estado(sub, plan).key;
    if (key === "vencida") vencidas++;
    else if (key === "porvencer") porVencer++;
  });
  const items = [];
  if (vencidas) items.push({ id: "membvenc", tipo: "urgente", texto: vencidas === 1 ? "1 membresía vencida sin renovar." : vencidas + " membresías vencidas sin renovar." });
  if (porVencer) items.push({ id: "membpor", tipo: "aviso", texto: porVencer === 1 ? "1 membresía vence esta semana." : porVencer + " membresías vencen esta semana." });
  return { items };
}

// ---- admin: recordatorio de copia de seguridad (solo si NO hay sync en la nube) ----
function notifsBackupAdmin() {
  const sync = window.__dharmaSyncEstado;
  if (sync && sync.tipo === "ok") return { items: [] }; // la nube ya respalda sola, cada día
  const dias = window.bkDiasSinCopia ? window.bkDiasSinCopia() : null;
  if (dias == null || dias < 7) return { items: [] };
  return { items: [{ id: "backup", tipo: "aviso", texto: "Hace " + dias + " días que no bajás una copia de seguridad de los datos." }] };
}

function NotifBell({ items, onIr }) {
  const [abierto, setAbierto] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!abierto) return;
    const fuera = (e) => { if (ref.current && !ref.current.contains(e.target)) setAbierto(false); };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto]);
  const urgentes = items.filter((n) => n.tipo === "urgente").length;
  return (
    <div className="notif-wrap" ref={ref}>
      <button className={"notif-campana" + (items.length ? " tiene" : "")} onClick={() => setAbierto((a) => !a)} title="Notificaciones">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"></path><path d="M10 19a2 2 0 0 0 4 0"></path></svg>
        {items.length ? <span className={"notif-badge" + (urgentes ? " urgente" : "")}>{items.length}</span> : null}
      </button>
      {abierto ? (
        <div className="notif-panel">
          <div className="notif-panel-titulo">Notificaciones</div>
          {items.length === 0 ? (
            <div className="notif-vacio">Todo al día — sin novedades.</div>
          ) : items.map((n) => (
            <div key={n.id} className={"notif-item " + n.tipo} onClick={() => { setAbierto(false); if (onIr) onIr(n); }}>
              {n.texto}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// tarjeta para pegar arriba del panel de Inicio (admin/coach/alumno)
function NotifCard({ items, onIr }) {
  if (!items.length) return null;
  return (
    <div className="notif-card">
      {items.map((n) => (
        <div key={n.id} className={"notif-card-item " + n.tipo} onClick={() => onIr && onIr(n)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z"></path><path d="M10 19a2 2 0 0 0 4 0"></path></svg>
          <span>{n.texto}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { NotifBell, NotifCard, notifsAlumno, notifsClasesHoy, notifsPendientesAdmin, notifsMembresiasAdmin, notifsBackupAdmin, notifNativa, useNotifPermiso });
