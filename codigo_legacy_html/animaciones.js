// ============================================
//  ANIMACIONES.JS — Lucas Rojas
//  Sistema completo de animaciones premium
// ============================================

(function () {
    'use strict';

    var triggerWaveLeave = null;
    var lenisInstance = null;
    var scrollSubscribers = [];
    var scrollTickQueued = false;

    function getScrollTop() {
        return window.scrollY || window.pageYOffset || 0;
    }

    function emitScrollSubscribers() {
        if (scrollTickQueued) return;

        scrollTickQueued = true;
        requestAnimationFrame(function () {
            scrollTickQueued = false;
            scrollSubscribers.forEach(function (handler) {
                handler();
            });
        });
    }

    function onScrollFrame(handler) {
        if (typeof handler !== 'function') return;
        scrollSubscribers.push(handler);
    }

    function initSmoothScroll() {
        var prefersReducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion || typeof window.Lenis !== 'function') {
            emitScrollSubscribers();
            return;
        }

        lenisInstance = new window.Lenis({
            autoRaf: true,
            smoothWheel: true,
            lerp: 0.085
        });

        window.lenis = lenisInstance;
        lenisInstance.on('scroll', emitScrollSubscribers);
        emitScrollSubscribers();
    }

    /* ─────────────────────────────────────────
       1. PAGE LOADER
    ───────────────────────────────────────── */
    function initLoader() {
        var loader = document.getElementById('page-loader');
        if (!loader) {
            if (triggerWaveLeave) triggerWaveLeave();
            return;
        }

        var isInternalNav = sessionStorage.getItem('internal_nav') === 'true';
        sessionStorage.removeItem('internal_nav');

        if (isInternalNav) {
            // Es navegación interna: omitir la carga del logo y bajar la ola directamente
            loader.remove();
            checkScrollReveal();
            if (triggerWaveLeave) {
                setTimeout(triggerWaveLeave, 50);
            }
            return;
        }

        // Es primera carga o recarga de página: mostrar animación completa del logo
        // La barra CSS dura 0.5s. Quitamos el loader a los 0.6s
        setTimeout(function () {
            loader.classList.add('loaded');
            setTimeout(function () {
                loader.remove();
                checkScrollReveal();
                if (triggerWaveLeave) triggerWaveLeave();
            }, 300);
        }, 600);
    }

    /* ─────────────────────────────────────────
       2. PAGE TRANSITION
       Flujo al CARGAR la página:
         1. Overlay empieza con paneles visibles (sin transición)
         2. Tras 50ms se añade clase para que se retraigan con transición
       Flujo al hacer CLIC en un enlace interno:
         1. Se activa pt-entering → paneles cubren la pantalla
         2. Tras 600ms se navega a la nueva página (que repetirá paso 1)
    ───────────────────────────────────────── */
    function initPageTransitions() {
        var overlay = document.getElementById('page-transition');
        if (!overlay) return;

        var paths = [
            document.getElementById('pt-path-1')
        ];
        if (!paths[0]) return;

        // ── Configuración (misma que el componente React) ──
        var NUM_POINTS   = 10;
        var NUM_PATHS    = 1;
        var DELAY_PTS_MAX = 0.15;
        var DELAY_PER_PATH = 0;
        var ANIM_DURATION  = 500; // ms total por path

        // Easing power2.inOut
        function ease(t) {
            return t < 0.5
                ? 2 * t * t
                : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        // ── Construir la cadena "d" del path SVG ──
        function buildPathD(pts) {
            var d = 'M 0 0 V ' + pts[0] + ' C';
            for (var j = 0; j < NUM_POINTS - 1; j++) {
                var p  = ((j + 1) / (NUM_POINTS - 1)) * 100;
                var cp = p - (1 / (NUM_POINTS - 1) * 100) / 2;
                d += ' ' + cp + ' ' + pts[j] + ' ' + cp + ' ' + pts[j + 1] + ' ' + p + ' ' + pts[j + 1];
            }
            d += ' V 0 H 0';
            return d;
        }

        // ── Generar delays aleatorios para cada punto ──
        function generateDelays() {
            var delays = [];
            for (var i = 0; i < NUM_PATHS; i++) {
                delays[i] = [];
                for (var j = 0; j < NUM_POINTS; j++) {
                    delays[i][j] = Math.random() * DELAY_PTS_MAX;
                }
            }
            return delays;
        }

        // ── Animar: direction = 'enter' (0→100) o 'leave' (100→0) ──
        var animId = null;

        function animate(direction, onComplete) {
            if (animId) cancelAnimationFrame(animId);

            var delays   = generateDelays();
            var startTime = null;
            var fromVal  = direction === 'enter' ? 0 : 100;
            var toVal    = direction === 'enter' ? 100 : 0;

            // Calcular la duración total incluyendo todos los delays
            var maxDelay = 0;
            for (var i = 0; i < NUM_PATHS; i++) {
                var pathDelay = DELAY_PER_PATH * i;
                for (var j = 0; j < NUM_POINTS; j++) {
                    var d = (delays[i][j] + pathDelay) * 1000;
                    if (d > maxDelay) maxDelay = d;
                }
            }
            var totalDuration = ANIM_DURATION + maxDelay;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var elapsed = timestamp - startTime;

                // Actualizar cada path
                for (var i = 0; i < NUM_PATHS; i++) {
                    var pts = [];
                    var pathDelay = DELAY_PER_PATH * i;

                    for (var j = 0; j < NUM_POINTS; j++) {
                        var pointDelay = (delays[i][j] + pathDelay) * 1000;
                        var localElapsed = elapsed - pointDelay;

                        if (localElapsed <= 0) {
                            pts[j] = fromVal;
                        } else if (localElapsed >= ANIM_DURATION) {
                            pts[j] = toVal;
                        } else {
                            var t = localElapsed / ANIM_DURATION;
                            pts[j] = fromVal + (toVal - fromVal) * ease(t);
                        }
                    }

                    paths[i].setAttribute('d', buildPathD(pts));
                }

                if (elapsed < totalDuration) {
                    animId = requestAnimationFrame(step);
                } else {
                    // Asegurar estado final
                    var finalPts = [];
                    for (var k = 0; k < NUM_POINTS; k++) finalPts[k] = toVal;
                    for (var m = 0; m < NUM_PATHS; m++) {
                        paths[m].setAttribute('d', buildPathD(finalPts));
                    }
                    animId = null;
                    if (onComplete) onComplete();
                }
            }

            animId = requestAnimationFrame(step);
        }

        // ── Flujo al CARGAR la página: overlay cubre → se retira ──
        // 1. Establecer paths cubriendo la pantalla (instantáneo)
        var fullPts = [];
        for (var k = 0; k < NUM_POINTS; k++) fullPts[k] = 100;
        var fullD = buildPathD(fullPts);
        paths[0].setAttribute('d', fullD);

        // 2. Definir la función que bajará la ola cuando el loader termine
        triggerWaveLeave = function() {
            animate('leave', function () {
                // Limpiar paths vacíos
                var emptyPts = [];
                for (var k = 0; k < NUM_POINTS; k++) emptyPts[k] = 0;
                var emptyD = buildPathD(emptyPts);
                paths[0].setAttribute('d', emptyD);
            });
        };

        // ── Flujo al hacer CLIC en un enlace interno ──
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a');
            if (!link) return;

            var href = link.getAttribute('href');
            if (!href) return;

            var isInternal = !href.startsWith('http') &&
                             !href.startsWith('mailto') &&
                             !href.startsWith('tel') &&
                             !href.startsWith('#') &&
                             link.target !== '_blank';

            if (!isInternal) return;

            e.preventDefault();

            // Marcamos en sessionStorage que es una navegación interna para no mostrar el logo en la siguiente página
            sessionStorage.setItem('internal_nav', 'true');

            // Animar entrada (cubrir la pantalla)
            animate('enter', function () {
                window.location.href = href;
            });
        });
    }

    /* ─────────────────────────────────────────
       3. CURSOR PERSONALIZADO
    ───────────────────────────────────────── */
    function initCursor() {
        var dot  = document.getElementById('cursor-dot');
        var ring = document.getElementById('cursor-ring');
        if (!dot || !ring) return;

        // No en móvil/táctil
        if (!window.matchMedia('(pointer: fine)').matches) {
            dot.style.display  = 'none';
            ring.style.display = 'none';
            return;
        }

        // Ocultar hasta el primer movimiento del ratón
        dot.style.opacity  = '0';
        ring.style.opacity = '0';

        var firstMove = false;

        document.addEventListener('mousemove', function (e) {
            dot.style.left  = e.clientX + 'px';
            dot.style.top   = e.clientY + 'px';
            ring.style.left = e.clientX + 'px';
            ring.style.top  = e.clientY + 'px';

            if (!firstMove) {
                firstMove = true;
                dot.style.opacity  = '1';
                ring.style.opacity = '1';
            }
        });

        // Estados hover y click
        var hoverSelector = 'a, button, .servicio, .bloque, .stat-item, .productos, input, textarea, select, summary, label, .patrocinador-logo';
        document.querySelectorAll(hoverSelector).forEach(function (el) {
            el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
            el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
        });

        document.addEventListener('mousedown', function () { document.body.classList.add('cursor-click'); });
        document.addEventListener('mouseup',   function () { document.body.classList.remove('cursor-click'); });
    }

    /* ─────────────────────────────────────────
       4. SCROLL PROGRESS BAR
    ───────────────────────────────────────── */
    function initScrollProgress() {
        var bar = document.getElementById('scroll-progress');
        if (!bar) return;

        function update() {
            var scrollTop = getScrollTop();
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
        }

        onScrollFrame(update);
        update();
    }

    /* ─────────────────────────────────────────
       5. SCROLL REVEAL (Intersection Observer)
    ───────────────────────────────────────── */
    var srObserver;

    function initScrollReveal() {
        var targets = [
            { selector: '.servicio',    cls: 'sr-hidden sr-scale' },
            { selector: '.bloque',      cls: 'sr-hidden' },
            { selector: '.stat-item',   cls: 'sr-hidden sr-scale' },
            { selector: '.parrafo',     cls: 'sr-hidden' },
            { selector: '.mapas',       cls: 'sr-hidden' },
            { selector: '.barra',       cls: 'sr-hidden sr-left' },
            { selector: '.productos',   cls: 'sr-hidden sr-scale' },
            { selector: '.titulo',      cls: 'sr-hidden' },
            { selector: '.acordeon',    cls: 'sr-hidden sr-left' },
            { selector: '.container:not(.sector-3d-card)',   cls: 'sr-hidden' },
            { selector: '.glass-card',  cls: 'sr-hidden sr-right' },
            { selector: '.banda-stats', cls: 'sr-hidden' },
            { selector: '.contenedor-texto', cls: 'sr-hidden' },
        ];

        targets.forEach(function (t) {
            document.querySelectorAll(t.selector).forEach(function (el, i) {
                if (el.dataset.srDone) return;
                el.dataset.srDone = '1';

                t.cls.split(' ').forEach(function (c) { el.classList.add(c); });

                // Stagger por posición entre hermanos (hasta 6)
                var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
                var idx = siblings.indexOf(el);
                if (idx >= 0 && idx <= 5) {
                    el.classList.add('sr-delay-' + (idx + 1));
                }
            });
        });

        checkScrollReveal();
    }

    function checkScrollReveal() {
        if (srObserver) srObserver.disconnect();

        srObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('sr-visible');
                    srObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.sr-hidden:not(.sr-visible)').forEach(function (el) {
            srObserver.observe(el);
        });
    }

    /* ─────────────────────────────────────────
       6. CONTADORES ANIMADOS
    ───────────────────────────────────────── */
    function initCounters() {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.6 });

        document.querySelectorAll('.stat-num').forEach(function (el) {
            observer.observe(el);
        });
    }

    function animateCounter(el) {
        var originalText = el.textContent.trim();
        var prefix  = originalText.charAt(0) === '+' ? '+' : '';
        var numStr  = originalText.replace(/[^0-9.]/g, '');
        var suffix  = originalText.replace(/[0-9+,.]/g, '').trim();
        var useDots = /\d{1,3}\.\d{3}/.test(numStr); // e.g. "35.000"
        var target  = parseInt(numStr.replace(/\./g, ''), 10);
        if (isNaN(target) || target === 0) return;

        var duration  = 1800;
        var startTime = null;

        function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

        function fmt(n) {
            if (!useDots) return n.toString();
            return n.toLocaleString('es-ES'); // 35.000
        }

        function step(ts) {
            if (!startTime) startTime = ts;
            var p = Math.min((ts - startTime) / duration, 1);
            el.textContent = prefix + fmt(Math.round(easeOutCubic(p) * target)) + suffix;
            if (p < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = originalText;
            }
        }
        requestAnimationFrame(step);
    }

    /* ─────────────────────────────────────────
       7. BARRAS DE PROGRESO ANIMADAS
    ───────────────────────────────────────── */
    function initProgressBars() {
        function getMaxTransitionTimeMs(el) {
            if (!el) return 0;

            var styles = window.getComputedStyle(el);
            var durations = styles.transitionDuration.split(',').map(parseTimeToMs);
            var delays = styles.transitionDelay.split(',').map(parseTimeToMs);
            var total = 0;

            for (var i = 0; i < durations.length; i++) {
                var duration = durations[i] || 0;
                var delay = delays[i] || delays[delays.length - 1] || 0;
                total = Math.max(total, duration + delay);
            }

            return total;
        }

        function parseTimeToMs(value) {
            if (!value) return 0;

            var trimmed = value.trim();
            if (trimmed.slice(-2) === 'ms') return parseFloat(trimmed);
            if (trimmed.slice(-1) === 's') return parseFloat(trimmed) * 1000;
            return 0;
        }

        function startBarAnimation(el) {
            if (!el || el.dataset.progressAnimated === '1') return;

            var m = (el.getAttribute('style') || '').match(/width:\s*([\d.]+)%/);
            var targetW = el.dataset.targetWidth || (m ? m[1] + '%' : '');
            if (!targetW) return;

            el.dataset.targetWidth = targetW;
            el.dataset.progressAnimated = '1';
            el.style.setProperty('--target-width', targetW);
            el.style.removeProperty('width');
            el.classList.remove('animado');

            // Forzamos el estado inicial antes de disparar la transición.
            el.getBoundingClientRect();

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    el.classList.add('animado');
                });
            });
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var bar = entry.target;
                var fill = bar.querySelector('.progreso');
                if (!fill) {
                    observer.unobserve(bar);
                    return;
                }

                var revealDelay = getMaxTransitionTimeMs(bar);
                setTimeout(function () {
                    startBarAnimation(fill);
                }, revealDelay ? revealDelay + 40 : 60);

                observer.unobserve(bar);
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.barra').forEach(function (el) {
            observer.observe(el);
        });
    }

    /* ─────────────────────────────────────────
       8. PARTÍCULAS EN CANVAS
    ───────────────────────────────────────── */
    function initParticles() {
        var canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        var ctx   = canvas.getContext('2d');
        var W, H;
        var mouseX = -9999, mouseY = -9999;
        var particles = [];

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize, { passive: true });
        document.addEventListener('mousemove', function (e) { mouseX = e.clientX; mouseY = e.clientY; }, { passive: true });

        var maxParticles = W < 768 ? 20 : 55;
        var count = Math.min(maxParticles, Math.floor(W / 22));
        for (var i = 0; i < count; i++) {
            particles.push(mkParticle(false));
        }

        function mkParticle(fromBottom) {
            return {
                x: Math.random() * W,
                y: fromBottom ? H + 5 : Math.random() * H,
                r: Math.random() * 1.4 + 0.4,
                vx: (Math.random() - 0.5) * 0.28,
                vy: -(Math.random() * 0.35 + 0.08),
                a: Math.random() * 0.55 + 0.15,
                life: Math.random() * 180 + 80,
                age: 0
            };
        }

        function draw() {
            ctx.clearRect(0, 0, W, H);

            particles.forEach(function (p, idx) {
                p.x   += p.vx;
                p.y   += p.vy;
                p.age++;

                // Repulsión suave del cursor
                var dx = p.x - mouseX, dy = p.y - mouseY;
                var d  = Math.sqrt(dx * dx + dy * dy);
                if (d < 110 && d > 0.1) {
                    var f = (110 - d) / 110 * 0.55;
                    p.vx += (dx / d) * f;
                    p.vy += (dy / d) * f;
                }
                p.vx *= 0.982;
                p.vy *= 0.982;

                // Alpha con fade in/out
                var fade = p.age < 18 ? p.age / 18 : (p.age > p.life - 18 ? (p.life - p.age) / 18 : 1);
                var alpha = p.a * Math.max(0, fade);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0,200,215,' + alpha + ')';
                ctx.fill();

                if (p.age >= p.life || p.y < -12) {
                    particles[idx] = mkParticle(true);
                }
            });

            // Conexiones entre partículas cercanas
            for (var i = 0; i < particles.length - 1; i++) {
                for (var j = i + 1; j < particles.length; j++) {
                    var dx = particles[i].x - particles[j].x;
                    var dy = particles[i].y - particles[j].y;
                    var d  = Math.sqrt(dx * dx + dy * dy);
                    if (d < 75) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = 'rgba(0,200,215,' + (0.1 * (1 - d / 75)) + ')';
                        ctx.lineWidth   = 0.5;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(draw);
        }
        draw();
    }

    /* ─────────────────────────────────────────
       9. TILT 3D EN TARJETAS
       Nota: en .bloque aplicamos el tilt pero
       también respetamos el cursor tracking CSS
       (--mx / --my) del estilos.css
    ───────────────────────────────────────── */
    function initTilt() {
        var els = document.querySelectorAll('.servicio, .mapas, .glass-card:not(.sector-3d-inner), .productos');

        els.forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var r  = el.getBoundingClientRect();
                var cx = r.left + r.width  / 2;
                var cy = r.top  + r.height / 2;
                var rx = ((e.clientY - cy) / (r.height / 2)) * -5;
                var ry = ((e.clientX - cx) / (r.width  / 2)) *  5;
                el.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(4px)';
            });

            el.addEventListener('mouseleave', function () {
                // Transición suave de vuelta
                el.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
                el.style.transform  = '';
                setTimeout(function () { el.style.transition = ''; }, 500);
            });
        });

        // Para .bloque solo actualizamos el CSS cursor tracking, sin transform tilt
        // (el tilt del bloque viene del hover en estilos.css vía --mx/--my)
        document.querySelectorAll('.bloque').forEach(function (el) {
            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                el.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
                el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
            });
        });

        document.querySelectorAll('.sector-3d-card').forEach(function (el) {
            function resetTilt() {
                el.classList.remove('is-tilting');
                el.style.setProperty('--tilt-x', '0deg');
                el.style.setProperty('--tilt-y', '0deg');
                el.style.setProperty('--card-lift', '0px');
                el.style.setProperty('--tilt-scale', '1');
            }

            el.addEventListener('mouseenter', function () {
                el.classList.add('is-tilting');
            });

            el.addEventListener('mousemove', function (e) {
                var r = el.getBoundingClientRect();
                var px = (e.clientX - r.left) / r.width;
                var py = (e.clientY - r.top) / r.height;
                var tiltY = (px - 0.5) * 18;
                var tiltX = (0.5 - py) * 18;

                el.classList.add('is-tilting');
                el.style.setProperty('--tilt-x', tiltX.toFixed(2) + 'deg');
                el.style.setProperty('--tilt-y', tiltY.toFixed(2) + 'deg');
                el.style.setProperty('--card-lift', '-18px');
                el.style.setProperty('--tilt-scale', '1.025');
            });

            el.addEventListener('mouseleave', function () {
                resetTilt();
            });

            resetTilt();
        });
    }

    /* ─────────────────────────────────────────
       10. MAGNETIC BUTTONS
    ───────────────────────────────────────── */
    function initMagneticButtons() {
        var btns = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-cliente, .btn-explorar, .btn-primary, .btn-submit');

        btns.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var r  = btn.getBoundingClientRect();
                var dx = (e.clientX - (r.left + r.width  / 2)) * 0.22;
                var dy = (e.clientY - (r.top  + r.height / 2)) * 0.22;
                btn.style.transform = 'translate(' + dx + 'px, ' + (dy - 2) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
                btn.style.transform  = '';
                setTimeout(function () { btn.style.transition = ''; }, 450);
            });
        });
    }

    /* ─────────────────────────────────────────
       11. RIPPLE EN BOTONES
    ───────────────────────────────────────── */
    function initRipple() {
        var btns = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-cliente, .btn-explorar, .btn-primary, .btn-submit');

        btns.forEach(function (btn) {
            btn.classList.add('ripple-btn');
            btn.addEventListener('click', function (e) {
                var r    = btn.getBoundingClientRect();
                var size = Math.max(r.width, r.height) * 2.2;
                var span = document.createElement('span');
                span.className    = 'ripple';
                span.style.width  = size + 'px';
                span.style.height = size + 'px';
                span.style.left   = (e.clientX - r.left - size / 2) + 'px';
                span.style.top    = (e.clientY - r.top  - size / 2) + 'px';
                btn.appendChild(span);
                setTimeout(function () { span.remove(); }, 700);
            });
        });
    }

    /* ─────────────────────────────────────────
       12. NAV SCROLL EFFECT
    ───────────────────────────────────────── */
    function initNavScroll() {
        var header = document.querySelector('header');
        if (!header) return;

        function check() {
            if (getScrollTop() > 60) {
                header.classList.add('nav-scrolled');
            } else {
                header.classList.remove('nav-scrolled');
            }
        }
        onScrollFrame(check);
        check();
    }

    /* ─────────────────────────────────────────
       13. PARALLAX HERO
    ───────────────────────────────────────── */
    function initParallax() {
        var contenido = document.querySelector('.contenido-hero');
        if (!contenido) return;

        function update() {
            var y = getScrollTop();
            contenido.style.transform = 'translate(-50%, calc(-50% + ' + (y * 0.18) + 'px))';
            contenido.style.opacity   = Math.max(0, 1 - y / 480);
        }

        onScrollFrame(update);
        update();
    }

    /* ─────────────────────────────────────────
       14. EFECTO GLITCH EN HERO
    ───────────────────────────────────────── */
    function initGlitch() {
        var em = document.querySelector('.contenido-hero h1 em');
        if (!em) return;
        em.classList.add('glitch');
        em.setAttribute('data-text', em.textContent);
    }

    /* ─────────────────────────────────────────
       15. SCROLL INDICATOR EN HERO
    ───────────────────────────────────────── */
    function initScrollIndicator() {
        var hero = document.querySelector('.carrusel-fondo');
        if (!hero) return;

        var ind = document.createElement('div');
        ind.className = 'scroll-indicator';
        ind.innerHTML = '<div class="scroll-mouse"></div><span>Scroll</span>';
        hero.appendChild(ind);

        function update() {
            ind.style.opacity = Math.max(0, 0.5 - getScrollTop() / 180);
        }

        onScrollFrame(update);
        update();
    }

    /* ─────────────────────────────────────────
       16. HOVER GLOW EN STAT ITEMS
    ───────────────────────────────────────── */
    function initStatGlow() {
        document.querySelectorAll('.stat-item').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                el.style.textShadow = '0 0 20px rgba(0,200,215,0.4)';
            });
            el.addEventListener('mouseleave', function () {
                el.style.textShadow = '';
            });
        });
    }

    /* ─────────────────────────────────────────
       17. LOGO FLOAT SUAVE EN NAV
    ───────────────────────────────────────── */
    function initLogoHover() {
        var logo = document.querySelector('.logo-link .logo');
        if (!logo) return;

        var logoLink = logo.closest('.logo-link');
        if (!logoLink) return;

        logoLink.addEventListener('mouseenter', function () {
            logo.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease';
            logo.style.transform  = 'rotate(-5deg) scale(1.08)';
        });
        logoLink.addEventListener('mouseleave', function () {
            logo.style.transform = '';
        });
    }

    /* ─────────────────────────────────────────
       18. SOCIAL LINKS STAGGER AL ENTRAR EN FOOTER
    ───────────────────────────────────────── */
    function initFooterSocial() {
        var socials = document.querySelectorAll('.social-link');
        if (!socials.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                socials.forEach(function (el, i) {
                    setTimeout(function () {
                        el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)';
                        el.style.opacity    = '1';
                        el.style.transform  = 'translateY(0)';
                    }, i * 80);
                });
                observer.disconnect();
            });
        }, { threshold: 0.5 });

        // Ocultar inicialmente
        socials.forEach(function (el) {
            el.style.opacity   = '0';
            el.style.transform = 'translateY(12px)';
        });
        observer.observe(socials[0].closest('.footer-col') || socials[0]);
    }

    /* ─────────────────────────────────────────
       19. MENÚ MÓVIL (HAMBURGUESA)
    ───────────────────────────────────────── */
    function initMobileMenu() {
        var toggleBtn = document.getElementById('menu-toggle');
        if (!toggleBtn) return;

        // ── Crear overlay dinámicamente ──
        var overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        overlay.id = 'mobile-nav-overlay';

        // Obtener links del nav
        var navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        var links = navLinks.querySelectorAll('a');
        links.forEach(function (link) {
            var clone = document.createElement('a');
            clone.href = link.href;
            clone.textContent = link.textContent;
            clone.target = link.target || '';
            if (link.classList.contains('activa')) {
                clone.classList.add('activa');
            }
            overlay.appendChild(clone);
        });

        // Divisor
        var divider = document.createElement('div');
        divider.className = 'mobile-nav-divider';
        overlay.appendChild(divider);

        // Sección extra (tema + área cliente)
        var extra = document.createElement('div');
        extra.className = 'mobile-nav-extra';

        // Botón tema en overlay
        var temaBtn = document.createElement('button');
        temaBtn.className = 'btn-tema-mobile';
        temaBtn.setAttribute('aria-label', 'Cambiar tema');
        temaBtn.innerHTML = '<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

        // Enlazar con el botón de tema existente
        temaBtn.addEventListener('click', function () {
            var mainTema = document.getElementById('btn-tema');
            if (mainTema) mainTema.click();
        });
        extra.appendChild(temaBtn);

        // Enlace Área de Cliente
        var clienteLink = document.createElement('a');
        clienteLink.href = 'https://tienda.lucasrojas.com/';
        clienteLink.target = '_blank';
        clienteLink.textContent = 'Área de Cliente';
        clienteLink.style.cssText = 'background: linear-gradient(135deg, var(--accent), #008fa0); color: var(--bg); padding: 12px 28px; border-radius: 40px; font-family: "Outfit", sans-serif; font-weight: 600; font-size: 0.9rem; text-decoration: none; letter-spacing: 0.02em;';
        extra.appendChild(clienteLink);

        overlay.appendChild(extra);
        document.body.appendChild(overlay);

        var isOpen = false;

        function openMenu() {
            isOpen = true;
            toggleBtn.classList.add('is-active');
            toggleBtn.setAttribute('aria-expanded', 'true');
            overlay.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            isOpen = false;
            toggleBtn.classList.remove('is-active');
            toggleBtn.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Cerrar al hacer clic en un enlace del overlay
        overlay.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        // Cerrar con Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && isOpen) {
                closeMenu();
            }
        });

        // Cerrar si se redimensiona por encima de 768px
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && isOpen) {
                closeMenu();
            }
        });
    }

    /* ─────────────────────────────────────────
       INICIALIZACIÓN
    ───────────────────────────────────────── */
    function init() {
        window.addEventListener('scroll', emitScrollSubscribers, { passive: true });

        var isTouch = !window.matchMedia('(pointer: fine)').matches;

        initSmoothScroll();
        initPageTransitions();
        initLoader();
        initCursor();
        initScrollProgress();
        initScrollReveal();
        initCounters();
        initProgressBars();
        initParticles();

        // Solo activar tilt y magnetic en dispositivos con ratón
        if (!isTouch) {
            initTilt();
            initMagneticButtons();
        }

        initRipple();
        initNavScroll();
        initParallax();
        initGlitch();
        initScrollIndicator();
        initStatGlow();
        initLogoHover();
        initFooterSocial();
        initMobileMenu();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
