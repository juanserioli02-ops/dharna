// DHARMA — app principal: biblioteca de clases, detalle de clase, y personas (perfil + rutina)
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "acento": "#489DA3",
  "pizarraEscala": 1
}/*EDITMODE-END*/;

const ACENTOS = { "#489DA3": "#6EC5D1", "#E84D23": "#F15B29", "#000000": "#6EC5D1" };
// v2: re-siembra desde el dataset de prueba (1 clase + 1 cliente).
// Los datos previos quedan intactos bajo las claves -v1 por si hay que recuperarlos.
const CLAVE_PERSONAS = "dharma-personas-v2";
const CLAVE_SECCIONES = "dharma-secciones-v2";
const CLAVE_CLASES_CUSTOM = "dharma-clases-custom-v2";
const CLAVE_CLASES_OCULTAS = "dharma-clases-ocultas-v1";
const CLAVE_ASIGNACION = "dharma-asignacion-v2";
const CLAVE_SESION = "dharma-sesion-v2";
const CLAVE_VISIBLES = "dharma-clases-visibles-v2";
const CLAVE_SUBSECCIONES = "dharma-subsecciones-v2";

const NAV_ITEMS = [
  { tipo: "dashboard", label: "Inicio", grupo: "Hoy" },
  { tipo: "calendario", label: "Calendario", grupo: "Hoy" },
  { tipo: "biblioteca", label: "Clases", tambien: ["clase"], grupo: "Hoy" },
  { tipo: "personas", label: "Personas", tambien: ["persona"], grupo: "Gestión" },
  { tipo: "coaches", label: "Coaches", grupo: "Gestión" },
  { tipo: "economia", label: "Economía", grupo: "Gestión" },
  { tipo: "ejercicios", label: "Ejercicios", grupo: "Herramientas" },
  { tipo: "planificador", label: "Planificador", grupo: "Herramientas" },
  { tipo: "estudio", label: "Estudio", tambien: ["manual"], grupo: "Herramientas" },
  { tipo: "mishoras", label: "Mis horas", grupo: "Herramientas", soloCoach: true },
  { tipo: "herramientas", label: "Herramientas", grupo: "Herramientas" }
];
const CLAVE_SUBASIGNACION = "dharma-subasignacion-v2";
const CLAVE_GRUPOS = "dharma-grupos-v2";
const CLAVE_MANUALES = "dharma-manuales-v8";
const CLAVE_ORDEN_CLASES = "dharma-orden-clases-v1";
const CLAVE_HORARIOS = "dharma-horarios-v1";
const CLAVE_EVENTOS = "dharma-eventos-v1";
const CLAVE_SOCIOS = "dharma-socios-v1";
const CLAVE_SEED_APLICADO = "dharma-seed-personas-aplicado-v1";
const CLAVE_CONFIG = "dharma-config-v1";
const GRUPOS_DEFAULT = [
  { id: "g_grupales", nombre: "Grupales" },
  { id: "g_personalizados", nombre: "Personalizados" },
  { id: "g_juveniles", nombre: "Juveniles" }
];
const SECCIONES_DEFAULT = [
  { id: "s_grupales", nombre: "Grupales adultos" },
  { id: "s_infantiles", nombre: "Infantiles y juveniles" },
  { id: "s_plantillas", nombre: "Plantillas personalizados" },
  { id: "s_protocolos", nombre: "Protocolos" },
  { id: "s_agua", nombre: "Agua y respiración" },
  { id: "s_especiales", nombre: "Clases especiales" }
];
const DEFAULT_SECCION_DE = {
  fyp_mardelplata: "s_grupales", fyp_tamarindo: "s_grupales", fyp_pipa: "s_grupales",
  mus_nuevayork: "s_grupales", mus_buenosaires: "s_grupales", mus_roma: "s_grupales",
  esp_competencias: "s_especiales"
};
const DEFAULT_SUBSECCION_DE = {
  fyp_mardelplata: "Fuerza y Potencia", fyp_tamarindo: "Fuerza y Potencia", fyp_pipa: "Fuerza y Potencia",
  mus_nuevayork: "Musculación", mus_buenosaires: "Musculación", mus_roma: "Musculación"
};
const cargar = (clave, fallback) => { try { const v = localStorage.getItem(clave); if (v) return JSON.parse(v); } catch (e) {} return fallback; };
// ---- auditoría simple: quién hizo qué a personas/membresías, para poder diagnosticar
// sin depender de reconstruir manualmente qué pasó. Se guarda como cualquier otra clave
// "dharma-" (sincroniza sola) y se recorta a las últimas 200 entradas.
const AUD_CLAVE = "dharma-auditoria-v1";
function auditar(accion, detalle, quien) {
  try {
    const actual = JSON.parse(localStorage.getItem(AUD_CLAVE) || "[]");
    const entrada = { id: "a" + Date.now() + Math.random().toString(36).slice(2, 6), accion, detalle, quien: quien || "admin", fecha: new Date().toISOString() };
    const next = [entrada, ...actual].slice(0, 200);
    localStorage.setItem(AUD_CLAVE, JSON.stringify(next));
  } catch (e) {}
}
window.dharmaAuditar = auditar;

/* Red de seguridad: si algo rompe el render del panel de Admin/Coach (por ejemplo,
   una clase con datos mal formados en la proyección semanal), mostrar un aviso con
   opción de recargar en vez de dejar la pantalla en blanco o "cerrada". */
class AdminErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch(err) { try { console.error("AdminApp crash:", err); } catch (e) {} }
  render() {
    if (this.state.error) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", gap: 16, padding: 24, textAlign: "center" }}>
          <h2 style={{ margin: 0 }}>Algo salió mal en esta pantalla</h2>
          <p style={{ margin: 0, color: "var(--ink-3)", maxWidth: 420 }}>No se perdió ningún dato — solo esta vista dejó de responder. Recargá para volver a intentar.</p>
          <button className="btn-primario" onClick={() => window.location.reload()}>Recargar</button>
        </div>
      );
    }
    return this.props.children;
  }
}
function AdminApp(props) {
  return <AdminErrorBoundary><AdminAppInterna {...props}></AdminAppInterna></AdminErrorBoundary>;
}
function AdminAppInterna({ modoCoach, coachActual, onSalirRol }) {
  const datos = window.DHARMA_DATA;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // ---- personas en estado persistente ----
  const [personas, setPersonasRaw] = React.useState(() => {
    let base = datos.personas;
    let huboCache = false;
    try {
      const guardado = localStorage.getItem(CLAVE_PERSONAS);
      if (guardado) { base = JSON.parse(guardado); huboCache = true; }
    } catch (e) {}
    // La foto base incluida en el archivo (data.js) solo se usa para completar altas la
    // PRIMERA vez que este centro corre la app. Una vez hecho eso una sola vez (en cualquier
    // dispositivo — el flag se sincroniza a todos), nunca se vuelve a mezclar: así un
    // caché local vacío por casualidad (celular, navegador que borró datos) no reinyecta
    // clientes viejos/borrados mezclados con la lista real y termina pisando lo real al guardar.
    let semillaYaAplicada = false;
    try { semillaYaAplicada = !!localStorage.getItem(CLAVE_SEED_APLICADO); } catch (e) {}
    if (semillaYaAplicada) return huboCache ? base : [];
    // migración: completar proceso de ejemplo en personas base que aún no lo tengan
    const porId = {};
    datos.personas.forEach((p) => { porId[p.id] = p; });
    const migradas = base.map((p) => {
      const b = porId[p.id];
      let next = p;
      if ((!p.proceso || !p.proceso.sesiones) && b && b.proceso) next = { ...next, proceso: b.proceso };
      if (next.grupo === undefined && b && b.grupo) next = { ...next, grupo: b.grupo };
      if ((!next.wellness || next.wellness.length === 0) && b && b.wellness) next = { ...next, wellness: b.wellness };
      return next;
    });
    // sumar personas nuevas de data.js (ids que aún no están en lo cacheado) — así las altas
    // masivas (ej. importaciones de un formulario) no quedan invisibles para quien ya usó la app.
    // pero nunca resucitar algo que el admin eliminó a propósito (tumba de borrados).
    let borrados = new Set();
    try { borrados = new Set(JSON.parse(localStorage.getItem("dharma-personas-borradas-v1") || "[]")); } catch (e) {}
    const idsExistentes = new Set(migradas.map((p) => p.id));
    const nuevasDeBase = datos.personas.filter((p) => !idsExistentes.has(p.id) && !borrados.has(p.id));
    try { localStorage.setItem(CLAVE_SEED_APLICADO, "1"); } catch (e) {}
    return nuevasDeBase.length ? [...migradas, ...nuevasDeBase] : migradas;
  });
  const guardarPersonas = (next) => {
    setPersonasRaw(next);
    try { localStorage.setItem(CLAVE_PERSONAS, JSON.stringify(next)); } catch (e) {}
  };
  // registra ids eliminados para que nunca vuelvan a aparecer, ni siquiera si siguen en data.js
  const marcarBorrados = (ids) => {
    try {
      const actuales = new Set(JSON.parse(localStorage.getItem("dharma-personas-borradas-v1") || "[]"));
      ids.forEach((id) => actuales.add(id));
      localStorage.setItem("dharma-personas-borradas-v1", JSON.stringify([...actuales]));
    } catch (e) {}
  };
  // si el merge inicial sumó personas nuevas de data.js, las persistimos ya mismo
  // (si no, quedarían solo en memoria hasta el primer guardado manual).
  React.useEffect(() => {
    try { localStorage.setItem(CLAVE_PERSONAS, JSON.stringify(personas)); } catch (e) {}
    // eslint-disable-next-line
  }, []);
  const upsertPersona = (persona) => {
    const existe = personas.some((p) => p.id === persona.id);
    guardarPersonas(existe ? personas.map((p) => (p.id === persona.id ? persona : p)) : [persona, ...personas]);
  };
  const setProceso = (id, proceso) => {
    guardarPersonas(personas.map((p) => (p.id === id ? { ...p, proceso } : p)));
  };

  // ---- grupos de alumnos ----
  const [grupos, setGruposRaw] = React.useState(() => cargar(CLAVE_GRUPOS, GRUPOS_DEFAULT));
  const guardarGrupos = (next) => { setGruposRaw(next); try { localStorage.setItem(CLAVE_GRUPOS, JSON.stringify(next)); } catch (e) {} };
  const nuevoGrupo = (nombre) => { const g = { id: "g" + Date.now(), nombre }; guardarGrupos([...grupos, g]); return g.id; };
  const renombrarGrupo = (id, nombre) => guardarGrupos(grupos.map((g) => (g.id === id ? { ...g, nombre } : g)));
  const eliminarGrupo = (id) => {
    guardarGrupos(grupos.filter((g) => g.id !== id));
    guardarPersonas(personas.map((p) => (p.grupo === id ? { ...p, grupo: null } : p)));
  };
  const asignarGrupo = (personaId, grupoId) => guardarPersonas(personas.map((p) => (p.id === personaId ? { ...p, grupo: grupoId } : p)));

  // ---- Alumnos: membresías (socios), planes editables y config ----
  const [planes, setPlanesRaw] = React.useState(() => cargar("dharma-planes-v1", datos.planes || []));
  const guardarPlanes = (next) => { setPlanesRaw(next); try { localStorage.setItem("dharma-planes-v1", JSON.stringify(next)); } catch (e) {} };
  const [infoAlumno, setInfoAlumnoRaw] = React.useState(() => cargar("dharma-info-v1", datos.info || {}));
  const guardarInfoAlumno = (next) => { setInfoAlumnoRaw(next); try { localStorage.setItem("dharma-info-v1", JSON.stringify(next)); } catch (e) {} };
  const [socios, setSociosRaw] = React.useState(() => {
    const guardado = cargar(CLAVE_SOCIOS, null);
    const semilla = window.DHARMA_DATA.socios || {};
    if (guardado === null) return semilla;
    // migración EVO: sumá al localStorage ya existente cualquier socio de la semilla que todavía no esté ahí
    // (una sola vez — no pisa ediciones manuales de socios que ya tengan ese id).
    try {
      if (!localStorage.getItem("dharma-migracion-evo-v1")) {
        const merged = { ...semilla, ...guardado };
        localStorage.setItem(CLAVE_SOCIOS, JSON.stringify(merged));
        localStorage.setItem("dharma-migracion-evo-v1", "1");
        return merged;
      }
    } catch (e) {}
    return guardado;
  });
  React.useEffect(() => {
    if (!window.Membresia) return;
    try {
      if (!localStorage.getItem("dharma-dedup-evo-v1")) {
        const norm = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z ]/g, "").trim().replace(/\s+/g, " ");
        const evoPersonas = personas.filter((p) => p.id.startsWith("p_evo_"));
        const otras = personas.filter((p) => !p.id.startsWith("p_evo_"));
        const otrasPorNombre = {};
        otras.forEach((p) => { const k = norm(p.nombre); (otrasPorNombre[k] = otrasPorNombre[k] || []).push(p); });
        const remap = {}; const dupIds = new Set();
        evoPersonas.forEach((ep) => {
          const k = norm(ep.nombre);
          const matches = otrasPorNombre[k];
          if (matches && matches.length) { remap[ep.id] = matches[0].id; dupIds.add(ep.id); }
        });
        if (dupIds.size > 0) {
          const personasNext = personas.filter((p) => !dupIds.has(p.id));
          let sociosNext = { ...socios };
          Object.entries(remap).forEach(([evoId, existingId]) => {
            if (sociosNext[evoId]) { sociosNext[existingId] = sociosNext[evoId]; delete sociosNext[evoId]; }
          });
          setPersonasRaw(personasNext);
          setSociosRaw(sociosNext);
          try {
            localStorage.setItem(CLAVE_PERSONAS, JSON.stringify(personasNext));
            localStorage.setItem(CLAVE_SOCIOS, JSON.stringify(sociosNext));
          } catch (e) {}
        }
        localStorage.setItem("dharma-dedup-evo-v1", "1");
      }
    } catch (e) {}
    try {
      if (!localStorage.getItem("dharma-migracion-grupo-evo-v2")) {
        const REMAP_PLANID = { evo_ilimitado: "gril", evo_plus12: "gr12", evo_estandar8: "gr8" };
        const planesPorId = {}; (window.DHARMA_DATA.planes || []).forEach((pl) => { planesPorId[pl.id] = pl; });
        // repara socios que hayan quedado con el planId viejo de la primera migración (antes del remapeo a planes reales)
        let sociosFix = socios;
        let huboFix = false;
        Object.keys(sociosFix).forEach((pid) => {
          const s = sociosFix[pid];
          if (s && REMAP_PLANID[s.planId]) { sociosFix = { ...sociosFix, [pid]: { ...s, planId: REMAP_PLANID[s.planId] } }; huboFix = true; }
        });
        if (huboFix) { setSociosRaw(sociosFix); try { localStorage.setItem(CLAVE_SOCIOS, JSON.stringify(sociosFix)); } catch (e) {} }
        const next = personas.map((p) => {
          if (!p.id.startsWith("p_evo_")) return p;
          const sub = sociosFix[p.id];
          const plan = sub && planesPorId[sub.planId];
          const esGrupal = plan && plan.categoria === "Grupales";
          return { ...p, grupo: esGrupal ? "g_grupales" : "g_personalizados" };
        });
        setPersonasRaw(next);
        try { localStorage.setItem(CLAVE_PERSONAS, JSON.stringify(next)); } catch (e) {}
        localStorage.setItem("dharma-migracion-grupo-evo-v2", "1");
      }
    } catch (e) {}
    const resuelto = window.Membresia.aplicarCongelamientosVencidos(socios);
    if (resuelto !== socios) { setSociosRaw(resuelto); try { localStorage.setItem(CLAVE_SOCIOS, JSON.stringify(resuelto)); } catch (e) {} }
  }, []);
  // Blindaje anti-carrera: relee siempre la copia más fresca de socios de localStorage
  // antes de escribir un cambio de admin (renovar plan, congelar, etc.) — evita perder
  // un cambio que llegó de otro dispositivo mientras esta pantalla ya estaba abierta.
  const guardarSocio = (personaId, sub) => {
    const frescos = (() => { try { return JSON.parse(localStorage.getItem(CLAVE_SOCIOS)) || {}; } catch (e) { return socios; } })();
    const next = { ...frescos, [personaId]: sub };
    setSociosRaw(next);
    try { localStorage.setItem(CLAVE_SOCIOS, JSON.stringify(next)); } catch (e) {}
    window.Renovaciones && window.Renovaciones.quitar(personaId);
  };
  const [configSocios, setConfigSociosRaw] = React.useState(() => cargar(CLAVE_CONFIG, { antelacionCancelacion: 120 }));
  const guardarConfigSocios = (next) => { setConfigSociosRaw(next); try { localStorage.setItem(CLAVE_CONFIG, JSON.stringify(next)); } catch (e) {} };
  const toggleActivoPersona = (personaId, activo) => guardarPersonas(personas.map((p) => (p.id === personaId ? { ...p, activo } : p)));
  const _quienSoy = () => (modoCoach ? ("coach: " + (coachActual || "?")) : "admin");
  const eliminarPersona = (personaId) => {
    const p = personas.find((x) => x.id === personaId);
    guardarPersonas(personas.filter((p) => p.id !== personaId));
    marcarBorrados([personaId]);
    const s = { ...socios }; delete s[personaId]; setSociosRaw(s); try { localStorage.setItem(CLAVE_SOCIOS, JSON.stringify(s)); } catch (e) {}
    auditar("Baja de persona", (p ? p.nombre : personaId), _quienSoy());
  };
  const eliminarPersonasMasivo = (ids) => {
    const idSet = new Set(ids);
    const nombres = personas.filter((p) => idSet.has(p.id)).map((p) => p.nombre);
    guardarPersonas(personas.filter((p) => !idSet.has(p.id)));
    marcarBorrados(ids);
    const s = { ...socios }; idSet.forEach((id) => delete s[id]); setSociosRaw(s); try { localStorage.setItem(CLAVE_SOCIOS, JSON.stringify(s)); } catch (e) {}
    auditar("Baja masiva de personas", nombres.join(", "), _quienSoy());
  };

  // ---- biblioteca: secciones + clases custom + asignación ----
  // Merge no destructivo: suma las secciones default que falten (por id) a las guardadas,
  // sin pisar renombres ni orden del usuario. Así una carpeta nueva (p.ej. "Clases especiales")
  // aparece aunque el dispositivo ya tenga secciones cacheadas en localStorage.
  const [secciones, setSeccionesRaw] = React.useState(() => {
    const guardadas = cargar(CLAVE_SECCIONES, SECCIONES_DEFAULT);
    const ids = new Set(guardadas.map((s) => s.id));
    const faltantes = SECCIONES_DEFAULT.filter((s) => !ids.has(s.id));
    return faltantes.length ? [...guardadas, ...faltantes] : guardadas;
  });
  const [clasesCustom, setClasesCustomRaw] = React.useState(() => cargar(CLAVE_CLASES_CUSTOM, (window.DHARMA_TABLET && window.DHARMA_TABLET.clasesCustom) || []));
  const [clasesOcultas, setClasesOcultasRaw] = React.useState(() => cargar(CLAVE_CLASES_OCULTAS, (window.DHARMA_TABLET && window.DHARMA_TABLET.clasesOcultas) || []));
  const guardarClasesOcultas = (next) => { setClasesOcultasRaw(next); try { localStorage.setItem(CLAVE_CLASES_OCULTAS, JSON.stringify(next)); } catch (e) {} };
  const [asignacion, setAsignacionRaw] = React.useState(() => cargar(CLAVE_ASIGNACION, {}));
  const [editorClase, setEditorClase] = React.useState(null); // {modo, clase}
  const [editorManual, setEditorManual] = React.useState(null); // {modo, manual}
  // manuales de Estudio: null = aún no tocado → sembrar desde data.js
  const [manualesCustom, setManualesCustomRaw] = React.useState(() => cargar(CLAVE_MANUALES, null));
  const [biblioNav, setBiblioNav] = React.useState({ tipo: "root" }); // navegación drill-down de la biblioteca
  const [ordenClases, setOrdenClasesRaw] = React.useState(() => cargar(CLAVE_ORDEN_CLASES, {}));
  const guardarOrdenClases = (next) => { setOrdenClasesRaw(next); try { localStorage.setItem(CLAVE_ORDEN_CLASES, JSON.stringify(next)); } catch (e) {} };
  const reordenarClases = (idsEnOrden) => {
    const next = { ...ordenClases };
    idsEnOrden.forEach((id, i) => { next[id] = i; });
    guardarOrdenClases(next);
  };

  const guardarSecciones = (next) => { setSeccionesRaw(next); try { localStorage.setItem(CLAVE_SECCIONES, JSON.stringify(next)); } catch (e) {} };
  const guardarClasesCustom = (next) => { setClasesCustomRaw(next); try { localStorage.setItem(CLAVE_CLASES_CUSTOM, JSON.stringify(next)); } catch (e) {} };
  const guardarAsignacion = (next) => { setAsignacionRaw(next); try { localStorage.setItem(CLAVE_ASIGNACION, JSON.stringify(next)); } catch (e) {} };

  // ---- clases visibles para alumnos ----
  const [clasesVisibles, setClasesVisiblesRaw] = React.useState(() => cargar(CLAVE_VISIBLES, []));
  const guardarVisibles = (next) => { setClasesVisiblesRaw(next); try { localStorage.setItem(CLAVE_VISIBLES, JSON.stringify(next)); } catch (e) {} };
  const toggleVisible = (claseId) => {
    guardarVisibles(clasesVisibles.includes(claseId) ? clasesVisibles.filter((x) => x !== claseId) : [...clasesVisibles, claseId]);
  };

  // cada clase = un solo entrenamiento: expandimos clases base con varias sesiones en clases sueltas
  const expandir = (lista) => {
    const out = [];
    lista.forEach((c) => {
      const ses = c.sesiones || [];
      if (ses.length <= 1) { out.push(c); return; }
      ses.forEach((s, i) => out.push({
        ...c,
        id: i === 0 ? c.id : c.id + "__s" + i,
        __origen: c.id,
        nombre: s.nombre || (c.nombre + " " + (i + 1)),
        sesiones: [s]
      }));
    });
    return out;
  };
  // las clases custom con el mismo id que una de fábrica la sobrescriben (override al editar)
  const idsCustom = new Set(clasesCustom.map((c) => c.id));
  const baseVisibles = datos.clases.filter((c) => !idsCustom.has(c.id) && !clasesOcultas.includes(c.id));
  const todasClases = expandir([...baseVisibles, ...clasesCustom]);
  const baseDe = (c) => c.__origen || c.id;
  const getSeccionDe = (c) => asignacion[c.id] || asignacion[baseDe(c)] || DEFAULT_SECCION_DE[baseDe(c)] || c.seccion || (secciones[0] && secciones[0].id);
  React.useEffect(() => { window.__getSeccion = getSeccionDe; });

  // ---- sub-secciones (gestionadas + asignación persistente para TODA clase) ----
  const [subseccionesManual, setSubManualRaw] = React.useState(() => cargar(CLAVE_SUBSECCIONES, (window.DHARMA_TABLET && window.DHARMA_TABLET.subsecciones) || []));
  const guardarSubManual = (next) => { setSubManualRaw(next); try { localStorage.setItem(CLAVE_SUBSECCIONES, JSON.stringify(next)); } catch (e) {} };
  const nuevaSubseccion = (seccion, nombre) => {
    const n = (nombre || "").trim();
    if (!n) return;
    if (subseccionesManual.some((s) => s.seccion === seccion && s.nombre.toLowerCase() === n.toLowerCase())) return;
    guardarSubManual([...subseccionesManual, { id: "sub" + Date.now(), seccion, nombre: n }]);
    window.dharmaToast && window.dharmaToast("Sub-sección creada", "ok");
  };

  // override de sub-sección por clase (incluye clases base) + normalización inicial anti-duplicados
  const [subasignacion, setSubasignacionRaw] = React.useState(() => cargar(CLAVE_SUBASIGNACION, {}));
  const guardarSubasignacion = (next) => { setSubasignacionRaw(next); try { localStorage.setItem(CLAVE_SUBASIGNACION, JSON.stringify(next)); } catch (e) {} };
  React.useEffect(() => { try { if (!localStorage.getItem(CLAVE_SUBASIGNACION)) localStorage.setItem(CLAVE_SUBASIGNACION, JSON.stringify(subasignacion)); } catch (e) {} }, []);
  const getSubseccionDe = (c) => { const v = subasignacion[c.id]; return (v && v.trim()) ? v : ((c.subseccion || "").trim() || DEFAULT_SUBSECCION_DE[baseDe(c)] || ""); };
  const moverSubseccion = (claseId, sub) => { guardarSubasignacion({ ...subasignacion, [claseId]: sub }); window.dharmaToast && window.dharmaToast("Clase movida", "info"); };

  const renombrarSubseccion = (seccionId, viejo, nuevo) => {
    const n = (nuevo || "").trim();
    if (!n || n === viejo) return;
    // actualizar la sub-sección gestionada
    guardarSubManual(subseccionesManual.map((s) => (s.seccion === seccionId && s.nombre === viejo ? { ...s, nombre: n } : s)));
    // reasignar todas las clases de esa sección que estén en la sub-sección vieja
    const next = { ...subasignacion };
    todasClases.forEach((c) => { if (getSeccionDe(c) === seccionId && getSubseccionDe(c) === viejo) next[c.id] = n; });
    guardarSubasignacion(next);
    window.dharmaToast && window.dharmaToast("Sub-sección renombrada", "ok");
  };
  const eliminarSubseccion = (seccionId, nombre) => {
    // quitar de gestionadas
    guardarSubManual(subseccionesManual.filter((s) => !(s.seccion === seccionId && s.nombre === nombre)));
    // mover sus clases a "sin sub-sección"
    const next = { ...subasignacion };
    todasClases.forEach((c) => { if (getSeccionDe(c) === seccionId && getSubseccionDe(c) === nombre) next[c.id] = ""; });
    guardarSubasignacion(next);
    window.dharmaToast && window.dharmaToast("Sub-sección eliminada", "borrado");
  };

  // lista para selectores: gestionadas + en uso (por override o por la clase)
  const subseccionesList = [
    ...subseccionesManual,
    ...todasClases.filter((c) => getSubseccionDe(c)).map((c) => ({ seccion: getSeccionDe(c), nombre: getSubseccionDe(c) }))
  ];

  const nuevaSeccion = (nombre) => { guardarSecciones([...secciones, { id: "sec" + Date.now(), nombre }]); window.dharmaToast && window.dharmaToast("Sección creada", "ok"); };
  const renombrarSeccion = (id, nombre) => { guardarSecciones(secciones.map((s) => (s.id === id ? { ...s, nombre } : s))); window.dharmaToast && window.dharmaToast("Sección renombrada", "ok"); };
  const eliminarSeccion = (id) => {
    const destino = secciones.find((s) => s.id !== id);
    if (!destino) return;
    const nuevaAsig = { ...asignacion };
    todasClases.forEach((c) => { if (getSeccionDe(c) === id) nuevaAsig[c.id] = destino.id; });
    guardarAsignacion(nuevaAsig);
    guardarSecciones(secciones.filter((s) => s.id !== id));
    window.dharmaToast && window.dharmaToast("Sección eliminada", "borrado");
  };
  const moverClase = (claseId, seccionId) => { guardarAsignacion({ ...asignacion, [claseId]: seccionId }); window.dharmaToast && window.dharmaToast("Clase movida", "info"); };
  const nuevaClaseEn = (seccionId, subseccion) => { setEditorClase({ modo: "nuevo", clase: nuevaClaseVacia(seccionId, subseccion) }); };
  const editarClase = (claseId) => {
    const base = clasesCustom.find((x) => x.id === claseId) || datos.clases.find((x) => x.id === claseId);
    if (!base) return;
    const c = JSON.parse(JSON.stringify(base));
    const ref = todasClases.find((x) => x.id === claseId) || base;
    c.seccion = getSeccionDe(ref);
    c.subseccion = getSubseccionDe(ref);
    setEditorClase({ modo: "editar", clase: c });
  };
  const eliminarClase = (claseId) => {
    const c = todasClases.find((x) => x.id === claseId);
    guardarClasesCustom(clasesCustom.filter((c) => c.id !== claseId));
    // si es de fábrica, la ocultamos para que no reaparezca al re-sembrar
    if (datos.clases.some((x) => x.id === claseId) && !clasesOcultas.includes(claseId)) guardarClasesOcultas([...clasesOcultas, claseId]);
    const a = { ...asignacion }; delete a[claseId]; guardarAsignacion(a);
    window.dharmaToast && window.dharmaToast("Clase eliminada" + (c ? ": " + c.nombre : ""), "borrado");
  };
  const duplicarClase = (claseId) => {
    const orig = todasClases.find((x) => x.id === claseId);
    if (!orig) return;
    const copia = JSON.parse(JSON.stringify(orig));
    copia.id = "clase" + Date.now();
    copia.nombre = (orig.nombre || "Clase") + " (copia)";
    copia.custom = true;
    const sec = getSeccionDe(orig);
    const sub = getSubseccionDe(orig);
    copia.seccion = sec;
    copia.subseccion = sub;
    guardarClasesCustom([...clasesCustom, copia]);
    guardarAsignacion({ ...asignacion, [copia.id]: sec });
    guardarSubasignacion({ ...subasignacion, [copia.id]: sub });
    window.dharmaToast && window.dharmaToast("Clase duplicada", "ok");
  };
  // ---- ESTUDIO: manuales ----
  const estudioCategorias = datos.estudioCategorias || [];
  const manuales = manualesCustom == null ? (datos.manuales || []) : (function () {
    const ids = new Set(manualesCustom.map((m) => m.id));
    return [...manualesCustom, ...((datos.manuales || []).filter((m) => !ids.has(m.id)))];
  })();
  const guardarManuales = (next) => { setManualesCustomRaw(next); try { localStorage.setItem(CLAVE_MANUALES, JSON.stringify(next)); } catch (e) {} };
  const nuevoManual = () => setEditorManual({ modo: "nuevo", manual: manualVacio(estudioCategorias[0] && estudioCategorias[0].id) });
  const editarManual = (id) => { const m = manuales.find((x) => x.id === id); if (m) setEditorManual({ modo: "editar", manual: m }); };
  const eliminarManual = (id) => {
    const m = manuales.find((x) => x.id === id);
    guardarManuales(manuales.filter((x) => x.id !== id));
    if (vista.tipo === "manual" && vista.id === id) setVista({ tipo: "estudio" });
    window.dharmaToast && window.dharmaToast("Manual eliminado" + (m ? ": " + m.titulo : ""), "borrado");
  };
  const guardarManual = (manual) => {
    const existe = manuales.some((m) => m.id === manual.id);
    guardarManuales(existe ? manuales.map((m) => (m.id === manual.id ? manual : m)) : [...manuales, manual]);
    setEditorManual(null);
    setVista({ tipo: "manual", id: manual.id });
    window.dharmaToast && window.dharmaToast(existe ? "Cambios guardados" : "Manual creado", "ok");
  };

  // ---- Planificador: crear clases reales desde un tablero ----
  const enviarClasesPlan = (clasesSimples, seccionId, subseccion) => {
    const nuevas = clasesSimples.map((c) => ({ ...c, seccion: seccionId, subseccion: subseccion || "" }));
    guardarClasesCustom([...clasesCustom, ...nuevas]);
    const asig = { ...asignacion }; const subasig = { ...subasignacion };
    nuevas.forEach((c) => { asig[c.id] = seccionId; subasig[c.id] = subseccion || ""; });
    guardarAsignacion(asig); guardarSubasignacion(subasig);
    window.dharmaToast && window.dharmaToast(nuevas.length + (nuevas.length === 1 ? " clase creada en la Biblioteca" : " clases creadas en la Biblioteca"), "ok");
    setVista({ tipo: "biblioteca" });
  };

  const guardarClase = (clase) => {
    // Blindaje anti-carrera: relee la lista más fresca de localStorage antes de fusionar
    // este cambio — evita que un remount tardío o un cambio de otro dispositivo mientras
    // el editor estaba abierto termine pisado por la copia vieja que quedó en memoria.
    const frescas = cargar(CLAVE_CLASES_CUSTOM, clasesCustom);
    const existe = frescas.some((c) => c.id === clase.id);
    guardarClasesCustom(existe ? frescas.map((c) => (c.id === clase.id ? clase : c)) : [...frescas, clase]);
    guardarAsignacion({ ...asignacion, [clase.id]: clase.seccion });
    guardarSubasignacion({ ...subasignacion, [clase.id]: (clase.subseccion || "").trim() });
    setEditorClase(null);
    setVista({ tipo: "clase", id: clase.id, sesion: 0 });
    window.dharmaToast && window.dharmaToast(existe ? "Cambios guardados" : "Clase creada", "ok");
  };

  // ---- navegación ----
  const [vista, setVistaRaw] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("dharma-vista")) || { tipo: "dashboard" }; }
    catch (e) { return { tipo: "dashboard" }; }
  });
  const setVista = (v) => {
    setVistaRaw(v);
    try { localStorage.setItem("dharma-vista", JSON.stringify(v)); } catch (e) {}
  };
  // Si un coach hereda una vista restringida guardada por el admin en el mismo
  // dispositivo (Ejercicios/Estudio/Planificador), lo mandamos al inicio sin permitirlo.
  React.useEffect(() => {
    if (modoCoach && ["planificador", "economia"].includes(vista.tipo)) setVista({ tipo: "dashboard" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [perfilAbierto, setPerfilAbierto] = React.useState(null); // slide-over rápido
  const [formPersona, setFormPersona] = React.useState(null); // {modo:'nuevo'} | {modo:'editar', persona}
  const [pizarra, setPizarra] = React.useState(false); // clase
  const [pizarraLibre, setPizarraLibre] = React.useState(null); // {titulo, sesion}
  // Blindaje: mientras la pizarra está proyectada, avisamos a la raíz de la app para que
  // NO fuerce un remount total si llega una sincronización de otro dispositivo (muy
  // frecuente durante una clase, porque los alumnos están reservando en vivo) — antes
  // eso cerraba la pizarra sola a los pocos minutos, en medio de la clase.
  React.useEffect(() => {
    const hayPizarra = !!(pizarra || pizarraLibre);
    if (!hayPizarra) return;
    window.__dharmaEditorAbierto = (window.__dharmaEditorAbierto || 0) + 1;
    return () => {
      window.__dharmaEditorAbierto = Math.max(0, (window.__dharmaEditorAbierto || 1) - 1);
      if (window.__dharmaEditorAbierto === 0) { try { window.dispatchEvent(new Event("dharma-editor-cerrado")); } catch (e) {} }
    };
  }, [pizarra, pizarraLibre]);
  const [charlaManual, setCharlaManual] = React.useState(null); // manual id en modo charla
  React.useEffect(() => {
    if (!charlaManual) return;
    window.__dharmaEditorAbierto = (window.__dharmaEditorAbierto || 0) + 1;
    return () => {
      window.__dharmaEditorAbierto = Math.max(0, (window.__dharmaEditorAbierto || 1) - 1);
      if (window.__dharmaEditorAbierto === 0) { try { window.dispatchEvent(new Event("dharma-editor-cerrado")); } catch (e) {} }
    };
  }, [charlaManual]);
  const [busqueda, setBusqueda] = React.useState("");

  const acentoClaro = ACENTOS[t.acento] || "#6EC5D1";
  const estiloRaiz = { "--acento": t.acento, "--acento-claro": acentoClaro };

  const claseActiva = vista.tipo === "clase" ? todasClases.find((c) => c.id === vista.id) : null;
  const personaActiva = vista.tipo === "persona" ? personas.find((p) => p.id === vista.id) : null;
  const personaPerfil = perfilAbierto ? personas.find((p) => p.id === perfilAbierto) : null;

  const irAClase = (id) => {
    setPerfilAbierto(null); setPizarra(false); setPizarraLibre(null);
    setVista({ tipo: "clase", id, sesion: 0 });
  };
  const irAPersona = (id) => {
    setPerfilAbierto(null);
    setVista({ tipo: "persona", id, tab: "perfil" });
  };
  const navItemsFiltrados = modoCoach ? NAV_ITEMS.filter((it) => !["planificador", "economia", "coaches"].includes(it.tipo)) : NAV_ITEMS.filter((it) => !it.soloCoach);

  // ---- notificaciones: clases de hoy (coach) + solicitudes de plan pendientes (admin) ----
  const [eventosCal] = React.useState(() => cargar("dharma-calendario-v1", []));
  const { items: itemsClasesHoy } = window.notifsClasesHoy ? window.notifsClasesHoy(Array.isArray(eventosCal) ? eventosCal : (eventosCal.eventos || [])) : { items: [] };
  const { items: itemsPendientes, pend: solicPlan, renovPend: solicRenov } = window.notifsPendientesAdmin ? window.notifsPendientesAdmin(personas, planes, socios) : { items: [], pend: [], renovPend: [] };
  const { items: itemsMemb } = window.notifsMembresiasAdmin ? window.notifsMembresiasAdmin(personas, planes, socios) : { items: [] };

  const aprobarSolicitud = (p) => {
    const subAct = socios[p.id];
    const plan = subAct && planes.some((x) => x.id === subAct.planId) ? planes.find((x) => x.id === subAct.planId) : planes.find((x) => x.id === p.planSolicitado);
    if (!plan || !window.Membresia) return;
    const inicio = window.Membresia.hoyISO();
    const sub = {
      planId: plan.id, inicio, vencimiento: window.Membresia.sumarDias(inicio, plan.dias),
      creditos: plan.tipo === "ilimitada" ? null : plan.creditos,
      pagos: [...((subAct && subAct.pagos) || []), { fecha: inicio, monto: plan.precio || 0, metodo: "—", concepto: plan.nombre }]
    };
    guardarSocio(p.id, sub);
    auditar("Plan confirmado", p.nombre + " → " + plan.nombre, _quienSoy());
    window.dharmaToast && window.dharmaToast(plan.nombre + " activado para " + p.nombre.split(" ")[0], "ok");
  };
  const { items: itemsBackup } = window.notifsBackupAdmin ? window.notifsBackupAdmin() : { items: [] };
  const adminNotifItems = modoCoach ? itemsClasesHoy : [...itemsPendientes, ...itemsMemb, ...itemsClasesHoy, ...itemsBackup];
  React.useEffect(() => {
    itemsPendientes.forEach((n) => window.notifNativa && window.notifNativa("DHARMA", n.texto, n.id));
  }, [itemsPendientes.length]);

  // ---- nav superior: colapsa en "Más ⋯" vía <OverflowNav> (mide anchos reales) ----

  return (
    <div style={estiloRaiz} className="app-shell">
      <Sidebar items={navItemsFiltrados} activo={vista.tipo} onIr={(tipo) => setVista({ tipo })} pie={<BackupBotones compacto={true}></BackupBotones>}></Sidebar>
      <div className="main-area">
      <header className="topbar">
        <div className="brand brand-mobile">
          <img className="brand-isotipo" src={(window.DHARMA_MARCA && window.DHARMA_MARCA.isotipoNegro) || ""} alt=""></img>
          <span className="brand-nombre">DHARMA</span>
          <span className="brand-sub">ENTRENAMIENTO</span>
        </div>
        <div className="topbar-derecha">
          <BuscadorGlobal personas={personas} clases={todasClases} ejercicios={datos.ejercicios || []} onPersona={irAPersona} onClase={irAClase} onEjercicio={() => setVista({ tipo: "ejercicios" })}></BuscadorGlobal>
          <NotifBell items={adminNotifItems} onIr={(n) => { if (["pend", "renov", "membvenc", "membpor"].includes(n.id)) setVista({ tipo: "personas" }); else if (n.id === "clasehoy") setVista({ tipo: "dashboard" }); else if (n.id === "backup" && window.descargarCopia) window.descargarCopia(); }}></NotifBell>
          <SyncEstado></SyncEstado>
          <SyncAlertaCaida></SyncAlertaCaida>
          <div className="solo-movil"><BackupBotones></BackupBotones></div>
          <button className="btn-rol" onClick={onSalirRol} title="Cerrar sesión de este rol">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-2px", marginRight: "6px" }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><path d="M16 17l5-5-5-5"></path><path d="M21 12H9"></path></svg>
            <span className="btn-rol-txt">{modoCoach ? "Salir" + (coachActual ? " (" + coachActual + ")" : " (Coach)") : "Salir"}</span>
          </button>
        </div>
      </header>

      <BottomNav items={navItemsFiltrados} activo={vista.tipo} onIr={(tipo) => setVista({ tipo })}></BottomNav>

      {vista.tipo === "dashboard" ? (
        <Dashboard
          clases={todasClases}
          secciones={secciones}
          personas={personas}
          manuales={manuales}
          ejerciciosCount={(datos.ejercicios || []).length}
          onIr={(tipo) => setVista({ tipo })}
          onAbrirClase={irAClase}
          modoCoach={modoCoach}
          coachActual={coachActual}
          eventosCal={Array.isArray(eventosCal) ? eventosCal : (eventosCal.eventos || [])}
          notifItems={modoCoach ? itemsClasesHoy : [...itemsMemb, ...itemsClasesHoy]}
          onIrNotif={(n) => { if (["pend", "renov", "membvenc", "membpor"].includes(n.id)) setVista({ tipo: "personas" }); }}
          solicitudes={modoCoach ? [] : [
            ...solicPlan.map((p) => ({ p, tipo: "plan", plan: planes.find((x) => x.id === p.planSolicitado) })),
            ...solicRenov.map((p) => ({ p, tipo: "renov", plan: window.Membresia ? window.Membresia.planDe(planes, socios[p.id]) : null }))
          ]}
          onAprobar={aprobarSolicitud}
          onVerPersona={(p) => setVista({ tipo: "persona", id: p.id, tab: "membresia" })}
          onAbrirPersona={irAPersona}
        ></Dashboard>
      ) : null}

      {vista.tipo === "biblioteca" && !editorClase ? (
        <Biblioteca
          clases={todasClases}
          secciones={secciones}
          personas={personas}
          getSeccionDe={getSeccionDe}
          getSubseccionDe={getSubseccionDe}
          subseccionesList={subseccionesList}
          onMoverSubseccion={moverSubseccion}
          onNuevaSubseccion={nuevaSubseccion}
          onRenombrarSubseccion={renombrarSubseccion}
          onEliminarSubseccion={eliminarSubseccion}
          onAbrir={irAClase}
          onNuevaSeccion={nuevaSeccion}
          onRenombrarSeccion={renombrarSeccion}
          onEliminarSeccion={eliminarSeccion}
          onNuevaClase={nuevaClaseEn}
          onMoverClase={moverClase}
          onReordenarClases={reordenarClases}
          ordenClases={ordenClases}
          onDuplicarClase={duplicarClase}
          onEditarClase={editarClase}
          onEliminarClase={eliminarClase}
          clasesVisibles={clasesVisibles}
          onToggleVisible={toggleVisible}
          nav={biblioNav}
          setNav={setBiblioNav}
        ></Biblioteca>
      ) : null}

      {vista.tipo === "calendario" ? (
        <Calendario clases={todasClases} secciones={secciones} personas={personas} planes={planes} socios={socios} onGuardarSocio={guardarSocio} coachActual={coachActual}></Calendario>
      ) : null}

      {vista.tipo === "multi_personalizados" ? (
        <MultiPersonalizados personas={personas} onSalir={() => setVista({ tipo: "personas" })}></MultiPersonalizados>
      ) : null}

      {editorClase ? (
        <ClaseEditor
          clase={editorClase.clase}
          secciones={secciones}
          subsecciones={subseccionesList}
          onNuevaSubseccion={nuevaSubseccion}
          modo={editorClase.modo}
          onGuardar={guardarClase}
          onCancelar={() => setEditorClase(null)}
        ></ClaseEditor>
      ) : null}

      {vista.tipo === "personas" ? (
        <Personas
          personas={personas}
          planes={planes}
          socios={socios}
          onGuardarPersonas={guardarPersonas}
          onGuardarSocio={guardarSocio}
          onGuardarPlanes={guardarPlanes}
          infoAlumno={infoAlumno}
          onGuardarInfoAlumno={guardarInfoAlumno}
          onToggleActivo={toggleActivoPersona}
          onEliminarPersona={eliminarPersona}
          onEliminarPersonasMasivo={eliminarPersonasMasivo}
          config={configSocios}
          onConfig={guardarConfigSocios}
          onMulti={() => setVista({ tipo: "multi_personalizados" })}
          grupos={grupos}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          onAbrirPersona={irAPersona}
          onNuevo={() => setFormPersona({ modo: "nuevo" })}
          onNuevoGrupo={nuevoGrupo}
          onRenombrarGrupo={renombrarGrupo}
          onEliminarGrupo={eliminarGrupo}
          onAsignarGrupo={asignarGrupo}
        ></Personas>
      ) : null}

      {vista.tipo === "estudio" && !editorManual ? (
        <Estudio
          manuales={manuales}
          categorias={estudioCategorias}
          onAbrir={(id) => setVista({ tipo: "manual", id })}
          onNuevo={nuevoManual}
          onEditar={editarManual}
          onEliminar={eliminarManual}
          soloLectura={modoCoach}
        ></Estudio>
      ) : null}

      {vista.tipo === "manual" && !editorManual ? (
        (() => {
          const man = manuales.find((m) => m.id === vista.id);
          return man ? (
            <ManualLector
              manual={man}
              categorias={estudioCategorias}
              onVolver={() => setVista({ tipo: "estudio" })}
              onEditar={modoCoach ? null : editarManual}
              onProyectar={(id) => setCharlaManual(id)}
            ></ManualLector>
          ) : (
            <main className="contenido"><button className="volver" onClick={() => setVista({ tipo: "estudio" })}>← Estudio</button><p className="vacio-bloques">Este manual ya no existe.</p></main>
          );
        })()
      ) : null}

      {editorManual ? (
        <ManualEditor
          manual={editorManual.manual}
          categorias={estudioCategorias}
          modo={editorManual.modo}
          onGuardar={guardarManual}
          onCancelar={() => setEditorManual(null)}
        ></ManualEditor>
      ) : null}

      {vista.tipo === "ejercicios" ? (
        <EjerciciosBiblioteca soloLectura={modoCoach}></EjerciciosBiblioteca>
      ) : null}

      {vista.tipo === "planificador" ? (
        <Planificador
          secciones={secciones}
          subseccionesList={subseccionesList}
          onEnviarClases={enviarClasesPlan}
        ></Planificador>
      ) : null}

      {vista.tipo === "herramientas" ? (
        <Herramientas
          personas={personas}
          tab={vista.tabH || "cronometro"}
          onTab={(tabH) => setVista({ tipo: "herramientas", tabH })}
        ></Herramientas>
      ) : null}

      {vista.tipo === "economia" && !modoCoach ? (
        <EconomiaVista personas={personas} socios={socios}></EconomiaVista>
      ) : null}

      {vista.tipo === "mishoras" && modoCoach ? (
        <window.MisHorasCoach eventosCal={Array.isArray(eventosCal) ? eventosCal : (eventosCal.eventos || [])} coachActual={coachActual}></window.MisHorasCoach>
      ) : null}

      {vista.tipo === "coaches" && !modoCoach ? (
        <CoachesAdmin eventosCal={Array.isArray(eventosCal) ? eventosCal : (eventosCal.eventos || [])}></CoachesAdmin>
      ) : null}

      {personaActiva ? (
        <PersonaDetalle
          persona={personaActiva}
          clases={datos.clases}
          secciones={secciones}
          getSeccionDe={getSeccionDe}
          tab={vista.tab || "perfil"}
          onTab={(tab) => setVista({ ...vista, tab })}
          onVolver={() => setVista({ tipo: "personas" })}
          onEditar={() => setFormPersona({ modo: "editar", persona: personaActiva })}
          onIrAClase={irAClase}
          onGuardarProceso={(r) => setProceso(personaActiva.id, r)}
          onGuardarPersona={upsertPersona}
          onProyectar={(payload) => setPizarraLibre(payload)}
          planes={planes}
          sub={socios[personaActiva.id]}
          onGuardarSocio={guardarSocio}
          onToggleActivo={toggleActivoPersona}
          onEliminarPersona={eliminarPersona}
        ></PersonaDetalle>
      ) : null}

      {claseActiva ? (
        <DetalleClase
          clase={claseActiva}
          personas={personas}
          sesionIdx={vista.sesion || 0}
          onSesion={(i) => setVista({ ...vista, sesion: i })}
          onVolver={() => setVista({ tipo: "biblioteca" })}
          onAbrirPerfil={setPerfilAbierto}
          onProyectar={() => setPizarra(true)}
          onEditar={() => editarClase(claseActiva.id)}
          esVisible={clasesVisibles.includes(claseActiva.id)}
          onToggleVisible={() => toggleVisible(claseActiva.id)}
        ></DetalleClase>
      ) : null}
      </div>

      {personaPerfil ? (
        <PerfilPanel
          persona={personaPerfil}
          clases={datos.clases}
          onCerrar={() => setPerfilAbierto(null)}
          onIrAClase={irAClase}
          onPerfilCompleto={() => irAPersona(personaPerfil.id)}
        ></PerfilPanel>
      ) : null}

      {formPersona ? (
        <PersonaForm
          modo={formPersona.modo}
          persona={formPersona.persona}
          grupos={grupos}
          onNuevoGrupo={nuevoGrupo}
          onCerrar={() => setFormPersona(null)}
          onGuardar={(p) => { upsertPersona(p); setFormPersona(null); if (formPersona.modo === "nuevo") irAPersona(p.id); }}
        ></PersonaForm>
      ) : null}

      {pizarra && claseActiva ? (
        <Pizarra
          clase={claseActiva}
          sesion={claseActiva.sesiones[vista.sesion || 0]}
          personas={personas}
          escala={t.pizarraEscala}
          onSalir={() => setPizarra(false)}
        ></Pizarra>
      ) : null}

      {charlaManual ? (
        (() => {
          const man = manuales.find((m) => m.id === charlaManual);
          return man ? (
            <ManualCharla
              manual={man}
              categorias={estudioCategorias}
              onSalir={() => setCharlaManual(null)}
            ></ManualCharla>
          ) : null;
        })()
      ) : null}

      {pizarraLibre ? (
        <Pizarra
          clase={{ nombre: pizarraLibre.titulo, duracion: 0, coach: "Proceso individual" }}
          sesion={pizarraLibre.sesion}
          personas={personas}
          escala={t.pizarraEscala}
          onSalir={() => setPizarraLibre(null)}
        ></Pizarra>
      ) : null}

      <TweaksPanel>
        <TweakSection label="Marca"></TweakSection>
        <TweakColor
          label="Acento"
          value={t.acento}
          options={["#489DA3", "#E84D23", "#000000"]}
          onChange={(v) => setTweak("acento", v)}
        ></TweakColor>
        <TweakSection label="Pizarra"></TweakSection>
        <TweakSlider
          label="Escala de texto"
          value={t.pizarraEscala}
          min={0.8}
          max={1.6}
          step={0.05}
          onChange={(v) => setTweak("pizarraEscala", v)}
        ></TweakSlider>
      </TweaksPanel>
      <Toaster></Toaster>
    </div>
  );
}

/* ---------- vista: detalle de clase ---------- */
function DetalleClase({ clase, personas, sesionIdx, onSesion, onVolver, onAbrirPerfil, onProyectar, onEditar, esVisible, onToggleVisible }) {
  const sesion = clase.sesiones[Math.min(sesionIdx, clase.sesiones.length - 1)];

  return (
    <main className="contenido" data-screen-label={"Detalle — " + clase.nombre}>
      <button className="volver" onClick={onVolver}>← Biblioteca</button>

      <header className="cabecera-clase">
        <div>
          <h1>{clase.nombre}</h1>
          <p className="desc">{clase.descripcion}</p>
          <div className="metas">
            <span className="chip">{clase.nivel}</span>
            <span className="chip">{clase.duracion}′</span>
            <span className="chip">{clase.horarios}</span>
            <span className="chip">Coach {clase.coach}</span>
          </div>
        </div>
        <div className="cabecera-clase-acciones">
          {onToggleVisible ? (
            <button className={"btn-visible" + (esVisible ? " on" : "")} onClick={onToggleVisible} title="Mostrar esta clase a los alumnos">
              {esVisible ? "✓ Visible para alumnos" : "Ocultar a alumnos"}
            </button>
          ) : null}
          {onEditar ? <button className="btn-editar-clase" onClick={onEditar}>Editar clase</button> : null}
          <button className="btn-pizarra" onClick={onProyectar}>
            <IconPlay></IconPlay> Proyectar pizarra
          </button>
        </div>
      </header>

      <div className="cuerpo-detalle solo">
        <section>
          {sesion.foco ? (
            <p className="foco-sesion">
              <strong>Foco de la clase</strong>
              {sesion.foco}
            </p>
          ) : null}
          {(sesion.bloques || []).map((b, i) => (
            <BloqueLectura bloque={b} indice={i} key={i}></BloqueLectura>
          ))}
          {(sesion.bloques || []).length === 0 ? (
            <p className="vacio-bloques">Esta sesión todavía no tiene bloques.</p>
          ) : null}
        </section>
      </div>
    </main>
  );
}

/* ---------- bloque en modo lectura (reutilizado en clase y rutina) ---------- */
function BloqueLectura({ bloque, indice }) {
  return (
    <div className="bloque">
      <div className="bloque-cabecera">
        <span className="bloque-num">{String(indice + 1).padStart(2, "0")}</span>
        <span className="bloque-nombre">{bloque.nombre}</span>
        {bloque.niveles ? <span className="chip-niveles">por niveles</span> : null}
        <span className="bloque-dur">
          {bloque.dosisGlobal ? bloque.dosisGlobal + " · " : ""}{bloque.duracion}′
        </span>
      </div>
      {bloque.niveles ? (
        <div className="bloque-cuerpo-niveles">
          <BloqueNiveles bloque={bloque} modo="detalle"></BloqueNiveles>
        </div>
      ) : (
        <table>
          <tbody>
            {bloque.items.map((it, j) => (
              it.divisor != null ? (
                <tr key={j}><td colSpan="2" className="bloque-grupo">{it.divisor}</td></tr>
              ) : (
                <tr key={j}>
                  <td>
                    <div className="ej-nombre">{it.ej}</div>
                    {it.nota ? <div className="ej-nota">{it.nota}</div> : null}
                  </td>
                  <td className="ej-dosis">{it.dosis}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

Object.assign(window, { BloqueLectura, AdminApp });

/* ============================================================
   PASSCODE — admin con clave maestra, coach con PIN individual
   ============================================================ */
const CLAVE_ROL_SESION = "dharma-rol-sesion"; // sessionStorage: dura mientras la pestaña/app está abierta, pero se borra al cerrarla del todo — así un dispositivo compartido (tablet del centro, celular prestado) nunca queda abierto en la cuenta de otra persona después de cerrar
function PasscodePantalla({ onVolver, onOk, inicial }) {
  const [modo, setModo] = React.useState(() => {
    if (inicial === "coach") { const cs = (window.Coaches ? window.Coaches.cargar() : []).filter((c) => c.activo); return cs.length ? "coach" : "admin"; }
    return inicial || "admin";
  }); // admin | coach
  const [clave, setClave] = React.useState("");
  const [coachId, setCoachId] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState("");
  const coaches = (window.Coaches ? window.Coaches.cargar() : []).filter((c) => c.activo);

  const intentarAdmin = (e) => {
    e.preventDefault();
    const claves = window.DHARMA_CLAVES || {};
    if (clave === claves.ADMIN) { onOk("admin"); return; }
    if (clave === claves.COACH) { onOk("coach"); return; }
    setError("Clave incorrecta. Consultá con el head coach.");
  };
  const intentarCoach = (e) => {
    e.preventDefault();
    const c = coaches.find((c) => c.id === coachId);
    if (c && c.pin === pin) { onOk({ coach: { id: c.id, nombre: c.nombre } }); return; }
    setError("PIN incorrecto.");
  };

  return (
    <div className="entrada" style={{ "--acento": "#489DA3", "--acento-claro": "#6EC5D1", "--entrada-foto": window.DHARMA_MARCA ? "url(" + window.DHARMA_MARCA.equipoFoto + ")" : "none" }}>
      <div className="entrada-marca">
        {window.DHARMA_MARCA ? <img className="entrada-isotipo" src={window.DHARMA_MARCA.isotipoNegro} alt=""></img> : null}
        <span className="entrada-logo">DHARMA</span>
        <span className="entrada-tagline">entrenar es para todo el mundo</span>
      </div>

      {modo === "admin" ? (
        <form className="entrada-login" onSubmit={intentarAdmin}>
          <button type="button" className="volver chico claro" onClick={onVolver}>← Volver</button>
          <h2 className="login-titulo">Entrar como admin</h2>
          <p className="login-sub">Ingresá la clave que te dio el head coach.</p>
          <label className="campo">
            <span>Clave</span>
            <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} autoFocus required></input>
          </label>
          {error ? <p className="login-error">{error}</p> : null}
          <button className="btn-primario ancho" type="submit">Entrar</button>
        </form>
      ) : null}

      {modo === "coach" ? (
        <form className="entrada-login" onSubmit={intentarCoach}>
          <button type="button" className="volver chico claro" onClick={onVolver}>← Volver</button>
          <h2 className="login-titulo">Entrar como coach</h2>
          <p className="login-sub">Elegí tu nombre y poné tu PIN.</p>
          <label className="campo">
            <span>Coach</span>
            <select value={coachId} onChange={(e) => setCoachId(e.target.value)} required autoFocus>
              <option value="">— Elegí tu nombre —</option>
              {coaches.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
            </select>
          </label>
          <label className="campo">
            <span>PIN</span>
            <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} required></input>
          </label>
          {error ? <p className="login-error">{error}</p> : null}
          <button className="btn-primario ancho" type="submit">Entrar</button>
        </form>
      ) : null}
    </div>
  );
}

/* ============================================================
   RAÍZ: separa rol admin / coach / alumno
   ============================================================ */
function App() {
  const [rol, setRol] = React.useState(() => {
    try { return JSON.parse(sessionStorage.getItem(CLAVE_ROL_SESION)); } catch (e) { return null; }
  }); // null | "passcode" | "admin" | "coach" | {alumnoId}
  const fijarRolSesion = (r) => { setRol(r); try { sessionStorage.setItem(CLAVE_ROL_SESION, JSON.stringify(r)); } catch (e) {} };
  const loguearAlumno = (id) => fijarRolSesion({ alumnoId: id });
  const salir = () => { setRol(null); try { sessionStorage.removeItem(CLAVE_ROL_SESION); } catch (e) {} };
  const [refreshKey, setRefreshKey] = React.useState(0);
  React.useEffect(() => {
    let pendiente = false;
    const aplicarRefresh = () => setRefreshKey((k) => k + 1);
    const onRefresh = () => {
      // Blindaje: si hay un editor (clase, evento del calendario, etc.) abierto ahora
      // mismo, NO forzamos el remount de toda la app — eso reiniciaba el formulario y
      // perdía lo que se estaba escribiendo. Esperamos a que se cierre para aplicarlo.
      if (window.__dharmaEditorAbierto) { pendiente = true; return; }
      aplicarRefresh();
    };
    const onEditorCerrado = () => { if (pendiente) { pendiente = false; aplicarRefresh(); } };
    window.addEventListener("dharma-datos-remotos-aplicados", onRefresh);
    window.addEventListener("dharma-editor-cerrado", onEditorCerrado);
    return () => { window.removeEventListener("dharma-datos-remotos-aplicados", onRefresh); window.removeEventListener("dharma-editor-cerrado", onEditorCerrado); };
  }, []);

  if (rol === "admin") return <AdminApp key={refreshKey} modoCoach={false} onSalirRol={salir}></AdminApp>;
  if (rol === "coach") return <AdminApp key={refreshKey} modoCoach={true} onSalirRol={salir}></AdminApp>;
  if (rol && rol.coach) return <AdminApp key={refreshKey} modoCoach={true} coachActual={rol.coach.nombre} onSalirRol={salir}></AdminApp>;
  if (rol && rol.alumnoId) return <AlumnoApp key={refreshKey} alumnoId={rol.alumnoId} onSalir={salir}></AlumnoApp>;
  if (rol && rol.passcode) return <PasscodePantalla inicial={rol.passcode} onVolver={() => setRol(null)} onOk={fijarRolSesion}></PasscodePantalla>;
  if (rol === "passcode") return <PasscodePantalla inicial="admin" onVolver={() => setRol(null)} onOk={fijarRolSesion}></PasscodePantalla>;
  return <Entrada onCoach={(m) => setRol({ passcode: m || "admin" })} onAlumno={loguearAlumno}></Entrada>;
}

(window.DHARMA_SYNC_READY || Promise.resolve()).then(function () {
  ReactDOM.createRoot(document.getElementById("root")).render(<App></App>);
});
