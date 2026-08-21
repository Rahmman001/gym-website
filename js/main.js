/**
 * Leo's Gym — main.js
 * Handles: header scroll, active nav, hamburger menu,
 *          join modal, video modal, accordion tiers,
 *          scroll reveal, keyboard accessibility.
 */

'use strict';

/* ── Utility ─────────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

/* ── Escape key global ───────────────────────────────────────── */
on(document, 'keydown', e => {
  if (e.key === 'Escape') { closeJoinModal(); setMobNav(false); }
});

/* ══════════════════════════════════════════════════════════════
   HEADER — shadow on scroll
══════════════════════════════════════════════════════════════ */
const hdr = $('hdr');
on(window, 'scroll', () => {
  hdr.classList.toggle('up', window.scrollY > 12);
}, { passive: true });

/* ══════════════════════════════════════════════════════════════
   ACTIVE NAV — highlight link for visible section
══════════════════════════════════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-links a[data-nav]');
const trackedSections = [...navLinks]
  .map(a => document.getElementById(a.dataset.nav))
  .filter(Boolean);

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.nav === entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

trackedSections.forEach(s => navObserver.observe(s));

/* ══════════════════════════════════════════════════════════════
   HAMBURGER / MOBILE NAV
══════════════════════════════════════════════════════════════ */
const hamBtn = $('ham-btn');
const mobNav = $('mob-nav');

function setMobNav(open) {
  hamBtn.classList.toggle('open', open);
  mobNav.classList.toggle('open', open);
  hamBtn.setAttribute('aria-expanded', String(open));
  mobNav.setAttribute('aria-hidden', String(!open));
}

on(hamBtn, 'click', () => {
  setMobNav(hamBtn.getAttribute('aria-expanded') !== 'true');
});

// Close on any link click inside drawer
mobNav.querySelectorAll('a').forEach(link => on(link, 'click', () => setMobNav(false)));

// Focus trap inside mobile drawer
on(mobNav, 'keydown', e => {
  if (e.key !== 'Tab') return;
  const focusable = [...mobNav.querySelectorAll('a, button, [tabindex="0"]')];
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ══════════════════════════════════════════════════════════════
   JOIN MODAL
══════════════════════════════════════════════════════════════ */
const joinModal    = $('join-modal');
const modalClose   = $('modal-close-btn');
const joinForm     = $('join-form');
const formWrap     = $('modal-form-wrap');
const successPane  = $('modal-success');
const submitBtn    = $('modal-submit-btn');

function openJoinModal(tier) {
  joinModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (tier) {
    const sel = $('f-tier');
    if (sel) sel.value = tier;
  }
  setTimeout(() => modalClose && modalClose.focus(), 60);
}

function closeJoinModal() {
  joinModal.classList.remove('open');
  document.body.style.overflow = '';
}

// All "JOIN TODAY" buttons + tier CTAs
['hdr-join', 'mis-join', 'dark-join', 'mob-join', 'join-open-btn'].forEach(id => {
  on($(id), 'click', () => openJoinModal());
});
document.querySelectorAll('[data-tier]').forEach(el => {
  on(el, 'click', () => openJoinModal(el.dataset.tier));
});

on(modalClose, 'click', closeJoinModal);
on(joinModal, 'click', e => { if (e.target === joinModal) closeJoinModal(); });

// Focus trap inside join modal
on(joinModal, 'keydown', e => {
  if (e.key !== 'Tab') return;
  const visible = el => !el.closest('#modal-success') || successPane.classList.contains('show');
  const focusable = [...joinModal.querySelectorAll('a,button,input,select,[tabindex="0"]')].filter(visible);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

// Form submit — demo success state (no backend)
on(joinForm, 'submit', e => {
  e.preventDefault();
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;
  setTimeout(() => {
    formWrap.style.display = 'none';
    successPane.classList.add('show');
    successPane.querySelector('.success-title') && successPane.querySelector('.success-title').focus();
  }, 1200);
});

/* ══════════════════════════════════════════════════════════════
   VIDEO MODAL
══════════════════════════════════════════════════════════════ */
/* ── HERO VIDEO INLINE ────────────────────────────────────────── */
const heroBox   = document.querySelector('.hero-img');
const heroVideo = $('hero-inline-video');

function playHeroVideo() {
  if (heroBox && heroVideo) {
    heroBox.classList.add('video-active');
    heroVideo.play().catch(e => console.log('Autoplay prevented', e));
  }
}

on($('play-btn'), 'click', playHeroVideo);

/* ══════════════════════════════════════════════════════════════
   MEMBERSHIP ACCORDION
══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.tier-row').forEach(row => {
  function toggleTier() {
    const item   = row.closest('.tier');
    const isOpen = item.classList.toggle('open');
    row.setAttribute('aria-expanded', String(isOpen));
  }
  on(row, 'click', toggleTier);
  on(row, 'keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTier(); }
  });
});

/* Scroll reveal handled by js/animations.js (Motion.dev inView) */

/* ══════════════════════════════════════════════════════════════
   TRAINING CARD — keyboard activation
══════════════════════════════════════════════════════════════ */
document.querySelectorAll('.tc[tabindex]').forEach(card => {
  on(card, 'keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
  });
});
