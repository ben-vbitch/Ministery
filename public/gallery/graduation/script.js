'use strict';

/* ══════════════════════════════════════════════
   WORKS DATA — replace src with actual images
══════════════════════════════════════════════ */
const WORKS = [
  {
    src: "/assets/images/gd1.jpeg",
    cap: "Graduates gather in celebration after successfully completing their ministry and leadership training through Living Christ Global Outreach in Uganda.",
    num: "Plate I",
    chapter: "graduation",
    featured: true
  },
  {
    src: "/assets/images/gd2.jpeg",
    cap: "Certificate presentation honoring students for their dedication, faithfulness, and academic achievement during the graduation ceremony.",
    num: "Plate II",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd3.jpeg",
    cap: "Graduates proudly receive their certificates before family members, church leaders, and ministry partners.",
    num: "Plate III",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd4.jpeg",
    cap: "A joyful procession of graduates marks the beginning of a memorable graduation celebration in Uganda.",
    num: "Plate IV",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd5.jpeg",
    cap: "Prayer and commissioning over graduates, dedicating them to serve Christ with wisdom, humility, and compassion.",
    num: "Plate V",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd6.jpeg",
    cap: "Church leaders and instructors congratulate graduates for successfully completing their biblical and leadership formation.",
    num: "Plate VI",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd7.jpeg",
    cap: "A featured moment as graduates celebrate together, reflecting the fruit of months of study, prayer, and perseverance.",
    num: "Plate VII",
    chapter: "graduation",
    featured: true
  },
  {
    src: "/assets/images/gd8.jpeg",
    cap: "Graduates pose together for a commemorative photograph, celebrating unity, faith, and shared accomplishment.",
    num: "Plate VIII",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd9.jpeg",
    cap: "Special recognition is given to outstanding graduates who demonstrated excellence in ministry training and leadership development.",
    num: "Plate IX",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd10.jpeg",
    cap: "Parents, guardians, and church members join in celebrating the remarkable achievements of the graduating class.",
    num: "Plate X",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd11.jpeg",
    cap: "The graduating class stands united, ready to carry the Gospel and serve communities across Uganda and beyond.",
    num: "Plate XI",
    chapter: "graduation"
  },
  {
    src: "/assets/images/gd12.jpeg",
    cap: "The ceremony concludes with thanksgiving, worship, and a group celebration, marking the beginning of a new chapter of ministry.",
    num: "Plate XII",
    chapter: "graduation"
  },
  {
  src: "/assets/images/gd13.jpeg",
  cap: "Graduates joyfully celebrate together after receiving their certificates, marking the successful completion of their ministry and leadership training.",
  num: "Plate XIII",
  chapter: "graduation"
},
{
  src: "/assets/images/gd14.jpeg",
  cap: "A special moment of appreciation as church leaders congratulate graduates for their commitment, perseverance, and spiritual growth.",
  num: "Plate XIV",
  chapter: "graduation"
},
{
  src: "/assets/images/gd15.jpeg",
  cap: "The graduating class stands united in faith, reflecting the vision of Living Christ Global Outreach to equip servant leaders for the Kingdom.",
  num: "Plate XV",
  chapter: "graduation"
},
{
  src: "/assets/images/gd16.jpeg",
  cap: "Guests, families, and ministry partners gather to witness a memorable day of achievement and thanksgiving during the graduation ceremony.",
  num: "Plate XVI",
  chapter: "graduation"
},
{
  src: "/assets/images/gd17.jpeg",
  cap: "An inspiring address encourages graduates to carry the Gospel with boldness, integrity, and compassion into their communities.",
  num: "Plate XVII",
  chapter: "graduation"
},
{
  src: "/assets/images/gd18.jpeg",
  cap: "Graduates proudly display their certificates, celebrating months of dedication, learning, and faithful service through the ministry.",
  num: "Plate XVIII",
  chapter: "graduation"
},
{
  src: "/assets/images/gd19.jpeg",
  cap: "A joyful atmosphere fills the venue as worship, thanksgiving, and celebration accompany the graduation ceremony in Uganda.",
  num: "Plate XIX",
  chapter: "graduation"
},
{
  src: "/assets/images/gd20.jpeg",
  cap: "Church leaders commission the graduating class with prayers and blessings as they prepare for future ministry and leadership opportunities.",
  num: "Plate XX",
  chapter: "graduation"
},
{
  src: "/assets/images/gd21.jpeg",
  cap: "Every graduate represents a testimony of faith, perseverance, and transformation through Living Christ Global Outreach's training programs.",
  num: "Plate XXI",
  chapter: "graduation"
},
{
  src: "/assets/images/gd22.jpeg",
  cap: "The graduation ceremony concludes with a memorable group photograph, celebrating a new generation of leaders ready to impact Uganda and beyond.",
  num: "Plate XXII",
  chapter: "graduation",
  featured: true
}
];

