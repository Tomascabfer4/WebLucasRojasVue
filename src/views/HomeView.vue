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
        <img loading="lazy" src="/imagenes/transporte.png" alt="Envíos gratuitos" class="logoTransporte" />
        <h2>Envíos Gratuitos</h2>
        <p>En pedidos superiores a 50 €. Gestionamos la logística para que usted no tenga que preocuparse.</p>
      </div>
      <div class="servicio">
        <img loading="lazy" src="/imagenes/rapidez.jpg" alt="Entregas rápidas" class="logoTransporte" />
        <h2>Entregas en 24/48 H</h2>
        <p>Compromiso de entrega en 24 a 48 horas para todo el catálogo disponible en nuestro almacén.</p>
      </div>
      <div class="servicio">
        <img loading="lazy" src="/imagenes/devolucion.jpg" alt="Devoluciones fáciles" class="logoTransporte" />
        <h2>Devoluciones Fáciles</h2>
        <p>Gestión sin complicaciones. Devuelva sus productos en un plazo de 15 días naturales.</p>
      </div>
      <div class="servicio">
          <img loading="lazy" src="/imagenes/economico.jpg" alt="Mejor precio" class="logoTransporte" />
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
            <div class="icono">🖥️</div>
            <h3>INFORMÁTICA</h3>
            <p>Equipos, telefonía corporativa, periféricos y accesorios de las mejores marcas.</p>
        </div>
        <div class="bloque b5">
            <div class="icono">🛋️</div>
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
            <p> <strong>Nuestra experiencia es su garantía de éxito </strong> <br>
            En Lucas Rojas, entendemos que la confianza no es algo que se pida, sino algo que se construye día a día
            a través de resultados impecables y una trayectoria sólida. No nos limitamos a ofrecer soluciones genéricas;
            nos involucramos como su aliado estratégico para construir relaciones duraderas basadas estrictamente en la
            eficiencia y la seguridad operativa. Nuestra metodología de trabajo se centra en optimizar cada proceso
            interno y externo, analizando cada detalle técnico para asegurar que su inversión no sea solo un gasto,
            sino que se traduzca en resultados medibles, un ahorro real de costes y la tranquilidad absoluta de saber
            que su proyecto está respaldado por los estándares más altos de fiabilidad del mercado. Con décadas de experiencia
            en el sector, transformamos la complejidad en soluciones directas y rentables, garantizando que cada paso que damos
            juntos refuerce la estabilidad y el crecimiento de su negocio.</p>
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
