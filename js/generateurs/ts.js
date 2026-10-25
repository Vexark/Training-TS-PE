// Exercices de Transaction Services générés au hasard : chiffres différents à chaque fois, corrigé détaillé.
import { arrondi, meur, nombre, pct, fois, moyenne } from '../outils.js';
import { tableau, champ, signe, MOIS, MOIS_LONGS } from './commun.js';
import { SECTEURS, societe } from './secteurs.js';

// ---------------------------------------------------------------------------------------------------
// Bibliothèque de adjustments d'EBITDA. effet : +1 on réintègre, −1 on retire, 0 = piège (pas d'ajustement)
// ---------------------------------------------------------------------------------------------------
const AJUSTEMENTS = [
  { piege: false, f: (r) => { const m = r.entre(0.2, 0.8); return { texte: `Fees d'avocats et du conseil M&A liés au projet de cession : ${meur(m)}, comptabilisés en charges externes.`, montant: m, effet: 1, court: 'Fees liés à la cession', pourquoi: "Coût lié à l'opération, qui ne se reproduira pas chez l'acheteur : réintégré (+).", mots: ['honoraire', 'conseil m&a', 'frais de cession'] }; } },
  { piege: false, f: (r) => { const a = r.entre(0.1, 0.2), d = r.entre(0.1, 0.3); return { texte: `Le dirigeant-actionnaire se verse ${meur(a)} par an (charges comprises) ; un directeur général salarié coûterait ${meur(arrondi(a + d))} sur le marché.`, montant: d, effet: -1, court: 'Sous-rémunération du dirigeant', pourquoi: "L'acheteur devra payer un dirigeant au prix du marché : on retire le complément de coût (−).", mots: ['dirigeant', 'remuneration'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.3, 1.2); return { texte: `Plus-value de ${meur(m)} sur la cession d'un entrepôt, enregistrée en « autres produits d'exploitation ».`, montant: m, effet: -1, court: 'Plus-value de cession d\'actif', pourquoi: 'Produit exceptionnel lié à la vente d\'un actif : il ne se répétera pas (−).', mots: ['plus-value', 'plus value', 'entrepot'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.2, 0.6); return { texte: `Indemnité d'assurance de ${meur(m)} reçue après l'incendie d'un atelier, comptabilisée en produits d'exploitation.`, montant: m, effet: -1, court: 'Indemnité d\'assurance', pourquoi: 'Produit non récurrent (−). Réflexe : vérifier aussi les coûts du sinistre restés dans les charges.', mots: ['assurance', 'sinistre', 'incendie'] }; } },
  { piege: true, f: (r) => { const m = r.entre(0.3, 0.7); return { texte: `Le management propose de réintégrer ${meur(m)} de « coûts de restructuration non récurrents ». Des montants comparables ont été réintégrés chacune des 4 dernières années.`, montant: m, effet: 0, court: 'Restructuration « non récurrente » (4e année)', pourquoi: 'Des coûts qui reviennent chaque année sont récurrents : aucun ajustement (piège classique du vendeur).', mots: ['restructuration', 'recurrent'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.3, 0.6); return { texte: `La holding du vendeur facture ${meur(m)} par an de « management fees » ; cette convention sera résiliée au closing.`, montant: m, effet: 1, court: 'Management fees de la holding', pourquoi: 'La charge disparaît après l\'opération : réintégrée (+), à condition de compter le coût des fonctions à remplacer (stand-alone).', mots: ['management fees', 'holding'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.2, 0.5); return { texte: `Après la cession, la société devra gérer seule sa paie et sa cash, aujourd'hui assurées gratuitement par le groupe vendeur : coût annuel estimé ${meur(m)}.`, montant: m, effet: -1, court: 'Coûts « stand-alone »', pourquoi: 'Coût que l\'acheteur supportera une fois la société sortie du groupe (stand-alone cost) : retiré (−).', mots: ['stand-alone', 'stand alone', 'autonom', 'groupe vendeur'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.1, 0.5); return { texte: `Reprise de ${meur(m)} d'une provision pour litige devenue sans objet, comptabilisée en produits d'exploitation.`, montant: m, effet: -1, court: 'Reprise de provision sans objet', pourquoi: 'Produit comptable sans lien avec l\'activité courante (−).', mots: ['reprise', 'provision'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.1, 0.4); return { texte: `Indemnité transactionnelle de ${meur(m)} versée à un ancien directeur commercial (litige prud'homal clos, le seul en 10 ans).`, montant: m, effet: 1, court: 'Litige prud\'homal isolé', pourquoi: 'Charge exceptionnelle et isolée (+). Si ce type de litige était fréquent, on ne retraiterait pas.', mots: ['prud', 'litige', 'transactionnelle'] }; } },
  { piege: false, f: (r) => { const a = r.choix([0.8, 1.2, 1.6, 2.0]); const m = arrondi(a * 0.75); return { texte: `La société a racheté un concurrent le 1er octobre ; seuls 3 mois de son EBITDA (${meur(a)} par an) figurent dans les comptes LTM, arrêtés au 31 décembre.`, montant: m, effet: 1, court: 'Effet année pleine d\'une acquisition', pourquoi: `Ajustement pro forma : on ajoute les 9 mois manquants (+), soit 9/12 × ${nombre(a)} = ${nombre(m)} M€.`, mots: ['annee pleine', 'pro forma', 'acquisition', 'perimetre'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.2, 0.6); return { texte: `Le crédit d'impôt recherche (${meur(m)}) est comptabilisé en subvention d'exploitation, donc dans l'EBITDA.`, montant: m, effet: -1, court: 'CIR classé dans l\'EBITDA', pourquoi: 'Le CIR est un crédit d\'impôt (présenté d\'habitude en moins de l\'impôt) au montant futur incertain : on le sort de l\'EBITDA (−).', mots: ['cir', 'credit d impot'] }; } },
  { piege: true, f: (r) => { const m = r.entre(0.2, 0.5); return { texte: `Le management classe ${meur(m)} de coûts d'intérim en « exceptionnels » ; l'intérim sert chaque été à absorber le pic d'activité.`, montant: m, effet: 0, court: 'Intérim « exceptionnel » (chaque été)', pourquoi: 'Coût lié à la saisonnalité normale de l\'activité : récurrent, aucun ajustement (piège).', mots: ['interim'] }; } },
  { piege: false, f: (r) => { const p = r.entre(0.1, 0.3), d = r.entre(0.1, 0.2); return { texte: `Les locaux appartiennent à une SCI du dirigeant qui facture ${meur(p)} de loyer par an ; le loyer de marché est de ${meur(arrondi(p + d))} et le bail sera renégocié à ce prix.`, montant: d, effet: -1, court: 'Loyer sous le prix du marché', pourquoi: 'Le loyer va remonter au prix du marché : on retire l\'écart (−).', mots: ['loyer', 'sci', 'bail'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.3, 0.9); return { texte: `Un client important a résilié son contrat à la fin de la période ; la marge annuelle qu'il apportait (après coûts variables) est de ${meur(m)}.`, montant: m, effet: -1, court: 'Perte d\'un client (vue acheteur)', pourquoi: 'L\'EBITDA normatif de l\'acheteur ne doit pas inclure une marge qui a disparu (−). Le vendeur contestera souvent cet ajustement.', mots: ['client', 'resili', 'perte'] }; } },
];

export function choisirAjustements(r, n) {
  const pieges = AJUSTEMENTS.filter((a) => a.piege);
  const vrais = AJUSTEMENTS.filter((a) => !a.piege);
  const avecPiege = r.vrai(0.8);
  const choisis = [...(avecPiege ? [r.choix(pieges)] : []), ...r.plusieurs(vrais, avecPiege ? n - 1 : n)];
  return r.melanger(choisis).map((a) => a.f(r));
}

export function totalAjuste(ebitda, items) {
  return arrondi(ebitda + items.reduce((s, it) => s + it.effet * it.montant, 0));
}

function tableauEbitda(ebitda, items, total) {
  return tableau(['Élément', 'Ajustement', 'Pourquoi'], [
    ['EBITDA reported', meur(ebitda), ''],
    ...items.map((it, i) => [`${i + 1}. ${it.court}`, it.effet ? `${signe(it.effet * it.montant)} M€` : '0 (piège)', it.pourquoi]),
    ['!Adjusted EBITDA', meur(total), ''],
  ]);
}

function ebitdaAjuste(r) {
  const s = r.choix(SECTEURS);
  const ebitda = r.entre(6, 20);
  const items = choisirAjustements(r, 6);
  const total = totalAjuste(ebitda, items);
  return {
    type: 'calcul', titre: 'Adjusted EBITDA : quels adjustments ?',
    enonce: `<p>Due diligence buy-side d'une société de ${s.court}. L'EBITDA reported des 12 derniers mois (LTM) est de <strong>${meur(ebitda)}</strong>. Le DAF te donne ces informations :</p>
      <ol>${items.map((it) => `<li>${it.texte}</li>`).join('')}</ol>
      <p>Quel adjusted EBITDA (normatif) présentes-tu à l'acheteur ?</p>`,
    champs: [champ('ebitda', 'Adjusted EBITDA LTM', total, 'M€', 0.06)],
    explication: tableauEbitda(ebitda, items, total)
      + `<p>Écart avec le reported : ${signe(total - ebitda)} M€ (${signe((total / ebitda - 1) * 100)} %). À un multiple de 8x, chaque 0,1 M€ d'EBITDA vaut 0,8 M€ de prix : c'est pour cela que chaque ajustement se négocie.</p>`,
    conseil: 'À l\'oral, classe tes adjustments en 3 familles : non récurrents, normatifs (conditions de marché), pro forma (périmètre / année pleine). Et dis toujours qui l\'ajustement avantage.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Bibliothèque de postes de net debt. coef : +1 dette, −1 cash déductible, 0,75 = net of tax, 0 = piège
// ---------------------------------------------------------------------------------------------------
const POSTES_DETTE = [
  { piege: false, f: (r) => { const m = r.entre(0.1, 0.4); return { texte: `Accrued interest (intérêts courus) sur les emprunts : ${meur(m)}`, montant: m, coef: 1, court: 'Accrued interest', pourquoi: 'Dette financière déjà due pour la période passée (+).', mots: ['interets courus'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.5, 3); return { texte: `Compte courant d'associé du dirigeant-vendeur : ${meur(m)}`, montant: m, coef: 1, court: 'Shareholder loan', pourquoi: 'Somme due à l\'actionnaire, remboursée ou rachetée avec les titres : dette (+).', mots: ['compte courant'] }; } },
  { piege: false, f: (r) => { const p = r.choix([0.4, 0.8, 1.2, 1.6, 2.0]); return { texte: `Provision pour un litige commercial dont l'issue défavorable est probable : ${meur(p)} (charge déductible, IS 25 %)`, montant: p, coef: 0.75, court: 'Provision pour litige (net of tax)', pourquoi: `Sortie de cash probable sans contrepartie dans l'EBITDA futur : debt-like, retenue net of tax (${nombre(p)} × 75 % = ${nombre(arrondi(p * 0.75, 0.01), 2)}).`, mots: ['litige', 'provision'] }; } },
  { piege: false, f: (r) => { const p = r.choix([0.4, 0.8, 1.2, 1.6]); return { texte: `Pension liabilities (indemnités de départ à la retraite) non provisionnées (mentionnées en annexe, comptes PCG) : ${meur(p)} (déductibles, IS 25 %)`, montant: p, coef: 0.75, court: 'Pension liabilities (net of tax)', pourquoi: `Engagement envers les salariés lié au passé : debt-like, net of tax (${nombre(p)} × 75 % = ${nombre(arrondi(p * 0.75, 0.01), 2)}).`, mots: ['retraite', 'idr', 'ifc'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.3, 1.5); return { texte: `Impôt sur les sociétés de l'exercice précédent, encore à payer : ${meur(m)}`, montant: m, coef: 1, court: 'IS dû des exercices passés', pourquoi: 'Impôt lié aux résultats passés (qui ont profité au vendeur) : debt-like (+).', mots: ['impot', 'is du', 'is a payer'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.5, 3); return { texte: `Dividendes votés par l'assemblée générale, pas encore versés : ${meur(m)}`, montant: m, coef: 1, court: 'Dividendes votés non versés', pourquoi: 'Somme due aux actionnaires : dette (+).', mots: ['dividende'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.5, 2.5); return { texte: `Complément de prix (earn-out) restant à payer sur l'acquisition d'une filiale en 2024 : ${meur(m)}`, montant: m, coef: 1, court: 'Earn-out à payer', pourquoi: 'Dette liée à une acquisition passée : debt-like (+).', mots: ['earn-out', 'earn out', 'complement de prix'] }; } },
  { piege: true, f: (r) => { const m = r.entre(0.8, 2.5); return { texte: `Dettes pour congés payés et primes du mois en cours : ${meur(m)}`, montant: m, coef: 0, court: 'Congés payés (piège)', pourquoi: 'Dette opérationnelle courante, déjà dans le normalised NWC : la mettre en net debt serait un double comptage.', mots: [] }; } },
  { piege: true, f: (r) => { const m = r.entre(4, 12); return { texte: `Dettes fournisseurs courantes (dans les délais habituels) : ${meur(m)}`, montant: m, coef: 0, court: 'Fournisseurs courants (piège)', pourquoi: 'Élément du NWC opérationnel, pas de la net debt.', mots: [] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.2, 0.8); return { texte: `Fournisseurs d'immobilisations échus depuis plus de 6 mois (machines déjà livrées) : ${meur(m)}`, montant: m, coef: 1, court: 'Capex creditors échus', pourquoi: 'Capex déjà réalisé mais pas payé : l\'acheteur paiera cet investissement passé, debt-like (+).', mots: ['immobilisation', 'capex'] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.2, 0.6); return { texte: `Créance d'impôt (carry-back) remboursable par l'État sous 3 mois : ${meur(m)}`, montant: m, coef: -1, court: 'Créance de carry-back', pourquoi: 'Encaissement certain et proche, sans lien avec l\'activité : cash-like (−).', mots: ['carry', 'cash-like', 'cash like'] }; } },
  { piege: true, f: (r) => { const m = r.entre(0.5, 2); return { texte: `Subventions d'investissement inscrites au passif (non remboursables) : ${meur(m)}`, montant: m, coef: 0, court: 'Subvention d\'investissement (piège)', pourquoi: 'Aucune somme à rembourser : ce n\'est pas une dette.', mots: [] }; } },
  { piege: false, f: (r) => { const m = r.entre(0.3, 1.5); return { texte: `Avance remboursable de Bpifrance : ${meur(m)}`, montant: m, coef: 1, court: 'Avance remboursable Bpifrance', pourquoi: 'À rembourser : dette financière (+).', mots: ['bpi', 'avance remboursable'] }; } },
  { piege: false, f: (r) => { const m = r.entre(2, 6); return { texte: `Créances clients cédées en deconsolidating factoring (sorties du bilan) : ${meur(m)} (convention de l'acheteur : l'factoring est un financement)`, montant: m, coef: 1, court: 'Deconsolidating factoring', pourquoi: 'C\'est un financement : on le réintègre en dette (+), et les créances dans le NWC.', mots: ['factoring', 'factoring'] }; } },
];

export function choisirPostesDette(r, n) {
  const pieges = POSTES_DETTE.filter((p) => p.piege);
  const vrais = POSTES_DETTE.filter((p) => !p.piege);
  const nbPieges = r.vrai(0.7) ? 2 : 1;
  return r.melanger([...r.plusieurs(pieges, nbPieges), ...r.plusieurs(vrais, n - nbPieges)]).map((p) => p.f(r));
}

// Emprunts + disponibilités (éventuellement en partie nanties) + postes choisis
export function detteDeBase(r) {
  const emprunts = r.entre(8, 40);
  const dispo = r.entre(3, 12);
  const nanti = r.vrai(0.5) ? r.entre(0.3, 1.0) : 0;
  return { emprunts, dispo, nanti };
}

export function totalDette(base, postes) {
  const autres = postes.reduce((s, p) => s + p.coef * p.montant, 0);
  return arrondi(base.emprunts - (base.dispo - base.nanti) + autres, 0.01);
}

function lignesDette(base, postes) {
  return [
    `Bank debt (emprunts bancaires) (capital restant dû) : ${meur(base.emprunts)}`,
    `Cash (disponibilités) : ${meur(base.dispo)}${base.nanti ? `, dont ${meur(base.nanti)} nantis en garantie d'un prêt (bloqués)` : ''}`,
    ...postes.map((p) => p.texte),
  ];
}

function tableauDette(base, postes, total) {
  return tableau(['Poste', 'Retenu', 'Pourquoi'], [
    ['Bank debt (emprunts bancaires)', `+${nombre(base.emprunts)}`, 'Dette financière.'],
    ['Cash (disponibilités)', `−${nombre(base.dispo - base.nanti)}`, base.nanti ? `Seule le cash libre se déduit : ${nombre(base.dispo)} − ${nombre(base.nanti)} nantis.` : 'Cash libre, déduite.'],
    ...postes.map((p) => [p.court, p.coef ? `${signe(p.coef * p.montant, 2)}` : '0', p.pourquoi]),
    ['!Adjusted net debt', meur(total, 2), ''],
  ]);
}

function detteNette(r) {
  const base = detteDeBase(r);
  const postes = choisirPostesDette(r, 6);
  const total = totalDette(base, postes);
  return {
    type: 'calcul', titre: 'Adjusted net debt',
    enonce: `<p>Tu prépares le tableau de net debt d'une cible (comptes PCG). Convention de l'acheteur : lease liability exclue, provisions et engagements retenus net of tax (25 %), seuls les éléments certains ou probables sont retenus.</p>
      <ul>${lignesDette(base, postes).map((l) => `<li>${l}</li>`).join('')}</ul>
      <p>Quelle adjusted net debt retiens-tu (en M€, 2 décimales) ?</p>`,
    champs: [champ('dn', 'Adjusted net debt', total, 'M€', 0.06, 2)],
    explication: tableauDette(base, postes, total)
      + '<p>Chaque euro d’adjusted net debt réduit l’Equity Value d\'un euro : c\'est la bataille « euro pour euro » du SPA.</p>',
    conseil: 'Pour chaque poste, pose-toi 3 questions : est-ce une sortie de cash certaine ou probable ? est-elle liée au passé (au profit du vendeur) ? est-elle déjà dans l\'EBITDA ou le normalised NWC (risque de double comptage) ?',
  };
}

// ---------------------------------------------------------------------------------------------------
// NWC mensuel, peg et price adjustment
// ---------------------------------------------------------------------------------------------------
export function bfrMensuel(r, base, amplitude) {
  const pic = r.entier(0, 11);
  return MOIS.map((_, i) => arrondi(base * (1 + amplitude * Math.cos((2 * Math.PI * (i - pic)) / 12) + (r.suivant() - 0.5) * 0.04)));
}

function bfrNormatif(r) {
  const base = r.entre(5, 20);
  const amplitude = r.entre(0.05, 0.3, 0.01);
  const valeurs = bfrMensuel(r, base, amplitude);
  const horsExploitation = r.vrai(0.4) ? { mois: r.entier(0, 11), montant: r.entre(0.5, 1.5) } : null;
  const retenues = valeurs.map((v, i) => (horsExploitation && i === horsExploitation.mois ? arrondi(v - horsExploitation.montant) : v));
  const peg = arrondi(moyenne(retenues), 0.01);
  const moisClosing = r.entier(0, 11);
  const retard = r.vrai(0.5) ? r.entre(0.3, 1.2) : 0;
  const closing = arrondi(retenues[moisClosing] * (1 + r.entre(0.0, 0.06, 0.01)) - retard);
  const ajustement = arrondi(closing - peg, 0.01);
  const lignes = [MOIS.map((m) => m), valeurs.map((v) => nombre(v))];
  return {
    type: 'calcul', titre: 'Normalised NWC (peg) et price adjustment',
    enonce: `<p>NWC opérationnel mensuel des 12 derniers mois (M€) :</p>
      ${tableau(lignes[0], [lignes[1]], 'compact')}
      ${horsExploitation ? `<p>Le NWC de ${MOIS_LONGS[horsExploitation.mois]} inclut une créance de ${meur(horsExploitation.montant)} sur la vente d'un immeuble (hors exploitation).</p>` : ''}
      <p>Le SPA prévoit un ajustement euro pour euro du prix si le NWC au closing s'écarte du normatif (moyenne des 12 mois). Le NWC estimé au closing (fin ${MOIS_LONGS[moisClosing]}) est de <strong>${meur(closing)}</strong>${retard ? `, après que le vendeur a retardé de ${meur(retard)} de paiements fournisseurs` : ''}.</p>
      <p>Calcule le normalised NWC et le price adjustment (négatif = le prix baisse).</p>`,
    champs: [champ('peg', 'Normalised NWC (peg)', peg, 'M€', 0.06, 2), champ('ajust', 'Price adjustment', ajustement, 'M€', 0.08, 2)],
    explication: `<p>Peg = moyenne des 12 mois${horsExploitation ? `, après avoir retiré la créance hors exploitation de ${MOIS_LONGS[horsExploitation.mois]} (${nombre(valeurs[horsExploitation.mois])} → ${nombre(retenues[horsExploitation.mois])})` : ''} = <strong>${meur(peg, 2)}</strong>.</p>
      <p>Ajustement = NWC au closing − peg = ${nombre(closing)} − ${nombre(peg, 2)} = <strong>${signe(ajustement, 2)} M€</strong> : ${ajustement < 0 ? 'le NWC livré est inférieur au niveau normal, l\'acheteur devra le reconstituer avec son cash : le prix baisse.' : 'le NWC livré est supérieur au niveau normal : le vendeur est compensé, le prix monte.'}</p>
      ${retard ? '<p>Le retard de paiement des fournisseurs a gonflé le cash (donc baissé la net debt et augmenté le prix), mais il a baissé le NWC d\'autant : le mécanisme de peg neutralise la manœuvre.</p>' : ''}
      <p>Amplitude de la saisonnalité : de ${nombre(Math.min(...retenues))} à ${nombre(Math.max(...retenues))} M€. Quand le closing tombe loin de la moyenne, on peut négocier un peg mensualisé (un peg par mois de closing).</p>`,
    conseil: 'Phrase d\'entretien : « Le peg protège l\'acheteur contre un vendeur qui gonfle sa cash en tirant sur le NWC juste avant le closing. »',
  };
}

// ---------------------------------------------------------------------------------------------------
// Locked box : leakage et ticking fee
// ---------------------------------------------------------------------------------------------------
const FLUX_LOCKED_BOX = [
  { fuite: true, min: 1, max: 4, texte: (m) => `Dividende versé au vendeur : ${meur(m)}`, court: 'Dividende au vendeur', pourquoi: 'Sortie de valeur au profit du vendeur : leakage.' },
  { fuite: true, min: 0.2, max: 0.6, texte: (m) => `Management fees facturés par la holding du vendeur : ${meur(m)}`, court: 'Management fees au vendeur', pourquoi: 'Paiement à une partie liée au vendeur : leakage.' },
  { fuite: false, min: 0.1, max: 0.2, texte: (m) => `Salaire du dirigeant prévu dans son contrat (listé en « permitted leakage » dans le SPA) : ${meur(m)}`, court: 'Salaire normal du dirigeant', pourquoi: 'Permitted leakage : prévu et déjà intégré dans le prix.' },
  { fuite: false, min: 2, max: 6, texte: (m) => `Achats de matières auprès de fournisseurs tiers, aux conditions habituelles : ${meur(m)}`, court: 'Achats à des tiers', pourquoi: 'Opération courante avec un tiers : pas une fuite de valeur vers le vendeur.' },
  { fuite: true, min: 0.3, max: 1.0, texte: (m) => `Bonus de cession versé aux managers par la société : ${meur(m)}`, court: 'Bonus de cession', pourquoi: 'Coût de l\'opération du vendeur supporté par la cible : leakage.' },
  { fuite: true, min: 0.4, max: 1.2, texte: (m) => `Fees du conseil M&A du vendeur, payés par la société : ${meur(m)}`, court: 'Fees du conseil du vendeur', pourquoi: 'Frais du vendeur payés par la cible : leakage.' },
  { fuite: true, min: 0.2, max: 0.8, texte: (m) => `Abandon de créance au profit d'une autre société du vendeur : ${meur(m)}`, court: 'Abandon de créance à une société du vendeur', pourquoi: 'Transfert de valeur à une partie liée : leakage.' },
  { fuite: false, min: 0.1, max: 0.3, texte: (m) => `Loyer de marché payé à la SCI du vendeur (listé en « permitted leakage ») : ${meur(m)}`, court: 'Loyer de marché à la SCI', pourquoi: 'Permitted leakage, au prix du marché.' },
  { fuite: false, min: 0.5, max: 2, texte: (m) => `Remboursement d'une échéance d'emprunt bancaire prévue au contrat : ${meur(m)}`, court: 'Échéance d\'emprunt', pourquoi: 'La banque n\'est pas une partie liée au vendeur : pas un leakage (le cash baisse, la dette aussi).' },
];

const CLOTURES_2026 = [{ mois: 2, jours: 90, date: '31 mars 2026' }, { mois: 3, jours: 120, date: '30 avril 2026' }, { mois: 4, jours: 151, date: '31 mai 2026' }, { mois: 5, jours: 181, date: '30 juin 2026' }];

function lockedBox(r) {
  const equity = r.entre(40, 200, 1);
  const flux = r.melanger([...r.plusieurs(FLUX_LOCKED_BOX.filter((x) => x.fuite), 3), ...r.plusieurs(FLUX_LOCKED_BOX.filter((x) => !x.fuite), 2)])
    .map((x) => { const montant = r.entre(x.min, x.max); return { ...x, montant, texte: x.texte(montant) }; });
  const fuite = arrondi(flux.filter((x) => x.fuite).reduce((s, x) => s + x.montant, 0));
  const closing = r.choix(CLOTURES_2026);
  const taux = r.choix([0.04, 0.05, 0.06, 0.07, 0.08]);
  const ticking = arrondi(equity * taux * closing.jours / 365, 0.01);
  return {
    type: 'calcul', titre: 'Locked box : leakage et ticking fee',
    enonce: `<p>Equity Value fixée à <strong>${meur(equity, 0)}</strong> sur un bilan de référence (locked box) au 31 décembre 2025. Closing le ${closing.date} (${closing.jours} jours plus tard). Entre ces deux dates :</p>
      <ul>${flux.map((x) => `<li>${x.texte}</li>`).join('')}</ul>
      <p>Le SPA prévoit un ticking fee de ${pct(taux, 0)} par an sur l’Equity Value, calculé au prorata des jours.</p>
      <p>1) Quel montant de leakage le vendeur doit-il rembourser ? 2) Quel ticking fee l'acheteur doit-il payer ?</p>`,
    champs: [champ('fuite', 'Leakage à rembourser', fuite, 'M€', 0.06), champ('ticking', 'Ticking fee', ticking, 'M€', 0.03, 2)],
    explication: tableau(['Flux', 'Leakage ?', 'Pourquoi'], flux.map((x) => [x.court, x.fuite ? nombre(x.montant) : '—', x.pourquoi]).concat([['!Total leakage', meur(fuite), '']]))
      + `<p>Ticking fee = ${nombre(equity, 0)} × ${pct(taux, 0)} × ${closing.jours} / 365 = <strong>${meur(ticking, 2)}</strong>. Il rémunère le vendeur pour le cash générée par la société entre la date de locked box et le closing, qui profite à l'acheteur.</p>`,
    conseil: 'Dis-le simplement : « En locked box, le prix est figé sur un bilan passé ; l\'acheteur est protégé par l\'interdiction des leakages, remboursables euro pour euro. »',
  };
}

// ---------------------------------------------------------------------------------------------------
// Ratios de NWC (DSO, DIO) et cash libéré
// ---------------------------------------------------------------------------------------------------
function ratiosBfr(r) {
  const ca = r.entre(20, 120, 1);
  const dsoCible = r.entier(40, 90);
  const creances = arrondi(ca * 1.2 * dsoCible / 365);
  const dso = arrondi(creances / (ca * 1.2) * 365, 1);
  const tauxMarge = r.entre(0.35, 0.6, 0.01);
  const cout = arrondi(ca * (1 - tauxMarge));
  const dioCible = r.entier(30, 100);
  const stock = arrondi(cout * dioCible / 365);
  const dio = arrondi(stock / cout * 365, 1);
  const gain = r.choix([5, 10, 15]);
  const cash = arrondi(ca * 1.2 / 365 * gain, 0.01);
  return {
    type: 'calcul', titre: 'Ratios de NWC : DSO, DIO et cash libéré',
    enonce: `<p>Revenue annuel : ${meur(ca, 0)} HT (TVA 20 %). Créances clients TTC à la clôture : ${meur(creances)}. Coût des ventes (achats consommés) : ${meur(cout)}. Stocks : ${meur(stock)}.</p>
      <p>1) DSO (jours, base 365) ? 2) Rotation des stocks DIO (jours) ? 3) Combien de cash libère une baisse du DSO de ${gain} jours ?</p>`,
    champs: [champ('dso', 'DSO', dso, 'jours', 1.1, 0), champ('dio', 'DIO', dio, 'jours', 1.1, 0), champ('cash', 'Cash libéré', cash, 'M€', 0.06, 2)],
    explication: `<p>DSO = créances TTC / revenue TTC × 365 = ${nombre(creances)} / (${nombre(ca, 0)} × 1,2) × 365 = <strong>${nombre(dso, 0)} jours</strong>. Les créances sont TTC : on compare donc au revenue TTC.</p>
      <p>DIO = stocks / coût des ventes × 365 = ${nombre(stock)} / ${nombre(cout)} × 365 = <strong>${nombre(dio, 0)} jours</strong>.</p>
      <p>Cash libéré = revenue TTC / 365 × ${gain} = ${nombre(ca * 1.2, 1)} / 365 × ${gain} = <strong>${meur(cash, 2)}</strong> (une fois, pas chaque année).</p>`,
    conseil: 'Piège fréquent : diviser des créances TTC par un revenue HT. En entretien, précise toujours HT/TTC et la base (360 ou 365 jours).',
  };
}

// ---------------------------------------------------------------------------------------------------
// Conversion de l'EBITDA en cash
// ---------------------------------------------------------------------------------------------------
function conversionCash(r) {
  const ebitda = r.entre(5, 30);
  const capex = arrondi(ebitda * r.entre(0.1, 0.45, 0.01));
  const dBfr = arrondi(ebitda * r.entre(-0.1, 0.3, 0.01));
  const cash = arrondi(ebitda - capex - dBfr);
  const conv = cash / ebitda;
  return {
    type: 'calcul', titre: 'Cash conversion de l\'EBITDA',
    enonce: `<p>Adjusted EBITDA : ${meur(ebitda)}. Investissements (capex) : ${meur(capex)}. Variation du NWC : ${dBfr >= 0 ? `hausse de ${meur(dBfr)}` : `baisse de ${meur(-dBfr)}`}.</p>
      <p>1) Operating cash flow avant impôt ? 2) Cash conversion (cash flow / EBITDA) ?</p>`,
    champs: [champ('cash', 'Operating cash flow', cash, 'M€', 0.06), champ('conv', 'Cash conversion', conv * 100, '%', 1.1, 0)],
    explication: `<p>Cash flow = EBITDA − capex − hausse du NWC = ${nombre(ebitda)} − ${nombre(capex)} ${dBfr >= 0 ? '−' : '+'} ${nombre(Math.abs(dBfr))} = <strong>${meur(cash)}</strong>.</p>
      <p>Conversion = ${nombre(cash)} / ${nombre(ebitda)} = <strong>${nombre(conv * 100, 0)} %</strong>. ${conv >= 0.75 ? 'Très bonne conversion : l\'EBITDA se transforme bien en cash, ce qui rassure les prêteurs.' : conv >= 0.5 ? 'Conversion correcte : regarde si les capex sont de maintenance ou de croissance.' : 'Conversion faible : l\'EBITDA « ne se voit pas » en cash. Analyse les capex (maintenance ?) et la dérive du NWC.'}</p>`,
    conseil: 'Un EBITDA qui ne se convertit pas en cash est le premier signal d\'un EBITDA de mauvaise qualité (capitalisation de coûts, créances qui gonflent).',
  };
}

// ---------------------------------------------------------------------------------------------------
// IFRS 16 : cohérence EBITDA / dette
// ---------------------------------------------------------------------------------------------------
function ifrs16(r) {
  const ebitdaPost = r.entre(10, 40);
  const loyers = arrondi(ebitdaPost * r.entre(0.1, 0.25, 0.01));
  const detteLoc = arrondi(loyers * r.entre(4, 7));
  const detteFin = arrondi(ebitdaPost * r.entre(1.5, 3.5));
  const pre = arrondi(ebitdaPost - loyers);
  const leveragePre = arrondi(detteFin / pre, 0.01);
  const leveragePost = arrondi((detteFin + detteLoc) / ebitdaPost, 0.01);
  return {
    type: 'calcul', titre: 'IFRS 16 : rester cohérent entre EBITDA et dette',
    enonce: `<p>Comptes IFRS : EBITDA publié (post-IFRS 16) ${meur(ebitdaPost)} ; loyers payés dans l'année ${meur(loyers)} ; lease liability (IFRS 16) ${meur(detteLoc)} ; financial net debt hors locations ${meur(detteFin)}.</p>
      <p>1) EBITDA pre-IFRS 16 ? 2) Leverage pre-IFRS 16 (dette financière / EBITDA pré) ? 3) Leverage post-IFRS 16 ?</p>`,
    champs: [champ('pre', 'EBITDA pre-IFRS 16', pre, 'M€', 0.06), champ('lpre', 'Leverage pre-IFRS 16', leveragePre, 'x', 0.06, 2), champ('lpost', 'Leverage post-IFRS 16', leveragePost, 'x', 0.06, 2)],
    explication: `<p>Pré-IFRS 16 : on remet les loyers en charges : ${nombre(ebitdaPost)} − ${nombre(loyers)} = <strong>${meur(pre)}</strong>.</p>
      <p>Leverage pre = ${nombre(detteFin)} / ${nombre(pre)} = <strong>${fois(leveragePre, 2)}</strong> ; leverage post = (${nombre(detteFin)} + ${nombre(detteLoc)}) / ${nombre(ebitdaPost)} = <strong>${fois(leveragePost, 2)}</strong>.</p>
      <p>La règle : un EBITDA post-IFRS 16 va avec une dette qui inclut la lease liability (et un multiple post-IFRS 16) ; un EBITDA pre-IFRS 16 va avec une dette hors locations. Mélanger les deux crée de la valeur fictive.</p>`,
    conseil: 'Si on te demande « faut-il mettre la dette IFRS 16 en net debt ? », la bonne réponse commence par « ça dépend de la base d\'EBITDA retenue pour le prix ».',
  };
}

// ---------------------------------------------------------------------------------------------------
// Pont Enterprise Value → Equity Value
// ---------------------------------------------------------------------------------------------------
function pontValeur(r) {
  const ebitda = r.entre(5, 25);
  const multiple = r.choix([6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12]);
  const ve = arrondi(ebitda * multiple);
  const dn = arrondi(ve * r.entre(0.15, 0.4, 0.01));
  const debtLike = r.entre(0.5, 3);
  const ecartBfr = r.entre(-2, 1.5);
  const minoritaires = r.vrai(0.5) ? r.entre(0.5, 3) : 0;
  const participation = r.vrai(0.4) ? r.entre(0.5, 2) : 0;
  const titres = arrondi(ve - dn - debtLike + ecartBfr - minoritaires + participation);
  return {
    type: 'calcul', titre: 'De l\'Enterprise Value à l\'Equity Value',
    enonce: `<p>Adjusted EBITDA ${meur(ebitda)}, multiple retenu ${fois(multiple)}. Financial net debt ${meur(dn)}. Debt-like items (net of tax) ${meur(debtLike)}. NWC au closing ${ecartBfr >= 0 ? 'supérieur' : 'inférieur'} de ${meur(Math.abs(ecartBfr))} au normatif.${minoritaires ? ` Minority interests dans une filiale : ${meur(minoritaires)}.` : ''}${participation ? ` Participation minoritaire non consolidée (hors exploitation) valorisée ${meur(participation)}.` : ''}</p>
      <p>Quell’Equity Value ?</p>`,
    champs: [champ('titres', 'Equity Value', titres, 'M€', 0.11)],
    explication: tableau(['Étape', 'M€'], [
      [`Enterprise Value = ${nombre(ebitda)} × ${nombre(multiple)}`, nombre(ve)],
      ['− Financial net debt', `−${nombre(dn)}`],
      ['− Debt-like items', `−${nombre(debtLike)}`],
      ['± Écart de NWC vs normatif', signe(ecartBfr)],
      ...(minoritaires ? [['− Minority interests (part des résultats qui ne revient pas à l\'acheteur)', `−${nombre(minoritaires)}`]] : []),
      ...(participation ? [['+ Actif hors exploitation (participation)', `+${nombre(participation)}`]] : []),
      ['!Equity Value', nombre(titres)],
    ]),
    conseil: 'Récite le pont dans cet ordre en entretien : EV − net debt − debt-like ± NWC − minoritaires + actifs hors exploitation = Equity Value.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Impact d'un ajustement sur le prix (pourquoi l'EBITDA compte plus que la dette)
// ---------------------------------------------------------------------------------------------------
function impactPrix(r) {
  const multiple = r.choix([7, 8, 9, 10, 11, 12]);
  const ajE = -r.entre(0.2, 1.0);
  const debt = r.entre(0.5, 2.5);
  const total = arrondi(ajE * multiple - debt);
  return {
    type: 'calcul', titre: 'Impact de tes adjustments sur le prix',
    enonce: `<p>Ta DD conclut à un adjustment d'EBITDA de ${signe(ajE)} M€ et à ${meur(debt)} de debt-like items non identifiés par le vendeur. Le prix est fixé à ${fois(multiple, 0)} l'adjusted EBITDA.</p><p>Impact total sur l’Equity Value ?</p>`,
    champs: [champ('impact', 'Impact sur le prix', total, 'M€', 0.06)],
    explication: `<p>EBITDA : ${signe(ajE)} × ${multiple} = ${signe(ajE * multiple)} M€ (effet multiplié). Dette : −${nombre(debt)} M€ (euro pour euro). Total = <strong>${signe(total)} M€</strong>.</p><p>Un euro d'EBITDA vaut « multiple » euros de prix ; un euro de dette vaut un euro. C'est pour cela que les vendeurs se battent d'abord sur l'EBITDA.</p>`,
    conseil: 'Présente toujours l\'impact prix de tes constats : c\'est ce que le client (fonds) retient de ta due diligence.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Cut-off : revenue facturé trop tôt
// ---------------------------------------------------------------------------------------------------
function cutOff(r) {
  const ca = r.entre(0.5, 2.5);
  const marge = r.entre(0.25, 0.55, 0.01);
  const impact = arrondi(ca * marge, 0.01);
  return {
    type: 'calcul', titre: 'Cut-off : le revenue de fin d\'année',
    enonce: `<p>En testant les factures de décembre, tu découvres ${meur(ca)} de ventes facturées et comptabilisées en décembre alors que les produits ont été livrés en janvier. La marge sur ces produits est de ${pct(marge, 0)}, et le coût des produits n'a pas été passé en charges (ils sont encore en stock).</p>
      <p>De combien l'EBITDA de l'exercice est-il surévalué ?</p>`,
    champs: [champ('impact', 'EBITDA surévalué de', impact, 'M€', 0.03, 2)],
    explication: `<p>Le revenue est en avance de ${nombre(ca)} ; le coût correspondant (${nombre(ca * (1 - marge), 2)}) n'est pas sorti du stock, donc l'EBITDA est gonflé de la marge : ${nombre(ca)} × ${pct(marge, 0)} = <strong>${meur(impact, 2)}</strong>.</p><p>Au bilan : créances surévaluées, stock sous-évalué (avant correction). Réflexe DD : tests de cut-off sur les factures et avoirs autour de la clôture, surtout l'année de la vente.</p>`,
    conseil: 'Un revenue anormalement élevé en décembre de l\'année de la cession est un red flag classique : demande le revenue mensuel et les avoirs de janvier.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Étude de cas complète : due diligence d'une cible
// ---------------------------------------------------------------------------------------------------
const SCENARIOS_PRIX = [
  { texte: 'Processus d\'enchères mené par une banque d\'affaires ; le vendeur est un fonds qui veut une sortie « propre » ; bilan stable et comptes audités au 31/12.', bonne: 0, pourquoi: 'Processus compétitif, vendeur financier, bilan stable : la locked box donne au vendeur la certitude du prix, l\'acheteur est protégé par les clauses de leakage.' },
  { texte: 'Carve-out d\'une division d\'un groupe industriel (pas de comptes séparés historiques) ; NWC très saisonnier ; closing dans 7 mois.', bonne: 1, pourquoi: 'Sans comptes historiques fiables et avec un bilan qui bouge beaucoup, les completion accounts protègent l\'acheteur : le prix final reflète le bilan réel au closing.' },
  { texte: 'Société qui a connu deux années difficiles, cash très volatile ; acheteur industriel unique ; closing dans 6 mois.', bonne: 1, pourquoi: 'Risque élevé que le bilan se dégrade d\'ici au closing : les completion accounts (ajustement de net debt et de NWC) sont plus protecteurs pour l\'acheteur.' },
  { texte: 'Fondateur vendeur qui veut aller vite, un seul acheteur (fonds), comptes audités au 31/12 récents, closing dans 2 mois.', bonne: 0, pourquoi: 'Bilan de référence récent et audité, closing rapide : une locked box est simple et rapide, avec des protections fortes contre le leakage.' },
];
function casTs(r) {
  const s = r.choix(SECTEURS);
  const soc = societe(r, s);
  const ebitda = r.entre(6, 18);
  const marge = r.entre(s.marge[0], s.marge[1], 0.005);
  const ca = arrondi(ebitda / marge);
  const crois = r.entre(s.crois[0], s.crois[1], 0.005);
  const ca1 = arrondi(ca / (1 + crois)), ca2 = arrondi(ca1 / (1 + crois * 0.8));
  const eb1 = arrondi(ca1 * (marge - r.entre(0, 0.01, 0.001))), eb2 = arrondi(ca2 * (marge - r.entre(0, 0.015, 0.001)));
  const ajust = choisirAjustements(r, 5);
  const ebitdaAj = totalAjuste(ebitda, ajust);
  const base = detteDeBase(r);
  const postes = choisirPostesDette(r, 5);
  const dn = totalDette(base, postes);
  const bfrBase = arrondi(ca * r.entre(0.08, 0.2, 0.01));
  const mensuel = bfrMensuel(r, bfrBase, s.saison);
  const peg = arrondi(moyenne(mensuel), 0.01);
  const moisClosing = r.entier(0, 11);
  const retard = r.vrai(0.5) ? r.entre(0.3, 1.0) : 0;
  const bfrClosing = arrondi(mensuel[moisClosing] - retard);
  const ecartBfr = arrondi(bfrClosing - peg, 0.01);
  const multiple = r.entre(s.mult[0], s.mult[1], 0.5);
  const ve = arrondi(ebitdaAj * multiple, 0.01);
  const titres = arrondi(ve - dn + ecartBfr, 0.01);
  const scenario = r.choix(SCENARIOS_PRIX);
  const concentration = r.vrai(0.5) ? r.entier(22, 40) : 0;
  const grosAjust = [...ajust].filter((a) => a.effet).sort((a, b) => b.montant - a.montant)[0];
  const grosDette = [...postes].filter((p) => p.coef > 0).sort((a, b) => b.montant * b.coef - a.montant * a.coef)[0];

  const contexte = `<p><strong>${soc.nom}</strong> (${soc.ville}, créée en ${soc.creation}, ${soc.effectif} salariés) ${s.activite}. Un fonds mid-cap envisage de racheter 100 % des titres et te confie la due diligence financière buy-side.${concentration ? ` Le premier client représente ${concentration} % du revenue.` : ''}</p>
    ${tableau(['M€', 'FY24', 'FY25', 'LTM sept. 26'], [
      ['Revenue', nombre(ca2), nombre(ca1), nombre(ca)],
      ['EBITDA reported', nombre(eb2), nombre(eb1), nombre(ebitda)],
      ['EBITDA margin', pct(eb2 / ca2), pct(eb1 / ca1), pct(ebitda / ca)],
    ])}
    <h4>Informations sur l'EBITDA LTM</h4><ol>${ajust.map((a) => `<li>${a.texte}</li>`).join('')}</ol>
    <h4>Éléments de bilan au 30 septembre 2026</h4><ul>${lignesDette(base, postes).map((l) => `<li>${l}</li>`).join('')}</ul>
    <p class="note">Convention de l'acheteur : lease liability exclue, provisions et engagements net of tax (25 %).</p>
    <h4>NWC opérationnel mensuel (M€)</h4>${tableau(MOIS, [mensuel.map((v) => nombre(v))], 'compact')}
    <h4>Termes envisagés</h4><p>Prix = ${fois(multiple)} l'adjusted EBITDA LTM, en cash-free / debt-free, avec ajustement euro pour euro du NWC par rapport à la moyenne des 12 mois. Closing envisagé fin ${MOIS_LONGS[moisClosing]} ; NWC estimé au closing : ${meur(bfrClosing)}${retard ? ` (le vendeur a annoncé qu'il « optimiserait » le paiement des fournisseurs avant le closing, pour ${meur(retard)})` : ''}.</p>`;

  const synthese = [
    `Adjusted EBITDA de ${meur(ebitdaAj)} contre ${meur(ebitda)} reported (${signe(ebitdaAj - ebitda)} M€), surtout à cause de : ${grosAjust ? grosAjust.court.toLowerCase() : 'plusieurs adjustments'}.`,
    `Adjusted net debt de ${meur(dn, 2)}${grosDette ? `, dont ${grosDette.court.toLowerCase()}` : ''} : chaque élément réduit le prix euro pour euro.`,
    `NWC au closing ${ecartBfr < 0 ? 'inférieur' : 'supérieur'} au normatif (${meur(peg, 2)}) : ajustement de ${signe(ecartBfr, 2)} M€${retard ? ', et le retard de paiement fournisseurs annoncé doit être neutralisé par le peg' : ''}.`,
    `Risques propres au secteur : ${s.risques.slice(0, 2).join(' ; ')}${concentration ? ` ; concentration (1er client = ${concentration} % du revenue)` : ''}.`,
    `Recommandation : Equity Value d'environ ${meur(titres)} (${fois(multiple)} × adjusted EBITDA − net debt ± NWC), mécanisme adapté au contexte, garantie d'actif et de passif (ou W&I) et séquestre sur les risques identifiés.`,
  ];

  return {
    type: 'cas', titre: `Étude de cas TS : ${soc.nom} (${s.court})`, duree: 20 * 60,
    contexte,
    etapes: [
      { type: 'calcul', titre: '1. Adjusted EBITDA LTM', enonce: '<p>À partir des informations sur l\'EBITDA, calcule l\'Adjusted EBITDA LTM.</p>',
        champs: [champ('ebitda', 'Adjusted EBITDA LTM', ebitdaAj, 'M€', 0.06)], explication: tableauEbitda(ebitda, ajust, ebitdaAj) },
      { type: 'calcul', titre: '2. Adjusted net debt', enonce: '<p>Calcule la adjusted net debt au 30 septembre 2026 (2 décimales).</p>',
        champs: [champ('dn', 'Adjusted net debt', dn, 'M€', 0.06, 2)], explication: tableauDette(base, postes, dn) },
      { type: 'calcul', titre: '3. Normalised NWC et price adjustment', enonce: '<p>Calcule le normalised NWC (moyenne des 12 mois) puis le price adjustment au closing.</p>',
        champs: [champ('peg', 'Normalised NWC', peg, 'M€', 0.06, 2), champ('ecart', 'Price adjustment (NWC)', ecartBfr, 'M€', 0.08, 2)],
        explication: `<p>Peg = moyenne des 12 mois = <strong>${meur(peg, 2)}</strong>. Ajustement = ${nombre(bfrClosing)} − ${nombre(peg, 2)} = <strong>${signe(ecartBfr, 2)} M€</strong>.${retard ? ' Le retard de paiement fournisseurs baisse le NWC livré : il est compensé par la baisse du prix.' : ''}</p>` },
      { type: 'calcul', titre: '4. Equity Value', enonce: `<p>Avec un multiple de ${fois(multiple)} l'adjusted EBITDA, quelle Equity Value ?</p>`,
        champs: [champ('titres', 'Equity Value', titres, 'M€', 0.3)],
        explication: `<p>EV = ${nombre(ebitdaAj)} × ${nombre(multiple)} = ${nombre(ve, 2)} ; − adjusted net debt ${nombre(dn, 2)} ; ${signe(ecartBfr, 2)} d'ajustement de NWC = <strong>${meur(titres)}</strong>.</p>
          <p>Sans tes adjustments (EBITDA reported, dette comptable = emprunts − disponibilités), on obtiendrait ${meur(ebitda * multiple - (base.emprunts - base.dispo))} : ta DD change le prix de ${signe(titres - (ebitda * multiple - (base.emprunts - base.dispo)))} M€.</p>` },
      { type: 'ouverte', titre: '5. Pricing mechanism', duree: 90,
        enonce: `<p>Contexte de l'opération : ${scenario.texte}</p><p>Le partner : « Locked box ou completion accounts ? Justifie, et dis-moi comment tu protèges l'acheteur. »</p>`,
        reponse: `<p><strong>${scenario.bonne === 0 ? 'Locked box' : 'Completion accounts'}.</strong> ${scenario.pourquoi}</p>
          <p>${scenario.bonne === 0
            ? 'Protections de l\'acheteur : clauses de leakage (remboursement euro pour euro, liste fermée de permitted leakages), DD approfondie du bilan de référence (locked box date), ticker si le closing tarde.'
            : 'À verrouiller dans le SPA : définitions précises de la net debt, du cash et du NWC, peg (normalised NWC), principes comptables des comptes de closing, délai de contestation et expert indépendant en cas de désaccord.'}</p>
          <p>À écarter : un prix fixe sans ajustement ni garantie (l'acheteur porterait tout le risque du bilan) ou un earn-out sur la totalité du prix (il sert à combler un écart sur le business plan, pas à fixer le mécanisme de prix).</p>`,
        points: [
          { t: `Mécanisme recommandé : ${scenario.bonne === 0 ? 'locked box' : 'completion accounts'}`, mots: scenario.bonne === 0 ? ['locked box', 'locked'] : ['completion'] },
          { t: 'Justification par le contexte (bilan, calendrier, type de vendeur)', mots: ['bilan', 'closing', 'vendeur', 'audit', 'saison', 'carve', 'volatil', 'rapide'] },
          scenario.bonne === 0 ? { t: 'Protection contre le leakage', mots: ['leakage', 'fuite', 'ticker'] } : { t: 'Ajustement de net debt et de NWC (peg)', mots: ['net debt', 'nwc', 'peg', 'ajust'] },
          { t: 'Points à verrouiller dans le SPA', mots: ['spa', 'definition', 'expert', 'garantie', 'clause'] },
        ],
        conseil: 'Commence par ton choix, donne deux raisons tirées du contexte, puis la protection de l\'acheteur : le recruteur écoute ta logique.' },
      { type: 'ouverte', titre: '6. Ta synthèse pour le fonds', duree: 180,
        enonce: '<p>Le partner du fonds t\'appelle : « En 2 minutes, qu\'est-ce que je dois retenir de ta DD ? » Donne tes 3 points clés et ta recommandation.</p>',
        reponse: `<ul>${synthese.map((x) => `<li>${x}</li>`).join('')}</ul>`,
        points: [
          { t: 'Écart EBITDA reported / adjusted et principal adjustment', mots: ['ebitda', 'ajust', 'adjust', ...(grosAjust?.mots || [])] },
          { t: 'Adjusted net debt et debt-like principal', mots: ['net debt', 'debt', ...(grosDette?.mots || [])] },
          { t: 'Normalised NWC / ajustement au closing', mots: ['nwc', 'peg', 'normalis', 'bfr', 'normatif'] },
          { t: 'Risques du secteur ou de la société', mots: ['risque', ...s.motsRisques, ...(concentration ? ['concentration', 'client'] : [])] },
          { t: 'Recommandation : prix, mécanisme et garanties', mots: ['prix', 'garantie', 'gap', 'sequestre', 'w&i', 'locked', 'completion'] },
        ],
        conseil: 'Commence par la conclusion (« l\'adjusted EBITDA est de X, soit Y de moins que le vendeur ») puis justifie. Un partner veut le chiffre et l\'impact prix en premier.' },
    ],
    conseil: 'En cas pratique réel (1h30 à 2h), garde 15 minutes pour la synthèse : c\'est elle que le manager lit en premier.',
  };
}

export const GENERATEURS_TS = [
  { id: 'gen-ts-ebitda', m: 'ts', theme: 'qoe', niveau: 2, titre: 'Adjusted EBITDA : trier les adjustments', creer: ebitdaAjuste },
  { id: 'gen-ts-dette', m: 'ts', theme: 'dette', niveau: 2, titre: 'Adjusted net debt', creer: detteNette },
  { id: 'gen-ts-bfr', m: 'ts', theme: 'bfr', niveau: 2, titre: 'Normalised NWC et price adjustment', creer: bfrNormatif },
  { id: 'gen-ts-lockedbox', m: 'ts', theme: 'prix', niveau: 2, titre: 'Locked box : leakage et ticking fee', creer: lockedBox },
  { id: 'gen-ts-ratios', m: 'ts', theme: 'bfr', niveau: 1, titre: 'DSO, DIO et cash libéré', creer: ratiosBfr },
  { id: 'gen-ts-conversion', m: 'ts', theme: 'comptes', niveau: 1, titre: 'Cash conversion de l\'EBITDA', creer: conversionCash },
  { id: 'gen-ts-ifrs16', m: 'ts', theme: 'ifrs', niveau: 2, titre: 'IFRS 16 : EBITDA et leverage', creer: ifrs16 },
  { id: 'gen-ts-pont', m: 'ts', theme: 'valo', niveau: 1, titre: 'EV-to-Equity bridge', creer: pontValeur },
  { id: 'gen-ts-impact', m: 'ts', theme: 'valo', niveau: 1, titre: 'Impact des adjustments sur le prix', creer: impactPrix },
  { id: 'gen-ts-cutoff', m: 'ts', theme: 'qoe', niveau: 2, titre: 'Cut-off du revenue', creer: cutOff },
];

export const CAS_TS = { id: 'cas-ts-dd', m: 'ts', theme: 'cas', niveau: 3, titre: 'Étude de cas : due diligence complète', creer: casTs };
