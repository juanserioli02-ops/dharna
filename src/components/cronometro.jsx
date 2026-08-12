// DHARMA — Herramienta: Cronómetro (Tabata / AMRAP / EMOM / For Time)

function fmtTiempo(seg) {
  seg = Math.max(0, Math.ceil(seg));
  const m = Math.floor(seg / 60);
  const s = seg % 60;
  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
}

function construirFases(modo, cfg) {
  if (modo === "tabata") {
    const a = [];
    for (let r = 0; r < cfg.rounds; r++) {
      a.push({ label: "TRABAJO", dur: cfg.work, tono: "work", ronda: r + 1 });
      if (cfg.rest > 0) a.push({ label: "DESCANSO", dur: cfg.rest, tono: "rest", ronda: r + 1 });
    }
    return a;
  }
  if (modo === "emom") {
    const a = [];
    for (let r = 0; r < cfg.emomRounds; r++) a.push({ label: "RONDA", dur: cfg.emomSec, tono: "work", ronda: r + 1 });
    return a;
  }
  if (modo === "amrap") {
    return [{ label: "AMRAP", dur: cfg.amrapMin * 60, tono: "work", ronda: 1 }];
  }
  return []; // for time = cuenta ascendente
}

function ubicar(seg, fases) {
  let t = seg;
  for (let i = 0; i < fases.length; i++) {
    if (t < fases[i].dur - 1e-9) return { idx: i, dentro: t, restante: fases[i].dur - t };
    t -= fases[i].dur;
  }
  return null;
}

