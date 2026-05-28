<template>
  <div class="spiral-container" ref="containerRef">
    <canvas ref="canvasRef" class="spiral-canvas"></canvas>
    <transition name="fade">
      <div class="spiral-hint" v-if="isReady">scroll · drag</div>
    </transition>
    <div class="spiral-loading" v-if="!isReady">
      <span class="spiral-dot"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const containerRef = ref(null);
const canvasRef    = ref(null);
const isReady      = ref(false);

/* ──────────────────────────────────────────────
   Imágenes de Unsplash relacionadas con el negocio
   ────────────────────────────────────────────── */
const imageUrls = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
  'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&q=80',
  'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
  'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80',
  'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&q=80',
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
  'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
  'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&q=80',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
  'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80',
  'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
  'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&q=80',
];

const originalImageCount = imageUrls.length;
const spiralImageUrls = [
  ...imageUrls,
  ...imageUrls.slice(0, 12),
];
const N = spiralImageUrls.length;
const baseSpiralHeight = 11.0 + (originalImageCount - 21) * 0.16;
const expandedSpiralHeight = 11.0 + (N - 21) * 0.16;

const config = {
  imageHeight:   5.55,
  curvature:    -0.030,
  gapSize:       0,
  spiralRadius:  3.05,
  spiralTurns:   2.8 + (N - 21) * 0.1,
  spiralHeight:  expandedSpiralHeight,
  centerX:       5.95,
  centerY:       2.45 - (expandedSpiralHeight - baseSpiralHeight) / 2,
  centerZ:       0,
};

const inertia = {
  friction:            0.965,
  strength:            0.36,
  maxSpeed:            0.014,
  directionSmoothing:  0.96,
  scrollSensitivity:   0.00032,
};

let scene, camera, renderer, spiralMesh, tiltGroup, shaderMaterial;
let imageRatios     = [];
let origPositions   = [];
let scrollOffset    = 0;
let isDragging      = false;
let prevMouse       = { x: 0, y: 0 };
let dragRot         = { x: 0, z: 0 };
let baseRot         = { x: 0, z: 0 };
let targetVel       = 0;
let currentVel      = 0;
let inertiaAccel    = 0;
let animFrameId     = null;
let resizeObs       = null;
const cleanups      = [];

function ensureThree() {
  if (window.THREE) return Promise.resolve(window.THREE);
  return new Promise(res => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    s.onload = () => res(window.THREE);
    document.head.appendChild(s);
  });
}

function createMasterTexture(THREE) {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const ctx    = canvas.getContext('2d');
    const baseH  = 500;
    let loaded   = 0;
    const imgs   = [];

    spiralImageUrls.forEach((url, idx) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        imageRatios[idx] = ratio;
        imgs[idx] = { img, width: baseH * ratio, height: baseH };
        if (++loaded === N) buildTexture();
      };
      img.onerror = () => {
        imageRatios[idx] = 1.5;
        imgs[idx] = null;
        if (++loaded === N) buildTexture();
      };
      img.src = url;
    });

    function buildTexture() {
      const totalW = imgs.reduce((s, d) => s + (d ? d.width : baseH * 1.5), 0);
      canvas.width  = totalW;
      canvas.height = baseH;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, totalW, baseH);
      let ox = 0;
      imgs.forEach(d => {
        if (d) ctx.drawImage(d.img, ox, 0, d.width, d.height);
        ox += d ? d.width : baseH * 1.5;
      });
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS           = THREE.RepeatWrapping;
      tex.wrapT           = THREE.ClampToEdgeWrapping;
      tex.minFilter       = THREE.LinearFilter;
      tex.magFilter       = THREE.LinearFilter;
      tex.generateMipmaps = false;
      resolve(tex);
    }
  });
}

