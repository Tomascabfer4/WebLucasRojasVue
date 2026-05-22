<template>
  <div>
    <h1 class="titulo">SOBRE <span>LUCAS ROJAS</span></h1>

    <div class="contenedor-texto">
      <div class="parrafo">
        <p>
          Somos una empresa dedicada al sector del suministro integral y
          material de oficina a nivel nacional. Tras
          <strong>más de 60 años a su servicio</strong> —desde nuestra fundación
          en 1961 en La Rambla—, contamos con una avanzada tienda online,
          establecimientos físicos de venta directa y un equipo humano de
          profesionales altamente cualificados.
        </p>
        <br />
        <p>
          Nuestra vocación de servicio y la confianza de nuestros clientes han
          hecho que aquella empresa familiar se convierta, hoy en día, en uno de
          los <strong>suministradores B2B de referencia</strong> de nuestra
          provincia. En septiembre de 2024 inauguramos nuestras nuevas
          instalaciones logísticas en Montilla (Av. de Europa, 21), preparadas
          para los retos del mercado actual.
        </p>
        <br />
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

    <h2 class="titulo">¿POR QUÉ <span>ELEGIRNOS?</span></h2>

    <div class="servicios" style="margin-bottom: 80px">
      <div class="servicio">
        <div class="nosotros-icon">🤝</div>
        <h2>Consultoría de Compras</h2>
        <p>
          Nos convertimos en el colaborador externo de su Departamento de
          Compras, ahorrándole tiempo y costes en cada pedido.
        </p>
      </div>
      <div class="servicio">
        <div class="nosotros-icon">🔍</div>
        <h2>Búsqueda Personalizada</h2>
        <p>
          Si no encuentra un producto en nuestro catálogo, nuestro equipo lo
          buscará y negociará directamente con los fabricantes.
        </p>
      </div>
      <div class="servicio">
        <div class="nosotros-icon">📦</div>
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
                <ul>
                    <li>🤝Confianza </li>
                    <li>👌Calidad</li>
                    <li>💍Compromiso</li>
                    <li>📋Responsabilidad</li>
                    <li>🌱Sostenibilidad</li>
                    <li>💡Innovación</li>
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
              href="/dossierCorporativo.pdf"
              class="btn-primary"
              target="_blank"
              rel="noopener"
              >Abrir dossier</a
            >
            <a href="/dossierCorporativo.pdf" class="dossier-link" download
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
              data-pdf-src="/dossierCorporativo.pdf"
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
import { onMounted, ref } from 'vue';
import { initDossierNotebook } from '../dossierVue.js';

const accordionState = ref({
  mision: false,
  vision: false,
  valores: false
});

function toggleAccordion(key) {
  accordionState.value[key] = !accordionState.value[key];
}

onMounted(() => {
  initDossierNotebook();
});
</script>

<style scoped>
.nosotros-icon {
  font-size: 2rem;
  margin-bottom: 16px;
  line-height: 1;
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
