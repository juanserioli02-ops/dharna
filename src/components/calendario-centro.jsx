// DHARMA — Calendario del centro (coach): grilla semanal, actividades y clases asignadas
const CLAVE_CALENDARIO = "dharma-calendario-v1";
const DIAS_SEM = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const DIAS_LARGO = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const MESES_CAL = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const HORA_INI = 6; // 06:00
const HORA_FIN = 20; // 20:00
const PX_HORA = 66;
const DIAS_CHIP = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const COLORES_EV = [
{ id: "teal", val: "#489DA3" },
{ id: "tealc", val: "#6EC5D1" },
{ id: "naranja", val: "#E84D23" },
{ id: "negro", val: "#1C1E20" }];


const toMin = (hhmm) => {const [h, m] = (hhmm || "0:0").split(":").map(Number);return h * 60 + (m || 0);};
const toHHMM = (min) => String(Math.floor(min / 60)).padStart(2, "0") + ":" + String(min % 60).padStart(2, "0");
const isoDe = (d) => d.toISOString().slice(0, 10);
const lunesDe = (d) => {const x = new Date(d);const day = (x.getDay() + 6) % 7;x.setDate(x.getDate() - day);x.setHours(0, 0, 0, 0);return x;};
const sumarDias = (d, n) => {const x = new Date(d);x.setDate(x.getDate() + n);return x;};

const CLAVE_REGISTRO_PERSONALIZADO = "dharma-registro-personalizado-v1";
function rpCargar() { try { return JSON.parse(localStorage.getItem(CLAVE_REGISTRO_PERSONALIZADO)) || []; } catch (e) { return []; } }
function rpGuardar(lista) { try { localStorage.setItem(CLAVE_REGISTRO_PERSONALIZADO, JSON.stringify(lista)); } catch (e) {} }
function rpDePersona(personaId) { return rpCargar().filter((r) => r.personaId === personaId).sort((a, b) => b.fecha.localeCompare(a.fecha)); }
window.RegistroPersonalizado = { cargar: rpCargar, dePersona: rpDePersona };

// layout de superposiciones por día
function layoutDia(eventos) {
  const evs = eventos.map((e) => ({ ...e, s: toMin(e.inicio), e2: toMin(e.fin) })).sort((a, b) => a.s - b.s || a.e2 - b.e2);
  const out = [];
  let cluster = [],clusterEnd = -1;
  const flush = () => {
    const lanes = [];
    cluster.forEach((ev) => {
      let lane = lanes.findIndex((end) => end <= ev.s);
      if (lane === -1) {lane = lanes.length;lanes.push(ev.e2);} else lanes[lane] = ev.e2;
      ev.lane = lane;
    });
    cluster.forEach((ev) => {ev.lanes = lanes.length;out.push(ev);});
    cluster = [];clusterEnd = -1;
  };
  evs.forEach((ev) => {
    if (cluster.length && ev.s >= clusterEnd) flush();
    cluster.push(ev);clusterEnd = Math.max(clusterEnd, ev.e2);
  });
  flush();
  return out;
}

// Horario semanal real del centro (cartel "HORARIOS") — se usa una sola vez, como
// semilla, si el calendario todavía está vacío en este dispositivo. No pisa nada
// si ya hay eventos cargados.
const SEED_ANCLA = "2025-01-06"; // un lunes cualquiera, bien atrás — repite desde siempre
function seedHorario() {
  const ev = (dia, hora, dur, titulo, opts) => ({
    id: "seed_" + dia + "_" + hora + "_" + titulo.replace(/\s+/g, ""), fecha: SEED_ANCLA, inicio: toHHMM(hora * 60), fin: toHHMM((hora + dur) * 60),
    titulo, claseId: "", sesionId: "", coach: "", nota: "", repite: [dia],
    color: opts.color, privado: !!opts.privado, cupo: opts.privado ? "" : (opts.categoria === "Personalizado en grupo" ? 4 : 10), categoria: opts.categoria || "Grupales"
  });
  const teal = "#489DA3", tealc = "#6EC5D1", naranja = "#E84D23", negro = "#1C1E20";
  return [
    ev(0, 7, 1, "Personalizado en grupo", { color: teal, categoria: "Personalizado en grupo" }),
    ev(0, 8, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),
    ev(0, 9, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),
    ev(0, 18, 1, "Surfistas Juveniles", { color: negro, cupo: 10 }),
    ev(0, 19, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),

    ev(1, 7, 1, "Musculación", { color: tealc, cupo: 10 }),
    ev(1, 8, 1, "Personalizado en grupo", { color: teal, categoria: "Personalizado en grupo" }),
    ev(1, 9, 1, "Yoga", { color: tealc, cupo: 10 }),
    ev(1, 18, 1, "Personalizado en grupo", { color: teal, categoria: "Personalizado en grupo" }),
    ev(1, 19, 1, "Musculación", { color: tealc, cupo: 10 }),

    ev(2, 7, 1, "Personalizado en grupo", { color: teal, categoria: "Personalizado en grupo" }),
    ev(2, 8, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),
    ev(2, 9, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),
    ev(2, 18, 1, "Surfistas Juveniles", { color: negro, cupo: 10 }),
    ev(2, 19, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),

    ev(3, 7, 1, "Musculación", { color: tealc, cupo: 10 }),
    ev(3, 8, 1, "Personalizado en grupo", { color: teal, categoria: "Personalizado en grupo" }),
    ev(3, 17, 1, "Yoga & Breathwork Surfistas", { color: naranja, cupo: 10 }),
    ev(3, 18, 1, "Personalizado en grupo", { color: teal, categoria: "Personalizado en grupo" }),
    ev(3, 19, 1, "Musculación", { color: tealc, cupo: 10 }),

    ev(4, 8, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),
    ev(4, 9, 1, "Pilates", { color: naranja, cupo: 10 }),
    ev(4, 12, 1, "Levantamiento Olímpico", { color: "#C9A227", cupo: 10 }),
    ev(4, 17, 1, "Niños y Adolescentes", { color: negro, cupo: 10 }),
    ev(4, 18, 1, "Fuerza y Potencia", { color: naranja, cupo: 10 }),

    ev(5, 10, 1, "Musculación", { color: tealc, cupo: 10 })
  ];
}

