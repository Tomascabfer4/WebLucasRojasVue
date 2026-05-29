<template>
  <div>

    <div class="sectores-page-wrapper">
      <h1 class="titulo">SECTORES DE <span>ACTUACIÓN</span></h1>

      <div class="contenedor-texto" style="margin-bottom: 40px;">
          <p style="text-align: center; color: var(--text-2); font-size: 1.05rem;">
              Llevamos más de seis décadas adaptando nuestra oferta a las necesidades específicas de cada sector. Conozca cómo trabajamos con cada tipo de cliente.
          </p>
      </div>

      <!-- Carrusel Slider Premium -->
      <div 
        class="slider-wrapper"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
      >
        <div class="slider">
          <div 
            v-for="(sector, index) in sectors" 
            :key="sector.id" 
            class="item"
            :style="{ backgroundImage: `url(${sector.bg})` }"
          >
            <div class="thumbnail-title">{{ sector.thumbnailTitle }}</div>

            <!-- Barra de progreso visual para autoplay (solo en la tarjeta activa y si no hay modal abierto) -->
            <div v-if="index === 1 && !selectedSector" class="progress-bar-container">
              <div class="progress-bar-fill" :key="sector.id"></div>
            </div>

            <div class="content">
              <h2 class="title">{{ sector.title }}</h2>
              <p class="description">{{ sector.brief }}</p>
              <button class="more-btn" @click="openDetails(sector)">
                <span>Más información</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-arrow-svg"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Controles Combinados: Indicador Numérico, Puntos y Flechas -->
        <div class="controls-wrapper">
          <div class="fraction-indicator">
            <span class="current">{{ padZero(activeSectorIndex) }}</span>
            <span class="divider"></span>
            <span class="total">04</span>
          </div>

          <div class="slider-indicators">
            <button 
              v-for="s in originalSectors" 
              :key="s.id" 
              class="indicator-dot" 
              :class="{ active: s.id === activeSectorIndex }"
              @click="goToSlide(s.id)"
              :aria-label="`Ir a ${s.title}`"
            ></button>
          </div>

          <nav class="nav-controls">
            <button class="btn prev" @click="prevSlide" aria-label="Anterior">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-svg"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            </button>
            <button class="btn next" @click="nextSlide" aria-label="Siguiente">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-svg"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </nav>
        </div>
      </div>

      <!-- Modal Glassmórfico de Detalles -->
      <Transition name="fade-blur">
        <div v-if="selectedSector" class="modal-overlay" @click.self="closeDetails">
          <div class="modal-card">
            <button class="close-btn" @click="closeDetails" aria-label="Cerrar">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="close-svg"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div class="modal-content">
              <span class="modal-tag">Servicios Especializados</span>
              <h3 class="modal-title">{{ selectedSector.title }}</h3>
              <p class="modal-desc">{{ selectedSector.fullDesc }}</p>
              
              <div class="modal-bullets-title">¿Qué ofrecemos para este sector?</div>
              <ul class="modal-bullets">
                <li v-for="(service, idx) in selectedSector.services" :key="idx">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="bullet-check"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{{ service }}</span>
                </li>
              </ul>
              
              <router-link to="/contacto" class="modal-cta-btn" @click="closeDetails">
                Contactar con un Especialista
              </router-link>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';

