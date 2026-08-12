// DHARMA — App del alumno: entrada por rol, cuestionario, su rutina, clases visibles, herramientas

const A_CLAVE_PERSONAS = "dharma-personas-v2";
const A_CLAVE_VISIBLES = "dharma-clases-visibles-v2";
const A_CLAVE_CUSTOM = "dharma-clases-custom-v2";
const A_CLAVE_CALENDARIO = "dharma-calendario-v1";
const A_CLAVE_SOCIOS = "dharma-socios-v1";
const A_CLAVE_PLANES = "dharma-planes-v1";
const A_CLAVE_CONFIG = "dharma-config-v1";
const A_cargar = (k, fb) => { try { const v = localStorage.getItem(k); if (v) return JSON.parse(v); } catch (e) {} return fb; };
const leerPersonas = () => {
  const base = window.DHARMA_DATA.personas;
  const guardadas = A_cargar(A_CLAVE_PERSONAS, null);
  if (!guardadas) return base;
  const porId = {}; base.forEach((p) => { porId[p.id] = p; });
  return guardadas.map((p) => {
    let q = p;
    if ((!q.proceso || !q.proceso.sesiones) && porId[q.id] && porId[q.id].proceso) q = { ...q, proceso: porId[q.id].proceso };
    if (!q.sexo && porId[q.id] && porId[q.id].sexo) q = { ...q, sexo: porId[q.id].sexo };
    if (q.grupo === undefined && porId[q.id] && porId[q.id].grupo) q = { ...q, grupo: porId[q.id].grupo };
    if ((!q.wellness || q.wellness.length === 0) && porId[q.id] && porId[q.id].wellness) q = { ...q, wellness: porId[q.id].wellness };
    return q;
  });
};
const guardarPersonasLS = (next) => { try { localStorage.setItem(A_CLAVE_PERSONAS, JSON.stringify(next)); } catch (e) {} };
const A_leerEventos = () => A_cargar(A_CLAVE_CALENDARIO, []);
const A_leerSocios = () => A_cargar(A_CLAVE_SOCIOS, {});
const A_guardarSocios = (next) => { try { localStorage.setItem(A_CLAVE_SOCIOS, JSON.stringify(next)); } catch (e) {} };
// Blindaje anti-carrera: ajusta el crédito de una persona releyendo SIEMPRE la copia
// más fresca de socios de localStorage al momento de escribir (no la que quedó
// capturada en el render) — mismo patrón que ya se corrigió para Personas, evita
// perder o duplicar créditos si llegó un cambio de otro dispositivo mientras tanto.
const A_ajustarCredito = (personaId, delta) => {
  const frescos = A_leerSocios();
  const actual = frescos[personaId];
  if (!actual) return;
  A_guardarSocios({ ...frescos, [personaId]: { ...actual, creditos: (actual.creditos || 0) + delta } });
};
const A_leerPlanes = () => A_cargar(A_CLAVE_PLANES, window.DHARMA_DATA.planes || []);
const A_leerConfig = () => A_cargar(A_CLAVE_CONFIG, { antelacionCancelacion: 120 });
const AR_DIAS_SEM = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const AR_MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const AR_isoDe = (d) => d.toISOString().slice(0, 10);
const AR_lunesDe = (d) => { const x = new Date(d); const day = x.getDay(); const delta = day === 0 ? 1 : 1 - day; x.setDate(x.getDate() + delta); x.setHours(0, 0, 0, 0); return x; };
const AR_sumarDias = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

/* ============================================================
   ENTRADA — registro por nombre + mail (se vincula a una persona ya cargada)
   ============================================================ */
const nrmNombre = (s) => (s || "").toString().trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");

/* ---------- bienvenida: qué es DHARMA y qué hace la app, antes de crear cuenta ---------- */
function BienvenidaModal({ onCerrar }) {
  const planes = window.DHARMA_DATA.planes || [];
  const categorias = [...new Set(planes.map((p) => p.categoria || "Planes"))];
  const DESCRIPCION_CAT = {
    "Grupales": "Clases grupales en el centro: musculación, fuerza y potencia, yoga, pilates y el resto de las actividades grupales del horario.",
    "Personalizado en grupo": "Sesiones personalizadas en grupo reducido, con seguimiento y programa 100% personalizado para vos."
  };
  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="bv-modal mb-modal" onClick={(e) => e.stopPropagation()}>
        <button className="bv-cerrar" onClick={onCerrar} aria-label="Cerrar"><IconX></IconX></button>
        <span className="bv-eyebrow">Bienvenido a</span>
        <h2 className="bv-tit">DHARMA</h2>
        <p className="bv-intro">Somos un centro de entrenamiento que brinda distintas ofertas para que cada persona encuentre la opción que mejor se adapta a sus objetivos.</p>
        <h4 className="bv-subtit">Contamos con</h4>
        <div className="bv-servicios">
          {categorias.map((cat) => (
            <div className="bv-servicio" key={cat}>
              <span className="bv-servicio-nombre">{cat}</span>
              <span className="bv-servicio-desc">{DESCRIPCION_CAT[cat] || ""}</span>
            </div>
          ))}
          <div className="bv-servicio">
            <span className="bv-servicio-nombre">Personalizado 1 a 1</span>
            <span className="bv-servicio-desc">Atención exclusiva con tu coach, en horarios flexibles a pactar directamente con él.</span>
          </div>
        </div>
        <p className="bv-cierre">Creá tu perfil y accedé a la app, desde donde vas a poder gestionar tu membresía, anotar tus registros, reservar tus clases y mucho más.</p>
        <button className="btn-primario ancho" onClick={onCerrar}>Entendido, crear mi cuenta</button>
      </div>
    </div>
  );
}

