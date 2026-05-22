<template>
  <div>
    <h1 class="titulo">SOLUCIONES <span>INTEGRALES</span></h1>
    <div class="contenedor-texto">
      <p style="text-align: center; color: var(--text-2); font-size: 1.05rem; margin-bottom: 0">
        En Lucas Rojas no solo vendemos material. Ofrecemos un servicio de 360 grados para que su empresa, centro educativo o administración pública disponga de todo lo necesario para operar con máxima eficiencia.
      </p>
    </div>
    <section class="contenedor-moderno" style="grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))">
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
                <li>Autoadhesivas en bobinas </li>
                <li>Especiales para el contacto con alimentos</li>
                <li>Etiquetas de radiofrecuencia con sistemas antihurto</li>
                <li>Máquinas dispensadoras y aplicadoras</li>
            </ul>
        </div>
        <div class="productos">
            <h2>Sellos y Accesorios</h2>
            <p>Fabricamos todo tipo de sellos de caucho(Manuales y Automáticos):</p>
            <ul>
                <li>Sellos de identidad corporativa</li>
                <li>Fechadores</li>
                <li>Tintas</li>
                <li>Sellos para regalar</li>
                <li>Numeradores e Imprentillas</li>
            </ul>
        </div>
    </div>

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';
</script>