function Calendario({ clases, secciones, personas, planes, socios, onGuardarSocio, coachActual }) {
  const [eventos, setEventosRaw] = React.useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem(CLAVE_CALENDARIO)) || [];
      if (guardados.length) {
        // normaliza cupos y migra los viejos bloques "Personalizado" privados a Personalizado en grupo reservable (cupo 4) — una sola vez
        if (!localStorage.getItem("dharma-cal-cupos-normalizados-v2")) {
          const normalizados = guardados.map((e) => {
            if (e.privado && e.titulo === "Personalizado" && !e.personaId) {
              return { ...e, privado: false, categoria: "Personalizado en grupo", cupo: 4 };
            }
            if (e.privado) return e;
            return { ...e, categoria: e.categoria || "Grupales", cupo: (e.categoria || "Grupales") === "Personalizado en grupo" ? 4 : 10 };
          });
          try { localStorage.setItem(CLAVE_CALENDARIO, JSON.stringify(normalizados)); localStorage.setItem("dharma-cal-cupos-normalizados-v2", "1"); } catch (e2) {}
          return normalizados;
        }
        return guardados;
      }
      const seed = seedHorario();
      try { localStorage.setItem(CLAVE_CALENDARIO, JSON.stringify(seed)); localStorage.setItem("dharma-cal-cupos-normalizados-v2", "1"); } catch (e2) {}
      return seed;
    } catch (e) {return [];}
  });
  const guardar = (next) => {setEventosRaw(next);try {localStorage.setItem(CLAVE_CALENDARIO, JSON.stringify(next));} catch (e) {}};
  const [reservas, setReservas] = React.useState(() => window.Reservas.cargar());
  const refrescarReservas = () => setReservas(window.Reservas.cargar());
  React.useEffect(() => {
    window.addEventListener("dharma-reservas-actualizadas", refrescarReservas);
    return () => window.removeEventListener("dharma-reservas-actualizadas", refrescarReservas);
  }, []);
  const [refDate, setRefDate] = React.useState(() => lunesDe(new Date()));
  const [editor, setEditor] = React.useState(null); // {evento} nuevo o existente

  const lunes = refDate;
  const dias = Array.from({ length: 7 }, (_, i) => sumarDias(lunes, i));
  const hoyIso = isoDe(new Date());
  const horas = [];
  for (let h = HORA_INI; h <= HORA_FIN; h++) horas.push(h);
  // sin scroll: la grilla se estira/encoge para entrar en la ventana
  const grillaRef = React.useRef(null);
  const [pxHora, setPxHora] = React.useState(PX_HORA);
  React.useEffect(() => {
    const calc = () => {
      const el = grillaRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top;
      const cab = el.querySelector(".cal-cabecera");
      const disponible = window.innerHeight - top - (cab ? cab.offsetHeight : 0) - 26;
      setPxHora(Math.max(24, disponible / (HORA_FIN - HORA_INI)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const alto = (HORA_FIN - HORA_INI) * pxHora;

  const upsert = (ev) => {
    // personalizado 1 a 1: si se asignó un alumno a esta ocurrencia y todavía no se registró, descuenta 1 clase y queda en su historial
    if (ev.categoria === "Personalizado 1 a 1" && ev.personaId) {
      const ocurrenciaFecha = ev.ocurrencia || ev.fecha;
      const yaRegistrado = rpCargar().some((r) => r.eventoId === ev.id && r.fecha === ocurrenciaFecha);
      if (!yaRegistrado) {
        const persona = (personas || []).find((p) => p.id === ev.personaId);
        const sub = socios && socios[ev.personaId];
        if (sub && sub.creditos !== undefined && sub.creditos !== null) {
          const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
          if (plan && plan.tipo !== "ilimitada") onGuardarSocio(ev.personaId, { ...sub, creditos: Math.max(0, sub.creditos - 1) });
        }
        rpGuardar([...rpCargar(), { id: "rp" + Date.now(), eventoId: ev.id, personaId: ev.personaId, fecha: ocurrenciaFecha, titulo: ev.titulo || "Personalizado 1 a 1", coach: ev.coach || "" }]);
        window.dharmaToast && persona && window.dharmaToast("Se descontó 1 clase a " + persona.nombre, "ok");
      }
    }
    const existe = eventos.some((e) => e.id === ev.id);
    guardar(existe ? eventos.map((e) => e.id === ev.id ? ev : e) : [...eventos, ev]);
    setEditor(null);
  };
  const borrar = (id) => {guardar(eventos.filter((e) => e.id !== id));setEditor(null);};

  const cargarHorarioReal = () => {
    const seed = seedHorario();
    const idsActuales = new Set(eventos.map((e) => e.id));
    const nuevos = seed.filter((e) => !idsActuales.has(e.id));
    if (!nuevos.length) { window.dharmaToast && window.dharmaToast("El horario del centro ya está cargado", "ok"); return; }
    guardar([...eventos, ...nuevos]);
    window.dharmaToast && window.dharmaToast("Horario del centro cargado — " + nuevos.length + " clases", "ok");
  };

  const nuevoEn = (fecha, min) => {
    const snap = Math.round(min / 30) * 30;
    setEditor({ id: "ev" + Date.now(), fecha, ocurrencia: fecha, inicio: toHHMM(snap), fin: toHHMM(Math.min(HORA_FIN * 60, snap + 60)), titulo: "", claseId: "", sesionId: "", coach: coachActual || "", color: "#489DA3", repite: [], nota: "", privado: false, cupo: 10, categoria: "Grupales", nuevo: true });
  };
  const clickColumna = (e, fecha) => {
    if (e.target.closest(".cal-evento")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const min = HORA_INI * 60 + (e.clientY - rect.top) / pxHora * 60;
    nuevoEn(fecha, Math.max(HORA_INI * 60, Math.min(HORA_FIN * 60 - 30, min)));
  };

  // eventos visibles en un día: puntuales (misma fecha) + recurrentes (mismo día de semana, desde su fecha)
  const eventosDelDia = (isoDay, wd) => eventos.filter((e) => {
    const rep = e.repite || [];
    if (rep.length) return rep.includes(wd) && e.fecha <= isoDay;
    return e.fecha === isoDay;
  });

  const rango = lunes.getDate() + " " + MESES_CAL[lunes.getMonth()].slice(0, 3) + " – " + sumarDias(lunes, 6).getDate() + " " + MESES_CAL[sumarDias(lunes, 6).getMonth()].slice(0, 3) + " " + sumarDias(lunes, 6).getFullYear();

  return (
    <main className="contenido calendario-contenido" data-screen-label="Calendario del centro">
      <div className="encabezado-vista cal-encabezado">
        <div className="cal-nav">
          <button className="cal-hoy" onClick={cargarHorarioReal} title="Agrega el horario semanal real del centro (no duplica ni borra nada)">Cargar horario</button>
          <button className="cal-nav-btn" onClick={() => setRefDate(sumarDias(lunes, -7))} aria-label="Semana anterior">‹</button>
          <button className="cal-hoy" onClick={() => setRefDate(lunesDe(new Date()))}>Hoy</button>
          <button className="cal-nav-btn" onClick={() => setRefDate(sumarDias(lunes, 7))} aria-label="Semana siguiente">›</button>
          <span className="cal-rango">{rango}</span>
        </div>
      </div>

      <div className="cal-grilla" ref={grillaRef}>
        <div className="cal-cabecera">
          <div className="cal-gutter-cab"></div>
          {dias.map((d, i) =>
          <div key={i} className={"cal-dia-cab" + (isoDe(d) === hoyIso ? " hoy" : "")}>
              <span className="cdc-dia">{DIAS_SEM[i]}</span>
              <span className="cdc-num">{d.getDate()}</span>
            </div>
          )}
        </div>

        <div className="cal-cuerpo">
          <div className="cal-gutter" style={{ height: alto }}>
            {horas.map((h) =>
            <div className="cal-hora" key={h} style={{ top: (h - HORA_INI) * pxHora }}>{String(h).padStart(2, "0")}:00</div>
            )}
          </div>
          {dias.map((d, i) => {
            const delDia = layoutDia(eventosDelDia(isoDe(d), i));
            return (
              <div className={"cal-columna" + (isoDe(d) === hoyIso ? " hoy" : "")} key={i} style={{ height: alto }} onClick={(e) => clickColumna(e, isoDe(d))}>
                {horas.map((h) => <div className="cal-linea" key={h} style={{ top: (h - HORA_INI) * pxHora }}></div>)}
                {delDia.map((ev) => {
                  const top = (ev.s - HORA_INI * 60) / 60 * pxHora;
                  const height = Math.max(18, (ev.e2 - ev.s) / 60 * pxHora - 2);
                  const w = 100 / ev.lanes;
                  const clase = ev.claseId ? clases.find((c) => c.id === ev.claseId) : null;
                  const compacto = height < 50 || ev.lanes > 1;
                  const muyCompacto = height < 32;
                  const sesionNom = clase && ev.sesionId ? (clase.sesiones.find((s) => s.id === ev.sesionId) || {}).nombre || "" : "";
                  return (
                    <button
                      key={ev.id}
                      className={"cal-evento" + (compacto ? " compacto" : "") + (muyCompacto ? " mini" : "")}
                      style={{ top, height, left: "calc(" + ev.lane * w + "% + 2px)", width: "calc(" + w + "% - 4px)", background: ev.color || "#489DA3" }}
                      onClick={(e) => {e.stopPropagation();setEditor({ ...ev, ocurrencia: isoDe(d) });}}>
                      
                      {muyCompacto ? (
                        <span className="ce-titulo">{ev.titulo || (clase ? clase.nombre : "Actividad")}</span>
                      ) : (
                        <>
                          <span className="ce-titulo">{ev.titulo || (clase ? clase.nombre : "Actividad")}</span>
                          <span className="ce-top">
                            <span className="ce-hora">{ev.inicio}</span>
                            {(ev.repite || []).length ? <span className="ce-repite" title="Se repite">↻</span> : null}
                            {ev.privado ? <span className="ce-privado" title={ev.categoria === "Personalizado 1 a 1" ? "Personalizado 1 a 1" : "Privado"}>{ev.categoria === "Personalizado 1 a 1" ? "🧑‍🏫" : "🔒"}</span> : ev.cupo ? <span className="ce-cupo" title="Reservas">{window.Reservas.deOcurrencia(reservas, ev.id, isoDe(d)).length}/{ev.cupo}</span> : null}
                          </span>
                          {(coachDeDia(ev, i, isoDe(d))) && !compacto ? <span className="ce-coach">{coachDeDia(ev, i, isoDe(d))}</span> : null}
                        </>
                      )}
                    </button>);

                })}
              </div>);

          })}
        </div>
      </div>

      {editor ?
      <EventoEditor
        evento={editor}
        clases={clases}
        secciones={secciones}
        personas={personas}
        planes={planes}
        socios={socios}
        reservas={reservas}
        onGuardarSocio={onGuardarSocio}
        onReservasChange={refrescarReservas}
        onGuardar={upsert}
        onBorrar={borrar}
        onCerrar={() => setEditor(null)}>
      </EventoEditor> :
      null}
    </main>);

}

/* ---------- editor de actividad / clase asignada ---------- */
function EventoEditor({ evento, clases, secciones, personas, planes, socios, reservas, onGuardarSocio, onReservasChange, onGuardar, onBorrar, onCerrar }) {
  const [e, setE] = React.useState({ ...evento });
  const set = (k, v) => setE((p) => ({ ...p, [k]: v }));
  React.useEffect(() => {
    const esc = (ev) => {if (ev.key === "Escape") onCerrar();};
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onCerrar]);
  // Mismo blindaje que el editor de clases: mientras esto está abierto, la raíz no debe
  // remontar toda la app por una sincronización de otro dispositivo.
  React.useEffect(() => {
    window.__dharmaEditorAbierto = (window.__dharmaEditorAbierto || 0) + 1;
    return () => {
      window.__dharmaEditorAbierto = Math.max(0, (window.__dharmaEditorAbierto || 1) - 1);
      if (window.__dharmaEditorAbierto === 0) { try { window.dispatchEvent(new Event("dharma-editor-cerrado")); } catch (e) {} }
    };
  }, []);

  const ocurrencia = evento.ocurrencia || evento.fecha;
  const ocurrenciaTxt = (() => {const [y, m, d] = ocurrencia.split("-").map(Number);const fecha = new Date(y, m - 1, d);return DIAS_LARGO[(fecha.getDay() + 6) % 7] + " " + d + " de " + MESES_CAL[m - 1];})();
  const listaReservados = (personas && reservas) ? window.Reservas.deOcurrencia(reservas, evento.id, ocurrencia)
    .map((r) => ({ ...r, persona: personas.find((p) => p.id === r.personaId) || { id: r.personaId, nombre: "Persona no encontrada (id: " + r.personaId + ")", perfilFaltante: true } })) : [];

  const [canceladas, setCanceladas] = React.useState(() => window.Reservas.cancelacionesDeOcurrencia(evento.id, ocurrencia));
  React.useEffect(() => {
    if (!window.firebase || !window.firebase.apps || !window.firebase.apps.length) return;
    firebase.firestore().collection("dharma_cancelaciones").where("eventoId", "==", evento.id).where("fecha", "==", ocurrencia).get()
      .then((snap) => {
        const remotas = snap.docs.map((d) => d.data());
        const locales = window.Reservas.cancelacionesDeOcurrencia(evento.id, ocurrencia);
        const porId = {}; [...locales, ...remotas].forEach((c) => { porId[c.id] = c; });
        setCanceladas(Object.values(porId).sort((a, b) => b.canceladaEn.localeCompare(a.canceladaEn)));
      }).catch(() => {});
  }, [evento.id, ocurrencia]);
  const canceladasConPersona = canceladas.map((c) => ({ ...c, persona: (personas || []).find((p) => p.id === c.personaId) || { nombre: "Persona no encontrada" } }));

  const quitarReserva = (r) => {
    if (!window.confirm("¿Quitar la reserva de " + r.persona.nombre + "? Se le devuelve el crédito.")) return;
    const sub = socios[r.personaId];
    if (sub && sub.creditos !== undefined && sub.creditos !== null) {
      const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
      if (plan && plan.tipo !== "ilimitada") onGuardarSocio(r.personaId, { ...sub, creditos: sub.creditos + 1 });
    }
    window.Reservas.quitar(reservas, r.id);
    onReservasChange();
  };

  const [buscaAlumno, setBuscaAlumno] = React.useState("");
  const yaReservadosIds = new Set(listaReservados.map((r) => r.personaId));
  const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const qNorm = norm(buscaAlumno);
  const sugeridos = qNorm.length >= 2 ? (personas || []).filter((p) => !yaReservadosIds.has(p.id) && norm(p.nombre).includes(qNorm)).slice(0, 6) : [];
  const agregarAlumno = (persona) => {
    const libres = window.Reservas.cupoLibreEn(e, reservas, ocurrencia);
    if (e.cupo && libres <= 0) { window.dharmaToast && window.dharmaToast("Esa clase ya está a cupo completo", "borrado"); return; }
    const sub = socios[persona.id];
    const plan = window.Membresia ? window.Membresia.planDe(planes, sub) : null;
    if (plan && plan.tipo !== "ilimitada" && sub && sub.creditos !== undefined && sub.creditos !== null) {
      if (sub.creditos <= 0 && !window.confirm(persona.nombre + " no tiene clases disponibles en su plan. ¿Agregar igual?")) return;
      onGuardarSocio(persona.id, { ...sub, creditos: Math.max(0, sub.creditos - 1) });
    }
    window.Reservas.reservar(reservas, evento.id, ocurrencia, persona.id, e.cupo, () => {
      // si perdió la carrera por el cupo en el servidor, devolver el crédito descontado acá arriba
      if (plan && plan.tipo !== "ilimitada" && sub && sub.creditos !== undefined && sub.creditos !== null) {
        onGuardarSocio(persona.id, { ...sub, creditos: sub.creditos });
      }
    });
    setBuscaAlumno("");
    onReservasChange();
    window.dharmaToast && window.dharmaToast(persona.nombre + " agregado a la clase", "ok");
  };

  const claseSel = e.claseId ? clases.find((c) => c.id === e.claseId) : null;
  const elegirClase = (id) => {
    const c = clases.find((x) => x.id === id);
    setE((p) => ({ ...p, claseId: id, sesionId: id ? (c.sesiones[0] || {}).id || "" : "", titulo: id ? "" : p.titulo, coach: id && c.coach && c.coach !== "—" ? c.coach : p.coach }));
  };

  const valido = toMin(e.fin) > toMin(e.inicio) && (e.titulo.trim() || e.claseId);
  const rep = e.repite || [];
  const toggleDia = (i) => set("repite", rep.includes(i) ? rep.filter((x) => x !== i).sort() : [...rep, i].sort());
  const fechaTxt = (() => {const [y, m, d] = e.fecha.split("-").map(Number);const fecha = new Date(y, m - 1, d);return DIAS_LARGO[(fecha.getDay() + 6) % 7] + " " + d + " de " + MESES_CAL[m - 1];})();
  const repTxt = rep.length ? "Se repite todas las semanas · " + rep.map((i) => DIAS_CHIP[i]).join(" · ") : fechaTxt;

  return (
    <div>
      <div className="telon" onClick={onCerrar}></div>
      <div className="mini-modal evento-modal">
        <header className="evento-modal-cab">
          <h3>{evento.nuevo ? "Nueva actividad" : "Editar actividad"}</h3>
          <span className="evento-fecha">{repTxt}</span>
        </header>

        <div className="evento-cuerpo evento-cuerpo-2col">
          <div className="evento-col">
            <div className="campo">
              <span>Asignar una clase de la biblioteca</span>
              <select value={e.claseId} onChange={(ev) => elegirClase(ev.target.value)}>
                <option value="">— Actividad libre (sin clase) —</option>
                {secciones.map((s) => {
                  const cls = clases.filter((c) => (window.__getSeccion ? window.__getSeccion(c) : c.seccion) === s.id);
                  if (!cls.length) return null;
                  return (
                    <optgroup key={s.id} label={s.nombre}>
                      {cls.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                    </optgroup>);

                })}
                {clases.filter((c) => !secciones.some((s) => (window.__getSeccion ? window.__getSeccion(c) : c.seccion) === s.id)).map((c) =>
                <option key={c.id} value={c.id}>{c.nombre}</option>
                )}
              </select>
            </div>

            {claseSel ? null :
            <label className="campo">
                <span>Nombre de la actividad</span>
                <input autoFocus value={e.titulo} onChange={(ev) => set("titulo", ev.target.value)} placeholder="Ej: Alquiler de sala, Reunión de coaches…"></input>
              </label>
            }

            <div className="form-fila-2">
              <label className="campo"><span>Desde</span><input type="time" value={e.inicio} onChange={(ev) => set("inicio", ev.target.value)}></input></label>
              <label className="campo"><span>Hasta</span><input type="time" value={e.fin} onChange={(ev) => set("fin", ev.target.value)}></input></label>
            </div>

            <div className="campo">
              <span>Repetir</span>
              <div className="repetir-dias">
                {DIAS_CHIP.map((lbl, i) =>
                <button key={i} type="button" className={"rep-dia" + (rep.includes(i) ? " activo" : "")} onClick={() => toggleDia(i)}>{lbl}</button>
                )}
              </div>
              <span className="repetir-hint">{rep.length ? "Aparece cada semana en los días marcados, desde esta fecha." : "Una sola vez. Tocá los días para repetir cada semana."}</span>
            </div>

            {rep.length ? (
              <div className="campo">
                <span>Coach de este día ({ocurrenciaTxt}) <em className="campo-hint">— excepción puntual, ej. suplencia por enfermedad; no cambia el resto de la serie</em></span>
                {(() => {
                  const wdOcurrencia = (() => { const [y, m, d] = ocurrencia.split("-").map(Number); return (new Date(y, m - 1, d).getDay() + 6) % 7; })();
                  const excepciones = e.excepcionesCoach || {};
                  const hayExcepcion = excepciones[ocurrencia] !== undefined;
                  const habitual = e.coachPorDia && e.coachPorDia[wdOcurrencia] !== undefined ? e.coachPorDia[wdOcurrencia] : (e.coach || "");
                  const val = hayExcepcion ? excepciones[ocurrencia] : habitual;
                  const listaCoaches = window.Coaches ? window.Coaches.cargar().filter((c) => c.activo) : [];
                  const setExcepcion = (v) => set("excepcionesCoach", { ...excepciones, [ocurrencia]: v });
                  const quitarExcepcion = () => { const next = { ...excepciones }; delete next[ocurrencia]; set("excepcionesCoach", next); };
                  return (
                    <div className="cpd-fila">
                      {listaCoaches.length > 0 ? (
                        <select value={val} onChange={(ev) => setExcepcion(ev.target.value)}>
                          <option value="">— Elegir coach —</option>
                          {listaCoaches.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                          {val && !listaCoaches.some((c) => c.nombre === val) ? <option value={val}>{val}</option> : null}
                        </select>
                      ) : (
                        <input value={val} onChange={(ev) => setExcepcion(ev.target.value)} placeholder="Coach o responsable"></input>
                      )}
                      {hayExcepcion ? <button type="button" className="btn-secundario" onClick={quitarExcepcion}>Quitar excepción</button> : null}
                    </div>
                  );
                })()}
              </div>
            ) : null}

            <div className="form-fila-2">
              {rep.length > 1 ? (
                <div className="campo campo-ancho">
                  <span>A cargo de <em className="campo-hint">— podés poner un coach distinto por día</em></span>
                  <div className="coach-por-dia">
                    {rep.map((i) => {
                      const val = e.coachPorDia && e.coachPorDia[i] !== undefined ? e.coachPorDia[i] : (e.coach || "");
                      const setCoachDia = (v) => set("coachPorDia", { ...(e.coachPorDia || {}), [i]: v });
                      const listaCoaches = window.Coaches ? window.Coaches.cargar().filter((c) => c.activo) : [];
                      return (
                        <div className="cpd-fila" key={i}>
                          <span className="cpd-dia">{DIAS_CHIP[i]}</span>
                          {listaCoaches.length > 0 ? (
                            <select value={val} onChange={(ev) => setCoachDia(ev.target.value)}>
                              <option value="">— Elegir coach —</option>
                              {listaCoaches.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                              {val && !listaCoaches.some((c) => c.nombre === val) ? <option value={val}>{val}</option> : null}
                            </select>
                          ) : (
                            <input value={val} onChange={(ev) => setCoachDia(ev.target.value)} placeholder="Coach o responsable"></input>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <label className="campo"><span>A cargo de</span>
                  {(window.Coaches && window.Coaches.cargar().filter((c) => c.activo).length > 0) ? (
                    <select value={e.coach} onChange={(ev) => set("coach", ev.target.value)}>
                      <option value="">— Elegir coach —</option>
                      {window.Coaches.cargar().filter((c) => c.activo).map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      {e.coach && !window.Coaches.cargar().some((c) => c.nombre === e.coach) ? <option value={e.coach}>{e.coach}</option> : null}
                    </select>
                  ) : (
                    <input value={e.coach} onChange={(ev) => set("coach", ev.target.value)} placeholder="Coach o responsable"></input>
                  )}
                </label>
              )}
              <div className="campo">
                <span>Color</span>
                <div className="evento-colores">
                  {COLORES_EV.map((c) =>
                  <button key={c.id} type="button" className={"ev-color" + (e.color === c.val ? " activo" : "")} style={{ background: c.val }} onClick={() => set("color", c.val)}></button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="evento-col">
            <div className="campo">
              <span>Visibilidad para alumnos</span>
              <div className="evento-visibilidad">
                <button type="button" className={"ev-vis" + (!e.privado ? " activo" : "")} onClick={() => { set("privado", false); if (e.categoria === "Personalizado 1 a 1") set("categoria", "Grupales"); set("personaId", ""); }}>Reservable</button>
                <button type="button" className={"ev-vis" + (e.categoria === "Personalizado 1 a 1" ? " activo" : "")} onClick={() => { set("privado", true); set("categoria", "Personalizado 1 a 1"); }}>Personalizado 1 a 1</button>
                <button type="button" className={"ev-vis" + (e.privado && e.categoria !== "Personalizado 1 a 1" ? " activo" : "")} onClick={() => { set("privado", true); if (e.categoria === "Personalizado 1 a 1") set("categoria", ""); set("personaId", ""); }}>Privado (no lo ven)</button>
              </div>
              {e.categoria === "Personalizado 1 a 1" ? (
                <label className="campo" style={{ marginTop: 10 }}>
                  <span>Alumno <em className="campo-hint">— descuenta 1 clase al guardar</em></span>
                  <select value={e.personaId || ""} onChange={(ev) => set("personaId", ev.target.value)} required>
                    <option value="">— Elegir alumno —</option>
                    {(personas || []).slice().sort((a, b) => a.nombre.localeCompare(b.nombre)).map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                  </select>
                </label>
              ) : null}
              {!e.privado ? (
                <label className="campo" style={{ marginTop: 10 }}>
                  <span>Cupo <em className="campo-hint">— vacío = sin límite</em></span>
                  <input type="number" min="1" value={e.cupo} onChange={(ev) => set("cupo", ev.target.value)} placeholder="Ej: 12" style={{ maxWidth: 120 }}></input>
                </label>
              ) : null}
              {!e.privado ? (
                <label className="campo" style={{ marginTop: 10 }}>
                  <span>Categoría de plan que puede reservarla</span>
                  <select value={e.categoria || "Grupales"} onChange={(ev) => { const cat = ev.target.value; set("categoria", cat); if (!e.cupo || e.cupo === 10 || e.cupo === 4) set("cupo", cat === "Personalizado en grupo" ? 4 : 10); }}>
                    <option value="Grupales">Grupales (yoga, musculación, fuerza y potencia, etc.)</option>
                    <option value="Personalizado en grupo">Personalizado en grupo</option>
                  </select>
                </label>
              ) : null}
            </div>

            {!evento.nuevo && !e.privado ? (
              <div className="campo">
                <span>Reservados — {ocurrenciaTxt} <em className="campo-hint">{listaReservados.length}{e.cupo ? " / " + e.cupo : ""}</em></span>
                {listaReservados.length === 0 ? <p className="vacio" style={{ margin: 0 }}>Nadie reservó todavía.</p> : (
                  <div className="evento-reservados">
                    {listaReservados.map((r) => (
                      <div className="er-fila" key={r.id}>
                        <span style={r.persona.perfilFaltante ? { color: "var(--acento)" } : undefined}>{r.persona.nombre}</span>
                        <button type="button" onClick={() => quitarReserva(r)}>Quitar</button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="er-agregar" style={{ position: "relative" }}>
                  <input type="text" value={buscaAlumno} onChange={(ev) => setBuscaAlumno(ev.target.value)} placeholder="Agregar alumno a esta clase…" style={{ marginTop: 8 }}></input>
                  {sugeridos.length ? (
                    <div className="card-menu" style={{ left: 0, right: 0, top: "100%" }}>
                      {sugeridos.map((p) => (
                        <button type="button" key={p.id} onClick={() => agregarAlumno(p)}>{p.nombre}</button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {!evento.nuevo && !e.privado && canceladasConPersona.length ? (
              <div className="campo">
                <span>Se desanotaron de esta clase <em className="campo-hint">{canceladasConPersona.length}</em></span>
                <div className="evento-cancelaciones">
                  {canceladasConPersona.map((c) => (
                    <div className="ec-fila" key={c.id}>
                      <span className="ec-nombre">{c.persona.nombre}</span>
                      <span className="ec-hora">{new Date(c.canceladaEn).toLocaleString("es-CR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}</span>
                      <span className={"ec-estado" + (c.reembolsada ? " ok" : " cobrada")}>{c.reembolsada ? "A tiempo — sin cobro" : "Fuera de plazo — clase descontada"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <label className="campo">
              <span>Nota para el coach de hoy <em className="campo-hint">— la ve quien abra esta clase</em></span>
              <textarea value={e.nota || ""} onChange={(ev) => set("nota", ev.target.value)} rows={3} placeholder="Ej: bajale la carga a Juan, viene de una lesión…"></textarea>
            </label>
          </div>
        </div>

        <div className="evento-pie">
          {!evento.nuevo ? <button className="btn-secundario peligro" onClick={() => onBorrar(e.id)}>Eliminar{rep.length ? " serie" : ""}</button> : <span></span>}
          <div className="evento-pie-der">
            <button className="btn-secundario" onClick={onCerrar}>Cancelar</button>
            <button className="btn-primario" disabled={!valido} onClick={() => onGuardar({ ...e, cupo: e.cupo ? Number(e.cupo) : null, nuevo: undefined, ocurrencia: undefined })}>Guardar</button>
          </div>
        </div>
      </div>
    </div>);

}

/* ---------- horas por coach: cuenta ocurrencias reales de clases (recurrentes incluidas)
   en un rango de fechas, agrupadas por el coach asignado ACTUALMENTE al evento. Si se
   cambia el coach de una clase, el conteo se actualiza solo la próxima vez que se calcula
   — no queda "pegado" a quien la daba antes. Uso: Inicio del coach (su semana/mes) y
   Admin → Coaches (planilla semanal + total mensual para liquidar). ---------- */
function ocurrenciasEnRango(eventos, desdeISO, hastaISO) {
  const out = [];
  let cur = new Date(desdeISO + "T00:00:00");
  const fin = new Date(hastaISO + "T00:00:00");
  while (cur <= fin) {
    const isoDay = isoDe(cur);
    const wd = (cur.getDay() + 6) % 7;
    (eventos || []).forEach((e) => {
      if (!e || !e.inicio || !e.fin) return;
      const rep = e.repite || [];
      const coincide = rep.length ? (rep.includes(wd) && e.fecha <= isoDay) : (e.fecha === isoDay);
      if (coincide) out.push({ ...e, ocurrencia: isoDay, minutos: Math.max(0, toMin(e.fin) - toMin(e.inicio)), coach: coachDeDia(e, wd, isoDay) });
    });
    cur = sumarDias(cur, 1);
  }
  return out.sort((a, b) => a.ocurrencia.localeCompare(b.ocurrencia) || toMin(a.inicio) - toMin(b.inicio));
}
// Distintos días de una misma clase repetida pueden tener un coach distinto a cargo
// (ej: sub 14 los martes lo da uno, los viernes otro) — coachPorDia guarda esa excepción
// por día de semana. Además, excepcionesCoach guarda un cambio puntual para UNA fecha
// concreta (ej: el profe habitual se enfermó ese día) sin tocar el resto de la serie.
// Prioridad: excepción de fecha > coach por día de semana > coach general del evento.
function coachDeDia(e, wd, isoDay) {
  if (e && e.excepcionesCoach && isoDay && e.excepcionesCoach[isoDay] !== undefined) return e.excepcionesCoach[isoDay];
  if (e && e.coachPorDia && e.coachPorDia[wd] !== undefined) return e.coachPorDia[wd];
  return (e && e.coach) || "";
}
function resumenPorCoach(ocurrencias) {
  const map = {};
  (ocurrencias || []).forEach((o) => {
    const key = (o.coach || "").trim() || "Sin asignar";
    if (!map[key]) map[key] = { coach: key, cantidad: 0, minutos: 0 };
    map[key].cantidad += 1;
    map[key].minutos += o.minutos;
  });
  return Object.values(map).sort((a, b) => b.cantidad - a.cantidad);
}
window.CalendarioHelpers = { ocurrenciasEnRango, resumenPorCoach, coachDeDia, lunesDe, sumarDias, isoDe, toMin, DIAS_LARGO, MESES_CAL };

Object.assign(window, { Calendario });