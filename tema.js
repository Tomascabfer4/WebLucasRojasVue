// ============================================
//  Lucas Rojas - Toggle de Tema Claro/Oscuro
// ============================================
(function () {
    const KEY = 'lr-tema';
    const LIGHT_THEME_COLOR = '#f0f4f8';
    const DARK_THEME_COLOR = '#06090d';
    const html = document.documentElement;
    const mediaTema = window.matchMedia
        ? window.matchMedia('(prefers-color-scheme: light)')
        : null;

    // Preferencia del sistema
    function sistemaEsClaro() {
        return !!(mediaTema && mediaTema.matches);
    }

    function actualizarThemeColor(esClaro) {
        let meta = document.querySelector('meta[name="theme-color"]');

        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'theme-color';
            document.head.appendChild(meta);
        }

        meta.setAttribute('content', esClaro ? LIGHT_THEME_COLOR : DARK_THEME_COLOR);
    }

    function actualizarLogos(esClaro) {
        const selector = 'img[data-logo-light][data-logo-dark]';
        const logos = document.querySelectorAll(selector);

        logos.forEach(function (logo) {
            const nuevaRuta = esClaro
                ? logo.getAttribute('data-logo-light')
                : logo.getAttribute('data-logo-dark');

            if (nuevaRuta && logo.getAttribute('src') !== nuevaRuta) {
                logo.setAttribute('src', nuevaRuta);
            }
        });
    }

    function configurarRevealCircular(origenX, origenY) {
        const distanciaX = Math.max(origenX, window.innerWidth - origenX);
        const distanciaY = Math.max(origenY, window.innerHeight - origenY);
        const radioMax = Math.hypot(distanciaX, distanciaY);

        html.style.setProperty('--theme-origin-x', origenX + 'px');
        html.style.setProperty('--theme-origin-y', origenY + 'px');
        html.style.setProperty('--theme-reveal-radius', radioMax + 'px');
    }

    function limpiarRevealCircular() {
        html.style.removeProperty('--theme-origin-x');
        html.style.removeProperty('--theme-origin-y');
        html.style.removeProperty('--theme-reveal-radius');
    }

    // Aplica el tema al <html>
    function aplicarTema(esClaro) {
        if (esClaro) {
            html.setAttribute('data-theme', 'light');
        } else {
            html.removeAttribute('data-theme');
        }

        html.style.colorScheme = esClaro ? 'light' : 'dark';
        actualizarThemeColor(esClaro);
        actualizarLogos(esClaro);
    }

    // Decide que tema mostrar:
    // - Si hay eleccion manual guardada, usala.
    // - Si no, usa la preferencia del sistema.
    function temaActivo() {
        const guardado = localStorage.getItem(KEY);

        if (guardado === 'light') return true;
        if (guardado === 'dark') return false;

        return sistemaEsClaro();
    }

    // Ejecutar inmediatamente para evitar parpadeo
    aplicarTema(temaActivo());

    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('btn-tema');
        if (!btn) return;

        let isTransitioning = false;

        btn.addEventListener('click', function () {
            if (isTransitioning) return;

            const ahoraEsClaro = html.getAttribute('data-theme') === 'light';
            const nuevoEsClaro = !ahoraEsClaro;
            const rect = btn.getBoundingClientRect();
            const origenX = rect.left + (rect.width / 2);
            const origenY = rect.top + (rect.height / 2);

            // Si el nuevo tema coincide con el del sistema, borramos
            // la preferencia manual para volver a seguir al sistema.
            if (nuevoEsClaro === sistemaEsClaro()) {
                localStorage.removeItem(KEY);
            } else {
                localStorage.setItem(KEY, nuevoEsClaro ? 'light' : 'dark');
            }

            isTransitioning = true;

            if (typeof document.startViewTransition === 'function') {
                configurarRevealCircular(origenX, origenY);

                const transicion = document.startViewTransition(function () {
                    aplicarTema(nuevoEsClaro);
                });

                transicion.finished.finally(function () {
                    limpiarRevealCircular();
                    isTransitioning = false;
                });

                return;
            }

            const circle = document.createElement('div');
            circle.className = 'theme-transition-circle';
            circle.style.backgroundColor = nuevoEsClaro ? LIGHT_THEME_COLOR : DARK_THEME_COLOR;
            document.body.appendChild(circle);

            // Calcular cuanto tiene que crecer el circulo desde 20px.
            const radioMax = Math.hypot(window.innerWidth / 2, window.innerHeight / 2);
            const scale = (radioMax / 10) + 2;

            circle.getBoundingClientRect();
            circle.style.transform = 'scale(' + scale + ')';

            aplicarTema(nuevoEsClaro);

            setTimeout(function () {
                circle.remove();
                isTransitioning = false;
            }, 550);
        });

        // Escuchar cambios del sistema en tiempo real
        // solo si no hay eleccion manual.
        if (!mediaTema) return;

        const escucharCambio = function (e) {
            if (!localStorage.getItem(KEY)) {
                aplicarTema(e.matches);
            }
        };

        if (typeof mediaTema.addEventListener === 'function') {
            mediaTema.addEventListener('change', escucharCambio);
        } else if (typeof mediaTema.addListener === 'function') {
            mediaTema.addListener(escucharCambio);
        }
    });
})();
