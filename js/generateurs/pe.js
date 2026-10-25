// Exercices de private equity générés au hasard (IRR, paper LBO, value creation, dette, management package…).
import { arrondi, meur, nombre, pct, fois, mediane, tri } from '../outils.js';
import { tableau, champ, signe } from './commun.js';
import { SECTEURS, societe } from './secteurs.js';

// Petit tableau des multiples (1 + r)^n : l'outil n°1 pour calculer un IRR de tête
function tableMultiples(n) {
  const taux = [0.10, 0.15, 0.20, 0.25, 0.30, 0.35];
  return tableau(['IRR', ...taux.map((t) => pct(t, 0))], [[`Multiple en ${n} ans`, ...taux.map((t) => fois((1 + t) ** n, 2))]], 'compact');
}

// ---------------------------------------------------------------------------------------------------
function triRapide(r) {
  const n = r.entier(2, 7);
  if (r.vrai(0.65)) {
    const moic = r.choix([1.5, 1.75, 2, 2.25, 2.5, 3, 3.5, 4]);
    const t = moic ** (1 / n) - 1;
    return {
      type: 'calcul', titre: 'IRR de tête', sansCalculatrice: true,
      enonce: `<p>Un fonds investit et récupère <strong>${fois(moic, 2)}</strong> sa mise au bout de <strong>${n} ans</strong> (aucun flux intermédiaire). Quel IRR, sans calculatrice ?</p>`,
      champs: [champ('tri', 'IRR', t * 100, '%', 1.6, 0)],
      explication: `<p>IRR = ${nombre(moic, 2)}^(1/${n}) − 1 = <strong>${pct(t)}</strong>.</p><p>Méthode orale : repère dans quelle colonne tombe ${fois(moic, 2)} et interpole :</p>${tableMultiples(n)}`,
      conseil: 'À connaître par cœur : 2x en 5 ans ≈ 15 %, 2,5x ≈ 20 %, 3x ≈ 25 % ; 2x en 3 ans ≈ 26 %. Annonce un ordre de grandeur, puis affine.',
    };
  }
  const t = r.choix([0.15, 0.2, 0.25, 0.3]);
  const moic = (1 + t) ** n;
  return {
    type: 'calcul', titre: 'Multiple de tête', sansCalculatrice: true,
    enonce: `<p>Le fonds vise un IRR de <strong>${pct(t, 0)}</strong> sur <strong>${n} ans</strong>. Quel multiple (MOIC) doit-il obtenir ?</p>`,
    champs: [champ('moic', 'MOIC', moic, 'x', 0.11, 1)],
    explication: `<p>MOIC = (1 + ${pct(t, 0)})^${n} = <strong>${fois(moic, 2)}</strong>.</p>${tableMultiples(n)}`,
    conseil: 'Astuce : 1,2² = 1,44 ; 1,2³ ≈ 1,73 ; 1,2⁵ ≈ 2,49 ; 1,25⁴ ≈ 2,44 ; 1,15⁵ ≈ 2,01.',
  };
}

// ---------------------------------------------------------------------------------------------------
function paperLbo(r) {
  const e0 = r.choix([10, 12, 15, 20, 25, 30, 40]);
  const m = r.choix([7, 8, 9, 10, 11, 12]);
  const leverage = r.choix([3, 4, 5].filter((l) => l <= m - 3));
  const g = r.choix([1.2, 1.25, 1.4, 1.5, 1.6, 1.8, 2.0]);
  const e5 = arrondi(e0 * g, 0.5);
  const conv = r.choix([0.3, 0.4, 0.5]);
  const cash = Math.round(conv * (e0 + e5) / 2 * 5);
  const mSortie = r.vrai(0.7) ? m : m - 1;
  const ve0 = e0 * m, d0 = e0 * leverage, eq0 = ve0 - d0;
  const d5 = d0 - cash;
  const eq5 = arrondi(mSortie * e5 - d5);
  const moic = eq5 / eq0;
  const t = moic ** (1 / 5) - 1;
  return {
    type: 'calcul', titre: 'Paper LBO (sans calculatrice)', sansCalculatrice: true, duree: 600,
    enonce: `<p>Un fonds rachète une société qui fait <strong>${meur(e0, 0)}</strong> d'EBITDA, à <strong>${fois(m, 0)}</strong> l'EBITDA. Dette d'acquisition : <strong>${fois(leverage, 0)}</strong> l'EBITDA, le reste en equity (frais ignorés).</p>
      <p>Dans 5 ans, l'EBITDA atteint <strong>${meur(e5)}</strong>. Sur les 5 ans, la société génère <strong>${meur(cash, 0)}</strong> de cash disponible pour rembourser la dette (après intérêts, impôts, capex et NWC). Exit à <strong>${fois(mSortie, 0)}</strong> l'EBITDA.</p>
      <p>Calcule : equity investie, net debt à l\'exit, equity à l\'exit, MOIC et IRR.</p>`,
    champs: [
      champ('eq0', 'Equity investie', eq0, 'M€', 0.6),
      champ('d5', 'Net debt à l\'exit', d5, 'M€', 0.6),
      champ('eq5', 'Equity à l\'exit', eq5, 'M€', 1.1),
      champ('moic', 'MOIC', moic, 'x', 0.11, 1),
      champ('tri', 'IRR', t * 100, '%', 2.1, 0),
    ],
    explication: tableau(['Étape', 'Calcul', 'M€'], [
      ['EV d\'entrée', `${e0} × ${m}`, nombre(ve0, 0)],
      ['Dette d\'acquisition', `${e0} × ${leverage}`, nombre(d0, 0)],
      ['!Equity investie', `${nombre(ve0, 0)} − ${nombre(d0, 0)}`, nombre(eq0, 0)],
      ['Net debt à l\'exit', `${nombre(d0, 0)} − ${nombre(cash, 0)}`, nombre(d5, 0) + (d5 < 0 ? ' (cash nette)' : '')],
      ['EV d\'exit', `${nombre(e5)} × ${mSortie}`, nombre(mSortie * e5)],
      ['!Equity à l\'exit', `${nombre(mSortie * e5)} − (${nombre(d5, 0)})`, nombre(eq5)],
      ['MOIC', `${nombre(eq5)} / ${nombre(eq0, 0)}`, fois(moic, 2)],
      ['!IRR', `${nombre(moic, 2)}^(1/5) − 1`, pct(t)],
    ]) + tableMultiples(5),
    conseil: 'En paper LBO : écris une colonne « entrée », une colonne « sortie », arrondis franchement et annonce chaque résultat intermédiaire à voix haute. L\'interviewer note ta méthode autant que le chiffre.',
  };
}