function Cronometro() {
  const [modo, setModo] = React.useState("tabata");
  const [cfg, setCfg] = React.useState({ work: 20, rest: 10, rounds: 8, amrapMin: 12, emomSec: 60, emomRounds: 10, capMin: 0 });
  const [sonido, setSonido] = React.useState(true);
  const [status, setStatus] = React.useState("idle"); // idle | running | paused | done
  const [elapsed, setElapsed] = React.useState(0); // ms

  const sonidoRef = React.useRef(sonido); sonidoRef.current = sonido;
  const startRef = React.useRef(0);   // Date.now() al iniciar el tramo en curso
  const accumRef = React.useRef(0);   // ms acumulados de tramos previos (tras pausas)
  const ctxRef = React.useRef(null);
  const prevFaseRef = React.useRef(-1);
  const prevMitadRef = React.useRef(-1);

  const beep = (freq, dur, vol) => {
    if (!sonidoRef.current) return;
    try {
      if (!ctxRef.current) ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "square"; o.frequency.value = freq;
      const t0 = ctx.currentTime;
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(vol, t0 + 0.008);
      g.gain.setValueAtTime(vol, t0 + Math.max(0, dur - 0.03));
      g.gain.linearRampToValueAtTime(0, t0 + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(t0 + dur + 0.02);
    } catch (e) {}
  };

  const fases = construirFases(modo, cfg);
  const totalSeg = modo === "fortime" ? (cfg.capMin > 0 ? cfg.capMin * 60 : 0) : fases.reduce((a, p) => a + p.dur, 0);
  const totalRondas = modo === "tabata" ? cfg.rounds : modo === "emom" ? cfg.emomRounds : modo === "amrap" ? 1 : 0;
  const elapsedSeg = elapsed / 1000;

  // motor: el tiempo transcurrido se CALCULA desde un timestamp real (no se acumula
  // por tick). Así corre a tiempo real exacto aunque el dispositivo atrase los timers
  // o se monte más de un intervalo: ambos calculan el mismo valor.
  React.useEffect(() => {
    if (status !== "running") return;
    startRef.current = Date.now();
    const tick = () => setElapsed(accumRef.current + (Date.now() - startRef.current));
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [status]);

  // fin
  React.useEffect(() => {
    if (status !== "running") return;
    const limite = modo === "fortime" ? (cfg.capMin > 0 ? cfg.capMin * 60 : Infinity) : totalSeg;
    if (limite !== Infinity && elapsedSeg >= limite) {
      setStatus("done");
      beep(1500, 0.5, 0.6); setTimeout(() => beep(1500, 0.5, 0.6), 550); setTimeout(() => beep(1800, 0.6, 0.6), 1100);
    }
  }, [elapsed, status]);

  // beeps por segundo
  const wholeSec = Math.floor(elapsedSeg);
  React.useEffect(() => {
    if (status !== "running" || modo === "fortime") return;
    const loc = ubicar(wholeSec, fases);
    if (!loc) return;
    if (loc.idx !== prevFaseRef.current) {
      if (prevFaseRef.current !== -1) beep(1200, 0.22, 0.55);
      prevFaseRef.current = loc.idx;
    }
    const secLeft = Math.round(loc.restante);
    if (secLeft <= 3 && secLeft >= 1) beep(820, 0.13, 0.45);
    // aviso a mitad de fase (útil en tramos largos: AMRAP, EMOM, work de más de 20")
    if (loc.dur >= 20) {
      const transcurrido = loc.dur - loc.restante;
      if (transcurrido >= loc.dur / 2 && prevMitadRef.current !== loc.idx) {
        prevMitadRef.current = loc.idx;
        beep(1000, 0.16, 0.4);
      }
    }
  }, [wholeSec, status]);

  const arrancar = () => {
    if (ctxRef.current && ctxRef.current.state === "suspended") ctxRef.current.resume();
    else if (!ctxRef.current && sonido) { try { ctxRef.current = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (status === "idle") { prevFaseRef.current = -1; prevMitadRef.current = -1; accumRef.current = 0; setElapsed(0); }
    setStatus("running");
  };
  const pausar = () => { accumRef.current = accumRef.current + (Date.now() - startRef.current); setStatus("paused"); };
  const reiniciar = () => { setStatus("idle"); accumRef.current = 0; setElapsed(0); prevFaseRef.current = -1; };

  const editable = status === "idle";

  // display
  let grande, faseLabel, ronda, progreso, tono = "work";
  if (modo === "fortime") {
    grande = fmtTiempo(elapsedSeg);
    faseLabel = status === "done" ? "TIEMPO" : "EN CURSO";
    ronda = null;
    progreso = totalSeg > 0 ? Math.min(1, elapsedSeg / totalSeg) : 0;
  } else if (status === "done") {
    grande = "00:00";
    faseLabel = "¡COMPLETO!";
    ronda = null;
    progreso = 1;
  } else {
    const loc = ubicar(elapsedSeg, fases);
    if (loc) {
      grande = fmtTiempo(loc.restante);
      faseLabel = fases[loc.idx].label;
      tono = fases[loc.idx].tono;
      ronda = fases[loc.idx].ronda;
      progreso = totalSeg > 0 ? Math.min(1, elapsedSeg / totalSeg) : 0;
    } else {
      grande = fmtTiempo(totalSeg);
      faseLabel = "LISTO";
      ronda = totalRondas ? 1 : null;
      progreso = 0;
    }
  }

  const Paso = ({ etiqueta, campo, min, max, paso }) => (
    <div className="paso-num">
      <span className="paso-label">{etiqueta}</span>
      <div className="paso-controles">
        <button disabled={!editable} onClick={() => setCfg((c) => ({ ...c, [campo]: Math.max(min, c[campo] - (paso || 1)) }))}>−</button>
        <input
          type="number" value={cfg[campo]} disabled={!editable} min={min} max={max}
          onChange={(e) => setCfg((c) => ({ ...c, [campo]: Math.max(min, Math.min(max, Number(e.target.value) || 0)) }))}
        ></input>
        <button disabled={!editable} onClick={() => setCfg((c) => ({ ...c, [campo]: Math.min(max, c[campo] + (paso || 1)) }))}>+</button>
      </div>
    </div>
  );

  return (
    <div className="herr-cronometro">
      <div className="crono-config">
        <div className="seg crono-modos">
          {[["tabata", "Tabata"], ["amrap", "AMRAP"], ["emom", "EMOM"], ["fortime", "For Time"]].map(([id, lbl]) => (
            <button key={id} className={modo === id ? "activo" : ""} disabled={!editable} onClick={() => setModo(id)}>{lbl}</button>
          ))}
        </div>

        <div className="crono-pasos">
          {modo === "tabata" ? (
            <>
              <Paso etiqueta="Trabajo (s)" campo="work" min={5} max={600} paso={5}></Paso>
              <Paso etiqueta="Descanso (s)" campo="rest" min={0} max={600} paso={5}></Paso>
              <Paso etiqueta="Rondas" campo="rounds" min={1} max={50}></Paso>
            </>
          ) : null}
          {modo === "amrap" ? (
            <Paso etiqueta="Minutos" campo="amrapMin" min={1} max={90}></Paso>
          ) : null}
          {modo === "emom" ? (
            <>
              <Paso etiqueta="Intervalo (s)" campo="emomSec" min={10} max={600} paso={5}></Paso>
              <Paso etiqueta="Rondas" campo="emomRounds" min={1} max={60}></Paso>
            </>
          ) : null}
          {modo === "fortime" ? (
            <Paso etiqueta="Tope (min · 0 = libre)" campo="capMin" min={0} max={90}></Paso>
          ) : null}
        </div>

        <label className="crono-sonido">
          <input type="checkbox" checked={sonido} onChange={(e) => setSonido(e.target.checked)}></input>
          <span>Sonido</span>
        </label>
      </div>

      <div className={"crono-display tono-" + tono + (status === "done" ? " done" : "")}>
        <div className="crono-fase">{faseLabel}</div>
        <div className="crono-grande">{grande}</div>
        <div className="crono-sub">
          {ronda ? <span>RONDA {ronda} / {totalRondas}</span> : null}
          {modo !== "fortime" && totalSeg > 0 ? <span>TOTAL {fmtTiempo(totalSeg - elapsedSeg)}</span> : null}
          {modo === "fortime" ? <span>{cfg.capMin > 0 ? "TOPE " + cfg.capMin + "′" : "SIN TOPE"}</span> : null}
        </div>
        <div className="crono-barra"><div style={{ width: (progreso * 100) + "%" }}></div></div>
      </div>

      <div className="crono-botones">
        {status === "running" ? (
          <button className="btn-crono pausa" onClick={pausar}><IconPause></IconPause> Pausar</button>
        ) : (
          <button className="btn-crono play" onClick={arrancar} disabled={status === "done"}><IconPlay></IconPlay> {status === "paused" ? "Reanudar" : "Iniciar"}</button>
        )}
        <button className="btn-crono reset" onClick={reiniciar}><IconReset></IconReset> Reiniciar</button>
      </div>
    </div>
  );
}

Object.assign(window, { Cronometro });
