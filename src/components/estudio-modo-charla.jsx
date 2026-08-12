// DHARMA — Estudio: MODO CHARLA. Proyecta un manual como slides a pantalla completa,
// para dar cursos, charlas y formar profes. Canvas fijo 1280x720 escalado (estilo proyector).
// La gracia: variedad de layouts (secuencias numeradas, tarjetas, conteos, conceptos a full)
// generados automáticamente desde el vocabulario de bloques → cualquier manual queda atrapante.

/* ---------- generación de slides a partir del manual ---------- */
function manualASlides(manual, categorias) {
  const cat = (categorias || []).find((c) => c.id === manual.categoria) || { nombre: "—", color: "#489DA3" };
  const N = (manual.modulos || []).length;
  const slides = [{ tipo: "portada", manual, cat }];

  (manual.modulos || []).forEach((mod, mi) => {
    slides.push({ tipo: "modulo", num: mi + 1, totalMods: N, titulo: mod.titulo, lectura: mod.lectura, cat });
    let heading = null, buffer = [];
    const ctx = (extra) => Object.assign({ modulo: mod.titulo, cat }, extra);
    const flush = () => {
      if (buffer.length) slides.push(ctx({ tipo: "contenido", heading, bloques: buffer.slice() }));
      buffer = []; heading = null;
    };

    (mod.bloques || []).forEach((b) => {
      switch (b.tipo) {
        case "titulo": flush(); heading = b.texto; break;
        case "regla": flush(); slides.push(ctx({ tipo: "regla", bloque: b })); break;
        case "cita": flush(); slides.push(ctx({ tipo: "cita", bloque: b })); break;
        case "preguntas": flush(); slides.push(ctx({ tipo: "preguntas", bloque: b })); break;
        case "clave": { const h = heading; flush(); slides.push(ctx({ tipo: "clave", bloque: b, heading: h })); break; }
        case "resumen": { const h = heading; flush(); slides.push(ctx({ tipo: "resumen", bloque: b, heading: h })); break; }
        case "imagen": { const h = heading; flush(); slides.push(ctx({ tipo: "imagen", bloque: b, heading: h })); break; }
        case "video": { const h = heading; flush(); slides.push(ctx({ tipo: "video", bloque: b, heading: h })); break; }
        case "tabla": { const h = heading; flush(); slides.push(ctx({ tipo: "tabla", bloque: b, heading: h })); break; }
        case "pasos": {
          const items = b.items || [];
          const h = heading; flush();
          if (items.length >= 4) {
            // secuencia: divisor de conteo + un slide por ítem (número gigante)
            slides.push(ctx({ tipo: "conteo", n: items.length, titulo: h || mod.titulo }));
            items.forEach((it, i) => slides.push(ctx({ tipo: "paso", n: i + 1, total: items.length, item: it, tema: h })));
          } else if (items.length >= 2) {
            slides.push(ctx({ tipo: "tarjetas", items, heading: h }));
          } else if (items.length === 1) {
            slides.push(ctx({ tipo: "tarjetas", items, heading: h }));
          }
          break;
        }
        case "texto":
        case "lista":
        default:
          buffer.push(b);
          // cortar para que el slide nunca se sature
          if (buffer.reduce((s, x) => s + (x.tipo === "lista" ? (x.items || []).length : 2), 0) >= 5) flush();
          break;
      }
    });
    flush();
  });

  slides.push({ tipo: "cierre", manual, cat });
  return slides;
}

/* ---------- kicker reutilizable (módulo + barrita de acento) ---------- */
function Kicker({ modulo, extra }) {
  return (
    <div className="cs-top">
      <span className="cs-eyebrow">{modulo}{extra ? <em> · {extra}</em> : null}</span>
    </div>
  );
}

/* ---------- render de bloques agrupados (slide "contenido") ---------- */
function CharlaBloque({ b }) {
  switch (b.tipo) {
    case "texto": return <p className={"cs-p" + (b.intro ? " intro" : "")}>{b.texto}</p>;
    case "lista": return <ul className="cs-lista">{(b.items || []).map((x, i) => <li key={i}>{x}</li>)}</ul>;
    case "pasos": return <ol className="cs-pasos">{(b.items || []).map((x, i) => <li key={i}><span className="n">{i + 1}</span><span><b>{x.titulo}</b> {x.texto}</span></li>)}</ol>;
    default: return null;
  }
}