// ---------------------------------------------------------------------------------------------------
function creationValeur(r) {
  const e0 = r.entre(8, 30, 1);
  const mIn = r.choix([7, 8, 9, 10, 11]);
  const e5 = arrondi(e0 * r.entre(1.2, 1.9, 0.05));
  const mOut = mIn + r.choix([-1, 0, 0, 0.5, 1, 1.5]);
  const d0 = arrondi(e0 * r.choix([3, 3.5, 4, 4.5, 5]));
  const d5 = arrondi(d0 * r.entre(0.3, 0.8, 0.05));
  const croissance = arrondi((e5 - e0) * mIn, 0.01);
  const multiple = arrondi((mOut - mIn) * e5, 0.01);
  const delev = arrondi(d0 - d5, 0.01);
  const eq0 = e0 * mIn - d0, eq5 = e5 * mOut - d5;
  return {
    type: 'calcul', titre: 'Value creation bridge',
    enonce: `<p>Entrée : EBITDA ${meur(e0, 0)}, multiple ${fois(mIn)}, net debt ${meur(d0)}. Sortie (5 ans) : EBITDA ${meur(e5)}, multiple ${fois(mOut)}, net debt ${meur(d5)}.</p>
      <p>Décompose le gain en equity : part due à la croissance de l'EBITDA, au multiple et au deleveraging.</p>`,
    champs: [champ('croissance', 'EBITDA growth', croissance, 'M€', 0.3), champ('multiple', 'Multiple expansion', multiple, 'M€', 0.3), champ('delev', 'Deleveraging', delev, 'M€', 0.3)],
    explication: tableau(['Value creation lever', 'Calcul', 'M€'], [
      ['EBITDA growth', `(${nombre(e5)} − ${nombre(e0, 0)}) × ${nombre(mIn)} (multiple d'entrée)`, nombre(croissance)],
      ['Multiple expansion', `(${nombre(mOut)} − ${nombre(mIn)}) × ${nombre(e5)} (EBITDA de sortie)`, signe(multiple)],
      ['Deleveraging', `${nombre(d0)} − ${nombre(d5)}`, nombre(delev)],
      ['!Gain total en equity', `${nombre(eq5)} − ${nombre(eq0)}`, nombre(eq5 - eq0)],
    ]) + `<p>Part de la croissance opérationnelle : ${pct(croissance / (eq5 - eq0), 0)} du gain. Les comités préfèrent un gain porté par l'EBITDA (maîtrisé) plutôt que par le multiple (dépend du marché à l\'exit).</p>`,
    conseil: 'Convention à annoncer : croissance valorisée au entry multiple, multiple expansion calculé sur l\'EBITDA de sortie. D\'autres conventions existent : dis laquelle tu prends.',
  };
}

// ---------------------------------------------------------------------------------------------------
function covenant(r) {
  const e = r.entre(10, 50, 0.5);
  const lev = r.entre(3, 5.5, 0.1);
  const dn = arrondi(e * lev);
  const lmax = arrondi(lev + r.entre(0.5, 1.5, 0.25), 0.25);
  const leverage = arrondi(dn / e, 0.01);
  const baisse = 1 - dn / (lmax * e);
  return {
    type: 'calcul', titre: 'Leverage covenant : quel headroom ?',
    enonce: `<p>Une participation affiche un EBITDA LTM de ${meur(e)} et une net debt de ${meur(dn)}. Le contrat de crédit impose un leverage (net debt / EBITDA) maximal de ${fois(lmax, 2)}.</p>
      <p>1) Leverage actuel ? 2) De combien (en %) l'EBITDA peut-il baisser avant le bris du covenant, à dette constante ?</p>`,
    champs: [champ('leverage', 'Leverage actuel', leverage, 'x', 0.06, 2), champ('baisse', 'Baisse d\'EBITDA tolérée', baisse * 100, '%', 1.1, 0)],
    explication: `<p>Leverage = ${nombre(dn)} / ${nombre(e)} = <strong>${fois(leverage, 2)}</strong>.</p>
      <p>EBITDA minimum = dette / leverage max = ${nombre(dn)} / ${nombre(lmax, 2)} = ${meur(dn / lmax, 2)} ; baisse tolérée = 1 − ${nombre(dn / lmax, 2)} / ${nombre(e)} = <strong>${pct(baisse, 0)}</strong> (c'est le « headroom »).</p>
      <p>${baisse < 0.15 ? 'Marge faible : il faut anticiper (plan d\'action, discussion avec les prêteurs, equity cure possible).' : 'Marge confortable : les prêteurs demandent souvent 25 à 35 % de headroom à la signature.'}</p>`,
    conseil: 'Si on te demande « que faire avant un bris de covenant ? » : anticiper, parler aux prêteurs (waiver, reset), equity cure, plan de cash.',
  };
}

