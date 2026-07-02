'use strict';

/* ══════════════════════════════════════════════
   CHARITY WORKS DATA — replace src with real photos
══════════════════════════════════════════════ */
const CHARITY_WORKS = [
  {
    src: "/assets/images/char.jpeg",
    category: "Outreach",
    cap: "Meals, clothing, and comfort are shared with families facing hardship — a tangible expression of Christ's love in action.",
    num: "Plate I"
  },
  {
    src: "/assets/images/char2.jpeg",
    category: "Healthcare",
    cap: "Medical missions bring healing and hope to villages where care is scarce, tending to both body and spirit.",
    num: "Plate II"
  },
  {
    src: "/assets/images/char3.jpeg",
    category: "Children & Education",
    cap: "Orphaned and vulnerable children are given shelter, schooling, and a future rooted in faith and family.",
    num: "Plate III"
  },
  {
    src: "/assets/images/char4.jpeg",
    category: "Women & Youth",
    cap: "Women and young people are equipped with skills and support, restoring dignity and opening doors to independence.",
    num: "Plate IV"
  }
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ══════════════════════════════════════════════
   PAGE VEIL
══════════════════════════════════════════════ */
window.addEventListener('load', () => {
  const veil = document.getElementById('pageVeil');
  setTimeout(() => {
    veil.classList.add('hidden');
    document.body.classList.remove('pre-load');
  }, 700);
});

/* ══════════════════════════════════════════════
   NAV SCROLL STATE
══════════════════════════════════════════════ */
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ══════════════════════════════════════════════
   EMBER CANVAS — pseudo-3D depth-parallax particles
══════════════════════════════════════════════ */
(function initEmbers() {
  const canvas = document.getElementById('emberCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let targetParallax = 0;
  let parallax = 0;
  if (canHover && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      targetParallax = (e.clientX / window.innerWidth - 0.5) * 2;
    }, { passive: true });
  }

  class Ember {
    constructor() { this.reset(true); }
    reset(initial) {
      this.depth = Math.random();          // 0 = far, 1 = near
      this.baseX = Math.random() * W;
      this.x = this.baseX;
      this.y = initial ? Math.random() * H : H + 20;
      this.r = 0.5 + this.depth * 2;
      this.vy = -(0.15 + this.depth * 0.5);
      this.alphaMax = 0.1 + this.depth * 0.32;
      this.alpha = 0;
      this.life = 0;
      this.maxLife = 240 + Math.random() * 260;
      this.sway = Math.random() * 0.02 + 0.008;
    }
    update() {
      this.life++;
      this.y += this.vy;
      this.baseX += Math.sin(this.life * this.sway) * 0.25;
      this.x = this.baseX + parallax * this.depth * 26;
      const t = this.life / this.maxLife;
      this.alpha = t < 0.15 ? (t / 0.15) * this.alphaMax
                 : t > 0.8  ? ((1 - t) / 0.2) * this.alphaMax
                 : this.alphaMax;
      if (this.life >= this.maxLife || this.y < -20) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(228,199,122,${this.alpha})`;
      ctx.fill();
    }
  }

  const embers = prefersReducedMotion ? [] : Array.from({ length: 70 }, () => new Ember());

  function tick() {
    parallax += (targetParallax - parallax) * 0.04;
    ctx.clearRect(0, 0, W, H);
    embers.forEach(e => { e.update(); e.draw(); });
    requestAnimationFrame(tick);
  }
  if (!prefersReducedMotion) tick();
})();

/* ══════════════════════════════════════════════
   GRIMOIRE BOOK — 3D open/close + mouse tilt
══════════════════════════════════════════════ */
(function initGrimoire() {
  const stage = document.querySelector('.grimoire-stage');
  const tilt = document.getElementById('bookTilt');
  const book = document.getElementById('grimoireBook');
  const cover = document.getElementById('bookCover');
  const page = document.querySelector('.book-page');
  const prompt = document.getElementById('bookPrompt');
  const promptText = document.getElementById('bookPromptText');
  if (!stage || !cover) return;

  let isOpen = false;

  function toggleBook() {
    isOpen = !isOpen;
    cover.classList.toggle('open', isOpen);
    page.classList.toggle('revealed', isOpen);
    promptText.textContent = isOpen ? 'Tap to Close the Book' : 'Tap the Cover to Open';
  }

  cover.addEventListener('click', () => { if (!isOpen) toggleBook(); });
  prompt.addEventListener('click', toggleBook);

  if (canHover && !prefersReducedMotion) {
    stage.addEventListener('mousemove', (e) => {
      const r = book.getBoundingClientRect();
      let px = (e.clientX - r.left) / r.width - 0.5;
      let py = (e.clientY - r.top) / r.height - 0.5;
      px = Math.max(-0.8, Math.min(0.8, px));
      py = Math.max(-0.8, Math.min(0.8, py));
      tilt.style.transform = `rotateX(${py * -10}deg) rotateY(${px * 14}deg)`;
    });
    stage.addEventListener('mouseleave', () => {
      tilt.style.transform = '';
    });
  }
})();

/* ══════════════════════════════════════════════
   WORKS PLATES — render + 3D tilt + reveal
══════════════════════════════════════════════ */
const platesGrid = document.getElementById('platesGrid');

function renderPlates() {
  platesGrid.innerHTML = '';

  CHARITY_WORKS.forEach((w, i) => {
    const fig = document.createElement('figure');
    fig.className = 'plate';
    fig.innerHTML = `
      <div class="plate-perspective">
        <div class="plate-inner" tabindex="0" role="button" aria-label="View ${w.category} plate in full" style="transition-delay:${i * 0.08}s">
          <div class="plate-frame">
            <img src="${w.src}" alt="${w.cap}" loading="lazy" />
            <div class="plate-sheen"></div>
            <div class="plate-overlay"><span class="plate-view-hint">View in Full</span></div>
          </div>
          <div class="plate-cap-area">
            <span class="plate-cat">${w.category}</span>
            <p class="plate-cap">${w.cap}</p>
            <span class="plate-num">${w.num}</span>
          </div>
        </div>
      </div>
    `;
    platesGrid.appendChild(fig);
  });

  const inners = platesGrid.querySelectorAll('.plate-inner');

  const plateObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        plateObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  inners.forEach(el => plateObs.observe(el));

  inners.forEach((inner, i) => {
    inner.addEventListener('click', () => openLightbox(i));
    inner.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(i); }
    });

    if (!canHover || prefersReducedMotion) return;

    inner.addEventListener('mouseenter', () => inner.classList.add('no-transition'));
    inner.addEventListener('mousemove', (e) => {
      const r = inner.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -14;
      const ry = (px - 0.5) * 16;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(14px)`;
      const sheen = inner.querySelector('.plate-sheen');
      if (sheen) sheen.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.4), transparent 55%)`;
    });
    inner.addEventListener('mouseleave', () => {
      inner.classList.remove('no-transition');
      inner.style.transform = '';
      const sheen = inner.querySelector('.plate-sheen');
      if (sheen) sheen.style.background = '';
    });
  });
}
renderPlates();

/* ══════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════ */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const lbTag = document.getElementById('lbTag');
const lbNum = document.getElementById('lbNum');
let currentLBIndex = 0;

function openLightbox(i) {
  currentLBIndex = i;
  const w = CHARITY_WORKS[i];
  lbImg.src = w.src;
  lbImg.alt = w.cap;
  lbCap.textContent = w.cap;
  lbTag.textContent = w.category;
  lbNum.textContent = w.num;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function navLB(dir) {
  currentLBIndex = (currentLBIndex + dir + CHARITY_WORKS.length) % CHARITY_WORKS.length;
  openLightbox(currentLBIndex);
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbOverlay').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => navLB(-1));
document.getElementById('lbNext').addEventListener('click', () => navLB(1));

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navLB(-1);
  if (e.key === 'ArrowRight') navLB(1);
});

let touchStartX = 0;
lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navLB(dx < 0 ? 1 : -1);
});

/* ══════════════════════════════════════════════
   SCROLL REVEAL (prologue + works header)
══════════════════════════════════════════════ */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ══════════════════════════════════════════════
   SCROLL CUE
══════════════════════════════════════════════ */
document.querySelector('.grimoire-scroll')?.addEventListener('click', () => {
  document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
});