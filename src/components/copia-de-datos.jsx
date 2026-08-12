// DHARMA — Copia de datos: exportar/importar TODO lo cargado (sin backend).
// Junta todas las claves de datos de localStorage en un archivo .json y permite
// volver a cargarlo en otro dispositivo.
//
// Detección automática: en vez de una lista fija (que se desactualizaba al sumar
// secciones), recolecta TODAS las claves "dharma-*" salvo el estado de UI transitorio
// (vista actual, sesión en vivo, posición de slides/timer). Así el backup nunca queda
// corto: clientes, clases, sub-secciones, grupos, MANUALES, BIBLIOTECA DE EJERCICIOS,
// calendario, agenda, membresías, cargas y configuración entran siempre.

// Estado de UI transitorio y metadatos — NO son datos del usuario, no se respaldan.
const BK_ULTIMA = "dharma-backup-ultima"; // fecha de la última copia (para el aviso)
function bkExcluir(k) {
  return (
    k === "dharma-vista" ||
    k === BK_ULTIMA ||
    k.startsWith("dharma-sesion") ||
    k.startsWith("dharma-timer") ||
    k.startsWith("dharma-pizarra-") ||
    k.startsWith("dharma-charla-")
  );
}
// Días desde la última copia. null = nunca hizo una.
function bkDiasSinCopia() {
  try {
    const v = localStorage.getItem(BK_ULTIMA);
    if (!v) return null;
    return Math.floor((Date.now() - new Date(v).getTime()) / 86400000);
  } catch (e) { return null; }
}
// Todas las claves de DATOS presentes hoy en este dispositivo.
function bkClaves() {
  const out = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith("dharma-") && !bkExcluir(k)) out.push(k);
  }
  return out.sort();
}

function bkFecha() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "_" + p(d.getHours()) + p(d.getMinutes());
}

function descargarCopia() {
  // Nunca exportar mientras el dispositivo todavía puede estar recibiendo datos de la
  // nube (recién abierto, o sincronización en curso): eso fue lo que generó una copia
  // con solo 14 personas en vez de la lista real. Si no está confirmado "Sincronizado",
  // avisamos y no generamos el archivo.
  const estado = window.__dharmaSyncEstado;
  if (estado && estado.txt !== "Sincronizado") {
    window.dharmaToast && window.dharmaToast("Esperá a que diga \"Sincronizado\" arriba antes de descargar la copia", "warn");
    return;
  }
  const claves = bkClaves();
  const data = { _dharma: "backup", version: 2, fecha: new Date().toISOString(), datos: {} };
  claves.forEach((k) => { const v = localStorage.getItem(k); if (v != null) data.datos[k] = v; });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "DHARMA-datos_" + bkFecha() + ".json";
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  try { localStorage.setItem(BK_ULTIMA, new Date().toISOString()); } catch (e) {}
  window.dispatchEvent(new Event("dharma-backup-hecho"));
  window.dharmaToast && window.dharmaToast("Copia descargada — " + claves.length + " conjuntos de datos", "ok");
}

// Aviso flotante: recuerda hacer una copia si pasaron muchos días (o nunca se hizo).
function BackupAviso() {
  const [dias, setDias] = React.useState(() => bkDiasSinCopia());
  const [pospuesto, setPospuesto] = React.useState(() => {
    try { return sessionStorage.getItem("dharma-backup-pospuesto") === "1"; } catch (e) { return false; }
  });
  const [sync, setSync] = React.useState(() => window.__dharmaSyncEstado || null);
  React.useEffect(() => {
    const refrescar = () => setDias(bkDiasSinCopia());
    const syncCambio = (e) => setSync(e.detail || window.__dharmaSyncEstado);
    window.addEventListener("dharma-backup-hecho", refrescar);
    window.addEventListener("dharma-sync-estado", syncCambio);
    return () => { window.removeEventListener("dharma-backup-hecho", refrescar); window.removeEventListener("dharma-sync-estado", syncCambio); };
  }, []);
  // con sync activo la nube hace un backup diario automático — no molestar
  const mostrar = !pospuesto && !(sync && sync.tipo === "ok") && (dias === null || dias >= 7);
  React.useEffect(() => {
    if (mostrar) {
      document.body.classList.add("dharma-tiene-aviso-flotante");
      return () => document.body.classList.remove("dharma-tiene-aviso-flotante");
    }
  }, [mostrar]);
  if (!mostrar) return null;
  const posponer = () => { try { sessionStorage.setItem("dharma-backup-pospuesto", "1"); } catch (e) {} setPospuesto(true); };
  const texto = dias === null
    ? "Todavía no hiciste ninguna copia de seguridad de tus datos."
    : "Hace " + dias + " días que no hacés una copia de seguridad.";
  return (
    <div className="bk-aviso" role="alert">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M12 9v4"></path><path d="M12 17h.01"></path><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"></path></svg>
      <div className="bk-aviso-txt">
        <b>{texto}</b>
        <span>Descargá una ahora y guardala en Drive o Dropbox para no perder tu trabajo.</span>
      </div>
      <div className="bk-aviso-acc">
        <button className="bk-aviso-mas" onClick={posponer}>Ahora no</button>
        <button className="bk-aviso-ok" onClick={descargarCopia}>Descargar copia</button>
        <button className="bk-aviso-x" onClick={posponer} aria-label="Cerrar aviso">✕</button>
      </div>
    </div>
  );
}

