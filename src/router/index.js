import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("../views/HomeView.vue");
const SolucionesView = () => import("../views/SolucionesView.vue");
const SectoresView = () => import("../views/SectoresView.vue");
const ProyectosView = () => import("../views/ProyectosView.vue");
const NosotrosView = () => import("../views/NosotrosView.vue");
const ContactoView = () => import("../views/ContactoView.vue");
const FAQView = () => import("../views/FaqView.vue");
const CatalogosView = () => import("../views/CatalogosView.vue");
const LegalView = () => import("../views/LegalView.vue");

import { initAnimaciones, cleanupAnimaciones } from "../animacionesVue.js";

const routes = [
  { path: "/index.html", redirect: "/" },
  { path: "/", name: "inicio", component: HomeView, meta: { title: "Inicio | Lucas Rojas" } },
  { path: "/soluciones", name: "soluciones", component: SolucionesView, meta: { title: "Soluciones | Lucas Rojas" } },
  { path: "/sectores", name: "sectores", component: SectoresView, meta: { title: "Sectores | Lucas Rojas" } },
  { path: "/proyectos", name: "proyectos", component: ProyectosView, meta: { title: "Proyectos | Lucas Rojas" } },
  { path: "/nosotros", name: "nosotros", component: NosotrosView, meta: { title: "Nosotros | Lucas Rojas" } },
  { path: "/contacto", name: "contacto", component: ContactoView, meta: { title: "Contacto | Lucas Rojas" } },
  { path: "/preguntas-frecuentes", name: "faq", component: FAQView, meta: { title: "Preguntas Frecuentes | Lucas Rojas" } },
  { path: "/catalogos", name: "catalogos", component: CatalogosView, meta: { title: "Catálogos | Lucas Rojas" } },
  { path: "/politica-y-condiciones", name: "legal", component: LegalView, meta: { title: "Políticas y Condiciones | Lucas Rojas" } },
  
  // Redirecciones heredadas
  { path: "/faq", redirect: "/preguntas-frecuentes" },
  { path: "/aviso-legal", redirect: "/politica-y-condiciones" },
  { path: "/politica-de-privacidad", redirect: "/politica-y-condiciones" },
  { path: "/condiciones-de-venta", redirect: "/politica-y-condiciones" },
  { path: "/devoluciones", redirect: "/politica-y-condiciones" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from) => {
  if (to.path !== from.path) {
    cleanupAnimaciones();

    // Mostramos logo+barra a la vez que la ola entra (en paralelo).
    if (window.showNavLoader) window.showNavLoader();

    if (window.animatePageTransition) {
      await new Promise(resolve => {
        window.animatePageTransition('enter', () => {
          resolve();
        });
      });
    }
  }
  return true;
});

router.afterEach((to) => {
  document.title = to.meta?.title ?? "Lucas Rojas";

  if (window.animatePageTransition) {
      // Small timeout to let Vue render
      setTimeout(() => window.animatePageTransition('leave'), 50);
  }

  // Ocultamos el logo+barra una vez la ola comienza a retirarse.
  setTimeout(() => {
    if (window.hideNavLoader) window.hideNavLoader();
  }, 350);

  setTimeout(() => {
    initAnimaciones();
  }, 100);
});

export default router;
