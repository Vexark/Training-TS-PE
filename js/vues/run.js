// Déroulé d'une série d'exercices : session du jour, thème, révisions, erreurs, cas, pitch de deal, simulation.
// Corrigé après chaque exercice (jamais avant) ; en simulation, corrigé complet seulement à la fin.
import { echapper, duree, aujourdhui, moyenne } from '../outils.js';
import { MATIERES, instancier, enregistrerReponse, marquerJournee, nouveautes, nomTheme, scoreSimulation, POIDS_BLOCS, stats } from '../moteur.js';
import { monterSaisie, monterCorrige, noter, pastilleScore, classeScore, libelleType, libelleNiveau } from '../exercice.js';
import { lire, sauver } from '../etat.js';
import { celebrer, toast } from './ui.js';
import { CONSEILS_DU_JOUR } from '../contenu/conseils.js';

const TITRES = { session: 'Session du jour', theme: 'Entraînement', revisions: 'Révisions', erreurs: 'Mes erreurs à refaire', cas: 'Étude de cas', deal: 'Pitch d\'un deal', simulation: 'Simulation d\'entretien', perso: 'Mes questions' };

export function titreRun(run) {
  if (run.mode === 'theme') return `Entraînement : ${nomTheme(run.m, run.theme)}`;
  return TITRES[run.mode] || 'Entraînement';
}

