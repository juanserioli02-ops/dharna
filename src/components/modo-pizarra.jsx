// DHARMA — modo pizarra: proyección por bloques (slides) durante la clase
// Slide 0 = resumen de la sesión · slides 1..n = un bloque de trabajo por slide

// Timer en banner horizontal, anclado arriba de la pizarra (no tapa el título, no se arrastra)
function TimerOverlay({ onCerrar }) {
  const [min, setMin] = React.useState(false);

  return (
    <div className={"timer-flotante" + (min ? " min" : "")}>
      <div className="tf-barra">
        <span className="tf-titulo"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-2px", marginRight: "6px" }}><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2.5 1.5"></path><path d="M9 2h6"></path></svg>Timer</span>
        <div className="tf-acciones">
          <button className="tf-btn" onClick={() => setMin((m) => !m)} title={min ? "Expandir" : "Minimizar"}>{min ? <UIIcon sw={2}><rect x="5" y="5" width="14" height="14" rx="1"></rect></UIIcon> : <UIIcon sw={2}><line x1="6" y1="12" x2="18" y2="12"></line></UIIcon>}</button>
          <button className="tf-btn" onClick={onCerrar} title="Cerrar timer"><IconX></IconX></button>
        </div>
      </div>
      {!min ? <div className="tf-cuerpo"><Cronometro></Cronometro></div> : null}
    </div>);

}

// Auto-ajuste: busca la MAYOR escala tipográfica (--pz) con la que TODO el contenido
// del bloque entra en el alto disponible, sin recortes ni scroll. Si `maximizar`, además
// agranda para llenar la pantalla (legibilidad máxima); si no, solo achica cuando desborda.
function useAutoFit(idx, escala, maximizar) {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const base = escala || 1;
    // Banda acotada para coherencia entre bloques. En modo GRILLA (bloques con varios
    // grupos) el tope sube: hay espacio real para aprovechar y la densidad de columnas
    // evita que se vea desproporcionado. En lista simple se mantiene moderado para que
    // un cierre de 2 ejercicios no quede enorme.
    const esGrid = !!el.querySelector(".pz-slide-grid, .pzn-grid");
    const MIN = 0.55, MAX = esGrid ? 1.7 : 0.95;
    // Mide el desborde vertical de la slide Y de sus contenedores internos. En los
    // bloques de niveles la grilla tiene altura fija (flex) y desborda “por dentro”,
    // por eso hay que mirar también .pzn-grid / .pzn-wrap / .pz-slide-ejercicios.
    const desborde = () => {
      let ov = el.scrollHeight - el.clientHeight;
      el.querySelectorAll(".pzn-grid, .pzn-wrap, .pz-slide-ejercicios, .pz-slide-grid, .pz-grupo-ejs, .pz-resumen-lista").forEach((c) => {
        const d = c.scrollHeight - c.clientHeight;
        if (d > ov) ov = d;
      });
      return ov;
    };
    const cabe = () => desborde() <= 1;
    const set = (v) => el.style.setProperty("--pz", String(Math.round(v * 1000) / 1000));

    if (!maximizar) {
      // comportamiento clásico: partir de la escala base y achicar si desborda
      let trial = base;
      set(trial);
      let g = 0;
      while (!cabe() && trial > MIN && g < 80) {trial -= 0.03;set(trial);g++;}
      return;
    }

    // 1) estimación lineal a partir de la escala base
    set(base);
    const avail = el.clientHeight,need = Math.max(el.scrollHeight, el.clientHeight + desborde()) || 1;
    let trial = Math.max(MIN, Math.min(MAX, base * (avail / need) * 0.98));
    set(trial);
    // 2) si quedó corto, crecer hasta el límite
    let g = 0;
    while (cabe() && trial < MAX && g < 80) {trial += 0.03;set(trial);g++;}
    // 3) si se pasó, retroceder hasta que entre
    g = 0;
    while (!cabe() && trial > MIN && g < 80) {trial -= 0.03;set(trial);g++;}
  }, [idx, escala, maximizar]);
  return ref;
}

