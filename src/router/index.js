import { createRouter, createWebHistory } from "vue-router";
const HomeView = () => import("../views/HomeView.vue");
const SolucionesView = () => import("../views/SolucionesView.vue");
const SectoresView = () => import("../views/SectoresView.vue");
const ProyectosView = () => import("../views/ProyectosView.vue");
const NosotrosView = () => import("../views/NosotrosView.vue");
const ContactoView = () => import("../views/ContactoView.vue");

import { initAnimaciones } from "../animacionesVue.js";

const routes = [
  { path: "/index.html", redirect: "/" },
  { path: "/", name: "inicio", component: HomeView, meta: { title: "Inicio | Lucas Rojas" } },
  { path: "/soluciones", name: "soluciones", component: SolucionesView, meta: { title: "Soluciones | Lucas Rojas" } },
  { path: "/sectores", name: "sectores", component: SectoresView, meta: { title: "Sectores | Lucas Rojas" } },
  { path: "/proyectos", name: "proyectos", component: ProyectosView, meta: { title: "Proyectos | Lucas Rojas" } },
  { path: "/nosotros", name: "nosotros", component: NosotrosView, meta: { title: "Nosotros | Lucas Rojas" } },
  { path: "/contacto", name: "contacto", component: ContactoView, meta: { title: "Contacto | Lucas Rojas" } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach(async (to, from) => {
  if (to.path !== from.path && window.animatePageTransition) {
    await new Promise(resolve => {
      window.animatePageTransition('enter', () => {
        resolve();
      });
    });
  }
  return true;
});

router.afterEach((to) => {
  document.title = to.meta?.title ?? "Lucas Rojas";
  
  if (window.animatePageTransition) {
      // Small timeout to let Vue render
      setTimeout(() => window.animatePageTransition('leave'), 50);
  }

  setTimeout(() => {
    initAnimaciones();
  }, 100);
});

export default router;