function BackupBotones({ compacto = false }) {
  const inputRef = React.useRef(null);
  const [confirm, setConfirm] = React.useState(null); // {nombre, datos, claves, conteo}
  const [menuAbierto, setMenuAbierto] = React.useState(false);
  const menuRef = React.useRef(null);
  React.useEffect(() => {
    if (!menuAbierto) return;
    const fuera = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuAbierto(false); };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [menuAbierto]);

  const onArchivo = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || parsed._dharma !== "backup" || !parsed.datos) throw new Error("formato");
        // Restaura cualquier clave de datos dharma-* presente en el archivo (compatible
        // con copias viejas y nuevas), ignorando estado de UI transitorio.
        const claves = Object.keys(parsed.datos).filter((k) => k.startsWith("dharma-") && !bkExcluir(k));
        if (!claves.length) throw new Error("vacío");
        let personas = 0, ejercicios = 0, manuales = 0;
        try { personas = (JSON.parse(parsed.datos["dharma-personas-v2"] || "[]") || []).length; } catch (e) {}
        try { ejercicios = (JSON.parse(parsed.datos["dharma-ejercicios-v2"] || "[]") || []).length; } catch (e) {}
        try {
          const mk = claves.find((k) => k.startsWith("dharma-manuales"));
          manuales = mk ? (JSON.parse(parsed.datos[mk] || "[]") || []).length : 0;
        } catch (e) {}
        setConfirm({ nombre: file.name, datos: parsed.datos, claves, personas, ejercicios, manuales, fecha: parsed.fecha });
      } catch (err) {
        window.dharmaToast && window.dharmaToast("Archivo inválido — no es una copia de DHARMA", "borrado");
      }
    };
    reader.readAsText(file);
  };

  const aplicar = () => {
    confirm.claves.forEach((k) => {
      if (Object.prototype.hasOwnProperty.call(confirm.datos, k)) localStorage.setItem(k, confirm.datos[k]);
    });
    setConfirm(null);
    window.dharmaToast && window.dharmaToast("Copia cargada — recargando…", "ok");
    setTimeout(() => location.reload(), 700);
  };

  return (
    <div className={"card-menu-wrap" + (compacto ? " sb-datos" : "")} ref={menuRef}>
      <button className={compacto ? "sb-item" : "btn-rol"} onClick={() => setMenuAbierto((v) => !v)} title="Copia de datos">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={compacto ? undefined : { verticalAlign: "-2px", marginRight: "6px" }}><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4l3 2"></path></svg>
        <span className={compacto ? "sb-label" : "btn-rol-txt"}>Datos</span>
      </button>
      {menuAbierto ? (
        <div className="card-menu" style={compacto ? { left: 8, right: "auto", minWidth: 190, bottom: "calc(100% + 4px)", top: "auto" } : { right: 0, left: "auto" }}>
          <button onClick={() => { setMenuAbierto(false); descargarCopia(); }}>Descargar copia</button>
          <button onClick={() => { setMenuAbierto(false); inputRef.current && inputRef.current.click(); }}>Cargar copia…</button>
        </div>
      ) : null}
      <input ref={inputRef} type="file" accept="application/json,.json" style={{ display: "none" }} onChange={onArchivo}></input>

      {confirm ? (
        <div className="mb-overlay" onClick={() => setConfirm(null)}>
          <div className="mb-modal chico" onClick={(e) => e.stopPropagation()}>
            <header className="mb-modal-cab">
              <div><div className="mb-modal-eyebrow">Cargar copia de datos</div><h2>¿Reemplazar datos?</h2></div>
              <button className="btn-icono" onClick={() => setConfirm(null)}><IconX></IconX></button>
            </header>
            <div className="mb-modal-cuerpo">
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: "var(--ink-2)" }}>
                Vas a cargar <b>{confirm.nombre}</b>.
              </p>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-3)" }}>
                Incluye{confirm.personas ? <> <b>{confirm.personas}</b> cliente{confirm.personas !== 1 ? "s" : ""}</> : null}
                {confirm.ejercicios ? <>, <b>{confirm.ejercicios}</b> ejercicios</> : null}
                {confirm.manuales ? <>, <b>{confirm.manuales}</b> manual{confirm.manuales !== 1 ? "es" : ""}</> : null}
                {" "}y el resto de los datos del centro.
              </p>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--ink-3)" }}>
                Esto <b>reemplaza</b> los datos actuales de este dispositivo y no se puede deshacer. Por las dudas, bajá primero una copia de lo que tenés ahora.
              </p>
              <button className="btn-secundario" style={{ alignSelf: "flex-start" }} onClick={descargarCopia}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-2px", marginRight: "6px" }}><path d="M12 3v12"></path><path d="M7 11l5 5 5-5"></path><path d="M5 21h14"></path></svg>
                Descargar copia de lo actual
              </button>
            </div>
            <footer className="mb-modal-pie">
              <button className="btn-secundario" onClick={() => setConfirm(null)}>Cancelar</button>
              <button className="btn-primario" onClick={aplicar}>Reemplazar y recargar</button>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
}

