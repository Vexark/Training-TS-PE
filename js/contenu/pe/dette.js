// PE — LBO financing et dette d'acquisition
import { q, calcul, theme } from '../fabriques.js';

export default theme('pe', 'dette', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Quelles sont les principales tranches de dette d'un LBO mid-cap ?`, {
    courte: `<p><strong>Senior debt</strong> bancaire (TLA amortissable, TLB bullet, 5-7 ans) ou <strong>unitranche</strong> (private credit, une tranche bullet) ; parfois de la <strong>mezzanine</strong> ou du <strong>PIK</strong> au niveau de la HoldCo ; plus des lignes annexes : <strong>RCF</strong> (NWC), <strong>capex / acquisition facility</strong> (add-ons) ; éventuellement un <strong>vendor loan</strong>.</p>`,
    complete: `<ul><li>Coût croissant avec le rang de subordination : senior < unitranche < mezzanine < PIK.</li><li>En mid-cap France, l'unitranche est devenue très courante (rapidité, certitude d'exécution).</li></ul>`,
    points: [[`Senior (TLA / TLB)`, ['senior', 'tla', 'tlb', 'amortiss', 'bullet']], [`Unitranche / private credit`, ['unitranche', 'private credit', 'dette privee']], [`Mezzanine / PIK`, ['mezzanine', 'pik', 'subordonn']], [`RCF / capex facility`, ['rcf', 'revolving', 'capex', 'acquisition facility']]],
  }),
  q('102', 1, `Qu'est-ce que l'unitranche ?`, {
    courte: `<p>Une dette <strong>en une seule tranche</strong>, remboursable <strong>in fine</strong> (bullet), qui combine senior et subordonné, apportée par des fonds de <strong>private credit</strong>. Avantages : rapidité, une seule documentation, certitude de financement, flexibilité. Inconvénient : <strong>plus chère</strong> qu'une senior bancaire.</p>`,
    points: [[`Une seule tranche bullet`, ['une seule', 'in fine', 'bullet']], [`Senior + subordonné combinés`, ['combine', 'senior', 'subordonn']], [`Private credit`, ['private credit', 'dette privee', 'fonds de dette']], [`Rapide mais plus chère`, ['rapid', 'cher', 'cout']]],
  }),
  q('103', 1, `Qu'est-ce qu'un covenant ?`, {
    courte: `<p>Un <strong>engagement</strong> inscrit dans le contrat de crédit. Les covenants financiers imposent des ratios, le plus courant étant le <strong>leverage</strong> (net debt / EBITDA ≤ X), testé chaque trimestre ou semestre (maintenance covenant). Un bris peut permettre aux prêteurs d'exiger le remboursement (default).</p>`,
    complete: `<ul><li>Autres ratios : ICR (EBITDA / intérêts), DSCR (cash / service de la dette), capex maximum.</li><li>Covenants non financiers : interdiction de dividendes, de nouvelles dettes, de cessions sans accord.</li></ul>`,
    points: [[`Engagement du contrat de crédit`, ['engagement', 'contrat']], [`Leverage (net debt / EBITDA)`, ['leverage', 'net debt / ebitda', 'levier']], [`Testé périodiquement`, ['trimestr', 'semestr', 'test']], [`Bris → default`, ['bris', 'defaut', 'default']]],
  }),
  q('104', 1, `Qu'est-ce que le leverage ratio ?`, {
    courte: `<p><strong>Net debt / EBITDA</strong> : le nombre d'années d'EBITDA nécessaires pour rembourser la dette. Un LBO mid-cap se monte souvent autour de <strong>3,5x à 5,5x</strong> selon la qualité de l'actif et le marché de la dette.</p>`,
    exemple: `<p>Net debt 90, EBITDA 25 → <strong>3,6x</strong>.</p>`,
    points: [[`Net debt / EBITDA`, ['net debt', 'ebitda', 'dette']], [`Lecture : années d'EBITDA`, ['annee', 'rembours']], [`Ordre de grandeur`, ['3,5', '5,5', '4', '5x']]],
  }),
  q('105', 1, `Qu'est-ce que le PIK ?`, {
    courte: `<p><strong>Payment In Kind</strong> : les intérêts ne sont pas payés en cash mais <strong>capitalisés</strong> (ajoutés au capital) et payés à l'échéance. Cela préserve le cash de la société, mais la dette grossit vite (intérêts composés) et coûte cher.</p>`,
    exemple: `<p>50 M€ à 11 % PIK pendant 5 ans → 50 × 1,11^5 ≈ <strong>84 M€</strong> à rembourser.</p>`,
    points: [[`Intérêts capitalisés`, ['capitalis', 'ajoute']], [`Payés à l'échéance`, ['echeance', 'in fine', 'maturite']], [`Préserve le cash mais coûte cher`, ['cash', 'cher', 'compose', 'grossit']]],
  }),
  q('106', 1, `Qu'est-ce qu'un cash sweep ?`, {
    courte: `<p>L'obligation d'affecter une partie (souvent 50-75 %) de l'<strong>excès de cash</strong> au <strong>remboursement anticipé</strong> de la dette. Il accélère le deleveraging, l'un des leviers de value creation.</p>`,
    points: [[`Part de l'excès de cash`, ['exces', 'excedent', 'cash']], [`Remboursement anticipé`, ['rembours', 'anticip']], [`Accélère le deleveraging`, ['deleverag', 'desendett']]],
  }),
  q('107', 1, `Quelle différence entre senior debt et mezzanine ?`, {
    courte: `<p>La <strong>senior</strong> est prioritaire et sécurisée (nantissements), remboursée en premier, donc moins chère. La <strong>mezzanine</strong> est <strong>subordonnée</strong> (remboursée après la senior), donc plus risquée et mieux rémunérée : coupon cash + PIK, parfois des BSA (accès au capital).</p>`,
    points: [[`Senior prioritaire / sécurisée / moins chère`, ['prioritaire', 'securis', 'moins cher', 'senior']], [`Mezzanine subordonnée`, ['subordonn', 'apres']], [`Mezzanine mieux rémunérée (cash + PIK, BSA)`, ['pik', 'bsa', 'coupon', 'remuner']]],
  }),
  q('108', 1, `À quoi sert un RCF ?`, {
    courte: `<p>Le <strong>Revolving Credit Facility</strong> est une ligne de crédit <strong>tirable et remboursable à volonté</strong> pendant sa durée, utilisée pour financer le <strong>NWC</strong>, la <strong>saisonnalité</strong> et les besoins ponctuels de trésorerie. Elle est souvent non tirée au closing.</p>`,
    points: [[`Ligne tirable / remboursable à volonté`, ['tirable', 'volonte', 'revolving']], [`NWC / saisonnalité`, ['nwc', 'bfr', 'saison']], [`Souvent non tirée au closing`, ['non tiree', 'closing']]],
  }),
  q('109', 1, `Dans quel ordre les financeurs sont-ils remboursés en cas de liquidation ?`, {
    courte: `<p><strong>Senior sécurisée</strong> → dettes subordonnées (<strong>mezzanine</strong>, second lien) → <strong>PIK</strong> HoldCo → quasi-fonds propres (<strong>shareholder loans / OC</strong>) → <strong>preferred shares</strong> → <strong>ordinary shares</strong>. Plus on est remboursé tard, plus on exige de rendement.</p>`,
    points: [[`Senior en premier`, ['senior', 'premier']], [`Puis subordonnée / mezzanine / PIK`, ['subordonn', 'mezzanine', 'pik']], [`Puis quasi-fonds propres / preferred`, ['quasi', 'oc', 'preference', 'shareholder']], [`Ordinary en dernier`, ['ordinaire', 'ordinary', 'dernier']]],
  }),
  q('110', 1, `Dette bullet ou amortissable : quelle différence ?`, {
    courte: `<p><strong>Amortissable</strong> (ex. TLA) : remboursée progressivement selon un échéancier → pèse sur le cash chaque année. <strong>Bullet</strong> (ex. TLB, unitranche) : remboursée en une fois à l'échéance → plus de cash disponible pendant la vie du LBO, mais risque de refinancement à l'échéance.</p>`,
    points: [[`Amortissable : progressif`, ['progressi', 'echeancier', 'amortiss']], [`Bullet : en une fois à l'échéance`, ['une fois', 'echeance', 'in fine', 'bullet']], [`Impact cash / risque de refinancement`, ['cash', 'refinanc']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Maintenance covenant, incurrence covenant, cov-lite : explique.`, {
    courte: `<p>Un <strong>maintenance covenant</strong> est testé <strong>périodiquement</strong> (chaque trimestre), quoi qu'il arrive. Un <strong>incurrence covenant</strong> n'est testé que <strong>lors d'une opération</strong> (nouvelle dette, dividende, acquisition). Une dette <strong>cov-lite</strong> n'a pas de maintenance covenant (seulement des incurrence covenants) : fréquente en large cap (TLB), plus rare en mid-cap.</p>`,
    complete: `<ul><li>Variante : le <strong>springing covenant</strong> sur le RCF, testé seulement si la ligne est tirée au-delà d'un seuil.</li><li>Le cov-lite donne plus de temps à une société en difficulté avant l'intervention des prêteurs.</li></ul>`,
    points: [[`Maintenance : test périodique`, ['periodique', 'trimestr', 'maintenance']], [`Incurrence : lors d'une opération`, ['operation', 'incurrence', 'nouvelle dette', 'dividende']], [`Cov-lite : sans maintenance covenant`, ['cov-lite', 'sans']], [`Springing covenant`, ['springing', 'rcf']]],
  }),
  q('202', 2, `Que mesurent l'ICR et le DSCR ?`, {
    courte: `<p>L'<strong>ICR</strong> (Interest Cover Ratio) = EBITDA (ou EBIT) / charges d'intérêts : capacité à <strong>payer les intérêts</strong>. Le <strong>DSCR</strong> (Debt Service Cover Ratio) = cash disponible / (intérêts + remboursements) : capacité à <strong>servir toute la dette</strong> ; sous 1, la société ne peut pas payer ses échéances.</p>`,
    exemple: `<p>EBITDA 25, intérêts 7 → ICR 3,6x. Cash disponible 14, intérêts 7 + amortissement 5 → DSCR 1,17x.</p>`,
    points: [[`ICR = EBITDA / intérêts`, ['icr', 'interet']], [`DSCR = cash / (intérêts + remboursements)`, ['dscr', 'service', 'rembours']], [`DSCR < 1 = problème`, ['< 1', 'inferieur a 1', 'moins de 1']]],
  }),
  q('203', 2, `Qu'est-ce que le headroom d'un covenant et comment le calcules-tu ?`, {
    courte: `<p>La <strong>marge de sécurité</strong> entre le ratio actuel et le seuil, souvent exprimée en <strong>baisse d'EBITDA tolérée</strong> avant le bris : headroom = 1 − net debt / (levier max × EBITDA). À la signature, les prêteurs prévoient souvent <strong>25 à 35 %</strong> de headroom.</p>`,
    exemple: `<p>Net debt 100, EBITDA 25 (levier 4x), covenant 5,5x → EBITDA minimum = 100 / 5,5 = 18,2 → baisse tolérée = 1 − 18,2/25 ≈ <strong>27 %</strong>.</p>`,
    points: [[`Marge entre ratio et seuil`, ['marge', 'seuil', 'ecart']], [`Formule (EBITDA minimum)`, ['minimum', '1 -', '1 −', 'formule']], [`25-35 % à la signature`, ['25', '35', '%']]],
  }),
  q('204', 2, `Qu'est-ce qu'un equity cure ?`, {
    courte: `<p>Le droit pour l'actionnaire (le fonds) d'<strong>injecter de l'equity</strong> pour remédier à un bris de covenant : l'apport est compté comme de l'EBITDA supplémentaire ou comme une réduction de la dette pour le calcul du ratio. Les contrats limitent le <strong>nombre</strong> de cures (souvent 2-4 sur la vie du prêt, pas deux trimestres de suite) et parfois leur montant.</p>`,
    points: [[`Injection d'equity par le fonds`, ['inject', 'equity', 'apport']], [`Remédie à un bris de covenant`, ['bris', 'covenant', 'remedi']], [`Nombre limité`, ['limite', 'nombre']]],
  }),
  q('205', 2, `Pourquoi le private credit a-t-il pris autant de parts de marché ?`, {
    courte: `<p><strong>Rapidité</strong> et <strong>certitude d'exécution</strong> (un seul prêteur ou un club, pas de syndication), <strong>flexibilité</strong> (unitranche, PIK toggle, delayed draw pour les add-ons), relation directe dans la durée, et des banques plus <strong>contraintes réglementairement</strong> (fonds propres, Bâle). Le prix : une dette plus chère.</p>`,
    complete: `<ul><li>Le guide Chambers 2026 cite le private credit, les facilités à tirage différé, les vendor loans et le PIK parmi les outils des sponsors en France.</li></ul>`,
    points: [[`Rapidité / certitude`, ['rapid', 'certitude', 'execution']], [`Flexibilité (PIK, DDTL)`, ['flexib', 'pik', 'ddtl', 'delayed']], [`Banques contraintes`, ['banque', 'reglement', 'bale']], [`Plus cher`, ['cher', 'cout']]],
  }),
  q('206', 2, `Quel levier typique pour un LBO mid-cap en France, et de quoi dépend-il ?`, {
    courte: `<p>En ordre de grandeur <strong>3,5x à 5,5x l'EBITDA</strong>. Il dépend de la <strong>prévisibilité</strong> des cash flows (récurrence, cyclicité), de la <strong>cash conversion</strong> (capex, NWC), de la <strong>taille</strong>, du <strong>secteur</strong> et du <strong>marché de la dette</strong> au moment du deal (taux, appétit des prêteurs).</p>`,
    complete: `<ul><li>Logiciel très récurrent : vers le haut de la fourchette (parfois plus, en unitranche) ; industrie cyclique et capitalistique : vers le bas.</li><li>Toujours le justifier par un downside case qui respecte les covenants.</li></ul>`,
    points: [[`~3,5x à 5,5x`, ['3,5', '5,5', '4x', '5x']], [`Prévisibilité / récurrence`, ['previsib', 'recurren', 'cycl']], [`Cash conversion`, ['cash conversion', 'capex', 'nwc']], [`Marché de la dette`, ['marche', 'taux', 'preteur']]],
  }),
  q('207', 2, `Pourquoi les prêteurs demandent-ils souvent une couverture de taux (hedging) ?`, {
    courte: `<p>Parce que la dette de LBO est souvent à <strong>taux variable</strong> (Euribor + marge) : une hausse des taux augmente les intérêts et peut casser l'ICR ou le DSCR. Un <strong>swap</strong> (taux fixe) ou un <strong>cap</strong> (taux plafonné) protège une partie de la dette (souvent 50-75 %) pendant quelques années.</p>`,
    exemple: `<p>Dette 200 M€, Euribor passe de 0 % à 3 % : +6 M€ d'intérêts par an sans couverture.</p>`,
    points: [[`Dette à taux variable`, ['variable', 'euribor']], [`Risque sur ICR / DSCR`, ['icr', 'dscr', 'interet', 'covenant']], [`Swap ou cap`, ['swap', 'cap']], [`Part couverte`, ['50', '75', 'partie']]],
  }),
  q('208', 2, `Qu'est-ce qu'une capex / acquisition facility (DDTL) et pourquoi en prévoir une ?`, {
    courte: `<p>Une ligne de dette <strong>tirable plus tard</strong> pendant une période définie, pour financer des <strong>capex</strong> ou des <strong>add-ons</strong> sans renégocier toute la dette. Indispensable dans une stratégie de <strong>buy-and-build</strong>.</p>`,
    points: [[`Tirable plus tard`, ['plus tard', 'differe', 'delayed']], [`Capex / add-ons`, ['capex', 'add-on', 'acquisition']], [`Évite de renégocier`, ['renegoci', 'sans']], [`Buy-and-build`, ['build']]],
  }),
  calcul('209', 2, `EBITDA 25 M€, dette senior 100 M€, trésorerie 10 M€, covenant de leverage à 5x. Levier net actuel et baisse d'EBITDA tolérée avant le bris ?`, [
    ['Levier net', 3.6, 'x', 0.05],
    ['Baisse d\'EBITDA tolérée', 28, '%', 1, 0],
  ], `<p>Levier = (100 − 10) / 25 = <strong>3,6x</strong>.</p>
    <p>EBITDA minimum = 90 / 5 = 18 → baisse tolérée = 1 − 18 / 25 = <strong>28 %</strong> (le headroom).</p>
    <p><strong>À dire au recruteur</strong> : « 28 % de headroom, c'est confortable ; sous 15 %, j'anticiperais la discussion avec les prêteurs ».</p>`),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Une participation va casser son covenant de leverage au prochain test. Quelles sont les options ?`, {
    courte: `<p><strong>Anticiper</strong> et parler aux prêteurs tôt avec un plan crédible ; demander un <strong>waiver</strong> ou un <strong>reset</strong> des covenants (contre commission et hausse de marge) ; utiliser l'<strong>equity cure</strong> ; négocier un <strong>amend & extend</strong> ou un <strong>refinancement</strong> ; plan de <strong>cash</strong> (NWC, capex, cession d'actifs) ; en cas grave, <strong>mandat ad hoc / conciliation</strong>.</p>`,
    complete: `<ul><li>Le fonds arbitre : réinjecter de l'equity (et améliorer sa position de négociation) ou laisser les prêteurs prendre le contrôle si la valeur de l'equity est nulle.</li><li>Relation avec les prêteurs : transparence, reporting renforcé, conseiller en restructuration si nécessaire.</li></ul>`,
    points: [[`Anticiper / parler aux prêteurs`, ['anticip', 'preteur', 'banque', 'tot']], [`Waiver / reset`, ['waiver', 'reset']], [`Equity cure`, ['equity cure', 'reinject', 'inject']], [`A&E / refinancement / plan de cash`, ['amend', 'extend', 'refinanc', 'cash', 'cession']], [`Procédures amiables`, ['mandat ad hoc', 'conciliation']]],
  }),
  q('302', 3, `Amend & extend ou refinancement : quelle différence et quand choisir l'un ou l'autre ?`, {
    courte: `<p>L'<strong>amend & extend</strong> modifie la dette <strong>existante</strong> avec les mêmes prêteurs (maturité allongée, covenants adaptés, marge relevée). Le <strong>refinancement</strong> remplace la dette par une <strong>nouvelle</strong> (nouveaux prêteurs, montant et termes différents). A&E : quand le marché est fermé ou la société fragile ; refinancement : quand les conditions de marché sont meilleures ou pour lever plus (add-ons, dividend recap).</p>`,
    points: [[`A&E : dette existante modifiée`, ['existant', 'modif', 'amend', 'extend']], [`Refinancement : nouvelle dette`, ['nouvelle', 'remplace', 'refinanc']], [`Quand choisir A&E`, ['marche ferme', 'fragile', 'difficile']], [`Quand refinancer`, ['meilleure', 'lever', 'recap', 'add-on']]],
  }),
  q('303', 3, `Comment dimensionnes-tu la dette d'acquisition d'un LBO ?`, {
    courte: `<p>Je pars du <strong>cash flow disponible</strong> (EBITDA − capex − ΔNWC − impôt) et de sa <strong>prévisibilité</strong> ; je teste plusieurs niveaux de dette dans un <strong>downside case</strong> (covenants respectés, DSCR > 1, remboursement réaliste en 5-7 ans) ; je vérifie ce que le <strong>marché</strong> accepte (multiples, coût) ; je garde du <strong>headroom</strong> et des lignes pour la croissance.</p>`,
    exemple: `<p>EBITDA 30, cash flow avant service de la dette 15 par an, coût de la dette 8 %. À 5x (150 de dette) : intérêts 12 → il ne reste que 3 pour rembourser (2 % de la dette par an) : trop juste. À 4x (120) : intérêts 9,6 → 5,4 de remboursement par an, ~22 % de la dette en 5 ans (plus avec la croissance) : plus raisonnable.</p>`,
    points: [[`Partir du cash flow disponible`, ['cash flow', 'cash', 'disponible']], [`Downside case / covenants / DSCR`, ['downside', 'covenant', 'dscr', 'stress']], [`Marché de la dette`, ['marche', 'preteur', 'cout']], [`Headroom / lignes de croissance`, ['headroom', 'ligne', 'croissance']], [`Exemple chiffré`, ['exemple', 'x', 'interet']]],
  }),
  q('304', 3, `Qu'est-ce qu'un HoldCo PIK et quels en sont l'intérêt et les risques ?`, {
    courte: `<p>Une dette <strong>PIK</strong> logée au-dessus du groupe bancaire (dans une HoldCo supérieure), structurellement subordonnée à la senior, sans paiement cash. <strong>Intérêt</strong> : réduire l'equity à investir (IRR plus élevé) ou financer un dividend recap sans contraindre le cash de l'OpCo. <strong>Risques</strong> : coût élevé (souvent 10-13 %), dette qui grossit vite, recouvrement faible en cas de difficulté, réduction de la part de l'equity à l'exit.</p>`,
    points: [[`PIK au niveau d'une HoldCo supérieure`, ['holdco', 'pik', 'superieur']], [`Subordination structurelle`, ['subordin', 'structur']], [`Intérêt : moins d'equity / recap`, ['equity', 'irr', 'recap']], [`Risques : coût, intérêts composés`, ['cout', 'compose', 'grossit', 'risque']]],
  }),
  q('305', 3, `Les taux montent de 200 points de base. Quel impact sur un LBO à 5x l'EBITDA ?`, {
    courte: `<p>Sur la dette <strong>non couverte</strong>, les intérêts augmentent de 2 % × la dette = <strong>10 % de l'EBITDA</strong> (5x × 2 %) : moins de cash pour rembourser, ICR et DSCR en baisse, risque sur les covenants, IRR en baisse. Et indirectement, des <strong>multiples de sortie</strong> plus bas (WACC plus élevé).</p>`,
    exemple: `<p>EBITDA 40, dette 200 non couverte : +4 M€ d'intérêts par an (10 % de l'EBITDA). Si le cash flow avant intérêts était 20 et les intérêts 14 : il ne reste plus que 2 pour rembourser au lieu de 6.</p>`,
    points: [[`Intérêts + 2 % × dette`, ['2 %', '200', 'interet']], [`= 10 % de l'EBITDA à 5x`, ['10 %', '10%', 'ebitda']], [`Moins de cash, covenants sous tension`, ['cash', 'covenant', 'icr', 'dscr']], [`Couverture / multiples de sortie`, ['couvert', 'hedg', 'multiple', 'swap']]],
  }),
]);
