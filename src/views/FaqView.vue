<template>
  <div class="faq-page">
    <h1 class="titulo">PREGUNTAS <span>FRECUENTES</span></h1>
    
    <div class="faq-container">
      <div class="faq-list">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index" 
          class="acordeon" 
          :class="{ 'is-open': activeIndexes.includes(index) }"
        >
          <div 
            class="summary" 
            @click="toggleFaq(index)" 
            tabindex="0" 
            @keypress.enter="toggleFaq(index)"
          >
            {{ item.question }}
          </div>
          <div class="contenido-wrapper">
            <div class="contenido-inner">
              <div class="contenido">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Sección Más Consultas -->
      <div class="faq-contact-card">
        <h3>¿Tiene más preguntas?</h3>
        <p>Si no encuentra la respuesta a sus dudas, nuestro equipo de atención al cliente estará encantado de atenderle directamente.</p>
        <div class="faq-contact-methods">
          <div class="contact-method-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-method-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div>
              <span>Teléfono</span>
              <strong>957 684 337</strong>
            </div>
          </div>
          <div class="contact-method-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-method-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <div>
              <span>Email</span>
              <strong>web@lucasrojas.com</strong>
            </div>
          </div>
          <div class="contact-method-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="contact-method-icon"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            <div>
              <span>Web</span>
              <strong>www.lucasrojas.com</strong>
            </div>
          </div>
        </div>
        <RouterLink to="/contacto" class="btn-faq-contact">Formulario de Contacto</RouterLink>
      </div>
    </div>
    
    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CarruselPatrocinadores from "../components/CarruselPatrocinadores.vue";

const faqItems = ref([
  {
    question: "¿Cómo se realizan los pedidos de Lucas Rojas?",
    answer: "Nos adaptamos a las necesidades y preferencias de nuestros clientes. Nuestra web es la forma más eficiente y rápida para realizar los pedidos pero también atendemos por teléfono o e-mail. Sin olvidarnos de plataformas para empresas sincronizadas con sus ERPs, como ARIBA o EDI para su mayor comodidad."
  },
  {
    question: "¿Deben pagarse los gastos de envío?",
    answer: "Los detalles y la satisfacción de nuestros clientes son de vital importancia para nosotros. Por eso, los gastos de envío son gratuitos en pedidos superiores a 50€."
  },
  {
    question: "¿Cuándo llegará el pedido?",
    answer: "Las soluciones, si rápidas, dos veces buenas. De ahí que entreguemos nuestros pedidos en un plazo de 24h, máximo 48h, para productos en stock. Si el producto no está en stock, aparecerá un aviso informativo en su proceso de compra."
  },
  {
    question: "El producto tiene errores de preparación o se encuentra en mal estado. ¿Cómo procedemos?",
    answer: "Nuestros clientes disponen de 15 días desde la recepción del pedido para cursar cualquier reclamación por el mal estado de los productos o por algún error en él. Rápidamente solucionaremos la incidencia. El producto debe devolverse sin usar y en su embalaje original."
  }
]);

const activeIndexes = ref([0]); // First FAQ open by default

function toggleFaq(index) {
  if (activeIndexes.value.includes(index)) {
    activeIndexes.value = activeIndexes.value.filter(i => i !== index);
  } else {
    activeIndexes.value.push(index);
  }
}
</script>

<style scoped>
.faq-page {
  padding-bottom: 0;
}

.faq-container {
  max-width: 1200px;
  margin: 40px auto 80px auto;
  padding: 0 4%;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 40px;
  align-items: start;
}

/* Lista de Acordeones */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Animaciones del Acordeón con Grid */
.contenido-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.acordeon.is-open .contenido-wrapper {
  grid-template-rows: 1fr;
}

.contenido-inner {
  overflow: hidden;
}

.contenido {
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  visibility: hidden;
  padding: 0 24px 24px 24px;
  color: var(--text-2);
  line-height: 1.7;
  font-size: 0.95rem;
  text-align: justify;
}

.acordeon.is-open .contenido {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  transition: opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s, visibility 0s;
}

.acordeon.is-open .summary::after {
  transform: rotate(180deg);
}

/* Tarjeta lateral de contacto */
.faq-contact-card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.faq-contact-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  color: var(--text);
  margin-top: 0;
  margin-bottom: 12px;
}

.faq-contact-card p {
  color: var(--text-2);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 24px;
}

.faq-contact-methods {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}

.contact-method-item {
  display: flex;
  align-items: center;
  gap: 14px;
}

.contact-method-icon {
  width: 20px;
  height: 20px;
  color: var(--accent);
  flex-shrink: 0;
}

.contact-method-item div {
  display: flex;
  flex-direction: column;
}

.contact-method-item span {
  font-size: 0.75rem;
  color: var(--text-2);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contact-method-item strong {
  font-size: 0.95rem;
  color: var(--text);
  font-weight: 600;
}

.btn-faq-contact {
  display: block;
  text-align: center;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--accent), #008fa0);
  color: var(--bg);
  border-radius: 40px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 200, 215, 0.25);
  transition: all 0.3s ease;
}

.btn-faq-contact:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 200, 215, 0.4);
}

@media (max-width: 991px) {
  .faq-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
