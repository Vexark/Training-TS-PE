// Sprint de calcul mental : 90 secondes, questions éclair à 4 choix. Pour « tenir vite » devant un recruteur.
import { echapper, hasard } from '../outils.js';
import { nouveautes } from '../moteur.js';
import { questionSprint } from '../generateurs/sprint.js';
import { lire, sauver } from '../etat.js';
import { enteteMatiere, celebrer } from './ui.js';

const DUREE = 90;

export function vueSprint(app, m) {
  const etat = lire();
  const passes = (etat.sprints || []).filter((s) => s.m === m);
  const record = passes.length ? Math.max(...passes.map((s) => s.score)) : 0;
  app.className = `m-${m}`;
  app.innerHTML = `${enteteMatiere(m, 'sprint')}
    <div class="carte sprint-zone" data-zone>
      <h2>⚡ Sprint de calcul mental — ${DUREE} secondes</h2>
      <p class="muet">${m === 'ts' ? 'Multiples, pont VE → titres, marges, DSO, provisions nettes d\'impôt, peg, IFRS 16…' : 'TRI de tête, multiples, levier, part des fonds propres, carried, valeur de sortie…'}</p>
      <p>Record : <strong>${record}</strong> bonne${record > 1 ? 's' : ''} réponse${record > 1 ? 's' : ''} · ${passes.length} sprint${passes.length > 1 ? 's' : ''} fait${passes.length > 1 ? 's' : ''}</p>
      <p class="note">Touches <kbd>1</kbd> à <kbd>4</kbd> pour répondre. Une erreur ne coûte rien, sauf du temps : vise la vitesse ET la justesse.</p>
      <button class="bouton principal grand" data-go>Démarrer</button>
    </div>`;
  app.querySelector('[data-go]').addEventListener('click', () => lancer(app.querySelector('[data-zone]'), m, record));
}

function lancer(zone, m, record) {
  const etat = lire();
  const graine = Date.now();
  const fin = Date.now() + DUREE * 1000;
  const reponses = [];
  let i = 0;
  let question = null;
  let actif = true;

  const clavier = (ev) => { const k = Number(ev.key); if (actif && k >= 1 && k <= 4) zone.querySelectorAll('.sprint-choix .choix')[k - 1]?.click(); };
  document.addEventListener('keydown', clavier);

  const afficher = () => {
    question = questionSprint(m, hasard(`${graine}|${i}`));
    zone.innerHTML = `<div class="ligne" style="justify-content:center;gap:28px"><span class="sprint-chrono" data-chrono>${DUREE}</span><span class="pastille bon">✓ ${reponses.filter((r) => r.ok).length}</span><span class="pastille critique">✗ ${reponses.filter((r) => !r.ok).length}</span></div>
      <div class="sprint-question">${echapper(question.q)}</div>
      <div class="sprint-choix">${question.choix.map((c, k) => `<button class="choix" data-k="${k}"><span class="lettre">${k + 1}</span><span>${echapper(c)}</span></button>`).join('')}</div>`;
    zone.querySelectorAll('.sprint-choix .choix').forEach((b) => b.addEventListener('click', () => {
      if (!actif) return;
      const k = Number(b.dataset.k);
      const ok = k === question.bonne;
      reponses.push({ q: question.q, donnee: question.choix[k], bonne: question.choix[question.bonne], expl: question.expl, ok });
      zone.classList.remove('flash-bon', 'flash-faux');
      void zone.offsetWidth;
      zone.classList.add(ok ? 'flash-bon' : 'flash-faux');
      i += 1;
      afficher();
    }));
    majChrono();
  };
  const majChrono = () => { const c = zone.querySelector('[data-chrono]'); if (c) c.textContent = Math.max(0, Math.ceil((fin - Date.now()) / 1000)); };
  const tic = setInterval(() => {
    if (!document.body.contains(zone)) { clearInterval(tic); document.removeEventListener('keydown', clavier); return; }
    majChrono();
    if (Date.now() >= fin) terminer();
  }, 250);

  const terminer = () => {
    actif = false;
    clearInterval(tic);
    document.removeEventListener('keydown', clavier);
    const bonnes = reponses.filter((r) => r.ok).length;
    etat.sprints.push({ m, d: new Date().toISOString(), score: bonnes, total: reponses.length, duree: DUREE });
    const nouv = nouveautes(etat, m);
    sauver(true);
    const fautes = reponses.filter((r) => !r.ok);
    zone.innerHTML = `<h2>${bonnes > record ? '🏆 Nouveau record !' : 'Sprint terminé'}</h2>
      <div class="score-grand">${bonnes}</div><p class="muet">bonne${bonnes > 1 ? 's' : ''} réponse${bonnes > 1 ? 's' : ''} sur ${reponses.length} (${reponses.length ? Math.round((bonnes / reponses.length) * 100) : 0} %) · record ${Math.max(record, bonnes)}</p>
      ${fautes.length ? `<div style="text-align:left;max-width:640px;margin:16px auto"><h3>Tes erreurs</h3><table class="tableau"><thead><tr><th>Question</th><th>Ta réponse</th><th>Bonne réponse</th></tr></thead><tbody>${fautes.map((f) => `<tr><td>${echapper(f.q)}<div class="note">${echapper(f.expl)}</div></td><td>${echapper(f.donnee)}</td><td><b>${echapper(f.bonne)}</b></td></tr>`).join('')}</tbody></table></div>` : '<p>Sans faute 👏</p>'}
      <div class="ligne" style="justify-content:center"><button class="bouton principal grand" data-encore>Recommencer</button><a class="bouton" href="#/${m}">Retour</a></div>`;
    zone.querySelector('[data-encore]').addEventListener('click', () => lancer(zone, m, Math.max(record, bonnes)));
    celebrer(nouv);
  };
  afficher();
}

