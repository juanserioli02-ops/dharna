# DHARMA

Sistema de gestión para el gimnasio. React + Firebase/Firestore, desplegado en Netlify.

## Estructura

- `src/` — código fuente editable.
  - `components/*.jsx` — pantallas y componentes (React, JSX).
  - `lib/` — reservas, gamificación, importador de Economía (XLSX).
  - `sync/firestore-sync.js` — motor de sincronización multi-dispositivo.
  - `config/` — claves de acceso y configuración de Firebase.
  - `data/` — dataset de ejemplo, semilla de tablet, rutas a imágenes.
  - `styles/*.css` — hojas de estilo.
  - `index.template.html` — plantilla del HTML final.
- `assets/` — imágenes y fuentes reales (ya no van embebidas en base64 dentro del HTML).
- `vendor/` — React y Firebase de terceros (ver `vendor/README.md`).
- `build.js` — arma `index.html` a partir de `src/` + `assets/` + `vendor/`.
- `index.html`, `_headers` — **generados por el build**, son lo que efectivamente sirve Netlify.

## Flujo de trabajo

1. Editá archivos dentro de `src/` (nunca `index.html` a mano — se pisa en el próximo build).
2. Corré el build:

```bash
npm install   # solo la primera vez, o si cambia package.json
node build.js
```

3. Probalo local antes de subir:

```bash
npx serve .
```

4. Commiteá **tanto `src/` como el `index.html` regenerado** (Netlify sirve el repo tal cual, sin build propio — el `index.html` commiteado es el que se despliega).

## Por qué está armado así

Hasta ahora la app se generaba con una herramienta de prototipado con IA que exportaba
todo (React + Babel + imágenes + fuentes) empaquetado en un único `index.html` de ~5.6MB,
sin cachear nada entre visitas. Este build separa esos assets en archivos reales
(cacheables por separado, ver `_headers`), precompila el JSX de antemano (ya no se
transpila en el navegador en cada carga) y usa los builds de producción de React en vez
de los de desarrollo — mismo resultado visual, carga bastante más liviana y rápida.
