// ============================================
//  ANIMACIONESVUE.JS — Lucas Rojas
//  Sistema completo de animaciones premium con GSAP
// ============================================

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

var triggerWaveLeave = null;
var lenisInstance = null;
var lenisTick = null;
var scrollSubscribers = [];
var scrollTickQueued = false;
var activeListeners = [];

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

function addCleanableListener(el, type, handler) {
    el.addEventListener(type, handler);
    activeListeners.push({ el: el, type: type, handler: handler });
}

function cleanupActiveListeners() {
    activeListeners.forEach(function (item) {
        if (item.el) {
            item.el.removeEventListener(item.type, item.handler);
            delete item.el.dataset.rippleBound;
            delete item.el.dataset.tiltBound;
            delete item.el.dataset.magneticBound;
            delete item.el.dataset.glowBound;
            delete item.el.dataset.logoHoverBound;
        }
    });
    activeListeners = [];
}

function initSmoothScroll() {
    var prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof window.Lenis !== 'function') {
        emitScrollSubscribers();
        return;
    }

    lenisInstance = new window.Lenis({
        smoothWheel: true,
        lerp: 0.085
    });

    window.lenis = lenisInstance;
    lenisInstance.on('scroll', emitScrollSubscribers);
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP ticker loop
    lenisTick = function(time) {
        if (lenisInstance) {
            lenisInstance.raf(time * 1000);
        }
    };
    gsap.ticker.add(lenisTick);
    gsap.ticker.lagSmoothing(0);

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
        loader.remove();
        if (triggerWaveLeave) {
            setTimeout(triggerWaveLeave, 50);
        }
        return;
    }

    setTimeout(function () {
        loader.classList.add('loaded');
        setTimeout(function () {
            loader.remove();
            if (triggerWaveLeave) triggerWaveLeave();
        }, 300);
    }, 600);
}

/* ─────────────────────────────────────────
   2. PAGE TRANSITION (GSAP Powered Waves)
───────────────────────────────────────── */
let transitionAnimId = null;

function initPageTransitions() {
    var overlay = document.getElementById('page-transition');
    if (!overlay) return;

    var paths = [
        document.getElementById('pt-path-1')
    ];
    if (!paths[0]) return;

    var NUM_POINTS   = 10;
    var NUM_PATHS    = 1;
    var DELAY_PTS_MAX = 0.15;
    var DELAY_PER_PATH = 0;
    var ANIM_DURATION  = 500; // ms total por path

    function ease(t) {
        return t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

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

    function animate(direction, onComplete) {
        if (transitionAnimId) cancelAnimationFrame(transitionAnimId);

        var delays   = generateDelays();
        var startTime = null;
        var fromVal  = direction === 'enter' ? 0 : 100;
        var toVal    = direction === 'enter' ? 100 : 0;

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
                transitionAnimId = requestAnimationFrame(step);
            } else {
                var finalPts = [];
                for (var k = 0; k < NUM_POINTS; k++) finalPts[k] = toVal;
                for (var m = 0; m < NUM_PATHS; m++) {
                    paths[m].setAttribute('d', buildPathD(finalPts));
                }
                transitionAnimId = null;
                if (onComplete) onComplete();
            }
        }

        transitionAnimId = requestAnimationFrame(step);
    }

    var fullPts = Array(NUM_POINTS).fill(100);
    paths[0].setAttribute('d', buildPathD(fullPts));

    triggerWaveLeave = function() {
        animate('leave', function () {
            var emptyPts = Array(NUM_POINTS).fill(0);
            paths[0].setAttribute('d', buildPathD(emptyPts));
        });
    };

    window.animatePageTransition = animate;
}

