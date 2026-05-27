<template>
  <div>
    <h1 class="titulo">CONTACTO Y <span>ATENCIÓN AL CLIENTE</span></h1>
    
    <div class="contenedor-texto">
        <p style="text-align: center; color: var(--text-2); font-size: 1.05rem; margin-bottom: 0;">
            Con el firme compromiso de brindarle una atención a la medida de sus necesidades, ponemos a su entera disposición diversos canales. Estaremos encantados de atender sus consultas o gestionar sus peticiones.
        </p>
    </div>

    <div class="servicios" style="margin-top: 20px;">
        <div class="servicio">
            <div class="logo-transporte-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="logo-transporte-svg"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/><path d="M20 17a3 3 0 0 0-3 3h-3"/></svg>
            </div>
            <h2>Teléfonos</h2>
            <p>Centralita: <strong style="color:var(--text)"> <br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> +34 957 684 337</strong><br>Teléfono Alternativo: 
                <strong style="color:var(--text)"> <br><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> +34 692 878 070</strong></p>
        </div>
        <div class="servicio servicio-form">
            <h2>Envíanos un mensaje</h2>
            <form action="https://formsubmit.co/ventas@lucasrojas.com" method="POST" class="formulario-contacto" enctype="multipart/form-data">
                <input type="text" name="nombre" placeholder="Nombre o Empresa" required>
                <input type="email" name="correo" placeholder="Correo Electrónico" required>
                <input type="tel" name="telefono" placeholder="Teléfono (Opcional)">
                <textarea name="mensaje" placeholder="¿En qué podemos ayudarle?" required></textarea>
                <button type="submit" class="btn-submit">ENVIAR MENSAJE</button>
            </form>
        </div>
        <div class="servicio">
            <div class="logo-transporte-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="logo-transporte-svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <h2>Emails</h2>
            <p><strong style="color:var(--text)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> tienda@lucasrojas.com</strong><br><strong style="color:var(--text)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> web@lucasrojas.com</strong></p>
        </div>
    </div>

    <h2 class="titulo" style="margin-top: 90px;">TRABAJA <span>CON NOSOTROS</span></h2>

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

    <h2 class="titulo" style="margin-top: 90px;">NUESTRAS <span>SEDES</span></h2>
    
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
import CarruselPatrocinadores from '../components/CarruselPatrocinadores.vue';
</script>