// ---------------------------------------------------------------------------------------------------
function sourcesEmplois(r) {
  const e = r.entre(8, 40, 1);
  const m = r.entre(7, 12, 0.5);
  const frais = r.choix([0.02, 0.025, 0.03, 0.035]);
  const lev = r.entre(3, Math.min(5.5, m - 3), 0.5);
  const ve = arrondi(e * m);
  const emplois = arrondi(ve * (1 + frais));
  const dette = arrondi(e * lev);
  const equity = arrondi(emplois - dette);
  const managers = arrondi(equity * r.entre(0.02, 0.08, 0.01));
  const fonds = arrondi(equity - managers);
  return {
    type: 'calcul', titre: 'Sources & Uses',
    enonce: `<p>Rachat en cash-free / debt-free d'une société à ${fois(m)} un EBITDA de ${meur(e, 0)}. Frais de transaction : ${pct(frais)} de l’Enterprise Value. Dette d'acquisition : ${fois(lev)} l'EBITDA. Les managers réinvestissent ${meur(managers)}.</p>
      <p>1) Total Uses ? 2) Equity totale ? 3) Part de l\'equity dans les Sources ? 4) Equity cheque du fonds ?</p>`,
    champs: [
      champ('emplois', 'Total Uses', emplois, 'M€', 0.3),
      champ('equity', 'Equity totale', equity, 'M€', 0.3),
      champ('part', 'Part de l\'equity', equity / emplois * 100, '%', 1.1, 0),
      champ('fonds', 'Equity cheque du fonds', fonds, 'M€', 0.3),
    ],
    explication: tableau(['Uses', 'M€', 'Sources', 'M€'], [
      ['Enterprise Value (Equity Value + refinancement de la dette)', nombre(ve), 'Dette d\'acquisition', nombre(dette)],
      ['Frais de transaction', nombre(emplois - ve), 'Equity du fonds', nombre(fonds)],
      ['', '', 'Réinvestissement des managers', nombre(managers)],
      ['!Total', nombre(emplois), 'Total', nombre(emplois)],
    ]) + `<p>Equity = ${pct(equity / emplois, 0)} des Sources. En mid-cap, on voit souvent 40 à 60 % d’equity selon la qualité de l'actif et le marché de la dette.</p>`,
    conseil: 'Le tableau Sources & Uses doit toujours être équilibré : c\'est ton contrôle de cohérence.',
  };
}

// ---------------------------------------------------------------------------------------------------
function managementPackage(r) {
  const total = r.entre(50, 200, 5);
  const part = r.choix([0.1, 0.12, 0.15]);
  const mise = arrondi(total * r.choix([0.015, 0.02, 0.025]), 0.01);
  const ordinaires = mise / part;
  const oc = arrondi(total - ordinaires, 0.01);
  const coupon = r.choix([0.08, 0.09, 0.1, 0.12]);
  const sortie = arrondi(total * r.entre(2, 3.5, 0.1), 0.5);
  const valOc = arrondi(oc * (1 + coupon) ** 5, 0.01);
  const valOrd = sortie - valOc;
  const moicMgmt = part * valOrd / mise;
  const fondsInvesti = total - mise;
  const moicFonds = (valOc + (1 - part) * valOrd) / fondsInvesti;
  const envie = (fondsInvesti / (1 - part)) / (mise / part);
  return {
    type: 'calcul', titre: 'Management package : l\'effet sweet equity',
    enonce: `<p>Equity totale de la holding : ${meur(total, 0)}. Les managers investissent ${meur(mise, 2)} et reçoivent ${pct(part, 0)} des actions ordinaires. Le fonds investit le reste : des actions ordinaires (${pct(1 - part, 0)}) et ${meur(oc, 2)} d'obligations convertibles à ${pct(coupon, 0)} capitalisés (PIK).</p>
      <p>Exit au bout de 5 ans : equity valorisée ${meur(sortie)}. Calcule la valeur des OC, le MOIC des managers et le MOIC du fonds.</p>`,
    champs: [champ('oc', 'Valeur des OC à l\'exit', valOc, 'M€', 0.6), champ('mgmt', 'MOIC des managers', moicMgmt, 'x', 0.21, 1), champ('fonds', 'MOIC du fonds', moicFonds, 'x', 0.06, 2)],
    explication: `<p>OC = ${nombre(oc, 2)} × (1 + ${pct(coupon, 0)})^5 = <strong>${meur(valOc, 2)}</strong> (remboursées en priorité).</p>
      <p>Reste pour les actions ordinaires : ${nombre(sortie)} − ${nombre(valOc, 2)} = ${meur(valOrd, 2)}. Managers : ${pct(part, 0)} × ${nombre(valOrd, 2)} = ${meur(part * valOrd, 2)}, soit un MOIC de <strong>${fois(moicMgmt, 1)}</strong>.</p>
      <p>Fonds : (${nombre(valOc, 2)} + ${pct(1 - part, 0)} × ${nombre(valOrd, 2)}) / ${nombre(fondsInvesti, 2)} = <strong>${fois(moicFonds, 2)}</strong>.</p>
      <p>Envy ratio = (prix payé par le fonds pour 1 % des ordinaires, OC comprises) / (prix payé par les managers) ≈ <strong>${fois(envie, 1)}</strong>. Les managers gagnent beaucoup plus en multiple car le fonds porte la partie « obligataire » du risque.</p>`,
    conseil: 'Si l’IRR est faible, les OC absorbent une grande partie de la valeur et les managers gagnent peu : le package les pousse donc à créer de la valeur au-delà du coupon.',
  };
}

