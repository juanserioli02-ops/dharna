// DHARMA — build script.
//
// Toma los archivos fuente legibles de src/ + los assets reales de assets/
// y arma el index.html final que se sube a Netlify: precompila JSX a JS
// plano (sin Babel Standalone en el navegador), concatena todo el código de
// la app en un único bundle con nombre versionado por hash de contenido
// (cacheable "para siempre"), y usa los builds de producción de React.
//
// Uso: node build.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const babel = require('@babel/core');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const ASSETS = path.join(ROOT, 'assets');
const VENDOR = path.join(ROOT, 'vendor');

function read(p) { return fs.readFileSync(p, 'utf-8'); }
function hash8(buf) { return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8); }

// ── 1) Vendor: copiar builds de PRODUCCIÓN de React + Firebase (ya extraídos a vendor/) ──
// Ver vendor/README.md — react.production.min.js/react-dom.production.min.js vienen de
// node_modules (npm i), firebase-*-compat.js son los que ya usaba el bundle original
// (Firebase no distingue dev/prod como React, no hace falta re-fetchear).
const vendorFiles = [
  'react.production.min.js',
  'react-dom.production.min.js',
  'firebase-app-compat.js',
  'firebase-firestore-compat.js',
];
vendorFiles.forEach((f) => {
  if (!fs.existsSync(path.join(VENDOR, f))) {
    throw new Error(`Falta vendor/${f} — ver vendor/README.md`);
  }
});

// ── 2) Compilar cada módulo de la app en el orden correcto de ejecución ──
// El orden importa: config de Firebase antes que el sync engine, el sync
// engine antes que reservas.js (usa window.DHARMA_SYNC_READY), etc. — es el
// mismo orden en que se cargaban como <script> en el bundle original.
const APP_MODULES = [
  'config/firebase-config.js',
  'sync/firestore-sync.js',
  'data/dataset-ejemplo.js',
  'data/tablet-seed.js',
  'data/marca-imagenes.js',
  'config/claves-acceso.js',
  'lib/economia-import.js',
  'components/componentes-compartidos.jsx',
  'components/copia-de-datos.jsx',
  'components/modo-pizarra.jsx',
  'components/editor-de-bloques.jsx',
  'components/biblioteca-agrupada.jsx',
  'components/editor-de-clase.jsx',
  'components/estudio-preguntas.jsx',
  'components/estudio-modo-charla.jsx',
  'components/estudio-manuales.jsx',
  'components/estudio-editor-manuales.jsx',
  'components/coaches-individuales.jsx',
  'components/personas.jsx',
  'components/rutina-individual.jsx',
  'components/proceso-multisemana.jsx',
  'components/evaluacion-fisica.jsx',
  'components/cronometro.jsx',
  'components/herramientas.jsx',
  'components/biblioteca-ejercicios.jsx',
  'components/planificador.jsx',
  'components/tweaks-panel.jsx', // useTweaks/TweaksPanel — usados por app-principal.jsx (tokens de tema: acento, escala de pizarra)
  'lib/reservas.js',
  'lib/gamificacion.js',
  'components/progreso-alumno.jsx',
  'components/calendario-centro.jsx',
  'components/sala-personalizados.jsx',
  'components/dashboard.jsx',
  'components/centro-notificaciones.jsx',
  'components/cuestionario-ingreso.jsx',
  'components/seguimiento-alumno.jsx',
  'components/app-del-alumno.jsx',
  'components/membresias.jsx',
  'components/economia-dashboard.jsx',
  'components/app-principal.jsx',
];

function compileModule(relPath) {
  const abs = path.join(SRC, relPath);
  const source = read(abs);
  if (relPath.endsWith('.jsx')) {
    const out = babel.transform(source, {
      filename: abs,
      presets: [['@babel/preset-react', { runtime: 'classic' }]],
      babelrc: false,
      configFile: false,
      compact: false,
    });
    return `// ── ${relPath} ──\n${out.code}\n`;
  }
  return `// ── ${relPath} ──\n${source}\n`;
}

const appSource = APP_MODULES.map(compileModule).join('\n');
const appHash = hash8(appSource);
const appFilename = `app.${appHash}.js`;

// limpiar bundles viejos de assets/
fs.readdirSync(ASSETS).forEach((f) => {
  if (/^app\.[a-f0-9]{8}\.js$/.test(f)) fs.unlinkSync(path.join(ASSETS, f));
});
fs.writeFileSync(path.join(ASSETS, appFilename), appSource);

// ── 3) CSS: concatenar los bloques de estilos + fonts.css, con hash propio ──
const CSS_FILES = [
  'styles/fonts.css',
  'styles/tokens.css',
  'styles/estudio-1.css',
  'styles/estudio-2.css',
  'styles/biblioteca.css',
  'styles/planificador.css',
  'styles/agenda.css',
  'styles/membresias.css',
];
const cssSource = CSS_FILES.map((f) => `/* ── ${f} ── */\n${read(path.join(SRC, f))}`).join('\n\n');
const cssHash = hash8(cssSource);
const cssFilename = `styles.${cssHash}.css`;
fs.readdirSync(ASSETS).forEach((f) => {
  if (/^styles\.[a-f0-9]{8}\.css$/.test(f)) fs.unlinkSync(path.join(ASSETS, f));
});
fs.writeFileSync(path.join(ASSETS, cssFilename), cssSource);

// ── 4) Ensamblar index.html final a partir de la plantilla ──
let html = read(path.join(SRC, 'index.template.html'));
html = html.replace('{{CSS_FILE}}', `assets/${cssFilename}`);
html = html.replace('{{APP_FILE}}', `assets/${appFilename}`);
fs.writeFileSync(path.join(ROOT, 'index.html'), html);

console.log('OK — build listo:');
console.log(' ', appFilename, `(${(appSource.length / 1024).toFixed(0)} KB fuente)`);
console.log(' ', cssFilename, `(${(cssSource.length / 1024).toFixed(0)} KB)`);
console.log('  index.html regenerado');
