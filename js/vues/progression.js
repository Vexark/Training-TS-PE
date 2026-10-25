// Progression d'une matière : indice, maîtrise par thème, activité, paliers, badges, erreurs, historiques.
import { echapper, duree, aujourdhui, ecartJours } from '../outils.js';
import { MATIERES, stats, PALIERS, BADGES, erreurs, instancier, nomTheme } from '../moteur.js';
import { libelleType, pastilleScore } from '../exercice.js';
import { lire } from '../etat.js';
import { enteteMatiere, pct0 } from './ui.js';
import { courbe, tableauCourbe, calendrier } from '../graphiques.js';

export function vueProgression(app, m) {
  const etat = lire();
  const jour = aujourdhui();
  const st = stats(etat, m, jour);
  const palier = etat.paliers?.[m] || 1;
  const serie = [{ nom: `Indice ${MATIERES[m].court}`, couleur: `var(--${m})`, points: Object.entries(etat.indices?.[m] || {}).filter(([j]) => ecartJours(j, jour) <= 120).sort().map(([j, v]) => [j, v]) }];
  const tuile = (libelle, valeur, sous = '') => `<div class="tuile"><span class="libelle">${libelle}</span><span class="valeur">${valeur}</span>${sous ? `<span class="sous">${sous}</span>` : ''}</div>`;
  const erreursFrequentes = erreurs(etat, m).slice(0, 8);
  const sprints = (etat.sprints || []).filter((s) => s.m === m).slice(-10).reverse();
  const badges = etat.badges?.[m] || {};
  app.className = `m-${m}`;
  app.innerHTML = `${enteteMatiere(m, 'progression')}
    <div class="grille deux">
      <div class="carte"><div class="etiquette">Indice de préparation ${MATIERES[m].court}</div><div class="hero">${st.indice}<small>%</small></div>
        <p class="note" style="margin-top:10px"><strong>Calcul transparent :</strong> 85 % × maîtrise technique (${pct0(st.technique)} : moyenne des thèmes pondérée par leur poids en entretien) + 15 % × simulations d'entretien (${pct0(st.simulation)} : moyenne de tes 2 meilleures parmi les 5 dernières). Maîtrise d'un thème = précision récente (une réponse de 3 semaines pèse moitié moins) × couverture (as-tu vu assez d'exercices différents ?) × fraîcheur (baisse si tu ne l'as pas travaillé depuis plus de 7 jours).</p></div>
      <div class="carte"><div class="titre-section"><h3>Évolution de l'indice</h3><button class="bouton petit discret" data-tableau>Voir le tableau</button></div><div data-courbe></div><div data-table class="cache defile"></div></div>
    </div>
    <div class="tuiles section">
      ${tuile('Palier', `${palier} / 6`, PALIERS[palier - 1].noms[m])}
      ${tuile('Série actuelle', `🔥 ${st.serie} j`, `record : ${st.meilleureSerie} j`)}
      ${tuile('Exercices faits', st.exercices, `${st.sessions} jour${st.sessions > 1 ? 's' : ''} d'entraînement`)}
      ${tuile('Précision 7 jours', st.precision7 === null ? '—' : pct0(st.precision7), `30 jours : ${st.precision30 === null ? '—' : pct0(st.precision30)}`)}
      ${tuile('Temps moyen / question', duree(st.tempsMoyen), `total : ${duree(st.tempsTotal)}`)}
      ${tuile('Études de cas', st.casFaits, `${st.casBons} réussie${st.casBons > 1 ? 's' : ''} (≥ 70 %)`)}
      ${tuile('Simulations', st.simulations.length, st.simulations.length ? `meilleure : ${pct0(st.meilleureSimulation)}` : 'aucune')}
      ${tuile('Record sprint', st.sprintRecord, 'bonnes réponses en 90 s')}
      ${tuile('Révisions dues', st.revisionsDues)}
      ${tuile('XP', st.xp.toLocaleString('fr-FR'))}
    </div>
    <div class="tuiles section">
      ${[1, 2, 3].map((n) => { const x = st.parNiveau[n]; return tuile(`Questions ${['', 'faciles (les bases)', 'moyennes', 'difficiles'][n]}`, x.precision === null ? '—' : pct0(x.precision), `${x.n} réponse${x.n > 1 ? 's' : ''} sur 30 jours · objectif ${['', '90', '75', '60'][n]} %`); }).join('')}
    </div>
    <div class="carte section"><div class="titre-section"><h2>Maîtrise par thème</h2><span class="note">Du plus faible au plus fort</span></div>
      ${[...MATIERES[m].themes].sort((a, b) => st.maitrises[a.id].maitrise - st.maitrises[b.id].maitrise).map((t) => {
        const x = st.maitrises[t.id];
        const pastille = x.n === 0 ? '<span class="pastille">Jamais vu</span>' : x.maitrise >= 0.7 ? '<span class="pastille bon">✓ Fort</span>' : x.maitrise >= 0.4 ? '<span class="pastille attention">≈ À consolider</span>' : '<span class="pastille critique">! Faible</span>';
        return `<div class="theme-ligne"><div><div class="nom">${echapper(t.nom)} ${pastille}</div><div class="detail">${x.n ? `précision ${pct0(x.precision)} · couverture ${x.distincts}/${x.cible} · ${x.age === 0 ? 'travaillé aujourd\'hui' : `il y a ${x.age} j`} · poids ${t.poids}` : 'pas encore travaillé'}</div></div>
          <div class="jauge"><i style="width:${Math.round(x.maitrise * 100)}%"></i></div><b class="num">${pct0(x.maitrise)}</b><a class="bouton petit" href="#/${m}/theme/${t.id}">S'entraîner</a></div>`;
      }).join('')}</div>
    <div class="grille deux section">
      <div class="carte"><h3>Régularité (12 semaines)</h3>${calendrier(st.activite, `var(--${m})`)}</div>
      <div class="carte"><h3>Erreurs à retravailler</h3>${erreursFrequentes.length ? `<ul class="programme">${erreursFrequentes.map((k) => {
        const inst = instancier(k, 'apercu');
        return inst ? `<li><span>${echapper(inst.type === 'cas' ? 'Étude de cas' : `${libelleType(inst)} · ${nomTheme(m, inst.theme)}`)}</span><span class="espace"></span>${pastilleScore(etat.cartes[k]?.s ?? 0)}</li>` : '';
      }).join('')}</ul><a class="bouton" href="#/${m}/erreurs" style="margin-top:10px">Refaire mes erreurs</a>` : '<p class="muet">Aucune erreur en attente.</p>'}</div>
    </div>
    <div class="carte section"><h2>Paliers</h2><div class="paliers">${PALIERS.map((p) => {
      const atteint = p.n <= palier;
      const suivant = p.n === palier + 1;
      return `<div class="palier ${atteint ? 'atteint' : ''} ${suivant ? 'suivant' : ''}"><span class="rang">${p.n}</span><div style="flex:1"><b>${p.noms[m]}</b> ${atteint ? '<span class="pastille bon">✓ atteint</span>' : suivant ? '<span class="pastille accent">prochain palier</span>' : ''}
        ${p.conditions.length ? `<ul class="conditions">${p.conditions.map((c) => `<li><span>${c.ok(st) ? '✅' : '⬜'}</span><span>${echapper(c.texte)}</span>${suivant ? `<span class="jauge"><i style="width:${Math.round(Math.min(1, c.avance(st)) * 100)}%"></i></span>` : '<span></span>'}</li>`).join('')}</ul>` : '<div class="note">Point de départ</div>'}</div></div>`;
    }).join('')}</div></div>
    <div class="carte section"><h2>Badges</h2><div class="badges">${BADGES.map((b) => `<div class="badge ${badges[b.id] ? '' : 'verrouille'}" title="${echapper(b.texte)}"><span class="ico">${b.icone}</span><b>${echapper(b.nom)}</b><div class="note">${echapper(b.texte)}</div>${badges[b.id] ? `<div class="petit muet">${new Date(badges[b.id]).toLocaleDateString('fr-FR')}</div>` : ''}</div>`).join('')}</div></div>
    <div class="grille deux section">
      <div class="carte"><h3>Simulations d'entretien</h3>${st.simulations.length ? `<table class="tableau"><thead><tr><th>Date</th><th class="num">Score</th><th class="num">Durée</th></tr></thead><tbody>${st.simulations.slice().reverse().slice(0, 10).map((s) => `<tr><td>${new Date(s.d).toLocaleDateString('fr-FR')}</td><td class="num">${pastilleScore(s.score)}</td><td class="num">${duree(s.duree || 0)}</td></tr>`).join('')}</tbody></table>` : `<p class="muet">Aucune simulation. <a href="#/${m}/simulation">En faire une</a></p>`}</div>
      <div class="carte"><h3>Sprints de calcul</h3>${sprints.length ? `<table class="tableau"><thead><tr><th>Date</th><th class="num">Bonnes réponses</th><th class="num">Précision</th></tr></thead><tbody>${sprints.map((s) => `<tr><td>${new Date(s.d).toLocaleDateString('fr-FR')}</td><td class="num">${s.score}</td><td class="num">${s.total ? pct0(s.score / s.total) : '—'}</td></tr>`).join('')}</tbody></table>` : `<p class="muet">Aucun sprint. <a href="#/${m}/sprint">En faire un</a></p>`}</div>
    </div>`;
  courbe(app.querySelector('[data-courbe]'), serie);
  const table = app.querySelector('[data-table]');
  table.innerHTML = tableauCourbe(serie);
  app.querySelector('[data-tableau]').addEventListener('click', (ev) => {
    table.classList.toggle('cache');
    ev.target.textContent = table.classList.contains('cache') ? 'Voir le tableau' : 'Masquer le tableau';
  });
}

