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
            <div class="sector-icon">🏢</div>
            <h2>Pymes y Grandes Empresas</h2>
            <p style="text-align: justify; margin-top: 10px;">Nos integramos como un brazo más de su departamento de compras. Abastecemos de forma continua consumibles, material de oficina, hardware tecnológico y elementos de prevención e higiene para asegurar que su negocio no se detenga.</p>
        </div>
        <div class="servicio" style="width: 340px;">
            <div class="sector-icon">🎓</div>
            <h2>Centros de Enseñanza</h2>
            <p style="text-align: justify; margin-top: 10px;">Trabajamos con colegios, institutos y universidades ofreciendo mobiliario escolar adaptado a normativas, material didáctico, pizarras digitales interactivas (PDI) e instalación de megafonía y proyectores para aulas modernas.</p>
        </div>
        <div class="servicio" style="width: 340px;">
            <div class="sector-icon">🏛️</div>
            <h2>Organismos Públicos</h2>
            <p style="text-align: justify; margin-top: 10px;">Proveedores de confianza para Ayuntamientos, Diputaciones y entes gubernamentales. Ofrecemos trazabilidad, cumplimiento de presupuestos, sistemas de archivo clasificado y equipamiento de espacios de atención ciudadana.</p>
        </div>
    </div>

    <hr class="separador">
    <h1 class="titulo">IMPRENTA Y <span>ARTES GRÁFICAS</span></h1>
    <div class="contenedor-texto2">
        <div class="parrafo">
            
            <p> Le ofrecemos todos los servicios relacionados con este concepto: <strong>papelería corporativa, informes anuales,
                 folletos, revistas, calendarios, cartelería, etc.</strong> a unos precios muy competitivos y con plazos ajustados
                Si además del servicio de impresión digital u offset, necesita desarrollar: <strong>logotipos, imagen corporativa,
                 documentos comerciales, catálogos, folletos, revistas promocionales, invitaciones a eventos, cartelería,
                  vinilos para decoración de oficinas, etc.</strong> le ofrecemos un servicio de comunicación gráfica integral que
                   engloba el diseño y la redacción de contenidos.
            </p>
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
