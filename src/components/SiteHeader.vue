<script setup>
const props = defineProps(['isLight']);
const emit = defineEmits(['toggleTheme']);

const links = [
  { to: "/", label: "Inicio" },
  { to: "/soluciones", label: "Soluciones" },
  { to: "/sectores", label: "Sectores" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];
</script>

<template>
  <header>
    <ul class="navegacion">
      <li>
        <RouterLink to="/" class="logo-link">
          <img src="/imagenes/logoOscuroConFrase.png" alt="Lucas Rojas" class="logo" data-logo-light="/imagenes/logoConFrase.png" data-logo-dark="/imagenes/logoOscuroConFrase.png" />
        </RouterLink>
      </li>
      <button id="menu-toggle" class="menu-toggle" aria-label="Menú" aria-expanded="false">
          <span></span><span></span><span></span>
      </button>
      <div class="nav-links">
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to" active-class="activa" :class="{ activa: $route.path === link.to }">
            {{ link.label }}
          </RouterLink>
        </li>
        <li><a href="https://tienda.lucasrojas.com/" target="_blank" rel="noreferrer">Tienda</a></li>
      </div>
      <li>
        <button id="btn-tema" class="btn-tema" aria-label="Cambiar tema" @click="emit('toggleTheme', $event)">
          <svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </li>
      <li>
        <a href="https://tienda.lucasrojas.com/" class="btn-cliente" target="_blank" rel="noreferrer">Área de Cliente</a>
      </li>
    </ul>
  </header>
</template>
