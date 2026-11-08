// Cinq cas pratiques TS de difficulté croissante sur une même société fictive, Lumen Industrie SAS
// (fabricant d'éclairage professionnel, environ 8 M€ de CA, pic d'activité au 4e trimestre).
// C'est la société d'exemple du Working Capital Normalizer : ses écritures contiennent les pièges classiques d'une DD
// (fournisseurs étirés en décembre, fournisseur d'immobilisations, créance de cession, CIR, litige, bonus courus,
// retenue du factor, compte d'attente). Données FIXES (comme un recueil de cas) : tous les chiffres des corrigés sont
// CALCULÉS ici à partir des mêmes données que l'énoncé, pour qu'énoncé et corrigé ne puissent jamais diverger.
// Montants en k€ (milliers d'euros).
import { nombre } from '../outils.js';
import { tableau, champ, signe, MOIS } from './commun.js';

const k = (x, dec = 0) => nombre(x, dec);            // cellule de tableau (l'unité est dans l'en-tête)
const ke = (x, dec = 0) => `${nombre(x, dec)} k€`;   // montant dans une phrase
const j = (x, dec = 1) => `${nombre(x, dec)} j`;
const somme = (l) => l.reduce((a, b) => a + b, 0);

const PRESENTATION = `<p><strong>Lumen Industrie SAS</strong> (fictive) fabrique de l'éclairage LED professionnel pour les entrepôts, les usines et les collectivités. 48 salariés, environ 8 M€ de chiffre d'affaires, pic d'activité en octobre-décembre (chantiers à livrer avant la fin d'année). Un fonds small-cap envisage de racheter 100 % des titres ; tu fais la due diligence financière buy-side.</p>`;

// ------------------------------------------------------------------ données communes (exercice clos le 31/12/2025)
const CA = 8000, CA_N1 = 7300, ACHATS = 2880, EXTERNES = 1120, TVA = 0.2;
const CLIENTS_BRUTS = 1700, DOUTEUX = 60, DEPRECIATION = 45, STOCKS = 800, FOURNISSEURS = 1150, ETIRES = 450, ACOMPTES = 50;
const CA_TTC = CA * (1 + TVA), ACHATS_TTC = (ACHATS + EXTERNES) * (1 + TVA);

// NWC mensuel 2025 (définition TS, avant neutralisation du report de décembre), k€
const NWC_2025 = [1150, 1120, 1180, 1230, 1260, 1210, 1120, 1060, 1280, 1420, 1520, 1080];

