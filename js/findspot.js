// ═══════════════════════════════════════
// findspot.js — Section 04: Findspot
// ═══════════════════════════════════════
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

const PALETTE = {
  'United Kingdom': '#8B7355',
  'Italy': '#6E9EC8', 'Greece': '#5A9E8A', 'Iraq': '#5A6AA0',
  'China': '#C85A3A', 'Cyprus': '#A87858', 'Turkey': '#6A8AAA',
  'Egypt': '#AA8840', 'India': '#C89040', 'France': '#4A8AAA',
  'Iran': '#789050', 'Syria': '#8A7AAA', 'Spain': '#809068',
  'Mexico': '#C87060', 'Peru': '#9A7848',
};

export async function initFindspot() {
  const fsData = await d3.csv('./data/findspot.csv', d3.autoType);

  const wrap = document.getElementById('findspot-bars');
  if (!wrap) return;

  const top15 = fsData.slice(0, 15);
  const BW    = Math.min(wrap.clientWidth || 700, 700);
  const bh = 22, gap = 6;
  const margin = { top: 8, right: 55, bottom: 8, left: 108 };
  const innerW = BW - margin.left - margin.right;
  const H = top15.length * (bh + gap) + margin.top + margin.bottom;

  const x = d3.scaleLinear([0, top15[0].count], [0, innerW]);

  const svg = d3.select('#findspot-bars').append('svg')
    .attr('viewBox', `0 0 ${BW} ${H}`)
    .attr('width', '100%');

  const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

  top15.forEach((d, i) => {
    const y     = i * (bh + gap);
    const isUK  = d.country === 'United Kingdom';
    const color = PALETTE[d.country] || '#9B8B7B';

    g.append('text')
      .attr('x', -8).attr('y', y + bh / 2 + 4)
      .attr('text-anchor', 'end')
      .attr('font-family', 'Courier New').attr('font-size', 10).attr('letter-spacing', '0.04em')
      .attr('fill', isUK ? '#1A1614' : 'rgba(26,22,20,0.5)')
      .text(d.country);

    g.append('rect')
      .attr('x', 0).attr('y', y).attr('width', innerW).attr('height', bh)
      .attr('fill', 'rgba(26,22,20,0.05)').attr('rx', 1);

    g.append('rect')
      .attr('x', 0).attr('y', y).attr('width', 0).attr('height', bh)
      .attr('fill', color).attr('opacity', isUK ? 1 : 0.75).attr('rx', 1)
      .transition().duration(1200).delay(i * 55).ease(d3.easeCubicOut)
      .attr('width', x(d.count));

    g.append('text')
      .attr('x', x(d.count) + 5).attr('y', y + bh / 2 + 4)
      .attr('font-family', 'Courier New').attr('font-size', 10)
      .attr('fill', 'rgba(26,22,20,0.35)')
      .text(d.count.toLocaleString());
  });
}
