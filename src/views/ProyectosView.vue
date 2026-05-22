<template>
  <div>
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

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';
</script>

<style scoped>
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
</style>