// ---------------------------------------------------------------------------------------------------
// Cas 1 — Du bilan au trade working capital (facile)
// ---------------------------------------------------------------------------------------------------
function cas1() {
  const clientsNets = CLIENTS_BRUTS - DEPRECIATION;
  const twc = clientsNets + STOCKS - FOURNISSEURS - ACOMPTES;
  const twcJours = (twc / CA) * 365;
  const dso = (CLIENTS_BRUTS / CA_TTC) * 365;
  const dpo = (FOURNISSEURS / ACHATS_TTC) * 365;
  const dio = (STOCKS / CA) * 365;
  const dpoSans = ((FOURNISSEURS - ETIRES) / ACHATS_TTC) * 365;
  return {
    type: 'cas', titre: 'Cas Lumen 1 : du bilan au trade working capital', duree: 15 * 60,
    contexte: `${PRESENTATION}
      ${tableau(['Compte de résultat 2025', 'k€ HT'], [['Chiffre d\'affaires', k(CA)], ['Chiffre d\'affaires 2024', k(CA_N1)], ['Achats de matières', k(ACHATS)], ['Charges externes', k(EXTERNES)]])}
      ${tableau(['Bilan au 31/12/2025', 'k€'], [
        ['Clients (bruts, TTC)', k(CLIENTS_BRUTS)], ['dont clients douteux', k(DOUTEUX)], ['Dépréciation des clients', k(-DEPRECIATION)],
        ['Stocks (matières et produits finis)', k(STOCKS)], ['Fournisseurs (TTC)', k(-FOURNISSEURS)], ['Acomptes reçus des clients', k(-ACOMPTES)],
      ])}
      <p class="note">TVA 20 % sur les ventes et les achats. Convention : DSO et DPO en TTC sur 365 jours ; stocks en jours de CA HT. Le DAF précise qu'une partie des paiements fournisseurs de décembre a été « décalée en janvier ».</p>`,
    etapes: [
      { type: 'calcul', titre: '1. Trade working capital', enonce: '<p>Calcule le trade working capital (TWC) au 31/12/2025, en k€ puis en jours de CA.</p>',
        champs: [champ('twc', 'TWC', twc, 'k€', 3, 0), champ('twcj', 'TWC en jours de CA', twcJours, 'j', 0.6, 1)],
        explication: `${tableau(['TWC', 'k€'], [['Clients nets (brut − dépréciation)', k(clientsNets)], ['+ Stocks', k(STOCKS)], ['− Fournisseurs', k(-FOURNISSEURS)], ['− Acomptes reçus', k(-ACOMPTES)], ['!TWC', k(twc)]])}
          <p>En jours : ${k(twc)} / ${k(CA)} × 365 = <strong>${j(twcJours)}</strong> de CA. Les acomptes reçus réduisent le TWC : le client a déjà payé une partie du produit.</p>` },
      { type: 'calcul', titre: '2. DSO, DPO et stocks en jours', enonce: '<p>Calcule le DSO, le DPO et les stocks en jours de CA.</p>',
        champs: [champ('dso', 'DSO', dso, 'j', 0.6, 1), champ('dpo', 'DPO', dpo, 'j', 0.8, 1), champ('dio', 'Stocks en jours de CA', dio, 'j', 0.5, 1)],
        explication: `<p>DSO = créances brutes ${k(CLIENTS_BRUTS)} / CA TTC ${k(CA_TTC)} × 365 = <strong>${j(dso)}</strong>. On prend les créances brutes : un délai mesure ce qui est dû, dépréciation ou non.</p>
          <p>DPO = fournisseurs ${k(FOURNISSEURS)} / (achats + charges externes) TTC ${k(ACHATS_TTC)} × 365 = <strong>${j(dpo)}</strong>. Les charges externes comptent : le poste fournisseurs contient aussi les prestataires.</p>
          <p>Stocks = ${k(STOCKS)} / ${k(CA)} × 365 = <strong>${j(dio)}</strong> de CA.</p>` },
      { type: 'ouverte', titre: '3. Un DPO de 87 jours', duree: 120,
        enonce: `<p>Le manager : « Ton DPO dépasse 85 jours, alors que la loi limite les délais à 60 jours. Qu'est-ce que tu en conclus, et que demandes-tu au DAF ? »</p>`,
        reponse: `<p><strong>Je ne conclus rien sur la loi</strong> : c'est un délai apparent, une photo au 31/12. Mais le DAF a lui-même parlé de paiements décalés : c'est le signe d'un <strong>window dressing</strong> de fin d'année.</p>
          <ul><li>Je demande la <strong>balance âgée fournisseurs</strong> au 31/12 et les paiements de janvier : si ${ke(ETIRES)} ont été payés début janvier, le DPO « normal » tombe vers ${j(dpoSans)}.</li>
          <li>Je compare le DPO de décembre à celui des autres mois et de décembre 2024 : un écart isolé confirme le décalage ponctuel.</li>
          <li>Conséquence prix : ce décalage gonfle la trésorerie et baisse le NWC de clôture. Il doit être neutralisé dans le peg et peut être traité en <strong>debt-like</strong> (dette fournisseurs échue).</li></ul>`,
        points: [
          { t: 'Délai apparent, pas de conclusion juridique', mots: ['apparent', 'photo', 'cloture'] },
          { t: 'Window dressing / paiements décalés', mots: ['window', 'decal', 'report', 'etir', 'retard'] },
          { t: 'Balance âgée et paiements de janvier', mots: ['balance agee', 'janvier', 'anciennete', 'aged'] },
          { t: 'Effet sur le peg / debt-like', mots: ['peg', 'debt-like', 'dette', 'neutralis'] },
        ],
        conseil: 'Ne parle jamais d\'infraction à partir d\'un ratio annuel : le manager teste ta prudence autant que ta technique.' },
      { type: 'ouverte', titre: '4. Ton message au manager', duree: 90,
        enonce: '<p>En trois phrases : que retiens-tu du BFR de Lumen à ce stade, et quelle est ta première demande d\'information ?</p>',
        reponse: `<ul><li>Le TWC atteint ${ke(twc)}, soit ${j(twcJours, 0)} de CA ; les clients pèsent le plus (DSO de ${j(dso, 0)}), ce qui est cohérent avec une clôture au pic d'activité.</li>
          <li>Le DPO de ${j(dpo, 0)} est gonflé par ${ke(ETIRES)} de paiements reportés en janvier : le NWC de clôture est flatté et ne peut pas servir de référence.</li>
          <li>Première demande : le NWC mensuel sur 24 mois et les balances âgées clients et fournisseurs, pour fixer un peg sur la moyenne et isoler les éléments anormaux.</li></ul>`,
        points: [
          { t: 'Niveau du TWC chiffré', mots: ['twc', 'trade', 'jours', 'k€'] },
          { t: 'Clôture au pic / saisonnalité', mots: ['pic', 'saison', 'cloture'] },
          { t: 'Fournisseurs reportés', mots: ['fournisseur', 'report', 'etir', 'decal'] },
          { t: 'Demande : NWC mensuel / balances âgées', mots: ['mensuel', 'balance agee', '24 mois', 'moyenne'] },
        ],
        conseil: 'Chiffre d\'abord, explication ensuite, demande enfin : c\'est la forme d\'un e-mail de DD.' },
    ],
    conseil: 'Ce cas est la base de tous les autres : refais-le jusqu\'à calculer le TWC et les trois ratios en moins de 5 minutes.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Cas 2 — NWC mensuel et peg (moyen)
// ---------------------------------------------------------------------------------------------------
function cas2() {
  const peg = somme(NWC_2025) / 12;
  const neutralise = NWC_2025.map((v, i) => (i === 11 ? v + ETIRES : v));
  const pegNet = somme(neutralise) / 12;
  const closing = 1150; // NWC estimé au closing, fin mars 2026
  const ajustement = closing - pegNet;
  const mars = NWC_2025[2];
  return {
    type: 'cas', titre: 'Cas Lumen 2 : NWC mensuel et peg', duree: 20 * 60,
    contexte: `${PRESENTATION}
      <h4>NWC mensuel 2025 (définition TS, k€)</h4>${tableau(MOIS, [NWC_2025.map((v) => k(v))], 'compact')}
      <p>Le NWC de décembre comprend ${ke(ETIRES)} de paiements fournisseurs reportés en janvier 2026 (révélés par la balance âgée). Aucun report de ce type en décembre 2024.</p>
      <p>Termes envisagés : prix en cash-free / debt-free, ajustement euro pour euro du NWC livré au closing par rapport à un peg. Closing prévu fin mars 2026 ; NWC estimé au closing : ${ke(closing)}.</p>`,
    etapes: [
      { type: 'calcul', titre: '1. Normalised NWC brut', enonce: '<p>Calcule la moyenne des 12 mois de 2025 telle que fournie par le vendeur.</p>',
        champs: [champ('peg', 'Moyenne LTM', peg, 'k€', 2, 1)],
        explication: `<p>Somme des 12 mois = ${k(somme(NWC_2025))} ; moyenne = <strong>${ke(peg, 1)}</strong>. Le mois de décembre (${k(NWC_2025[11])}) est anormalement bas pour un mois de pic.</p>` },
      { type: 'calcul', titre: '2. Peg après neutralisation', enonce: `<p>Neutralise les ${ke(ETIRES)} de fournisseurs étirés en décembre, puis recalcule la moyenne.</p>`,
        champs: [champ('pegnet', 'Normalised NWC retraité', pegNet, 'k€', 2, 1)],
        explication: `<p>Décembre retraité = ${k(NWC_2025[11])} + ${k(ETIRES)} = ${k(neutralise[11])}. Moyenne = ${k(somme(neutralise))} / 12 = <strong>${ke(pegNet, 1)}</strong>, soit ${signe(pegNet - peg, 1)} k€.</p>
          <p>Qui y gagne ? <strong>L'acheteur</strong> : un peg plus haut oblige le vendeur à livrer davantage de NWC au closing. Laisser le report dans la moyenne aurait fait payer à l'acheteur un « cash » qui n'était qu'une dette fournisseurs différée.</p>` },
      { type: 'calcul', titre: '3. Price adjustment au closing', enonce: '<p>Avec le peg retraité, quel est l\'ajustement de prix si le NWC livré fin mars 2026 est celui estimé ?</p>',
        champs: [champ('ajust', 'Ajustement de prix (NWC livré − peg)', ajustement, 'k€', 2, 1)],
        explication: `<p>${k(closing)} − ${k(pegNet, 1)} = <strong>${signe(ajustement, 1)} k€</strong> : le prix baisse. Remarque : en mars 2025, le NWC était de ${k(mars)}, déjà sous la moyenne ; une partie de l'ajustement vient donc de la saisonnalité, pas d'une dégradation.</p>` },
      { type: 'ouverte', titre: '4. « C\'est notre politique de paiement »', duree: 120,
        enonce: `<p>Le vendeur refuse la neutralisation : « Payer nos fournisseurs en janvier, c'est notre politique. » Que réponds-tu ?</p>`,
        reponse: `<ul><li>Une politique se voit <strong>tous les mois</strong> : or le report n'existe qu'en décembre 2025, pas en décembre 2024 ni dans les autres mois. C'est un événement ponctuel de fin d'exercice, l'année de la vente.</li>
          <li>Si c'était vraiment une nouvelle politique durable, elle devrait apparaître dans les 12 mois de référence ; sinon, la mettre seulement dans le mois de clôture biaise le peg.</li>
          <li>La part payée au-delà des conditions normales est une dette échue : traitement en <strong>debt-like</strong> à la date de référence, et neutralisation dans le peg. C'est la <strong>cohérence entre peg et NWC de closing</strong> qui protège les deux parties.</li></ul>`,
        points: [
          { t: 'Ponctuel vs récurrent (comparaison des mois et de 2024)', mots: ['ponctuel', 'recurrent', '2024', 'tous les mois', 'isole'] },
          { t: 'Cohérence peg / closing', mots: ['coheren', 'meme', 'peg'] },
          { t: 'Debt-like pour la part échue', mots: ['debt-like', 'dette', 'echu'] },
        ],
        conseil: 'Ne conteste pas l\'intention du vendeur : montre les chiffres des autres mois. Les faits gagnent la négociation.' },
      { type: 'ouverte', titre: '5. Peg moyen ou peg saisonnier ?', duree: 120,
        enonce: `<p>Le closing tombe fin mars, un mois naturellement plus bas que la moyenne. Le vendeur propose un peg « de mars » plutôt que la moyenne. Qui a raison ?</p>`,
        reponse: `<p>Les deux positions se défendent. Avec un peg moyen, le prix baisserait en partie à cause de la <strong>saisonnalité</strong> (mars 2025 : ${k(mars)} contre une moyenne de ${k(pegNet, 0)}) : c'est l'argument du vendeur. Mais un peg saisonnier suppose un historique mensuel fiable sur plusieurs années, et il est plus facile à manipuler (un seul mois de référence).</p>
          <p>Compromis classique : <strong>peg saisonnier</strong> fondé sur la moyenne des mois de mars de plusieurs exercices, ou moyenne LTM avec une date de closing choisie en conséquence. L'important est la même définition et les mêmes retraitements au peg et au closing.</p>`,
        points: [
          { t: 'Effet de la saisonnalité sur l\'ajustement', mots: ['saison', 'mars', 'cycle'] },
          { t: 'Arguments des deux parties', mots: ['vendeur', 'acheteur', 'deux'] },
          { t: 'Compromis / même définition', mots: ['compromis', 'plusieurs', 'meme definition', 'coheren', 'historique'] },
        ],
        conseil: 'En entretien, une question de négociation n\'a pas de bonne réponse unique : expose les deux camps, puis donne ta recommandation.' },
    ],
    conseil: 'Retiens la phrase clé : « un peg se compare au NWC du closing avec exactement la même définition et les mêmes retraitements ».',
  };
}

// ---------------------------------------------------------------------------------------------------
// Cas 3 — Les retraitements du NWC (moyen)
// ---------------------------------------------------------------------------------------------------
// [libellé, montant au bilan (+ actif / − passif), traitement : 'nwc' | 'dette' (debt-like) | 'cash' (cash-like), pourquoi]
const POSTES_3 = [
  ['Clients nets', 1655, 'nwc', 'Opérationnel.'],
  ['Stocks', 800, 'nwc', 'Opérationnel.'],
  ['Fournisseurs d\'exploitation (hors report de décembre)', -700, 'nwc', 'Opérationnel, aux conditions normales.'],
  ['Fournisseurs : paiements de décembre reportés en janvier', -450, 'dette', 'Dette échue anormale à la date de référence : debt-like (et neutralisée dans le peg).'],
  ['Fournisseurs d\'immobilisations (compte 404)', -120, 'dette', 'Lié aux capex, pas à l\'exploitation : debt-like.'],
  ['Acomptes reçus des clients', -50, 'nwc', 'Opérationnel et récurrent (commandes du 4e trimestre).'],
  ['Dettes sociales (salaires et charges du mois)', -310, 'nwc', 'Récurrent, payé chaque mois.'],
  ['Bonus annuels 2025 courus, versés en mars 2026', -144, 'dette', 'Gagnés avant la date de référence, payés après : debt-like selon la convention de l\'acheteur.'],
  ['TVA à décaisser', -95, 'nwc', 'Récurrente, liée à l\'activité.'],
  ['Impôt sur les bénéfices à payer', -70, 'dette', 'Lié au résultat, pas à l\'exploitation : debt-like.'],
  ['Crédit d\'impôt recherche à recevoir', 85, 'cash', 'Créance sur l\'État non opérationnelle : cash-like.'],
  ['Créance sur cession d\'un véhicule (compte 462)', 25, 'cash', 'Produit d\'une cession d\'actif : cash-like.'],
  ['Charges à payer : litige client Delta', -60, 'dette', 'Non récurrent : debt-like.'],
  ['Compte d\'attente : encaissements à identifier', -35, 'nwc', 'Reste dans le NWC (probablement des règlements clients non lettrés) : question au DAF.'],
];
function cas3() {
  const presente = somme(POSTES_3.map((p) => p[1]));
  const nwc = somme(POSTES_3.filter((p) => p[2] === 'nwc').map((p) => p[1]));
  const debtLike = -somme(POSTES_3.filter((p) => p[2] === 'dette').map((p) => p[1]));
  const cashLike = somme(POSTES_3.filter((p) => p[2] === 'cash').map((p) => p[1]));
  const nom = { nwc: 'NWC', dette: 'Debt-like', cash: 'Cash-like' };
  return {
    type: 'cas', titre: 'Cas Lumen 3 : les retraitements du NWC', duree: 25 * 60,
    contexte: `${PRESENTATION}
      <p>Le vendeur présente un « BFR » au 31/12/2025 de <strong>${ke(presente)}</strong>, qui additionne tous les postes ci-dessous. L'outil de l'équipe a extrait le détail du FEC.</p>
      ${tableau(['Poste au 31/12/2025', 'k€'], POSTES_3.map((p) => [p[0], k(p[1])]))}
      <p class="note">Convention de l'acheteur : les dettes non opérationnelles, échues anormalement ou non récurrentes (dont les bonus annuels courus) sont debt-like ; les créances non opérationnelles sont cash-like ; montants retenus bruts, sans effet d'impôt.</p>`,
    etapes: [
      { type: 'calcul', titre: '1. NWC au sens TS', enonce: '<p>Ne garde que les postes opérationnels et récurrents : quel est le NWC ajusté au 31/12/2025 ?</p>',
        champs: [champ('nwc', 'NWC ajusté', nwc, 'k€', 3, 0)],
        explication: `${tableau(['Poste', 'k€', 'Traitement', 'Pourquoi'], POSTES_3.map((p) => [p[0], k(p[1]), nom[p[2]], p[3]]))}
          <p>NWC ajusté = somme des lignes « NWC » = <strong>${ke(nwc)}</strong>, contre ${ke(presente)} présentés par le vendeur.</p>` },
      { type: 'calcul', titre: '2. Debt-like et cash-like', enonce: '<p>Calcule le total des debt-like items et le total des cash-like items.</p>',
        champs: [champ('dl', 'Debt-like items', debtLike, 'k€', 3, 0), champ('cl', 'Cash-like items', cashLike, 'k€', 2, 0)],
        explication: `<p>Debt-like = ${POSTES_3.filter((p) => p[2] === 'dette').map((p) => k(-p[1])).join(' + ')} = <strong>${ke(debtLike)}</strong>.</p>
          <p>Cash-like = ${POSTES_3.filter((p) => p[2] === 'cash').map((p) => k(p[1])).join(' + ')} = <strong>${ke(cashLike)}</strong>.</p>
          <p>Contrôle : NWC ajusté − debt-like + cash-like = ${k(nwc)} − ${k(debtLike)} + ${k(cashLike)} = ${k(nwc - debtLike + cashLike)}, soit le BFR présenté. Rien ne disparaît : les postes changent seulement de case.</p>` },
      { type: 'calcul', titre: '3. Effet sur l\'Equity Value', enonce: '<p>À Enterprise Value inchangée, de combien ces reclassements font-ils varier l\'Equity Value (via la net debt) ?</p>',
        champs: [champ('eq', 'Variation de l\'Equity Value', -(debtLike - cashLike), 'k€', 3, 0)],
        explication: `<p>Chaque euro de debt-like réduit le prix des titres, chaque euro de cash-like l'augmente : ${k(-debtLike)} + ${k(cashLike)} = <strong>${signe(-(debtLike - cashLike), 0)} k€</strong>.</p>
          <p>Attention à la <strong>cohérence</strong> : les mêmes postes doivent être exclus du peg. Sinon, le report fournisseurs serait compté deux fois (une fois en dette, une fois en NWC plus bas au closing).</p>` },
      { type: 'ouverte', titre: '4. Le débat des bonus', duree: 120,
        enonce: `<p>Le vendeur conteste : « Les bonus reviennent chaque année, ils sont opérationnels : ils restent dans le BFR. » Que réponds-tu ?</p>`,
        reponse: `<ul><li>Le vendeur a un argument : les bonus sont récurrents. S'ils restent en NWC, il faut alors les laisser <strong>aussi dans les 12 mois du peg</strong> (provision qui monte de 12 k€ par mois puis tombe en mars).</li>
          <li>Position de l'acheteur : les bonus 2025 ont été <strong>gagnés avant la date de référence</strong> et seront payés après, avec le cash de l'acheteur : c'est une dette du vendeur, donc debt-like.</li>
          <li>Ce qui compte : traiter le poste <strong>de la même façon au peg et au closing</strong>, sinon on le compte deux fois ou on l'oublie. Le choix se négocie et s'écrit dans le SPA.</li></ul>`,
        points: [
          { t: 'Argument du vendeur (récurrent)', mots: ['recurrent', 'chaque annee', 'operationnel'] },
          { t: 'Argument de l\'acheteur (gagné avant, payé après)', mots: ['avant', 'apres', 'gagne', 'dette du vendeur'] },
          { t: 'Cohérence peg / closing', mots: ['coheren', 'meme', 'peg', 'deux fois'] },
          { t: 'Se négocie dans le SPA', mots: ['spa', 'negoci', 'convention'] },
        ] },
      { type: 'ouverte', titre: '5. Le compte d\'attente', duree: 90,
        enonce: `<p>${ke(35)} d'« encaissements à identifier » restent au compte d'attente au 31/12. Que demandes-tu, et pourquoi ?</p>`,
        reponse: `<ul><li>La liste des encaissements et leur affectation en janvier : ce sont probablement des règlements clients non lettrés. S'ils réduisent des créances, les clients nets sont surévalués de ${ke(35)} et le DSO aussi.</li>
          <li>Un compte d'attente non soldé à la clôture est un signal sur la qualité du suivi comptable : je regarde son ancienneté et son évolution mensuelle.</li>
          <li>Impact : neutre sur le NWC total s'il s'agit de clients, mais il fausse la balance âgée et l'analyse des créances douteuses.</li></ul>`,
        points: [
          { t: 'Lettrage / affectation des encaissements', mots: ['lettr', 'affect', 'identifi', 'janvier'] },
          { t: 'Effet sur les clients / DSO', mots: ['client', 'dso', 'creance'] },
          { t: 'Qualité comptable', mots: ['qualite', 'suivi', 'anciennete', 'controle'] },
        ] },
    ],
    conseil: 'Pour chaque poste, pose-toi deux questions : est-il opérationnel ? est-il récurrent ? Deux « oui » : NWC. Sinon : net debt (debt-like ou cash-like).',
  };
}

// ---------------------------------------------------------------------------------------------------
// Cas 4 — Lumen face à son secteur (difficile) : chiffres du benchmark BFR, cohorte industrie manufacturière 2024
// ---------------------------------------------------------------------------------------------------
const SECTEUR = {
  n: 6530,
  dso: { q1: 34.3, med: 52.8, q3: 70.0, p90: 94.1 },
  dpo: { q1: 40.3, med: 53.7, q3: 71.0, p90: 94.9 },
  stocks: { q1: 31.8, med: 53.5, q3: 85.9, p90: 130.4 },
  nwc: { q1: 22.2, med: 53.5, q3: 89.8, p90: 131.3 },
  dpoProcedure: 20.6, // écart de DPO médian des sociétés entrées en procédure collective dans les 24 mois
};
function cas4() {
  const dso = (CLIENTS_BRUTS / CA_TTC) * 365;
  const dpo = (FOURNISSEURS / ACHATS_TTC) * 365;
  const dpoSans = ((FOURNISSEURS - ETIRES) / ACHATS_TTC) * 365;
  const dio = (STOCKS / CA) * 365;
  const cashDso = (dso - SECTEUR.dso.med) * (CA_TTC / 365);
  const ligne = (nom, x, s) => [nom, nombre(x, 1), nombre(s.q1, 1), nombre(s.med, 1), nombre(s.q3, 1), nombre(s.p90, 1)];
  return {
    type: 'cas', titre: 'Cas Lumen 4 : Lumen face à son secteur', duree: 25 * 60,
    contexte: `${PRESENTATION}
      <p>Ton benchmark BFR situe Lumen dans la cohorte <strong>industrie manufacturière 2024</strong> (${nombre(SECTEUR.n, 0)} sociétés, comptes publiés, fiabilité A). Délais apparents, photo à la clôture.</p>
      ${tableau(['En jours', 'Lumen 31/12/2025', 'Q1', 'Médiane', 'Q3', 'P90'], [
        ligne('DSO (TTC)', dso, SECTEUR.dso), ligne('DPO (TTC)', dpo, SECTEUR.dpo), ligne('Stocks en jours de CA', dio, SECTEUR.stocks),
      ])}
      <p>Autres faits : Lumen clôture au pic de son activité ; ${ke(ETIRES)} de paiements fournisseurs de décembre ont été reportés en janvier. Dans la cohorte, les sociétés entrées en procédure collective dans les 24 mois après la clôture avaient un DPO médian supérieur de ${j(SECTEUR.dpoProcedure)} à celui des autres. CA 2025 : ${ke(CA)} HT, TVA 20 %.</p>`,
    etapes: [
      { type: 'calcul', titre: '1. Le cash d\'un DSO à la médiane', enonce: '<p>Si le DSO de Lumen revenait à la médiane du secteur, combien de cash serait libéré ?</p>',
        champs: [champ('cash', 'Cash libéré', cashDso, 'k€', 5, 0)],
        explication: `<p>(${nombre(dso, 1)} − ${nombre(SECTEUR.dso.med, 1)}) jours × CA TTC par jour (${k(CA_TTC)} / 365 = ${nombre(CA_TTC / 365, 1)}) = <strong>${ke(cashDso)}</strong>.</p>
          <p>À prendre avec prudence : Lumen clôture au pic, son DSO de clôture est mécaniquement haut. Comparer une clôture au pic à des sociétés qui clôturent surtout en décembre sans saisonnalité marquée surestime l'écart.</p>` },
      { type: 'calcul', titre: '2. Le DPO sans le report', enonce: `<p>Recalcule le DPO de Lumen sans les ${ke(ETIRES)} reportés en janvier.</p>`,
        champs: [champ('dpo', 'DPO hors report', dpoSans, 'j', 0.5, 1)],
        explication: `<p>(${k(FOURNISSEURS)} − ${k(ETIRES)}) / ${k(ACHATS_TTC)} × 365 = <strong>${j(dpoSans)}</strong>, au niveau de la médiane du secteur (${j(SECTEUR.dpo.med)}). Le DPO publié (${j(dpo)}) dépasse le Q3 uniquement à cause du report : c'est un effet de clôture, pas une politique fournisseurs.</p>` },
      { type: 'ouverte', titre: '3. Utiliser le benchmark pour le peg ?', duree: 120,
        enonce: `<p>Le fonds : « Le DSO de Lumen est 12 jours au-dessus de la médiane. Utilisons ça pour baisser le peg. » Ton avis ?</p>`,
        reponse: `<ul><li><strong>Non pour le peg</strong> : le peg se fixe sur l'historique mensuel de la cible, avec ses propres conditions clients. La médiane est une photo de clôture d'autres sociétés ; la comparer à un peg mélange deux mesures.</li>
          <li>L'écart s'explique en partie par la <strong>clôture au pic</strong> : il faut comparer le DSO moyen de l'année, ou le DSO de clôture de sociétés qui clôturent aussi au pic.</li>
          <li><strong>Oui pour poser des questions</strong> : balance âgée clients, part des grands comptes et des collectivités (délais longs), créances de plus de 90 jours à sortir du peg si elles sont douteuses.</li>
          <li>Pour le business plan : un retour vers la médiane est un levier de cash possible (${ke(cashDso)} au maximum), à présenter comme incertain.</li></ul>`,
        points: [
          { t: 'Le peg repose sur l\'historique de la cible', mots: ['historique', 'mensuel', 'cible', 'propre'] },
          { t: 'Effet de clôture / saisonnalité', mots: ['cloture', 'pic', 'saison'] },
          { t: 'Le benchmark sert à poser des questions', mots: ['question', 'balance agee', 'grands comptes', 'collectivit'] },
          { t: 'Levier de cash du BP, incertain', mots: ['business plan', 'levier', 'incertain', 'bp'] },
        ],
        conseil: 'Un benchmark est un argument d\'appoint. Le dire de toi-même montre que tu connais les limites de tes chiffres.' },
      { type: 'ouverte', titre: '4. Le signal des procédures collectives', duree: 120,
        enonce: `<p>Dans la cohorte, les sociétés qui ont fait défaut avaient un DPO plus long de ${j(SECTEUR.dpoProcedure, 0)}. Faut-il s'inquiéter pour Lumen ?</p>`,
        reponse: `<p>Le signal mérite d'être vérifié, sans conclure trop vite. Hors report de décembre, le DPO de Lumen (${j(dpoSans, 0)}) est <strong>à la médiane</strong> : l'allongement est ponctuel et daté (décembre 2025, l'année de la vente), ce qui ressemble davantage à du <strong>window dressing</strong> qu'à une tension de trésorerie durable.</p>
          <ul><li>À vérifier : les paiements de janvier ont-ils bien eu lieu ? Y a-t-il des relances, pénalités de retard ou fournisseurs qui exigent un paiement comptant ?</li>
          <li>Traitement : neutralisation dans le peg et ${ke(ETIRES)} en debt-like.</li>
          <li>Si le report se répétait plusieurs mois, ce serait un vrai signal de tension, à traiter dans le financement de l'opération.</li></ul>`,
        points: [
          { t: 'DPO hors report à la médiane', mots: ['mediane', 'hors report', 'normal'] },
          { t: 'Ponctuel / window dressing', mots: ['ponctuel', 'window', 'decembre', 'vente'] },
          { t: 'Vérifications (paiements de janvier, relances)', mots: ['janvier', 'relance', 'penalit', 'verifi'] },
          { t: 'Traitement peg / debt-like', mots: ['peg', 'debt-like', 'dette'] },
        ] },
      { type: 'ouverte', titre: '5. Synthèse pour le partner', duree: 150,
        enonce: '<p>En trois phrases : où se situe Lumen dans son secteur, et quelles questions poses-tu au DAF ?</p>',
        reponse: `<ul><li>Clients : DSO de ${j(dso, 0)}, entre la médiane et le Q3 du secteur, en partie expliqué par une clôture au pic ; à confirmer sur la moyenne mensuelle et la balance âgée.</li>
          <li>Fournisseurs : DPO de ${j(dpo, 0)} publié, mais ${j(dpoSans, 0)} hors report de décembre, à la médiane : ${ke(ETIRES)} à neutraliser dans le peg et à traiter en debt-like.</li>
          <li>Stocks : ${j(dio, 0)} de CA, entre le Q1 et la médiane du secteur, donc plutôt bas : cohérent avec un pic d'expéditions en fin d'année qui vide les stocks au 31/12.</li>
          <li>Questions au DAF : balances âgées clients et fournisseurs, paiements de janvier 2026, NWC mensuel sur 24 mois, conditions des principaux clients publics.</li></ul>`,
        points: [
          { t: 'Position clients chiffrée', mots: ['dso', 'client', 'q3', 'mediane'] },
          { t: 'Fournisseurs : publié vs hors report', mots: ['dpo', 'report', 'hors'] },
          { t: 'Stocks', mots: ['stock', 'q1'] },
          { t: 'Questions au DAF', mots: ['balance agee', 'janvier', 'mensuel', 'question'] },
        ],
        conseil: 'Le partner veut la position et la conséquence prix en premier ; la méthode ensuite, seulement s\'il la demande.' },
    ],
    conseil: 'Chiffres du secteur tirés de ton benchmark (comptes publiés 2024) : en entretien, cite-les comme des repères, jamais comme des normes.',
  };
}

// ---------------------------------------------------------------------------------------------------
// Cas 5 — Due diligence complète : du FEC au prix (difficile)
// ---------------------------------------------------------------------------------------------------
const AJUSTEMENTS_5 = [
  ['Honoraires de conseil liés à la vente (one-off)', 45],
  ['Rémunération du dirigeant sous le marché (90 k€ versés, 150 k€ pour un DG recruté)', -60],
  ['Loyer payé à la SCI du dirigeant au-dessus du marché (120 k€ contre 90 k€)', 30],
  ['Avoir exceptionnel au client Delta pour solder un litige', 40],
  ['Écart d\'inventaire constaté en janvier 2026 sur le stock du 31/12/2025', -35],
];
const DETTE_5 = [
  ['Emprunts bancaires', 1400, 'Dette financière'],
  ['Compte courant de Lumen Holding (groupe)', 300, 'Dette financière'],
  ['Comptes courants d\'associés', 50, 'Dette financière'],
  ['Trésorerie', -520, 'Cash'],
  ['Fournisseurs de décembre reportés en janvier', 450, 'Debt-like'],
  ['Fournisseurs d\'immobilisations', 120, 'Debt-like'],
  ['Impôt sur les bénéfices à payer', 70, 'Debt-like'],
  ['Litige client Delta (charges à payer)', 60, 'Debt-like'],
  ['Bonus annuels 2025 courus', 144, 'Debt-like'],
  ['Affacturage déconsolidant : financement reçu (encours cédé 600 − retenue 40)', 560, 'Debt-like'],
  ['Crédit d\'impôt recherche à recevoir', -85, 'Cash-like'],
  ['Créance sur cession de véhicule', -25, 'Cash-like'],
];
function cas5() {
  const ebitda = 960, multiple = 7;
  const ebitdaAj = ebitda + somme(AJUSTEMENTS_5.map((a) => a[1]));
  const detteComptable = 1400 + 300 + 50 - 520;
  const detteAj = somme(DETTE_5.map((d) => d[1]));
  const factor = 560;
  const mensuel = NWC_2025.map((v, i) => v + factor + (i === 11 ? ETIRES : 0));
  const peg = somme(mensuel) / 12;
  const closing = 1150 + factor;
  const ajustNwc = closing - peg;
  const ve = ebitdaAj * multiple;
  const equity = ve - detteAj + ajustNwc;
  const equityVendeur = ebitda * multiple - detteComptable;
  return {
    type: 'cas', titre: 'Cas Lumen 5 : due diligence complète, du FEC au prix', duree: 35 * 60,
    contexte: `${PRESENTATION}
      <p>Le vendeur demande ${nombre(multiple, 0)} fois l'EBITDA 2025 reported (${ke(ebitda)}), moins la dette comptable (emprunts et comptes courants moins trésorerie), soit <strong>${ke(equityVendeur)}</strong> pour les titres.</p>
      <h4>Informations relevées sur l'EBITDA 2025</h4><ol>${AJUSTEMENTS_5.map((a) => `<li>${a[0]} : ${ke(Math.abs(a[1]))}</li>`).join('')}</ol>
      <h4>Éléments de bilan au 31/12/2025 (k€)</h4><ul>${DETTE_5.map((d) => `<li>${d[0]} : ${k(Math.abs(d[1]))}</li>`).join('')}</ul>
      <p>Le contrat d'affacturage montre une cession sans recours : les créances cédées (encours de ${ke(600)} environ chaque mois) sortent du bilan. Le NWC mensuel 2025 ci-dessous est celui du vendeur, <strong>avant</strong> réintégration de l'affacturage et neutralisation du report de décembre :</p>
      ${tableau(MOIS, [NWC_2025.map((v) => k(v))], 'compact')}
      <p class="note">Convention de l'acheteur : affacturage réintégré (créances cédées nettes de la retenue en NWC, financement en net debt), bonus et litiges en debt-like, montants bruts sans effet d'impôt. Closing fin mars 2026 ; NWC estimé au closing (avant retraitements) : ${ke(1150)}. Prix = ${nombre(multiple, 0)} fois l'adjusted EBITDA, cash-free / debt-free, ajustement euro pour euro du NWC.</p>`,
    etapes: [
      { type: 'calcul', titre: '1. Adjusted EBITDA', enonce: '<p>Calcule l\'adjusted EBITDA 2025.</p>',
        champs: [champ('ebitda', 'Adjusted EBITDA', ebitdaAj, 'k€', 2, 0)],
        explication: `${tableau(['EBITDA bridge', 'k€'], [['EBITDA reported', k(ebitda)], ...AJUSTEMENTS_5.map((a) => [a[0], signe(a[1], 0)]), ['!Adjusted EBITDA', k(ebitdaAj)]])}
          <p>La rémunération du dirigeant et l'écart d'inventaire jouent contre le vendeur ; les honoraires, le loyer et l'avoir exceptionnel jouent pour lui. Net : ${signe(ebitdaAj - ebitda, 0)} k€.</p>` },
      { type: 'calcul', titre: '2. Adjusted net debt', enonce: '<p>Calcule l\'adjusted net debt au 31/12/2025.</p>',
        champs: [champ('dette', 'Adjusted net debt', detteAj, 'k€', 5, 0)],
        explication: `${tableau(['Adjusted net debt', 'k€', 'Nature'], [...DETTE_5.map((d) => [d[0], signe(d[1], 0), d[2]]), ['!Adjusted net debt', k(detteAj), '']])}
          <p>Contre ${ke(detteComptable)} de dette comptable : ${signe(detteAj - detteComptable, 0)} k€, dont ${ke(factor)} d'affacturage, le poste le plus souvent oublié.</p>` },
      { type: 'calcul', titre: '3. Peg et ajustement de NWC', enonce: '<p>Retraite le NWC mensuel (affacturage réintégré chaque mois, report de décembre neutralisé), calcule le peg puis l\'ajustement au closing, en retraitant aussi le NWC de closing.</p>',
        champs: [champ('peg', 'Peg retraité', peg, 'k€', 3, 1), champ('ajust', 'Ajustement de NWC au closing', ajustNwc, 'k€', 3, 1)],
        explication: `<p>Chaque mois : + ${k(factor)} (créances cédées nettes de la retenue) ; décembre : + ${k(ETIRES)} en plus. Peg = ${k(somme(mensuel))} / 12 = <strong>${ke(peg, 1)}</strong>.</p>
          <p>NWC de closing retraité de la même façon : ${k(1150)} + ${k(factor)} = ${k(closing)}. Ajustement = ${k(closing)} − ${k(peg, 1)} = <strong>${signe(ajustNwc, 1)} k€</strong>.</p>
          <p>Le point clé : l'affacturage est réintégré <strong>au peg et au closing</strong>. Le réintégrer d'un seul côté créerait un faux ajustement de ${ke(factor)}.</p>` },
      { type: 'calcul', titre: '4. Equity Value', enonce: '<p>Quelle Equity Value proposes-tu au fonds ?</p>',
        champs: [champ('equity', 'Equity Value', equity, 'k€', 8, 0)],
        explication: `<p>EV = ${k(ebitdaAj)} × ${nombre(multiple, 0)} = ${k(ve)} ; − adjusted net debt ${k(detteAj)} ; ${signe(ajustNwc, 1)} d'ajustement de NWC = <strong>${ke(equity)}</strong>.</p>
          <p>Le vendeur demandait ${ke(equityVendeur)} : ta DD change le prix de <strong>${signe(equity - equityVendeur, 0)} k€</strong>, surtout par la net debt (affacturage, report fournisseurs, bonus) plus que par l'EBITDA.</p>` },
      { type: 'ouverte', titre: '5. L\'affacturage expliqué au fonds', duree: 120,
        enonce: '<p>Le directeur d\'investissement : « Pourquoi ajoutez-vous 560 k€ de dette ? Lumen n\'a jamais emprunté cet argent. » Explique.</p>',
        reponse: `<ul><li>L'affacturage sans recours fait sortir les créances du bilan en échange d'un paiement anticipé : économiquement, Lumen <strong>finance son BFR</strong> par un tiers, comme avec un emprunt.</li>
          <li>Si on ne le retraite pas, le NWC paraît bas et la dette aussi : l'acheteur paierait deux fois, un NWC flatté et une dette cachée.</li>
          <li>Retraitement symétrique : créances réintégrées dans le NWC (au peg et au closing), financement reçu en net debt. Le contrat (sans recours, retenue, coût) est à lire en entier.</li></ul>`,
        points: [
          { t: 'Financement du BFR par un tiers', mots: ['financ', 'emprunt', 'tiers', 'anticip'] },
          { t: 'NWC flatté et dette cachée', mots: ['flatt', 'cache', 'bas', 'deux fois'] },
          { t: 'Retraitement symétrique peg / closing / net debt', mots: ['symetri', 'peg', 'closing', 'reintegr', 'net debt'] },
        ] },
      { type: 'ouverte', titre: '6. Ta synthèse pour le partner', duree: 180,
        enonce: '<p>Le partner : « En deux minutes, qu\'est-ce que je dois retenir, et que recommandes-tu ? »</p>',
        reponse: `<ul><li>Adjusted EBITDA de ${ke(ebitdaAj)}, proche du reported (${signe(ebitdaAj - ebitda, 0)} k€) : la rentabilité tient, à condition de recruter un DG au prix du marché.</li>
          <li>Adjusted net debt de ${ke(detteAj)} contre ${ke(detteComptable)} affichés : affacturage (${ke(factor)}), fournisseurs reportés (${ke(ETIRES)}) et bonus courus (${ke(144)}) en sont l'essentiel.</li>
          <li>NWC : peg retraité de ${ke(peg, 0)} ; au closing de fin mars, ajustement de ${signe(ajustNwc, 0)} k€, en partie saisonnier.</li>
          <li>Recommandation : Equity Value d'environ ${ke(equity)} contre ${ke(equityVendeur)} demandés ; completion accounts (NWC saisonnier, affacturage) ou locked box avec clauses de leakage strictes ; garantie spécifique sur le litige Delta et revue du contrat d'affacturage avant signing.</li></ul>`,
        points: [
          { t: 'Adjusted EBITDA et principal ajustement', mots: ['ebitda', 'dirigeant', 'remuneration', 'adjust'] },
          { t: 'Net debt et debt-like principaux', mots: ['net debt', 'affacturage', 'factor', 'report', 'bonus'] },
          { t: 'Peg et ajustement de NWC', mots: ['peg', 'nwc', 'ajustement'] },
          { t: 'Prix recommandé vs demande du vendeur', mots: ['equity', 'prix', 'vendeur', 'demand'] },
          { t: 'Mécanisme et garanties', mots: ['completion', 'locked', 'garantie', 'leakage', 'specifique'] },
        ],
        conseil: 'Commence par l\'écart de prix avec le vendeur, puis ses trois causes. Un partner décide sur le chiffre et ses raisons, dans cet ordre.' },
    ],
    conseil: 'Dans un vrai cas (1h30 à 2h), garde 15 minutes pour la synthèse : c\'est elle que le partner lit en premier.',
  };
}

// Recueil : identifiants stables (la progression les enregistre), du plus simple au plus complet
export const CAS_LUMEN = [
  { id: 'cas-ts-lumen-1', m: 'ts', theme: 'cas', niveau: 1, titre: 'Du bilan au trade working capital', sous: 'TWC, DSO, DPO, un DPO suspect · 15 min', creer: cas1 },
  { id: 'cas-ts-lumen-2', m: 'ts', theme: 'cas', niveau: 2, titre: 'NWC mensuel et peg', sous: 'Moyenne LTM, report de décembre, peg saisonnier · 20 min', creer: cas2 },
  { id: 'cas-ts-lumen-3', m: 'ts', theme: 'cas', niveau: 2, titre: 'Les retraitements du NWC', sous: 'NWC, debt-like, cash-like, le débat des bonus · 25 min', creer: cas3 },
  { id: 'cas-ts-lumen-4', m: 'ts', theme: 'cas', niveau: 3, titre: 'Lumen face à son secteur', sous: 'Ton benchmark : quartiles, cash libéré, signal de défaut · 25 min', creer: cas4 },
  { id: 'cas-ts-lumen-5', m: 'ts', theme: 'cas', niveau: 3, titre: 'Due diligence complète, du FEC au prix', sous: 'EBITDA, net debt, affacturage, peg, prix · 35 min', creer: cas5 },
];
