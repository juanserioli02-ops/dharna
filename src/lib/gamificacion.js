// DHARMA — Gamificación del alumno: un puntaje único compuesto por 4 pilares
// (constancia, compromiso, fuerza y potencia, movilidad y control). Subir de
// nivel técnico (Guerrero→Ninja→Mago→Maestro) pide un mínimo en LOS 4 pilares
// a la vez + confirmación del coach — nunca se sube solo por sumar puntos.
// Todo se calcula en vivo a partir de datos que ya existen (reservas pasadas,
// wellness, PRs autoreportados) — no duplica contadores que puedan desincronizarse.

const GAMIF_CLAVE_PRS = "dharma-gamif-prs-v1";
const GAMIF_CLAVE_NIVEL = "dharma-gamif-nivel-v1"; // { [personaId]: { nivel, confirmadoPor, fecha } }

const GAMIF_UMBRAL = { ninja: 150, mago: 400, maestro: 900 };
const GAMIF_NIVELES = ["guerrero", "ninja", "mago", "maestro"];
const GAMIF_SIGUIENTE = { guerrero: "ninja", ninja: "mago", mago: "maestro", maestro: null };

const GAMIF_PILARES = {
  constancia: { nombre: "Constancia", color: "#489DA3" },
  compromiso: { nombre: "Compromiso", color: "#E84D23" },
  fuerza: { nombre: "Fuerza y potencia", color: "#F15B29" },
  movilidad: { nombre: "Movilidad y control", color: "#6EC5D1" }
};

// ejercicios de la tabla oficial ¿Qué tan fuerte sos? — a qué pilar aporta cada uno
const GAMIF_EJ_OFICIALES = {
  "Aguantar la respiración": "movilidad",
  "Balance 1 pie ojos cerrados": "movilidad",
  "Caminar con peso": "fuerza",
  "Cargada": "fuerza",
  "Cargada de potencia": "fuerza",
  "Colgarse en barra": "movilidad",
  "Dominada": "fuerza",
  "Dominadas supinas": "fuerza",
  "Fuerza de brazo (push ups)": "fuerza",
  "Fuerza de brazos en 30\"": "fuerza",
  "Lanzamientos al piso en 30\"": "fuerza",
  "Levantamiento turco": "movilidad",
  "Pasamanos — escalones en 30\"": "movilidad",
  "Peso muerto": "fuerza",
  "Press hombro una mano": "fuerza",
  "Press militar": "fuerza",
  "Remo mancuerna": "fuerza",
  "Saltar adelante": "fuerza",
  "Saltar arriba": "fuerza",
  "Sentadilla a una pierna": "movilidad",
  "Sentadilla frontal": "fuerza",
  "Sentadilla profunda sin talón": "movilidad",
  "Sentadilla trap bar": "fuerza",
  "Sentadilla trasera": "fuerza",
  "Sentadilla zercher": "fuerza",
  "Tiempo total colgado": "movilidad"
};

function gamifCargar(clave, fallback) { try { const v = JSON.parse(localStorage.getItem(clave)); return v || fallback; } catch (e) { return fallback; } }
function gamifGuardar(clave, v) { try { localStorage.setItem(clave, JSON.stringify(v)); } catch (e) {} }

function gamifPrsDe(personaId) {
  const todos = gamifCargar(GAMIF_CLAVE_PRS, {});
  return todos[personaId] || [];
}
// ¿b es mejor marca que a para el mismo ejercicio? peso manda; a igual peso, más reps gana; sin peso, reps/segundos mandan
function gamifEsMejorMarca(nuevo, anterior) {
  if (!anterior) return true;
  const pesoNuevo = Number(nuevo.peso) || 0, pesoAnterior = Number(anterior.peso) || 0;
  if (pesoNuevo !== pesoAnterior) return pesoNuevo > pesoAnterior;
  return (Number(nuevo.reps) || 0) > (Number(anterior.reps) || 0);
}