const sectors = ref([
  {
    id: 1,
    thumbnailTitle: 'Pymes y Empresas',
    title: 'Pymes y Grandes Empresas',
    bg: '/imagenes/oficina.jpg',
    brief: 'Nos integramos como un brazo más de su departamento de compras. Abastecemos de forma continua consumibles, material de oficina y tecnología para que su negocio no se detenga.',
    fullDesc: 'Nos integramos de forma transparente en su operativa diaria para actuar como un brazo más de su departamento de compras y aprovisionamiento. Abastecemos de forma continua todo tipo de material de oficina, papelería corporativa, consumibles de impresión y equipamiento tecnológico de última generación. Además, proporcionamos soluciones integrales en hardware, consumibles y elementos de prevención e higiene laboral, asegurando que su negocio mantenga su ritmo operativo con la máxima eficiencia y sin interrupciones.',
    services: [
      'Suministro continuo de material de oficina y papelería comercial.',
      'Equipamiento tecnológico integral (hardware, portátiles, periféricos).',
      'Soluciones de ergonomía y mobiliario de oficina a medida.',
      'Elementos de prevención, higiene y seguridad laboral.'
    ]
  },
  {
    id: 2,
    thumbnailTitle: 'Colegios y Universidades',
    title: 'Centros de Enseñanza',
    bg: '/imagenes/IncaGarcilaso.jpg',
    brief: 'Trabajamos con colegios, institutos y universidades ofreciendo mobiliario escolar adaptado a normativas, material didáctico y soluciones tecnológicas para aulas modernas.',
    fullDesc: 'Colaboramos estrechamente con centros educativos públicos y privados —colegios, institutos, academias y universidades— para crear espacios de aprendizaje adaptados al siglo XXI. Ofrecemos una amplia gama de mobiliario escolar homologado y ergonómico diseñado para la comodidad de alumnos y docentes. Asimismo, dotamos a las aulas de la última tecnología educativa, incluyendo pizarras digitales interactivas (PDI), proyectores de alta definición y sistemas integrados de megafonía.',
    services: [
      'Mobiliario escolar homologado y ergonómico para todas las etapas.',
      'Pizarras digitales interactivas (PDI) y sistemas de proyección.',
      'Material didáctico, papelería escolar y consumibles generales.',
      'Instalación y mantenimiento de sistemas de megafonía y audio.'
    ]
  },
  {
    id: 3,
    thumbnailTitle: 'Sector Público',
    title: 'Organismos Públicos',
    bg: '/imagenes/organismosPublicos.jpg',
    brief: 'Proveedores de confianza para Ayuntamientos, Diputaciones y entes gubernamentales. Ofrecemos trazabilidad, cumplimiento presupuestario y archivo clasificado.',
    fullDesc: 'Como proveedores de confianza de administraciones públicas (Ayuntamientos, Diputaciones, Consejerías y entes gubernamentales), entendemos la importancia de la transparencia, la trazabilidad y la rigurosidad presupuestaria. Suministramos soluciones integrales de archivo clasificado de alta densidad, equipamiento para oficinas de atención al ciudadano y consumibles generales bajo contratos marco y licitaciones públicas.',
    services: [
      'Licitaciones públicas y cumplimiento estricto de plazos.',
      'Sistemas de archivo clasificado, estanterías y orden documental.',
      'Equipamiento de salas de atención ciudadana y áreas administrativas.',
      'Trazabilidad total en facturación electrónica y convenios.'
    ]
  },
  {
    id: 4,
    thumbnailTitle: 'Imprenta y Diseño',
    title: 'Imprenta y Artes Gráficas',
    bg: '/imagenes/fondoMaterial.png',
    brief: 'Diseño, redacción e impresión bajo un único estándar de excelencia. Ofrecemos papelería comercial, revistas, catálogos y gran formato.',
    fullDesc: 'Ofrecemos una gama completa de servicios de artes gráficas y reprografía que incluye papelería corporativa, informes anuales, folletos, revistas, calendarios y cartelería de gran formato. Garantizamos acabados de alta calidad con plazos de entrega rigurosamente ajustados y precios altamente competitivos. Si además de la impresión digital u offset necesita desarrollar su identidad, diseñamos logotipos, catálogos promocionales, invitaciones y vinilos decorativos, ofreciéndole un servicio de comunicación gráfica integral desde el boceto inicial hasta la producción.',
    services: [
      'Impresión offset y digital de alta calidad en todo tipo de soportes.',
      'Papelería comercial, catálogos, folletos y revistas corporativas.',
      'Diseño gráfico profesional, logotipos e identidad de marca.',
      'Cartelería de gran formato y vinilos corporativos a medida.'
    ]
  }
]);

// Lista estática original para renderizar los indicadores de puntos
const originalSectors = [
  { id: 1, title: 'Pymes y Grandes Empresas' },
  { id: 2, title: 'Centros de Enseñanza' },
  { id: 3, title: 'Organismos Públicos' },
  { id: 4, title: 'Imprenta y Artes Gráficas' }
];

