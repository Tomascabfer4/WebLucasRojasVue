<template>
  <div>

    <h1 class="titulo">SOBRE <span>LUCAS ROJAS</span></h1>

    <div class="contenedor-texto">
      <div class="parrafo">
        <p class="lead-paragraph">
          Somos una empresa dedicada al sector del suministro integral y
          material de oficina a nivel nacional. Tras
          <strong>más de 60 años a su servicio</strong> —desde nuestra fundación
          en 1961 en La Rambla—, contamos con una avanzada tienda online,
          establecimientos físicos de venta directa y un equipo humano de
          profesionales altamente cualificados.
        </p>
        <p>
          Nuestra vocación de servicio y la confianza de nuestros clientes han
          hecho que aquella empresa familiar se convierta, hoy en día, en uno de
          los <strong>suministradores B2B de referencia</strong> de nuestra
          provincia. En septiembre de 2024 inauguramos nuestras nuevas
          instalaciones logísticas en Montilla (Av. de Europa, 21), preparadas
          para los retos del mercado actual.
        </p>
        <p>
          Disponemos de un catálogo con
          <strong>más de 35.000 referencias en stock</strong>. Contamos con
          departamentos especializados en <strong>Mobiliario</strong>,
          <strong>Informática</strong> y <strong>Audiovisuales</strong>,
          preparados para asesorarle en la implantación de nuevas aulas,
          despachos o almacenes, con el compromiso de hacer llegar sus pedidos
          en 24 a 48 horas.
        </p>
      </div>
    </div>

    <hr class="separador" />

    <section class="history-horizontal-section" ref="historySectionRef" aria-label="Linea de tiempo de Lucas Rojas">
      <div class="history-pin" ref="historyPinRef">
        <div class="history-heading">
          <p>Trayectoria</p>
          <h2>NUESTRA <span>HISTORIA</span></h2>
        </div>

        <div class="history-viewport" ref="historyViewportRef">
          <div class="history-track" ref="historyTrackRef">
            <!-- Sine-wave path drawn by JS -->
            <svg ref="historyWaveRef" class="history-wave" aria-hidden="true">
              <path ref="historyWavePathRef" />
            </svg>

            <!-- Traveller logo: lives at the track level so it can ride
                 over each year-marker (z-index above .history-item). -->
            <div ref="historyTravelerRef" class="history-traveler" aria-hidden="true">
              <img src="/imagenes/logoRecortado.png" alt="" />
            </div>

            <div
              v-for="(item, index) in timelineItems"
              :key="item.year"
              class="history-item"
              :class="index % 2 === 0 ? 'is-valley' : 'is-crest'"
            >
              <div class="history-year-marker">
                <span class="history-year-text">{{ item.year }}</span>
              </div>

              <div class="history-card-body">
                <div class="history-card-copy">
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.text }}</p>
                  <ul v-if="item.points" class="history-points">
                    <li v-for="point in item.points" :key="point">{{ point }}</li>
                  </ul>
                </div>

                <div class="history-icon" aria-hidden="true">
                  <svg v-if="item.icon === 'book'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
                  </svg>
                  <svg v-else-if="item.icon === 'handshake'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <!-- Two people side by side (relevo generacional) -->
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <svg v-else-if="item.icon === 'monitor'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8" />
                    <path d="M12 16v4" />
                    <path d="M8 11l3-3 2 2 3-4" />
                  </svg>
                  <svg v-else-if="item.icon === 'warehouse'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 21V8l9-4 9 4v13" />
                    <path d="M7 21v-8h10v8" />
                    <path d="M10 17h4" />
                  </svg>
                  <svg v-else-if="item.icon === 'anniversary'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <!-- Birthday cake with candles (50 aniversario) -->
                    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                    <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
                    <path d="M2 21h20" />
                    <path d="M7 8v3" />
                    <path d="M12 8v3" />
                    <path d="M17 8v3" />
                    <path d="M7 4h.01" />
                    <path d="M12 4h.01" />
                    <path d="M17 4h.01" />
                  </svg>
                  <svg v-else-if="item.icon === 'route'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <!-- Two pins connected by an S-curve, all inside the viewBox -->
                    <circle cx="6" cy="4" r="2" />
                    <circle cx="18" cy="20" r="2" />
                    <path d="M8 4h4a4 4 0 0 1 0 8h-2a4 4 0 0 0 0 8h4" />
                  </svg>
                  <svg v-else-if="item.icon === 'award'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M8.5 12.5L7 22l5-3 5 3-1.5-9.5" />
                    <path d="M9.5 8l1.8 1.8L15 6" />
                  </svg>
                  <svg v-else-if="item.icon === 'puzzle'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <!-- Proper closed puzzle piece outline (resiliencia/adaptación) -->
                    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.609-1.61a2.402 2.402 0 0 1 1.704-.707c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02" />
                  </svg>
                  <svg v-else-if="item.icon === 'crown'" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 8l5 4 4-7 4 7 5-4-2 11H5L3 8z" />
                    <path d="M5 21h14" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M3 21h18" />
                    <path d="M5 21V8l7-5 7 5v13" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="history-progress" aria-hidden="true">
          <span ref="historyProgressRef"></span>
        </div>
      </div>
    </section>

    <hr class="separador" />

    <h2 class="titulo">¿POR QUÉ <span>ELEGIRNOS?</span></h2>

    <div class="servicios" style="margin-bottom: 80px">
      <div class="servicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="nosotros-icon-svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <h2>Consultoría de Compras</h2>
        <p>
          Nos convertimos en el colaborador externo de su Departamento de
          Compras, ahorrándole tiempo y costes en cada pedido.
        </p>
      </div>
      <div class="servicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="nosotros-icon-svg"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <h2>Búsqueda Personalizada</h2>
        <p>
          Si no encuentra un producto en nuestro catálogo, nuestro equipo lo
          buscará y negociará directamente con los fabricantes.
        </p>
      </div>
      <div class="servicio">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="nosotros-icon-svg"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
        <h2>Almacén Central</h2>
        <p>
          Gestionamos un almacén central en Montilla desde el que se sirven
          diariamente todos los pedidos recibidos a nivel nacional.
        </p>
      </div>
    </div>
    <hr class="separador">
    <h2 class="titulo"> NUESTRA <span>MISIÓN, VISIÓN Y VALORES</span></h2>

    <div class="cat">
      <div class="acordeon" :class="{ 'is-open': accordionState.mision }">
          <div class="summary" @click="toggleAccordion('mision')" tabindex="0" @keypress.enter="toggleAccordion('mision')">MISIÓN</div>
          <div class="contenido-wrapper">
            <div class="contenido-inner">
              <div class="contenido">
                Satisfacer las necesidades de nuestros clientes proporcionándoles la mejor calidad en el servicio, los precios más ajustados en los más de 35.000 productos de nuestro catálogo. Dotando a nuestra empresa de un trato humano y cercano, que garantice la labor de confianza hacia los clientes.
              </div>
            </div>
          </div>
      </div>

      <div class="acordeon" :class="{ 'is-open': accordionState.vision }">
          <div class="summary" @click="toggleAccordion('vision')" tabindex="0" @keypress.enter="toggleAccordion('vision')">VISIÓN</div>
          <div class="contenido-wrapper">
            <div class="contenido-inner">
              <div class="contenido">
                Mantenernos como empresa referente en el suministro de material de oficina y servicios dónde la satisfacción de los clientes sea su mayor característica, conseguir la realización personal y profesional de nuestros empleados y contribuir al engrandecimiento de nuestra sociedad de manera social, económica, y medioambiental.
              </div>
            </div>
          </div>
      </div>

      <div class="acordeon" :class="{ 'is-open': accordionState.valores }">
          <div class="summary" @click="toggleAccordion('valores')" tabindex="0" @keypress.enter="toggleAccordion('valores')">VALORES</div>
          <div class="contenido-wrapper">
            <div class="contenido-inner">
              <div class="contenido">
                <ul class="valores-lista">
                  <li>
                      <svg class="val-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Confianza
                  </li>
                  <li>
                      <svg class="val-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Calidad
                  </li>
                  <li>
                      <svg class="val-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Compromiso
                  </li>
                  <li>
                      <svg class="val-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Responsabilidad
                  </li>
                  <li>
                      <svg class="val-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Sostenibilidad
                  </li>
                  <li>
                      <svg class="val-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Innovación
                  </li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    </div>

    <h2 class="titulo">NUESTRO <span>DOSSIER CORPORATIVO </span></h2>

    <div class="dossier">
      <div class="dossier-shell">
        <div class="dossier-copy">
          <p class="dossier-eyebrow">Presentacion Corporativa</p>
          <h3>Una vista previa cuidada, alineada con la imagen de Lucas Rojas.</h3>
          <p>
            Consulte nuestro dossier en un entorno mas limpio, con accesos directos
            para abrirlo en una nueva pestana o descargarlo cuando lo necesite.
          </p>
          <div class="dossier-meta">
            <span>Vista previa integrada</span>
            <span>PDF descargable</span>
          </div>
          <div class="dossier-actions">
            <a
              href="https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/dossierCorporativo.pdf"
              class="btn-primary"
              target="_blank"
              rel="noopener"
              >Abrir dossier</a
            >
            <a href="https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/dossierCorporativo.pdf" class="dossier-link" download
              >Descargar PDF</a
            >
          </div>
        </div>

        <div class="dossier-viewer">
          <div class="dossier-viewer-bar" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <p>Cuaderno corporativo</p>
          </div>
          <div class="dossier-book-shell">
            <div
              class="dossier-book"
              id="dossier-book"
              data-pdf-src="https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/dossierCorporativo.pdf"
              aria-label="Vista previa del dossier corporativo"
            >
              <div class="dossier-book-loading">
                Preparando la experiencia tipo cuaderno...
              </div>
            </div>

            <div class="dossier-book-controls" aria-label="Controles del dossier">
              <button
                type="button"
                class="dossier-nav dossier-nav-prev"
                id="dossier-prev"
                aria-label="Pagina anterior"
              >
                Anterior
              </button>
              <p class="dossier-book-status" id="dossier-status" aria-live="polite">
                Preparando paginas...
              </p>
              <button
                type="button"
                class="dossier-nav dossier-nav-next"
                id="dossier-next"
                aria-label="Pagina siguiente"
              >
                Siguiente
              </button>
            </div>
          </div>

          <p class="dossier-viewer-note">
            Pase las paginas con los botones y disfrute de una transicion tipo cuaderno.
          </p>
        </div>
      </div>
    </div>
    
    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';
