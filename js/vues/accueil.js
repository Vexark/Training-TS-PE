// Accueil : TS et PE côte à côte, alertes, courbe des deux indices, conseils du jour.
import { echapper, aujourdhui, dateLisible, ecartJours } from '../outils.js';
import { MATIERES, LISTE_MATIERES, stats, alertes, serieGlobale } from '../moteur.js';
import { lire } from '../etat.js';
import { listeAlertes } from './ui.js';
import { blocPalier } from './matiere.js';
import { courbe, tableauCourbe } from '../graphiques.js';
import { CONSEILS_DU_JOUR } from '../contenu/conseils.js';

export function vueAccueil(app) {
  const etat = lire();
  const jour = aujourdhui();
  const toutes = LISTE_MATIERES.flatMap((m) => alertes(etat, m).map((a) => ({ ...a, m })));
  const ordre = { rouge: 0, orange: 1, vert: 2, info: 3 };
  toutes.sort((a, b) => ordre[a.niveau] - ordre[b.niveau]);
  const debutant = etat.reponses.length === 0;
  const series = LISTE_MATIERES.map((m) => ({
    nom: MATIERES[m].court, couleur: `var(--${m})`,
    points: Object.entries(etat.indices?.[m] || {}).filter(([j]) => ecartJours(j, jour) <= 90).sort().map(([j, v]) => [j, v]),
  }));
  app.className = '';
  app.innerHTML = `
    <div class="ligne"><h1 style="margin:0">Bonjour 👋</h1><span class="muet">${dateLisible(jour)}</span><span class="espace"></span><span class="pastille">🔥 Série : ${serieGlobale(etat)} jour${serieGlobale(etat) > 1 ? 's' : ''}</span></div>
    ${debutant ? `<div class="carte section"><h2>Bienvenue dans ton entraînement intensif</h2>
      <ol><li><strong>Fais ta première session TS et ta première session PE</strong> (30 min chacune) : l'application repère tout de suite tes points faibles.</li>
      <li>Renseigne tes <strong>dates d'entretien</strong> dans <a href="#/parametres">Paramètres</a> : compte à rebours et alertes ciblées.</li>
      <li>Écris ton <strong>pitch</strong> et tes réponses de fit dans <a href="#/pitch">Mon pitch</a>, puis répète-les à voix haute.</li>
      <li>Chaque jour : la session du jour + un sprint de calcul. Chaque semaine : une simulation d'entretien.</li></ol>
      <p class="note">Les exercices changent chaque jour (tirage aléatoire + chiffres générés) ; les corrigés s'affichent dès que tu as répondu.</p></div>` : ''}
    <div class="grille deux section">${LISTE_MATIERES.map((m) => {
      const st = stats(etat, m, jour);
      const date = etat.reglages[`date_entretien_${m}`];
      const n = date ? ecartJours(jour, date) : null;
      return `<div class="carte carte-matiere m-${m}">
        <div class="tete"><h2>${MATIERES[m].nom}</h2>${st.faiteAujourdhui ? '<span class="pastille bon">✓ Fait aujourd\'hui</span>' : '<span class="pastille attention">Session à faire</span>'}</div>
        <div class="ligne" style="align-items:flex-end;margin-top:10px"><div><div class="etiquette">Indice de préparation</div><div class="hero">${st.indice}<small>%</small></div></div>
          ${n !== null && n >= 0 ? `<span class="espace"></span><div style="text-align:right"><div class="etiquette">Entretien</div><b style="font-size:1.4rem">${n === 0 ? 'aujourd\'hui' : `J−${n}`}</b></div>` : ''}</div>
        <div style="margin:12px 0">${blocPalier(etat, m, st)}</div>
        <div class="chiffres-cles"><div><span class="etiquette">Série</span><b>🔥 ${st.serie} j</b></div><div><span class="etiquette">Révisions</span><b>${st.revisionsDues}</b></div><div><span class="etiquette">Exercices</span><b>${st.exercices}</b></div></div>
        <div class="ligne"><a class="bouton principal" href="#/${m}">Session du jour</a><a class="bouton" href="#/${m}/simulation">Simulation</a><a class="bouton discret" href="#/${m}/sprint">⚡ Sprint</a></div>
      </div>`;
    }).join('')}</div>
    <div class="section"><div class="titre-section"><h2>Alertes</h2></div>${listeAlertes(toutes.slice(0, 8), true)}</div>
    <div class="grille deux section">
      <div class="carte"><div class="titre-section"><h3>Évolution des indices de préparation</h3><button class="bouton petit discret" data-tableau>Voir le tableau</button></div><div data-courbe></div><div data-table class="cache defile"></div></div>
      <div class="carte"><h3>Conseils du jour</h3>${LISTE_MATIERES.map((m) => {
        const c = CONSEILS_DU_JOUR[m];
        return `<div class="m-${m}"><div class="conseil-recruteur"><span class="pastille accent">${MATIERES[m].court}</span> ${echapper(c[(ecartJours('2026-01-01', jour) + (m === 'pe' ? 7 : 0)) % c.length])}</div></div>`;
      }).join('')}<p style="margin-top:12px"><a href="#/conseils">Tous les conseils (process de recrutement, méthodes, marché 2026) →</a></p></div>
    </div>`;
  courbe(app.querySelector('[data-courbe]'), series);
  const table = app.querySelector('[data-table]');
  table.innerHTML = tableauCourbe(series);
  app.querySelector('[data-tableau]').addEventListener('click', (ev) => {
    table.classList.toggle('cache');
    ev.target.textContent = table.classList.contains('cache') ? 'Voir le tableau' : 'Masquer le tableau';
  });
}
