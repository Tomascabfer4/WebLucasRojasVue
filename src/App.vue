<script setup>
import { onMounted, ref } from "vue";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";

const isLight = ref(false);

const KEY = 'lr-tema';
const LIGHT_THEME_COLOR = '#f0f4f8';
const DARK_THEME_COLOR = '#06090d';

const actualizarThemeColor = (esClaro) => {
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
  }
  meta.setAttribute('content', esClaro ? LIGHT_THEME_COLOR : DARK_THEME_COLOR);
};

const actualizarLogos = (esClaro) => {
  const selector = 'img[data-logo-light][data-logo-dark]';
  const logos = document.querySelectorAll(selector);
  logos.forEach(logo => {
      const nuevaRuta = esClaro
          ? logo.getAttribute('data-logo-light')
          : logo.getAttribute('data-logo-dark');
      if (nuevaRuta && logo.getAttribute('src') !== nuevaRuta) {
          logo.setAttribute('src', nuevaRuta);
      }
  });
};

const applyTheme = (lightMode) => {
  isLight.value = lightMode;
  if (lightMode) {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  document.documentElement.style.colorScheme = lightMode ? "light" : "dark";
  
  actualizarThemeColor(lightMode);
  actualizarLogos(lightMode);
  
  const mediaTema = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
  const sistemaEsClaro = !!(mediaTema && mediaTema.matches);
  
  if (lightMode === sistemaEsClaro) {
      localStorage.removeItem(KEY);
  } else {
      localStorage.setItem(KEY, lightMode ? "light" : "dark");
  }
};

let isTransitioning = false;

const handleThemeToggle = (e) => {
  if (isTransitioning) return;
  const nuevoEsClaro = !isLight.value;
  
  const rect = e.currentTarget.getBoundingClientRect();
  const origenX = rect.left + (rect.width / 2);
  const origenY = rect.top + (rect.height / 2);

  isTransitioning = true;

  if (typeof document.startViewTransition === 'function') {
      const html = document.documentElement;
      const distanciaX = Math.max(origenX, window.innerWidth - origenX);
      const distanciaY = Math.max(origenY, window.innerHeight - origenY);
      const radioMax = Math.hypot(distanciaX, distanciaY);

      html.style.setProperty('--theme-origin-x', origenX + 'px');
      html.style.setProperty('--theme-origin-y', origenY + 'px');
      html.style.setProperty('--theme-reveal-radius', radioMax + 'px');

      const transicion = document.startViewTransition(() => {
          applyTheme(nuevoEsClaro);
      });

      transicion.finished.finally(() => {
          html.style.removeProperty('--theme-origin-x');
          html.style.removeProperty('--theme-origin-y');
          html.style.removeProperty('--theme-reveal-radius');
          isTransitioning = false;
      });
      return;
  }

  const circle = document.createElement('div');
  circle.className = 'theme-transition-circle';
  circle.style.backgroundColor = nuevoEsClaro ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;
  document.body.appendChild(circle);

  const radioMax = Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
  const scale = (radioMax / 10) + 2;

  circle.getBoundingClientRect();
  circle.style.transform = 'scale(' + scale + ')';

  applyTheme(nuevoEsClaro);

  setTimeout(() => {
      circle.remove();
      isTransitioning = false;
  }, 550);
};

onMounted(() => {
  const saved = localStorage.getItem(KEY);
  const mediaTema = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  const shouldBeLight = saved === "light" || (saved !== "dark" && !!(mediaTema && mediaTema.matches));
  
  applyTheme(shouldBeLight);

  if (mediaTema) {
      const escucharCambio = (e) => {
          if (!localStorage.getItem(KEY)) {
              applyTheme(e.matches);
          }
      };
      if (typeof mediaTema.addEventListener === 'function') {
          mediaTema.addEventListener('change', escucharCambio);
      } else if (typeof mediaTema.addListener === 'function') {
          mediaTema.addListener(escucharCambio);
      }
  }
});
</script>

<template>

  <SiteHeader :isLight="isLight" @toggleTheme="handleThemeToggle" />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