import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { initDossierNotebook } from '../dossierVue.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const accordionState = ref({
  mision: false,
  vision: false,
  valores: false
});

const historySectionRef = ref(null);
const historyPinRef = ref(null);
const historyViewportRef = ref(null);
const historyTrackRef = ref(null);
const historyProgressRef = ref(null);
const historyWaveRef = ref(null);
const historyWavePathRef = ref(null);
const historyTravelerRef = ref(null);

const timelineItems = [
  {
    year: '1962',
    title: 'Fundacion',
    text: 'D. Lucas Rojas Lovera crea un pequeno negocio de libreria, papeleria, articulos de escritorio y jugueteria.',
    icon: 'book'
  },
  {
    year: '1991',
    title: 'Relevo generacional',
    text: 'Fallece Lucas Rojas y toman las riendas de la tienda su mujer Mercedes Lopez y su hijo Tomas Luis Rojas Lopez.',
    icon: 'handshake'
  },
  {
    year: '1998',
    title: 'Transformacion digital',
    text: 'Comenzamos a dar servicio a empresas, invirtiendo en el primer ERP para informatizar el negocio y adaptarlo a las nuevas tecnologias.',
    icon: 'monitor'
  },
  {
    year: '2006',
    title: 'Expansion de logistica',
    text: 'Se adquiere el local colindante, convirtiendose en nuestro primer almacen de material.',
    icon: 'warehouse'
  },
  {
    year: '2012',
    title: '50 aniversario',
    text: 'La empresa cumple 50 anos. Se crea una nueva imagen corporativa y se renueva todo el mobiliario de la empresa.',
    icon: 'anniversary'
  },
  {
    year: '2015',
    title: 'Salto regional',
    text: 'Nuestros clientes pasan a ser de ambito regional. Incorporamos un sistema de CRM y Big Data para dar un mejor servicio.',
    icon: 'route'
  },
  {
    year: '2018',
    title: 'Modernizacion y calidad',
    text: 'Nos mudamos a nuevas oficinas y un amplio almacen. Renovamos nuestra web y nos certificamos ISO 9001/14001.',
    icon: 'award'
  },
  {
    year: '2020',
    title: 'Resiliencia y adaptacion',
    text: 'Con la llegada del Covid-19, supimos adaptarnos y adelantarnos rapidamente a las nuevas demandas de nuestros clientes.',
    icon: 'puzzle'
  },
  {
    year: '2022',
    title: '60 aniversario',
    text: 'Alcanzamos las 6 decadas de historia y consolidamos nuestra posicion como referentes en nuestro sector.',
    icon: 'crown'
  },
  {
    year: 'HOY',
    title: 'Nueva sede en Montilla',
    text: 'Inauguramos nuestra nueva sede central de 2000m2 con logistica automatizada y vanguardia tecnologica.',
    icon: 'building',
    points: [
      'Inversion superior a 800.000 euros.',
      'Nave de 1.200 m2 con oficinas en dos plantas.',
      'Concesion oficial de la marca nacional Lucas Rojas.'
    ]
  }
];

