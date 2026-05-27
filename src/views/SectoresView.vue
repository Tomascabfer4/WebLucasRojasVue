<template>
  <div>
    <h1 class="titulo">SECTORES DE <span>ACTUACIÓN</span></h1>

    <div class="contenedor-texto" style="margin-bottom: 0;">
        <p style="text-align: center; color: var(--text-2); font-size: 1.05rem;">
            Llevamos más de seis décadas adaptando nuestra oferta a las necesidades específicas de cada sector. Conozca cómo trabajamos con cada tipo de cliente.
        </p>
    </div>
    
    <div class="servicios" style="margin-top: 40px; margin-bottom: 80px;">
        <div class="servicio servicio-sector">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="sector-icon-svg"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="16"/><line x1="15" y1="22" x2="15" y2="16"/><line x1="9" y1="16" x2="15" y2="16"/><path d="M8 6h2v2H8V6zm0 4h2v2H8v-2zm8-4h2v2h-2V6zm0 4h2v2h-2v-2z"/></svg>
            <h2>Pymes y Grandes Empresas</h2>
            <p style="text-align: justify; margin-top: 10px;">Nos integramos como un brazo más de su departamento de compras. Abastecemos de forma continua consumibles, material de oficina, hardware tecnológico y elementos de prevención e higiene para asegurar que su negocio no se detenga.</p>
        </div>
        <div class="servicio" style="width: 340px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="sector-icon-svg"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
            <h2>Centros de Enseñanza</h2>
            <p style="text-align: justify; margin-top: 10px;">Trabajamos con colegios, institutos y universidades ofreciendo mobiliario escolar adaptado a normativas, material didáctico, pizarras digitales interactivas (PDI) e instalación de megafonía y proyectores para aulas modernas.</p>
        </div>
        <div class="servicio" style="width: 340px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="sector-icon-svg"><path d="M4 22h16M2 18h20M4 11v7M8 11v7M12 11v7M16 11v7M20 11v7M12 2 2 7h20z"/></svg>
            <h2>Organismos Públicos</h2>
            <p style="text-align: justify; margin-top: 10px;">Proveedores de confianza para Ayuntamientos, Diputaciones y entes gubernamentales. Ofrecemos trazabilidad, cumplimiento de presupuestos, sistemas de archivo clasificado y equipamiento de espacios de atención ciudadana.</p>
        </div>
    </div>

    <hr class="separador">
    <h1 class="titulo">IMPRENTA Y <span>ARTES GRÁFICAS</span></h1>
    <div class="contenedor-texto2">
        <div class="parrafo">
            <p class="lead-paragraph"><strong>Diseño, redacción e impresión bajo un único estándar de excelencia.</strong></p>
            <p>Le ofrecemos una gama completa de servicios de artes gráficas y reprografía que incluye <strong>papelería corporativa, informes anuales, folletos, revistas, calendarios y cartelería de gran formato</strong>. Garantizamos acabados de alta calidad con plazos de entrega rigurosamente ajustados y precios altamente competitivos en el sector.</p>
            <p>Si además del servicio de impresión digital u offset necesita desarrollar su imagen de marca, diseñamos <strong>logotipos, papelería comercial, catálogos promocionales, invitaciones a eventos y vinilos decorativos para oficinas</strong>, ofreciéndole un servicio de comunicación gráfica integral que abarca desde la conceptualización visual hasta la redacción y producción final.</p>
        </div>
    </div>

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';
</script>

<style scoped>
.sector-icon {
  font-size: 2.2rem;
  margin-bottom: 14px;
  line-height: 1;
}
</style>
