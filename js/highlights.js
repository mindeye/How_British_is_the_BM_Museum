// ═══════════════════════════════════════
// highlights.js — Section 02b: Highlights
// ═══════════════════════════════════════
export async function initHighlights() {
  const resp = await fetch('./data/highlights.json');
  const data = await resp.json();

  const grid = document.getElementById('highlights-grid');
  if (!grid) return;

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'highlight-card';

    card.innerHTML = `
      ${item.contested ? '<div class="highlight-contested">Contested</div>' : ''}
      <img src="${item.image}" alt="${item.name}" loading="lazy"
           onerror="this.style.display='none'">
      <div class="highlight-overlay">
        <div class="highlight-origin">${item.origin}</div>
        <div class="highlight-name">${item.name}</div>
      </div>`;

    grid.appendChild(card);
  });
}
