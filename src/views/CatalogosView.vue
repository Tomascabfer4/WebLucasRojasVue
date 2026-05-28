<template>
  <div class="catalogos-page">
    <h1 class="titulo">NUESTROS <span>CATÁLOGOS</span></h1>
    
    <div class="contenedor-texto">
      <p style="text-align: center; color: var(--text-2); font-size: 1.05rem; margin-bottom: 0;">
        Ponemos a su disposición nuestra selección de catálogos especializados. Consulte en línea o descargue en formato PDF las últimas novedades en material de oficina, sillería y equipamiento escolar.
      </p>
    </div>

    <div class="catalogos-container">
      <section class="catalogos-grid">
        <div 
          v-for="(cat, index) in catalogs" 
          :key="index" 
          class="catalogo-card"
        >
          <div class="card-image-wrapper">
            <img :src="cat.image" :alt="cat.title" loading="lazy" class="catalog-cover" />
            <div class="card-overlay">
              <a :href="cat.pdf" target="_blank" rel="noopener" class="btn-overlay">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-overlay-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Visualizar
              </a>
            </div>
          </div>
          <div class="card-info">
            <h3>{{ cat.title }}</h3>
            <p>{{ cat.description }}</p>
            <div class="card-actions">
              <a :href="cat.pdf" target="_blank" rel="noopener" class="btn-action btn-view">
                Ver PDF
              </a>
              <a :href="cat.pdf" download class="btn-action btn-download">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="download-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CarruselPatrocinadores from "../components/CarruselPatrocinadores.vue";

const catalogs = ref([
  {
    title: "Catálogo Oficina",
    description: "Últimas novedades y promociones de material de oficina. Edición de Abril a Julio 2026.",
    image: "/imagenes/cat_oficina_Abril_2026.jpg",
    pdf: "https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/cat_oficina_Abril_2026.pdf"
  },
  {
    title: "Catálogo General 2026",
    description: "Catálogo completo de soluciones para empresas, material de oficina y consumibles.",
    image: "/imagenes/PORTADA-scaled.jpg",
    pdf: "https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/cat_general_2026.pdf"
  },
  {
    title: "Catálogo Sillería",
    description: "Sillería ergonómica, operativa y de dirección para espacios de trabajo saludables.",
    image: "/imagenes/PORTADAA.jpg",
    pdf: "https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/cat_silleria_2025.pdf"
  },
  {
    title: "Equipamiento Escolar 2025",
    description: "Mobiliario y soluciones didácticas para centros educativos, colegios y universidades.",
    image: "/imagenes/PORTADA_cat_equipamiento_escolar_2025-scaled.jpg",
    pdf: "https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/cat_equipamiento_escolar_2025.pdf"
  },
  {
    title: "Catálogo Escolar 2024",
    description: "Material escolar, manualidades y recursos educativos para el curso académico.",
    image: "/imagenes/PORTADA-ESCOLAR-scaled.jpg",
    pdf: "https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/cat_escolar_2024.pdf"
  },
  {
    title: "Mobiliario Escolar",
    description: "Mobiliario escolar homologado y adaptado a las necesidades de las aulas modernas.",
    image: "/imagenes/cat_mobiliario_Escolar-scaled-e1748852523329.jpg",
    pdf: "https://pub-c640248606f64ee5bde16e2f0d322b39.r2.dev/cat_mobiliario_escolar.pdf"
  }
]);
</script>

<style scoped>
.catalogos-page {
  padding-bottom: 60px;
}

.catalogos-container {
  max-width: 1200px;
  margin: 40px auto 80px auto;
  padding: 0 4%;
}

/* Reusable Grid */
.catalogos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

/* Card */
.catalogo-card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.catalogo-card:hover {
  transform: translateY(-6px);
  border-color: rgba(0, 200, 215, 0.4);
  box-shadow: 0 8px 30px rgba(0, 200, 215, 0.15);
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1.35;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  border-bottom: 1px solid var(--border);
}

.catalog-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.catalogo-card:hover .catalog-cover {
  transform: scale(1.05);
}

/* Overlay on Hover */
.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 9, 13, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card-image-wrapper:hover .card-overlay {
  opacity: 1;
}

.btn-overlay {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: var(--accent);
  color: var(--bg);
  border-radius: 40px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 200, 215, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;
}

.btn-overlay:hover {
  transform: scale(1.05);
  background: #00e8f8;
}

.btn-overlay-icon {
  width: 18px;
  height: 18px;
}

/* Card Info */
.card-info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-info h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: var(--text);
  margin-top: 0;
  margin-bottom: 10px;
  line-height: 1.3;
}

.card-info p {
  color: var(--text-2);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 24px;
  flex-grow: 1;
}

/* Actions */
.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.btn-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 30px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
}

.btn-view {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
}

.btn-view:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--accent);
  border-color: var(--accent);
}

.btn-download {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  color: var(--text-2);
}

.btn-download:hover {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
  box-shadow: 0 4px 12px rgba(0, 200, 215, 0.2);
}

.download-icon {
  width: 14px;
  height: 14px;
}

@media (max-width: 480px) {
  .card-actions {
    grid-template-columns: 1fr;
  }
}
</style>