function rebuildGeometry(THREE) {
  if (!spiralMesh) return;
  const widths  = imageRatios.map(r => r * config.imageHeight);
  const totalW  = widths.reduce((a, b) => a + b, 0);
  const geo     = new THREE.PlaneGeometry(totalW, config.imageHeight, 200 + N * 20, 24);
  const positions = geo.attributes.position;
  const uvs       = geo.attributes.uv;

  const cum = [0];
  for (let i = 0; i < N; i++) cum.push(cum[i] + widths[i] / totalW);
  const imgRatio = 1 - config.gapSize;

  for (let i = 0; i < uvs.count; i++) {
    let u = Math.max(0, Math.min(0.999999, uvs.getX(i)));
    for (let j = 0; j < N; j++) {
      if (u >= cum[j] && u < cum[j + 1]) {
        let localU = (u - cum[j]) / (cum[j + 1] - cum[j]);
        if (localU > imgRatio) {
          uvs.setX(i, cum[j + 1] - 0.001);
        } else {
          let su = Math.max(0.001, Math.min(0.999, localU / imgRatio));
          uvs.setX(i, cum[j] + su * (cum[j + 1] - cum[j]));
        }
        break;
      }
    }
  }

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    let t   = Math.max(0, Math.min(1, (x + totalW / 2) / totalW));
    const angle  = t * Math.PI * 2 * config.spiralTurns;
    const radius = config.spiralRadius * (1 - t * 0.12);
    let px = Math.sin(angle) * radius;
    let pz = Math.cos(angle) * radius;
    let py = (t - 0.5) * config.spiralHeight + y * 0.35;

    if (!origPositions[i]) {
      origPositions[i] = {
        ox: (Math.random() - 0.5) * 0.001,
        oy: (Math.random() - 0.5) * 0.001,
        oz: (Math.random() - 0.5) * 0.001,
      };
    }
    positions.setXYZ(
      i,
      px + origPositions[i].ox,
      py + origPositions[i].oy,
      pz + origPositions[i].oz
    );
  }

  geo.computeVertexNormals();
  const old = spiralMesh.geometry;
  spiralMesh.geometry = geo;
  if (old) old.dispose();
  if (shaderMaterial) shaderMaterial.uniforms.gap.value = config.gapSize;
}

function updateUV() {
  if (!shaderMaterial) return;
  let o = scrollOffset % 1;
  if (o < 0) o += 1;
  shaderMaterial.uniforms.offset.value = o;
}

/* ── SCROLL UNIFICADO: escucha en window para no bloquear el scroll de página ── */
function setupGlobalScroll() {
  const onWheel = e => {
    // SIN e.preventDefault() → la página scrollea con normalidad
    const raw = e.deltaY * inertia.scrollSensitivity * inertia.strength;
    let da = Math.max(-0.03, Math.min(0.03, raw - inertiaAccel));
    inertiaAccel = Math.max(-0.03, Math.min(0.03, inertiaAccel + da));
    targetVel = Math.max(-inertia.maxSpeed, Math.min(inertia.maxSpeed,
      targetVel * inertia.directionSmoothing + inertiaAccel * (1 - inertia.directionSmoothing)
    ));
  };
  // passive: true → el browser puede scrollear sin esperar a nuestro handler
  window.addEventListener('wheel', onWheel, { passive: true });
  cleanups.push(() => window.removeEventListener('wheel', onWheel));

  // Integración con Lenis si está disponible
  const tryLenis = () => {
    if (window.lenis) {
      const onLenisScroll = ({ velocity }) => {
        if (Math.abs(velocity) > 0.005) {
          targetVel = Math.max(-inertia.maxSpeed, Math.min(inertia.maxSpeed, velocity * 0.0007));
        }
      };
      window.lenis.on('scroll', onLenisScroll);
      cleanups.push(() => window.lenis?.off?.('scroll', onLenisScroll));
    } else {
      // Reintentar hasta que Lenis esté listo
      setTimeout(tryLenis, 500);
    }
  };
  tryLenis();
}

function setupDrag(container) {
  container.style.cursor = 'grab';

  const onDown = e => {
    isDragging = true;
    prevMouse  = { x: e.clientX, y: e.clientY };
    container.style.cursor = 'grabbing';
    e.preventDefault();
  };
  const onMove = e => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    dragRot.z = Math.max(-0.35, Math.min(0.35, dragRot.z + dx * 0.002));
    dragRot.x = Math.max(-0.35, Math.min(0.35, dragRot.x - dy * 0.002));
    tiltGroup.rotation.x = baseRot.x + dragRot.x;
    tiltGroup.rotation.z = baseRot.z + dragRot.z;
    prevMouse = { x: e.clientX, y: e.clientY };
  };
  const onUp = () => { isDragging = false; container.style.cursor = 'grab'; };

  container.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  cleanups.push(() => {
    container.removeEventListener('mousedown', onDown);
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('mouseup', onUp);
  });
}

