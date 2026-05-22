import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/tailwind.css";
import "/estilos.css";
import "/animaciones.css";

createApp(App).use(router).mount("#app");
