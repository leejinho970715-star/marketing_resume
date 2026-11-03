'use strict';
const metrics = {
  views: { label: '조회수', unit: '회', values: [111, 233, 3771] },
  visitors: { label: '순방문자', unit: '명', values: [60, 106, 3214] }
};
document.querySelectorAll('[data-metric]').forEach(button => {
  button.addEventListener('click', () => {
    const data = metrics[button.dataset.metric];
    document.querySelectorAll('[data-metric]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const maximum = Math.max(...data.values);
    data.values.forEach((value, index) => {
      const height = value / maximum * 160;
      const bar = document.querySelector(`[data-bar="${index}"]`);
      bar.setAttribute('height', String(height));
      bar.setAttribute('y', String(200 - height));
      const label = document.querySelector(`[data-value="${index}"]`);
      label.textContent = value.toLocaleString('ko-KR');
      label.setAttribute('y', String(190 - height));
    });
    document.querySelector('#chart-title').textContent = `월간 ${data.label}`;
    document.querySelector('#chart-unit').textContent = `단위: ${data.unit}`;
    document.querySelector('#chart-desc').textContent = data.values.map((value, index) => `2026년 ${index + 8}월 ${value.toLocaleString('ko-KR')}${data.unit}`).join(', ');
  });
});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('.archive-item').forEach(item => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
      if (!item.hidden) count++;
    });
    document.querySelector('.archive-count').textContent = `${button.textContent} ${count}개 항목`;
    window.ScrollTrigger?.refresh();
  });
});
document.querySelector('.print-button').addEventListener('click', () => window.print());

// Keep SVG labels readable when the chart scales to a narrow screen.
const chart = document.querySelector('.chart');
new ResizeObserver(entries => {
  const width = entries[0].contentRect.width;
  if (!width) return;
  chart.querySelectorAll('text').forEach(label => {
    const pixels = label.classList.contains('value') ? 16 : 14;
    label.style.fontSize = `${pixels * 460 / width}px`;
  });
}).observe(chart);

// Content is visible by default. Motion is progressive enhancement only.
(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const printMedia = window.matchMedia('print');
  const toggle = document.querySelector('.motion-toggle');
  const root = document.querySelector('main');
  let enabled = !reducedMotion.matches;
  let media;
  let typingCleanup = () => {};
  let printing = printMedia.matches;
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  function stopMotion() {
    media?.revert();
    media = undefined;
    typingCleanup();
    typingCleanup = () => {};
    progress.hidden = true;
  }

  function startMotion() {
    stopMotion();
    if (!enabled || printing) return;
    progress.hidden = false;
    media = gsap.matchMedia();
    media.add({ small: '(max-width: 600px)', wide: '(min-width: 601px)' }, context => {
      const distance = context.conditions.small ? 18 : 32;
      const reveal = (targets, trigger, options = {}) => {
        const items = gsap.utils.toArray(targets);
        if (!items.length) return;
        items.forEach(item => item.classList.add('motion-target'));
        gsap.from(items, {
          y: distance, opacity: 0, duration: 0.65, ease: 'power2.out',
          stagger: 0.07,
          scrollTrigger: { trigger, start: 'top 91%', once: true },
          ...options,
        });
      };
      reveal('.hero .eyebrow, .hero h1, .hero-copy, .hero-actions, .hero-note', '.hero');
      reveal('.growth-card', '.hero', { y: 24, scale: 0.96, duration: 0.85, ease: 'back.out(1.25)' });
      root.querySelectorAll('.section-heading, .seo-evidence>h3, .airbnb-detail>.section-heading, .closing>div').forEach(item => reveal(item, item));
      root.querySelectorAll('.storyline, .insight-grid, .renewal-changes, .comparison-grid, .renewal-gallery, .research-findings, .db-flow, .db-use-cases, .ad-platforms, .campaign-flow, .two-cases').forEach(group => reveal([...group.children], group));
      root.querySelectorAll('.section-clay, .closing-clay').forEach((asset, index) => {
        asset.classList.add('motion-target');
        gsap.from(asset, {
          y: 28, scale: 0.78, rotation: index % 2 ? 6 : -6, opacity: 0,
          duration: 0.95, ease: 'back.out(1.8)',
          scrollTrigger: { trigger: asset.parentElement, start: 'top 90%', once: true },
        });
      });
      gsap.fromTo(progress, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.15 },
      });

      // Keep the complete sentence in the document and accessibility tree.
      // An aria-hidden overlay types without shifting the surrounding layout.
      const typingRestorers = [];
      root.querySelectorAll('.hero-positioning, #next h2').forEach(slogan => {
        const text = slogan.innerText;
        const originalNodes = [...slogan.childNodes].map(node => node.cloneNode(true));
        const source = document.createElement('span');
        source.className = 'typing-source';
        source.append(...slogan.childNodes);
        const visual = document.createElement('span');
        visual.className = 'typing-visual is-typing';
        visual.setAttribute('aria-hidden', 'true');
        slogan.replaceChildren(source, visual);
        gsap.set(source, { opacity: 0 });
        const letters = Array.from(text);
        const state = { count: 0 };
        gsap.to(state, {
          count: letters.length, snap: { count: 1 }, duration: 1.1, delay: 0.25, ease: 'none',
          scrollTrigger: { trigger: slogan, start: 'top 94%', once: true },
          onUpdate: () => { visual.textContent = letters.slice(0, state.count).join(''); },
          onComplete: () => {
            source.style.opacity = '';
            visual.hidden = true;
          },
        });
        typingRestorers.push(() => slogan.replaceChildren(...originalNodes));
      });
      typingCleanup = () => typingRestorers.forEach(restore => restore());
      return () => {
        typingCleanup();
        typingCleanup = () => {};
      };
    });
    ScrollTrigger.refresh();
  }

  function updateToggle() {
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.textContent = enabled ? '모션 켜짐' : '모션 꺼짐';
  }
  toggle.hidden = false;
  updateToggle();
  toggle.addEventListener('click', () => {
    enabled = !enabled;
    updateToggle();
    startMotion();
  });
  reducedMotion.addEventListener('change', () => {
    enabled = !reducedMotion.matches;
    updateToggle();
    startMotion();
  });
  document.querySelector('.archive-disclosure')?.addEventListener('toggle', () => ScrollTrigger.refresh());
  window.addEventListener('beforeprint', () => { printing = true; stopMotion(); });
  window.addEventListener('afterprint', () => { printing = false; startMotion(); });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  try {
    startMotion();
  } catch (error) {
    stopMotion();
    enabled = false;
    updateToggle();
    console.warn('Portfolio motion is disabled; all content remains available.', error);
  }
})();
