<template>
  <div class="proyectos-page-container">
    <h1 class="titulo">NUESTROS <span>PROYECTOS</span></h1>
    
    <div class="contenedor-texto">
        <div class="parrafo">
            <p style="text-align: center;">
                A lo largo de nuestras décadas de historia, hemos ejecutado proyectos llave en mano que van más allá del simple suministro de material. Desde la consultoría inicial hasta la instalación y puesta en marcha final.
            </p>
        </div>
    </div>

    <section class="contenedor-moderno" style="grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); margin-top: 0;">
        <div class="bloque">
            <div class="proyecto-num">01</div>
            <h3>Acondicionamiento de Oficinas</h3>
            <p>Estudio de layout, suministro y montaje de sillería ergonómica, mesas de dirección, mamparas separadoras y electrificación de puestos de trabajo para sedes corporativas en toda Andalucía.</p>
        </div>
        <div class="bloque">
            <div class="proyecto-num">02</div>
            <h3>Aulas Tecnológicas</h3>
            <p>Digitalización de centros de enseñanza mediante la instalación en red de Pizarras Digitales Interactivas, proyectores de tiro corto, sistemas de audio envolvente y carritos de carga para portátiles.</p>
        </div>
        <div class="bloque">
            <div class="proyecto-num">03</div>
            <h3>Suministro B2B Automatizado</h3>
            <p>Integración de catálogos ERP con grandes cuentas a través de nuestro Área de Clientes, permitiendo aprobaciones por departamento, control de presupuestos y reposición programada de stock.</p>
        </div>
    </section>

    <hr class="separador">
    
    <div class="cat">
        <div class="container sector-3d-card sr-hidden">
            <main class="content">
                <div class="text-section">
                    <h1 class="titulo3D">Diseños de <br><span>Proyectos en 3D</span></h1>
                    <p class="p3D">Realizamos todo tipo de diseños 3D para ayudarte a tener una mayor visión de la finalización de tu proyecto.</p>
                    <div class="cta-group">
                        <RouterLink to="/contacto" class="btn-primary">¡Empecemos Ahora!</RouterLink>
                    </div>
                </div>
                <div class="visual-section">
                    <div class="glass-card sector-3d-inner">
                        <img loading="lazy" src="/imagenes/3d.jpg" alt="Imagen 3D">
                    </div>
                </div>
            </main>
        </div>
    </div>

      <!-- Sección de Galería de Proyectos Interactiva (Scroll Grid) -->
    <div class="scroll-grid-section-wrapper" ref="sectionRef">
      <!-- Grid Animation Section (350vh Scroll Height) -->
      <div class="scroll-grid-animation-section" ref="animationSectionRef">
        <!-- Pinned Scene Container -->
        <div class="scroll-grid-content" ref="contentRef">
          
          <!-- Slide 1: Title Overlay -->
          <div class="scroll-grid-header-overlay" ref="headerOverlayRef">
            <h2 class="scroll-grid-title">CREAMOS<br />ESPACIOS.</h2>
            <p class="scroll-grid-subtitle">
              Deslice para ver la escala y el detalle de nuestros proyectos integrales de oficinas y educación.
            </p>
          </div>

          <!-- The Grid -->
          <div class="grid" ref="gridRef">
            <!-- Layer 1: Outer edges (6 images) -->
            <div class="layer">
              <div>
                <img src="/imagenes/proyectos/grid_1.jpg" alt="Oficina Moderna" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_2.jpg" alt="Mobiliario Corporativo" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_3.jpg" alt="Espacio de Trabajo" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_4.jpg" alt="Sala de Juntas" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_5.jpg" alt="Zona de Colaboración" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_6.jpg" alt="Instalaciones Lucas Rojas" />
              </div>
            </div>
            <!-- Layer 2: Inner columns (6 images) -->
            <div class="layer">
              <div>
                <img src="/imagenes/proyectos/grid_7.jpg" alt="Aula Escolar" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_8.jpg" alt="Clase Tecnológica" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_9.jpg" alt="Biblioteca" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_10.jpg" alt="Trabajo en Equipo" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_11.jpg" alt="Centro Educativo" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_12.jpg" alt="Tecnología Escolar" />
              </div>
            </div>
            <!-- Layer 3: Center column top and bottom (2 images) -->
            <div class="layer">
              <div>
                <img src="/imagenes/proyectos/grid_13.jpg" alt="Diseño 3D" />
              </div>
              <div>
                <img src="/imagenes/proyectos/grid_14.jpg" alt="Equipamiento Integral" />
              </div>
            </div>
            <!-- Center scaler image -->
            <div class="scaler">
              <img src="/imagenes/proyectos/scaler.jpg" alt="Proyecto Destacado" class="scaler-img" ref="scalerImgRef" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Outro Section (Normal page flow) -->
    <div class="scroll-grid-outro-section contenedor-texto">
      <h2 class="scroll-grid-end-title">EL LÍMITE ES TU IMAGINACIÓN.</h2>
    </div>

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const animationSectionRef = ref(null);
const contentRef = ref(null);
const scalerImgRef = ref(null);
const headerOverlayRef = ref(null);
const gridRef = ref(null);

let ctx = null;