function setupTouch(container) {
  let touchLastY = 0, touchVel = 0, isTouching = false;

  const onTStart = e => {
    isTouching = true;
    touchLastY = e.touches[0].clientY;
    touchVel   = 0;
  };
  const onTMove = e => {
    if (!isTouching) return;
    const dy   = e.touches[0].clientY - touchLastY;
    const raw  = dy * inertia.scrollSensitivity * inertia.strength * 0.8;
    touchVel   = touchVel * 0.7 + raw * 0.3;
    scrollOffset += raw;
    updateUV();
    touchLastY = e.touches[0].clientY;
  };
  const onTEnd = () => {
    isTouching = false;
    if (Math.abs(touchVel) > 0.001) {
      targetVel = Math.max(-inertia.maxSpeed * 1.5, Math.min(inertia.maxSpeed * 1.5, touchVel * 1.2));
    }
    touchVel = 0;
  };

  container.addEventListener('touchstart', onTStart, { passive: true });
  container.addEventListener('touchmove',  onTMove,  { passive: true });
  container.addEventListener('touchend',   onTEnd,   { passive: true });

  cleanups.push(() => {
    container.removeEventListener('touchstart', onTStart);
    container.removeEventListener('touchmove',  onTMove);
    container.removeEventListener('touchend',   onTEnd);
  });
}

function animate() {
  animFrameId = requestAnimationFrame(animate);

  targetVel    *= inertia.friction;
  currentVel    = currentVel * 0.85 + targetVel * 0.15;
  inertiaAccel *= 0.85;

  if (Math.abs(currentVel) > 0.00005) {
    scrollOffset += currentVel;
    updateUV();
  } else {
    currentVel = 0;
    targetVel  = 0;
  }

  renderer.render(scene, camera);
}

async function init() {
  const THREE     = await ensureThree();
  const container = containerRef.value;
  const canvas    = canvasRef.value;
  if (!container || !canvas) return;

  const W = container.clientWidth;
  const H = container.clientHeight;

  scene = new THREE.Scene();
  // SIN scene.background → canvas transparente, el fondo CSS de la página se ve

  camera = new THREE.PerspectiveCamera(44, W / H, 0.1, 1000);
  camera.position.set(0, 1.75, 13.75);

  // alpha: true → canvas WebGL transparente para no diferir del fondo de la web
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const sun = new THREE.DirectionalLight(0xffffff, 0.9);
  sun.position.set(5, 8, 5);
  scene.add(sun);

  tiltGroup   = new THREE.Group();
  baseRot     = { x: -0.12, z: 0.08 };
  tiltGroup.rotation.x = baseRot.x;
  tiltGroup.rotation.z = baseRot.z;
  scene.add(tiltGroup);

  const texture = await createMasterTexture(THREE);

  shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      map:    { value: texture },
      gap:    { value: config.gapSize },
      offset: { value: 0.0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float gap;
      uniform float offset;
      varying vec2 vUv;
      void main() {
        float u = vUv.x + offset;
        if (u >= 1.0) u -= 1.0;
        if (u < 0.0)  u += 1.0;
        gl_FragColor = texture2D(map, vec2(u, vUv.y));
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  spiralMesh = new THREE.Mesh(new THREE.BufferGeometry(), shaderMaterial);
  spiralMesh.position.set(config.centerX, config.centerY, config.centerZ);
  spiralMesh.rotation.x = 0.28;
  tiltGroup.add(spiralMesh);

  rebuildGeometry(THREE);

  setupGlobalScroll();
  setupDrag(container);
  setupTouch(container);

  resizeObs = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  resizeObs.observe(container);

  animate();
  isReady.value = true;
}

function cleanup() {
  if (animFrameId) cancelAnimationFrame(animFrameId);
  if (resizeObs)   resizeObs.disconnect();
  cleanups.forEach(fn => fn());
  cleanups.length = 0;
  if (renderer)       renderer.dispose();
  if (shaderMaterial) shaderMaterial.dispose();
  origPositions = [];
  imageRatios   = [];
  scrollOffset  = 0;
  targetVel     = 0;
  currentVel    = 0;
  inertiaAccel  = 0;
}

onMounted(init);
onBeforeUnmount(cleanup);
</script>

<style scoped>
.spiral-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.spiral-canvas {
  display: block;
  width: 100%;
  height: 100%;
  outline: none;
}

.spiral-hint {
  display: none;
}

.spiral-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spiral-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent, #00c8d7);
  animation: spiralPulse 1.2s ease-in-out infinite;
}

@keyframes spiralPulse {
  0%, 100% { transform: scale(1);   opacity: 0.5; }
  50%       { transform: scale(1.8); opacity: 1; }
}

.fade-enter-active { transition: opacity 0.6s ease; }
.fade-enter-from   { opacity: 0; }
</style>
