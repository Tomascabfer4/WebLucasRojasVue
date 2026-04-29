// ============================================
//  Lucas Rojas — Toggle de Tema Claro/Oscuro
// ============================================
(function () {
    const KEY = 'lr-tema';

    // Preferencia del sistema
    function sistemaEsClaro() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    }

    // Aplica el tema al <html>
    function aplicarTema(esClaro) {
        if (esClaro) {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    // Decide qué tema mostrar:
    // - Si hay elección manual guardada, úsala.
    // - Si no, usa la preferencia del sistema.
    function temaActivo() {
        const guardado = localStorage.getItem(KEY);
        if (guardado === 'light') return true;
        if (guardado === 'dark')  return false;
        return sistemaEsClaro(); // sin elección manual → sistema
    }

    // Ejecutar inmediatamente para evitar parpadeo
    aplicarTema(temaActivo());

    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('btn-tema');
        if (!btn) return;

        let isTransitioning = false;

        btn.addEventListener('click', function () {
            if (isTransitioning) return;
            const ahoraEsClaro = document.documentElement.getAttribute('data-theme') === 'light';
            const nuevoEsClaro = !ahoraEsClaro;

            // Si el nuevo tema coincide con el del sistema, borramos
            // la preferencia manual para volver a seguir al sistema.
            if (nuevoEsClaro === sistemaEsClaro()) {
                localStorage.removeItem(KEY);
            } else {
                localStorage.setItem(KEY, nuevoEsClaro ? 'light' : 'dark');
            }

            isTransitioning = true;

            const circle = document.createElement('div');
            circle.className = 'theme-transition-circle';
            // #f0f4f8 es el fondo claro, #06090d el oscuro
            circle.style.backgroundColor = nuevoEsClaro ? '#f0f4f8' : '#06090d';
            document.body.appendChild(circle);

            // Calcular cuánto tiene que crecer el círculo de 20px (radio 10)
            const radioMax = Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
            const scale = (radioMax / 10) + 2;

            // Forzar render
            circle.getBoundingClientRect();

            circle.style.transform = 'scale(' + scale + ')';

            aplicarTema(nuevoEsClaro);

            setTimeout(function () {
                circle.remove();
                isTransitioning = false;
            }, 550);
        });

        // Escuchar cambios del sistema en tiempo real (solo si no hay elección manual)
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
            if (!localStorage.getItem(KEY)) {
                aplicarTema(e.matches);
            }
        });
    });
})();
