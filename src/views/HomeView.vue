<template>
  <div>

    <section class="carrusel-fondo">
      <div class="slide"></div>
      <div class="slide"></div>
      <div class="slide"></div>
      <div class="slide"></div>
      <div class="contenido-hero">
        <h1><em>Lucas Rojas</em></h1>
        <p>Suministro integral y soluciones profesionales para empresas, centros educativos y administración pública.</p>
        <div class="hero-ctas">
          <RouterLink to="/soluciones" class="btn-hero-primary">Ver Soluciones</RouterLink>
          <RouterLink to="/contacto" class="btn-hero-secondary">Contactar</RouterLink>
        </div>
      </div>
    </section>

    <div class="banda-stats">
        <div class="stat-item">
            <span class="stat-num">+65</span>
            <span class="stat-label">Años de Experiencia</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
            <span class="stat-num">+35.000</span>
            <span class="stat-label">Referencias en Stock</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
            <span class="stat-num">+5.000</span>
            <span class="stat-label">Clientes Satisfechos</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
            <span class="stat-num">+20.000</span>
            <span class="stat-label">Pedidos Anuales</span>
        </div>
        <div style="flex-basis: 100%; height: 0;"></div>
        <div class="stat-item" style="padding-top: 0;">
            <span class="stat-num">2</span>
            <span class="stat-label">Sedes en Córdoba</span>
        </div>
    </div>

    <h2 class="titulo">SERVICIO <span>INTEGRAL</span> A EMPRESAS</h2>

    <section class="servicios">
      <div class="servicio">
        <div class="logo-transporte-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="logo-transporte-svg"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
        </div>
        <h2>Envíos Gratuitos</h2>
        <p>En pedidos superiores a 50 €. Gestionamos la logística para que usted no tenga que preocuparse.</p>
      </div>
      <div class="servicio">
        <div class="logo-transporte-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="logo-transporte-svg"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><path d="M16.24 7.76a6 6 0 1 0 0 8.49"/></svg>
        </div>
        <h2>Entregas en 24/48 H</h2>
        <p>Compromiso de entrega en 24 a 48 horas para todo el catálogo disponible en nuestro almacén.</p>
      </div>
      <div class="servicio">
        <div class="logo-transporte-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="logo-transporte-svg"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
        </div>
        <h2>Devoluciones Fáciles</h2>
        <p>Gestión sin complicaciones. Devuelva sus productos en un plazo de 15 días naturales.</p>
      </div>
      <div class="servicio">
        <div class="logo-transporte-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="logo-transporte-svg"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
        </div>
        <h2>Mejor Precio</h2>
        <p>Negociamos directamente con fabricantes para ofrecerle siempre el presupuesto más competitivo.</p>
      </div>
    </section>

    <hr class="separador">
    
    <h2 class="titulo">NUESTRAS <span>SOLUCIONES</span></h2>

    <section class="contenedor-moderno">
        <div class="bloque b1">
            <h3>OFICINA Y ARCHIVO</h3>
            <p>Blocs, cuadernos, material de escritura y archivo profesional para el trabajo diario.</p>
            <img loading="lazy" src="/imagenes/oficina.jpg" alt="Material de oficina" class="oficina">
        </div>
        <div class="bloque b2">
            <h3>CONSUMIBLES</h3>
            <p>Cartuchos Inkjet, Tóner, Cintas, Filamento 3D, Bobinas y mucho más.</p>
            <a href="https://tienda.lucasrojas.com/" target="_blank" class="btn-explorar">VER CATÁLOGO</a>
        </div>
        <div class="bloque b3">
            <h3>AUDIOVISUAL</h3>
            <p>Instalación de salas de conferencias, sonido profesional, proyección e iluminación.</p>
            <img loading="lazy" src="/imagenes/salaReuniones.jpg" alt="Sala de reuniones" class="salaReuniones">
        </div>
        <div class="bloque b4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icono-svg"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            <h3>INFORMÁTICA</h3>
            <p>Equipos, telefonía corporativa, periféricos y accesorios de las mejores marcas.</p>
        </div>
        <div class="bloque b5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icono-svg"><path d="M4 18v3M20 18v3M19 13v5H5v-5M19 9H5v4h14V9zM5 6h14a2 2 0 0 1 2 2v1H3V8a2 2 0 0 1 2-2z"/></svg>
            <h3>MOBILIARIO</h3>
            <p>Acondicionamiento de oficinas, mobiliario escolar y sillería ergonómica certificada.</p>
        </div>
        <div class="bloque b6">
            <h3>SERVICIOS GENERALES</h3>
            <p>Seguridad, embalaje, higiene, limpieza y todos los suministros corporativos que su empresa necesita.</p>
        </div>
    </section>

    <hr class="separador"/>

    <h2 class="titulo">CONFIANZA EN <span>NOSOTROS</span></h2>

    <div class="contenedor-texto2">
        <div class="parrafo"> 
            <p class="lead-paragraph"><strong>Nuestra experiencia es su garantía de éxito.</strong></p>
            <p>En Lucas Rojas, entendemos que la confianza no se pide, se construye día a día a través de resultados impecables y una trayectoria sólida. No nos limitamos a ofrecer suministros genéricos; nos involucramos como su aliado estratégico para construir relaciones a largo plazo basadas en la eficiencia y la seguridad operativa.</p>
            <p>Nuestra metodología de trabajo se centra en optimizar cada proceso interno, analizando cada detalle técnico para asegurar que su inversión se traduzca en resultados medibles, un ahorro real de costes y la tranquilidad absoluta de saber que su proyecto está respaldado por los estándares más altos de fiabilidad del mercado.</p>
            <p>Con más de seis décadas de experiencia en el sector, transformamos los retos logísticos y de aprovisionamiento en soluciones directas y rentables, garantizando que cada paso que damos juntos refuerce la estabilidad y el crecimiento de su negocio.</p>
        </div>
    </div>

    <div class="cat">
        <div class="barra">
            <div class="progreso" style="width: 90%">FACILIDAD · 90%</div>
        </div>
        <div class="barra">
            <div class="progreso" style="width: 75%">AHORRO · 75%</div>
        </div>
        <div class="barra">
            <div class="progreso" style="width: 100%">FIABILIDAD · 100%</div>
        </div>
    </div>

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';
</script>
