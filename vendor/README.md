Vendor de terceros — NO se edita a mano.

- react.production.min.js / react-dom.production.min.js: React 18.3.1, build de
  PRODUCCIÓN (sin los warnings/checks de development que traía el bundle viejo).
  Se copian de node_modules/react(-dom)/umd/*.production.min.js tras `npm install`.
  Si se actualiza la versión de React en package.json, volver a copiarlos.
- firebase-app-compat.js / firebase-firestore-compat.js: Firebase 10.13.2 (compat API,
  la misma que ya usaba el proyecto). Firebase no distingue build dev/prod como React,
  así que estos se mantienen tal cual venían en el bundle original.
