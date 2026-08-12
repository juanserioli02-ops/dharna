// DHARMA — Sync multi-dispositivo (Firebase Firestore).
// Todo lo que vive en localStorage bajo "dharma-*" (salvo estado de UI transitorio) se
// guarda también en la nube, en un único documento compartido por todo el centro
// (sin login individual — Etapa 1: un solo espacio, todos los coaches ven y editan lo mismo).
//
// Cómo funciona:
//  1) Al abrir la app, se intenta traer la última versión guardada en la nube ANTES de
//     mostrar la interfaz (con un máximo de ~4s de espera; si no hay internet, arranca
//     con lo que ya está guardado en este dispositivo).
//  2) Cada cambio local (clases, personas, ejercicios, calendario…) se empuja a la nube
//     solo, con una pequeña demora para agrupar cambios seguidos.
//  3) Si otro dispositivo cambia algo mientras esta app está abierta, aparece un aviso
//     abajo ("Hay cambios nuevos de otro dispositivo") — nunca se pisa lo que estás
//     escribiendo sin avisar; vos elegís cuándo actualizar.
//
// Estado de conexión disponible en window.__dharmaSyncEstado y evento "dharma-sync-estado".

(function () {
  var DOC_COLECCION = "dharma_sync";
  var DOC_ID = "centro";

  function esExcluida(k) {
    return (
      k === "dharma-vista" ||
      k === "dharma-backup-ultima" ||
      k === "dharma-reservas-clases-v1" || // tiene su propia colección Firestore (dharma_reservas), ver reservas.js
      k.indexOf("dharma-sesion") === 0 ||
      k.indexOf("dharma-timer") === 0 ||
      k.indexOf("dharma-pizarra-") === 0 ||
      k.indexOf("dharma-charla-") === 0
    );
  }
  function esSincronizable(k) { return k.indexOf("dharma-") === 0 && !esExcluida(k); }

  var docRef = null;
  var listo = false;          // ya se aplicó (o se descartó) la primera carga remota
  var aplicandoRemoto = false; // evita reenviar a la nube lo que acabamos de recibir de ella
  var pendientes = {};
  var pushTimer = null;
  var remotoEnEspera = null;  // datos de un snapshot posterior que el usuario todavía no aplicó

  function setEstado(txt, tipo) {
    window.__dharmaSyncEstado = { txt: txt, tipo: tipo };
    try { window.dispatchEvent(new CustomEvent("dharma-sync-estado", { detail: window.__dharmaSyncEstado })); } catch (e) {}
  }

  function aplicarDatos(data) {
    aplicandoRemoto = true;
    try {
      Object.keys(data).forEach(function (k) {
        if (!esSincronizable(k)) return;
        var v = data[k];
        if (typeof v !== "string") return;
        // Defensa extra: aunque lo que llegue de la nube incluya gente que este dispositivo
        // ya había marcado como borrada (dato viejo empujado antes de este fix), nunca la
        // dejamos resucitar en pantalla — se filtra también al recibir, no solo al enviar.
        if (k === "dharma-personas-v1" || k === "dharma-personas-v2") {
          try {
            var borrados = JSON.parse(localStorage.getItem("dharma-personas-borradas-v1") || "[]");
            if (borrados.length) {
              var lista = JSON.parse(v);
              if (Array.isArray(lista)) {
                var borradosSet = {};
                borrados.forEach(function (id) { borradosSet[id] = true; });
                v = JSON.stringify(lista.filter(function (p) { return !borradosSet[p.id]; }));
              }
            }
          } catch (e) {}
        }
        localStorage.setItem(k, v);
      });
    } finally {
      setTimeout(function () { aplicandoRemoto = false; }, 400);
    }
  }

  function empujarPendientes() {
    if (!docRef || !Object.keys(pendientes).length) return;
    var payload = Object.assign({}, pendientes);
    // Blindaje anti-resurrección: si el payload incluye la lista de personas, sacamos
    // cualquier id marcado como borrado (tumba local) ANTES de enviarlo. Esto cubre el caso
    // de una pestaña vieja que quedó abierta con datos de antes de un borrado: aunque su
    // memoria en React siga teniendo esa gente, la tumba vive en localStorage (se sincroniza
    // entre pestañas del mismo navegador) y se aplica acá, en el último paso antes de la nube.
    ["dharma-personas-v1", "dharma-personas-v2"].forEach(function (clavePersonas) {
      if (payload[clavePersonas] && typeof payload[clavePersonas] === "string") {
        try {
          var borrados = JSON.parse(localStorage.getItem("dharma-personas-borradas-v1") || "[]");
          if (borrados.length) {
            var lista = JSON.parse(payload[clavePersonas]);
            if (Array.isArray(lista)) {
              var borradosSet = {};
              borrados.forEach(function (id) { borradosSet[id] = true; });
              var filtrada = lista.filter(function (p) { return !borradosSet[p.id]; });
              if (filtrada.length !== lista.length) payload[clavePersonas] = JSON.stringify(filtrada);
            }
          }
        } catch (e) {}
      }
    });
    pendientes = {};
    payload._actualizado = firebase.firestore.FieldValue.serverTimestamp();
    docRef.set(payload, { merge: true }).then(function () {
      setEstado("Sincronizado", "ok");
    }).catch(function (e) {
      setEstado("Sin conexión — guardando solo en este dispositivo", "warn");
    });
  }

  function programarEmpuje(clave, valor) {
    pendientes[clave] = valor;
    // Blindaje anti-carrera: mientras no terminó de bajar/aplicar la versión de la nube
    // (listo === false), NUNCA programamos el envío — cualquier escritura de arranque
    // (normalizaciones, valores por defecto, etc.) quedaría "pendiente" pero se descarta
    // en cuanto se aplican los datos reales de la nube, en vez de pisarlos en una carrera.
    if (!listo) return;
    setEstado("Sincronizando…", "busy");
    clearTimeout(pushTimer);
    pushTimer = setTimeout(empujarPendientes, 350);
  }
  // Si el usuario recarga o cierra la pestaña justo después de escribir (ej: termina el
  // cuestionario de ingreso y refresca al toque), no hay que dejar el cambio a mitad de
  // camino: lo empujamos ya mismo en vez de esperar el debounce, para que la próxima
  // carga (que trae la versión de la nube) no pise el cambio recién hecho.
  function flushInmediato() { clearTimeout(pushTimer); empujarPendientes(); }
  document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") flushInmediato(); });
  window.addEventListener("pagehide", flushInmediato);

  // Intercepta toda escritura a localStorage para reflejar los cambios en la nube.
  var setItemOriginal = Storage.prototype.setItem;
  Storage.prototype.setItem = function (clave, valor) {
    setItemOriginal.call(this, clave, valor);
    if (this === window.localStorage && esSincronizable(clave) && !aplicandoRemoto) {
      programarEmpuje(clave, valor);
    }
  };

  // Aviso no invasivo cuando llega una actualización remota mientras la app está abierta.
  function hayDiferenciasReales(data) {
    // Si lo que llega del snapshot es exactamente igual a lo que ya tenemos guardado
    // (nuestro propio push haciendo eco, o el mismo dato repetido tras un reload),
    // no es un cambio real y no corresponde mostrar el aviso.
    var claves = Object.keys(data).filter(esSincronizable);
    for (var i = 0; i < claves.length; i++) {
      var k = claves[i];
      var remoto = data[k];
      if (typeof remoto !== "string") continue;
      if (localStorage.getItem(k) !== remoto) return true;
    }
    return false;
  }
  // Aplica automático apenas es seguro: si el usuario está escribiendo en un campo
  // (input/textarea/select enfocado), esperamos a que suelte el foco para no pisarle
  // lo que está tipeando — nunca hace falta tocar nada a mano.
  function escribiendoAhora() {
    var el = document.activeElement;
    if (!el) return false;
    var tag = el.tagName;
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
  }
  function aplicarAutomatico(data) {
    aplicarDatos(data);
    try { window.dispatchEvent(new CustomEvent("dharma-datos-remotos-aplicados")); } catch (e) {}
    window.dharmaToast && window.dharmaToast("Actualizado con los últimos cambios del centro", "info");
  }
  function manejarSnapshotRemoto(data) {
    if (escribiendoAhora()) {
      var reintentar = function () {
        document.removeEventListener("focusout", reintentar);
        setTimeout(function () { if (!escribiendoAhora()) aplicarAutomatico(data); else manejarSnapshotRemoto(data); }, 150);
      };
      document.addEventListener("focusout", reintentar, { once: true });
      return;
    }
    aplicarAutomatico(data);
  }

  // Backup automático cada 3 horas (antes 1x/día) — reduce la ventana de pérdida posible
  // ante un incidente a como mucho unas horas de trabajo, en vez de hasta un día entero.
  var BACKUP_COLECCION = "dharma_sync_backups";
  function fechaHoy() {
    var d = new Date();
    var p = function (n) { return String(n).padStart(2, "0"); };
    var bloque3h = Math.floor(d.getHours() / 3);
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + "-b" + bloque3h;
  }
  function intentarBackupDiario(dataActual) {
    if (!dataActual) return; // nada que respaldar todavía (centro recién creado)
    try {
      var clave = fechaHoy();
      var ref = firebase.firestore().collection(BACKUP_COLECCION).doc(clave);
      ref.get().then(function (snap) {
        if (snap.exists) return; // ya hay backup de hoy, no hacer nada
        return firebase.firestore().collection("dharma_reservas").get().then(function (resSnap) {
          var reservas = [];
          resSnap.forEach(function (d) { reservas.push(d.data()); });
          var copia = Object.assign({}, dataActual, { _reservas: reservas });
          copia._respaldadoEn = firebase.firestore.FieldValue.serverTimestamp();
          return ref.set(copia);
        }).catch(function () { /* si falla, no pasa nada: se reintenta mañana */ });
      }).catch(function () { /* sin conexión momentanea: no es crítico, se reintenta la próxima apertura */ });
    } catch (e) { /* nunca debe romper el arranque de la app */ }
  }

  function iniciar() {
    if (!window.firebase || !window.DHARMA_FIREBASE_CONFIG) {
      setEstado("Sin conexión a la nube — trabajando solo local", "warn");
      return Promise.resolve();
    }
    try {
      firebase.initializeApp(window.DHARMA_FIREBASE_CONFIG);
      docRef = firebase.firestore().collection(DOC_COLECCION).doc(DOC_ID);
    } catch (e) {
      setEstado("Sin conexión a la nube — trabajando solo local", "warn");
      return Promise.resolve();
    }

    setEstado("Buscando la última versión del centro…", "busy");

    var primeraCarga = docRef.get({ source: "server" }).then(function (snap) {
      if (snap.exists) {
        var data = snap.data();
        // si esta carga tardó más de los 4s de margen, la app ya se mostró con lo
        // que había en este dispositivo — si lo que llega ahora es distinto, hay que
        // refrescar la pantalla ya montada, o quien edite lo haría sobre datos viejos
        // y pisaría cambios recientes al guardar.
        var yaDesactualizado = hayDiferenciasReales(data);
        aplicarDatos(data);
        if (yaDesactualizado) {
          try { window.dispatchEvent(new CustomEvent("dharma-datos-remotos-aplicados")); } catch (e) {}
        }
      }
      // Descartamos cualquier escritura que haya quedado "pendiente" ANTES de tener la
      // versión real de la nube (normalizaciones de arranque sobre datos viejos, etc.):
      // ya fueron sobreescritas por aplicarDatos, empujarlas ahora resucitaría lo viejo.
      pendientes = {};
      listo = true;
      setEstado("Sincronizado", "ok");
      intentarBackupDiario(snap.exists ? snap.data() : null);
    }).catch(function () {
      // Sin conexión: acá sí queremos que lo que se venía guardando localmente se
      // termine empujando apenas haya red, así que dejamos `pendientes` intacto.
      listo = true;
      if (Object.keys(pendientes).length) { clearTimeout(pushTimer); pushTimer = setTimeout(empujarPendientes, 350); }
      setEstado("Sin conexión — trabajando con lo guardado en este dispositivo", "warn");
    });

    // Nunca bloquear la apertura más de ~4s si no hay internet.
    var conTiempoMaximo = Promise.race([
      primeraCarga,
      new Promise(function (resolve) { setTimeout(resolve, 4000); })
    ]);

    docRef.onSnapshot(function (snap) {
      if (!listo || !snap.exists) return; // el primer valor ya se resolvió arriba
      var data = snap.data();
      if (!hayDiferenciasReales(data)) return; // eco de nuestra propia escritura, o mismos datos ya aplicados
      manejarSnapshotRemoto(data);
    }, function () { /* sin conexión momentánea: no hacemos nada, se reintenta solo */ });

    return conTiempoMaximo;
  }

  window.DHARMA_SYNC_READY = iniciar();
})();