// Affiche le run en cours de la matière (déjà placé dans etat.en_cours[m])
export function afficherRun(app, m) {
  const etat = lire();
  const run = etat.en_cours[m];
  if (!run) { location.hash = `#/${m}`; return; }
  const simulation = run.mode === 'simulation';
  app.innerHTML = '';
  app.className = `m-${m}`;
  const cadre = document.createElement('div');
  app.append(cadre);

  const abandonner = () => {
    if (run.pos > 0 && !confirm('Arrêter cette série ? Les réponses déjà données sont gardées.')) return;
    if (run.resultats.length && !simulation) marquerJournee(etat, m, run.resultats.map((r) => ({ s: r.s, du: r.du, type: r.type })));
    delete etat.en_cours[m];
    sauver();
    location.hash = `#/${m}`;
  };

  const exerciceSuivant = () => {
    if (run.pos >= run.items.length) return simulation ? rapportSimulation() : recap();
    const item = run.items[run.pos];
    const inst = instancier(item.cle, item.graine);
    if (!inst) { run.pos += 1; sauver(); return exerciceSuivant(); } // exercice supprimé (ex. question perso)
    const debut = Date.now();
    cadre.innerHTML = `
      <div class="ligne"><a class="bouton discret petit" href="#/${m}">← ${MATIERES[m].court}</a><h2 style="margin:0">${echapper(titreRun(run))}</h2><span class="espace"></span>
        ${simulation ? '<span class="chrono" data-chrono-global title="Durée de la simulation">0 s</span>' : ''}
        <span class="muet">${run.pos + 1} / ${run.items.length}</span><button class="bouton petit discret" data-abandon>Arrêter</button></div>
      <div class="progression-run"><i style="width:${(run.pos / run.items.length) * 100}%"></i></div>
      <div class="carte exercice">
        <div class="exercice-tete">
          ${item.role ? `<span class="pastille accent">${echapper(item.role)}</span>` : ''}
          <span class="pastille">${echapper(libelleType(inst))}</span>
          <span class="pastille">${echapper(inst.type === 'cas' ? 'Étude de cas' : nomTheme(m, inst.theme))}</span>
          ${inst.type !== 'cas' && inst.genre !== 'deal' ? `<span class="pastille niveau-${inst.niveau || 1}" title="Difficulté">${echapper(libelleNiveau(inst))}</span>` : ''}
          ${item.rev ? '<span class="pastille" title="Revient grâce à la révision espacée">🔁 Révision</span>' : ''}
          ${inst.perso ? '<span class="pastille">Ma question</span>' : ''}
          <span class="espace"></span><span class="chrono" data-chrono title="Temps passé">0 s</span>
        </div>
        ${inst.titre && inst.type !== 'cas' && inst.genre !== 'question' ? `<h3>${echapper(inst.titre)}</h3>` : ''}
        <div data-saisie></div><div data-corrige></div>
      </div>`;
    cadre.querySelector('[data-abandon]').addEventListener('click', abandonner);
    const chrono = cadre.querySelector('[data-chrono]');
    const tic = setInterval(() => {
      if (!document.body.contains(chrono)) return clearInterval(tic);
      chrono.textContent = duree((Date.now() - debut) / 1000);
      const g = cadre.querySelector('[data-chrono-global]');
      if (g) g.textContent = duree((Date.now() - new Date(run.debut)) / 1000);
    }, 1000);
    const exo = cadre.querySelector('.exercice');
    const zoneSaisie = cadre.querySelector('[data-saisie]');
    const zoneCorrige = cadre.querySelector('[data-corrige]');

    const terminer = (details, score) => {
      const du = (Date.now() - debut) / 1000;
      const xp = enregistrerReponse(etat, inst, score, du, run.mode);
      run.resultats.push({ cle: inst.cle, graine: item.graine, s: score, du, type: inst.type, details, role: item.role });
      run.pos += 1;
      sauver();
      return xp;
    };
    const boutonSuivant = (texte = run.pos + 1 < run.items.length ? 'Exercice suivant →' : 'Voir le bilan') => {
      const b = document.createElement('button');
      b.className = 'bouton principal grand';
      b.style.marginTop = '14px';
      b.textContent = texte;
      b.addEventListener('click', () => { clearInterval(tic); exerciceSuivant(); });
      const clavier = (ev) => { if (ev.key === 'Enter' && !ev.target.closest('textarea, input')) { ev.preventDefault(); document.removeEventListener('keydown', clavier); b.click(); } };
      setTimeout(() => document.addEventListener('keydown', clavier), 200);
      b.addEventListener('click', () => document.removeEventListener('keydown', clavier));
      zoneCorrige.append(b);
      b.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    monterSaisie(zoneSaisie, inst, {
      simulation, voix: simulation && etat.reglages.voix_recruteur,
      surValide: (details) => {
        if (simulation) { // pas de corrigé : on garde la réponse, notée à la fin
          const s = inst.type === 'ouverte' || inst.type === 'cas' ? null : noter(inst, details);
          run.resultats.push({ cle: inst.cle, graine: item.graine, s, du: (Date.now() - debut) / 1000, type: inst.type, details, bloc: item.bloc, role: item.role });
          run.pos += 1;
          sauver();
          clearInterval(tic);
          return exerciceSuivant();
        }
        zoneSaisie.querySelectorAll('button, input, textarea').forEach((x) => { if (!x.closest('details')) x.disabled = true; });
        if (inst.type === 'ouverte') {
          monterCorrige(zoneCorrige, inst, details, {
            interactif: true, racine: exo, matiere: m,
            surValideEval: (s) => { const xp = terminer(details, s); zoneCorrige.insertAdjacentHTML('beforeend', `<p class="note" style="margin-top:10px">Score retenu ${pastilleScore(s)} · +${xp} XP</p>`); boutonSuivant(); },
          });
        } else {
          const s = noter(inst, details);
          const xp = terminer(details, s);
          if (inst.type === 'cas') zoneSaisie.innerHTML = '';
          monterCorrige(zoneCorrige, inst, details, { interactif: false, racine: exo, matiere: m });
          zoneCorrige.insertAdjacentHTML('beforeend', `<p class="note" style="margin-top:10px">+${xp} XP</p>`);
          boutonSuivant();
        }
      },
    });
  };

  // ------------------------------------------------------------------ bilan d'une série (corrections incluses)
  const recap = () => {
    const res = run.resultats;
    const score = res.length ? moyenne(res.map((r) => r.s)) : 0;
    const tempsTotal = res.reduce((a, r) => a + r.du, 0);
    const avant = run.indiceDebut ?? stats(etat, m).indice;
    marquerJournee(etat, m, res.map((r) => ({ s: r.s, du: r.du, type: r.type })));
    delete etat.en_cours[m];
    const nouv = nouveautes(etat, m);
    const apres = stats(etat, m);
    sauver(true);
    const conseils = CONSEILS_DU_JOUR[m];
    const conseil = conseils[Math.floor(Date.now() / 86400000) % conseils.length];
    const rates = res.filter((r) => r.s < 0.6).length;
    cadre.innerHTML = `
      <div class="ligne"><a class="bouton discret petit" href="#/${m}">← ${MATIERES[m].court}</a><h2 style="margin:0">Bilan : ${echapper(titreRun(run))}</h2></div>
      <div class="grille trois section">
        <div class="carte"><div class="etiquette">Score de la série</div><div class="score-grand">${Math.round(score * 100)} %</div><div class="note">${res.length} exercices · ${duree(tempsTotal)}</div></div>
        <div class="carte"><div class="etiquette">Indice de préparation ${MATIERES[m].court}</div><div class="score-grand">${apres.indice} %</div><div class="note">${apres.indice - avant >= 0 ? '+' : ''}${apres.indice - avant} pt avec cette série</div></div>
        <div class="carte"><div class="etiquette">À revoir</div><div class="score-grand">${rates}</div><div class="note">${rates ? `exercice${rates > 1 ? 's' : ''} raté${rates > 1 ? 's' : ''} : ${rates > 1 ? 'ils reviendront' : 'il reviendra'} dès demain dans tes sessions (révision espacée).` : 'Aucune erreur : bravo.'}</div></div>
      </div>
      <div class="carte section"><div class="conseil-recruteur" style="margin:0">${echapper(conseil)}</div></div>
      <div class="carte section"><h3>Toutes les réponses et corrigés</h3><ul class="liste-resultats" data-liste></ul></div>
      <div class="ligne section"><a class="bouton principal grand" href="#/${m}">Terminer</a><a class="bouton" href="#/${m}/session?nouvelle=1">Nouvelle série (exercices différents)</a><a class="bouton" href="#/${m}/progression">Voir ma progression</a></div>`;
    const liste = cadre.querySelector('[data-liste]');
    res.forEach((r, i) => {
      const inst = instancier(r.cle, r.graine);
      if (!inst) return;
      const li = document.createElement('li');
      li.innerHTML = `<details><summary>${pastilleScore(r.s)} <span>${i + 1}. ${echapper(inst.type === 'cas' ? inst.titre : `${libelleType(inst)} · ${nomTheme(m, inst.theme)}`)}</span><span class="muet petit">${duree(r.du)}</span></summary><div class="exercice" style="margin-top:10px"><div class="enonce">${inst.type === 'cas' ? '' : inst.enonce}</div><div data-c></div></div></details>`;
      liste.append(li);
      li.querySelector('details').addEventListener('toggle', () => {
        const z = li.querySelector('[data-c]');
        if (!z.childElementCount) monterCorrige(z, inst, r.details || {}, { interactif: false, matiere: m });
      }, { once: true });
    });
    celebrer(nouv);
  };

  // ------------------------------------------------------------------ rapport de simulation (auto-évaluation)
  const rapportSimulation = () => {
    const res = run.resultats;
    const dureeTotale = (Date.now() - new Date(run.debut)) / 1000;
    cadre.innerHTML = `
      <div class="ligne"><h2 style="margin:0">Fin de la simulation — l'heure du débrief</h2></div>
      <p class="note">Comme après un vrai entretien : relis chaque réponse, compare au corrigé et coche honnêtement les points couverts. Le score se met à jour en direct.</p>
      <div class="grille trois section">
        <div class="carte"><div class="etiquette">Score global (pondéré)</div><div class="score-grand" data-total>—</div><div class="note">Fit ${Math.round(POIDS_BLOCS.Fit * 100)} % · Technique ${Math.round(POIDS_BLOCS.Technique * 100)} % · Cas ${Math.round(POIDS_BLOCS['Cas pratique'] * 100)} %</div></div>
        <div class="carte"><div class="etiquette">Par bloc</div><div data-blocs></div></div>
        <div class="carte"><div class="etiquette">Durée</div><div class="score-grand">${duree(dureeTotale)}</div><div class="note">${res.length} questions</div></div>
      </div>
      <div class="carte section"><ul class="liste-resultats" data-liste></ul></div>
      <div class="ligne section"><button class="bouton principal grand" data-enregistrer>Enregistrer ma simulation</button><span class="note">Tes scores comptent dans l'indice de préparation (part « simulations »).</span></div>`;
    const scores = res.map((r) => {
      const inst = instancier(r.cle, r.graine);
      return { r, inst, s: inst ? noter(inst, r.details) : 0 };
    });
    const maj = () => {
      const { score, detail } = scoreSimulation(scores.map((x) => ({ s: x.s, bloc: x.r.bloc })));
      cadre.querySelector('[data-total]').textContent = `${Math.round(score * 100)} %`;
      cadre.querySelector('[data-blocs]').innerHTML = Object.entries(detail).map(([b, v]) => `<div class="ligne" style="justify-content:space-between"><span>${b}</span>${pastilleScore(v)}</div>`).join('');
      scores.forEach((x, i) => { const p = cadre.querySelector(`[data-score="${i}"]`); if (p) p.outerHTML = `<span data-score="${i}">${pastilleScore(x.s)}</span>`; });
      return { score, detail };
    };
    const liste = cadre.querySelector('[data-liste]');
    scores.forEach((x, i) => {
      if (!x.inst) return;
      const li = document.createElement('li');
      li.innerHTML = `<details ${x.inst.type === 'ouverte' || x.inst.type === 'cas' ? 'open' : ''}><summary><span data-score="${i}"></span><span class="pastille">${echapper(x.r.bloc || '')}</span><span>${echapper(x.inst.type === 'cas' ? x.inst.titre : (x.inst.titre || nomTheme(m, x.inst.theme)))}</span><span class="muet petit">${duree(x.r.du)}</span></summary>
        <div class="exercice" style="margin-top:10px"><div class="enonce">${x.inst.type === 'cas' ? '' : x.inst.enonce}</div><div data-c></div></div></details>`;
      liste.append(li);
      monterCorrige(li.querySelector('[data-c]'), x.inst, x.r.details || {}, { interactif: true, matiere: m, surChange: (s) => { x.s = s; maj(); } });
    });
    maj();
    cadre.querySelector('[data-enregistrer]').addEventListener('click', (ev) => {
      ev.target.disabled = true;
      const { score, detail } = maj();
      const avant = stats(etat, m).indice;
      for (const x of scores) {
        if (!x.inst) continue;
        enregistrerReponse(etat, x.inst, x.s, x.r.du, 'simulation');
      }
      etat.simulations.push({ m, d: new Date().toISOString(), score: Math.round(score * 1000) / 1000, detail, duree: Math.round(dureeTotale), nb: scores.length });
      marquerJournee(etat, m, scores.map((x) => ({ s: x.s, du: x.r.du, type: x.inst?.type })), new Date(), true);
      delete etat.en_cours[m];
      const nouv = nouveautes(etat, m);
      sauver(true);
      const apres = stats(etat, m).indice;
      ev.target.insertAdjacentHTML('afterend', `<span class="pastille bon">✓ Simulation enregistrée : ${Math.round(score * 100)} % · indice ${avant} → ${apres} %</span> <a class="bouton" href="#/${m}/progression">Voir ma progression</a>`);
      celebrer(nouv);
      toast('Simulation enregistrée.');
    });
  };

  exerciceSuivant();
}
