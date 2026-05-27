<template>
  <footer class="pie-pagina">
    <div class="footer-grid">
      <!-- Columna 1: Contacto y Sedes -->
      <div class="footer-col info-col">
        <img 
          src="/imagenes/logo.png" 
          alt="Lucas Rojas" 
          class="footer-logo" 
          data-logo-light="/imagenes/logo.png" 
          data-logo-dark="/imagenes/logoOscuro.png" 
        />
        <p class="footer-desc">
          Suministro integral y soluciones profesionales para empresas, centros educativos y administración pública desde 1961.
        </p>
        <div class="contacto-links">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Av. de Europa, 21 — 14550 Montilla (Córdoba)
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Calle Valenzuela, 21 — 14540 La Rambla (Córdoba)
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +34 957 684 337 / +34 692 878 070
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contacto-inline-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            soporte@lucasrojas.com
          </p>
        </div>
      </div>

      <!-- Columna 2: Menú Rápido -->
      <div class="footer-col links-col">
        <h4>MENÚ RÁPIDO</h4>
        <ul>
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/nosotros">Nosotros</RouterLink></li>
          <li><RouterLink to="/soluciones">Soluciones</RouterLink></li>
          <li><RouterLink to="/sectores">Sectores</RouterLink></li>
          <li><RouterLink to="/proyectos">Proyectos</RouterLink></li>
          <li><RouterLink to="/contacto">Contacto</RouterLink></li>
          <li><a href="https://tienda.lucasrojas.com/" target="_blank" rel="noreferrer">Tienda Online</a></li>
        </ul>
      </div>

      <!-- Columna 3: Cosas de Interés -->
      <div class="footer-col links-col">
        <h4>COSAS DE INTERÉS</h4>
        <ul>
          <li><RouterLink to="/catalogos">Catálogos</RouterLink></li>
          <li><RouterLink to="/proyectos">Proyectos Realizados</RouterLink></li>
          <li><RouterLink to="/preguntas-frecuentes">Preguntas Frecuentes</RouterLink></li>
          <li><a href="/documentos/DossierLucasRojas.pdf" target="_blank" rel="noreferrer">Dossier de Empresa</a></li>
          <li><RouterLink to="/contacto">Trabaja con nosotros</RouterLink></li>
        </ul>
        <a 
          href="/documentos/HP_Business_Partner_Lucas_Rojas.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hp-partner-badge"
        >
          HP Business Partner
        </a>
      </div>

      <!-- Columna 4: Enlaces Legales -->
      <div class="footer-col links-col">
        <h4>LEGAL Y CONDICIONES</h4>
        <ul>
          <li><RouterLink to="/politica-y-condiciones?tab=aviso_legal">Aviso Legal</RouterLink></li>
          <li><RouterLink to="/politica-y-condiciones?tab=privacidad">Política de Privacidad</RouterLink></li>
          <li><RouterLink to="/politica-y-condiciones?tab=ventas">Condiciones de Venta</RouterLink></li>
          <li><RouterLink to="/politica-y-condiciones?tab=devoluciones">Política de Devoluciones</RouterLink></li>
          <li><RouterLink to="/politica-y-condiciones?tab=calidad">Calidad y Medioambiente</RouterLink></li>
          <li><RouterLink to="/politica-y-condiciones?tab=cookies">Política de Cookies</RouterLink></li>
          <li><RouterLink to="/politica-y-condiciones?tab=sociales">Redes Sociales</RouterLink></li>
        </ul>
      </div>
    </div>

    <!-- Barra Inferior -->
    <div class="footer-bottom">
      <div class="copyright">
        &copy; {{ currentYear }} Lucas Rojas S.L. Todos los derechos reservados.
      </div>
      <div class="social-icons">
        <a href="https://www.facebook.com/LucasRojasES" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon-svg"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          <span class="social-text">Facebook</span>
        </a>
        <a href="https://www.instagram.com/lucasrojas_es" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon-svg"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          <span class="social-text">Instagram</span>
        </a>
        <a href="https://www.linkedin.com/company/lucas-rojas/" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon-svg"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          <span class="social-text">LinkedIn</span>
        </a>
        <a href="https://www.tiktok.com/@lucasrojas_es" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon-svg"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
          <span class="social-text">TikTok</span>
        </a>
        <a href="https://x.com/LucasRojasES" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="social-icon-svg"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M20 4L4 20"/></svg>
          <span class="social-text">X</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.pie-pagina {
  background: var(--bg-2);
  border-top: 1px solid var(--border);
  padding: 60px 6% 30px 6%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  position: relative;
  z-index: 1;
}

.pie-pagina::before {
  content: '';
  position: absolute;
  top: 0;
  left: 8%;
  right: 8%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 200, 215, 0.15), transparent);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.2fr;
  gap: 40px;
  width: 100%;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: var(--text-2);
  font-size: 0.875rem;
  line-height: 1.6;
}

.footer-logo {
  height: 48px;
  width: auto;
  align-self: start;
}

.footer-desc {
  font-size: 0.85rem;
  color: var(--text-2);
  max-width: 360px;
  margin: 0;
  text-align: justify;
}

.contacto-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contacto-links p {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-size: 0.825rem;
}

.contacto-inline-icon {
  width: 16px;
  height: 16px;
  color: var(--accent);
  flex-shrink: 0;
}

/* Columna de Enlaces */
.links-col h4 {
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text);
  margin-top: 0;
  margin-bottom: 5px;
  letter-spacing: 0.05em;
  position: relative;
}

.links-col h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 30px;
  height: 1px;
  background: var(--accent);
}

.links-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.links-col ul li a {
  color: var(--text-2);
  text-decoration: none;
  font-size: 0.85rem;
  transition: all 0.25s ease;
  display: inline-block;
}

.links-col ul li a:hover {
  color: var(--accent);
  transform: translateX(4px);
}

/* Partner Badge */
.hp-partner-badge {
  margin-top: 10px;
  align-self: start;
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-2);
  background: rgba(255, 255, 255, 0.02);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-block;
}

.hp-partner-badge:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(0, 200, 215, 0.05);
  box-shadow: 0 0 10px rgba(0, 200, 215, 0.15);
}

/* Footer Bottom Bar */
.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  padding-top: 30px;
  width: 100%;
}

.copyright {
  font-size: 0.8rem;
  color: var(--text-2);
}

.social-icons {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.04);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

[data-theme="light"] .social-link {
  border-color: rgba(0, 0, 0, 0.15);
  color: #0c1520;
  background: rgba(0, 0, 0, 0.03);
}

.social-link:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(0, 200, 215, 0.08);
  box-shadow: 0 4px 15px rgba(0, 200, 215, 0.15);
}

[data-theme="light"] .social-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  background: rgba(0, 150, 165, 0.06);
  box-shadow: 0 4px 15px rgba(0, 150, 165, 0.1);
}

.social-icon-svg {
  width: 16px;
  height: 16px;
  stroke-width: 2px;
  color: currentColor;
}

.social-text {
  font-family: 'Outfit', sans-serif;
}

/* Responsiveness */
@media (max-width: 991px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 580px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .footer-col {
    align-items: center;
    text-align: center;
  }
  
  .footer-logo {
    align-self: center;
  }
  
  .footer-desc {
    text-align: center;
  }
  
  .contacto-links p {
    justify-content: center;
  }
  
  .links-col h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .links-col ul li a:hover {
    transform: none;
  }
  
  .hp-partner-badge {
    align-self: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}
</style>