/* ---------- una slide ---------- */
function CharlaSlide({ s }) {
  const accent = { "--cat": s.cat.color };
  switch (s.tipo) {

    case "portada":
      return (
        <div className="cs cs-portada" style={accent}>
          <div className="cs-portada-tag">{s.cat.nombre}</div>
          <h1>{s.manual.titulo}</h1>
          <p className="cs-portada-sub">{s.manual.descripcion}</p>
          <div className="cs-portada-meta">
            <span>{(s.manual.modulos || []).length} módulos</span>
            <span className="sep"></span>
            <span>{s.manual.autor || "DHARMA"}</span>
            {s.manual.actualizado ? <><span className="sep"></span><span>{s.manual.actualizado}</span></> : null}
          </div>
          <div className="cs-marca">DHARMA · FORMACIÓN</div>
        </div>
      );

    case "modulo":
      return (
        <div className="cs cs-modulo" style={accent}>
          <div className="cs-modulo-num">{String(s.num).padStart(2, "0")}</div>
          <div className="cs-modulo-info">
            <div className="cs-modulo-lbl">Módulo {s.num} <span>/ {String(s.totalMods).padStart(2, "0")}</span></div>
            <h2>{s.titulo}</h2>
            {s.lectura ? <div className="cs-modulo-meta">{s.lectura}′ de lectura</div> : null}
          </div>
        </div>
      );

    case "conteo":
      return (
        <div className="cs cs-conteo" style={accent}>
          <div className="cs-conteo-num">{String(s.n).padStart(2, "0")}</div>
          <div className="cs-conteo-info">
            <div className="cs-conteo-lbl">{s.modulo}</div>
            <h2>{s.titulo}</h2>
          </div>
        </div>
      );

    case "paso":
      return (
        <div className="cs cs-paso" style={accent}>
          <div className="cs-paso-izq">
            <div className="cs-paso-num">{String(s.n).padStart(2, "0")}</div>
            <div className="cs-paso-prog">{String(s.n).padStart(2, "0")} / {String(s.total).padStart(2, "0")}</div>
          </div>
          <div className="cs-paso-der">
            {s.tema ? <div className="cs-paso-tema">{s.tema}</div> : <div className="cs-paso-tema">{s.modulo}</div>}
            <h3 className="cs-paso-titulo">{(s.item.titulo || "").replace(/\.$/, "")}</h3>
            {s.item.texto ? <p className="cs-paso-txt">{s.item.texto}</p> : null}
          </div>
        </div>
      );

    case "tarjetas":
      return (
        <div className="cs cs-tarjetas" style={accent}>
          <Kicker modulo={s.modulo}></Kicker>
          {s.heading ? <h3 className="cs-h">{s.heading}</h3> : null}
          <div className={"cs-cards n" + s.items.length}>
            {s.items.map((it, i) => (
              <div className="cs-card" key={i}>
                <div className="cs-card-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="cs-card-tit">{(it.titulo || "").replace(/\.$/, "")}</div>
                {it.texto ? <div className="cs-card-txt">{it.texto}</div> : null}
              </div>
            ))}
          </div>
        </div>
      );

    case "contenido":
      return (
        <div className="cs cs-contenido" style={accent}>
          <div className="cs-rail"></div>
          <Kicker modulo={s.modulo}></Kicker>
          {s.heading ? <h3 className="cs-h">{s.heading}</h3> : null}
          <div className="cs-cuerpo">{s.bloques.map((b, i) => <CharlaBloque b={b} key={i}></CharlaBloque>)}</div>
        </div>
      );

    case "clave":
      return (
        <div className="cs cs-claveslide" style={accent}>
          <div className="cs-claveslide-lbl">Concepto clave</div>
          <div className="cs-claveslide-txt">{s.bloque.texto}</div>
          <div className="cs-claveslide-pie">{s.heading || s.modulo}</div>
        </div>
      );

    case "tabla":
      return (
        <div className="cs cs-contenido" style={accent}>
          <div className="cs-rail"></div>
          <Kicker modulo={s.modulo}></Kicker>
          {s.heading ? <h3 className="cs-h">{s.heading}</h3> : null}
          <div className="cs-cuerpo">
            <div className="cs-tabla">
              <table>
                <thead><tr>{(s.bloque.columnas || []).map((c, i) => <th key={i}>{c}</th>)}</tr></thead>
                <tbody>{(s.bloque.filas || []).map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} className={j === 0 ? "lead" : ""}>{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </div>
        </div>
      );

    case "resumen":
      return (
        <div className="cs cs-resumen" style={accent}>
          <div className="cs-resumen-lbl">Para recordar</div>
          {s.heading ? <h3>{s.heading}</h3> : null}
          <ul className="cs-resumen-lista">
            {(s.bloque.items || []).map((x, i) => (
              <li key={i}><span className="chk"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5 9-11"></path></svg></span>{x}</li>
            ))}
          </ul>
        </div>
      );

    case "imagen":
      return (
        <div className="cs cs-contenido" style={accent}>
          <div className="cs-rail"></div>
          <Kicker modulo={s.modulo}></Kicker>
          {s.heading ? <h3 className="cs-h">{s.heading}</h3> : null}
          <div className="cs-cuerpo">
            <figure className="cs-imagen"><image-slot id={"charla-" + s.bloque.slot} shape="rounded" radius="2" placeholder="Imagen"></image-slot>{s.bloque.epigrafe ? <figcaption>{s.bloque.epigrafe}</figcaption> : null}</figure>
          </div>
        </div>
      );

    case "video":
      return (
        <div className="cs cs-contenido" style={accent}>
          <div className="cs-rail"></div>
          <Kicker modulo={s.modulo}></Kicker>
          {s.heading ? <h3 className="cs-h">{s.heading}</h3> : null}
          <div className="cs-cuerpo">
            <div className="cs-video"><div className="marco"><span className="play"><IconPlay size={30}></IconPlay></span></div>{s.bloque.epigrafe ? <div className="cap">{s.bloque.epigrafe}</div> : null}</div>
          </div>
        </div>
      );

    case "regla":
      return (
        <div className="cs cs-regla" style={accent}>
          <div className="cs-regla-num">Regla #{s.bloque.numero}</div>
          <div className="cs-regla-txt">“{s.bloque.texto}”</div>
          {s.bloque.autor ? <div className="cs-regla-autor">— {s.bloque.autor}</div> : null}
        </div>
      );

    case "cita":
      return (
        <div className="cs cs-citaslide" style={accent}>
          <div className="cs-cita-marca">“</div>
          <div className="cs-cita-txt">{s.bloque.texto}</div>
          {s.bloque.autor ? <div className="cs-cita-autor">— {s.bloque.autor}</div> : null}
        </div>
      );

    case "preguntas":
      return (
        <div className="cs cs-preguntas" style={accent}>
          <div className="cs-rail"></div>
          <div className="cs-top">
            <span className="cs-eyebrow">{s.modulo}</span>
          </div>
          <div className="cs-preg-lbl">{s.bloque.titulo || "Para pensar"}</div>
          <div className="cs-cuerpo">
            <ol className="cs-preg-lista">
              {(s.bloque.items || []).map((it, i) => {
                const q = typeof it === "string" ? it : (it.q || it.texto || "");
                return <li key={i}>{q}</li>;
              })}
            </ol>
          </div>
        </div>
      );

    case "cierre":
      return (
        <div className="cs cs-cierre" style={accent}>
          <div className="cs-cierre-marca">DHARMA</div>
          <h2>Fin del manual</h2>
          <p>{s.manual.titulo}</p>
          <div className="cs-cierre-nota">Espacio para preguntas y puesta en común.</div>
        </div>
      );

    default: return null;
  }
}

/* ---------- proyector ---------- */
function ManualCharla({ manual, categorias, onSalir }) {
  const slides = React.useMemo(() => manualASlides(manual, categorias), [manual.id]);
  const total = slides.length;
  const clave = "dharma-charla-" + manual.id;
  const [idx, setIdxRaw] = React.useState(() => {
    const v = parseInt(localStorage.getItem(clave), 10);
    return Number.isFinite(v) && v >= 0 && v < total ? v : 0;
  });
  const [dir, setDir] = React.useState(1);
  const setIdx = (f) => setIdxRaw((prev) => {
    const sig = Math.max(0, Math.min(total - 1, typeof f === "function" ? f(prev) : f));
    setDir(sig >= prev ? 1 : -1);
    try { localStorage.setItem(clave, String(sig)); } catch (e) {}
    return sig;
  });

  // escalado del canvas 1280x720
  const [escala, setEscala] = React.useState(1);
  React.useEffect(() => {
    const calc = () => {
      const sw = window.innerWidth / 1280;
      const sh = (window.innerHeight - 64) / 720;
      setEscala(Math.min(sw, sh));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  React.useEffect(() => {
    const teclas = (e) => {
      if (e.key === "Escape") { onSalir(); return; }
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") { e.preventDefault(); setIdx((i) => i + 1); }
      if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); setIdx((i) => i - 1); }
      if (e.key === "Home") setIdx(0);
      if (e.key === "End") setIdx(total - 1);
    };
    window.addEventListener("keydown", teclas);
    return () => window.removeEventListener("keydown", teclas);
  }, [onSalir, total]);

  const s = slides[idx];

  return (
    <div className="charla" data-screen-label={"Charla — " + manual.titulo}>
      <div className="charla-stage">
        <div className="charla-canvas" style={{ transform: "translate(-50%, -50%) scale(" + escala + ")" }}>
          <CharlaSlide s={s} key={idx}></CharlaSlide>
        </div>
      </div>

      <footer className="charla-pie">
        <div className="charla-pie-id">
          <span className="cp-marca">DHARMA</span>
          <span className="cp-titulo">{manual.titulo}</span>
        </div>
        <div className="charla-nav">
          <button className="charla-nav-btn" onClick={() => setIdx((i) => i - 1)} disabled={idx === 0} aria-label="Anterior"><IconChevronL></IconChevronL></button>
          <span className="charla-contador">{String(idx + 1).padStart(2, "0")} <i>/</i> {String(total).padStart(2, "0")}</span>
          <button className="charla-nav-btn" onClick={() => setIdx((i) => i + 1)} disabled={idx === total - 1} aria-label="Siguiente"><IconChevronR></IconChevronR></button>
        </div>
        <button className="btn-salir-pizarra" onClick={onSalir}>Salir · Esc</button>
      </footer>

      <div className="charla-progreso"><span style={{ width: ((idx + 1) / total * 100) + "%" }}></span></div>
    </div>
  );
}

Object.assign(window, { ManualCharla, manualASlides });