onMounted(() => {
  ctx = gsap.context(() => {
    const image = scalerImgRef.value;
    const triggerSection = animationSectionRef.value;
    const pinContent = contentRef.value;
    const layers = triggerSection.querySelectorAll('.layer');
    const headerOverlay = headerOverlayRef.value;
    const grid = gridRef.value;

    // 1. Set initial states
    gsap.set(image, {
      width: '100vw',
      height: '100vh',
      borderRadius: '0px',
      opacity: 0
    });

    gsap.set(layers, {
      opacity: 0,
      scale: 0.2
    });

    // 2. Timeline tied to ScrollTrigger of the grid animation section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: pinContent,
        invalidateOnRefresh: true,
      }
    });

    // STEP 1: Fade out header text and fade in full-screen image
    tl.to(headerOverlay, {
      opacity: 0,
      y: -50,
      duration: 0.15,
      ease: 'power1.inOut'
    }, 0);

    tl.to(image, {
      opacity: 1,
      duration: 0.15,
      ease: 'power1.inOut'
    }, 0);

    // STEP 2: Shrink center image to its grid cell and reveal surrounding grid layers
    tl.to(image, {
      width: '100%',
      height: '100%',
      borderRadius: '1rem',
      ease: 'power2.inOut',
      duration: 0.5
    }, 0.25);

    // Reveal layers progressively (staggered starts)
    layers.forEach((layer, index) => {
      const startTime = 0.35 + index * 0.08;
      
      tl.to(layer, {
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        duration: 0.4
      }, startTime);
    });

    // STEP 3: Fade out grid at the end of the sequence
    tl.to(grid, {
      opacity: 0,
      scale: 0.95,
      duration: 0.15,
      ease: 'power1.inOut'
    }, 0.85);

  }, sectionRef.value);
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
});
</script>

<style scoped>
.proyectos-page-container {
  padding-bottom: 0;
}

.proyecto-num {
    font-family: 'DM Serif Display', serif;
    font-size: 3.5rem;
    color: rgba(0,188,200,0.15);
    line-height: 1;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
    transition: color 0.3s ease;
}
.bloque:hover .proyecto-num {
    color: rgba(0,188,200,0.35);
}

/* Scroll Grid Section styles */
.scroll-grid-section-wrapper {
  background: transparent;
  width: 100%;
  overflow: clip;
  margin: 80px 0 0 0;
}

/* 1. Header Overlay */
.scroll-grid-header-overlay {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  pointer-events: none;
}

.scroll-grid-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(3rem, 10vw, 7.5rem);
  font-weight: 900;
  line-height: 0.85;
  color: var(--text);
  margin: 0;
  letter-spacing: -0.04em;
  transition: color 0.3s ease;
}

.scroll-grid-subtitle {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.2rem);
  color: var(--text-2);
  margin-top: 24px;
  max-width: 500px;
  line-height: 1.5;
  transition: color 0.3s ease;
}

/* 2. Grid Animation Section */
.scroll-grid-animation-section {
  min-height: 350vh; /* Scroll volume */
  position: relative;
  background: transparent;
}

.scroll-grid-content {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  background: transparent;
}

/* 3. Outro Section */
.scroll-grid-outro-section {
  margin-top: 50px !important;
  margin-bottom: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  text-align: center;
}

.scroll-grid-end-title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.8rem, 6vw, 4.5rem);
  font-weight: 800;
  text-align: center;
  color: var(--text);
  line-height: 1;
  letter-spacing: -0.02em;
  padding: 0 6%;
  transform: translateY(-250px);
  transition: color 0.3s ease;
}

/* Grid Layout - 5 columns x 3 rows */
.grid {
  --offset: 0;
  --container-width: 1400px;
  --gap: clamp(10px, 4vw, 40px);
  --gutter: 2rem;

  width: var(--container-width);
  max-width: calc(100% - (2 * var(--gutter)));
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: var(--gap);
  margin: 0 auto;
  align-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    --offset: -1;
    --gutter: 1rem;
  }
  
  .grid > .layer:nth-of-type(1) {
    display: none;
  }
}

/* Layers using subgrid */
.grid > .layer {
  display: grid;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
}

/* Layer 1: Outer edges - odd on left column, even on right column */
.grid > .layer:nth-of-type(1) div:nth-of-type(odd) {
  grid-column: 1;
}

.grid > .layer:nth-of-type(1) div:nth-of-type(even) {
  grid-column: -2;
}

/* Layer 2: Inner columns */
.grid > .layer:nth-of-type(2) div:nth-of-type(odd) {
  grid-column: calc(2 + var(--offset));
}

.grid > .layer:nth-of-type(2) div:nth-of-type(even) {
  grid-column: calc(-3 - var(--offset));
}

/* Layer 3: Center column top and bottom */
.grid > .layer:nth-of-type(3) div:first-of-type {
  grid-column: calc(3 + var(--offset));
  grid-row: 1;
}

.grid > .layer:nth-of-type(3) div:last-of-type {
  grid-column: calc(3 + var(--offset));
  grid-row: -1;
}

.grid img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 1rem;
}

.grid .scaler {
  position: relative;
  grid-area: 2 / calc(3 + var(--offset));
}

.scaler {
  z-index: 2;
  width: 100%;
  height: 100%;
  position: relative;
}

.scaler-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
  border-radius: 1rem;
  width: 100%;
  height: 100%;
  will-change: width, height, border-radius;
  box-shadow: 0 20px 50px rgba(0,0,0,0.6);
  max-width: none !important;
  aspect-ratio: auto !important;
}
</style>