function gamifAgregarPR(personaId, { ejercicio, pilar, peso, reps, comentario, fechaForzada, serie }) {
  const todos = gamifCargar(GAMIF_CLAVE_PRS, {});
  const lista = todos[personaId] || [];
  const clave = ejercicio;
  const historialEjercicio = lista.filter((p) => p.ejercicio === clave);
  const mejorAnterior = historialEjercicio.reduce((mejor, p) => (gamifEsMejorMarca(p, mejor) ? p : mejor), null);
  const nuevo = { id: "pr" + Date.now() + Math.random().toString(36).slice(2, 6), ejercicio, pilar, peso: peso === "" || peso == null ? null : Number(peso), reps: reps === "" || reps == null ? null : Number(reps), comentario: comentario || "", fecha: fechaForzada || new Date().toISOString().slice(0, 10), serie: serie || null };
  nuevo.esPR = gamifEsMejorMarca(nuevo, mejorAnterior);
  todos[personaId] = [...lista, nuevo];
  gamifGuardar(GAMIF_CLAVE_PRS, todos);
  return nuevo;
}

function gamifSemanaIso(fecha) {
  const d = new Date(fecha + "T00:00:00");
  const onejan = new Date(d.getFullYear(), 0, 1);
  const semana = Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
  return d.getFullYear() + "-W" + semana;
}

// puntos de constancia: 10 por clase pasada reservada + 15 por cada semana con al menos 2 reservas pasadas
function gamifPtsConstancia(personaId, reservas) {
  const hoyIso = new Date().toISOString().slice(0, 10);
  const pasadas = (reservas || []).filter((r) => r.personaId === personaId && r.fecha <= hoyIso);
  const porSemana = {};
  pasadas.forEach((r) => { const s = gamifSemanaIso(r.fecha); porSemana[s] = (porSemana[s] || 0) + 1; });
  const semanasConRacha = Object.values(porSemana).filter((n) => n >= 2).length;
  return pasadas.length * 10 + semanasConRacha * 15;
}

// puntos de compromiso: 5 por check-in de wellness + 5 por cada día distinto con al menos una carga registrada + 15 por racha de descanso + objetivo del mes
function gamifPtsCompromiso(persona, pctPlanMes, prs) {
  const wellness = persona.wellness || [];
  let pts = wellness.length * 5;
  const diasConRegistro = new Set((prs || []).map((p) => p.fecha)).size;
  pts += diasConRegistro * 5;
  // racha de buen descanso: días consecutivos con "descanso" bueno/excelente en el check-in
  const ord = [...wellness].sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
  let racha = 0, mejorRacha = 0;
  ord.forEach((w) => {
    const bienDescansado = (w.suenoCal && Number(w.suenoCal) >= 4) || Number(w.sueno) >= 7;
    if (bienDescansado) { racha++; mejorRacha = Math.max(mejorRacha, racha); } else racha = 0;
  });
  pts += Math.floor(mejorRacha / 5) * 15;
  if (pctPlanMes >= 100) pts += 60; else if (pctPlanMes >= 90) pts += 45; else if (pctPlanMes >= 80) pts += 30;
  return pts;
}

// puntos de fuerza/movilidad: 25 por cada marca que fue un PR real (superó la anterior) en ese pilar
function gamifPtsPorPilarDePRs(prs, pilar) {
  return prs.filter((p) => p.pilar === pilar && p.esPR).length * 25;
}

// racha de sueño actual (noches consecutivas de buen descanso hasta hoy)
function gamifRachaSueno(persona) {
  const wellness = [...(persona.wellness || [])].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  let racha = 0;
  for (const w of wellness) {
    const bien = (w.suenoCal && Number(w.suenoCal) >= 4) || Number(w.sueno) >= 7;
    if (bien) racha++; else break;
  }
  return racha;
}

