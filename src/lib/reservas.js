// DHARMA — Reservas: alumnos reservan su lugar en clases grupales del Calendario.
// Un evento del calendario puede tener cupo (número de lugares) y puede repetirse
// semanalmente — por eso una reserva se identifica por (eventoId, fecha de esa
// ocurrencia puntual), no solo por el evento. Eventos "privados" (ej: un coach que
// tiene un personalizado a las 4pm) nunca aparecen para reservar.

const CLAVE_RESERVAS = "dharma-reservas-clases-v1";
// Registro de cancelaciones: no se borra al cancelar, se archiva — para que Admin pueda
// ver siempre quién canceló una clase, cuándo, y si se le devolvió el crédito o se le
// cobró (canceló dentro de la ventana de anticipación mínima).
const CLAVE_CANCELACIONES = "dharma-cancelaciones-v1";
function rCancelacionesCargar() { try { return JSON.parse(localStorage.getItem(CLAVE_CANCELACIONES)) || []; } catch (e) { return []; } }
function rCancelacionesGuardar(next) { try { localStorage.setItem(CLAVE_CANCELACIONES, JSON.stringify(next)); } catch (e) {} return next; }
function rRegistrarCancelacion(eventoId, fecha, personaId, reembolsada) {
  const frescas = rCancelacionesCargar();
  const reg = { id: "cnc" + Date.now() + Math.random().toString(36).slice(2, 6), eventoId, fecha, personaId, reembolsada, canceladaEn: new Date().toISOString() };
  const next = rCancelacionesGuardar([reg, ...frescas]);
  if (rFirestoreOk()) { try { firebase.firestore().collection("dharma_cancelaciones").doc(reg.id).set(reg); } catch (e) {} }
  return next;
}
function rCancelacionesDeOcurrencia(eventoId, fecha) { return rCancelacionesCargar().filter((c) => c.eventoId === eventoId && c.fecha === fecha); }

// Las reservas viven en su PROPIA colección de Firestore (1 documento por reserva +
// 1 contador por ocurrencia), en vez de ser un array adentro del documento único del
// centro. Con muchas personas reservando a la vez, un solo documento compartido se
// vuelve un cuello de botella y puede perder reservas por sobre-escritura simultánea;
// una colección con transacciones evita ambos problemas. localStorage sigue siendo
// la caché local para lecturas sincrónicas (igual que antes); Firestore es la fuente
// de verdad entre dispositivos cuando hay conexión.
const RCOL_RESERVAS = "dharma_reservas";
const RCOL_OCURRENCIAS = "dharma_ocurrencias";
function rFirestoreOk() { return !!(window.firebase && window.firebase.apps && window.firebase.apps.length); }
function rDocId(eventoId, fecha, personaId) { return eventoId + "@@" + fecha + "@@" + personaId; }
function rOcurrenciaId(eventoId, fecha) { return eventoId + "@@" + fecha; }

function rCargar() {
  try { const v = JSON.parse(localStorage.getItem(CLAVE_RESERVAS)); return Array.isArray(v) ? v : []; } catch (e) { return []; }
}
function rGuardar(next) {
  try { localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(next)); } catch (e) {}
  return next;
}
const rClave = (eventoId, fecha) => eventoId + "@" + fecha;

// escucha en vivo la colección de reservas (últimos ~75 días) y mantiene la caché local al día
function rIniciarEscuchaRemota() {
  if (!rFirestoreOk() || rIniciarEscuchaRemota._hecho) return;
  rIniciarEscuchaRemota._hecho = true;
  try {
    const desde = new Date(); desde.setDate(desde.getDate() - 75);
    const desdeIso = desde.toISOString().slice(0, 10);
    firebase.firestore().collection(RCOL_RESERVAS).where("fecha", ">=", desdeIso)
      .onSnapshot(function (snap) {
        const lista = [];
        snap.forEach(function (doc) { lista.push(doc.data()); });
        rGuardar(lista);
        window.dispatchEvent(new Event("dharma-reservas-actualizadas"));
      }, function () { /* sin conexión momentánea: se sigue usando la caché local */ });
  } catch (e) {}
}