let historyCtx = null;
let resizeTimeout = null;

function toggleAccordion(key) {
  accordionState.value[key] = !accordionState.value[key];
}

function setupHistoryTimeline() {
  if (historyCtx) {
    historyCtx.revert();
  }

  const section = historySectionRef.value;
  const pin = historyPinRef.value;
  const viewport = historyViewportRef.value;
  const track = historyTrackRef.value;
  const progress = historyProgressRef.value;
  const wave = historyWaveRef.value;
  const wavePath = historyWavePathRef.value;

  if (!section || !pin || !viewport || !track || !progress || !wave || !wavePath) return;

  // On small screens the CSS vertical layout takes over – no GSAP needed
  if (window.innerWidth < 768) return;

  historyCtx = gsap.context(() => {
    const traveler = historyTravelerRef.value;
    const items    = gsap.utils.toArray(section.querySelectorAll('.history-item'));

    if (!traveler || items.length < 2) return;

    // ─── Wave parameters ───────────────────────────────────────────
    const numItems  = items.length;
    const spacing   = 460;          // px between consecutive item centres
    const padX      = 340;          // left / right padding – half-spacing gives natural wave entry
    const trackH    = 540;          // track height in px
    const centerY   = trackH / 2;  // 270
    const amplitude = 130;          // sine amplitude in px
    const totalWidth = padX + (numItems - 1) * spacing + padX;

    // ─── Size the track ────────────────────────────────────────────
    gsap.set(track, { width: totalWidth, height: trackH, x: 0 });
    gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });

    // ─── Item positions on the sine wave ───────────────────────────
    // cos(π·i): even index → +1 → valley (y = centerY + amplitude)
    //           odd  index → -1 → crest  (y = centerY − amplitude)
    const itemY = (i) => centerY + amplitude * Math.cos(Math.PI * i);
    const itemX = (i) => padX + i * spacing;

    items.forEach((item, i) => {
      gsap.set(item, {
        position : 'absolute',
        left     : itemX(i),
        top      : itemY(i),
        xPercent : -50,
        yPercent : -50
      });
    });

    // ─── Generate smooth cubic-bezier sine-wave path ──────────────
    // Each half-period uses a cubic bezier with horizontal tangents
    // at every peak/trough – exactly approximates a cosine curve.
    const valleyY = centerY + amplitude;
    const crestY  = centerY - amplitude;
    const k       = 0.3643; // Bezier control-point factor for cosine approximation

    // Waypoints: the wave starts exactly at item 0 and ends at item n-1
    // (no entry/exit half-periods → no dangling wave segments left or right).
    const waypoints = [];
    for (let i = 0; i < numItems; i++) {
      waypoints.push({ x: itemX(i), y: i % 2 === 0 ? valleyY : crestY });
    }

    // Build cubic bezier path (horizontal tangents ⇒ P1.y = P0.y, P2.y = P3.y)
    const parts = [`M ${waypoints[0].x.toFixed(1)} ${waypoints[0].y.toFixed(1)}`];
    for (let i = 0; i < waypoints.length - 1; i++) {
      const p0 = waypoints[i];
      const p3 = waypoints[i + 1];
      const dx = p3.x - p0.x;
      parts.push(
        `C ${(p0.x + k * dx).toFixed(1)} ${p0.y.toFixed(1)},` +
        ` ${(p3.x - k * dx).toFixed(1)} ${p3.y.toFixed(1)},` +
        ` ${p3.x.toFixed(1)} ${p3.y.toFixed(1)}`
      );
    }
    wavePath.setAttribute('d', parts.join(' '));
    wave.setAttribute('viewBox', `0 0 ${totalWidth} ${trackH}`);
    wave.style.width  = totalWidth + 'px';
    wave.style.height = trackH + 'px';

    // ─── Traveller starts at item 0 (valley) ───────────────────────
    // The traveler is a direct child of .history-track, positioned absolutely
    // at item 0's centre. As the timeline scrubs we apply (x, y) deltas to ride
    // the sine wave from item 0 to item n-1.
    const startY     = itemY(0);   // centerY + amplitude
    const travelSpan = (numItems - 1) * spacing;  // item 0 → item n-1
    gsap.set(traveler, {
      position : 'absolute',
      left     : itemX(0),
      top      : itemY(0),
      xPercent : -50,
      yPercent : -50,
      x        : 0,
      y        : 0
    });

    const getDistance = () => Math.max(0, totalWidth - viewport.clientWidth);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        // Longer scrub distance so the wave is slower and feels less rushed.
        end: () => '+=' + (getDistance() * 1.7 + window.innerHeight * 1.2),
        scrub: 1.2,
        pin,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    // Small breathing pauses at the START and the END of the timeline so the
    // section doesn't kick off / cut off abruptly. Nothing moves during these
    // holds — the scroll just "idles" on the pinned section.
    const introHold = 0.00;                          // 4% of the timeline at the start
    const outroHold = 0.04;                          // 4% of the timeline at the end
    const motionDur = 1 - introHold - outroHold;     // remaining 92% runs the animation

    // Horizontal pan
    tl.to(track, {
      x    : () => -getDistance(),
      ease : 'none',
      duration: motionDur
    }, introHold);

    // Traveller rides the full timeline from item 0 to item n-1.
    // The traveler is a direct child of .history-track (at track-x = padX initially),
    // so it inherits the horizontal pan from the track. We only add the
    // delta from item 0's position to the current point on the wave:
    //   traveler.x = (padX + p * travelSpan) − padX = p * travelSpan
    // At p=1 the traveler sits exactly on top of the last item (HOY).
    const pathProxy = { p: 0 };
    tl.to(pathProxy, {
      p        : 1,
      ease     : 'none',
      duration : motionDur,
      onUpdate() {
        const travelerTrackX = padX + pathProxy.p * travelSpan;
        const phase          = Math.PI * (travelerTrackX - padX) / spacing;
        const newY           = centerY + amplitude * Math.cos(phase);
        gsap.set(traveler, {
          x : travelerTrackX - padX,   // delta from item 0 along the track (track pan is inherited)
          y : newY - startY            // ride the sine vertically
        });
      }
    }, introHold);

    // Progress bar
    tl.to(progress, {
      scaleX   : 1,
      ease     : 'none',
      duration : motionDur
    }, introHold);

    // Empty tail tween → forces the timeline's total duration to be 1.0 so the
    // last `outroHold` of scroll stays pinned with nothing moving further.
    // (Without this, GSAP would trim the timeline to the last real tween and
    //  the outro pause would be invisible.)
    tl.to({}, { duration: outroHold }, introHold + motionDur);
  }, section);

  ScrollTrigger.refresh();
}

