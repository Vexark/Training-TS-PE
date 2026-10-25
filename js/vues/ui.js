// Petits éléments d'interface partagés : messages, célébrations, en-tête d'une matière, alertes.
import { echapper } from '../outils.js';
import { MATIERES } from '../moteur.js';
import { appelApi } from '../etat.js';

export function toast(texte, erreur = false, duree = 4500) {
  const t = document.createElement('div');
  t.className = `toast${erreur ? ' erreur' : ''}`;
  t.textContent = texte;
  document.getElementById('toasts').append(t);
  setTimeout(() => t.remove(), duree);
}

// Fenêtre de félicitations (palier, badge) ; les paliers déclenchent aussi une alerte Windows
export function celebrer(nouveautes) {
  if (!nouveautes.length) return;
  const voile = document.createElement('div');
  voile.className = 'voile';
  const palier = nouveautes.find((n) => n.genre === 'palier');
  voile.innerHTML = `<div class="fenetre"><div class="grosse-icone">${palier ? '🏅' : '🎉'}</div>
    ${nouveautes.map((n) => `<h2>${echapper(n.titre)}</h2><p class="muet">${echapper(n.texte)}</p>`).join('')}
    <button class="bouton principal grand" data-fermer>Continuer</button></div>`;
  voile.addEventListener('click', (ev) => { if (ev.target === voile || ev.target.closest('[data-fermer]')) voile.remove(); });
  document.body.append(voile);
  voile.querySelector('[data-fermer]').focus();
  if (palier) appelApi('/api/notifier', { titre: `🏅 ${palier.titre}`, texte: palier.texte }).catch(() => {});
}

export const ONGLETS = [
  ['', 'Aujourd\'hui'], ['entrainement', 'S\'entraîner'], ['simulation', 'Simulation d\'entretien'], ['sprint', 'Sprint calcul'], ['progression', 'Progression'], ['fiches', 'Fiches'],
];

export function enteteMatiere(m, actif) {
  return `<div class="titre-matiere"><span class="barre"></span><h1 style="margin:0">${MATIERES[m].nom}</h1><span class="pastille accent">${MATIERES[m].court}</span></div>
    <nav class="onglets">${ONGLETS.map(([id, nom]) => `<a href="#/${m}${id ? `/${id}` : ''}" class="${id === actif ? 'actif' : ''}">${nom}</a>`).join('')}</nav>`;
}

export function listeAlertes(alertes, avecMatiere = false) {
  if (!alertes.length) return '<p class="muet">Aucune alerte : tout est à jour. 👌</p>';
  return `<div class="alertes">${alertes.map((a) => `<div class="alerte ${a.niveau} ${a.m ? `m-${a.m}` : ''}"><span class="icone">${a.icone}</span>
    ${avecMatiere && a.m ? `<span class="m">${MATIERES[a.m].court}</span>` : ''}<span class="texte">${echapper(a.texte)}</span>
    ${a.action ? `<a class="bouton petit" href="${a.action.route}">${echapper(a.action.libelle)}</a>` : ''}</div>`).join('')}</div>`;
}

export const pct0 = (x) => `${Math.round((x || 0) * 100)} %`;
