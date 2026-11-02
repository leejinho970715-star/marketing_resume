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
