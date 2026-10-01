# LHS NOVA INFRA - Sitio web corporativo

Sitio web corporativo one page para LHS NOVA INFRA, desarrollado con HTML, CSS y JavaScript puro.

No usa React, Angular, Vue, Bootstrap ni Tailwind. La idea es mantener una web clara, profesional, rápida y fácil de mantener.

## Objetivo

Presentar la empresa, sus servicios, áreas principales, enfoque técnico, proyectos, equipo, clientes y canales de contacto.

## Estructura actual

```text
LHS NOVAINFRA/
├── index.html
├── README.md
├── assets/
│   ├── docs/
│   │   └── brochure-lhs-novainfra.pdf
│   ├── icons/
│   ├── images/
│   └── videos/
├── css/
│   └── styles.css
└── js/
    ├── main.js
    └── modules/
        └── service-modal.js
```

## Archivos principales

### `index.html`

Contiene la estructura general de la web:

- header y navegación;
- hero;
- nosotros;
- preguntas tipo rompecabezas;
- servicios;
- áreas;
- proyectos;
- clientes;
- equipo;
- contacto;
- footer;
- estructura HTML del modal reutilizable.

La web sigue siendo una sola página. No existen archivos como `servicios.html` o `contacto.html`.

### `css/styles.css`

Contiene el diseño visual:

- colores corporativos;
- layout responsive;
- tarjetas;
- carruseles;
- modal;
- formulario;
- footer;
- animaciones;
- estados hover y active.

Por ahora no se dividio el CSS porque todavía es manejable y mantenerlo junto ayuda a controlar el diseño general.

### `js/main.js`

Es el punto de entrada principal del JavaScript.

Controla:

- menú responsive;
- video del hero;
- efectos al hacer scroll;
- animaciones reveal;
- carruseles;
- puzzle de preguntas;
- carrusel automático del equipo;
- formulario hacia WhatsApp.

También importa el módulo del modal:

```js
import './modules/service-modal.js';
```

Por eso el script en `index.html` debe estár así:

```html
<script type="module" src="js/main.js"></script>
```

### `js/modules/service-modal.js`

Contiene todo lo relacionado con el modal de servicios:

- datos de cada servicio;
- subtitulos y actividades internas;
- iconos SVG del modal;
- apertura del modal;
- cierre con X;
- cierre con clic fuera;
- cierre con tecla Escape;
- bloqueo de scroll del body mientras el modal está abierto.

## Modal de servicios

La web usa un solo modal reutilizable.

La estructura está en `index.html`:

```html
<div class="service-modal" hidden aria-hidden="true">
  ...
</div>
```

El diseño está en:

```text
css/styles.css
```

La información dinamica está en:

```text
js/modules/service-modal.js
```

No se crearon modales separados como:

```text
modals/bim.html
modals/mantenimiento.html
modals/ambiental.html
```

No son necesarios porque todos los servicios comparten la misma estructura visual.

## Cómo agregar o editar un servicio

Editar:

```text
js/modules/service-modal.js
```

Buscar:

```js
export const serviceDetails = { ... }
```

Cada servicio tiene está forma:

```js
consultoria: {
  number: "01",
  title: "Nombre del servicio",
  text: "Descripcion general.",
  groups: [
    {
      title: "Subtitulo",
      items: [
        "Actividad 1.",
        "Actividad 2."
      ]
    }
  ]
}
```

La clave debe coincidir con el atributo `data-service` de la tarjeta en `index.html`.

Ejemplo:

```html
<article class="service-card" data-service="consultoria">
```

Debe existir:

```js
consultoria: { ... }
```

## Cómo cambiar contenido frecuente

### Cambiar imágenes

Las imágenes están en:

```text
assets/images/
```

Si cambias el nombre de una imagen, también debes actualizar su ruta en `index.html` o `css/styles.css`.

### Cambiar video del inicio

Editar en `index.html`:

```html
<source src="assets/videos/Video-Ingenieros caminando por OBRA.mp4" type="video/mp4">
```

### Cambiar brochure

Reemplazar:

```text
assets/docs/brochure-lhs-novainfra.pdf
```

Si mantienes ese nombre, no necesitas cambiar rutas.

### Cambiar WhatsApp

Editar en `index.html`:

```html
<form class="contact-form contact-form-panel" data-whatsapp="51997009376">
```

Usar número con código de país y sin espacios.

## Decisiones técnicas

### Por qué se modularizo solo el modal

`main.js` ya tenia varias responsabilidades. La parte más grande y separable era el modal de servicios, porque mezcla datos, renderizado, apertura, cierre y eventos.

Por eso se movio a:

```text
js/modules/service-modal.js
```

No se dividio todo el JavaScript porque todavía no era necesario y crearia más archivos sin aportar mucho.

### Por qué no se dividio `index.html`

La web funciona bien como one page. No conviene crear páginas separadas hasta que el contenido crezca bastante.

### Por qué no se dividio `styles.css`

El CSS es grande, pero aun se entiende como un sistema visual completo. Por ahora es mejor mantenerlo centralizado.

## Publicación en internet

La estructura funciona correctamente en HTTPS y hosting estático.

Compatible con:

- GitHub Pages;
- Netlify;
- Vercel;
- hosting tradicional;
- cualquier servidor que publique archivos estáticos.

Importante:

- subir `index.html`, `css/`, `js/` y `assets/`;
- conservar las rutas relativas;
- publicar desde la raíz del proyecto;
- probar con Live Server o servidor local, no solo con doble clic al HTML.

## Pendientes recomendados

### Prioridad alta

- Confirmar WhatsApp, correo, dirección y redes oficiales.
- Reemplazar clientes placeholder por logos reales.
- Reemplazar imágenes referenciales por fotos reales cuando existan.
- Revisar el brochure final.

### Prioridad media

- Optimizar imágenes pesadas a `.webp`.
- Preparar favicon oficial.
- Agregar Open Graph cuando exista dominio final.

### Prioridad baja

- Dividir CSS si el proyecto crece más.
- Crear más módulos JS solo si aparecen nuevas funciones grandes.
- Crear páginas internas solo si la web deja de funcionar bien como one page.

## Validación rápida

```bash
node --check js/main.js
node --check js/modules/service-modal.js
```

## Git

```bash
git status
git add .
git commit -m "Mejora estructura y modulariza modal de servicios"
```