function Entrada({ onCoach, onAlumno }) {
  const [modo, setModo] = React.useState("inicio"); // inicio | alumno | crear
  const [email, setEmail] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [descargo, setDescargo] = React.useState(false);
  const [error, setError] = React.useState("");
  const [verBienvenida, setVerBienvenida] = React.useState(false);

  const [verificando, setVerificando] = React.useState(false);

  const ingresar = async (e) => {
    e.preventDefault();
    setError("");
    // Blindaje: en un dispositivo nuevo o con la app recién reinstalada, la caché local
    // todavía no tiene las cuentas creadas por otros alumnos (llegan por sincronización).
    // Sin esto, alguien que ya se registró podía ver "no encontramos ninguna cuenta" y
    // terminar creando una segunda cuenta por error. Esperamos a que la nube responda
    // (como mucho ~4s) antes de decidir que la cuenta no existe.
    if (window.DHARMA_SYNC_READY && typeof window.DHARMA_SYNC_READY.then === "function") {
      setVerificando(true);
      try { await window.DHARMA_SYNC_READY; } catch (err) {}
      setVerificando(false);
    }
    try {
      const personas = leerPersonas();
      const eNorm = (email || "").trim().toLowerCase();
      if (!eNorm) { setError("Escribí tu mail."); return; }
      const match = personas.find((p) => { const em = (p && p.email || "").toString().trim().toLowerCase(); return em && em === eNorm; });
      if (!match) {
        setError("No encontramos ninguna cuenta con ese mail.");
        return;
      }
      if ((match.pin || "1234") !== (pin || "1234")) {
        setError("Clave incorrecta. Si no la sabés, pedile a tu coach que te la restablezca.");
        return;
      }
      onAlumno(match.id);
    } catch (err) {
      setError("No pudimos verificar esa cuenta. Probá de nuevo o avisale a tu coach.");
    }
  };

  const [matches, setMatches] = React.useState(null); // perfiles ya cargados con el mismo nombre, a confirmar antes de crear uno nuevo

  const crearCuenta = (e) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim()) { setError("Escribí tu nombre."); return; }
    const eNorm = (email || "").trim().toLowerCase();
    if (!eNorm) { setError("Poné tu mail — lo necesitás para entrar a tu cuenta."); return; }
    if (!descargo) { setError("Tenés que aceptar el descargo de responsabilidad para crear tu cuenta."); return; }
    const personas = leerPersonas();
    if (personas.some((p) => (p.email || "").trim().toLowerCase() === eNorm)) {
      setError("YA_EXISTE");
      return;
    }
    // antes de crear una cuenta nueva, buscamos si el coach ya cargó un perfil con ese
    // mismo nombre y sin mail vinculado — evita duplicados cuando el alumno ya existe
    // en el sistema pero todavía no tiene acceso a la app.
    const nNorm = nrmNombre(nombre);
    const candidatos = personas.filter((p) => !p.email && nrmNombre(p.nombre) === nNorm);
    if (candidatos.length) { setMatches(candidatos); return; }
    crearNueva();
  };

  const crearNueva = () => {
    const personas = leerPersonas();
    const eNorm = (email || "").trim().toLowerCase();
    const nueva = {
      id: "al" + Date.now(), nombre: nombre.trim(), email: eNorm, pin: "1234", pinPorDefecto: true,
      grupo: "g_personalizados", activo: true, creadoPorAlumno: true, ingresoCompleto: false, pruebaUsada: false,
      descargoAceptado: true, descargoFecha: new Date().toISOString().slice(0, 10)
    };
    guardarPersonasLS([nueva, ...personas]);
    onAlumno(nueva.id);
  };

  const vincularA = (persona) => {
    const eNorm = (email || "").trim().toLowerCase();
    const personas = leerPersonas();
    const actualizada = { ...persona, email: eNorm, pin: persona.pin || "1234", pinPorDefecto: persona.pinPorDefecto !== false, descargoAceptado: true, descargoFecha: new Date().toISOString().slice(0, 10) };
    guardarPersonasLS(personas.map((p) => (p.id === persona.id ? actualizada : p)));
    window.dharmaToast && window.dharmaToast("Te vinculamos a tu perfil ya cargado por tu coach", "ok");
    onAlumno(persona.id);
  };

  return (
    <div className="entrada" style={{ "--acento": "#489DA3", "--acento-claro": "#6EC5D1", "--entrada-foto": window.DHARMA_MARCA ? "url(" + window.DHARMA_MARCA.equipoFoto + ")" : "none" }}>
      <div className="entrada-marca">
        {window.DHARMA_MARCA ? <img className="entrada-isotipo" src={window.DHARMA_MARCA.isotipoNegro} alt=""></img> : null}
        <span className="entrada-logo">DHARMA</span>
        <span className="entrada-tagline">entrenar es para todo el mundo</span>
      </div>

      {modo === "inicio" ? (
        <div className="entrada-roles lista">
          <span className="er-grupo">Ya tengo cuenta</span>
          <button className="rol-fila" onClick={() => setModo("alumno")}>
            <span className="rf-icono naranja"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
            <span className="rf-tx"><span className="rf-nombre">Alumno</span><span className="rf-desc">Tu rutina, tus reservas y tu progreso</span></span>
            <span className="rf-flecha">→</span>
          </button>
          <button className="rol-fila" onClick={() => onCoach("coach")}>
            <span className="rf-icono"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path><circle cx="9" cy="7" r="3"></circle><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0-3-3.85"></path></svg></span>
            <span className="rf-tx"><span className="rf-nombre">Coach</span><span className="rf-desc">Clases del día, personas y pizarra</span></span>
            <span className="rf-flecha">→</span>
          </button>
          <button className="rol-fila" onClick={() => onCoach("admin")}>
            <span className="rf-icono"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></span>
            <span className="rf-tx"><span className="rf-nombre">Admin</span><span className="rf-desc">Gestión completa del centro</span></span>
            <span className="rf-flecha">→</span>
          </button>
          <span className="er-grupo">Primera vez</span>
          <button className="rol-fila nuevo" onClick={() => { setModo("crear"); setError(""); setNombre(""); setVerBienvenida(true); }}>
            <span className="rf-icono naranja"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v8M8 12h8"></path></svg></span>
            <span className="rf-tx"><span className="rf-nombre">Soy nuevo</span><span className="rf-desc">Creá tu cuenta y probá una clase</span></span>
            <span className="rf-flecha">→</span>
          </button>
        </div>
      ) : null}

      {modo === "alumno" ? (
        <form className="entrada-login" onSubmit={ingresar}>
          <button type="button" className="volver chico claro" onClick={() => { setModo("inicio"); setError(""); }}>← Volver</button>
          <h2 className="login-titulo">Entrar</h2>
          <p className="login-sub">Poné el mail con el que te registró tu coach.</p>
          <label className="campo">
            <span>Mail</span>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="tu@mail.com" autoFocus required></input>
          </label>
          <label className="campo">
            <span>Clave</span>
            <input type="password" inputMode="numeric" value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "").slice(0, 4)); setError(""); }} placeholder="1234" required></input>
          </label>
          {error ? <p className="login-error">{error}</p> : null}
          <button className="btn-primario ancho" type="submit" disabled={verificando}>{verificando ? "Verificando…" : "Entrar"}</button>
          <button type="button" className="btn-nuevo-alumno-link" onClick={() => { setModo("crear"); setError(""); setNombre(""); setVerBienvenida(true); }}>¿Todavía no tenés cuenta? Creala acá</button>
        </form>
      ) : null}

      {modo === "crear" ? (
        <form className="entrada-login" onSubmit={crearCuenta}>
          <button type="button" className="volver chico claro" onClick={() => { setModo("inicio"); setError(""); }}>← Volver</button>
          <h2 className="login-titulo">Crear mi cuenta</h2>
          <p className="login-sub">Si tu coach ya te cargó, mejor entrá con tu mail en vez de crear una nueva. <button type="button" className="link-inline" onClick={() => setVerBienvenida(true)}>Ver info del centro</button></p>
          <label className="campo">
            <span>Nombre y apellido</span>
            <input value={nombre} onChange={(e) => { setNombre(e.target.value); setError(""); }} placeholder="Como te conoce tu coach" autoFocus required></input>
          </label>
          <label className="campo">
            <span>Mail</span>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="tu@mail.com" required></input>
          </label>
          <label className="campo-check">
            <input type="checkbox" checked={descargo} onChange={(e) => { setDescargo(e.target.checked); setError(""); }}></input>
            <span>Acepto el descargo de responsabilidad del centro y confirmo que estoy en condiciones de entrenar.</span>
          </label>
          {error === "YA_EXISTE" ? (
            <div className="login-error ya-existe">
              <p><b>Ya tenés una cuenta con ese mail.</b> No hace falta crear otra.</p>
              <button type="button" className="btn-primario ancho" onClick={() => { setModo("alumno"); setError(""); }}>Entrar con mi cuenta</button>
            </div>
          ) : error ? <p className="login-error">{error}</p> : null}
          <button className="btn-primario ancho" type="submit">Crear cuenta</button>
          <p className="login-hint-chico">Tu clave por defecto es <b>1234</b> — podés reservar una clase de prueba antes de completar tu ficha completa.</p>
        </form>
      ) : null}
      {verBienvenida ? <BienvenidaModal onCerrar={() => setVerBienvenida(false)}></BienvenidaModal> : null}
      {matches ? (
        <div className="mb-overlay" onClick={() => setMatches(null)}>
          <div className="mb-modal chico" onClick={(e) => e.stopPropagation()}>
            <header className="mb-modal-cab">
              <div><div className="mb-modal-eyebrow">Antes de crear una cuenta nueva</div><h2>¿Sos alguno de estos perfiles?</h2></div>
              <button className="btn-icono" onClick={() => setMatches(null)}>✕</button>
            </header>
            <div className="mb-modal-cuerpo">
              <p style={{ margin: 0, fontSize: 13.5, color: "var(--ink-3)" }}>Tu coach ya cargó un perfil con este nombre, sin mail vinculado todavía. Elegí el tuyo para no duplicar tu cuenta.</p>
              {matches.map((p) => (
                <button type="button" key={p.id} className="rol-fila" onClick={() => vincularA(p)}>
                  <span className="rf-icono naranja"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"></circle><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path></svg></span>
                  <span className="rf-tx"><span className="rf-nombre">{p.nombre}</span><span className="rf-desc">Vincular este perfil a mi mail</span></span>
                  <span className="rf-flecha">→</span>
                </button>
              ))}
              <button type="button" className="btn-secundario ancho" onClick={() => { setMatches(null); crearNueva(); }}>Ninguno es el mío — crear cuenta nueva</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- red de seguridad: si algo en la cuenta de un alumno rompe el render, mostrar un aviso en vez de una pantalla en blanco/rota ---------- */
class AlumnoErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch(err) { try { console.error("AlumnoApp crash:", err); } catch (e) {} }
  render() {
    if (this.state.error) {
      return (
        <div className="entrada" style={{ "--acento": "#489DA3" }}>
          <div className="entrada-marca">{window.DHARMA_MARCA ? <img className="entrada-isotipo" src={window.DHARMA_MARCA.isotipoNegro} alt=""></img> : null}<span className="entrada-logo">DHARMA</span></div>
          <div className="entrada-login" style={{ textAlign: "center", gap: 16 }}>
            <h2 className="login-titulo">Algo salió mal</h2>
            <p className="login-sub">No pudimos cargar tu cuenta. Volvé a intentar o avisale a tu coach si sigue pasando.</p>
            <button className="btn-primario ancho" onClick={() => { this.setState({ error: false }); this.props.onSalir && this.props.onSalir(); }}>Volver al inicio</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ============================================================
   APP DEL ALUMNO
   ============================================================ */
function AlumnoApp({ alumnoId, onSalir }) {
  return <AlumnoErrorBoundary onSalir={onSalir}><AlumnoAppInterna alumnoId={alumnoId} onSalir={onSalir}></AlumnoAppInterna></AlumnoErrorBoundary>;
}
function AlumnoAppInterna({ alumnoId, onSalir }) {
  const [personas, setPersonas] = React.useState(() => leerPersonas());
  React.useEffect(() => {
    // misma auto-reactivación de congelamientos vencidos que corre en Admin: sin esto,
    // un alumno cuyo congelamiento ya venció queda bloqueado si ningún admin abrió su
    // panel ese día para disparar el resuelto.
    if (!window.Membresia) return;
    try {
      const socios = A_leerSocios();
      const resuelto = window.Membresia.aplicarCongelamientosVencidos(socios);
      if (resuelto !== socios) A_guardarSocios(resuelto);
    } catch (e) {}
  }, []);
  const actualId = alumnoId;
  const [vista, setVista] = React.useState("inicio");
  const [claseAbierta, setClaseAbierta] = React.useState(null);
  const [editarIngreso, setEditarIngreso] = React.useState(false);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [segTab, setSegTab] = React.useState("cargas");
  const [entTab, setEntTab] = React.useState("progreso"); // progreso | rutina | registros
  const [cuentaTab, setCuentaTab] = React.useState("plan"); // plan | datos
  const irA = (id, subtab) => { if (id === "entrenamiento" && subtab) setEntTab(subtab); if (id === "cuenta" && subtab) setCuentaTab(subtab); setVista(id); };

  // hooks SIEMPRE arriba de cualquier return condicional (evita el crash de "más hooks que el render anterior"
  // cuando persona pasa de pinPorDefecto/cuestionario/sin-plan a la app normal entre un render y el siguiente)
  const _planesN = React.useMemo(() => A_leerPlanes(), []);
  const _sociosN = React.useMemo(() => A_leerSocios(), []);
  const persona0 = personas.find((p) => p.id === actualId);
  const notifItemsAlumno = persona0 && window.notifsAlumno ? window.notifsAlumno(persona0, _planesN, _sociosN) : [];
  React.useEffect(() => {
    if (!persona0) return;
    notifItemsAlumno.forEach((n) => window.notifNativa && window.notifNativa("DHARMA", n.texto, persona0.id + "-" + n.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifItemsAlumno.length, persona0 && persona0.id]);

  const persona = personas.find((p) => p.id === actualId);
  if (!persona) return <div className="alumno-empty" style={{ margin: 40 }}><p>No pudimos encontrar tu perfil. Volvé a entrar.</p><button className="btn-primario" onClick={onSalir}>Salir</button></div>;

  const guardarPersona = (next) => {
    // Blindaje anti-carrera: en vez de mapear sobre el "personas" que quedó en el estado
    // de este componente (puede haberse desactualizado si llegaron cambios de otro
    // dispositivo mientras esta pantalla estaba abierta), releemos la lista más fresca
    // posible de localStorage y aplicamos el cambio de ESTA persona sobre esa base —
    // así nunca pisamos altas/ediciones de otro dispositivo con una copia vieja.
    const frescas = leerPersonas();
    const arr = frescas.map((p) => (p.id === next.id ? next : p));
    if (!arr.some((p) => p.id === next.id)) arr.unshift(next);
    setPersonas(arr);
    guardarPersonasLS(arr);
  };

  const visiblesIds = A_cargar(A_CLAVE_VISIBLES, []);
  const todasClases = [...window.DHARMA_DATA.clases, ...A_cargar(A_CLAVE_CUSTOM, [])];
  const clasesVisibles = todasClases.filter((c) => visiblesIds.includes(c.id));

  if (!persona) {
    return (
      <div className="alumno-vacio">
        <p>No hay alumnos cargados.</p>
        <button className="btn-primario" onClick={onSalir}>Volver</button>
      </div>
    );
  }

  // clave por defecto (recién creado o restablecida por el coach) → hay que cambiarla antes de seguir
  if (persona.pinPorDefecto) {
    return <CambiarPinObligatorio persona={persona} onListo={(p) => guardarPersona(p)} onSalir={onSalir}></CambiarPinObligatorio>;
  }

  // ingreso pendiente y ya usó su clase de prueba → cuestionario obligatorio.
  // Blindaje: si ya tiene un plan pagado y activo (no en prueba), NUNCA la bloqueamos con
  // esto — puede ser un dato de ficha viejo/incompleto de antes de pagar, pero ya es
  // alumna real y no corresponde volver a pedirle el formulario para poder entrar.
  const _tienePlanActivoYa = (() => {
    try {
      const s = JSON.parse(localStorage.getItem("dharma-socios-v1") || "{}")[persona.id];
      const pls = JSON.parse(localStorage.getItem("dharma-planes-v1") || "null") || (window.DHARMA_DATA.planes || []);
      const pl = window.Membresia && s ? window.Membresia.planDe(pls, s) : null;
      const est = window.Membresia ? window.Membresia.estado(s, pl) : { key: "sinplan" };
      return est.key !== "sinplan" && est.key !== "vencida";
    } catch (e) { return false; }
  })();
  if ((persona.ingresoCompleto === false && persona.pruebaUsada && !_tienePlanActivoYa) || editarIngreso) {
    return (
      <CuestionarioIngreso
        persona={persona}
        onCompletar={(p) => { guardarPersona(p); setEditarIngreso(false); setVista("inicio"); }}
        onCancelar={editarIngreso ? () => setEditarIngreso(false) : onSalir}
      ></CuestionarioIngreso>
    );
  }

  // sin plan activo → pantalla bloqueada, salvo que todavía tenga su clase de prueba disponible
  const planesTodos = (() => { try { const v = JSON.parse(localStorage.getItem("dharma-planes-v1")); if (v) return v; } catch (e) {} return (window.DHARMA_DATA.planes || []); })();
  const sociosTodos = (() => { try { return JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) { return {}; } })();
  const subActual = sociosTodos[persona.id];
  const planActual = window.Membresia ? window.Membresia.planDe(planesTodos, subActual) : null;
  const estadoPlan = window.Membresia ? window.Membresia.estado(subActual, planActual) : { key: "sinplan", label: "Sin plan" };
  const enPrueba = persona.ingresoCompleto === false && !persona.pruebaUsada;
  const planOk = (estadoPlan.key !== "vencida" && estadoPlan.key !== "sinplan" && estadoPlan.key !== "congelada") || enPrueba;
  if (!planOk) {
    return <AlumnoSinPlan persona={persona} estado={estadoPlan} onSalir={onSalir}></AlumnoSinPlan>;
  }

  const estiloRaiz = { "--acento": "#489DA3", "--acento-claro": "#6EC5D1" };
  const navItems = [["inicio", "Inicio"], ["reservar", "Reservar"], ["entrenamiento", "Progreso"], ["cuenta", "Mi cuenta"], ["info", "Información"]];
  const navObjs = navItems.map(([id, lbl]) => ({ tipo: id, label: lbl }));
  const irNav = (id) => { setVista(id); setClaseAbierta(null); window.scrollTo(0, 0); };
  const navIcono = (id) => {
    const p = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" };
    if (id === "inicio") return <svg {...p}><path d="M3 11l9-7 9 7"></path><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"></path></svg>;
    if (id === "reservar") return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18M8 2v4M16 2v4"></path></svg>;
    if (id === "cuenta") return <svg {...p}><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path></svg>;
    if (id === "rutina" || id === "entrenamiento") return <svg {...p}><path d="M6.5 6.5l11 11"></path><path d="M4 9l-1.5-1.5"></path><path d="M9 4L7.5 2.5"></path><rect x="3" y="6" width="4" height="4" rx="1" transform="rotate(45 5 8)"></rect><rect x="17" y="14" width="4" height="4" rx="1" transform="rotate(45 19 16)"></rect></svg>;
    if (id === "clases") return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>;
    if (id === "seguimiento") return <svg {...p}><path d="M3 17l5-5 4 4 8-8"></path><path d="M16 8h5v5"></path></svg>;
    if (id === "info") return <svg {...p}><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v5h1"></path></svg>;
    return <svg {...p}><circle cx="12" cy="8" r="4"></circle><path d="M5 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"></path></svg>;
  };
  const tabActiva = (id) => vista === id && !claseAbierta;

  return (
    <div style={estiloRaiz} className="app-shell">
      <Sidebar items={navObjs} activo={claseAbierta ? null : vista} onIr={irNav} subtitulo="ALUMNO"></Sidebar>
      <div className="main-area">
      <header className="topbar alumno">
        <div className="brand brand-mobile">
          <img className="brand-isotipo" src={(window.DHARMA_MARCA && window.DHARMA_MARCA.isotipoNegro) || ""} alt=""></img>
          <span className="brand-nombre">DHARMA</span>
          <span className="brand-sub">ALUMNO</span>
        </div>
        <div className="topbar-derecha">
          <div className="alumno-switch">
            <NotifBell items={notifItemsAlumno} onIr={(n) => { if (["solic", "venc", "creditos", "renov"].includes(n.id)) setVista("cuenta"); }}></NotifBell>
            <button className="alumno-chip" onClick={() => setPickerOpen((o) => !o)}>
              <Avatar persona={persona} size={28}></Avatar>
              <span className="ac-nombre">{persona.nombre.split(" ")[0]}</span>
              <span className="ac-flecha">▾</span>
            </button>
            {pickerOpen ? (
              <div className="card-menu alumno-menu">
                <button onClick={() => setVista("perfil")}>Mi perfil</button>
                <button className="peligro" onClick={onSalir}><IconSalir></IconSalir> Salir / cambiar rol</button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {pickerOpen ? <div className="picker-telon" onClick={() => setPickerOpen(false)}></div> : null}

      <div className="alumno-scroll">
      {claseAbierta ? (
        <AlumnoClaseDetalle clase={claseAbierta} onVolver={() => setClaseAbierta(null)}></AlumnoClaseDetalle>
      ) : vista === "inicio" ? (
        <AlumnoInicio persona={persona} personas={personas} clasesVisibles={clasesVisibles} onIr={irA} onGuardarPersona={guardarPersona} onSalir={onSalir}></AlumnoInicio>
      ) : vista === "reservar" ? (
        <AlumnoReservar persona={persona} onGuardarPersona={guardarPersona}></AlumnoReservar>
      ) : vista === "membresia" ? (
        <AlumnoMembresia persona={persona}></AlumnoMembresia>
      ) : vista === "entrenamiento" ? (
        <AlumnoEntrenamiento persona={persona} onGuardar={guardarPersona} tab={entTab} onTab={setEntTab} segTab={segTab} onSegTab={setSegTab}></AlumnoEntrenamiento>
      ) : vista === "cuenta" ? (
        <AlumnoCuenta persona={persona} tab={cuentaTab} onTab={setCuentaTab} onEditarIngreso={() => setEditarIngreso(true)} onSalir={onSalir}></AlumnoCuenta>
      ) : vista === "clases" ? (
        <AlumnoClases clases={clasesVisibles} onAbrir={setClaseAbierta}></AlumnoClases>
      ) : vista === "info" ? (
        <AlumnoInformacion></AlumnoInformacion>
      ) : null}
      </div>

      <BottomNav items={navObjs} activo={claseAbierta ? null : vista} onIr={irNav} principales={["inicio", "reservar", "entrenamiento"]}></BottomNav>
      <Toaster></Toaster>
      </div>
    </div>
  );
}

/* ---------- sin plan activo: pantalla bloqueada ---------- */
function AlumnoSinPlan({ persona, estado, onSalir }) {
  const msg = estado.key === "vencida" ? "Tu plan venció."
    : estado.key === "congelada" ? "Tu membresía está " + estado.label.toLowerCase() + "."
    : estado.key === "sincreditos" ? "Ya usaste todas tus clases de este mes."
    : "Todavía no tenés un plan activo.";
  const [renovPedida, setRenovPedida] = React.useState(() => !!(window.Renovaciones && window.Renovaciones.leer()[persona.id]));
  const pedir = () => { window.Renovaciones && window.Renovaciones.pedir(persona.id); setRenovPedida(true); };
  return (
    <div className="entrada" style={{ "--acento": "#489DA3", "--acento-claro": "#6EC5D1", "--entrada-foto": window.DHARMA_MARCA ? "url(" + window.DHARMA_MARCA.equipoFoto + ")" : "none" }}>
      <div className="entrada-marca">
        {window.DHARMA_MARCA ? <img className="entrada-isotipo" src={window.DHARMA_MARCA.isotipoNegro} alt=""></img> : null}
        <span className="entrada-logo">DHARMA</span>
        <span className="entrada-tagline">entrenar es para todo el mundo</span>
      </div>
      <div className="alumno-sinplan">
        <Avatar persona={persona} size={56}></Avatar>
        <h2>Hola, {persona.nombre.split(" ")[0]}</h2>
        {estado.key === "sinplan" ? (
          <SolicitarPlan persona={persona}></SolicitarPlan>
        ) : (
          <>
            <p>{msg} {estado.key === "congelada" ? "Se reactiva sola, no hace falta que hagas nada." : renovPedida ? "Tu solicitud de renovación ya fue enviada — el centro la confirma al recibir el pago." : "Solicitá la renovación y el centro la activa al confirmar el pago."}</p>
            {estado.key === "congelada" || renovPedida ? null : <button className="btn-primario ancho" onClick={pedir}>Solicitar renovación</button>}
          </>
        )}
        <button className="btn-secundario ancho claro" onClick={onSalir}>← Volver</button>
      </div>
    </div>
  );
}

/* ---------- rol semanal (DJ / co-coach / aguatero) — visible para todos, informal ---------- */
function RolSemanalBanner({ persona, personas, reservas }) {
  if (!window.Gamif) return null;
  const [verGuia, setVerGuia] = React.useState(false);
  const socios = (() => { try { return JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) { return {}; } })();
  const r = window.Gamif.rankingSemana(personas || [persona], { reservas, socios });
  if (r.podio.length === 0) return null;
  const miRol = r.rolDe(persona.id);
  return (
    <section className="rs-banner">
      {miRol ? (
        <div className="rs-mio">
          <span className="rs-mio-ico">{miRol.rol.icono}</span>
          <div><span className="rs-mio-tit">¡Sos {miRol.rol.nombre} esta semana!</span><span className="rs-mio-desc">{miRol.rol.desc}. Se activa en tu próxima clase.</span></div>
        </div>
      ) : null}
      <div className="rs-cab">
        <span className="rs-cab-tit">Roles de la semana</span>
        <button className="gb-ayuda-suelta" onClick={() => setVerGuia(true)} title="¿Cómo funciona?">?</button>
      </div>
      <div className="rs-lista">
        {r.podio.map((pu) => (
          <div className="rs-fila" key={pu.rol.id}>
            <span className="rs-ico">{pu.rol.icono}</span>
            <div className="rs-fila-tx"><span className="rs-rol">{pu.rol.nombre}</span><span className="rs-nom">{pu.ganadores.map((g) => g.nombre).join(" · ")}</span></div>
          </div>
        ))}
      </div>
      {verGuia ? (
        <div className="mb-overlay" onClick={() => setVerGuia(false)}>
          <div className="mb-modal chico" onClick={(e) => e.stopPropagation()}>
            <header className="mb-modal-cab"><div><h2>¿Qué son los roles de la semana?</h2></div><button className="btn-icono" onClick={() => setVerGuia(false)}>✕</button></header>
            <div className="mb-modal-cuerpo">
              <p>Cada semana, los 3 alumnos con más puntos ganan un rol simbólico que se activa en su próxima clase:</p>
              {window.Gamif.ROLES_SEMANA.map((rol) => (
                <div className="rs-guia-fila" key={rol.id}><span className="rs-ico">{rol.icono}</span><div><span className="rs-rol">{rol.nombre}</span><span className="rs-nom">{rol.desc}</span></div></div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/* ---------- check-in rápido: modal al entrar por primera vez en el día; si se cierra sin completar, queda como barra plegable en Inicio ---------- */
function checkinVistoHoyKey(personaId, hoyIso) { return "dharma-checkin-visto-" + personaId + "-" + hoyIso; }
// Blindaje de zona horaria: toISOString() da la fecha en UTC, y Costa Rica es UTC-6 —
// cerca de medianoche local eso puede devolver el día SIGUIENTE (o anterior), haciendo
// que un check-in hecho a la noche quede archivado bajo otra fecha y ya no "cuente"
// como hecho al reabrir la app al otro día. Usamos siempre la fecha del calendario local.
function hoyIsoLocal() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + day;
}

function CheckinRapido({ persona, onGuardarPersona, onIr }) {
  const hoyIso = hoyIsoLocal();
  const wellness = persona.wellness || [];
  const hoyReg = wellness.find((w) => w.fecha === hoyIso);
  const [f, setF] = React.useState(() => hoyReg || { fecha: hoyIso, suenoCal: "", energia: "", animo: "", dolor: "", estres: "", sueno: "", notas: "" });
  const [guardado, setGuardado] = React.useState(!!hoyReg);
  const [modalAbierto, setModalAbierto] = React.useState(() => {
    if (hoyReg) return false;
    try { return !localStorage.getItem(checkinVistoHoyKey(persona.id, hoyIso)); } catch (e) { return true; }
  });
  const [expandido, setExpandido] = React.useState(false);
  React.useEffect(() => {
    const onAbrir = () => { if (guardado) return; if (hoyReg) return; setModalAbierto(true); setExpandido(true); };
    window.addEventListener("dharma-abrir-checkin", onAbrir);
    return () => window.removeEventListener("dharma-abrir-checkin", onAbrir);
  }, [guardado, hoyReg]);
  const listoParaGuardar = f.sueno !== "" && f.dolor !== "" && f.estres !== "" && f.energia !== "" && f.animo !== "";

  const set = (campo, valor) => { setF({ ...f, [campo]: valor }); setGuardado(false); };

  const cerrarModal = () => {
    setModalAbierto(false);
    try { localStorage.setItem(checkinVistoHoyKey(persona.id, hoyIso), "1"); } catch (e) {}
  };

  const guardarCheckin = () => {
    if (!listoParaGuardar) return;
    const otras = wellness.filter((w) => w.fecha !== hoyIso);
    onGuardarPersona({ ...persona, wellness: [{ ...f }, ...otras] });
    setGuardado(true);
    setModalAbierto(false);
    setExpandido(false);
    try { localStorage.setItem(checkinVistoHoyKey(persona.id, hoyIso), "1"); } catch (e) {}
    window.dharmaToast && window.dharmaToast("Check-in registrado — +5 pts", "ok");
  };

  const HORAS_SUENO = [5, 6, 7, 8, 9];
  const OPCIONES_ESCALA = {
    dolor: [{ v: 1, l: "Nada" }, { v: 3, l: "Algo" }, { v: 5, l: "Mucho" }],
    estres: [{ v: 1, l: "Bajo" }, { v: 3, l: "Medio" }, { v: 5, l: "Alto" }],
    energia: [{ v: 1, l: "Baja" }, { v: 3, l: "Media" }, { v: 5, l: "Alta" }],
    animo: [{ v: 1, l: "Mal" }, { v: 3, l: "Regular" }, { v: 5, l: "Bien" }]
  };
  const colorPorValor = (campo, v) => {
    if (v === 3) return "#D4A72C";
    const invertido = campo === "energia" || campo === "animo"; // alto = bueno
    const bueno = "#489DA3", malo = "#E8944D";
    return invertido ? (v === 5 ? bueno : malo) : (v === 1 ? bueno : malo);
  };

  const barra = (campo, etiqueta) => (
    <div className="wq-fila" key={campo}>
      <span className="wq-label">{etiqueta}</span>
      <div className="wq-chips">
        {OPCIONES_ESCALA[campo].map((o) => {
          const activo = Number(f[campo]) === o.v;
          const color = colorPorValor(campo, o.v);
          return <button key={o.v} className={"wq-chip" + (activo ? " activo" : "")} style={activo ? { background: color, borderColor: color, color: "#fff" } : undefined} onClick={() => set(campo, o.v)} aria-pressed={activo}>{o.l}</button>;
        })}
      </div>
    </div>
  );

  const contenidoForm = (
    <React.Fragment>
      <div className="wq-fila">
        <span className="wq-label">Horas de sueño</span>
        <div className="wq-pills">
          {HORAS_SUENO.map((h) => (
            <button key={h} className={"wq-pill" + (Number(f.sueno) === h ? " activo" : "")} onClick={() => set("sueno", h)}>{h === 9 ? "9+" : h}</button>
          ))}
        </div>
      </div>
      {barra("dolor", "Dolor muscular")}
      {barra("estres", "Estrés")}
      {barra("energia", "Energía")}
      {barra("animo", "Ánimo")}
      <button className="wq-guardar" disabled={!listoParaGuardar} onClick={guardarCheckin}>
        {guardado ? "Check-in guardado ✓" : "Guardar check-in · +5 pts"}
      </button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {modalAbierto ? (
        <div className="mb-overlay checkin-overlay" onClick={cerrarModal}>
          <div className="mb-modal chico checkin-modal" onClick={(e) => e.stopPropagation()}>
            <header className="mb-modal-cab">
              <div><div className="mb-modal-eyebrow">Antes de arrancar</div><h2>¿Cómo está tu cuerpo hoy?</h2></div>
              <button className="btn-icono" onClick={cerrarModal} aria-label="Cerrar">✕</button>
            </header>
            <div className="mb-modal-cuerpo">{contenidoForm}</div>
          </div>
        </div>
      ) : null}

      {guardado ? (
        <div className="inicio-checkin-barra listo">
          <span className="cb-icono">✓</span>
          <span className="cb-texto">Check-in de hoy registrado</span>
          <button className="cb-editar" onClick={() => onIr("entrenamiento", "registros")}>Ver</button>
        </div>
      ) : (
        <div className="inicio-checkin-barra">
          <button className="cb-fila-toggle" onClick={() => setExpandido((v) => !v)} aria-expanded={expandido}>
            <span className="cb-icono pendiente">●</span>
            <span className="cb-texto">Aún no hiciste tu check-in de hoy</span>
            <span className={"cb-chevron" + (expandido ? " abierto" : "")}>⌄</span>
          </button>
          {expandido ? <div className="cb-cuerpo">{contenidoForm}</div> : null}
        </div>
      )}
    </React.Fragment>
  );
}

/* ---------- banner de progreso/gamificación en Inicio ---------- */
function GamifBannerInicio({ persona, reservas, onIr }) {
  const socios = (() => { try { return JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) { return {}; } })();
  const [verGuia, setVerGuia] = React.useState(() => { try { return !localStorage.getItem("dharma-gamif-visto-" + persona.id); } catch (e) { return false; } });
  if (!window.Gamif) return null;
  const g = window.Gamif.calcular(persona, { reservas, socios });
  const pct = g.umbral ? Math.min(100, Math.round((g.minimoPilar / g.umbral) * 100)) : 100;
  const restan = g.umbral ? Math.max(0, g.umbral - g.minimoPilar) : 0;
  const nombrePilar = window.Gamif.PILARES[g.pilarMasDebil].nombre;
  const cerrarGuia = () => { try { localStorage.setItem("dharma-gamif-visto-" + persona.id, "1"); } catch (e) {} setVerGuia(false); };
  const mensaje = g.listoParaSubir
    ? "¡Llegaste al mínimo en los 4 pilares! Avisale a tu coach para confirmar tu salto a " + window.Gamif.cap(g.siguiente) + "."
    : "Te faltan " + restan + " pts en " + (nombrePilar || "pilar").toLowerCase() + ". Se suma reservando clases, marcando tu estado del día o registrando una marca personal.";
  const NIVEL_ICONO = { guerrero: "⚔️", ninja: "🥷", mago: "🧙", maestro: "🏆" };
  return (
    <React.Fragment>
      <button className="gb-banner" onClick={() => onIr("entrenamiento", "progreso")}>
        <div className="gb-medalla">{NIVEL_ICONO[g.nivel] || g.nivel.slice(0, 2).toUpperCase()}</div>
        <div className="gb-info">
          <div className="gb-fila-top">
            <span className="gb-nivel">{window.Gamif.cap(g.nivel)} <span className="gb-tier">{g.subnivel}</span></span>
            <span className="gb-pts">{g.total} pts</span>
          </div>
          <div className="gb-barra"><div className="gb-barra-fill" style={{ width: pct + "%" }}></div></div>
          <p className="gb-msg">{mensaje}</p>
        </div>
        <span className="gb-ayuda" onClick={(e) => { e.stopPropagation(); setVerGuia(true); }} title="¿Cómo funciona?">?</span>
      </button>
      {verGuia ? <GamifGuiaModal onCerrar={cerrarGuia}></GamifGuiaModal> : null}
    </React.Fragment>
  );
}

function GamifGuiaModal({ onCerrar }) {
  return (
    <div className="mb-overlay" onClick={onCerrar}>
      <div className="gg-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="gg-tit">Así funciona tu progreso</h3>
        <p className="gg-sub">El objetivo: subir de nivel — Guerrero → Ninja → Mago → Maestro. Cada nivel tiene 3 escalones: Bronce → Plata → Oro, así ves tu progreso incluso mientras seguís en el mismo nivel. Para subir de nivel necesitás un mínimo en las 4 áreas a la vez, no solo sumar puntos en una.</p>
        <div className="gg-pilares">
          {Object.entries(window.Gamif.PILARES).map(([k, p]) => (
            <div className="gg-pilar" key={k}><span className="gg-dot" style={{ background: p.color }}></span>{p.nombre}</div>
          ))}
        </div>
        <p className="gg-como-tit">¿Cómo sumás puntos?</p>
        <ul className="gg-lista">
          <li>Reservar y asistir a una clase <b>+10 pts</b></li>
          <li>Marcar tu estado del día (check-in) <b>+5 pts</b></li>
          <li>Mantener una racha de buen descanso <b>+15 pts</b></li>
          <li>Registrar una marca personal (PR) <b>+25 pts</b></li>
          <li>Cumplir tu plan del mes <b>hasta +60 pts</b></li>
        </ul>
        <p className="gg-nota">Cuando llegás al mínimo en las 4 áreas, tu coach confirma el salto de nivel en persona.</p>
        <button className="btn-primario gg-btn" onClick={onCerrar}>Entendido, ¡a jugar!</button>
      </div>
    </div>
  );
}

/* ---------- mi entrenamiento: rutina + progreso agrupados en pestañas ---------- */
function AlumnoEntrenamiento({ persona, onGuardar, tab, onTab, segTab, onSegTab }) {
  return (
    <div>
      <div className="alumno-tabs-fuera">
      <div className="tabs-sesion alumno-tabs">
        <button className={tab === "progreso" ? "activo" : ""} onClick={() => onTab("progreso")}>Progreso</button>
        <button className={tab === "rutina" ? "activo" : ""} onClick={() => onTab("rutina")}>Mi rutina</button>
        <button className={tab === "registros" ? "activo" : ""} onClick={() => onTab("registros")}>Registros</button>
      </div>
      </div>
      {tab === "progreso" ? <ProgresoAlumno persona={persona}></ProgresoAlumno>
        : tab === "registros" ? <AlumnoSeguimiento persona={persona} onGuardar={onGuardar} tab={segTab} onTab={onSegTab}></AlumnoSeguimiento>
        : <AlumnoProceso persona={persona} onGuardar={onGuardar}></AlumnoProceso>}
    </div>
  );
}

/* ---------- cambio de PIN obligatorio (cuenta nueva o restablecida por el coach) ---------- */
function CambiarPinObligatorio({ persona, onListo, onSalir }) {
  const [pin1, setPin1] = React.useState("");
  const [pin2, setPin2] = React.useState("");
  const [error, setError] = React.useState("");
  const guardar = (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(pin1)) { setError("La clave tiene que tener 4 números."); return; }
    if (pin1 === "1234") { setError("Elegí una clave distinta a la de por defecto (1234)."); return; }
    if (pin1 !== pin2) { setError("Las dos claves no coinciden."); return; }
    onListo({ ...persona, pin: pin1, pinPorDefecto: false });
  };
  return (
    <div className="entrada" style={{ "--acento": "#489DA3", "--acento-claro": "#6EC5D1" }}>
      <div className="entrada-marca">{window.DHARMA_MARCA ? <img className="entrada-isotipo" src={window.DHARMA_MARCA.isotipoNegro} alt=""></img> : null}<span className="entrada-logo">DHARMA</span></div>
      <form className="entrada-login" onSubmit={guardar}>
        <button type="button" className="volver chico claro" onClick={onSalir}>← Salir</button>
        <h2 className="login-titulo">Elegí tu clave</h2>
        <p className="login-sub">Por seguridad, antes de seguir tenés que cambiar tu clave de acceso (hoy está en el valor por defecto).</p>
        <label className="campo"><span>Nueva clave (4 números)</span><input type="password" inputMode="numeric" value={pin1} onChange={(e) => setPin1(e.target.value.replace(/\D/g, "").slice(0, 4))} autoFocus required></input></label>
        <label className="campo"><span>Repetila</span><input type="password" inputMode="numeric" value={pin2} onChange={(e) => setPin2(e.target.value.replace(/\D/g, "").slice(0, 4))} required></input></label>
        {error ? <p className="login-error">{error}</p> : null}
        <button className="btn-primario ancho" type="submit">Guardar y continuar</button>
      </form>
    </div>
  );
}

/* ---------- noticias del centro (cargadas por admin) ---------- */
function NoticiasAlumno() {
  const noticias = window.noticiasLeer ? window.noticiasLeer() : [];
  if (!noticias.length) return null;
  return (
    <div className="inicio-noticias">
      {noticias.slice(0, 3).map((n) => (
        <div className="in-fila" key={n.id}><span className="in-icono">📣</span><span className="in-tx">{n.texto}</span></div>
      ))}
    </div>
  );
}

/* ---------- inicio ---------- */
function AlumnoInicio({ persona, personas, clasesVisibles, onIr, onGuardarPersona, onSalir }) {
  const proc = persona.proceso;
  const [tick, setTick] = React.useState(0);
  const [modalCarga, setModalCarga] = React.useState(false);
  React.useEffect(() => {
    const onCambio = () => setTick((t) => t + 1);
    window.addEventListener("dharma-reservas-actualizadas", onCambio);
    window.addEventListener("dharma-datos-remotos-aplicados", onCambio);
    return () => { window.removeEventListener("dharma-reservas-actualizadas", onCambio); window.removeEventListener("dharma-datos-remotos-aplicados", onCambio); };
  }, []);
  // Blindaje: socios/planes se leen atados a `tick` (igual que en Reservar) para que un
  // plan renovado o créditos cargados por el coach mientras esta pantalla ya estaba
  // abierta se reflejen acá también — antes se leían una sola vez al montar y podían
  // quedar desactualizados frente a la pantalla de Reservar, mostrando cupos distintos.
  const _socios = React.useMemo(() => (() => { try { return JSON.parse(localStorage.getItem("dharma-socios-v1")) || {}; } catch (e) { return {}; } })(), [tick]);
  const _sub = _socios[persona.id];
  const _planes = React.useMemo(() => (() => { try { const v = JSON.parse(localStorage.getItem("dharma-planes-v1")); if (v) return v; } catch (e) {} return (window.DHARMA_DATA.planes || []); })(), [tick]);
  const _plan = window.Membresia && _sub ? window.Membresia.planDe(_planes, _sub) : null;
  const _estado = window.Membresia ? window.Membresia.estado(_sub, _plan) : { key: "sinplan" };
  const sesiones = (proc && proc.sesiones) || [];
  const primera = sesiones[0];
  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buen día" : hora < 20 ? "Buenas tardes" : "Buenas noches";
  const hoyIso = hoyIsoLocal();
  const checkHoy = (persona.wellness || []).some((w) => w.fecha === hoyIso);
  const { alertas } = (window.calcularAlertasWellness ? window.calcularAlertasWellness(persona.wellness) : { alertas: [] });
  const notifItemsInicio = window.notifsAlumno ? window.notifsAlumno(persona, _planes, _socios) : [];
  const NIVEL_ICONO_HERO = { guerrero: "⚔️", ninja: "🥷", mago: "🧙", maestro: "🏆" };

  const eventos = React.useMemo(() => A_leerEventos(), [tick]);
  const reservas = React.useMemo(() => window.Reservas.cargar(), [tick]);
  const config = React.useMemo(() => A_leerConfig(), [tick]);
  const hoyDate = new Date();
  const wdHoy = (hoyDate.getDay() + 6) % 7;
  const clasesHoy = eventos.filter((e) => {
    if (e.privado) return false;
    if ((e.categoria || "Grupales") !== (_plan ? _plan.categoria : "Grupales")) return false;
    const rep = e.repite || [];
    if (rep.length) return rep.includes(wdHoy) && e.fecha <= hoyIso;
    return e.fecha === hoyIso;
  }).sort((a, b) => a.inicio.localeCompare(b.inicio));
  const creditosDisp = _sub && _sub.creditos != null ? _sub.creditos : 0;
  const ilimitado = _plan && _plan.tipo === "ilimitada";
  const gHero = window.Gamif ? window.Gamif.calcular(persona, { reservas, socios: _socios }) : null;

  const reservarHoy = (ev) => {
    const yaReservado = window.Reservas.tiene(reservas, ev.id, hoyIso, persona.id);
    if (yaReservado) {
      const min = window.Reservas.minutosHastaInicio(hoyIso, ev.inicio);
      const reembolsa = min >= (config.antelacionCancelacion || 120);
      window.Reservas.cancelar(reservas, ev.id, hoyIso, persona.id);
      window.Reservas.registrarCancelacion(ev.id, hoyIso, persona.id, reembolsa);
      if (reembolsa && !ilimitado && _sub) A_ajustarCredito(persona.id, 1);
      window.dharmaToast && window.dharmaToast(reembolsa ? "Reserva cancelada — crédito devuelto" : "Reserva cancelada — sin devolución por el poco aviso", reembolsa ? "ok" : "borrado");
      setTick((t) => t + 1);
      return;
    }
    if (!ilimitado && creditosDisp <= 0 && !(persona.ingresoCompleto === false && !persona.pruebaUsada)) { window.dharmaToast && window.dharmaToast("No te quedan clases disponibles en tu plan", "borrado"); return; }
    const libres = window.Reservas.cupoLibreEn(ev, reservas, hoyIso);
    if (libres <= 0) { window.dharmaToast && window.dharmaToast("Esa clase ya no tiene cupo", "borrado"); return; }
    const esPrueba = persona.ingresoCompleto === false && !persona.pruebaUsada;
    window.Reservas.reservar(reservas, ev.id, hoyIso, persona.id, ev.cupo, () => {
      if (esPrueba || ilimitado) return;
      A_ajustarCredito(persona.id, 1);
    });
    if (esPrueba) {
      onGuardarPersona && onGuardarPersona({ ...persona, pruebaUsada: true });
      window.dharmaToast && window.dharmaToast("¡Reservaste tu clase de prueba! Completá tu ficha para poder seguir reservando.", "ok");
    } else {
      if (!ilimitado && _sub) A_ajustarCredito(persona.id, -1);
      window.dharmaToast && window.dharmaToast("¡Reservado! " + ev.titulo, "ok");
    }
    setTick((t) => t + 1);
  };

  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Inicio">
      <header className="inicio-cab">
        <div>
          <span className="ah-saludo">{saludo}</span>
          <h1 className="ic-nombre">{persona.nombre.split(" ")[0]}</h1>
          <span className="ic-fecha">{hoyDate.toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "long" })}</span>
        </div>
        <div className="ic-cab-derecha">
          {gHero ? (
            <span className="stat-chip nivel">
              <span className="scn-top">{NIVEL_ICONO_HERO[gHero.nivel] || "⚔️"} {window.Gamif.cap(gHero.nivel)} {gHero.subnivel}</span>
              <span className="scn-bottom">{gHero.total} pts</span>
            </span>
          ) : null}
          {_plan ? (
            <button className="ic-plan" onClick={() => onIr("cuenta", "plan")} title="Ver mi plan">
              <span className="icp-datos"><span className="icp-num">{ilimitado ? "∞" : creditosDisp}</span><span className="icp-lbl">{ilimitado ? "ilimitado" : creditosDisp === 1 ? "clase" : "clases"}</span></span>
              <span className="icp-cta">Renovar →</span>
            </button>
          ) : null}
        </div>
      </header>

      <CheckinRapido persona={persona} onGuardarPersona={onGuardarPersona} onIr={onIr}></CheckinRapido>

      <NoticiasAlumno></NoticiasAlumno>

      <div className="inicio-acciones-rapidas">
        <button className="iar-btn iar-primaria" onClick={() => onIr("reservar")}>
          <span className="iar-icono"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18M8 2v4M16 2v4"></path></svg></span>
          Reservar clase
        </button>
        <button className="iar-btn" onClick={() => { try { window.dispatchEvent(new CustomEvent("dharma-abrir-checkin")); } catch (e) {} }}>
          <span className="iar-icono"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"></path><circle cx="12" cy="12" r="9"></circle></svg></span>
          Check-in diario
        </button>
        <button className="iar-btn" onClick={() => setModalCarga(true)}>
          <span className="iar-icono"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 20V10M12 20V4M18 20v-6"></path></svg></span>
          Registrar carga
        </button>
      </div>

      {gHero && gHero.rachaSueno > 0 ? (
        <div className="inicio-stats-row">
          <span className="stat-chip fuego">🔥 {gHero.rachaSueno} {gHero.rachaSueno === 1 ? "día" : "días"} de racha</span>
        </div>
      ) : null}

      {(_estado.key === "porvencer" || _estado.key === "sincreditos") ? (
        <button className="inicio-banner" onClick={() => onIr("cuenta", "plan")}>
          <IconoAlerta size={14}></IconoAlerta>
          <span className="ib-txt">{_estado.key === "porvencer" ? "Tu plan " + (_estado.label || "").toLowerCase() : "Ya usaste todas tus clases de este mes"}</span>
          <span className="ib-cta">Renovar →</span>
        </button>
      ) : null}

      <NotifCard items={notifItemsInicio.filter((n) => n.id === "solic")} onIr={() => onIr("cuenta", "plan")}></NotifCard>

      <section className="inicio-hoy foco">
        <div className="ih-cab">
          <h3 className="mp-subtit" style={{ marginBottom: 0 }}>Hoy</h3>
          <button className="ih-vertodo" onClick={() => onIr("reservar")}>Ver horarios completos →</button>
        </div>
        {clasesHoy.length === 0 ? (
          <div className="alumno-empty" style={{ marginTop: 10 }}><p>No hay clases programadas para hoy.</p></div>
        ) : (
          <div className="ar-lista" style={{ marginTop: 10 }}>
            {clasesHoy.map((ev) => {
              const reservado = window.Reservas.tiene(reservas, ev.id, hoyIso, persona.id);
              const libres = window.Reservas.cupoLibreEn(ev, reservas, hoyIso);
              const lleno = !reservado && libres <= 0;
              const sinCreditos = !ilimitado && creditosDisp <= 0;
              return (
                <div className={"ar-item hoy-card" + (reservado ? " reservado" : "") + (lleno ? " lleno" : "")} key={ev.id}>
                  <span className="ar-hora">{ev.inicio}</span>
                  <span className="ar-info">
                    <span className="ar-nombre">{ev.titulo}</span>
                    <span className="ar-meta">{ev.fin ? "hasta " + ev.fin : ""}</span>
                    {ev.cupo ? <span className={"hoy-spots" + (libres <= 0 ? " llena" : libres <= 3 ? " pocas" : "")}>{libres <= 0 ? "⚪ Sin cupo" : "🟢 " + libres + " lugares"}</span> : null}
                  </span>
                  <button className={"ar-btn hoy-cta" + (reservado ? " activo" : "") + ((lleno || (sinCreditos && !reservado)) ? " disabled" : "")} disabled={!_plan || lleno || (sinCreditos && !reservado)} onClick={() => reservarHoy(ev)}>
                    {reservado ? "Cancelar" : lleno ? "Sin cupo" : sinCreditos ? "Sin clases" : "Reservar · +10 pts"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <div className="inicio-secundario">
        <GamifBannerInicio persona={persona} reservas={reservas} onIr={onIr}></GamifBannerInicio>
        <RolSemanalBanner persona={persona} personas={personas} reservas={reservas}></RolSemanalBanner>
      </div>

      {modalCarga ? <window.RegistrarCargaModal personaId={persona.id} onCerrar={() => setModalCarga(false)} onGuardado={() => setTick((t) => t + 1)}></window.RegistrarCargaModal> : null}
    </main>
  );
}

/* ---------- reservar clases ---------- */
function AlumnoReservar({ persona, onGuardarPersona }) {
  const [tick, setTick] = React.useState(0);
  const [tab, setTab] = React.useState("reservar"); // reservar | mias
  const [semanaOffset, setSemanaOffset] = React.useState(0); // 0 = semana actual; navegable hacia adelante/atrás
  const refrescar = () => setTick((t) => t + 1);
  React.useEffect(() => {
    window.addEventListener("dharma-reservas-actualizadas", refrescar);
    window.addEventListener("dharma-datos-remotos-aplicados", refrescar);
    return () => { window.removeEventListener("dharma-reservas-actualizadas", refrescar); window.removeEventListener("dharma-datos-remotos-aplicados", refrescar); };
  }, []);
  const eventos = React.useMemo(() => A_leerEventos(), [tick]);
  const reservas = React.useMemo(() => window.Reservas.cargar(), [tick]);
  const planes = React.useMemo(() => A_leerPlanes(), [tick]);
  const socios = React.useMemo(() => A_leerSocios(), [tick]);
  const config = React.useMemo(() => A_leerConfig(), [tick]);
  const sub = socios[persona.id];
  const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
  const ilimitado = plan && plan.tipo === "ilimitada";
  const creditosDisp = sub && sub.creditos != null ? sub.creditos : 0;

  const lunes = AR_sumarDias(AR_lunesDe(new Date()), semanaOffset * 7);
  const dias = Array.from({ length: 7 }, (_, i) => AR_sumarDias(lunes, i));
  const hoyIso = AR_isoDe(new Date());
  const rangoSemana = lunes.getDate() + " " + AR_MESES[lunes.getMonth()].slice(0, 3) + " – " + AR_sumarDias(lunes, 6).getDate() + " " + AR_MESES[AR_sumarDias(lunes, 6).getMonth()].slice(0, 3);

  const ocurrenciasDelDia = (isoDay, wd) => eventos.filter((e) => {
    if (e.privado) return false;
    if ((e.categoria || "Grupales") !== (plan ? plan.categoria : "Grupales")) return false;
    const rep = e.repite || [];
    if (rep.length) return rep.includes(wd) && e.fecha <= isoDay;
    return e.fecha === isoDay;
  }).sort((a, b) => a.inicio.localeCompare(b.inicio));

  const accionar = (ev, fecha) => {
    const yaReservado = window.Reservas.tiene(reservas, ev.id, fecha, persona.id);
    if (yaReservado) {
      const min = window.Reservas.minutosHastaInicio(fecha, ev.inicio);
      const reembolsa = min >= (config.antelacionCancelacion || 120);
      window.Reservas.cancelar(reservas, ev.id, fecha, persona.id);
      window.Reservas.registrarCancelacion(ev.id, fecha, persona.id, reembolsa);
      if (reembolsa && !ilimitado && sub) A_ajustarCredito(persona.id, 1);
      window.dharmaToast && window.dharmaToast(reembolsa ? "Reserva cancelada — crédito devuelto" : "Reserva cancelada — sin devolución por el poco aviso", reembolsa ? "ok" : "borrado");
      refrescar();
      return;
    }
    if (!ilimitado && creditosDisp <= 0 && !(persona.ingresoCompleto === false && !persona.pruebaUsada)) { window.dharmaToast && window.dharmaToast("No te quedan clases disponibles en tu plan", "borrado"); return; }
    if (fecha < hoyIso) { window.dharmaToast && window.dharmaToast("Esa clase ya pasó", "borrado"); return; }
    const libres = window.Reservas.cupoLibreEn(ev, reservas, fecha);
    if (libres <= 0) { window.dharmaToast && window.dharmaToast("Esa clase ya no tiene cupo", "borrado"); return; }
    const esPrueba = persona.ingresoCompleto === false && !persona.pruebaUsada;
    window.Reservas.reservar(reservas, ev.id, fecha, persona.id, ev.cupo, () => {
      if (esPrueba || ilimitado) return;
      A_ajustarCredito(persona.id, 1);
    });
    if (esPrueba) {
      onGuardarPersona && onGuardarPersona({ ...persona, pruebaUsada: true });
      window.dharmaToast && window.dharmaToast("¡Reservaste tu clase de prueba! Completá tu ficha para poder seguir reservando.", "ok");
    } else {
      if (!ilimitado && sub) A_ajustarCredito(persona.id, -1);
      window.dharmaToast && window.dharmaToast("¡Reservado! " + ev.titulo, "ok");
    }
    refrescar();
  };

  if (!plan) {
    return (
      <main className="contenido alumno-contenido" data-screen-label="Alumno — Reservar">
        <h1 className="titulo-vista">Reservar</h1>
        <div className="alumno-empty"><p>Necesitás un plan activo para reservar clases. Hablá con tu coach.</p></div>
      </main>
    );
  }

  const sinCreditos = !ilimitado && creditosDisp <= 0;

  const misReservas = React.useMemo(() => {
    const propias = window.Reservas.dePersona(reservas, persona.id);
    return propias.map((r) => ({ ...r, ev: eventos.find((e) => e.id === r.eventoId) })).filter((r) => r.ev).sort((a, b) => (a.fecha + a.ev.inicio).localeCompare(b.fecha + b.ev.inicio));
  }, [reservas, eventos, persona.id]);
  const hoyStr = AR_isoDe(new Date());
  const proximas = misReservas.filter((r) => r.fecha >= hoyStr);
  const pasadas = misReservas.filter((r) => r.fecha < hoyStr);

  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Reservar">
      <h1 className="titulo-vista">Reservar</h1>
      <div className="tabs-sesion alumno-tabs" style={{ marginBottom: 6 }}>
        <button className={tab === "reservar" ? "activo" : ""} onClick={() => setTab("reservar")}>Reservar</button>
        <button className={tab === "mias" ? "activo" : ""} onClick={() => setTab("mias")}>Mis reservas{proximas.length ? " (" + proximas.length + ")" : ""}</button>
      </div>

      {tab === "mias" ? (
        <div className="ar-mias">
          {proximas.length === 0 ? (
            <div className="alumno-empty"><p>Todavía no tenés reservas para los próximos días.</p></div>
          ) : (
            <section className="ar-dia">
              <h3 className="ar-dia-tit">Próximas</h3>
              <div className="ar-lista">
                {proximas.map((r) => (
                  <div className="ar-item reservado" key={r.id}>
                    <span className="ar-hora">{r.ev.inicio}</span>
                    <span className="ar-info">
                      <span className="ar-nombre">{r.ev.titulo}</span>
                      <span className="ar-meta">{new Date(r.fecha + "T00:00").toLocaleDateString("es-CR", { weekday: "long", day: "numeric", month: "short" })}</span>
                    </span>
                    <button className="ar-btn activo" onClick={() => accionar(r.ev, r.fecha)}>Cancelar</button>
                  </div>
                ))}
              </div>
            </section>
          )}
          {pasadas.length > 0 ? (
            <section className="ar-dia">
              <h3 className="ar-dia-tit">Historial reciente</h3>
              <div className="ar-lista">
                {pasadas.slice(-8).reverse().map((r) => (
                  <div className="ar-item" key={r.id} style={{ opacity: 0.6 }}>
                    <span className="ar-hora">{r.ev.inicio}</span>
                    <span className="ar-info">
                      <span className="ar-nombre">{r.ev.titulo}</span>
                      <span className="ar-meta">{new Date(r.fecha + "T00:00").toLocaleDateString("es-CR", { day: "numeric", month: "short" })}</span>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <>
      <p className="subtitulo-vista">
        {ilimitado ? "Tu plan es ilimitado — reservá las que quieras." : creditosDisp + (creditosDisp === 1 ? " clase disponible este mes." : " clases disponibles este mes.")}
      </p>
      {sinCreditos ? <div className="ar-sincreditos">Ya usaste todas tus clases de este mes — podés cancelar una reserva para liberarla, o hablar con tu coach para renovar.</div> : null}

      <div className="ar-semana-nav">
        <button className="ar-semana-btn" onClick={() => setSemanaOffset((o) => o - 1)} aria-label="Semana anterior">‹</button>
        <button className="ar-semana-hoy" onClick={() => setSemanaOffset(0)}>Hoy</button>
        <button className="ar-semana-btn" onClick={() => setSemanaOffset((o) => o + 1)} aria-label="Semana siguiente">›</button>
        <span className="ar-semana-rango">{rangoSemana}</span>
      </div>
      <div className="ar-semana">
        {dias.map((d, i) => {
          const iso = AR_isoDe(d);
          const items = ocurrenciasDelDia(iso, i);
          if (!items.length) return null;
          return (
            <section className="ar-dia" key={i}>
              <h3 className={"ar-dia-tit" + (iso === hoyIso ? " hoy" : "")}>{AR_DIAS_SEM[i]} {d.getDate()}{iso === hoyIso ? <span className="ar-hoy-chip">Hoy</span> : null}</h3>
              <div className="ar-lista">
                {items.map((ev) => {
                  const reservado = window.Reservas.tiene(reservas, ev.id, iso, persona.id);
                  const libres = window.Reservas.cupoLibreEn(ev, reservas, iso);
                  const pasado = iso < hoyIso;
                  const lleno = !reservado && libres <= 0;
                  return (
                    <div className={"ar-item" + (reservado ? " reservado" : "") + (lleno ? " lleno" : "")} key={ev.id + iso}>
                      <span className="ar-hora">{ev.inicio}</span>
                      <span className="ar-info">
                        <span className="ar-nombre">{ev.titulo}</span>
                        <span className="ar-meta">{ev.fin ? "hasta " + ev.fin : ""} {ev.cupo ? "· " + libres + "/" + ev.cupo + " lugares" : "· sin límite"}</span>
                      </span>
                      <button className={"ar-btn" + (reservado ? " activo" : "") + ((pasado || lleno || (sinCreditos && !reservado)) ? " disabled" : "")} disabled={pasado || lleno || (sinCreditos && !reservado)} onClick={() => accionar(ev, iso)}>
                        {reservado ? "Cancelar" : pasado ? "Ya pasó" : lleno ? "Sin cupo" : sinCreditos ? "Sin clases" : "Reservar"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
        {dias.every((d, i) => ocurrenciasDelDia(AR_isoDe(d), i).length === 0) ? (
          <div className="alumno-empty"><p>No hay clases de tu categoría de plan ({plan.categoria}) cargadas esta semana.</p></div>
        ) : null}
      </div>
      </>
      )}
    </main>
  );
}

/* ---------- mi rutina (proceso, lectura + registro de cargas) ---------- */
function AlumnoProceso({ persona, onGuardar }) {
  const proc = persona.proceso;
  const [ses, setSes] = React.useState(0);
  const [sem, setSem] = React.useState(0);

  if (!proc || !proc.sesiones || proc.sesiones.length === 0) {
    return (
      <main className="contenido alumno-contenido" data-screen-label="Alumno — Mi rutina">
        <h1 className="titulo-vista">Mi rutina</h1>
        <div className="alumno-empty">
          <p>Tu coach todavía no cargó tu rutina. Cuando la prepare, vas a verla acá con tus ejercicios semana a semana.</p>
        </div>
      </main>
    );
  }

  const n = proc.semanas || 1;
  const sActual = proc.sesiones[Math.min(ses, proc.sesiones.length - 1)];

  const logSem = (bi, ii, field, val) => {
    const sesiones = proc.sesiones.map((s, si) => si !== ses ? s : {
      ...s,
      bloques: s.bloques.map((b, x) => x !== bi ? b : {
        ...b,
        items: b.items.map((it, y) => y !== ii ? it : {
          ...it,
          semanas: it.semanas.map((w, z) => z !== sem ? w : { ...w, [field]: val })
        })
      })
    });
    onGuardar({ ...persona, proceso: { ...proc, sesiones } });
  };

  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Mi rutina">
      <div className="alumno-proc-cab">
        <div>
          <h1 className="titulo-vista">{proc.nombre}</h1>
          {proc.objetivo ? <p className="subtitulo-vista">{proc.objetivo}</p> : null}
        </div>
      </div>

      <div className="ap-semanas">
        {Array.from({ length: n }).map((_, i) => (
          <button key={i} className={"ap-semana" + (i === sem ? " activo" : "")} onClick={() => setSem(i)}>Semana {i + 1}</button>
        ))}
      </div>

      {proc.sesiones.length > 1 ? (
        <div className="tabs-sesion alumno-tabs">
          {proc.sesiones.map((s, i) => (
            <button key={i} className={i === ses ? "activo" : ""} onClick={() => setSes(i)}>{s.nombre || "Sesión " + (i + 1)}</button>
          ))}
        </div>
      ) : null}

      <div className="ap-bloques">
        {sActual.bloques.map((b, bi) => (
          <div className="ap-bloque" key={bi}>
            <div className="ap-bloque-cab">{b.nombre}</div>
            <div className="ap-ejercicios">
              {b.items.map((it, ii) => {
                const w = it.semanas[sem] || { sxr: "", kg: "", rpe: "" };
                return (
                  <div className="ap-ej" key={ii}>
                    <div className="ap-ej-info">
                      {it.codigo ? <span className="ap-cod">{it.codigo}</span> : null}
                      <span className="ap-nombre">{it.ej}</span>
                      {it.nota ? <span className="ap-nota">{it.nota}</span> : null}
                    </div>
                    <div className="ap-prescripto">
                      <span className="ap-presc-label">Objetivo</span>
                      <span className="ap-presc-val">{w.sxr || "—"}</span>
                    </div>
                    <div className="ap-log">
                      <label className="ap-log-campo">
                        <span>Carga</span>
                        <div className="ap-input-kg">
                          <input inputMode="decimal" value={w.kg} placeholder="—" onChange={(e) => logSem(bi, ii, "kg", e.target.value)}></input>
                          <em>kg</em>
                        </div>
                      </label>
                      <label className="ap-log-campo">
                        <span>RPE</span>
                        <select value={w.rpe} onChange={(e) => logSem(bi, ii, "rpe", e.target.value)}>
                          {["", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"].map((v) => <option key={v} value={v}>{v || "—"}</option>)}
                        </select>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="ap-guardado">✓ Tus cargas se guardan solas a medida que las escribís.</p>
    </main>
  );
}

/* ---------- clases visibles ---------- */
function AlumnoClases({ clases, onAbrir }) {
  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Clases">
      <h1 className="titulo-vista">Clases</h1>
      <p className="subtitulo-vista">Las clases que tu coach habilitó para que mires y sigas por tu cuenta.</p>
      {clases.length === 0 ? (
        <div className="alumno-empty"><p>Todavía no hay clases habilitadas para vos. Tu coach las irá sumando.</p></div>
      ) : (
        <div className="grilla-clases">
          {clases.map((c) => (
            <article className="tarjeta-clase" key={c.id} onClick={() => onAbrir(c)} data-screen-label={"Clase — " + c.nombre}>
              <div className="fila-icono">
                <span className="icono-cat"><IconoCat tipo={c.icono} size={20}></IconoCat></span>
                <span className="chip">{(c.sesiones || []).length} sesiones</span>
              </div>
              <h3>{c.nombre}</h3>
              <p className="desc">{c.descripcion}</p>
              <div className="fila-meta">
                <span className="chip">{c.nivel}</span>
                <span className="chip">{c.duracion}′</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function AlumnoClaseDetalle({ clase, onVolver }) {
  const [ses, setSes] = React.useState(0);
  const sesion = (clase.sesiones || [])[Math.min(ses, (clase.sesiones || []).length - 1)];
  return (
    <main className="contenido alumno-contenido" data-screen-label={"Alumno — " + clase.nombre}>
      <button className="volver" onClick={onVolver}>← Clases</button>
      <header className="cabecera-clase">
        <div>
          <h1>{clase.nombre}</h1>
          <p className="desc">{clase.descripcion}</p>
          <div className="metas">
            <span className="chip">{clase.nivel}</span>
            <span className="chip">{clase.duracion}′</span>
          </div>
        </div>
      </header>
      <div style={{ marginTop: 24 }}>
        {(clase.sesiones || []).length > 1 ? (
          <div className="tabs-sesion">
            {clase.sesiones.map((s, i) => (
              <button key={i} className={i === ses ? "activo" : ""} onClick={() => setSes(i)}>{s.nombre}</button>
            ))}
          </div>
        ) : null}
        {sesion && sesion.foco ? <p className="foco-sesion"><strong>Foco de la sesión</strong>{sesion.foco}</p> : null}
        {sesion ? (sesion.bloques || []).map((b, i) => <BloqueLectura bloque={b} indice={i} key={i}></BloqueLectura>) : null}
      </div>
    </main>
  );
}

/* ---------- mi plan: estado de la membresía, créditos y pagos ---------- */
/* ---------- catálogo de planes: el alumno pide, el admin aprueba ---------- */
function SolicitarPlan({ persona }) {
  const [solicitado, setSolicitado] = React.useState(persona.planSolicitado || "");
  const planes = A_leerPlanes();
  if (!planes.length) return <div className="alumno-empty"><p>Todavía no hay planes cargados. Hablá con tu coach.</p></div>;
  const pedir = (id) => {
    const arr = leerPersonas().map((p) => (p.id === persona.id ? { ...p, planSolicitado: id } : p));
    guardarPersonasLS(arr);
    setSolicitado(id);
    window.dharmaToast && window.dharmaToast("Solicitud enviada — el centro activa tu plan al confirmar el pago", "ok");
  };
  const cats = [...new Set(planes.map((p) => p.categoria || "Planes"))];
  return (
    <div className="sp-catalogo">
      {solicitado ? (
        <div className="mp-renov enviada">Pediste <b>{(planes.find((p) => p.id === solicitado) || {}).nombre || "un plan"}</b> — el centro lo activa al confirmar el pago.</div>
      ) : (
        <p className="sp-intro">Elegí el plan que querés — el centro lo activa al confirmar el pago.</p>
      )}
      {cats.map((cat) => (
        <div key={cat} className="sp-cat">
          <span className="sp-cat-nombre">{cat}</span>
          <div className="cuest-planes">
            {planes.filter((p) => (p.categoria || "Planes") === cat).map((p) => (
              <div key={p.id} className={"cuest-plan-op sp-op" + (solicitado === p.id ? " activo" : "")}>
                <span className="cp-nom">{p.nombre.replace(cat + " — ", "")}</span>
                <span className="cp-det">{p.tipo === "ilimitada" ? "Ilimitada" : p.creditos + " clases"} · ₡{(p.precio || 0).toLocaleString("es-CR")}</span>
                {solicitado === p.id ? <span className="sp-pedido">Solicitado ✓</span> : <button className="btn-secundario sp-btn" onClick={() => pedir(p.id)}>{solicitado ? "Cambiar a este" : "Quiero este"}</button>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AlumnoMembresia({ persona }) {
  const planes = A_leerPlanes();
  const socios = A_leerSocios();
  const sub = socios[persona.id];
  const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
  const estado = window.Membresia ? window.Membresia.estado(sub, plan) : { key: "sinplan", label: "Sin plan", cls: "sinplan" };
  const ilimitado = plan && plan.tipo === "ilimitada";
  const pagos = (sub && sub.pagos) || [];
  const ultimoPago = pagos.length ? pagos[pagos.length - 1] : null;
  const [renovPedida, setRenovPedida] = React.useState(() => !!(window.Renovaciones && window.Renovaciones.leer()[persona.id]));
  const puedeRenovar = plan && ["vencida", "porvencer", "sincreditos"].includes(estado.key);
  const pedirRenov = () => { window.Renovaciones && window.Renovaciones.pedir(persona.id); setRenovPedida(true); window.dharmaToast && window.dharmaToast("Solicitud enviada — el centro la confirma al recibir el pago", "ok"); };

  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Mi plan">

      {!plan ? (
        <SolicitarPlan persona={persona}></SolicitarPlan>
      ) : (
        <>
          <div className="mp-resumen">
            <div className="mp-resumen-cab">
              <span className="mp-plan-nombre">{plan.nombre}</span>
              <span className={"mb-badge " + estado.cls}>{estado.label}</span>
            </div>
            <div className="mp-metricas">
              <div className="mp-metrica">
                <span className="mp-metrica-lbl">Clases disponibles</span>
                <span className="mp-metrica-val">{ilimitado ? "∞" : (sub.creditos || 0) + " / " + plan.creditos}</span>
              </div>
              <div className="mp-metrica">
                <span className="mp-metrica-lbl">Vence</span>
                <span className="mp-metrica-val">{window.Membresia.fmt(sub.vencimiento)}</span>
              </div>
              <div className="mp-metrica">
                <span className="mp-metrica-lbl">Último pago</span>
                <span className="mp-metrica-val">{ultimoPago ? window.Membresia.fmt(ultimoPago.fecha) : "—"}</span>
              </div>
            </div>
          </div>

          {puedeRenovar ? (
            renovPedida ? (
              <div className="mp-renov enviada">Tu solicitud de renovación fue enviada — el centro la confirma al recibir el pago.</div>
            ) : (
              <div className="mp-renov">
                <span>{estado.key === "vencida" ? "Tu plan venció." : estado.key === "sincreditos" ? "Usáste todas tus clases." : "Tu plan está por vencer."}</span>
                <button className="btn-primario" onClick={pedirRenov}>Solicitar renovación</button>
              </div>
            )
          ) : null}

          <h4 className="mp-subtit">Historial de pagos</h4>
          {pagos.length === 0 ? (
            <div className="alumno-empty"><p>Todavía no hay pagos registrados en tu cuenta.</p></div>
          ) : (
            <div className="mp-pagos">
              {pagos.slice().reverse().map((pg, i) => (
                <div className="mp-pago" key={i}>
                  <span className="mp-pago-fecha">{window.Membresia.fmt(pg.fecha)}</span>
                  <span className="mp-pago-concepto">{pg.concepto}</span>
                  <span className="mp-pago-metodo">{pg.metodo}</span>
                  <span className="mp-pago-monto">₡{Number(pg.monto || 0).toLocaleString("es-CR")}</span>
                </div>
              ))}
            </div>
          )}

          {plan.categoria === "Personalizado 1 a 1" || (window.RegistroPersonalizado && window.RegistroPersonalizado.dePersona(persona.id).length > 0) ? (
            <>
              <h4 className="mp-subtit" style={{ marginTop: 24 }}>Historial de clases 1 a 1</h4>
              {(() => {
                const historial = window.RegistroPersonalizado ? window.RegistroPersonalizado.dePersona(persona.id) : [];
                return historial.length === 0 ? (
                  <div className="alumno-empty"><p>Todavía no tenés clases personalizadas registradas.</p></div>
                ) : (
                  <div className="mp-pagos">
                    {historial.map((r) => (
                      <div className="mp-pago" key={r.id}>
                        <span className="mp-pago-fecha">{window.Membresia.fmt(r.fecha)}</span>
                        <span className="mp-pago-concepto">{r.titulo}</span>
                        <span className="mp-pago-metodo">{r.coach || "—"}</span>
                        <span></span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </>
          ) : null}
        </>
      )}
    </main>
  );
}

/* ---------- acordeón de preguntas frecuentes ---------- */
function InfoAcordeon({ items }) {
  const [abierto, setAbierto] = React.useState(0);
  return (
    <div className="info-acordeon">
      {items.map((it, i) => (
        <div className={"ia-item" + (abierto === i ? " abierto" : "")} key={i}>
          <button className="ia-cab" onClick={() => setAbierto(abierto === i ? null : i)}>
            <span className="ia-icono">{it.icono}</span>
            <span className="ia-tit">{it.titulo}</span>
            <span className="ia-chevron">⌄</span>
          </button>
          {abierto === i ? <div className="ia-cuerpo"><p>{it.texto}</p></div> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------- información: sobre el centro, nutrición/descanso, blog ---------- */
function AlumnoInformacion() {
  const [tab, setTab] = React.useState("centro"); // centro | vida | blog
  const [post, setPost] = React.useState(null);
  const info = A_cargar("dharma-info-v1", window.DHARMA_DATA.info || {});
  const planes = A_leerPlanes();
  const porCategoria = {};
  planes.forEach((p) => { (porCategoria[p.categoria] = porCategoria[p.categoria] || []).push(p); });

  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Información">
      <h1 className="titulo-vista">Información</h1>
      <div className="tabs-sesion alumno-tabs info-tabs" style={{ marginBottom: 6 }}>
        <button className={tab === "centro" ? "activo" : ""} onClick={() => { setTab("centro"); setPost(null); }}>Sobre el centro</button>
        <button className={tab === "vida" ? "activo" : ""} onClick={() => { setTab("vida"); setPost(null); }}>Nutrición y descanso</button>
        <button className={tab === "blog" ? "activo" : ""} onClick={() => { setTab("blog"); setPost(null); }}>Blog</button>
      </div>

      {tab === "centro" ? (
        <div className="info-secciones">
          <section className="info-card">
            <h4>Precios y planes</h4>
            <div className="info-planes-grid">
              {Object.keys(porCategoria).map((cat) => porCategoria[cat].map((p) => (
                <div className="plan-card" key={p.id}>
                  <span className="plan-card-cat">{cat}</span>
                  <span className="plan-card-nombre">{p.nombre}</span>
                  <span className="plan-card-precio">₡{Number(p.precio).toLocaleString("es-CR")}</span>
                  <span className="plan-card-duracion">{p.tipo === "ilimitada" ? "Ilimitado" : p.creditos + (p.creditos === 1 ? " clase" : " clases")} · vence a los {p.dias} días</span>
                </div>
              )))}
            </div>
          </section>
          <section className="info-card">
            <h4>Preguntas frecuentes</h4>
            <InfoAcordeon items={[
              { icono: "📅", titulo: "Cómo reservar", texto: info.centro && info.centro.comoReservar },
              { icono: "🚫", titulo: "Política de cancelación", texto: info.centro && info.centro.cancelacion },
              { icono: "⏳", titulo: "Vencimiento del plan", texto: info.centro && info.centro.vencimiento },
              { icono: "📋", titulo: "Condiciones generales", texto: (info.centro && info.centro.condiciones) || "Los créditos y la vigencia del plan son personales e intransferibles. El uso de la app implica aceptar estas condiciones." }
            ]}></InfoAcordeon>
          </section>
          <section className="info-card">
            <h4>Medios de pago</h4>
            <div className="info-pagos-cuentas">
              {(info.centro && info.centro.cuentasPago || []).map((c, i) => (
                <div className="info-pago-fila" key={i}><span className="ip-medio">{c.medio}</span><span className="ip-detalle">{c.detalle}</span></div>
              ))}
            </div>
            <p style={{ marginTop: 10 }}>{info.centro && info.centro.comoPagar}</p>
          </section>
        </div>
      ) : null}

      {tab === "vida" ? (
        <div className="info-secciones">
          <section className="info-card">
            <h4>Nutrición</h4>
            <div className="info-articulos">
              {(info.nutricion || []).map((a) => <div className="info-articulo" key={a.id}><strong>{a.titulo}</strong><p>{a.texto}</p></div>)}
            </div>
          </section>
          <section className="info-card">
            <h4>Descanso</h4>
            <div className="info-articulos">
              {(info.descanso || []).map((a) => <div className="info-articulo" key={a.id}><strong>{a.titulo}</strong><p>{a.texto}</p></div>)}
            </div>
          </section>
        </div>
      ) : null}

      {tab === "blog" ? (
        post ? (
          <div className="info-post-detalle">
            <button className="volver chico" onClick={() => setPost(null)}>← Blog</button>
            <h2>{post.titulo}</h2>
            <span className="info-post-fecha">{post.fecha}</span>
            <p>{post.texto}</p>
          </div>
        ) : (
          <div className="info-blog-lista">
            {(info.blog || []).length === 0 ? <div className="alumno-empty"><p>Todavía no hay notas publicadas.</p></div> :
              (info.blog || []).map((b) => (
                <button className="info-post-card" key={b.id} onClick={() => setPost(b)}>
                  <span className="info-post-fecha">{b.fecha}</span>
                  <span className="info-post-titulo">{b.titulo}</span>
                  <span className="info-post-extracto">{b.texto.slice(0, 110)}…</span>
                </button>
              ))}
          </div>
        )
      ) : null}
    </main>
  );
}

/* ---------- mi cuenta: plan/membresía + datos personales, en pestañas ---------- */
function AlumnoCuenta({ persona, tab, onTab, onEditarIngreso, onSalir }) {
  return (
    <div>
      <div className="alumno-tabs-fuera">
      <div className="tabs-sesion alumno-tabs">
        <button className={tab === "plan" ? "activo" : ""} onClick={() => onTab("plan")}>Mi plan</button>
        <button className={tab === "datos" ? "activo" : ""} onClick={() => onTab("datos")}>Mis datos</button>
      </div>
      </div>
      {tab === "datos" ? <AlumnoPerfil persona={persona} onEditarIngreso={onEditarIngreso} onSalir={onSalir}></AlumnoPerfil> : <AlumnoMembresia persona={persona}></AlumnoMembresia>}
    </div>
  );
}

/* ---------- mi perfil ---------- */
function AlumnoPerfil({ persona, onEditarIngreso, onSalir }) {
  return (
    <main className="contenido alumno-contenido" data-screen-label="Alumno — Mi perfil">
      <header className="cabecera-persona">
        <div className="cp-id">
          <Avatar persona={persona} size={64}></Avatar>
          <div>
            <h1>{persona.nombre}</h1>
            {persona.objetivo ? <p className="cp-objetivo">{persona.objetivo}</p> : null}
            <div className="metas">
              <ChipNivel nivel={persona.nivel}></ChipNivel>
              {persona.edad ? <span className="chip">{persona.edad} años</span> : null}
            </div>
          </div>
        </div>
        <button className="btn-secundario" onClick={onEditarIngreso}>Editar mi ingreso</button>
      </header>

      <div className="perfil-grid" style={{ marginTop: 22 }}>
        <div className="perfil-col">
          <section className="bloque-info">
            <h4>Mis datos</h4>
            <dl className="ficha">
              <div><dt>Experiencia</dt><dd>{persona.experiencia || "—"}</dd></div>
              <div><dt>Deporte</dt><dd>{persona.deporte || "—"}</dd></div>
              <div><dt>Trabajo</dt><dd>{persona.tipoTrabajo || "—"}</dd></div>
            </dl>
          </section>
          <section className="bloque-info">
            <h4>Lesiones</h4>
            {(!persona.lesiones || persona.lesiones.length === 0) ? <p className="vacio">Ninguna registrada.</p> :
              persona.lesiones.map((l, i) => (
                <div className="tarjeta-lesion" key={i}>
                  <div className="zona">{l.zona}</div>
                  {l.detalle ? <div className="detalle">{l.detalle}</div> : null}
                  {l.adaptacion ? <div className="adaptacion">→ {l.adaptacion}</div> : null}
                </div>
              ))}
          </section>
        </div>
        <div className="perfil-col">
          <section className="bloque-info">
            <h4>Dolores frecuentes</h4>
            {(!persona.doloresFrecuentes || persona.doloresFrecuentes.length === 0) ? <p className="vacio">Ninguno.</p> : (
              <ul className="lista-dolores">{persona.doloresFrecuentes.map((d, i) => <li key={i}>{d}</li>)}</ul>
            )}
          </section>
          {persona.alertas ? (
            <section className="alerta-obs"><h4>Lo que tu coach sabe</h4><p>{persona.alertas}</p></section>
          ) : null}
          <button className="btn-secundario peligro ancho" onClick={onSalir}><IconSalir></IconSalir> Salir / cambiar de rol</button>
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { Entrada, AlumnoApp, AlumnoReservar, GamifGuiaModal });