const CHAPTER_LABELS = {
  all: {
    eyebrow: "Living Christ Global Outreach",
    title: "Graduation Ceremony • Uganda"
  },
  graduation: {
    eyebrow: "Chapter I",
    title: "Graduation Procession"
  },
  certificates: {
    eyebrow: "Chapter II",
    title: "Certificate Presentation"
  },
  celebration: {
    eyebrow: "Chapter III",
    title: "Celebration & Recognition"
  },
  leaders: {
    eyebrow: "Chapter IV",
    title: "Church Leaders & Guests"
  },
  memories: {
    eyebrow: "Chapter V",
    title: "Memorable Moments"
  }
};

/* ══════════════════════════════════════════════
   PAGE LOADER
══════════════════════════════════════════════ */
window.addEventListener('load', () => {
  const loader = document.getElementById('folioLoader');
  setTimeout(() => loader.classList.add('out'), 1400);
});

/* ══════════════════════════════════════════════
   NAVBAR SCROLL
══════════════════════════════════════════════ */
const nav = document.getElementById('siteNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ══════════════════════════════════════════════
   CANDLE / PARTICLE CANVAS
   Warm flickering light particles drifting upward
══════════════════════════════════════════════ */
(function initCandles() {
  const canvas = document.getElementById('candleCanvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Mote {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x     = Math.random() * W;
      this.y     = initial ? Math.random() * H : H + 10;
      this.r     = Math.random() * 2.2 + 0.4;
      this.vy    = -(Math.random() * 0.6 + 0.25);
      this.vx    = (Math.random() - 0.5) * 0.4;
      this.alpha = 0;
      this.maxA  = Math.random() * 0.35 + 0.08;
      this.life  = 0;
      this.maxL  = Math.random() * 220 + 100;
      this.warm  = Math.random() > 0.5;
    }
    update() {
      this.life++;
      this.x += this.vx + Math.sin(this.life * 0.04) * 0.3;
      this.y += this.vy;
      const t = this.life / this.maxL;
      this.alpha = t < 0.2 ? (t / 0.2) * this.maxA
                 : t > 0.75 ? ((1 - t) / 0.25) * this.maxA
                 : this.maxA;
      if (this.life >= this.maxL) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.warm
        ? `rgba(228,199,122,${this.alpha})`
        : `rgba(201,162,75,${this.alpha})`;
      ctx.fill();
    }
  }

  const motes = Array.from({ length: 90 }, () => new Mote());

  function tick() {
    ctx.clearRect(0, 0, W, H);
    motes.forEach(m => { m.update(); m.draw(); });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ══════════════════════════════════════════════
   DUST MOTES (DOM-based small golden specks)
══════════════════════════════════════════════ */
(function initDust() {
  const wrap = document.getElementById('dustWrap');
  for (let i = 0; i < 28; i++) {
    const d = document.createElement('div');
    d.className = 'dust-mote';
    d.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: ${Math.random() * 40}%;
      --dur: ${(Math.random() * 14 + 10).toFixed(1)}s;
      --delay: ${(Math.random() * 10).toFixed(1)}s;
      --drift: ${(Math.random() * 40 - 20).toFixed(0)}px;
      --peak: ${(Math.random() * 0.35 + 0.1).toFixed(2)};
    `;
    wrap.appendChild(d);
  }
})();

/* ══════════════════════════════════════════════
   3D TILT on hero rose
══════════════════════════════════════════════ */
(function init3DTilt() {
  const rose = document.getElementById('roseWrap');
  if (!rose) return;
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    rose.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg)`;
  });
  rose.style.transition = 'transform 0.15s ease';
})();

/* ══════════════════════════════════════════════
   GALLERY RENDER + FILTER
══════════════════════════════════════════════ */
let currentFilter = 'all';
let filteredWorks = [...WORKS];
let currentLBIndex = 0;

function renderGrid(works) {
  const grid = document.getElementById('worksGrid');
  grid.innerHTML = '';

  if (!works.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-plate';
    empty.textContent = 'No works recorded in this chapter yet — return soon.';
    grid.appendChild(empty);
    return;
  }

  const catLabel = {
    spiritual: 'Spiritual', education: 'Education',
    healthcare: 'Healthcare', outreach: 'Outreach', women: 'Women & Youth'
  };

  works.forEach((w, i) => {
    const fig = document.createElement('figure');
    fig.className = 'plate' + (w.featured ? ' featured' : '');
    fig.style.transitionDelay = (i * 0.06) + 's';
    fig.dataset.index = i;
    fig.innerHTML = `
      <div class="plate-frame">
        <img src="${w.src}" alt="${w.cap}" loading="lazy" />
        <div class="plate-overlay">
          <span class="plate-view-hint">View in Full</span>
        </div>
      </div>
      <div class="plate-cap-area">
        <span class="plate-cat">${catLabel[w.chapter] || w.chapter}</span>
        <p class="plate-cap">${w.cap}</p>
        <span class="plate-num">${w.num}</span>
      </div>
    `;
    fig.addEventListener('click', () => openLightbox(i));
    grid.appendChild(fig);
  });

  /* Trigger stagger reveal via IntersectionObserver */
  setTimeout(() => {
    const plates = grid.querySelectorAll('.plate');
    const plateObs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
    }, { threshold: 0.08 });
    plates.forEach(p => plateObs.observe(p));
  }, 60);
}