function handleHistoryResize() {
  window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(setupHistoryTimeline, 180);
}

onMounted(async () => {
  initDossierNotebook();
  await nextTick();
  setupHistoryTimeline();
  window.addEventListener('resize', handleHistoryResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleHistoryResize);
  window.clearTimeout(resizeTimeout);
  if (historyCtx) {
    historyCtx.revert();
  }
});
</script>

<style scoped>
.nosotros-icon {
  font-size: 2rem;
  margin-bottom: 16px;
  line-height: 1;
}

/* ══════════════════════════════════════════════════════════════
   HISTORIA – horizontal sine-wave timeline
   ══════════════════════════════════════════════════════════════ */

.history-horizontal-section {
  position: relative;
  width: 100%;
  margin: 70px 0;
  overflow: hidden;
}

.history-pin {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
  padding: 76px 0 52px;
  /* Transparent base so the section blends with the page background in both
     themes — no hard step between the page and the timeline section.
     Only the subtle grid pattern overlays on top. */
  background:
    linear-gradient(rgba(0, 200, 215, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 215, 0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}

.history-heading {
  width: min(1180px, 88vw);
  margin: 0 auto;
}

.history-heading p {
  margin: 0 0 8px;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
}

.history-heading h2 {
  margin: 0;
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.3rem, 7vw, 5.4rem);
  font-weight: 900;
  line-height: 0.95;
}

.history-heading h2 span {
  color: var(--accent);
}

/* Clips the horizontal overflow of the track while keeping cards
   that extend above/below the track height visible. */
.history-viewport {
  width: 100%;
  overflow-x: hidden;
  overflow-y: visible;
}

/* Track: width & height set by GSAP, panned on scroll */
.history-track {
  position: relative;
  will-change: transform;
}

/* ── Sine-wave SVG ─────────────────────────────────────────── */

.history-wave {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  overflow: visible;
}

.history-wave path {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.75;
  filter: drop-shadow(0 0 8px rgba(0, 200, 215, 0.4));
}

/* ── Individual timeline items ─────────────────────────────── */

/* Each item is a 72×72 box centred on its sine-wave point.
   left / top / xPercent / yPercent are injected by GSAP. */
.history-item {
  position: absolute;
  width: 72px;
  height: 72px;
  z-index: 1;
}

.history-year-marker {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 200, 215, 0.55);
  background: var(--bg-2);
  display: grid;
  place-items: center;
  box-shadow: var(--shadow-glass), 0 0 0 8px rgba(0, 200, 215, 0.08);
  z-index: 4;
}

