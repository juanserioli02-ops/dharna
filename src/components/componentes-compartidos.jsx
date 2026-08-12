// DHARMA — componentes compartidos: iconos, avatar, chips, perfil
const { useState, useEffect } = React;

/* ---------- nav superior con overflow a "Más ⋯" (medición real de anchos) ----------
   Usado por la topbar del coach y la del alumno: nunca corta un botón a la mitad,
   colapsa los que no entran en un menú desplegable. */
function OverflowNav({ items, activo, onIr }) {
  const [visibles, setVisibles] = useState(items.length);
  const [abierto, setAbierto] = useState(false);
  const masRef = React.useRef(null);
  const slotRef = React.useRef(null);
  const probeRef = React.useRef(null);

  useEffect(() => {
    const slot = slotRef.current, probe = probeRef.current;
    if (!slot || !probe) return;
    const GAP = 4;
    const recalcular = () => {
      const disponible = slot.clientWidth;
      const botones = [...probe.children];
      let usado = 0, n = 0;
      for (let i = 0; i < items.length; i++) {
        const w = botones[i].getBoundingClientRect().width;
        if (usado + w <= disponible) { usado += w + GAP; n++; } else break;
      }
      setVisibles(Math.max(0, n));
    };
    recalcular();
    const ro = new ResizeObserver(recalcular);
    ro.observe(slot);
    window.addEventListener("resize", recalcular);
    return () => { ro.disconnect(); window.removeEventListener("resize", recalcular); };
  }, []);
  useEffect(() => {
    if (!abierto) return;
    const fuera = (e) => { if (masRef.current && !masRef.current.contains(e.target)) setAbierto(false); };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto]);

  const esActivo = (it) => it.tipo === activo || (it.tambien && it.tambien.includes(activo));

  return (
    <>
      <nav className="topnav" ref={slotRef}>
        {items.slice(0, visibles).map((it) => (
          <button key={it.tipo} className={esActivo(it) ? "activo" : ""} onClick={() => onIr(it.tipo)}>{it.label}</button>
        ))}
      </nav>
      {items.length > visibles ? (
        <div className="topnav-mas-wrap" ref={masRef}>
          <button className={"topnav-mas" + (abierto ? " activo" : "") + (items.slice(visibles).some(esActivo) ? " tiene-activo" : "")} onClick={() => setAbierto((v) => !v)}>Más ⋯</button>
          {abierto ? (
            <div className="topnav-mas-menu">
              {items.slice(visibles).map((it) => (
                <button key={it.tipo} className={esActivo(it) ? "activo" : ""} onClick={() => { onIr(it.tipo); setAbierto(false); }}>{it.label}</button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      <nav className="topnav topnav-probe" ref={probeRef} aria-hidden="true">
        {items.map((it) => <button key={it.tipo}>{it.label}</button>)}
        <button className="topnav-mas">Más ⋯</button>
      </nav>
    </>
  );
}

/* ---------- barra lateral (desktop): reemplaza el nav superior, colapsable ---------- */
function Sidebar({ items, activo, onIr, subtitulo = "ENTRENAMIENTO", pie = null }) {
  const [colapsadoPref, setColapsadoRaw] = useState(() => { try { return localStorage.getItem("dharma-sidebar-colapsado") === "1"; } catch (e) { return false; } });
  const setColapsado = (v) => { setColapsadoRaw(v); try { localStorage.setItem("dharma-sidebar-colapsado", v ? "1" : "0"); } catch (e) {} };
  // tablet (641–1024px): rail compacto automático — íconos solos, sin botón de colapsar
  const [angosto, setAngosto] = useState(() => { try { return window.matchMedia("(max-width: 1024px)").matches; } catch (e) { return false; } });
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const f = (e) => setAngosto(e.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  const colapsado = colapsadoPref || angosto;
  const esActivo = (it) => it.tipo === activo || (it.tambien && it.tambien.includes(activo));
  let grupoPrevio = null;
  return (
    <aside className={"sidebar" + (colapsado ? " colapsado" : "")}>
      <div className="sidebar-brand">
        <img className="brand-isotipo" src={(window.DHARMA_MARCA && window.DHARMA_MARCA.isotipoNegro) || ""} alt=""></img>
        <span className="brand-nombre">DHARMA</span>
        <span className="brand-sub">{subtitulo}</span>
      </div>
      <nav className="sidebar-nav">
        {items.map((it) => {
          const cabecera = it.grupo && it.grupo !== grupoPrevio ? <div className="sb-grupo" key={"g-" + it.grupo}><span>{it.grupo}</span></div> : null;
          grupoPrevio = it.grupo || grupoPrevio;
          return (
            <React.Fragment key={it.tipo}>
              {cabecera}
              <button className={"sb-item" + (esActivo(it) ? " activo" : "")} onClick={() => onIr(it.tipo)} title={it.label}>
                <BottomNavIcon tipo={it.tipo}></BottomNavIcon>
                <span className="sb-label">{it.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
      {pie}
      {angosto ? null : (
        <button className="sidebar-colapsar" onClick={() => setColapsado(!colapsadoPref)} title={colapsado ? "Expandir menú" : "Colapsar menú"}>
          <IconChevronL></IconChevronL>
          <span className="sb-label">Colapsar</span>
        </button>
      )}
    </aside>
  );
}

/* ---------- navegación inferior (mobile): 4 accesos + "Más" con bottom-sheet ----------
   En pantallas táctiles angostas reemplaza al menú superior — accesos al alcance del
   pulgar en vez de un dropdown arriba a la derecha. */
const BOTTOMNAV_ICONOS = {
  dashboard: (<><path d="M4 11.5 12 4l8 7.5"></path><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"></path></>),
  biblioteca: (<><path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 1-2-2z"></path><path d="M13 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5z"></path></>),
  planificador: (<><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M3 9h18M9 4v16"></path></>),
  calendario: (<><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></>),
  personas: (<><circle cx="9" cy="8" r="3.2"></circle><path d="M3.5 20c.8-3.8 3.2-6 5.5-6s4.7 2.2 5.5 6"></path><circle cx="17" cy="8.5" r="2.4"></circle><path d="M15.5 14.3c1.9.4 3.6 2.3 4.2 5.2"></path></>),
  estudio: (<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v16H6.5A2.5 2.5 0 0 0 4 21z"></path><path d="M4 5.5v15.5"></path></>),
  ejercicios: (<><rect x="2.5" y="9" width="4" height="6" rx="1"></rect><rect x="17.5" y="9" width="4" height="6" rx="1"></rect><path d="M6.5 12h11"></path></>),
  herramientas: (<><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7v5l3.2 2"></path></>),
  economia: (<><circle cx="12" cy="12" r="8.5"></circle><path d="M12 7.5v9M9.5 15c0 1.4 1.2 2 2.5 2s3-.6 3-2-1.4-1.7-3-2-3-.6-3-2 1.5-2 3-2 2.2.5 2.5 1.5"></path></>),
  coaches: (<><circle cx="12" cy="8" r="3.5"></circle><path d="M4.5 20c1-4.3 3.7-6.5 7.5-6.5s6.5 2.2 7.5 6.5"></path></>),
  inicio: (<><path d="M4 11.5 12 4l8 7.5"></path><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9"></path></>),
  reservar: (<><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M3 10h18M8 2v4M16 2v4"></path><path d="M12 13v5M9.5 15.5h5"></path></>),
  entrenamiento: (<><path d="M3 17l5-5 4 4 8-8"></path><path d="M16 8h5v5"></path></>),
  cuenta: (<><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 10h18"></path></>),
  info: (<><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v5h1"></path></>),
  mas: (<><circle cx="5" cy="12" r="1.6"></circle><circle cx="12" cy="12" r="1.6"></circle><circle cx="19" cy="12" r="1.6"></circle></>)
};
function BottomNavIcon({ tipo }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {BOTTOMNAV_ICONOS[tipo] || BOTTOMNAV_ICONOS.dashboard}
    </svg>
  );
}
const BOTTOMNAV_PRINCIPALES = ["dashboard", "biblioteca", "personas", "calendario"];
function BottomNav({ items, activo, onIr, principales: tiposPrincipales = BOTTOMNAV_PRINCIPALES }) {
  const [abierto, setAbierto] = useState(false);
  const esActivo = (it) => it.tipo === activo || (it.tambien && it.tambien.includes(activo));
  const principales = tiposPrincipales.map((tipo) => items.find((it) => it.tipo === tipo)).filter(Boolean);
  const idsPrincipales = new Set(principales.map((it) => it.tipo));
  const resto = items.filter((it) => !idsPrincipales.has(it.tipo));
  const restoActivo = resto.some(esActivo);

  useEffect(() => {
    if (!abierto) return;
    const esc = (e) => { if (e.key === "Escape") setAbierto(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [abierto]);

  return (
    <>
      <nav className="admin-bottom-nav" aria-label="Navegación principal">
        {principales.map((it) => (
          <button key={it.tipo} className={"abn-item" + (esActivo(it) ? " activo" : "")} onClick={() => onIr(it.tipo)}>
            <BottomNavIcon tipo={it.tipo}></BottomNavIcon>
            <span className="abn-label">{it.label}</span>
          </button>
        ))}
        {resto.length ? (
          <button className={"abn-item" + (restoActivo ? " activo" : "")} onClick={() => setAbierto(true)} aria-haspopup="true" aria-expanded={abierto}>
            <BottomNavIcon tipo="mas"></BottomNavIcon>
            <span className="abn-label">Más</span>
          </button>
        ) : null}
      </nav>
      {abierto ? (
        <div className="abn-sheet-wrap">
          <div className="telon" onClick={() => setAbierto(false)}></div>
          <div className="abn-sheet" role="dialog" aria-label="Más secciones">
            <div className="abn-sheet-handle" aria-hidden="true"></div>
            {resto.map((it) => (
              <button key={it.tipo} className={"abn-sheet-item" + (esActivo(it) ? " activo" : "")} onClick={() => { onIr(it.tipo); setAbierto(false); }}>
                <BottomNavIcon tipo={it.tipo}></BottomNavIcon>
                <span>{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

/* ---------- iconos de categoría (trazo 1.5, estilo lineal del brandbook) ---------- */
function IconoCat({ tipo, size = 22, color = "currentColor" }) {
  const p = { fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const iconos = {
    fuerza: (
      <g {...p}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <rect x="2" y="8" width="3" height="8"></rect>
        <rect x="19" y="8" width="3" height="8"></rect>
      </g>
    ),
    potencia: (
      <g {...p}>
        <polyline points="13 3 6 14 11 14 9 21 18 9 13 9 13 3"></polyline>
      </g>
    ),
    movilidad: (
      <g {...p}>
        <circle cx="12" cy="12" r="8"></circle>
        <path d="M12 4 a8 8 0 0 1 0 16"></path>
        <circle cx="12" cy="12" r="2.5"></circle>
      </g>
    ),
    respiracion: (
      <g {...p}>
        <path d="M3 9 c3 -3 6 3 9 0 s6 3 9 0"></path>
        <path d="M3 15 c3 -3 6 3 9 0 s6 3 9 0"></path>
      </g>
    ),
    resistencia: (
      <g {...p}>
        <polyline points="3 12 7 12 10 6 14 18 17 12 21 12"></polyline>
      </g>
    ),
    yoga: (
      <g {...p}>
        <circle cx="12" cy="5.5" r="2"></circle>
        <path d="M12 8 v5"></path>
        <path d="M5 13 c2.5 2 4.5 3 7 3 s4.5 -1 7 -3"></path>
        <path d="M8 20 l4 -4 4 4"></path>
      </g>
    ),
    natacion: (
      <g {...p}>
        <path d="M3 17 c3 -3 6 3 9 0 s6 3 9 0"></path>
        <circle cx="17" cy="7" r="2"></circle>
        <path d="M4 11 l7 -3 4 3"></path>
      </g>
    ),
    surf: (
      <g {...p}>
        <path d="M4 20 C8 16 18 8 21 3 c-6 1 -15 9 -18 15 z"></path>
        <line x1="9" y1="15" x2="13" y2="11"></line>
      </g>
    )
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {iconos[tipo] || iconos.fuerza}
    </svg>
  );
}

/* ---------- iconos de interfaz (mismo trazo lineal del brandbook) ---------- */
// Heredan tamaño del font-size del botón (1em) y color via currentColor.
function UIIcon({ size, sw = 1.8, fill = false, children, vAlign = "-0.125em" }) {
  const dim = size || "1em";
  return (
    <svg width={dim} height={dim} viewBox="0 0 24 24"
      fill={fill ? "currentColor" : "none"} stroke={fill ? "none" : "currentColor"}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      style={{ verticalAlign: vAlign, flexShrink: 0 }} aria-hidden="true">
      {children}
    </svg>
  );
}
const IconPlay = (p) => <UIIcon fill {...p}><path d="M7 4.5 L19.5 12 L7 19.5 Z"></path></UIIcon>;
const IconPause = (p) => <UIIcon {...p} sw={2.2}><line x1="8.5" y1="5" x2="8.5" y2="19"></line><line x1="15.5" y1="5" x2="15.5" y2="19"></line></UIIcon>;
const IconReset = (p) => <UIIcon {...p}><path d="M4 12a8 8 0 1 0 2.5-5.8"></path><path d="M4 4v4h4"></path></UIIcon>;
const IconX = (p) => <UIIcon {...p}><line x1="6" y1="6" x2="18" y2="18"></line><line x1="18" y1="6" x2="6" y2="18"></line></UIIcon>;
const IconMenu = (p) => <UIIcon fill {...p}><circle cx="5" cy="12" r="1.6"></circle><circle cx="12" cy="12" r="1.6"></circle><circle cx="19" cy="12" r="1.6"></circle></UIIcon>;
const IconSalir = (p) => <UIIcon {...p}><path d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7"></path><path d="M16 8l4 4-4 4"></path><line x1="20" y1="12" x2="9" y2="12"></line></UIIcon>;
const IconChevronL = (p) => <UIIcon {...p} sw={2}><polyline points="15 5 8 12 15 19"></polyline></UIIcon>;
const IconChevronR = (p) => <UIIcon {...p} sw={2}><polyline points="9 5 16 12 9 19"></polyline></UIIcon>;

/* ---------- avatar con iniciales ---------- */
const TONOS_AVATAR = ["", "t", "tc", "n", "nc"];
function Avatar({ persona, size = 34 }) {
  const iniciales = persona.nombre.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();
  const tono = TONOS_AVATAR[persona.id.replace("p", "") % TONOS_AVATAR.length];
  return (
    <span className={"avatar " + tono} style={{ width: size, height: size, fontSize: size * 0.38 }} title={persona.nombre}>
      {iniciales}
    </span>
  );
}

function ChipNivel({ nivel }) {
  if (!nivel) return null;
  return <span className={"chip nivel-" + nivel.toLowerCase()}>{nivel}</span>;
}

/* ---------- barras de dificultad (1..total) ---------- */
function NivelBarras({ n, total, on = "var(--acento)", off = "var(--linea)", h = 16 }) {
  const barras = [];
  for (let i = 0; i < total; i++) {
    const alto = (0.42 + (i / (total - 1)) * 0.58) * h;
    barras.push(
      <rect key={i} x={i * 6} y={h - alto} width="4" height={alto} rx="1"
        fill={i < n ? on : off}></rect>
    );
  }
  return (
    <svg width={total * 6 - 2} height={h} viewBox={`0 0 ${total * 6 - 2} ${h}`} aria-hidden="true" style={{ flexShrink: 0 }}>
      {barras}
    </svg>
  );
}

/* ---------- bloque con niveles de dificultad (grilla en columnas) ---------- */
// modo: "detalle" (claro) | "pizarra" (oscuro)
function BloqueNiveles({ bloque, modo }) {
  const pfx = modo === "pizarra" ? "pzn" : "bn";
  const niveles = bloque.niveles;
  const on = modo === "pizarra" ? "var(--acento-claro)" : "var(--acento)";
  const off = modo === "pizarra" ? "rgba(247,248,250,0.3)" : "var(--linea)";
  const hBarra = modo === "pizarra" ? 22 : 14;

  // En pizarra el comentario (formato del bloque: EMOM, AMRAP, rondas…) va como
  // franja compacta ARRIBA — secundario — y la grilla queda sólo con los ejercicios,
  // que son la prioridad visual.
  if (modo === "pizarra") {
    const comunes = bloque.items.filter((it) => it.comun != null);
    const filas = bloque.items.filter((it) => it.comun == null);
    return (
      <div className="pzn-wrap">
        {comunes.map((it, j) => (
          <div className="pzn-nota" key={"n" + j}>
            <span className="pzn-nota-lbl">Cómo</span>
            <span className="pzn-nota-txt">{it.comun}{it.nota ? <span className="pzn-nota-extra"> — {it.nota}</span> : null}</span>
          </div>
        ))}
        <div className="pzn-grid" style={{ gridTemplateColumns: `repeat(${niveles.length}, 1fr)` }}>
          {niveles.map((nv, i) => (
            <div className="pzn-cab" key={"cab" + i}>
              <NivelBarras n={i + 1} total={niveles.length} on={on} off={off} h={hBarra}></NivelBarras>
              <span>{nv}</span>
            </div>
          ))}
          {(() => { let fila = -1; return filas.map((it, j) => {
            if (it.divisor != null) { fila = -1; return (
              <div className="pzn-grupo" key={"g" + j} style={{ gridColumn: "1 / -1" }}>{it.divisor}</div>
            ); }
            fila++;
            return it.variantes.map((v, k) => (
              <div className={"pzn-celda" + (fila % 2 === 1 ? " impar" : "")} key={j + "-" + k}>{v}</div>
            ));
          }); })()}
        </div>
      </div>
    );
  }

  return (
    <div className={pfx + "-grid"} style={{ gridTemplateColumns: `repeat(${niveles.length}, 1fr)` }}>
      {niveles.map((nv, i) => (
        <div className={pfx + "-cab"} key={"cab" + i}>
          <NivelBarras n={i + 1} total={niveles.length} on={on} off={off} h={hBarra}></NivelBarras>
          <span>{nv}</span>
        </div>
      ))}
      {bloque.items.map((it, j) => {
        if (it.divisor != null) return (
          <div className={pfx + "-grupo"} key={"g" + j} style={{ gridColumn: "1 / -1" }}>{it.divisor}</div>
        );
        if (it.comun != null) return (
          <div className={pfx + "-comentario"} key={"com" + j} style={{ gridColumn: "1 / -1" }}>
            <span className={pfx + "-comentario-label"}>Comentario</span>
            <span className={pfx + "-comentario-texto"}>
              {it.comun}{it.nota ? <span className={pfx + "-comentario-nota"}> — {it.nota}</span> : null}
            </span>
          </div>
        );
        return it.variantes.map((v, k) => (
          <div className={pfx + "-celda"} key={j + "-" + k}>{v}</div>
        ));
      })}
    </div>
  );
}

/* ---------- panel de perfil (slide-over) ---------- */
function PerfilPanel({ persona, clases, onCerrar, onIrAClase, onPerfilCompleto }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onCerrar(); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onCerrar]);

  if (!persona) return null;
  const clasesDe = clases.filter((c) => (persona.clases || []).includes(c.id));

  return (
    <div>
      <div className="telon" onClick={onCerrar}></div>
      <aside className="perfil-panel" data-screen-label={"Perfil — " + persona.nombre}>
        <header className="perfil-cabecera">
          <button className="cerrar" onClick={onCerrar} aria-label="Cerrar perfil"><IconX></IconX></button>
          <div className="fila-id">
            <Avatar persona={persona} size={52}></Avatar>
            <div>
              <h2>{persona.nombre}</h2>
              <div className="objetivo">{persona.objetivo}</div>
            </div>
          </div>
          <div className="metas">
            <ChipNivel nivel={persona.nivel}></ChipNivel>
            {persona.edad ? <span className="chip">{persona.edad} años</span> : null}
            {persona.asistencia ? <span className="chip">{persona.asistencia.mes} clases este mes</span> : null}
          </div>
        </header>

        {persona.alertas ? (
          <section className="perfil-seccion">
            <div className="mini-alerta"><IconoAlerta size={14}></IconoAlerta> {persona.alertas}</div>
          </section>
        ) : null}

        <section className="perfil-seccion">
          <h4>Lesiones y adaptaciones</h4>
          {(!persona.lesiones || persona.lesiones.length === 0) ? (
            <p style={{ color: "var(--ink-3)", fontSize: 13.5, margin: 0 }}>Sin restricciones activas.</p>
          ) : (
            persona.lesiones.map((l, i) => (
              <div className="tarjeta-lesion" key={i}>
                <div className="zona">{l.zona}</div>
                {l.detalle ? <div className="detalle">{l.detalle}</div> : null}
                {l.adaptacion ? <div className="adaptacion">→ {l.adaptacion}</div> : null}
              </div>
            ))
          )}
        </section>

        {(persona.doloresFrecuentes && persona.doloresFrecuentes.length > 0) ? (
          <section className="perfil-seccion">
            <h4>Dolores frecuentes</h4>
            <ul className="lista-dolores">
              {persona.doloresFrecuentes.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </section>
        ) : null}

        <section className="perfil-seccion">
          <h4>Métricas de progreso</h4>
          <div className="grilla-metricas">
            {(persona.metricas || []).map((m, i) => (
              <div className="metrica" key={i}>
                <div className="nombre">{m.nombre}</div>
                <div className="valor">{m.valor}</div>
                <div className="delta">{m.delta}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="perfil-seccion">
          <h4>Notas del coach</h4>
          {(persona.notas || []).map((n, i) => (
            <div className="nota-coach" key={i}>
              <div className="fecha">{n.fecha}</div>
              {n.texto}
            </div>
          ))}
        </section>

        <section className="perfil-seccion">
          <h4>Entrena en</h4>
          <div className="chips-clases">
            {clasesDe.map((c) => (
              <button
                key={c.id}
                className="chip"
                style={{ cursor: "pointer" }}
                onClick={() => onIrAClase(c.id)}
              >
                <IconoCat tipo={c.icono} size={13}></IconoCat> {c.nombre}
              </button>
            ))}
          </div>
        </section>

        {onPerfilCompleto ? (
          <div className="perfil-pie">
            <button className="btn-primario ancho" onClick={onPerfilCompleto}>Ver perfil completo y rutina →</button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

/* ---------- toast / confirmación visual ---------- */
function IconoAlerta({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-2px", flexShrink: 0 }} aria-hidden="true">
      <path d="M12 4 L22 20 H2 Z"></path>
      <line x1="12" y1="10" x2="12" y2="14"></line>
      <line x1="12" y1="17" x2="12" y2="17.01"></line>
    </svg>
  );
}
function dharmaToast(msg, tipo) {
  window.dispatchEvent(new CustomEvent("dharma-toast", { detail: { msg, tipo: tipo || "ok" } }));
}
function Toaster() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const on = (e) => {
      const id = Date.now() + Math.random();
      setItems((x) => [...x, { id, msg: e.detail.msg, tipo: e.detail.tipo }]);
      setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 2800);
    };
    window.addEventListener("dharma-toast", on);
    return () => window.removeEventListener("dharma-toast", on);
  }, []);
  return (
    <div className="toaster" aria-live="polite">
      {items.map((i) => (
        <div key={i.id} className={"toast " + (i.tipo || "ok")}>
          <span className="toast-icono">
            {i.tipo === "borrado" ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16"></path><path d="M9 7V5h6v2"></path><path d="M6 7l1 13h10l1-13"></path></svg>
            ) : i.tipo === "info" ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 14-5l2 2"></path><path d="M20 4v5h-5"></path></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-11"></path></svg>
            )}
          </span>
          <span className="toast-msg">{i.msg}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { IconoCat, Avatar, ChipNivel, NivelBarras, BloqueNiveles, PerfilPanel, dharmaToast, Toaster, IconoAlerta, UIIcon, IconPlay, IconPause, IconReset, IconX, IconMenu, IconSalir, OverflowNav, IconChevronL, IconChevronR, BottomNav, Sidebar });