// ---------------------------------------------------------------------------------------------------
function carried(r) {
  const capital = r.choix([200, 250, 300, 400, 500, 600, 800]);
  const n = r.entier(4, 7);
  const moic = r.entre(1.3, 2.6, 0.05);
  const produits = arrondi(capital * moic, 1);
  const profit = produits - capital;
  const hurdle = capital * (1.08 ** n - 1);
  const carry = profit <= hurdle ? 0 : profit < 1.25 * hurdle ? profit - hurdle : 0.2 * profit;
  const cas = profit <= hurdle ? 'Le profit ne dépasse pas le hurdle : pas de carried.' : profit < 1.25 * hurdle ? 'Le profit dépasse le hurdle mais le catch-up n\'est pas complet : le GP reçoit tout ce qui dépasse le hurdle.' : 'Le catch-up est complet : le GP reçoit 20 % de tout le profit.';
  return {
    type: 'calcul', titre: 'Carried interest : la cascade (waterfall)',
    enonce: `<p>Fonds de ${meur(capital, 0)}, tout appelé au départ. Après ${n} ans, il distribue ${meur(produits, 0)} au total. Waterfall européen : hurdle de 8 % par an (composé), catch-up à 100 % pour le GP, carried de 20 %. (Simplification : pas de frais de gestion.)</p>
      <p>1) Montant du hurdle (rendement préférentiel des LP) ? 2) Carried du GP ?</p>`,
    champs: [champ('hurdle', 'Hurdle', hurdle, 'M€', 1.6, 0), champ('carry', 'Carried du GP', carry, 'M€', 1.6, 0)],
    explication: tableau(['Étape', 'M€'], [
      ['1. Remboursement du capital aux LP', nombre(capital, 0)],
      [`2. Hurdle : ${nombre(capital, 0)} × (1,08^${n} − 1)`, nombre(hurdle, 0)],
      ['3. Catch-up du GP (jusqu\'à 20 % du profit)', nombre(Math.max(0, Math.min(profit - hurdle, hurdle / 4)), 0)],
      ['4. Partage 80 / 20 du reste', nombre(Math.max(0, profit - 1.25 * hurdle), 0)],
      ['!Carried total du GP', nombre(carry, 0)],
    ]) + `<p>Profit = ${nombre(profit, 0)}. ${cas} Le catch-up est complet quand le profit atteint 1,25 × hurdle = ${nombre(1.25 * hurdle, 0)} (car le GP doit rattraper 20 % de la somme hurdle + catch-up).</p>`,
    conseil: 'Différence européen / américain : en européen, le carried n\'est payé qu\'après remboursement de tout le capital du fonds ; en américain, deal par deal (plus favorable au GP, avec clawback).',
  };
}

// ---------------------------------------------------------------------------------------------------
function dividendRecap(r) {
  const eq0 = r.entre(50, 150, 5);
  const div = arrondi(eq0 * r.entre(0.3, 0.6, 0.05));
  const base = arrondi(eq0 * r.entre(2.0, 3.0, 0.1));
  const avec = arrondi(base - div * 1.15);
  const moicAvec = (div + avec) / eq0;
  const triAvec = tri([-eq0, 0, 0, div, 0, avec]);
  const triSans = (base / eq0) ** (1 / 5) - 1;
  return {
    type: 'calcul', titre: 'Dividend recap : effet sur l’IRR et le multiple',
    enonce: `<p>Le fonds a investi ${meur(eq0, 0)} d’equity. Sans opération, il revendrait dans 5 ans pour ${meur(base)} d’equity.</p>
      <p>Variante : à la fin de l'année 3, la société s'endette davantage pour verser un dividende de ${meur(div)} au fonds ; à l\'exit (année 5), l\'equity ne vaut plus que ${meur(avec)} (dette supplémentaire et intérêts).</p>
      <p>Calcule le MOIC et l’IRR avec le dividend recap, puis l’IRR sans.</p>`,
    champs: [champ('moic', 'MOIC avec recap', moicAvec, 'x', 0.06, 2), champ('tria', 'IRR avec recap', triAvec * 100, '%', 1.1, 1), champ('tris', 'IRR sans recap', triSans * 100, '%', 1.1, 1)],
    explication: `<p>Avec : flux −${nombre(eq0, 0)} (an 0), +${nombre(div)} (an 3), +${nombre(avec)} (an 5). MOIC = (${nombre(div)} + ${nombre(avec)}) / ${nombre(eq0, 0)} = <strong>${fois(moicAvec, 2)}</strong> ; IRR = <strong>${pct(triAvec)}</strong> (calcul itératif).</p>
      <p>Sans : MOIC ${fois(base / eq0, 2)}, IRR = <strong>${pct(triSans)}</strong>.</p>
      <p>Le recap ${triAvec > triSans ? 'améliore l’IRR (l\'argent revient plus tôt)' : 'n\'améliore pas l’IRR ici'} mais ${moicAvec < base / eq0 ? 'baisse le multiple (le coût de la dette supplémentaire est perdu)' : 'ne change presque pas le multiple'}. Il augmente aussi le DPI des LP, très recherché quand les exits sont rares.</p>`,
    conseil: 'Phrase clé : « Un dividend recap optimise l’IRR et le DPI, pas le multiple ; il augmente le risque financier de la société. »',
  };
}