function applyFilter(chapter) {
  currentFilter = chapter;
  filteredWorks = chapter === 'all' ? [...WORKS] : WORKS.filter(w => w.chapter === chapter);
  const labels = CHAPTER_LABELS[chapter] || CHAPTER_LABELS.all;
  document.getElementById('chapterEyebrow').textContent = labels.eyebrow;
  document.getElementById('chapterTitle').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('chapterTitle').textContent = labels.title;
    document.getElementById('chapterTitle').style.opacity = '1';
  }, 200);
  renderGrid(filteredWorks);
}

/* Chapter tab clicks */
document.getElementById('chapterTabs').addEventListener('click', (e) => {
  const btn = e.target.closest('.ctab');
  if (!btn) return;
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyFilter(btn.dataset.chapter);
  document.getElementById('worksSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* Initial render */
renderGrid(WORKS);

/* ══════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════ */
const lb    = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const lbTag = document.getElementById('lbTag');
const lbNum = document.getElementById('lbNum');

const catLabel = {
  spiritual: 'Spiritual', education: 'Education',
  healthcare: 'Healthcare', outreach: 'Outreach', women: 'Women & Youth'
};

function openLightbox(i) {
  currentLBIndex = i;
  const w = filteredWorks[i];
  lbImg.src = w.src;
  lbImg.alt = w.cap;
  lbCap.textContent = w.cap;
  lbTag.textContent = catLabel[w.chapter] || w.chapter;
  lbNum.textContent = w.num;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

function navLB(dir) {
  currentLBIndex = (currentLBIndex + dir + filteredWorks.length) % filteredWorks.length;
  openLightbox(currentLBIndex);
}

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbOverlay').addEventListener('click', closeLightbox);
document.getElementById('lbPrev').addEventListener('click', () => navLB(-1));
document.getElementById('lbNext').addEventListener('click', () => navLB(1));

document.addEventListener('keydown', (e) => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   navLB(-1);
  if (e.key === 'ArrowRight')  navLB(1);
});

/* Swipe support */
let touchStartX = 0;
lb.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navLB(dx < 0 ? 1 : -1);
});

/* ══════════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let cur = 0;
  const step = target / 100;
  const interval = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = Math.floor(cur);
    if (cur >= target) { el.textContent = target; clearInterval(interval); }
  }, 14);
}

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

/* ══════════════════════════════════════════════
   REVEAL ON SCROLL
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
   HERO CTA SMOOTH SCROLL
══════════════════════════════════════════════ */
document.querySelector('.hero-cta')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('chapters')?.scrollIntoView({ behavior: 'smooth' });
});

/* ══════════════════════════════════════════════
   TOAST HELPER
══════════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3800);
}

/* ══════════════════════════════════════════════
   3D PARALLAX on stat plates via mouse
══════════════════════════════════════════════ */
document.querySelectorAll('.stat-plate').forEach(plate => {
  plate.addEventListener('mousemove', (e) => {
    const rect = plate.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    plate.style.transform = `translateY(-5px) rotateY(${dx * 6}deg) rotateX(${-dy * 5}deg)`;
  });
  plate.addEventListener('mouseleave', () => {
    plate.style.transform = '';
  });
});

/* ══════════════════════════════════════════════
   MANUSCRIPT SECTION — fade in drop cap on scroll
══════════════════════════════════════════════ */
const msObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

const msInner = document.querySelector('.ms-inner');
if (msInner) {
  msInner.style.opacity = '0';
  msInner.style.transform = 'translateY(28px)';
  msInner.style.transition = 'opacity 1.1s ease, transform 1.1s ease';
  msObs.observe(msInner);
}