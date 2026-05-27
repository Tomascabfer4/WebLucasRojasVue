<template>
  <div class="legal-page">
    <h1 class="titulo">POLÍTICAS Y <span>CONDICIONES</span></h1>
    
    <div class="legal-container">
      <!-- Pestañas Laterales para Escritorio / Selector para Móvil -->
      <aside class="legal-sidebar">
        <button
          v-for="(section, key) in sections"
          :key="key"
          class="legal-tab-btn"
          :class="{ active: activeTab === key }"
          @click="activeTab = key"
        >
          {{ section.title }}
        </button>
      </aside>

      <!-- Selector Móvil Dropdown -->
      <div class="legal-mobile-selector">
        <select v-model="activeTab" aria-label="Seleccionar política legal">
          <option v-for="(section, key) in sections" :key="key" :value="key">
            {{ section.title }}
          </option>
        </select>
      </div>

      <!-- Contenedor del Texto Legal Activo -->
      <main class="legal-content-card">
        <h2>{{ currentSection.title }}</h2>
        <div class="legal-text-body">
          <p v-for="(paragraph, index) in paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </main>
    </div>
    
    <CarruselPatrocinadores />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import legalData from "../data/legal.json";
import CarruselPatrocinadores from "../components/CarruselPatrocinadores.vue";

const route = useRoute();
const sections = ref(legalData);
const activeTab = ref("aviso_legal");

const updateTabFromQuery = () => {
  const tab = route.query.tab;
  if (tab && sections.value[tab]) {
    activeTab.value = tab;
  }
};

onMounted(() => {
  updateTabFromQuery();
});

watch(() => route.query.tab, () => {
  updateTabFromQuery();
});

const currentSection = computed(() => {
  return sections.value[activeTab.value] || { title: "", content: "" };
});

const paragraphs = computed(() => {
  if (!currentSection.value.content) return [];
  // Split content by newlines and filter out empty strings
  return currentSection.value.content
    .split("\n")
    .map(p => p.strip ? p.strip() : p.trim())
    .filter(p => p.length > 0);
});
</script>

<style scoped>
.legal-page {
  padding-bottom: 60px;
}

.legal-container {
  max-width: 1200px;
  margin: 40px auto 80px auto;
  padding: 0 4%;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  align-items: start;
}

/* Sidebar Tabs */
.legal-sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.legal-tab-btn {
  text-align: left;
  padding: 14px 18px;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--text-2);
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 0.925rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.legal-tab-btn:hover {
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
}

.legal-tab-btn.active {
  background: linear-gradient(135deg, rgba(0, 200, 215, 0.1), rgba(0, 200, 215, 0.03));
  color: var(--accent);
  border-left: 3px solid var(--accent);
  padding-left: 15px; /* Adjust padding for border */
  font-weight: 600;
}

/* Mobile Selector */
.legal-mobile-selector {
  display: none;
  width: 100%;
  margin-bottom: 24px;
}

.legal-mobile-selector select {
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  background: var(--bg-2);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
}

/* Legal Content Card */
.legal-content-card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  min-height: 500px;
}

.legal-content-card h2 {
  font-family: 'Playfair Display', serif;
  font-size: 1.85rem;
  color: var(--text);
  margin-top: 0;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 16px;
  letter-spacing: -0.01em;
}

.legal-text-body {
  font-size: 0.95rem;
  color: var(--text-2);
  line-height: 1.75;
  text-align: justify;
}

.legal-text-body p {
  margin-bottom: 18px;
}

/* Responsive Breakpoints */
@media (max-width: 991px) {
  .legal-container {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .legal-sidebar {
    display: none;
  }
  
  .legal-mobile-selector {
    display: block;
  }
  
  .legal-content-card {
    padding: 24px;
  }
  
  .legal-content-card h2 {
    font-size: 1.5rem;
  }
}
</style>
