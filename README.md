# SUGO — Agencia y Familia Élite Dorada

Landing page profesional construida con React y Vite.

## Tecnología

- React 19.
- Vite 8.
- Motion para animaciones y transiciones.
- Lucide React para iconografía SVG.
- CSS responsive propio; iconos y animaciones se empaquetan con la aplicación.

## Funcionalidades

- Hero con animación tipográfica por letras.
- Teléfono 3D con navegación por pestañas y rueda del mouse.
- Animaciones por scroll con soporte para movimiento reducido.
- Paneles interactivos de agencia, familia y beneficios.
- Tarjetas de capacitadoras.
- Checklist de requisitos y selector de razones.
- Preguntas frecuentes animadas.
- Formulario validado que prepara un mensaje de WhatsApp.
- Modales accesibles, avisos emergentes y navegación responsive.

## Configuración

Edita `config.js` y reemplaza el número de ejemplo:

```js
whatsappNumber: "51999999999"
```

Usa código de país y número sin espacios ni el símbolo `+`.

## Desarrollo local

```bash
npm install
npm run dev
```

Vite mostrará la dirección local, normalmente `http://localhost:5173`.

## Compilación

```bash
npm run build
npm run preview
```

La versión lista para producción se genera en `dist/`.

## Cloudflare Pages

Configura el proyecto conectado a GitHub así:

```text
Production branch: main
Build command: npm run build
Build output directory: dist
```

Cada `push` a `main` generará y publicará automáticamente una nueva versión.
