// PE — Management package et governance
import { q, calcul, theme } from '../fabriques.js';

export default theme('pe', 'mgmt', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Qu'est-ce qu'un management package et à quoi sert-il ?`, {
    courte: `<p>Le dispositif qui associe les dirigeants au capital pour <strong>aligner leurs intérêts</strong> avec ceux du fonds : ils <strong>investissent personnellement</strong> et captent une part plus que proportionnelle de la plus-value si le deal réussit (<strong>sweet equity</strong>, <strong>ratchet</strong>, BSPCE / AGA), avec des clauses de <strong>good / bad leaver</strong>.</p>`,
    complete: `<ul><li>Investissement : souvent une part significative du patrimoine liquide du manager (« skin in the game »).</li><li>Fiscalité : depuis la loi de finances 2025 (article 163 bis H du CGI, ajusté en 2026), le gain est en principe imposé comme un salaire, sauf une fraction plafonnée imposée comme une plus-value.</li></ul>`,
    points: [[`Aligner les intérêts`, ['align']], [`Investissement personnel`, ['investiss', 'personnel', 'skin']], [`Sweet equity / ratchet`, ['sweet', 'ratchet', 'bspce']], [`Good / bad leaver`, ['leaver']]],
  }),
  q('102', 1, `Qu'est-ce que l'effet sweet equity ?`, {
    courte: `<p>Les managers investissent surtout en <strong>ordinary shares</strong>, tandis que le fonds investit surtout en instruments à <strong>rendement prioritaire</strong> (OC, preferred shares, shareholder loans à 8-12 % capitalisés). Une fois ce rendement servi, toute la plus-value restante va aux ordinary shares, où les managers sont surreprésentés : ils <strong>démultiplient</strong> leur gain si le deal réussit.</p>`,
    exemple: `<p>Equity 100 : fonds 98 (dont 80 d'OC à 10 %), managers 2 pour 10 % des ordinaires. Exit à 250 après 5 ans : OC ≈ 80 × 1,1^5 ≈ 129 ; ordinaires ≈ 121 → managers 12,1 (6x), fonds ≈ 238 (2,4x).</p>`,
    points: [[`Managers en ordinary shares`, ['ordinaire', 'ordinary']], [`Fonds en instruments prioritaires`, ['oc', 'preference', 'prioritaire', 'shareholder']], [`Démultiplication du gain`, ['demultipl', 'levier', 'multiple']]],
  }),
  q('103', 1, `Qu'est-ce qu'un ratchet ?`, {
    courte: `<p>Un mécanisme qui <strong>augmente la part des managers</strong> dans la plus-value si la performance du fonds (MOIC ou IRR) dépasse des <strong>seuils</strong> (ex. +5 % de la plus-value au-delà de 2,5x). Le <strong>reverse ratchet</strong> la réduit en cas de sous-performance.</p>`,
    points: [[`Part des managers augmentée`, ['augment', 'part', 'manager']], [`Seuils de MOIC / IRR`, ['seuil', 'moic', 'irr', 'tri']], [`Reverse ratchet`, ['reverse', 'inverse', 'reduit']]],
  }),
  q('104', 1, `Que sont les clauses de good leaver et bad leaver ?`, {
    courte: `<p>Elles fixent le <strong>prix</strong> auquel un manager qui <strong>quitte</strong> la société doit céder ses titres : <strong>good leaver</strong> (départ accepté : décès, invalidité, licenciement sans faute) → valeur de marché ; <strong>bad leaver</strong> (faute, démission avant une date) → prix décoté, souvent le plus bas entre le prix d'achat et la valeur de marché.</p>`,
    points: [[`Prix de cession au départ`, ['prix', 'depart', 'quitte']], [`Good leaver → valeur de marché`, ['good', 'marche']], [`Bad leaver → décote`, ['bad', 'decote', 'nominal', 'plus bas']]],
  }),
  q('105', 1, `Drag-along et tag-along : quelle différence ?`, {
    courte: `<p>Le <strong>drag-along</strong> permet au majoritaire d'<strong>obliger</strong> les minoritaires à vendre aux mêmes conditions en cas d'offre sur 100 % (pour livrer toute la société à un acheteur). Le <strong>tag-along</strong> permet aux minoritaires de <strong>vendre avec</strong> le majoritaire aux mêmes conditions s'il cède.</p>`,
    points: [[`Drag : obliger les minoritaires`, ['drag', 'oblig']], [`Tag : droit de sortir avec le majoritaire`, ['tag', 'sortir', 'conjoint', 'avec']], [`Mêmes conditions`, ['memes conditions', 'meme prix']]],
  }),
  q('106', 1, `Quelles clauses trouve-t-on dans un shareholders' agreement de LBO ?`, {
    courte: `<p><strong>Gouvernance</strong> (composition du board, droits de veto du fonds sur les décisions importantes, information), <strong>liquidité</strong> (drag-along, tag-along, préemption, inaliénabilité / lock-up, clause de sortie), <strong>management</strong> (good / bad leaver, non-concurrence), et les règles des instruments (ratchet, conversion).</p>`,
    points: [[`Gouvernance / vetos`, ['gouvernance', 'veto', 'board', 'conseil']], [`Liquidité : drag, tag, préemption, lock-up`, ['drag', 'tag', 'preemption', 'inalienab', 'lock']], [`Leaver / non-concurrence`, ['leaver', 'non-concurrence', 'non concurrence']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  calcul('201', 2, `Les managers investissent 2 M€ pour 10 % des ordinary shares. Le fonds investit 18 M€ en ordinary shares (90 %) et 80 M€ en OC. Quel est l'envy ratio ?`, [
    ['Envy ratio', 5.4, 'x', 0.1],
  ], `<p>Fonds : 98 M€ pour 90 % des ordinaires → 1,089 M€ par point. Managers : 2 M€ pour 10 % → 0,2 M€ par point. Envy ratio = 1,089 / 0,2 ≈ <strong>5,4x</strong>.</p>
    <p><strong>Lecture</strong> : le fonds paie 5,4 fois plus cher que les managers chaque point de capital ordinaire ; c'est le prix de l'alignement. Des envy ratios de 3x à 8x sont courants.</p>`),
  q('202', 2, `Quels instruments utilise-t-on dans la structure d'equity d'un LBO ?`, {
    courte: `<p><strong>Ordinary shares</strong> (captent l'upside), <strong>preferred shares</strong> (ADP, rendement prioritaire), <strong>convertible bonds</strong> (OC) ou <strong>shareholder loans</strong> (quasi-fonds propres à intérêts capitalisés), et pour les managers <strong>BSPCE</strong> / AGA / BSA ou ratchets. Le fonds souscrit souvent un « institutional strip » (ordinaires + instruments prioritaires).</p>`,
    points: [[`Ordinary shares`, ['ordinaire', 'ordinary']], [`Preferred / ADP`, ['preference', 'adp', 'preferred']], [`OC / shareholder loans`, ['oc', 'obligation', 'shareholder', 'compte courant']], [`Instruments managers (BSPCE, AGA, ratchet)`, ['bspce', 'aga', 'bsa', 'ratchet']]],
  }),
  q('203', 2, `Comment est imposé un management package depuis la loi de finances 2025 (art. 163 bis H) ?`, {
    courte: `<p>Le gain est <strong>en principe imposé comme un salaire</strong> (jusqu'à environ 59 % au taux marginal, contribution spécifique comprise), sauf la fraction qui ne dépasse pas un plafond lié à <strong>3 fois la performance de la société</strong> (rapport entre sa valeur à la sortie et à l'entrée), imposée comme une <strong>plus-value</strong>, sous conditions (risque de perte en capital, détention d'au moins 2 ans pour les instruments hors régimes légaux).</p>`,
    complete: `<ul><li>Applicable aux cessions depuis le 15 février 2025 ; la loi de finances 2026 a corrigé le texte (notamment sur le réinvestissement), avec un effet rétroactif pour l'essentiel.</li><li>Conséquence : les packages très « leviérés » (gain bien supérieur à la performance de la société) sont plus taxés ; le guide Chambers 2026 évoque un retour possible des clauses good / bad leaver.</li><li>Sources : publications de cabinets (HLC, Rothschild Martin Maurel) et guide Chambers 2026 — vérifier la version à jour avant d'en parler en détail.</li></ul>`,
    points: [[`Principe : imposé comme un salaire`, ['salaire']], [`Exception : fraction en plus-value`, ['plus-value', 'plus value', 'fraction']], [`Plafond lié à 3 fois la performance`, ['3 fois', 'trois fois', 'performance']], [`Conditions (risque de perte, 2 ans)`, ['risque', 'perte', '2 ans', 'detention']]],
  }),
  q('204', 2, `Comment fonctionne la gouvernance d'une société après un LBO ?`, {
    courte: `<p>Un <strong>board</strong> (comité de surveillance ou stratégique) où siège le fonds : réunions <strong>trimestrielles</strong>, <strong>reporting mensuel</strong> (KPI, cash, covenants), validation du <strong>budget</strong>, des <strong>acquisitions</strong>, des capex importants, de la dette et des recrutements clés. Le fonds ne dirige pas au quotidien : il gouverne, challenge et accompagne.</p>`,
    points: [[`Board avec le fonds`, ['board', 'comite', 'conseil']], [`Reporting mensuel / KPI`, ['reporting', 'mensuel', 'kpi']], [`Décisions validées (budget, M&A, dette)`, ['budget', 'acquisition', 'dette', 'capex', 'valid']], [`Pas de gestion quotidienne`, ['quotidien', 'accompagne']]],
  }),
  q('205', 2, `Pourquoi le fonds exige-t-il que le management réinvestisse dans un SBO ?`, {
    courte: `<p>Pour l'<strong>alignement</strong> : un management qui encaisse tout à la sortie du premier LBO n'a plus de « skin in the game » ; son réinvestissement (souvent une part importante de son produit de cession) montre sa <strong>confiance dans le business plan</strong>. Un refus est un signal négatif.</p>`,
    points: [[`Alignement`, ['align', 'skin']], [`Confiance dans le BP`, ['confiance', 'business plan', 'bp']], [`Refus = signal négatif`, ['refus', 'signal', 'negatif']]],
  }),
  q('206', 2, `Que sont les BSPCE et les AGA ?`, {
    courte: `<p>Des instruments français d'<strong>intéressement</strong> : les <strong>BSPCE</strong> (bons de souscription de parts de créateur d'entreprise) permettent d'acheter des actions à un prix fixé, avec une fiscalité favorable sous conditions (sociétés jeunes, non cotées) ; les <strong>AGA</strong> (attributions gratuites d'actions) donnent des actions gratuites après une période d'acquisition. Plus courants en VC / growth qu'en LBO.</p>`,
    points: [[`BSPCE : prix fixé, fiscalité favorable`, ['bspce', 'prix', 'fiscal']], [`AGA : actions gratuites`, ['aga', 'gratuit']], [`Plus courants en VC / growth`, ['vc', 'growth', 'jeune', 'start']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Le fondateur veut garder 51 % du capital. Un fonds peut-il quand même investir ?`, {
    courte: `<p><strong>Oui</strong> : en <strong>LBO minoritaire</strong>, en growth, ou en OBO où le fondateur garde la majorité. Le fonds se protège par le pacte : <strong>droits de veto</strong> (budget, M&A, dette, dirigeants), sièges au board, information renforcée, <strong>clause de liquidité</strong> à 5-7 ans (obligation de chercher un acheteur, drag-along conditionnel), <strong>reverse ratchet</strong> ou actions de préférence si les objectifs ne sont pas atteints.</p>`,
    complete: `<ul><li>Conséquences : moins de levier possible, IRR cible parfois plus bas, mais un fondateur très engagé et souvent un meilleur prix d'entrée.</li></ul>`,
    points: [[`Oui : minoritaire / growth / OBO`, ['oui', 'minoritaire', 'growth', 'obo']], [`Vetos / board / information`, ['veto', 'board', 'conseil', 'information']], [`Clause de liquidité`, ['liquidit', 'sortie', 'drag']], [`Reverse ratchet / préférence`, ['ratchet', 'preference']]],
  }),
  q('302', 3, `La participation sous-performe et le management package ne vaut plus rien. Que se passe-t-il, et que fait le fonds ?`, {
    courte: `<p>Si l'equity ne couvre plus le rendement prioritaire des instruments du fonds, les <strong>ordinary shares des managers sont « sous l'eau »</strong> : leur package ne les motive plus, risque de départs. Le fonds peut <strong>reconstituer un package</strong> (nouveau MIP, ratchet sur le nouveau business plan, réallocation), souvent en contrepartie d'une réinjection d'equity ou d'un plan de redressement.</p>`,
    points: [[`Ordinary shares sous l'eau`, ['sous l eau', 'rien', 'valeur nulle', 'ordinaire']], [`Perte de motivation / départs`, ['motivation', 'depart']], [`Reconstitution du package`, ['reconstit', 'nouveau', 'reset', 'mip']], [`Contreparties (equity, plan)`, ['equity', 'plan', 'contrepartie']]],
  }),
  q('303', 3, `Comment répartis-tu un management package entre les managers ?`, {
    courte: `<p>Selon le <strong>rôle</strong> et l'<strong>impact sur la création de valeur</strong> (le CEO en premier, puis le top management), en gardant une <strong>réserve</strong> (pool) pour les recrutements futurs (ex. 10-20 % du MIP), avec du <strong>vesting</strong> pour fidéliser et un investissement personnel <strong>significatif mais supportable</strong> pour chacun.</p>`,
    points: [[`Selon le rôle et l'impact`, ['role', 'impact', 'ceo']], [`Réserve pour recrutements`, ['reserve', 'pool', 'recrut']], [`Vesting`, ['vesting', 'progressi']], [`Investissement supportable`, ['supportable', 'personnel', 'significatif']]],
  }),
]);