const selectedSector = ref(null);

// Computados para controlar el slide activo
const activeSectorIndex = computed(() => {
  return sectors.value[1]?.id || 1;
});

const padZero = (num) => `0${num}`.slice(-2);

// Autoplay Logic
let autoplayTimer = null;
const AUTOPLAY_DELAY = 8000; // 8 segundos

function startAutoplay() {
  stopAutoplay();
  if (selectedSector.value) return; // No reproducir si el modal está abierto
  
  autoplayTimer = setInterval(() => {
    nextSlide();
  }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
}

function resetAutoplay() {
  startAutoplay();
}

function nextSlide() {
  const first = sectors.value.shift();
  sectors.value.push(first);
  resetAutoplay();
}

function prevSlide() {
  const last = sectors.value.pop();
  sectors.value.unshift(last);
  resetAutoplay();
}

function goToSlide(sectorId) {
  const targetIndex = sectors.value.findIndex(s => s.id === sectorId);
  const shiftAmount = targetIndex - 1; // Queremos que sea el índice 1 (activo)
  
  if (shiftAmount > 0) {
    for (let i = 0; i < shiftAmount; i++) {
      sectors.value.push(sectors.value.shift());
    }
  } else if (shiftAmount < 0) {
    for (let i = 0; i < Math.abs(shiftAmount); i++) {
      sectors.value.unshift(sectors.value.pop());
    }
  }
  resetAutoplay();
}

function openDetails(sector) {
  selectedSector.value = sector;
  stopAutoplay();
}

function closeDetails() {
  selectedSector.value = null;
  startAutoplay();
}

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<style scoped>
.sectores-page-wrapper {
  max-width: 1380px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.slider-wrapper {
  position: relative;
  width: 100%;
  height: 650px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  margin-top: 40px;
  margin-bottom: 80px;
  background: #06090d;
}

.slider {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.item {
  width: 200px;
  height: 300px;
  list-style-type: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: transform 0.1s, left 0.75s, top 0.75s, width 0.75s, height 0.75s, border-radius 0.75s, box-shadow 0.75s;
}

.item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(6, 9, 13, 0.9) 0%, rgba(6, 9, 13, 0.5) 50%, rgba(6, 9, 13, 0.15) 100%);
  border-radius: inherit;
  opacity: 0;
  transition: opacity 0.75s ease;
  z-index: 1;
}

.item:nth-child(1), 
.item:nth-child(2) {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: none;
  border-radius: 0;
  box-shadow: none;
  border: none;
  z-index: 1;
}

.item:nth-child(1)::before, 
.item:nth-child(2)::before {
  opacity: 1;
}

.item:nth-child(3) { left: 55%; }
.item:nth-child(4) { left: calc(55% + 225px); }
.item:nth-child(5) { left: calc(55% + 450px); }
.item:nth-child(6) { left: calc(55% + 675px); opacity: 0; }

.thumbnail-title {
  position: absolute;
  bottom: 1.5rem;
  left: 1.25rem;
  right: 1.25rem;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
  z-index: 5;
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 1;
}

.item:nth-child(1) .thumbnail-title,
.item:nth-child(2) .thumbnail-title {
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
}

.progress-bar-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  z-index: 12;
}

.progress-bar-fill {
  height: 100%;
  background: var(--accent);
  width: 0%;
  animation: fillProgress 8s linear forwards;
}

.slider-wrapper:hover .progress-bar-fill {
  animation-play-state: paused;
}

@keyframes fillProgress {
  from { width: 0%; }
  to { width: 100%; }
}

.content {
  width: min(38vw, 520px);
  position: absolute;
  top: 50%;
  left: 4.5rem;
  transform: translateY(-50%);
  font-family: 'Outfit', sans-serif;
  color: white;
  text-shadow: 0 3px 8px rgba(0,0,0,0.5);
  opacity: 0;
  display: none;
  z-index: 3;
}

.content .title {
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 3.5vw, 2.8rem);
  font-weight: 700;
  line-height: 1.15;
  margin: 0;
  color: white;
}

.content .description {
  line-height: 1.6;
  margin: 1.25rem 0 1.75rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
}