// ---------------------------------------------------------------------------------------------------
function comparables(r) {
  const multiples = Array.from({ length: 5 }, () => r.entre(6, 14, 0.1));
  const med = mediane(multiples);
  const e = r.entre(5, 30);
  const ve = arrondi(med * e, 0.01);
  const dn = arrondi(ve * r.entre(0.2, 0.45, 0.01));
  const titres = arrondi(ve - dn, 0.01);
  const noms = ['A', 'B', 'C', 'D', 'E'];
  return {
    type: 'calcul', titre: 'Valuation par les trading comparables',
    enonce: `<p>Multiples EV / EBITDA de 5 sociétés comparables : ${tableau(noms.map((n) => `Comparable ${n}`), [multiples.map((x) => fois(x))], 'compact')}</p>
      <p>La cible a un EBITDA de ${meur(e)} et une net debt de ${meur(dn)}. En retenant la médiane : 1) multiple ? 2) Enterprise Value ? 3) Equity Value ?</p>`,
    champs: [champ('med', 'Multiple médian', med, 'x', 0.06, 1), champ('ve', 'Enterprise Value', ve, 'M€', 0.4), champ('titres', 'Equity Value', titres, 'M€', 0.4)],
    explication: `<p>Multiples triés : ${[...multiples].sort((a, b) => a - b).map((x) => nombre(x)).join(' ; ')} → médiane <strong>${fois(med)}</strong>.</p>
      <p>EV = ${nombre(med)} × ${nombre(e)} = <strong>${meur(ve)}</strong> ; titres = ${nombre(ve)} − ${nombre(dn)} = <strong>${meur(titres)}</strong>.</p>
      <p>On préfère la médiane à la moyenne (moins sensible aux extrêmes). Discute ensuite d'une éventuelle décote (taille, liquidité, croissance plus faible) ou prime de contrôle.</p>`,
    conseil: 'Quand on te demande « quels comparables ? » : même activité, même géographie, taille et croissance proches, et des multiples calculés de façon homogène (IFRS 16, LTM vs N+1).',
  };
}

// ---------------------------------------------------------------------------------------------------
function capacitePaiement(r) {
  const e0 = r.entre(10, 30, 1);
  const e5 = arrondi(e0 * r.entre(1.3, 1.8, 0.05));
  const mSortie = r.choix([8, 9, 10, 11]);
  const lev = r.choix([3.5, 4, 4.5, 5]);
  const d0 = e0 * lev;
  const d5 = arrondi(d0 * r.entre(0.35, 0.7, 0.05));
  const cible = r.choix([2.5, 3]);
  const eqMax = (mSortie * e5 - d5) / cible;
  const veMax = eqMax + d0;
  const mult = veMax / e0;
  return {
    type: 'calcul', titre: 'Combien le fonds peut-il payer ?',
    enonce: `<p>EBITDA actuel ${meur(e0, 0)}, attendu à ${meur(e5)} dans 5 ans. Exit prudente à ${fois(mSortie, 0)}. Dette d'acquisition possible : ${fois(lev)} l'EBITDA actuel ; net debt attendue à l\'exit : ${meur(d5)}. Le fonds vise ${fois(cible)} sa mise (frais ignorés).</p>
      <p>1) Equity maximum ? 2) Enterprise Value maximum ? 3) Multiple d'entrée correspondant ?</p>`,
    champs: [champ('eq', 'Equity maximum', eqMax, 'M€', 0.6), champ('ve', 'EV maximum', veMax, 'M€', 0.6), champ('mult', 'Entry multiple', mult, 'x', 0.11, 1)],
    explication: `<p>Equity à l\'exit = ${mSortie} × ${nombre(e5)} − ${nombre(d5)} = ${meur(mSortie * e5 - d5)}. Pour faire ${fois(cible)} : mise maximum = ${nombre(mSortie * e5 - d5)} / ${nombre(cible)} = <strong>${meur(eqMax)}</strong>.</p>
      <p>EV maximum = equity + dette = ${nombre(eqMax)} + ${nombre(d0)} = <strong>${meur(veMax)}</strong>, soit <strong>${fois(mult)}</strong> l'EBITDA actuel.</p>
      <p>C'est la logique de la « valorisation LBO » : on part du rendement exigé pour trouver le prix maximum.</p>`,
    conseil: 'Si le vendeur demande plus que ce prix maximum, trois options : renoncer, structurer (earn-out, réinvestissement du vendeur, vendor loan) ou trouver d’autres value creation levers.',
  };
}

