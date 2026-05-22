# Lucas Rojas - Web Corporativa 🚀

[![Vue 3](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Plataforma web corporativa de **Lucas Rojas**, empresa líder en suministro integral y soluciones profesionales para empresas, centros educativos y administración pública desde 1961. 

Este proyecto es una **Single Page Application (SPA)** moderna, migrada desde una arquitectura estática clásica hacia un entorno escalable basado en Vue 3 y Vite, destacando por su rendimiento extremo, animaciones inmersivas y un diseño premium.

## ✨ Características Principales

- ⚡ **Rendimiento Optimizado**: Carga asíncrona de rutas (Lazy Loading), división de código (Code Splitting) y pre-carga de assets críticos.
- 🎨 **Diseño Dinámico y Premium**:
  - Tema Claro / Oscuro automático y conmutable.
  - Cursor personalizado interactivo acelerado por hardware (`transform: translate3d`).
  - Transiciones de página fluidas tipo "ola" entre rutas de Vue.
- 📜 **Smooth Scrolling**: Integración nativa con [Lenis](https://lenis.studiofreight.com/) para un desplazamiento suave y elegante en toda la web.
- 📱 **Totalmente Responsivo**: Diseño adaptable a móviles, tablets y monitores ultrawide.
- 🔍 **SEO Friendly**: Gestión dinámica de metadatos e indexación optimizada.

## 🛠️ Tecnologías Utilizadas

- **Framework:** Vue 3 (Composition API)
- **Bundler:** Vite
- **Estilos:** Tailwind CSS + Vanilla CSS (Variables, Glassmorphism)
- **Routing:** Vue Router 4
- **Animaciones:** JavaScript nativo (requestAnimationFrame) + CSS Keyframes
- **Scroll:** Lenis (Studio Freight)

## 🚀 Instalación y Despliegue

### Requisitos previos
- Node.js (v16 o superior recomendado)
- npm o yarn

### Pasos para desarrollo local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Tomascabfer4/WebLucasRojasVue.git
   cd WebLucasRojasVue
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *La aplicación estará disponible normalmente en `http://localhost:5173/`.*

### Construcción para Producción

Para compilar la aplicación y optimizar los assets para producción:

```bash
npm run build
```
*Los archivos minificados y empaquetados se generarán en la carpeta `dist/`, listos para ser desplegados en cualquier servidor estático (Vercel, Netlify, Nginx, Apache, etc.).*

## 📂 Estructura del Proyecto

```text
📦 WebLucasRojasVue
 ┣ 📂 public/              # Assets estáticos y carpeta imagenes/
 ┣ 📂 src/
 ┃ ┣ 📂 components/        # Componentes reutilizables de Vue (Header, Footer, etc.)
 ┃ ┣ 📂 router/            # Configuración de Vue Router
 ┃ ┣ 📂 views/             # Vistas principales de la página (SPA)
 ┃ ┣ 📜 App.vue            # Componente raíz
 ┃ ┣ 📜 main.js            # Punto de entrada de Vue
 ┃ ┣ 📜 animacionesVue.js  # Lógica central del cursor, transiciones y Lenis
 ┃ ┗ 📜 dossierVue.js      # Lógica de interacciones del catálogo
 ┣ 📂 codigo_legacy_html/  # Histórico del código fuente original (HTML/JS puro)
 ┣ 📜 index.html           # Plantilla principal y Loader
 ┣ 📜 estilos.css          # Sistema de diseño, paleta y utilidades
 ┣ 📜 animaciones.css      # Reglas CSS exclusivas para animaciones
 ┗ 📜 vite.config.js       # Configuración del empaquetador
```

## 🤝 Créditos
Primera version con HTML, CSS y Javascript puros desarrollada por Marcos Lucena Pérez.[mlucper1109](https://github.com/mlucper1109/pagina)
Segunda version desarrollada en VUE por Tomás Cabello Fernández.[tomascabfer4](https://github.com/Tomascabfer4)
Desarrollado y optimizado para **Lucas Rojas**.
