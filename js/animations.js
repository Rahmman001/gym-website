/**
 * Leo's Gym — animations.js
 * Motion.dev v11 (UMD global = window.Motion)
 * 
 * Built with Motion Design Principles:
 * - Three Pillars: Emotional Intent (Confident, Energetic), Visual Narrative, Motion Craft.
 * - Three Layers: Primary (main action), Secondary (shadows/text), Ambient (background life).
 * - Personality: Premium (elegant entrances) + Playful/Energetic (snappy interactions).
 */

(function () {
  'use strict';

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof window.Motion === 'undefined') {
    console.warn('[animations.js] Motion.dev not loaded — animations skipped, using fallback.');
    document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
    return;
  }

  const { animate, scroll, inView, stagger } = window.Motion;

  /* ── Easing & Motion Personalities ───────────────────────────── */
  // Premium (0% overshoot, elegant, for structural entrances)
  const PREMIUM_ENTRANCE = [0.4, 0, 0.2, 1];
  
  // MD3 Emphasized (Attention-grabbing entrances)
  const HERO_EASE = [0.05, 0.7, 0.1, 1];
  
  // Playful (Bouncy, for interactive feedback)
  const SPRING_PLAYFUL = { type: 'spring', stiffness: 350, damping: 25, mass: 1 };
  const SPRING_SETTLE  = { type: 'spring', stiffness: 200, damping: 24, mass: 1 };

  /* ── Helpers ─────────────────────────────────────────────────── */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ════════════════════════════════════════════════════════════════
     1. HERO ENTRANCE — Dramatic build (Choreography: Hero Lead)
  ════════════════════════════════════════════════════════════════ */
  function heroEntrance() {
    if (REDUCED) return;

    const h1   = $('.hero-h1');
    const eye  = $('.hero-eye');
    const img  = $('.hero-img');
    const ov   = $('.hero-ov');
    const cap  = $('.hero-cap');
    const play = $('.hero-play');

    // 1. Primary: Hero Text (Hero leads the scene)
    if (h1) animate(h1, { opacity: [0, 1], y: [60, 0] }, { duration: 0.8, easing: HERO_EASE, delay: 0.1 });
    
    // 2. Secondary: Eyebrow (Counter-motion/subtle support)
    if (eye) animate(eye, { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, easing: PREMIUM_ENTRANCE, delay: 0.3 });
    
    // 3. Primary/Secondary: Image expands (Depth feel)
    if (img) animate(img, { opacity: [0, 1], scale: [0.94, 1] }, { duration: 1.0, easing: PREMIUM_ENTRANCE, delay: 0.4 });
    
    // 4. Secondary: Overlay text & Details
    if (ov)  animate(ov,  { opacity: [0, 1], y: [-20, 0] }, { duration: 0.7, easing: PREMIUM_ENTRANCE, delay: 0.7 });
    if (cap) animate(cap, { opacity: [0, 1] }, { duration: 0.6, easing: PREMIUM_ENTRANCE, delay: 0.9 });
    if (play) animate(play, { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.6, easing: SPRING_PLAYFUL, delay: 1.0 });

    // 5. Ambient: Very slow, continuous scale on the hero image for 'life'
    if (img) {
      setTimeout(() => {
        animate(img, { scale: [1, 1.03, 1] }, { duration: 25, repeat: Infinity, easing: 'linear' });
      }, 1500);
    }
  }

  /* ════════════════════════════════════════════════════════════════
     2. NAV ENTRANCE — Premium Corporate (Clean, professional)
  ════════════════════════════════════════════════════════════════ */
  function navEntrance() {
    if (REDUCED) return;
    const logo  = $('.logo');
    const links = $$('.nav-links a');
    const btn   = $('.nav-cta-d');
    
    if (logo) animate(logo, { opacity: [0, 1], x: [-15, 0] }, { duration: 0.6, easing: PREMIUM_ENTRANCE });
    if (links.length) animate(links, { opacity: [0, 1], y: [-10, 0] }, { duration: 0.5, easing: PREMIUM_ENTRANCE, delay: stagger(0.05, { start: 0.15 }) });
    if (btn) animate(btn, { opacity: [0, 1] }, { duration: 0.5, easing: PREMIUM_ENTRANCE, delay: 0.4 });
  }

  /* ════════════════════════════════════════════════════════════════
     3. STATS COUNTER — Primary (Opacity) + Secondary (Number scale)
  ════════════════════════════════════════════════════════════════ */
  function statsCounter() {
    const wrap = $('.stats-inner');
    if (!wrap) return;

    const defs = [
      { idx: 0, target: 2400, fmt: n => n.toLocaleString() + '+' },
      { idx: 1, target: 18,   fmt: n => String(n) },
      { idx: 2, target: 12,   fmt: n => String(n) },
    ];

    inView(wrap, () => {
      if (!REDUCED) {
        animate(wrap, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, easing: PREMIUM_ENTRANCE });
      }
      defs.forEach(({ idx, target, fmt }) => {
        const el = $$('.stat-num')[idx];
        if (!el) return;
        const hiEl = el.querySelector('.hi');
        const hiHTML = hiEl ? hiEl.outerHTML : '';
        if (REDUCED) { el.innerHTML = fmt(target) + hiHTML; return; }
        
        animate(0, target, {
          duration: target > 100 ? 1.6 : 1.2, // Duration scaled by complexity
          easing: [0.4, 0, 0.2, 1],
          onUpdate(v) {
            el.innerHTML = fmt(Math.round(v)) + hiHTML;
          },
        });
      });
    }, { amount: 0.5 });
  }

  /* ════════════════════════════════════════════════════════════════
     4. PARALLAX — 3D Feel & Depth
  ════════════════════════════════════════════════════════════════ */
  function ambientParallax() {
    if (REDUCED) return;
    const ov  = $('.hero-ov');
    const img = $('.hero-img');
    if (!ov || !img) return;
    scroll(animate(ov, { y: [0, -100] }), {
      target: img, offset: ['start start', 'end start'],
    });
  }

  /* ════════════════════════════════════════════════════════════════
     5. SECTION REVEALS — 1/3 Rule & Choreography
  ════════════════════════════════════════════════════════════════ */
  function sectionReveals() {
    if (REDUCED) return;

    /* Mission */
    const misH = $('#mission .mis-h');
    if (misH) inView(misH, () => {
      animate(misH, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, easing: PREMIUM_ENTRANCE });
      const p = $('#mission .mis-p');
      const b = $('#mis-join');
      if (p) animate(p, { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, easing: PREMIUM_ENTRANCE, delay: 0.15 });
      if (b) animate(b, { opacity: [0, 1], y: [15, 0] }, { duration: 0.6, easing: PREMIUM_ENTRANCE, delay: 0.3 });
    }, { amount: 0.4 });

    /* Training cards - 1/3 Rule Element Stagger (max 400ms total stagger delay) */
    const tCards = $$('.tc');
    if (tCards.length) inView('#trainings', () => {
      // Primary: Card moves up
      animate(tCards, { opacity: [0, 1], y: [50, 0] }, { duration: 0.7, easing: PREMIUM_ENTRANCE, delay: stagger(0.1) });
    }, { amount: 0.15 });

    /* Membership tiers */
    const tiers = $$('.tier');
    if (tiers.length) inView('#club', () => {
      animate(tiers, { opacity: [0, 1], x: [-20, 0] }, { duration: 0.6, easing: PREMIUM_ENTRANCE, delay: stagger(0.1) });
    }, { amount: 0.2 });

    /* Coaches */
    const coaches = $$('.coach-card');
    if (coaches.length) inView('#coaches', () => {
      animate(coaches, { opacity: [0, 1], y: [30, 0] }, { duration: 0.7, easing: PREMIUM_ENTRANCE, delay: stagger(0.12) });
    }, { amount: 0.15 });

    /* Dark/closing headline - Dramatic Reveal */
    const clsH = $('.cls-h');
    if (clsH) inView(clsH, () => {
      animate(clsH, { opacity: [0, 1], scale: [0.95, 1], y: [30, 0] }, { duration: 1.0, easing: HERO_EASE });
      const p = $('.cls-p');
      const b = $('#dark-join');
      if (p) animate(p, { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, easing: PREMIUM_ENTRANCE, delay: 0.2 });
      if (b) animate(b, { opacity: [0, 1], y: [15, 0] }, { duration: 0.6,  easing: PREMIUM_ENTRANCE, delay: 0.4 });
    }, { amount: 0.35 });

    /* Testimonials — Slide from right */
    const tTest = $$('.t-card');
    if (tTest.length) inView('#testimonials', () => {
      animate(tTest, { opacity: [0, 1], x: [30, 0] }, { duration: 0.7, easing: PREMIUM_ENTRANCE, delay: stagger(0.08) });
    }, { amount: 0.15 });

    /* JOIN section */
    const joinH = $('.join-h');
    if (joinH) inView('#join', () => {
      animate(joinH, { opacity: [0, 1], y: [30, 0] }, { duration: 0.8, easing: PREMIUM_ENTRANCE });
      const p = $('.join-p');
      const b = $('#join-open-btn');
      if (p) animate(p, { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, easing: PREMIUM_ENTRANCE, delay: 0.15 });
      if (b) animate(b, { opacity: [0, 1], scale: [0.95, 1] }, { duration: 0.6, easing: PREMIUM_ENTRANCE, delay: 0.3 });
    }, { amount: 0.4 });

    /* Contacts — Counter-motion (split from sides) */
    const cInfo = $('.contacts-info');
    const cMap  = $('.map-box');
    if (cInfo) inView('#contacts', () => {
      if (cInfo) animate(cInfo, { opacity: [0, 1], x: [-30, 0] }, { duration: 0.8, easing: PREMIUM_ENTRANCE });
      if (cMap)  animate(cMap,  { opacity: [0, 1], x: [30,  0] }, { duration: 0.8, easing: PREMIUM_ENTRANCE, delay: 0.1 });
    }, { amount: 0.25 });

    /* Divider */
    const div = $('.divider');
    if (div) inView(div, () => {
      animate(div, { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.7, easing: PREMIUM_ENTRANCE });
    }, { amount: 0.8 });
  }

  /* ════════════════════════════════════════════════════════════════
     6. PLAYFUL INTERACTIONS — Hover, Press, Release (Disney Principles)
  ════════════════════════════════════════════════════════════════ */
  function playfulInteractions() {
    if (REDUCED) return;

    // Hover logic (Anticipation & Follow Through)
    const addInteraction = (els, hoverProps, pressProps) =>
      els.forEach(el => {
        let anim;
        // Hover Enter
        el.addEventListener('mouseenter', () => { 
          anim?.stop(); 
          anim = animate(el, hoverProps, SPRING_PLAYFUL); 
        });
        // Hover Leave
        el.addEventListener('mouseleave', () => { 
          anim?.stop(); 
          anim = animate(el, { y: 0, scale: 1 }, SPRING_SETTLE); 
        });
        // Press (Anticipation / Squash)
        if (pressProps) {
          el.addEventListener('mousedown', () => {
            anim?.stop();
            anim = animate(el, pressProps, { duration: 0.1, easing: 'ease-out' });
          });
          el.addEventListener('mouseup', () => {
            anim?.stop();
            anim = animate(el, hoverProps, SPRING_PLAYFUL); // pop back to hover state
          });
        }
      });

    // Cards get a slight lift
    addInteraction($$('.coach-card'), { y: -8, scale: 1.015 });
    addInteraction($$('.t-card'), { y: -6, scale: 1.02 });
    
    // Buttons get hover lift AND press squash
    addInteraction(
      $$('.btn--accent'), 
      { scale: 1.04 }, // Hover
      { scale: 0.96 }  // Press squash
    );
  }

  /* ════════════════════════════════════════════════════════════════
     7. AMBIENT CONTINUOUS — Background life
  ════════════════════════════════════════════════════════════════ */
  function ambientContinuous() {
    if (REDUCED) return;
    const btn = $('.play-c');
    if (btn) {
      // Primary ambient: Gentle breathe
      animate(btn, { scale: [1, 1.06, 1] }, { duration: 3.5, repeat: Infinity, easing: 'ease-in-out', delay: 1.5 });
      
      let h;
      btn.addEventListener('mouseenter', () => { h?.stop(); h = animate(btn, { scale: 1.15 }, SPRING_PLAYFUL); });
      btn.addEventListener('mouseleave', () => { h?.stop(); h = animate(btn, { scale: 1 }, SPRING_SETTLE); });
    }
  }

  /* ════════════════════════════════════════════════════════════════
     8. SCROLL PROGRESS BAR — Ambient connection to scroll
  ════════════════════════════════════════════════════════════════ */
  function scrollProgressBar() {
    if (REDUCED) return;
    const bar = document.createElement('div');
    bar.setAttribute('aria-hidden', 'true');
    Object.assign(bar.style, {
      position: 'fixed', top: '0', left: '0',
      width: '0%', height: '3px',
      background: 'var(--accent)',
      zIndex: '9999', pointerEvents: 'none',
      transformOrigin: 'left',
    });
    document.body.appendChild(bar);
    scroll(p => { bar.style.width = (p * 100) + '%'; });
  }

  /* ════════════════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════════════════ */
  function init() {
    navEntrance();
    heroEntrance();
    ambientParallax();
    statsCounter();
    sectionReveals();
    playfulInteractions();
    ambientContinuous();
    scrollProgressBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