function gamifPctPlanMes(persona, socios, reservas) {
  const sub = socios && socios[persona.id];
  if (!sub) return 0;
  const hoy = new Date();
  const prefMes = hoy.toISOString().slice(0, 7);
  const usadas = (reservas || []).filter((r) => r.personaId === persona.id && r.fecha.slice(0, 7) === prefMes).length;
  const totalSugerido = 12; // objetivo mensual sugerido del centro cuando no hay tope explícito del plan
  return Math.min(100, Math.round((usadas / totalSugerido) * 100));
}

function gamifCalcular(persona, { reservas, socios }) {
  const prs = gamifPrsDe(persona.id);
  const pctPlan = gamifPctPlanMes(persona, socios || {}, reservas || []);
  const constancia = gamifPtsConstancia(persona.id, reservas || []);
  const compromiso = gamifPtsCompromiso(persona, pctPlan, prs);
  const fuerza = gamifPtsPorPilarDePRs(prs, "fuerza");
  const movilidad = gamifPtsPorPilarDePRs(prs, "movilidad");
  const pilares = { constancia, compromiso, fuerza, movilidad };
  const total = constancia + compromiso + fuerza + movilidad;
  const nivelesGuardados = gamifCargar(GAMIF_CLAVE_NIVEL, {});
  const nivelConfirmado = (nivelesGuardados[persona.id] && nivelesGuardados[persona.id].nivel) || "guerrero";
  const siguiente = GAMIF_SIGUIENTE[nivelConfirmado];
  const umbral = siguiente ? GAMIF_UMBRAL[siguiente] : null;
  const minimoPilar = Math.min(constancia, compromiso, fuerza, movilidad);
  const pilarMasDebil = Object.entries(pilares).sort((a, b) => a[1] - b[1])[0][0];
  let subnivel = "Bronce";
  if (umbral) {
    const pct = minimoPilar / umbral;
    subnivel = pct >= 0.66 ? "Oro" : pct >= 0.33 ? "Plata" : "Bronce";
  } else { subnivel = "Oro"; } // tope Maestro
  const listoParaSubir = umbral != null && minimoPilar >= umbral;
  return { pilares, total, nivel: nivelConfirmado, subnivel, siguiente, umbral, minimoPilar, pilarMasDebil, listoParaSubir, prs, rachaSueno: gamifRachaSueno(persona) };
}

function gamifConfirmarNivel(personaId, nivel) {
  const nivelesGuardados = gamifCargar(GAMIF_CLAVE_NIVEL, {});
  nivelesGuardados[personaId] = { nivel, fecha: new Date().toISOString().slice(0, 10) };
  gamifGuardar(GAMIF_CLAVE_NIVEL, nivelesGuardados);
}

/* ---------- ranking semanal y roles (DJ / Coach / Aguatero) ----------
   Solo cuenta lo ganado esa semana (lunes 00:00 a domingo), calculado en vivo
   — no duplica contadores. El podio de la semana ANTERIOR define quién tiene
   el rol activo durante la semana en curso (1 clase de premio cada uno). */
const GAMIF_ROLES_SEMANA = [
  { id: "dj", nombre: "DJ de la semana", desc: "Elige la música de su próxima clase", icono: "🎧" },
  { id: "coach", nombre: "Co-coach", desc: "Le indica al entrenador un ejercicio para incluir en su próxima clase", icono: "📣" },
  { id: "aguatero", nombre: "Aguatero", desc: "Puede pedirle cualquier favor a un compañero durante su próxima clase", icono: "💧" }
];

function gamifLunesDe(d) { const x = new Date(d); const day = (x.getDay() + 6) % 7; x.setDate(x.getDate() - day); x.setHours(0, 0, 0, 0); return x; }
function gamifIso(d) { return d.toISOString().slice(0, 10); }
function gamifRangoSemana(offsetSemanas) {
  const hoy = new Date();
  const lunes = gamifLunesDe(hoy);
  lunes.setDate(lunes.getDate() + offsetSemanas * 7);
  const domingo = new Date(lunes); domingo.setDate(domingo.getDate() + 6);
  return { desde: gamifIso(lunes), hasta: gamifIso(domingo), etiqueta: gamifSemanaIso(gamifIso(lunes)) };
}

