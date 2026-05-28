<template>
  <div class="sol-layout">

    <!-- ══════════════════════════════
         COLUMNA IZQUIERDA — Contenido
         ══════════════════════════════ -->
    <div class="sol-content">

      <h1 class="titulo">SOLUCIONES <span>INTEGRALES</span></h1>

      <div class="contenedor-texto">
        <p style="text-align: center; color: var(--text-2); font-size: 1.05rem; margin-bottom: 0">
          En Lucas Rojas no solo vendemos material. Ofrecemos un servicio de 360 grados para que su empresa,
          centro educativo o administración pública disponga de todo lo necesario para operar con máxima eficiencia.
        </p>
      </div>

      <section class="contenedor-moderno" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))">
        <div class="bloque">
          <h3>Oficina y Papelería</h3>
          <p>Suministro continuo de papel —incluyendo nuestra marca propia Lucas Rojas—, archivo, escritura, manipulación y elementos básicos para el trabajo diario corporativo.</p>
        </div>
        <div class="bloque">
          <h3>Informática y Tecnología</h3>
          <p>Provisión de ordenadores, monitores, servidores, componentes de red y periféricos, trabajando con las principales marcas del mercado tecnológico.</p>
        </div>
        <div class="bloque">
          <h3>Equipamiento Audiovisual</h3>
          <p>Diseño e instalación de salas de reuniones, proyectores interactivos, pizarras digitales, sistemas de sonido y videoconferencia para entornos híbridos.</p>
        </div>
        <div class="bloque">
          <h3>Mobiliario Corporativo</h3>
          <p>Sillas ergonómicas, mesas de dirección y operativas, armarios metálicos, taquillas y diseño de espacios de trabajo adaptados a normativa vigente.</p>
        </div>
        <div class="bloque">
          <h3>Imprenta y Artes Gráficas</h3>
          <p>Servicios de impresión corporativa, etiquetado personalizado, sellos de caucho, rotulación y regalo promocional de empresa.</p>
        </div>
        <div class="bloque">
          <h3>Maquinaria y Embalaje</h3>
          <p>Destructoras de papel, plastificadoras, encuadernadoras, así como material de protección, cajas y cintas para sus envíos logísticos.</p>
        </div>
      </section>

      <hr class="separador">

      <h2 class="titulo">NUESTRAS SOLUCIONES DE<span> PACKAGING</span></h2>
      <div class="cat2">
        <div class="productos">
          <h2>Material de Embalaje</h2>
          <p>Distribuimos todo tipo de material de embalaje como:</p>
          <ul>
            <li>Precinto Personalizado</li>
            <li>Especiales para el contacto con alimentos</li>
            <li>Film paletizador</li>
            <li>Cajas de Cartón</li>
            <li>Sobre acolchados</li>
          </ul>
        </div>
        <div class="productos">
          <h2>Etiquetado</h2>
          <p>Producimos etiquetas a medida para que cubran sus necesidades:</p>
          <ul>
            <li>Autoadhesivas en bobinas</li>
            <li>Especiales para el contacto con alimentos</li>
            <li>Etiquetas de radiofrecuencia con sistemas antihurto</li>
            <li>Máquinas dispensadoras y aplicadoras</li>
          </ul>
        </div>
        <div class="productos">
          <h2>Sellos y Accesorios</h2>
          <p>Fabricamos todo tipo de sellos de caucho (Manuales y Automáticos):</p>
          <ul>
            <li>Sellos de identidad corporativa</li>
            <li>Fechadores</li>
            <li>Tintas</li>
            <li>Sellos para regalar</li>
            <li>Numeradores e Imprentillas</li>
          </ul>
        </div>
      </div>

      <!-- Carrusel: ocupa el ancho completo del viewport (no queda recortado por el padding de 42vw) -->
      <div class="carrusel-wrapper">
        <CarruselPatrocinadores />
      </div>
    </div>

    <!-- ══════════════════════════════
         COLUMNA DERECHA — Espiral 3D
         ══════════════════════════════ -->
    <aside class="sol-spiral">
      <InfiniteSpiral />
    </aside>

  </div>
</template>

<script setup>
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';
import InfiniteSpiral         from '../components/InfiniteSpiral.vue';
</script>

<style scoped>
/* ── Layout: contenido scrollea, espiral fija ── */
.sol-layout {
  --spiral-space: clamp(620px, 48vw, 900px);
  --content-left-offset: clamp(42px, 4.4vw, 86px);
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  box-sizing: border-box;
  overflow: clip;
}

.sol-content {
  position: relative;
  z-index: 2;
  width: calc(100vw - var(--spiral-space) - var(--content-left-offset));
  margin-left: var(--content-left-offset);
  max-width: 1160px;
  min-width: 0;
}

/* ── Columna espiral: fixed al viewport siempre ── */
.sol-spiral {
  position: fixed;
  top: 0;
  right: 0;
  bottom: auto;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: visible;
  pointer-events: none;
  z-index: 0;
}

/* ── Carrusel: se extiende hasta el borde derecho del viewport ── */
.carrusel-wrapper {
  position: relative;
  z-index: 3;
  margin-left: calc(var(--content-left-offset) * -1);
  width: 100vw;
  overflow: hidden;
}

.sol-content :deep(.contenedor-moderno) {
  margin-bottom: 42px;
}

.sol-content :deep(.cat2) {
  padding-bottom: 28px;
}

:global(.pie-pagina) {
  position: relative;
  z-index: 4;
}

/* ── Responsivo: en pantallas < 1100px ocultar la espiral ── */
@media (max-width: 1100px) {
  .sol-layout {
    overflow: visible;
  }
  .sol-content {
    width: 100%;
    margin-left: 0;
    max-width: none;
  }
  .sol-spiral {
    display: none;
  }
  .carrusel-wrapper {
    margin-right: 0;
    width: 100%;
  }
}
</style>
