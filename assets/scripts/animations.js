/* Lightweight, dependency-free scroll reveals. */
'use strict';

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const items = [...document.querySelectorAll('.rv')];

  if ('IntersectionObserver' in window && items.length) {
    document.documentElement.classList.add('motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    items.forEach(item => observer.observe(item));
  }
}
