// Graphiques en SVG / HTML, sans bibliothèque : courbe d'évolution (survol + tableau), calendrier d'activité.
import { dateCourte, echapper, ajouterJours, aujourdhui } from './outils.js';

const NS = 'http://www.w3.org/2000/svg';
const el = (nom, attrs = {}) => { const e = document.createElementNS(NS, nom); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); return e; };

// series : [{ nom, couleur: 'var(--ts)', points: [['2026-10-01', 42], …] }] — valeurs de 0 à 100
export function courbe(conteneur, series, { hauteur = 220, suffixe = ' %', max = 100 } = {}) {
  conteneur.innerHTML = '';
  conteneur.classList.add('graphique');
  const toutes = series.flatMap((s) => s.points.map((p) => p[0]));
  const jours = [...new Set(toutes)].sort();
  if (jours.length < 2) {
    conteneur.innerHTML = `<p class="muet">La courbe apparaîtra après ton deuxième jour d'entraînement.${series.map((s) => (s.points.length ? ` ${echapper(s.nom)} aujourd'hui : <b>${s.points.at(-1)[1]}${suffixe}</b>.` : '')).join('')}</p>`;
    return;
  }
  const debut = jours[0], fin = jours.at(-1);
  const etendue = Math.max(1, (new Date(fin) - new Date(debut)) / 86400000);
  const L = 640, G = 36, D = 56, H = hauteur, B = 26, T = 10;
  const x = (j) => G + ((new Date(j) - new Date(debut)) / 86400000 / etendue) * (L - G - D);
  const y = (v) => T + (1 - v / max) * (H - T - B);
  const svg = el('svg', { viewBox: `0 0 ${L} ${H}`, role: 'img', 'aria-label': series.map((s) => s.nom).join(', ') });
  for (const v of [0, 25, 50, 75, 100]) {
    svg.append(el('line', { x1: G, x2: L - D, y1: y(v), y2: y(v), stroke: 'var(--grille)', 'stroke-width': 1 }));
    const t = el('text', { x: G - 8, y: y(v) + 4, 'text-anchor': 'end' }); t.textContent = v; svg.append(t);
  }
  const nbTicks = Math.min(5, jours.length);
  for (let i = 0; i < nbTicks; i++) {
    const j = jours[Math.round((i * (jours.length - 1)) / Math.max(1, nbTicks - 1))];
    const t = el('text', { x: x(j), y: H - 6, 'text-anchor': 'middle' }); t.textContent = dateCourte(j); svg.append(t);
  }
  for (const s of series) {
    if (!s.points.length) continue;
    const d = s.points.map((p, i) => `${i ? 'L' : 'M'}${x(p[0]).toFixed(1)},${y(p[1]).toFixed(1)}`).join(' ');
    if (series.length === 1) svg.append(el('path', { d: `${d} L${x(s.points.at(-1)[0])},${y(0)} L${x(s.points[0][0])},${y(0)} Z`, fill: s.couleur, 'fill-opacity': 0.1 }));
    svg.append(el('path', { d, fill: 'none', stroke: s.couleur, 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    const der = s.points.at(-1);
    svg.append(el('circle', { cx: x(der[0]), cy: y(der[1]), r: 4, fill: s.couleur, stroke: 'var(--surface)', 'stroke-width': 2 }));
    const t = el('text', { x: x(der[0]) + 9, y: y(der[1]) + 4, class: 'etiquette-valeur' });
    t.textContent = `${series.length > 1 ? `${s.nom} ` : ''}${der[1]}${suffixe}`; svg.append(t);
  }
  // survol : ligne verticale + bulle sur le jour le plus proche
  const guide = el('line', { y1: T, y2: H - B, stroke: 'var(--axe)', 'stroke-width': 1, visibility: 'hidden' });
  svg.append(guide);
  const zone = el('rect', { x: G, y: 0, width: L - G - D, height: H, fill: 'transparent' });
  svg.append(zone);
  const bulle = document.createElement('div');
  bulle.className = 'bulle cache';
  conteneur.append(svg, bulle);
  zone.addEventListener('mousemove', (ev) => {
    const r = svg.getBoundingClientRect();
    const px = ((ev.clientX - r.left) / r.width) * L;
    const j = jours.reduce((best, k) => (Math.abs(x(k) - px) < Math.abs(x(best) - px) ? k : best), jours[0]);
    guide.setAttribute('x1', x(j)); guide.setAttribute('x2', x(j)); guide.setAttribute('visibility', 'visible');
    const lignes = series.map((s) => { const p = s.points.find((q) => q[0] === j); return p ? `<div><i style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${s.couleur};margin-right:6px"></i>${echapper(s.nom)} : <b>${p[1]}${suffixe}</b></div>` : ''; }).join('');
    bulle.innerHTML = `<div class="muet">${dateCourte(j)}</div>${lignes}`;
    bulle.style.left = `${(x(j) / L) * r.width}px`;
    bulle.style.top = `${(y(Math.max(...series.map((s) => s.points.find((q) => q[0] === j)?.[1] ?? 0))) / H) * r.height}px`;
    bulle.classList.remove('cache');
  });
  zone.addEventListener('mouseleave', () => { guide.setAttribute('visibility', 'hidden'); bulle.classList.add('cache'); });
  if (series.length > 1) {
    const leg = document.createElement('div');
    leg.className = 'legende';
    leg.innerHTML = series.map((s) => `<span><i style="background:${s.couleur}"></i>${echapper(s.nom)}</span>`).join('');
    conteneur.prepend(leg);
  }
}

// Tableau équivalent (accessibilité) : bouton « Voir le tableau »
export function tableauCourbe(series, suffixe = ' %') {
  const jours = [...new Set(series.flatMap((s) => s.points.map((p) => p[0])))].sort().reverse();
  return `<table class="tableau"><thead><tr><th>Jour</th>${series.map((s) => `<th class="num">${echapper(s.nom)}</th>`).join('')}</tr></thead><tbody>${jours.map((j) => `<tr><td>${dateCourte(j)}</td>${series.map((s) => { const p = s.points.find((q) => q[0] === j); return `<td class="num">${p ? `${p[1]}${suffixe}` : '—'}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;
}

// Calendrier des 12 dernières semaines : intensité = nombre d'exercices du jour (une seule teinte, du clair au foncé)
export function calendrier(activite, couleur, semaines = 12) {
  const fin = aujourdhui();
  const decalage = (new Date(`${fin}T12:00:00Z`).getUTCDay() + 6) % 7; // lundi = 0
  const debut = ajouterJours(fin, -decalage - (semaines - 1) * 7); // un lundi : chaque colonne = une semaine
  const cases = [];
  for (let j = debut; j <= fin; j = ajouterJours(j, 1)) {
    const n = activite[j] || 0;
    const niveau = n === 0 ? 0 : n < 5 ? 0.3 : n < 12 ? 0.55 : n < 25 ? 0.8 : 1;
    cases.push(`<i title="${dateCourte(j)} : ${n} exercice${n > 1 ? 's' : ''}" style="${niveau ? `background:${couleur};opacity:${niveau}` : ''}"></i>`);
  }
  return `<div class="calendrier" aria-label="Activité des 12 dernières semaines">${cases.join('')}</div>
    <div class="legende" style="margin-top:6px"><span>Moins</span>${[0.3, 0.55, 0.8, 1].map((o) => `<i style="width:12px;height:12px;border-radius:3px;background:${couleur};opacity:${o}"></i>`).join('')}<span>Plus</span></div>`;
}
