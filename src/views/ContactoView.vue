<template>
  <div class="contacto-page-wrapper">
    <!-- Elementos decorativos flotantes (Levitación) -->
    <div class="floating-decoration is--pos-1">
      <img src="/imagenes/shape-squigle-1.png" alt="" loading="lazy">
    </div>
    <div class="floating-decoration is--pos-2">
      <img src="/imagenes/shape-squigle-2.png" alt="" loading="lazy">
    </div>
    <div class="floating-decoration is--pos-3">
      <img src="/imagenes/shape-squigle-3.png" alt="" loading="lazy">
    </div>
    <div class="floating-decoration is--pos-4">
      <img src="/imagenes/shape-squigle-1.png" alt="" loading="lazy">
    </div>
    <div class="floating-decoration is--pos-5">
      <img src="/imagenes/shape-squigle-2.png" alt="" loading="lazy">
    </div>
    <div class="floating-decoration is--pos-6">
      <img src="/imagenes/shape-squigle-3.png" alt="" loading="lazy">
    </div>
    <section class="contacto-split-layout">
        <!-- Columna Izquierda: Información de contacto -->
        <div class="contacto-info-col">
            <!-- Badge -->
            <div class="contacto-badge">
                <span class="contacto-badge-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="badge-svg-icon"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </span>
                <span class="contacto-badge-text">Contacto</span>
            </div>

            <!-- Título Principal -->
            <h1 class="contacto-main-title">Ponte en <span>contacto</span></h1>

            <!-- Descripción -->
            <p class="contacto-main-description">
                ¿Tiene alguna duda o está listo para equipar sus oficinas o centros educativos? Con el firme compromiso de brindarle una atención a la medida, estamos a su entera disposición.
            </p>

            <!-- Bloques de contacto (Botones/Tarjetas verticales) -->
            <div class="contacto-channels-list">
                <!-- Canal 1: Email -->
                <a href="mailto:web@lucasrojas.com" class="contacto-channel-card">
                    <div class="channel-icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="channel-svg-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div class="channel-text-content">
                        <span class="channel-title">Escríbanos</span>
                        <span class="channel-detail">web@lucasrojas.com</span>
                    </div>
                    <div class="channel-arrow-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-svg-icon"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></svg>
                    </div>
                </a>

                <!-- Canal 2: Teléfono -->
                <a href="tel:+34957684337" class="contacto-channel-card">
                    <div class="channel-icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="channel-svg-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div class="channel-text-content">
                        <span class="channel-title">Llámenos</span>
                        <span class="channel-detail">+34 957 684 337 / +34 692 878 070</span>
                    </div>
                    <div class="channel-arrow-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-svg-icon"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></svg>
                    </div>
                </a>

                <!-- Canal 3: Sedes/Dirección -->
                <a href="#sedes" class="contacto-channel-card">
                    <div class="channel-icon-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="channel-svg-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    </div>
                    <div class="channel-text-content">
                        <span class="channel-title">Nuestras sedes</span>
                        <span class="channel-detail">Montilla · La Rambla (Córdoba)</span>
                    </div>
                    <div class="channel-arrow-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="arrow-svg-icon"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></svg>
                    </div>
                </a>
            </div>
        </div>

        <!-- Columna Derecha: Formulario de contacto premium -->
        <div class="contacto-form-col">
            <div class="contacto-form-card">
                <form action="https://formsubmit.co/ventas@lucasrojas.com" method="POST" class="formulario-contacto-split">
                    <input type="hidden" name="_subject" value="Nuevo mensaje desde la web de Contacto" />
                    <input type="hidden" name="_template" value="table" />

                    <div class="form-input-wrapper">
                        <input type="text" name="nombre" class="split-input-field" placeholder="Nombre" required />
                    </div>

                    <div class="form-input-wrapper">
                        <input type="email" name="correo" class="split-input-field" placeholder="Email" required />
                    </div>

                    <div class="form-input-wrapper">
                        <textarea name="mensaje" class="split-textarea-field" placeholder="Mensaje" required></textarea>
                    </div>

                    <button type="submit" class="split-submit-btn">Enviar</button>
                </form>
            </div>
        </div>
    </section>

    <section class="section-resource">
      <div class="drop-wrapper">
        <div class="drop-section">
          <h1 data-drop-text="" class="drop-heading">¿Te gustaría<span data-drop-img="" class="drop-heading-img is--first"><img loading="lazy" src="/imagenes/shape-squigle-1.png" alt=""></span>trabajar con<span data-drop-img="" class="drop-heading-img is--second"><img loading="lazy" src="/imagenes/shape-squigle-2.png" alt=""></span>nosotros?</h1>
        </div>

        <!-- Hueco entre la frase 1 y la frase 2 -->
        <div class="drop-gap-illustrations">
          <div class="drop-gap-wrapper is--left is--ilustracion-4">
            <div class="drop-gap-img-container">
              <img src="/imagenes/contacto-ilustracion-4.png" alt="" class="drop-gap-img" loading="lazy">
            </div>
          </div>
          <div class="drop-gap-wrapper is--right is--ilustracion-1">
            <div class="drop-gap-img-container">
              <img src="/imagenes/contacto-ilustracion-1.png" alt="" class="drop-gap-img" loading="lazy">
            </div>
          </div>
        </div>

        <div class="drop-section">
          <h1 data-drop-text="" class="drop-heading">Buscamos talento,<span data-drop-img="" class="drop-heading-img is--third"><img loading="lazy" src="/imagenes/shape-squigle-3.png" alt=""></span>pasión y compromiso.</h1>
        </div>

        <!-- Hueco entre la frase 2 y la frase 3 -->
        <div class="drop-gap-illustrations">
          <div class="drop-gap-wrapper is--left is--ilustracion-2">
            <div class="drop-gap-img-container">
              <img src="/imagenes/contacto-ilustracion-2.png" alt="" class="drop-gap-img" loading="lazy">
            </div>
          </div>
          <div class="drop-gap-wrapper is--right is--ilustracion-5">
            <div class="drop-gap-img-container">
              <img src="/imagenes/contacto-ilustracion-5.png" alt="" class="drop-gap-img" loading="lazy">
            </div>
          </div>
        </div>

        <div class="drop-section">
          <h1 data-drop-text="" class="drop-heading">¡Únete a nuestro equipo!</h1>
        </div>
      </div>
    </section>

    <section class="cv-apartado">
        <div class="cv-intro">
            <span class="cv-kicker">Talento y nuevas incorporaciones</span>
            <h3>Abierto el canal para recibir candidaturas y curriculums.</h3>
            <p>
                Si deseas unirte a nuestro equipo de profesionales en Lucas Rojas, puedes enviarnos tu currículum directamente a través de esta página. Valoramos el talento y contactaremos contigo si tu perfil se ajusta a nuestras necesidades.
            </p>
            <ul class="cv-lista">
                <li>Adjunta el curriculum en PDF, DOC o DOCX.</li>
                <li>Incluye datos de contacto y el área de interés.</li>
                <li>Recibirás nuestra respuesta en el email o teléfono que indiques en este formulario.</li>
            </ul>
        </div>

        <div class="cv-form-card">
            <h3>Enviar curriculum</h3>
            <p class="cv-form-copy">
                Complete los siguientes datos para enviar su Curriculum.
            </p>
            <form action="https://formsubmit.co/ventas@lucasrojas.com" method="POST" enctype="multipart/form-data" class="formulario-cv">
                <input type="hidden" name="_subject" value="Nuevo curriculum recibido desde la web" />
                <input type="hidden" name="_template" value="table" />

                <div class="form-grid">
                    <input type="text" name="nombre" placeholder="Nombre y apellidos" required />
                    <input type="email" name="email" placeholder="Correo electrónico" required />
                    <input type="tel" name="telefono" placeholder="Teléfono" />
                    <input type="text" name="puesto" placeholder="Puesto o área de interés" />
                    <textarea name="mensaje" class="campo-completo" placeholder="Cuéntanos brevemente tu experiencia o disponibilidad"></textarea>
                </div>

                <div class="cv-upload">
                    <label for="cv-adjunto">Adjuntar curriculum</label>
                    <input id="cv-adjunto" type="file" name="attachment" accept=".pdf,.doc,.docx" required />
                    <p>Formatos admitidos: PDF, DOC y DOCX. Tamaño máximo recomendado: 10 MB.</p>
                </div>

                <button type="submit" class="btn-submit">ENVIAR CURRICULUM</button>
            </form>
        </div>
    </section>

    <h2 id="sedes" class="titulo" style="margin-top: 90px;">NUESTRAS <span>SEDES</span></h2>
    
    <div class="dosMapas">
        <div class="mapas">
            <h3>Sede Logística — Montilla</h3>
            <p style="color:var(--text-2); margin-top: 4px; font-size: 0.875rem;">Av. de Europa, 21 · 14550 Montilla, Córdoba</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.158852552373!2d-4.660596524659192!3d37.58607102300861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d14891d9efdd9%3A0x94ffd1b4b7173b0e!2sAv.%20de%20Europa%2C%2021%2C%2014550%20Montilla%2C%20C%C3%B3rdoba%2C%20Espa%C3%B1a!5e1!3m2!1ses!2sus!4v1775636242077!5m2!1ses!2sus" height="320" style="border:0; width:100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="mapas">
            <h3>Oficina Central — La Rambla</h3>
            <p style="color:var(--text-2); margin-top: 4px; font-size: 0.875rem;">Calle Valenzuela, 21 · 14540 La Rambla, Córdoba</p>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1700.7669747083194!2d-4.739473369654311!3d37.607429301788216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6d3e3d5de2be41%3A0xe4c839aa6fbed259!2sC.%20Valenzuela%2C%2021%2C%2014540%20La%20Rambla%2C%20C%C3%B3rdoba%2C%20Espa%C3%B1a!5e1!3m2!1ses!2sus!4v1775636354088!5m2!1ses!2sus" height="320" style="border:0; width:100%;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>        </div>
    </div>

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';