/* Year label – sits centred INSIDE the marker circle */
.history-year-text {
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: var(--text);
  white-space: nowrap;
  text-align: center;
  pointer-events: none;
  user-select: none;
}

/* Traveller – animated logo that rides the wave */
@keyframes travelerPulse {
  0%, 100% { box-shadow: 0 0 0 10px rgba(0,200,215,0.14), 0 12px 32px rgba(0,0,0,0.32); }
  50%       { box-shadow: 0 0 0 20px rgba(0,200,215,0.04), 0 12px 32px rgba(0,0,0,0.32); }
}

.history-traveler {
  position: absolute;
  width: 84px;
  height: 84px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid rgba(255, 255, 255, 0.6);
  display: grid;
  place-items: center;
  animation: travelerPulse 2.2s ease-in-out infinite;
  z-index: 30;          /* sits above every .history-item (z-index 1) */
  will-change: transform;
  pointer-events: none;
}

.history-traveler img {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

/* ── Card body (glass card above or below the year circle) ─── */

.history-card-body {
  position: absolute;
  width: 260px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: 1fr 52px;
  gap: 14px;
  align-items: center;
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  box-shadow: var(--shadow-glass);
  white-space: normal;
}

/* Connector line: thin gradient from card edge to the marker */
.history-card-body::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 1.5px;
  height: 20px;
  opacity: 0.45;
  pointer-events: none;
}