// ---------------------------------------------------------------------------------------------------
function sensibiliteSortie(r) {
  const eq0 = r.entre(40, 150, 5);
  const e5 = r.entre(12, 45, 0.5);
  const d5 = arrondi(e5 * r.entre(1, 3, 0.1));
  const cibleTri = r.choix([0.2, 0.25]);
  const besoin = eq0 * (1 + cibleTri) ** 5;
  const m = (besoin + d5) / e5;
  return {
    type: 'calcul', titre: 'Quel exit multiple pour atteindre l\'IRR cible ?',
    enonce: `<p>Equity investie : ${meur(eq0, 0)}. Dans 5 ans : EBITDA ${meur(e5)}, net debt ${meur(d5)}. Le fonds vise un IRR de ${pct(cibleTri, 0)}.</p><p>Quel exit multiple minimum faut-il ?</p>`,
    champs: [champ('m', 'Exit multiple', m, 'x', 0.11, 1)],
    explication: `<p>Equity nécessaire = ${nombre(eq0, 0)} × (1 + ${pct(cibleTri, 0)})^5 = ${meur(besoin)}. EV nécessaire = ${nombre(besoin)} + ${nombre(d5)} = ${meur(besoin + d5)}. Multiple = ${nombre(besoin + d5)} / ${nombre(e5)} = <strong>${fois(m)}</strong>.</p>
      <p>Compare-le au multiple d'entrée : si l'on a besoin d'une hausse du multiple pour atteindre l’IRR, le dossier dépend du marché à l\'exit (risque).</p>`,
    conseil: 'Les comités demandent souvent : « À quel exit multiple perd-on de l\'argent ? Et pour faire 20 % ? » Sache refaire le calcul à l\'envers.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Étude de cas complète : faut-il investir ?
// ---------------------------------------------------------------------------------------------------
const PARTICULARITES = [
  { texte: 'Le fondateur (62 ans) dirige seul la société et souhaite passer la main d\'ici 3 ans.', type: 'risque', resume: 'dépendance au fondateur (succession à organiser)', mots: ['fondateur', 'succession', 'key man', 'homme cle', 'management'] },
  { texte: 'Le premier client représente 24 % du revenue (contrat renouvelé chaque année).', type: 'risque', resume: 'concentration client (24 % du revenue)', mots: ['concentration', 'client'] },
  { texte: 'Le marché est très fragmenté : plus de 300 acteurs régionaux, souvent familiaux.', type: 'force', resume: 'marché fragmenté, idéal pour un buy-and-build', mots: ['fragment', 'build', 'acquisition', 'consolid'] },
  { texte: 'La société n\'a pas de DAF ni de reporting mensuel.', type: 'risque', resume: 'fonction finance à professionnaliser (reporting)', mots: ['daf', 'reporting', 'finance'] },
  { texte: '70 % du revenue est récurrent (contrats pluriannuels).', type: 'force', resume: 'revenus récurrents (70 % sous contrat)', mots: ['recurren', 'contrat', 'visibilit'] },
  { texte: 'Un concurrent européen vient d\'entrer sur le marché français avec des prix agressifs.', type: 'risque', resume: 'pression concurrentielle sur les prix', mots: ['concurren', 'prix'] },
  { texte: 'La société a déjà réussi deux acquisitions bien intégrées.', type: 'force', resume: 'savoir-faire d\'intégration d\'acquisitions', mots: ['acquisition', 'integration', 'build'] },
  { texte: 'Un tiers des ventes est réalisé à l\'export, en dollars.', type: 'risque', resume: 'exposition au dollar', mots: ['change', 'dollar', 'export'] },
];
const LEVIER_SECTEUR = { saas: 5.5, sante: 5, tic: 5, education: 5, distribution: 4, services: 4.5, industrie: 3.5, agro: 3.5 };

function casPe(r) {
  const s = r.choix(SECTEURS);
  const soc = societe(r, s);
  const e0 = r.entre(8, 35);
  const marge = r.entre(s.marge[0], s.marge[1], 0.005);
  const ca0 = arrondi(e0 / marge);
  const g = r.entre(s.crois[0], s.crois[1], 0.005);
  const dMarge = r.entre(0, 0.005, 0.001);
  const conv = r.entre(0.35, 0.55, 0.01);
  const annees = [1, 2, 3, 4, 5].map((t) => {
    const ca = arrondi(ca0 * (1 + g) ** t);
    const eb = arrondi(ca * (marge + dMarge * t));
    return { t, ca, eb, cash: arrondi(eb * conv) };
  });
  const e5 = annees[4].eb;
  const mIn = r.entre(s.mult[0], s.mult[1], 0.5);
  const lev = Math.min(LEVIER_SECTEUR[s.id] + r.choix([-0.5, 0, 0.5]), mIn - 3);
  const ve0 = arrondi(e0 * mIn, 0.01);
  const frais = arrondi(ve0 * 0.03, 0.01);
  const d0 = arrondi(e0 * lev, 0.01);
  const eq0 = arrondi(ve0 + frais - d0, 0.01);
  const cumul = annees.reduce((x, a) => x + a.cash, 0);
  const d5 = arrondi(d0 - cumul, 0.01);
  const mOut = mIn - r.choix([0, 0, 0.5, 1]);
  const eq5 = arrondi(mOut * e5 - d5, 0.01);
  const moic = eq5 / eq0;
  const t = moic ** (1 / 5) - 1;
  const croissance = arrondi((e5 - e0) * mIn, 0.01);
  const effetMultiple = arrondi((mOut - mIn) * e5, 0.01);
  const delev = arrondi(d0 - d5, 0.01);
  const particularites = r.plusieurs(PARTICULARITES, 2);
  const decision = t >= 0.22 ? 0 : t >= 0.17 ? 1 : 2;
  // Prix maximum pour atteindre 20 % d'IRR (même dette, même exit) : base de la contre-proposition
  const eqMax = eq5 / 1.2 ** 5;
  const veMax = (eqMax + d0) / 1.03;
  const forces = [...s.forces.slice(0, 2), ...particularites.filter((p) => p.type === 'force').map((p) => p.resume)];
  const risques = [...s.risques.slice(0, 2), ...particularites.filter((p) => p.type === 'risque').map((p) => p.resume)];

  const contexte = `<p><strong>${soc.nom}</strong> (${soc.ville}, ${soc.effectif} salariés) ${s.activite}. Le fondateur cède 100 % du capital ; un fonds mid-cap étudie un LBO.</p>
    <ul>${particularites.map((p) => `<li>${p.texte}</li>`).join('')}</ul>
    ${tableau(['M€', 'LTM', ...annees.map((a) => `An ${a.t}`)], [
      ['Revenue', nombre(ca0), ...annees.map((a) => nombre(a.ca))],
      ['EBITDA', nombre(e0), ...annees.map((a) => nombre(a.eb))],
      ['EBITDA margin', pct(e0 / ca0), ...annees.map((a) => pct(a.eb / a.ca))],
      ['Cash disponible pour la dette*', '—', ...annees.map((a) => nombre(a.cash))],
    ])}
    <p class="note">* après intérêts, impôts, capex et variation de NWC (business plan du management, revu par la DD).</p>
    <h4>Termes du deal</h4><p>Prix : ${fois(mIn)} l'EBITDA LTM. Frais : 3 % de la EV. Dette d'acquisition (unitranche) : ${fois(lev)} l'EBITDA LTM. Exit à la fin de l'année 5 à ${fois(mOut)} l'EBITDA (hypothèse prudente du fonds). Le fonds vise un IRR d'au moins 20 % et 2,5x.</p>`;

  return {
    type: 'cas', titre: `Étude de cas PE : ${soc.nom} (${s.court})`, duree: 25 * 60,
    contexte,
    etapes: [
      { type: 'calcul', titre: '1. Entry EV et equity', enonce: '<p>Calcule l’Enterprise Value d\'entrée puis l\'equity à investir (frais compris).</p>',
        champs: [champ('ve', 'Enterprise Value', ve0, 'M€', 0.3), champ('eq0', 'Equity investie', eq0, 'M€', 0.4)],
        explication: `<p>EV = ${nombre(e0)} × ${nombre(mIn)} = <strong>${meur(ve0)}</strong>. Emplois = EV + frais (${nombre(frais)}) = ${meur(ve0 + frais)}. Dette = ${nombre(e0)} × ${nombre(lev)} = ${meur(d0)}. Equity = <strong>${meur(eq0)}</strong> (${pct(eq0 / (ve0 + frais), 0)} des Sources).</p>` },
      { type: 'calcul', titre: '2. Net debt à l\'exit', enonce: '<p>En affectant tout le cash disponible au remboursement, quelle net debt à la fin de l\'année 5 ?</p>',
        champs: [champ('d5', 'Net debt à l\'exit', d5, 'M€', 0.4)],
        explication: `<p>Cash cumulé = ${annees.map((a) => nombre(a.cash)).join(' + ')} = ${meur(cumul)}. Net debt = ${nombre(d0)} − ${nombre(cumul)} = <strong>${meur(d5)}</strong>${d5 < 0 ? ' (cash nette)' : ''}.</p>` },
      { type: 'calcul', titre: '3. Returns', enonce: '<p>Calcule les equity à l\'exit, le MOIC et l’IRR.</p>',
        champs: [champ('eq5', 'Equity à l\'exit', eq5, 'M€', 0.6), champ('moic', 'MOIC', moic, 'x', 0.06, 2), champ('tri', 'IRR', t * 100, '%', 1.1, 1)],
        explication: `<p>EV d\'exit = ${nombre(mOut)} × ${nombre(e5)} = ${meur(mOut * e5)} ; equity = ${nombre(mOut * e5)} − ${nombre(d5)} = <strong>${meur(eq5)}</strong>. MOIC = ${nombre(eq5)} / ${nombre(eq0)} = <strong>${fois(moic, 2)}</strong> ; IRR = <strong>${pct(t)}</strong>.</p>${tableMultiples(5)}` },
      { type: 'calcul', titre: '4. Value creation bridge', enonce: '<p>Décompose le gain : EBITDA growth (au entry multiple), multiple expansion (sur l\'EBITDA de sortie), deleveraging.</p>',
        champs: [champ('c', 'EBITDA growth', croissance, 'M€', 0.4), champ('m', 'Multiple expansion', effetMultiple, 'M€', 0.4), champ('d', 'Deleveraging', delev, 'M€', 0.4)],
        explication: tableau(['Value creation lever', 'M€'], [
          ['EBITDA growth', nombre(croissance)], ['Multiple expansion', signe(effetMultiple)], ['Deleveraging', nombre(delev)], ['Frais (perdus)', `−${nombre(frais)}`],
          ['!Gain en equity', nombre(eq5 - eq0)],
        ]) + `<p>${effetMultiple < 0 ? 'Le fonds a pris une baisse de multiple dans son scénario : le rendement repose sur l\'EBITDA et le deleveraging, ce qui est prudent.' : 'Le rendement ne dépend pas d\'une hausse du multiple : c\'est un bon signe.'}</p>` },
      { type: 'ouverte', titre: '5. Ta recommandation au comité', duree: 90,
        enonce: `<p>Avec un IRR de ${pct(t)} et un multiple de ${fois(moic, 2)} (cible du fonds : 20 % et 2,5x), que recommandes-tu au comité d'investissement, et à quelles conditions ?</p>`,
        reponse: `<p><strong>${['Go : présenter le dossier au comité', 'Go sous conditions : renégocier le prix ou structurer', 'No-go au prix demandé'][decision]}.</strong> ${decision === 0 ? 'Le rendement dépasse nettement la cible, sans hausse de multiple : on peut présenter le dossier, en traitant les risques identifiés dans la documentation (garanties, management package).' : decision === 1 ? 'Le rendement est proche de la cible : le dossier se défend si l\'on améliore le prix d\'entrée ou si l\'on partage le risque avec le vendeur (earn-out, réinvestissement, vendor loan).' : 'Le rendement est trop loin de la cible : au prix demandé, le dossier ne passe pas.'} Monter le leverage à 7x pour « fabriquer » de l’IRR est un piège : risque de défaut, covenants intenables, et les prêteurs ne suivraient pas.</p>${decision > 0 ? `<p><strong>Contre-proposition chiffrée :</strong> pour 20 % d'IRR, l'equity investie ne doit pas dépasser ${nombre(eq5)} / 1,2⁵ = ${meur(eqMax)}. Avec ${meur(d0)} de dette et 3 % de frais, l'EV maximum est (${nombre(eqMax)} + ${nombre(d0)}) / 1,03 = <strong>${meur(veMax)}</strong>, soit <strong>${fois(veMax / e0)}</strong> l'EBITDA LTM au lieu de ${fois(mIn)}.</p>` : ''}`,
        points: [
          { t: 'Recommandation claire (go, go sous conditions ou no-go)', mots: ['go', 'recommand', 'investir', 'renonc', 'refus'] },
          { t: 'Comparaison chiffrée à la cible (20 % / 2,5x)', mots: ['cible', '20 %', '2,5', 'irr', 'moic'] },
          decision === 0 ? { t: 'Risques à traiter (DD, garanties, management package)', mots: ['risque', 'garantie', 'management package', 'due diligence', 'dd'] }
            : decision === 1 ? { t: 'Leviers : prix, earn-out, rollover, vendor loan', mots: ['prix', 'earn', 'rollover', 'reinvest', 'vendor loan', 'renegoc'] }
            : { t: 'Contre-proposition : prix plus bas ou renoncer', mots: ['prix', 'baisse', 'renegoc', 'renonc', 'offre'] },
          { t: 'Ne pas « fabriquer » l’IRR avec plus de dette', mots: ['dette', 'levier', 'leverage', 'covenant'] },
        ],
        conseil: 'Le comité attend une décision, pas une description : « Je recommande…, parce que…, à condition que… ».' },
      { type: 'ouverte', titre: '6. Ton investment thesis en 2 minutes', duree: 150,
        enonce: '<p>Le partner : « Pitch-moi ce dossier en 2 minutes : pourquoi investir, quels risques, comment on crée de la valeur. »</p>',
        reponse: `<p><strong>Pourquoi investir :</strong> ${forces.join(' ; ')}.</p>
          <p><strong>Création de valeur :</strong> ${s.leverages.join(' ; ')}. Dans le business plan, l'EBITDA passe de ${meur(e0)} à ${meur(e5)}.</p>
          <p><strong>Risques et parades :</strong> ${risques.join(' ; ')} — à traiter en due diligence (commerciale, financière) et dans la structuration (management package, garanties, earn-out si besoin).</p>
          <p><strong>Rendement :</strong> ${fois(moic, 2)} et ${pct(t)} d’IRR sans hausse de multiple${t < 0.2 ? ', en dessous de la cible : à renégocier' : ''}. Sortie possible vers un industriel du secteur ou un fonds plus grand (LBO secondaire).</p>`,
        points: [
          { t: 'Marché et positionnement (forces)', mots: ['marche', 'position', 'leader', 'croissance', 'recurren', 'barriere'] },
          { t: 'Value creation levers', mots: ['build', 'acquisition', 'prix', 'lever', 'levier', 'export', 'expansion', 'digital', 'croissance externe'] },
          { t: 'Risques principaux', mots: ['risque', ...s.motsRisques, ...particularites.filter((p) => p.type === 'risque').flatMap((p) => p.mots)] },
          { t: 'Parades (DD, structuration, management)', mots: ['due diligence', 'dd', 'garantie', 'earn', 'management package', 'mitig', 'parade'] },
          { t: 'Rendement chiffré (IRR / MOIC) et sortie', mots: ['tri', 'moic', 'multiple', 'sortie', 'irr'] },
        ],
        conseil: 'Structure gagnante : 1 phrase de conclusion (« j\'irais / je n\'irais pas, parce que… »), 3 arguments, 2 risques avec leur parade, le rendement, l\'exit.' },
    ],
    conseil: 'En entretien PE, on attend un avis tranché et argumenté, pas seulement des calculs justes.',
  };
}

export const GENERATEURS_PE = [
  { id: 'gen-pe-tri', m: 'pe', theme: 'rendement', niveau: 1, titre: 'IRR et multiple de tête', creer: triRapide },
  { id: 'gen-pe-paper', m: 'pe', theme: 'rendement', niveau: 2, titre: 'Paper LBO sans calculatrice', creer: paperLbo },
  { id: 'gen-pe-pont', m: 'pe', theme: 'lbo', niveau: 2, titre: 'Value creation bridge', creer: creationValeur },
  { id: 'gen-pe-covenant', m: 'pe', theme: 'dette', niveau: 1, titre: 'Leverage covenant et headroom', creer: covenant },
  { id: 'gen-pe-emplois', m: 'pe', theme: 'lbo', niveau: 1, titre: 'Sources & Uses', creer: sourcesEmplois },
  { id: 'gen-pe-mip', m: 'pe', theme: 'mgmt', niveau: 3, titre: 'Management package (sweet equity)', creer: managementPackage },
  { id: 'gen-pe-carry', m: 'pe', theme: 'metier', niveau: 3, titre: 'Carried interest (waterfall)', creer: carried },
  { id: 'gen-pe-recap', m: 'pe', theme: 'sortie', niveau: 2, titre: 'Dividend recap', creer: dividendRecap },
  { id: 'gen-pe-comps', m: 'pe', theme: 'valo', niveau: 1, titre: 'Valuation par les trading comparables', creer: comparables },
  { id: 'gen-pe-capacite', m: 'pe', theme: 'valo', niveau: 2, titre: 'Ability to pay (valorisation LBO)', creer: capacitePaiement },
  { id: 'gen-pe-sensib', m: 'pe', theme: 'rendement', niveau: 2, titre: 'Exit multiple pour l\'IRR cible', creer: sensibiliteSortie },
];

export const CAS_PE = { id: 'cas-pe-lbo', m: 'pe', theme: 'cas', niveau: 3, titre: 'Étude de cas : faut-il investir ?', creer: casPe };