let ctx = null;
let splitInstances = [];
const scriptsLoaded = ref(false);

function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

onMounted(async () => {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;

  try {
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/Physics2DPlugin.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/SplitText.min.js')
    ]);
    
    gsap.registerPlugin(ScrollTrigger, window.Physics2DPlugin, window.SplitText);
    scriptsLoaded.value = true;
    
    // Si el loader inicial está activo, esperar a que finalice y se remueva .loader-active
    const isLoaderActive = document.documentElement.classList.contains('loader-active') && document.getElementById('initial-loader');
    
    if (isLoaderActive) {
      const observer = new MutationObserver((mutations, obs) => {
        if (!document.documentElement.classList.contains('loader-active')) {
          obs.disconnect();
          setTimeout(() => {
            initFallingTextGravity();
          }, 150);
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    } else {
      initFallingTextGravity();
    }
  } catch (error) {
    console.error('Error al cargar dependencias de animación:', error);
  }
});

onUnmounted(() => {
  if (ctx) {
    ctx.revert();
  }
  splitInstances.forEach(instance => {
    if (instance && typeof instance.revert === 'function') {
      instance.revert();
    }
  });
  splitInstances = [];
});

function initFallingTextGravity() {
  if (!window.SplitText || !window.Physics2DPlugin) return;

  const textElements = document.querySelectorAll("[data-drop-text]");
  
  ctx = gsap.context(() => {
    textElements.forEach(el => {
      const split = new window.SplitText(el, {
        type: "lines, chars",
        autoSplit: true,
        linesClass: "line"
      });
      
      splitInstances.push(split);

      split.lines.forEach((line) => {
        const tl = gsap.timeline({
          paused: true,
          scrollTrigger: {
            trigger: line,
            start: "top 200px",
            end: "top 80px",
            toggleActions: "none none none none",
            onLeave: () => tl.timeScale(1.0).play(),
            onLeaveBack: () => tl.timeScale(7.5).reverse()
          }
        })
        .to(line.children, {
          duration: "random(1.5, 3)",
          physics2D: {
            velocity: "random(500, 1000)",
            angle: 90,
            gravity: 3000
          },
          rotation: "random(-90, 90)",
          ease: "none"
        })
        .to(line.children, {
          autoAlpha: 0,
          duration: 0.2
        }, "-=.2");
      });
    });

    // Ilustraciones en los huecos (gaps) que también caen y regresan
    const gapImages = document.querySelectorAll(".drop-gap-img-container");
    gapImages.forEach(img => {
      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: img,
          start: "top 220px",
          end: "top 80px",
          toggleActions: "none none none none",
          onLeave: () => tl.timeScale(1.0).play(),
          onLeaveBack: () => tl.timeScale(7.5).reverse()
        }
      })
      .to(img, {
        duration: "random(1.5, 2.5)",
        physics2D: {
          velocity: "random(600, 950)",
          angle: 90,
          gravity: 3200
        },
        rotation: "random(-45, 45)",
        ease: "none"
      })
      .to(img, {
        autoAlpha: 0,
        duration: 0.2
      }, "-=.2");
    });
  });

  ScrollTrigger.refresh();
}
</script>