.history-item.is-valley .history-card-body::after {
  top: 100%;
  background: linear-gradient(to bottom, var(--accent), transparent);
}

.history-item.is-crest .history-card-body::after {
  bottom: 100%;
  background: linear-gradient(to top, var(--accent), transparent);
}

/* Valley items (even index): marker sits at bottom → card floats above */
.history-item.is-valley .history-card-body {
  bottom: calc(100% + 20px);
}

/* Crest items (odd index): marker sits at top → card hangs below */
.history-item.is-crest .history-card-body {
  top: calc(100% + 20px);
}

.history-card-copy h3 {
  margin: 0 0 6px;
  color: var(--text);
  font-size: clamp(0.88rem, 1.4vw, 1.05rem);
  font-weight: 900;
  line-height: 1.1;
  text-transform: uppercase;
}

.history-card-copy p,
.history-points {
  margin: 0;
  color: var(--text-2);
  font-size: 0.8rem;
  line-height: 1.45;
}

.history-points {
  margin-top: 8px;
  padding-left: 16px;
}

.history-icon {
  width: 56px;
  height: 56px;
  color: var(--accent);
  opacity: 0.85;
}

.history-icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ── Progress bar ─────────────────────────────────────────── */

.history-progress {
  width: min(1180px, 88vw);
  height: 3px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(125, 143, 166, 0.2);
}