/* ─────────────────────────────────────────
   3. CURSOR PERSONALIZADO
───────────────────────────────────────── */
function initCursor() {
    var dot  = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    if (!window.matchMedia('(pointer: fine)').matches) {
        dot.style.display  = 'none';
        ring.style.display = 'none';
        return;
    }

    dot.style.opacity  = '0';
    ring.style.opacity = '0';
    document.body.classList.add('custom-cursor-active');

    var firstMove = false;
    
    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var ringX = mouseX;
    var ringY = mouseY;
    var dotX = mouseX;
    var dotY = mouseY;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!firstMove) {
            firstMove = true;
            dot.style.opacity  = '1';
            ring.style.opacity = '1';
            ringX = mouseX;
            ringY = mouseY;
            dotX = mouseX;
            dotY = mouseY;
        }
    });
    
    function renderCursor() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        dotX += (mouseX - dotX) * 0.6;
        dotY += (mouseY - dotY) * 0.6;
        
        dot.style.setProperty('--x', dotX + 'px');
        dot.style.setProperty('--y', dotY + 'px');
        ring.style.setProperty('--x', ringX + 'px');
        ring.style.setProperty('--y', ringY + 'px');
        
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    var hoverSelector = 'a, button, .servicio, .bloque, .stat-item, .productos, input, textarea, select, summary, label, .patrocinador-logo';
    
    document.addEventListener('mouseover', function (e) {
        if (e.target.closest && e.target.closest(hoverSelector)) {
            document.body.classList.add('cursor-hover');
        }
    });
    
    document.addEventListener('mouseout', function (e) {
        if (e.target.closest && e.target.closest(hoverSelector)) {
            document.body.classList.remove('cursor-hover');
        }
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
   5. SCROLL REVEAL (GSAP ScrollTrigger)
───────────────────────────────────────── */
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
        { selector: '.sector-3d-card',                  cls: 'sr-hidden' },
        { selector: '.glass-card',  cls: 'sr-hidden sr-right' },
        { selector: '.banda-stats', cls: 'sr-hidden' },
        { selector: '.contenedor-texto', cls: 'sr-hidden' },
    ];

    targets.forEach(function (t) {
        document.querySelectorAll(t.selector).forEach(function (el) {
            if (el.dataset.srDone) return;
            el.dataset.srDone = '1';

            t.cls.split(' ').forEach(function (c) { el.classList.add(c); });

            var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
            var idx = siblings.indexOf(el);
            if (idx >= 0 && idx <= 5) {
                el.classList.add('sr-delay-' + (idx + 1));
            }

            ScrollTrigger.create({
                trigger: el,
                start: "top 90%",
                onEnter: function() {
                    el.classList.add('sr-visible');
                },
                once: true
            });
        });
    });
}

/* ─────────────────────────────────────────
   6. CONTADORES ANIMADOS (GSAP)
───────────────────────────────────────── */
function initCounters() {
    document.querySelectorAll('.stat-num').forEach(function (el) {
        var originalText = el.textContent.trim();
        var prefix  = originalText.charAt(0) === '+' ? '+' : '';
        var numStr  = originalText.replace(/[^0-9.]/g, '');
        var suffix  = originalText.replace(/[0-9+,.]/g, '').trim();
        var useDots = /\d{1,3}\.\d{3}/.test(numStr);
        var targetVal  = parseInt(numStr.replace(/\./g, ''), 10);
        if (isNaN(targetVal) || targetVal === 0) return;

        var counterObj = { val: 0 };

        function fmt(n) {
            if (!useDots) return n.toString();
            return n.toLocaleString('es-ES');
        }

        gsap.to(counterObj, {
            val: targetVal,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            onUpdate: function() {
                el.textContent = prefix + fmt(Math.round(counterObj.val)) + suffix;
            },
            onComplete: function() {
                el.textContent = originalText;
            }
        });
    });
}