// puntos ganados SOLO dentro de un rango de fechas [desde, hasta] (mismo criterio que el total, pero acotado)
function gamifPuntosEnRango(persona, { reservas, socios }, rango) {
  const enRango = (f) => f >= rango.desde && f <= rango.hasta;
  const reservasSem = (reservas || []).filter((r) => r.personaId === persona.id && enRango(r.fecha));
  const ptsConstancia = reservasSem.length * 10 + (reservasSem.length >= 2 ? 15 : 0);
  const wellnessSem = (persona.wellness || []).filter((w) => enRango(w.fecha));
  const prsSem = gamifPrsDe(persona.id).filter((p) => enRango(p.fecha));
  let ptsCompromiso = wellnessSem.length * 5 + new Set(prsSem.map((p) => p.fecha)).size * 5;
  const buenDescansoSem = wellnessSem.filter((w) => (w.suenoCal && Number(w.suenoCal) >= 4) || Number(w.sueno) >= 7).length;
  if (buenDescansoSem >= 5) ptsCompromiso += 15;
  const ptsFuerza = prsSem.filter((p) => p.pilar === "fuerza" && p.esPR).length * 25;
  const ptsMovilidad = prsSem.filter((p) => p.pilar === "movilidad" && p.esPR).length * 25;
  return ptsConstancia + ptsCompromiso + ptsFuerza + ptsMovilidad;
}

// ranking + roles de la semana en curso (basados en el podio de la semana YA CERRADA)
function gamifRankingSemana(personas, ctx) {
  const semanaActual = gamifRangoSemana(0);
  const semanaPasada = gamifRangoSemana(-1);
  const puntuar = (rango) => (personas || []).map((p) => ({ persona: p, pts: gamifPuntosEnRango(p, ctx, rango) }))
    .filter((f) => f.pts > 0).sort((a, b) => b.pts - a.pts);
  const tablaActual = puntuar(semanaActual);
  const tablaPasada = puntuar(semanaPasada);
  // arma podio de 3 puestos repartiendo el mismo rol entre empatados
  const podio = [];
  let idx = 0;
  for (const rol of GAMIF_ROLES_SEMANA) {
    if (idx >= tablaPasada.length) break;
    const pts = tablaPasada[idx].pts;
    const empatados = tablaPasada.filter((f, i) => i >= idx && f.pts === pts);
    podio.push({ rol, ganadores: empatados.map((f) => f.persona), pts });
    idx += empatados.length;
  }
  const rolDe = (personaId) => podio.find((pu) => pu.ganadores.some((g) => g.id === personaId));
  return { semanaActual, semanaPasada, tablaActual, tablaPasada, podio, rolDe };
}

function gamifCap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function gamifEliminarPR(personaId, prId) {
  const todos = gamifCargar(GAMIF_CLAVE_PRS, {});
  todos[personaId] = (todos[personaId] || []).filter((p) => p.id !== prId);
  gamifGuardar(GAMIF_CLAVE_PRS, todos);
}

window.Gamif = {
  PILARES: GAMIF_PILARES, NIVELES: GAMIF_NIVELES, UMBRAL: GAMIF_UMBRAL, EJ_OFICIALES: GAMIF_EJ_OFICIALES, ROLES_SEMANA: GAMIF_ROLES_SEMANA,
  prsDe: gamifPrsDe, agregarPR: gamifAgregarPR, eliminarPR: gamifEliminarPR, calcular: gamifCalcular, confirmarNivel: gamifConfirmarNivel,
  rankingSemana: gamifRankingSemana, rangoSemana: gamifRangoSemana, cap: gamifCap
};