// Agrupa los items de un bloque por sus divisores (GRUPO 1, GRUPO 2…). Cada divisor
// abre un grupo; los ejercicios sin divisor previo caen en un grupo sin título.
function agruparItems(items) {
  const grupos = [];
  let actual = null;
  (items || []).forEach((it) => {
    if (it.divisor != null) { actual = { titulo: it.divisor, ejs: [] }; grupos.push(actual); }
    else { if (!actual) { actual = { titulo: null, ejs: [] }; grupos.push(actual); } actual.ejs.push(it); }
  });
  return grupos;
}

function Pizarra({ clase, sesion, personas, escala, onSalir }) {
  const total = sesion.bloques.length + 1; // resumen + bloques
  const [timer, setTimer] = React.useState(false);
  const claveSlide = "dharma-pizarra-" + clase.id + "-" + sesion.id;
  const [idx, setIdxRaw] = React.useState(() => {
    const v = parseInt(localStorage.getItem(claveSlide), 10);
    return Number.isFinite(v) && v >= 0 && v < total ? v : 0;
  });
  const setIdx = (f) => {
    setIdxRaw((prev) => {
      const sig = Math.max(0, Math.min(total - 1, typeof f === "function" ? f(prev) : f));
      try {localStorage.setItem(claveSlide, String(sig));} catch (e) {}
      return sig;
    });
  };

  React.useEffect(() => {
    const teclas = (e) => {
      if (e.key === "Escape") {if (timer) {setTimer(false);return;}onSalir();}
      if (e.target.closest && e.target.closest(".timer-flotante")) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {e.preventDefault();setIdx((i) => i + 1);}
      if (e.key === "ArrowLeft" || e.key === "PageUp") {e.preventDefault();setIdx((i) => i - 1);}
      if (e.key === "t" || e.key === "T") setTimer((v) => !v);
    };
    window.addEventListener("keydown", teclas);
    return () => window.removeEventListener("keydown", teclas);
  }, [onSalir, total, timer]);

  const hoy = new Date();
  const dias = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  const fecha = dias[hoy.getDay()] + " " + hoy.getDate() + "/" + (hoy.getMonth() + 1);

  const bloqueActual = idx > 0 ? sesion.bloques[idx - 1] : null;
  const bloqueSiguiente = idx < total - 1 ? sesion.bloques[idx] : null;
  const fitRef = useAutoFit(idx, escala, true);

  return (
    <div className="pizarra tema-claro marca-marker" style={{ "--pz": escala }} data-screen-label={"Pizarra — " + clase.nombre}>
      <button className="pz-cerrar-flotante" onClick={onSalir} aria-label="Salir de la pizarra" title="Salir (Esc)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"></path></svg>
      </button>
      <header className="pizarra-cabecera">
        <div className="pz-cab-marca">
          <img className="pz-iso" src={(window.DHARMA_MARCA && window.DHARMA_MARCA.isotipoNegro) || "dharma-app/marca/isotipo-black.png"} alt="DHARMA"></img>
          <div className="pz-cab-texto">
            <h1>{clase.nombre}</h1>
          </div>
        </div>
        <div className="fecha">
          {fecha}
          <br></br>
          {clase.duracion}′ · {clase.coach}
        </div>
      </header>

      <div className="pizarra-cuerpo">
        {idx === 0 ?
        <div className="pz-resumen" ref={fitRef} data-screen-label="Pizarra — Resumen de sesión">
            <div className="pz-resumen-titulo">La sesión de hoy</div>
            <div className="pz-resumen-lista">
              {sesion.bloques.map((b, i) =>
            <button className="pz-resumen-fila" key={i} onClick={() => setIdx(i + 1)}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="nombre">{b.nombre}</span>
                  {b.niveles ? <span className="badge-niveles">niveles</span> : null}
                  <span className="conteo">{b.items.length} ejercicios</span>
                  <span className="dur">{b.duracion}′</span>
                </button>
            )}
            </div>
            <div className="pz-resumen-marca">
              <img className="pz-sello" src={(window.DHARMA_MARCA && window.DHARMA_MARCA.selloNegro) || "dharma-app/marca/sello-black.png"} alt=""></img>
              <span className="pz-resumen-foco">{sesion.foco}</span>
            </div>
          </div> :

        <div className="pz-slide" ref={fitRef} data-screen-label={"Pizarra — Bloque " + idx}>
            <div className="pz-slide-cab">
              <span className="pz-slide-num">{String(idx).padStart(2, "0")}</span>
              <span className="pz-slide-nombre">{bloqueActual.nombre}</span>
              <span className="pz-slide-dur">
                {bloqueActual.dosisGlobal ? bloqueActual.dosisGlobal + " · " : ""}{bloqueActual.duracion}′
              </span>
            </div>
            {bloqueActual.niveles ?
          <BloqueNiveles bloque={bloqueActual} modo="pizarra"></BloqueNiveles> :
          (() => {
            const grupos = agruparItems(bloqueActual.items);
            // 2+ grupos → grilla en cuadrantes (aprovecha el ancho y mantiene letra grande).
            // 1 grupo → lista vertical centrada de siempre.
            if (grupos.length >= 2) {
              return (
                <div className={"pz-slide-grid g" + Math.min(grupos.length, 6)}>
                  {grupos.map((g, gi) => (
                    <div className="pz-grupo-col" key={gi}>
                      {g.titulo ? <div className="pz-grupo-tit">{g.titulo}</div> : null}
                      <div className="pz-grupo-ejs">
                        {g.ejs.map((it, j) => (
                          <div className="pz-slide-ej" key={j}>
                            <span className="nombre">{it.ej}{it.nota ? <span className="nota">{it.nota}</span> : null}</span>
                            <span className="dosis">{it.dosis}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <div className="pz-slide-ejercicios">
                {bloqueActual.items.map((it, j) =>
                  it.divisor != null ?
                    <div className="pz-slide-grupo" key={j}>{it.divisor}</div> :
                    <div className="pz-slide-ej" key={j}>
                      <span className="nombre">
                        {it.ej}
                        {it.nota ? <span className="nota">{it.nota}</span> : null}
                      </span>
                      <span className="dosis">{it.dosis}</span>
                    </div>
                )}
              </div>
            );
          })()
          }
          </div>
        }

      </div>

      <footer className="pizarra-pie">
        <img className="pz-pie-marca" src={(window.DHARMA_MARCA && window.DHARMA_MARCA.isotipoNegro) || "dharma-app/marca/isotipo-black.png"} alt="DHARMA"></img>
        <button className={"btn-timer-pizarra" + (timer ? " activo" : "")} onClick={() => setTimer((v) => !v)} title="Abrir timer (T)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-3px", marginRight: "8px" }}><circle cx="12" cy="13" r="8"></circle><path d="M12 9v4l2.5 1.5"></path><path d="M9 2h6"></path></svg>Timer</button>

        <div className="pz-nav">
          <button className="pz-nav-btn" onClick={() => setIdx((i) => i - 1)} disabled={idx === 0} aria-label="Bloque anterior"><IconChevronL></IconChevronL></button>
          <div className="pz-progreso">
            {Array.from({ length: total }).map((_, i) =>
            <button
              key={i}
              className={"pz-paso" + (i === idx ? " activo" : "") + (i < idx ? " hecho" : "")}
              onClick={() => setIdx(i)}
              aria-label={i === 0 ? "Resumen" : "Bloque " + i}>
            </button>
            )}
          </div>
          <button className="pz-nav-btn" onClick={() => setIdx((i) => i + 1)} disabled={idx === total - 1} aria-label="Bloque siguiente"><IconChevronR></IconChevronR></button>
          <span className="pz-siguiente">
            {bloqueSiguiente ?
            (idx === 0 ? "Empezar → " : "Sigue → ") + bloqueSiguiente.nombre :
            "Último bloque"}
          </span>
        </div>

        <button className="btn-salir-pizarra" onClick={onSalir}>Salir · Esc</button>
      </footer>

      {timer ? <TimerOverlay onCerrar={() => setTimer(false)}></TimerOverlay> : null}
    </div>);

}

Object.assign(window, { Pizarra });