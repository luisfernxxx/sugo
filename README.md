# Landing page SUGO — versión funcional

Esta versión ya no utiliza una imagen completa como página. Es un frontend real construido con HTML, CSS y JavaScript.

## Funcionalidades incluidas

- Menú de navegación con desplazamiento y sección activa.
- Menú móvil.
- Botón flotante de inscripción.
- Botón para volver arriba.
- Vista simulada del teléfono con pestañas y acciones.
- Tarjetas de agencia y familia con ventanas informativas.
- Beneficios interactivos.
- Tarjetas de capacitadoras con acciones.
- Lista de requisitos con barra de progreso.
- Bloque de razones interactivo.
- Preguntas frecuentes tipo acordeón.
- Formulario completo con validación.
- Confirmación obligatoria de mayoría de edad.
- Preparación automática de mensaje para WhatsApp.
- Mensaje rápido por WhatsApp.
- Diseño responsive.
- Avisos emergentes y animaciones de entrada.

## Mejoras visuales profesionales

- Iconos SVG consistentes con Lucide 0.514.0.
- Microanimaciones y entradas escalonadas con Motion.
- Efecto de profundidad interactivo en la vista del teléfono.
- Estados hover y focus accesibles en botones y tarjetas.
- Barra superior de progreso de lectura.
- Compatibilidad con `prefers-reduced-motion` para reducir animaciones.
- Metadatos sociales, favicon y enlace para saltar al contenido.

Las librerías se cargan por CDN porque el proyecto es estático y no requiere Node.js. Si una librería externa no está disponible, la página conserva las transiciones CSS y toda su funcionalidad principal.

## Configuración

Abre `config.js` y cambia:

```js
whatsappNumber: "51999999999"
```

Usa código de país y número sin espacios ni el símbolo `+`.

Ejemplo de Perú:

```js
whatsappNumber: "51987654321"
```

También puedes cambiar el nombre de la agencia y el mensaje rápido.

## Abrir el proyecto

Haz doble clic en `index.html`.

## Publicar

Sube toda la carpeta a Netlify, Vercel, GitHub Pages, cPanel o cualquier hosting estático.
