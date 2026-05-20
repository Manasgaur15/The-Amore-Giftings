/* ═══════════════════════════════════════════════════════════
   THE AMORE GIFTINGS — INTERACTIVE EXPERIENCE
   Luxury animations, cursor, particles & modal engine
═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── UTILS ─── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/* ─── STATE ─── */
const state = {
  cursor: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  cursorTarget: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  cursorDot: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
  testiIndex: 0,
  testiTotal: 3,
  testiAuto: null,
  rafId: null
};

/* ═══ 1. PRELOADER ═══ */
function initPreloader() {
  const loader = $('#preloader');
  if (!loader) return;

  const onLoad = () => {
    setTimeout(() => {
      loader.classList.add('done');
      document.body.style.overflow = '';
      triggerHeroEntrance();
    }, 500);
  };

  document.body.style.overflow = 'hidden';

  if (document.readyState === 'complete') {
    setTimeout(onLoad, 600);
  } else {
    window.addEventListener('load', onLoad, { once: true });
    setTimeout(onLoad, 3000);
  }
}

/* ═══ 2. CUSTOM CURSOR ═══ */
function initCursor() {
  const cursor = $('#cursor');
  const dot = $('#cursorFollower');
  if (!cursor || !dot || window.matchMedia('(hover: none)').matches) return;

  document.addEventListener('mousemove', e => {
    state.cursorTarget.x = e.clientX;
    state.cursorTarget.y = e.clientY;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

  $$('a, button, [role="button"], .col-card, .feat-card, .testi-card, .magnetic').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });

  let cx = state.cursorTarget.x, cy = state.cursorTarget.y;
  let dx = cx, dy = cy;

  function animateCursor() {
    cx = lerp(cx, state.cursorTarget.x, 0.12);
    cy = lerp(cy, state.cursorTarget.y, 0.12);
    dx = lerp(dx, state.cursorTarget.x, 0.35);
    dy = lerp(dy, state.cursorTarget.y, 0.35);

    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    dot.style.left = dx + 'px';
    dot.style.top = dy + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

/* ═══ 3. SCROLL PROGRESS ═══ */
function initScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ═══ 4. NAVIGATION ═══ */
function initNav() {
  const nav = $('#nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = $(href);
      if (target) {
        e.preventDefault();
        const navH = nav.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ═══ 5. MOBILE MENU ═══ */
function toggleMobile() {
  const menu = $('#mobileMenu');
  if (!menu) return;
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = $('#mobileMenu');
  if (!menu) return;
  menu.classList.remove('open');
  document.body.style.overflow = '';
}

function initMobileMenu() {
  const hamburger = $('#hamburger');
  if (hamburger) hamburger.addEventListener('click', toggleMobile);

  const closeBtn = $('.mobile-close');
  if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);

  $$('.mobile-nav a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });

  const overlay = $('#mobileMenu');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeMobileMenu();
    });
  }
}

/* ═══ 6. HERO PARTICLES ═══ */
function initHeroParticles() {
  const container = $('#heroParticles');
  if (!container) return;

  const particleCount = window.innerWidth > 768 ? 50 : 25;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = 8 + Math.random() * 16;
    const delay = Math.random() * -20;
    const opacity = 0.1 + Math.random() * 0.4;

    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      left:${x}%;top:${y}%;
      background:rgba(212,175,55,${opacity});
      border-radius:50%;
      animation:particleDrift ${dur}s ${delay}s ease-in-out infinite alternate;
      pointer-events:none;
    `;
    container.appendChild(p);
  }

  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleDrift {
        from { transform: translate(0, 0) scale(1); opacity: 0.2; }
        to { transform: translate(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random()*40}px, ${Math.random() > 0.5 ? '' : '-'}${20 + Math.random()*40}px) scale(${0.5 + Math.random()*1.5}); opacity: 0.6; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ═══ 7. SCROLL REVEAL ANIMATIONS ═══ */
function initReveal() {
  const revealEls = $$('.reveal-up, .reveal-right, .reveal-left');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      el.style.transitionDelay = delay + 'ms';
      el.classList.add('active');
      observer.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ═══ 8. HERO ENTRANCE (fires after preloader) ═══ */
function triggerHeroEntrance() {
  const badge = $('.hero-badge');
  const heading = $('.hero-heading');
  const sub = $('.hero-sub');
  const actions = $('.hero-actions');
  const stats = $('.hero-stats');
  const visual = $('.hero-visual');

  const sequence = [
    { el: badge, delay: 0 },
    { el: heading, delay: 100 },
    { el: sub, delay: 240 },
    { el: actions, delay: 380 },
    { el: stats, delay: 520 },
    { el: visual, delay: 160 },
  ];

  sequence.forEach(({ el, delay }) => {
    if (!el) return;
    el.style.transitionDelay = delay + 'ms';
    setTimeout(() => {
      el.classList.add('active');
      el.style.transitionDelay = '';
    }, delay + 50);
  });
}

/* ═══ 9. COUNTER ANIMATION ═══ */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target)) return;

  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const steps = 60;
  const stepTime = duration / steps;
  let current = 0;
  let step = 0;

  const isLarge = target >= 1000;
  const display = () => {
    if (isLarge && current >= 1000) {
      return Math.floor(current / 1000) + 'K+';
    }
    return (target <= 10 ? current : current) + (target > 10 ? '+' : '');
  };

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    const eased = 1 - Math.pow(1 - progress, 3);
    current = Math.round(eased * target);

    el.textContent = display();

    if (step >= steps) {
      clearInterval(timer);
      el.textContent = isLarge ? Math.floor(target / 1000) + 'K+' : target + (target > 10 ? '+' : '');
    }
  }, stepTime);
}

function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ═══ 10. MAGNETIC BUTTONS ═══ */
function initMagnetic() {
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      setTimeout(() => { btn.style.transition = ''; }, 600);
    });
  });
}

/* ═══ 11. COLLECTION CARD TILT ═══ */
function initCardTilt() {
  $$('.col-card, .feat-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s, border-color 0.4s';
      setTimeout(() => { card.style.transition = ''; }, 600);
    });
  });
}

/* ═══ 12. MODAL ENGINE ═══ */
function openModal(name, category, type, sourceLink) {
  const overlay = $('#modal');
  const catEl = $('#modalCat');
  const nameEl = $('#modalName');
  const body = $('#modalBody');

  if (!overlay || !catEl || !nameEl || !body) return;

  catEl.textContent = category;
  nameEl.textContent = name;

  if (type === 'pdf') {
    body.innerHTML = `
      <iframe
        src="${sourceLink}#toolbar=0&navpanes=0"
        title="${name}"
        style="width:100%;height:75vh;border:none;display:block;"
      >
        <p style="color:#C2B89E;padding:32px;font-family:'Plus Jakarta Sans',sans-serif;">
          Your browser does not support PDFs inline.
          <a href="${sourceLink}" style="color:#D4AF37;" download>Download the PDF instead.</a>
        </p>
      </iframe>`;
  } else if (type === 'image') {
    body.innerHTML = `
      <img
        src="${sourceLink}"
        alt="${name}"
        style="width:100%;max-height:70vh;object-fit:contain;display:block;padding:20px;"
      />`;
  }

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = $('#modal');
  const body = $('#modalBody');
  if (!overlay) return;

  overlay.classList.remove('show');
  document.body.style.overflow = '';

  setTimeout(() => {
    if (body) body.innerHTML = '';
  }, 450);
}

function handleModalClick(e) {
  if (e.target === e.currentTarget) closeModal();
}

function initModal() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  $$('[data-modal]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const parts = el.dataset.modal.split('|');
      if (parts.length === 4) {
        openModal(parts[0], parts[1], parts[2], parts[3]);
      }
    });
  });
}

/* ═══ 13. SMOOTH SCROLL PARALLAX ═══ */
function initParallax() {
  const mainImg = $('.about-img-main');
  const accentImg = $('.about-img-accent');
  if (!mainImg || !accentImg) return;

  window.addEventListener('scroll', () => {
    const section = $('.about-section');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    const progress = -rect.top / (section.offsetHeight + window.innerHeight);

    mainImg.style.transform = `translateY(${progress * 40}px)`;
    accentImg.style.transform = `translateY(${progress * -30}px)`;
  }, { passive: true });
}

/* ═══ 14. TESTIMONIAL AUTO-REVEAL ═══ */
function initTestimonials() {
  const cards = $$('.testi-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.classList.add('active', 'reveal-up');
      }, idx * 150);
    });
  }, { threshold: 0.15 });

  cards.forEach(c => observer.observe(c));
}

/* ═══ 15. DROPDOWN ACCESSIBILITY ═══ */
function initDropdowns() {
  $$('.dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', e => {
      e.preventDefault();
    });
  });
}

/* ═══ 16. SECTION HEADER STAGGER ═══ */
function initSectionHeaders() {
  $$('.section-header').forEach(header => {
    const children = [...header.children];
    children.forEach((child, i) => {
      if (!child.classList.contains('reveal-up')) {
        child.classList.add('reveal-up');
        child.dataset.delay = String(i * 100);
      }
    });
  });
}

/* ═══ 17. FEAT CARD STAGGER ═══ */
function initFeatCards() {
  $$('.feat-card').forEach((card, i) => {
    if (!card.classList.contains('reveal-up')) {
      card.classList.add('reveal-up');
      card.dataset.delay = String(i * 100);
    }
  });
}

/* ═══ INIT ═══ */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initScrollProgress();
  initNav();
  initMobileMenu();
  initHeroParticles();
  initCounters();
  initMagnetic();
  initCardTilt();
  initModal();
  initParallax();
  initDropdowns();
  initReveal();
  initTestimonials();
});

/* Expose globals for inline HTML onclick */
window.openModal = openModal;
window.closeModal = closeModal;
window.handleModalClick = handleModalClick;
window.toggleMobile = toggleMobile;