.more-btn {
  width: fit-content;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 100px;
  padding: 12px 28px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.more-btn:hover {
  background: white;
  color: #06090d;
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.2);
}

.btn-arrow-svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  transition: transform 0.3s ease;
}

.more-btn:hover .btn-arrow-svg {
  transform: translateX(4px);
}

.item:nth-child(2) .content {
  display: block;
  animation: showContent 0.8s ease-in-out 0.2s forwards;
}

@keyframes showContent {
  0% {
    filter: blur(8px);
    transform: translateY(calc(-50% + 50px));
    opacity: 0;
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(-50%);
  }
}

/* Controles combinados */
.controls-wrapper {
  position: absolute;
  bottom: 2.5rem;
  left: 4.5rem;
  display: flex;
  align-items: center;
  gap: 32px;
  z-index: 10;
  user-select: none;
}

.fraction-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Outfit', sans-serif;
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
}

.fraction-indicator .current {
  color: var(--accent);
  font-weight: 700;
}

.fraction-indicator .divider {
  width: 12px;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
}

.fraction-indicator .total {
  opacity: 0.6;
}

.slider-indicators {
  display: flex;
  gap: 8px;
}

.indicator-dot {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.45);
}

.indicator-dot.active {
  background: var(--accent);
  width: 24px;
  border-radius: 100px;
}

.nav-controls {
  display: flex;
  gap: 12px;
}

.nav-controls .btn {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-controls .btn:hover {
  background: white;
  color: #06090d;
  border-color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
}

.arrow-svg {
  width: 22px;
  height: 22px;
  stroke: currentColor;
  stroke-width: 2;
}

/* Modal de Detalle */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(6, 9, 13, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  width: 100%;
  max-width: 640px;
  position: relative;
  padding: 40px;
  box-sizing: border-box;
  animation: modalEnter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

[data-theme="light"] .modal-card {
  background: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 30px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6);
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

[data-theme="light"] .close-btn {
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.08);
  color: #111827;
}

.close-btn:hover {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
  transform: rotate(90deg);
}

.close-svg {
  width: 18px;
  height: 18px;
}

.modal-tag {
  color: var(--accent);
  font-family: 'Outfit', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  margin-bottom: 8px;
}

.modal-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text);
  margin: 0 0 20px 0;
  line-height: 1.2;
}

.modal-desc {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-2);
  margin-bottom: 28px;
  text-align: justify;
}

.modal-bullets-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text);
  margin-bottom: 14px;
}

.modal-bullets {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.modal-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  color: var(--text-2);
  line-height: 1.4;
}

.bullet-check {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}

.modal-cta-btn {
  display: block;
  width: 100%;
  text-align: center;
  background: var(--accent);
  color: white !important;
  border-radius: 12px;
  padding: 16px;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.modal-cta-btn:hover {
  opacity: 0.93;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0, 200, 215, 0.25);
}

/* Animations */
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Transitions */
.fade-blur-enter-active,
.fade-blur-leave-active {
  transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
}

.fade-blur-enter-from,
.fade-blur-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

/* Responsive para tablets y móviles */
@media (max-width: 1024px) {
  .slider-wrapper {
    height: 580px;
  }
  
  .item {
    width: 160px;
    height: 240px;
  }
  
  .item:nth-child(3) { left: 55%; }
  .item:nth-child(4) { left: calc(55% + 180px); }
  .item:nth-child(5) { left: calc(55% + 360px); }
  .item:nth-child(6) { left: calc(55% + 540px); }
}

@media (max-width: 768px) {
  .slider-wrapper {
    height: 520px;
    border-radius: 16px;
  }
  
  .item:nth-child(3),
  .item:nth-child(4),
  .item:nth-child(5),
  .item:nth-child(6) {
    display: none;
  }

  .controls-wrapper {
    left: 2rem;
    bottom: 2rem;
    gap: 16px;
  }
  
  .content {
    left: 2rem;
    right: 2rem;
    width: auto;
  }
  
  .modal-card {
    padding: 30px 20px;
  }
  
  .modal-title {
    font-size: 1.8rem;
  }
  
  .modal-bullets {
    grid-template-columns: 1fr;
  }
}
</style>