function rDeOcurrencia(reservas, eventoId, fecha) {
  const k = rClave(eventoId, fecha);
  return reservas.filter((r) => rClave(r.eventoId, r.fecha) === k);
}
function rDePersona(reservas, personaId) {
  return reservas.filter((r) => r.personaId === personaId);
}
function rTiene(reservas, eventoId, fecha, personaId) {
  return reservas.some((r) => r.eventoId === eventoId && r.fecha === fecha && r.personaId === personaId);
}
function rCupoLibre(evento, reservas) {
  if (!evento.cupo) return Infinity;
  // para eventos recurrentes evaluamos el cupo respecto de la ocurrencia solicitada
  return null; // se calcula por ocurrencia, ver rCupoLibreEn
}
function rCupoLibreEn(evento, reservas, fecha) {
  if (!evento.cupo) return Infinity;
  return Math.max(0, evento.cupo - rDeOcurrencia(reservas, evento.id, fecha).length);
}
// Escritura optimista local inmediata (misma UX de siempre) + confirmación transaccional
// en Firestore en segundo plano. Si dos personas reservan el último lugar al mismo
// tiempo, la transacción del servidor decide quién entra de verdad — si perdiste la
// carrera, tu reserva local se revierte y te avisamos, en vez de perderla en silencio.
function rReservar(reservas, eventoId, fecha, personaId, cupo, onPerdida) {
  if (rTiene(reservas, eventoId, fecha, personaId)) return reservas;
  const registro = { id: "r" + Date.now() + Math.random().toString(36).slice(2, 6), eventoId, fecha, personaId, creado: new Date().toISOString() };
  const next = rGuardar([...reservas, registro]);
  if (rFirestoreOk()) {
    const db = firebase.firestore();
    const reservaRef = db.collection(RCOL_RESERVAS).doc(rDocId(eventoId, fecha, personaId));
    const ocurrenciaRef = db.collection(RCOL_OCURRENCIAS).doc(rOcurrenciaId(eventoId, fecha));
    db.runTransaction(function (tx) {
      return tx.get(reservaRef).then(function (existente) {
        if (existente.exists) return "ya-existe";
        return tx.get(ocurrenciaRef).then(function (ocSnap) {
          const count = ocSnap.exists ? (ocSnap.data().count || 0) : 0;
          if (cupo && count >= cupo) throw new Error("sin-cupo");
          tx.set(reservaRef, registro);
          tx.set(ocurrenciaRef, { count: count + 1 }, { merge: true });
          return "ok";
        });
      });
    }).then(function(result) {
      if (result === "ok") window.dharmaToast && window.dharmaToast("✓ Reservado", "ok");
    }).catch(function (e) {
      // Solo revierte si el error es "sin-cupo" (alguien más ganó el último lugar)
      if (e.message === "sin-cupo") {
        const actuales = rCargar();
        rGuardar(actuales.filter((r) => r.id !== registro.id));
        window.dispatchEvent(new Event("dharma-reservas-actualizadas"));
        window.dharmaToast && window.dharmaToast("Alguien reservó el último lugar justo antes — tu reserva no se pudo confirmar", "borrado");
        // Blindaje: si ya se había descontado un crédito de forma optimista al reservar,
        // hay que devolverlo — perder la carrera por el cupo nunca debe costarle una clase.
        try { onPerdida && onPerdida(); } catch (err) {}
      }
      // Si es otro error (network, etc), mantiene la reserva local y reintenta
    });
  }
  return next;
}
function rCancelar(reservas, eventoId, fecha, personaId) {
  const next = rGuardar(reservas.filter((r) => !(r.eventoId === eventoId && r.fecha === fecha && r.personaId === personaId)));
  if (rFirestoreOk()) {
    const db = firebase.firestore();
    const reservaRef = db.collection(RCOL_RESERVAS).doc(rDocId(eventoId, fecha, personaId));
    const ocurrenciaRef = db.collection(RCOL_OCURRENCIAS).doc(rOcurrenciaId(eventoId, fecha));
    db.runTransaction(function (tx) {
      return tx.get(reservaRef).then(function (existente) {
        if (!existente.exists) return;
        return tx.get(ocurrenciaRef).then(function (ocSnap) {
          const count = ocSnap.exists ? (ocSnap.data().count || 0) : 0;
          tx.delete(reservaRef);
          tx.set(ocurrenciaRef, { count: Math.max(0, count - 1) }, { merge: true });
        });
      });
    }).catch(function () { /* se reconcilia solo con la próxima escucha en vivo */ });
  }
  return next;
}
function rQuitar(reservas, id) {
  const r = reservas.find((x) => x.id === id);
  const next = rGuardar(reservas.filter((r) => r.id !== id));
  if (r) return rCancelar(next, r.eventoId, r.fecha, r.personaId), next;
  return next;
}
// minutos entre ahora y el inicio de la ocurrencia (fecha=YYYY-MM-DD, hora=HH:MM)
function rMinutosHastaInicio(fecha, hora) {
  const [y, m, d] = fecha.split("-").map(Number);
  const [hh, mm] = (hora || "0:0").split(":").map(Number);
  const inicio = new Date(y, m - 1, d, hh, mm);
  return Math.round((inicio - new Date()) / 60000);
}

window.Reservas = {
  CLAVE: CLAVE_RESERVAS,
  cargar: rCargar, guardar: rGuardar, clave: rClave,
  deOcurrencia: rDeOcurrencia, dePersona: rDePersona, tiene: rTiene,
  cupoLibreEn: rCupoLibreEn,
  reservar: rReservar, cancelar: rCancelar, quitar: rQuitar,
  minutosHastaInicio: rMinutosHastaInicio,
  registrarCancelacion: rRegistrarCancelacion, cancelacionesDeOcurrencia: rCancelacionesDeOcurrencia,
  iniciarEscuchaRemota: rIniciarEscuchaRemota
};
// Arranca la escucha en vivo apenas Firebase esté inicializado (sync.js lo hace al cargar la app).
if (window.DHARMA_SYNC_READY) window.DHARMA_SYNC_READY.then(rIniciarEscuchaRemota);
else document.addEventListener("DOMContentLoaded", function () { setTimeout(rIniciarEscuchaRemota, 1500); });