/* ─────────────────────────────────────────
   7. BARRAS DE PROGRESO ANIMADAS (GSAP)
───────────────────────────────────────── */
function initProgressBars() {
    document.querySelectorAll('.barra').forEach(function (bar) {
        var fill = bar.querySelector('.progreso');
        if (!fill) return;

        var m = (fill.getAttribute('style') || '').match(/width:\s*([\d.]+)%/);
        var targetW = fill.dataset.targetWidth || (m ? m[1] + '%' : '');
        if (!targetW) return;

        fill.dataset.targetWidth = targetW;
        fill.style.setProperty('--target-width', targetW);
        fill.style.removeProperty('width');

        ScrollTrigger.create({
            trigger: bar,
            start: "top 90%",
            onEnter: function() {
                fill.classList.add('animado');
            },
            once: true
        });
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

            var dx = p.x - mouseX, dy = p.y - mouseY;
            var d  = Math.sqrt(dx * dx + dy * dy);
            if (d < 110 && d > 0.1) {
                var f = (110 - d) / 110 * 0.55;
                p.vx += (dx / d) * f;
                p.vy += (dy / d) * f;
            }
            p.vx *= 0.982;
            p.vy *= 0.982;

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
───────────────────────────────────────── */
function initTilt() {
    var els = document.querySelectorAll('.servicio, .mapas, .glass-card:not(.sector-3d-inner), .productos');

    els.forEach(function (el) {
        if (el.dataset.tiltBound) return;
        el.dataset.tiltBound = '1';

        const moveHandler = function (e) {
            var r  = el.getBoundingClientRect();
            var cx = r.left + r.width  / 2;
            var cy = r.top  + r.height / 2;
            var rx = ((e.clientY - cy) / (r.height / 2)) * -5;
            var ry = ((e.clientX - cx) / (r.width  / 2)) *  5;
            el.style.transform = 'perspective(700px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateZ(4px)';
        };

        const leaveHandler = function () {
            el.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)';
            el.style.transform  = '';
            setTimeout(function () { el.style.transition = ''; }, 500);
        };

        addCleanableListener(el, 'mousemove', moveHandler);
        addCleanableListener(el, 'mouseleave', leaveHandler);
    });

    document.querySelectorAll('.bloque').forEach(function (el) {
        if (el.dataset.tiltBound) return;
        el.dataset.tiltBound = '1';

        const moveHandler = function (e) {
            var r = el.getBoundingClientRect();
            el.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
            el.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
        };

        addCleanableListener(el, 'mousemove', moveHandler);
    });

    document.querySelectorAll('.sector-3d-card').forEach(function (el) {
        if (el.dataset.tiltBound) return;
        el.dataset.tiltBound = '1';

        function resetTilt() {
            el.classList.remove('is-tilting');
            el.style.setProperty('--tilt-x', '0deg');
            el.style.setProperty('--tilt-y', '0deg');
            el.style.setProperty('--card-lift', '0px');
            el.style.setProperty('--tilt-scale', '1');
        }

        const enterHandler = function () {
            el.classList.add('is-tilting');
        };

        const moveHandler = function (e) {
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
        };

        const leaveHandler = function () {
            resetTilt();
        };

        addCleanableListener(el, 'mouseenter', enterHandler);
        addCleanableListener(el, 'mousemove', moveHandler);
        addCleanableListener(el, 'mouseleave', leaveHandler);

        resetTilt();
    });
}

/* ─────────────────────────────────────────
   10. MAGNETIC BUTTONS
───────────────────────────────────────── */
function initMagneticButtons() {
    var btns = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-cliente, .btn-explorar, .btn-primary, .btn-submit');

    btns.forEach(function (btn) {
        if (btn.dataset.magneticBound) return;
        btn.dataset.magneticBound = '1';

        const moveHandler = function (e) {
            var r  = btn.getBoundingClientRect();
            var dx = (e.clientX - (r.left + r.width  / 2)) * 0.22;
            var dy = (e.clientY - (r.top  + r.height / 2)) * 0.22;
            btn.style.transform = 'translate(' + dx + 'px, ' + (dy - 2) + 'px)';
        };

        const leaveHandler = function () {
            btn.style.transition = 'transform 0.4s cubic-bezier(0.22,1,0.36,1)';
            btn.style.transform  = '';
            setTimeout(function () { btn.style.transition = ''; }, 450);
        };

        addCleanableListener(btn, 'mousemove', moveHandler);
        addCleanableListener(btn, 'mouseleave', leaveHandler);
    });
}

/* ─────────────────────────────────────────
   11. RIPPLE EN BOTONES
───────────────────────────────────────── */
function initRipple() {
    var btns = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-cliente, .btn-explorar, .btn-primary, .btn-submit');

    btns.forEach(function (btn) {
        if (btn.dataset.rippleBound) return;
        btn.dataset.rippleBound = '1';

        btn.classList.add('ripple-btn');
        const clickHandler = function (e) {
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
        };
        addCleanableListener(btn, 'click', clickHandler);
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
   13. PARALLAX HERO (GSAP ScrollTrigger)
───────────────────────────────────────── */
function initParallax() {
    var contenido = document.querySelector('.contenido-hero');
    if (!contenido) return;

    gsap.fromTo(contenido,
        { yPercent: -50, xPercent: -50, opacity: 1 },
        {
            yPercent: -50,
            xPercent: -50,
            y: 120,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".carrusel-fondo",
                start: "top top",
                end: "bottom 30%",
                scrub: true
            }
        }
    );
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
   15. SCROLL INDICATOR EN HERO (GSAP ScrollTrigger)
───────────────────────────────────────── */
function initScrollIndicator() {
    var hero = document.querySelector('.carrusel-fondo');
    if (!hero) return;

    var ind = hero.querySelector('.scroll-indicator');
    if (!ind) {
        ind = document.createElement('div');
        ind.className = 'scroll-indicator';
        ind.innerHTML = '<div class="scroll-mouse"></div><span>SCROLL</span>';
        hero.appendChild(ind);
    }

    gsap.to(ind, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".carrusel-fondo",
            start: "top top",
            end: "150 top",
            scrub: true
        }
    });
}

/* ─────────────────────────────────────────
   16. HOVER GLOW EN STAT ITEMS
───────────────────────────────────────── */
function initStatGlow() {
    document.querySelectorAll('.stat-item').forEach(function (el) {
        if (el.dataset.glowBound) return;
        el.dataset.glowBound = '1';

        const enterHandler = function () {
            el.style.textShadow = '0 0 20px rgba(0,200,215,0.4)';
        };
        const leaveHandler = function () {
            el.style.textShadow = '';
        };

        addCleanableListener(el, 'mouseenter', enterHandler);
        addCleanableListener(el, 'mouseleave', leaveHandler);
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

    if (logoLink.dataset.logoHoverBound) return;
    logoLink.dataset.logoHoverBound = '1';

    const enterHandler = function () {
        logo.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), filter 0.5s ease';
        logo.style.transform  = 'rotate(-5deg) scale(1.08)';
    };
    const leaveHandler = function () {
        logo.style.transform = '';
    };

    addCleanableListener(logoLink, 'mouseenter', enterHandler);
    addCleanableListener(logoLink, 'mouseleave', leaveHandler);
}

/* ─────────────────────────────────────────
   18. SOCIAL LINKS STAGGER AL ENTRAR EN FOOTER (GSAP ScrollTrigger)
───────────────────────────────────────── */
function initFooterSocial() {
    var socials = document.querySelectorAll('.social-link');
    if (!socials.length) return;

    gsap.set(socials, { opacity: 0, y: 12 });

    gsap.to(socials, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
            trigger: socials[0].closest('.pie-pagina') || socials[0],
            start: "top 95%",
            toggleActions: "play none none none"
        }
    });
}

/* ─────────────────────────────────────────
   INICIALIZACIÓN Y LIMPIEZA
───────────────────────────────────────── */
let isGlobalInitialized = false;

export function cleanupAnimaciones() {
    // Matar todos los ScrollTriggers activos
    ScrollTrigger.getAll().forEach(function (trigger) {
        trigger.kill();
    });

    // Remover todos los event listeners guardados
    cleanupActiveListeners();

    // Remover callback del ticker de GSAP
    if (lenisTick) {
        gsap.ticker.remove(lenisTick);
        lenisTick = null;
    }

    // Cancelar animación de transición de página activa
    if (transitionAnimId) {
        cancelAnimationFrame(transitionAnimId);
        transitionAnimId = null;
    }

    // Destruir Lenis
    if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
        window.lenis = null;
    }
}

export function initAnimaciones() {
    if (!isGlobalInitialized) {
        window.addEventListener('scroll', emitScrollSubscribers, { passive: true });
        initSmoothScroll();
        initPageTransitions();
        initCursor();
        initScrollProgress();
        initParticles();
        initNavScroll();
        initLoader();
        isGlobalInitialized = true;
    } else {
        // En navegaciones posteriores, reiniciamos Lenis si no existe
        if (!lenisInstance) {
            initSmoothScroll();
        }
    }

    var isTouch = !window.matchMedia('(pointer: fine)').matches;

    initScrollReveal();
    initCounters();
    initProgressBars();

    if (!isTouch) {
        initTilt();
        initMagneticButtons();
    }

    initRipple();
    initParallax();
    initScrollIndicator();
    initGlitch();
    initStatGlow();
    initLogoHover();
    initFooterSocial();
}