.history-progress span {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left center;
}

/* ── Theme overrides ─────────────────────────────────────── */

[data-theme="light"] .history-pin {
  /* Same idea in light theme: transparent base, only the grid overlay
     (with a darker stroke so it's still visible on a light page bg). */
  background:
    linear-gradient(rgba(0, 150, 165, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 150, 165, 0.055) 1px, transparent 1px);
  background-size: 48px 48px;
}

[data-theme="light"] .history-year-marker {
  background: #ffffff;
  border-color: rgba(0, 125, 140, 0.28);
}

[data-theme="light"] .history-card-body {
  background: rgba(255, 255, 255, 0.78);
  border-color: rgba(0, 0, 0, 0.08);
}

/* ── Mobile: vertical stacked list ──────────────────────── */

@media (max-width: 760px) {
  .history-pin {
    min-height: auto;
    padding: 60px 0 48px;
  }

  .history-viewport {
    overflow: visible;
  }

  /* Disable GSAP-driven absolute layout */
  .history-track {
    display: flex !important;
    flex-direction: column !important;
    width: auto !important;
    height: auto !important;
    transform: none !important;
    gap: 20px;
    padding: 16px 20px;
  }

  .history-wave {
    display: none;
  }

  .history-traveler {
    display: none;
  }

  .history-item {
    position: relative !important;
    left: auto !important;
    top: auto !important;
    width: auto !important;
    height: auto !important;
    transform: none !important;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 14px;
  }

  .history-year-marker {
    flex: 0 0 60px;
    height: 60px;
  }

  .history-card-body {
    position: relative !important;
    left: auto !important;
    bottom: auto !important;
    top: auto !important;
    transform: none !important;
    width: auto !important;
    flex: 1;
    grid-template-columns: 1fr;
  }

  .history-icon {
    display: none;
  }

  .history-progress {
    display: none;
  }
}


/* Animaciones del Acordeón con Grid */
.contenido-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.acordeon.is-open .contenido-wrapper {
  grid-template-rows: 1fr;
}

.contenido-inner {
  overflow: hidden;
}

.contenido {
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  visibility: hidden;
}

.acordeon.is-open .contenido {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s, visibility 0s;
}

.acordeon.is-open .summary::after {
  transform: rotate(180deg);
}
</style>