Object.assign(window, { BackupBotones, BackupAviso, descargarCopia, bkDiasSinCopia });

/* ---------- indicador de sincronización multi-dispositivo ---------- */
function SyncEstado() {
  const [estado, setEstado] = React.useState(() => window.__dharmaSyncEstado || null);
  const [abierto, setAbierto] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onCambio = (e) => setEstado(e.detail);
    window.addEventListener("dharma-sync-estado", onCambio);
    return () => window.removeEventListener("dharma-sync-estado", onCambio);
  }, []);
  React.useEffect(() => {
    if (!abierto) return;
    const fuera = (e) => { if (ref.current && !ref.current.contains(e.target)) setAbierto(false); };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto]);
  if (!estado) return null;
  return (
    <div className={"sync-estado mini " + (estado.tipo || "")} ref={ref}>
      <button className="sync-dot-btn" onClick={() => setAbierto((a) => !a)} title={estado.txt} aria-label="Estado de sincronización">
        <span className="dot"></span>
      </button>
      {abierto ? <div className="sync-pop">{estado.txt}</div> : null}
    </div>
  );
}

/* ---------- aviso persistente si la nube falla sostenido (no un parpadeo momentáneo) ---------- */
function SyncAlertaCaida() {
  const [estado, setEstado] = React.useState(() => window.__dharmaSyncEstado || null);
  const [mostrar, setMostrar] = React.useState(false);
  React.useEffect(() => {
    const onCambio = (e) => setEstado(e.detail);
    window.addEventListener("dharma-sync-estado", onCambio);
    return () => window.removeEventListener("dharma-sync-estado", onCambio);
  }, []);
  React.useEffect(() => {
    if (!estado || estado.tipo !== "warn") { setMostrar(false); return; }
    const t = setTimeout(() => setMostrar(true), 20000);
    return () => clearTimeout(t);
  }, [estado]);
  if (!mostrar) return null;
  return (
    <div className="sync-alerta-caida">
      <span>⚠ Sin conexión con la nube hace un rato — los cambios se están guardando solo en este dispositivo. Revisá tu internet; si persiste, avisá antes de que se pierda algo al sincronizar.</span>
      <button onClick={() => setMostrar(false)}>Ocultar</button>
    </div>
  );
}
Object.assign(window, { SyncEstado, SyncAlertaCaida });
