// PE — L'industrie du private equity (GP / LP, fees, carry, indicateurs)
import { q, calcul, theme } from '../fabriques.js';

export default theme('pe', 'metier', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Explique le modèle économique d'un fonds de private equity.`, {
    courte: `<p>Une société de gestion, le <strong>GP</strong>, lève un fonds auprès d'investisseurs, les <strong>LP</strong> (assureurs, caisses de retraite, fonds souverains, family offices, fonds de fonds, Bpifrance), investit dans des sociétés non cotées, les accompagne 4 à 6 ans puis les revend. Le GP est rémunéré par des <strong>management fees</strong> (~1,5-2 % par an) et surtout par le <strong>carried interest</strong> (~20 % de la plus-value au-delà d'un hurdle de ~8 %).</p>`,
    complete: `<ul><li><strong>Fonds fermé</strong> d'environ 10 ans : période d'investissement de 4-5 ans, puis gestion et exits ; prorogations possibles.</li><li>Les LP prennent des <strong>commitments</strong> appelés au fil des investissements (capital calls).</li><li>Le GP investit aussi dans son fonds (souvent 1-2 %) : alignement.</li><li>Objectif : un net IRR pour les LP autour de 15 % et plus, soit environ 20-25 % brut et 2,5-3x par deal.</li></ul>`,
    pieges: [`Confondre management fees (rémunération fixe du GP) et carried interest (part de la plus-value).`],
    relances: [[`D'où vient l'essentiel de la richesse d'un GP qui réussit ?`, `Du carried interest : 20 % de la plus-value d'un fonds de 1 Md€ qui fait 2x, c'est ~200 M€ à partager entre les associés.`]],
    points: [[`GP et LP`, ['gp', 'lp', 'societe de gestion', 'investisseur']], [`Fonds fermé ~10 ans`, ['10 ans', 'ferme', 'periode d investissement']], [`Management fees`, ['management fee', 'frais de gestion', '2 %', '2%']], [`Carried interest et hurdle`, ['carried', 'carry', 'hurdle']], [`Objectif de rendement`, ['irr', 'tri', 'multiple', 'moic']]],
  }),
  q('102', 1, `Que sont les management fees et le carried interest ?`, {
    courte: `<p>Les <strong>management fees</strong> sont la rémunération annuelle du GP pour gérer le fonds (~1,5-2 % des commitments pendant la période d'investissement, puis sur le capital investi). Le <strong>carried interest</strong> est la part de la plus-value (~20 %) qui revient au GP une fois que les LP ont récupéré leur capital et le <strong>hurdle</strong>.</p>`,
    complete: `<ul><li>Les fees couvrent les coûts de la société de gestion (équipes, bureaux, DD non abouties).</li><li>Le carry aligne le GP sur la performance : pas de plus-value au-delà du hurdle, pas de carry.</li><li>Ordre de grandeur : fonds de 500 M€ → ~10 M€ de fees par an.</li></ul>`,
    points: [[`Fees : ~1,5-2 % par an`, ['2 %', '2%', '1,5', 'annuel']], [`Base : commitments puis capital investi`, ['commitment', 'engagement', 'investi']], [`Carry : ~20 % de la plus-value`, ['20 %', '20%', 'plus-value']], [`Après capital + hurdle`, ['hurdle', 'capital']]],
  }),
  q('103', 1, `Qu'est-ce que le hurdle rate ?`, {
    courte: `<p>Le <strong>rendement préférentiel</strong> (souvent <strong>8 % par an</strong>) que les LP doivent recevoir sur leur capital avant que le GP ne touche du carried interest.</p>`,
    complete: `<ul><li>Il est généralement composé (8 % par an sur la durée de détention du capital).</li><li>Il est suivi d'un <strong>catch-up</strong> qui permet au GP de rattraper sa part de 20 % du profit total si le fonds performe bien.</li></ul>`,
    points: [[`Rendement préférentiel des LP`, ['preferentiel', 'preferred', 'lp']], [`~8 % par an`, ['8 %', '8%', '8 pour']], [`Avant le carry`, ['avant', 'carry', 'carried']]],
  }),
  q('104', 1, `Qu'est-ce que la J-curve ?`, {
    courte: `<p>La courbe de performance d'un fonds : <strong>négative les premières années</strong> (management fees, coûts de transaction, investissements pas encore valorisés) puis <strong>positive</strong> quand les participations prennent de la valeur et que les exits arrivent.</p>`,
    points: [[`Négatif au début`, ['negati', 'debut', 'premieres annees']], [`Fees / coûts / investissements`, ['fee', 'frais', 'cout', 'investiss']], [`Positif avec les exits`, ['positif', 'exit', 'sortie', 'cession']]],
  }),
  q('105', 1, `Quelle est la différence entre IRR et MOIC ?`, {
    courte: `<p>Le <strong>MOIC</strong> (multiple) = total des retours / mise : il ne tient pas compte du temps. L'<strong>IRR</strong> (TRI) est le taux annuel qui égalise mises et retours : il tient compte du temps. 2x en 3 ans ≈ 26 % d'IRR ; 2x en 7 ans ≈ 10 %.</p>`,
    complete: `<ul><li>Les fonds regardent les deux : un IRR élevé peut venir d'une exit très rapide avec peu de valeur créée ; les LP veulent aussi du multiple (cash-on-cash).</li><li>Repères : 2x/5 ans ≈ 15 %, 2,5x/5 ans ≈ 20 %, 3x/5 ans ≈ 25 %.</li></ul>`,
    points: [[`MOIC = retours / mise`, ['moic', 'multiple', 'mise']], [`IRR tient compte du temps`, ['temps', 'annuel', 'irr', 'tri']], [`Exemple chiffré`, ['2x', '15 %', '26', 'ans']], [`Pourquoi les deux`, ['deux', 'rapide', 'cash']]],
  }),
  q('106', 1, `Que signifient DPI, RVPI et TVPI ?`, {
    courte: `<p><strong>DPI</strong> = distributions / capital appelé (cash réellement rendu) ; <strong>RVPI</strong> = valeur résiduelle des participations / capital appelé ; <strong>TVPI</strong> = DPI + RVPI (valeur totale). Le DPI est « réel », le RVPI est une valorisation.</p>`,
    complete: `<ul><li>Depuis que les exits sont rares, les LP regardent surtout le <strong>DPI</strong> : « cash is king ».</li><li>Un fonds avec un TVPI de 2x mais un DPI de 0,3x après 8 ans inquiète ses LP.</li></ul>`,
    points: [[`DPI = distributions / appelé`, ['dpi', 'distribution']], [`RVPI = valeur résiduelle / appelé`, ['rvpi', 'residuel']], [`TVPI = DPI + RVPI`, ['tvpi', 'total']], [`DPI = cash réel`, ['cash', 'reel', 'rendu']]],
  }),
  q('107', 1, `Qu'est-ce que le dry powder ?`, {
    courte: `<p>Les <strong>commitments des LP pas encore investis</strong> par les fonds : le capital disponible pour de futurs deals. Beaucoup de dry powder = forte concurrence pour les bons actifs, donc pression sur les prix.</p>`,
    complete: `<ul><li>Selon le guide Chambers 2026, le dry powder des fonds français était de 33,8 Md€ fin 2025, face à environ 104 Md€ de valeur de portefeuille non réalisée.</li></ul>`,
    points: [[`Capital levé non investi`, ['non investi', 'disponible', 'commitment']], [`Effet : concurrence / prix`, ['concurren', 'prix']]],
  }),
  q('108', 1, `Quelle différence entre venture capital, growth equity et buyout (LBO) ?`, {
    courte: `<p><strong>VC</strong> : jeunes sociétés à fort potentiel, souvent non rentables, minoritaire, sans dette. <strong>Growth</strong> : sociétés rentables en croissance, souvent minoritaire, peu ou pas de dette, augmentation de capital. <strong>Buyout / LBO</strong> : sociétés matures générant du cash, rachat (souvent majoritaire) financé en partie par de la dette.</p>`,
    points: [[`VC : jeunes sociétés`, ['vc', 'venture', 'jeune', 'start']], [`Growth : rentables, minoritaire`, ['growth', 'croissance', 'minoritaire']], [`LBO : matures, dette, majoritaire`, ['lbo', 'dette', 'majoritaire', 'mature']]],
  }),
  q('109', 1, `Qu'est-ce que le mid-cap en France ?`, {
    courte: `<p>En ordre de grandeur, des deals d'environ <strong>50-100 M€ à 500 M€ - 1 Md€ d'Enterprise Value</strong> (bornes variables selon les acteurs) ; le small cap est en dessous, le large cap au-dessus. L'important en entretien : connaître le <strong>ticket</strong> du fonds en face de toi.</p>`,
    points: [[`Ordre de grandeur d'EV`, ['m€', 'millions', 'md', 'ev']], [`Small / mid / large cap`, ['small', 'large']], [`Connaître le ticket du fonds`, ['ticket', 'fonds']]],
  }),
  q('110', 1, `Qui sont les LP d'un fonds de LBO ?`, {
    courte: `<p><strong>Assureurs</strong>, <strong>caisses de retraite</strong>, <strong>fonds souverains</strong>, <strong>family offices</strong>, <strong>fonds de fonds</strong>, banques, et en France <strong>Bpifrance</strong> pour de nombreux fonds small et mid-cap ; de plus en plus de particuliers fortunés via des fonds evergreen.</p>`,
    points: [[`Assureurs / retraites`, ['assureur', 'retraite', 'pension']], [`Souverains / family offices`, ['souverain', 'family']], [`Fonds de fonds / Bpifrance`, ['fonds de fonds', 'bpi']]],
  }),
  q('111', 1, `Qu'est-ce que l'origination ?`, {
    courte: `<p>La <strong>recherche et la génération de deals</strong> : relations avec les banques d'affaires et les conseils, approche directe de dirigeants, cartographie de secteurs, réseau. Un deal <strong>propriétaire</strong> (sans enchères) permet souvent d'acheter moins cher.</p>`,
    points: [[`Recherche de deals`, ['recherche', 'generat', 'deal']], [`Banques d'affaires / dirigeants / réseau`, ['banque', 'dirigeant', 'reseau', 'conseil']], [`Deal propriétaire`, ['proprietaire', 'sans enchere']]],
  }),
  q('112', 1, `Combien de temps dure un fonds de PE et comment se déroule sa vie ?`, {
    courte: `<p>Environ <strong>10 ans</strong> (+ 1-2 ans de prorogation possible) : levée (fundraising), <strong>période d'investissement</strong> de 4-5 ans, gestion et création de valeur, <strong>exits</strong> et distributions aux LP, liquidation du fonds.</p>`,
    points: [[`~10 ans`, ['10 ans', 'dix']], [`Période d'investissement 4-5 ans`, ['investissement', '4', '5 ans']], [`Exits / distributions`, ['exit', 'distribution', 'cession']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Qu'est-ce que le catch-up dans la waterfall ?`, {
    courte: `<p>Après que les LP ont reçu leur capital et le <strong>hurdle</strong>, le GP reçoit l'essentiel (souvent <strong>100 %</strong>) des distributions suivantes jusqu'à ce qu'il ait touché <strong>20 % du profit total</strong>. Ensuite, le partage est 80 / 20.</p>`,
    complete: `<ul><li>Avec un catch-up complet, si le fonds performe bien, le GP touche 20 % de tout le profit, comme s'il n'y avait pas de hurdle.</li><li>Le catch-up est complet quand le profit atteint 1,25 × le hurdle (le GP doit rattraper 20 % de « hurdle + catch-up »).</li></ul>`,
    exemple: `<p>Capital 100, hurdle cumulé 40, profit total 80. LP : 100 + 40 ; catch-up GP : 10 (= 40/4) ; reste 30 partagé 80/20 → GP 6. Carry total = 16 = 20 % × 80.</p>`,
    points: [[`Après capital + hurdle`, ['hurdle', 'apres']], [`GP reçoit ~100 % jusqu'à 20 % du profit`, ['100 %', '20 %', 'rattrap']], [`Puis partage 80 / 20`, ['80', 'partage']]],
  }),
  q('202', 2, `Waterfall européen vs américain : quelle différence ?`, {
    courte: `<p><strong>Européen</strong> (whole-of-fund) : le carry n'est payé qu'après le remboursement de <strong>tout le capital du fonds</strong> + hurdle → protecteur pour les LP. <strong>Américain</strong> (deal-by-deal) : carry payé deal par deal, plus tôt → favorable au GP, avec un <strong>clawback</strong> si les deals suivants perdent.</p>`,
    points: [[`Européen : fonds entier`, ['europeen', 'fonds entier', 'whole', 'tout le capital']], [`Américain : deal par deal`, ['americain', 'deal par deal', 'deal-by-deal']], [`Clawback`, ['clawback', 'restitu']], [`Qui est favorisé`, ['lp', 'gp', 'favor', 'protect']]],
  }),
  q('203', 2, `Qu'est-ce qu'un co-investment et pourquoi les LP l'apprécient-ils ?`, {
    courte: `<p>Un LP investit <strong>directement</strong> dans un deal aux côtés du fonds, souvent avec <strong>peu ou pas de fees ni de carry</strong>. Il réduit ses frais moyens et augmente son exposition aux meilleurs deals ; le GP peut faire un deal plus gros que ses limites de concentration.</p>`,
    points: [[`Investissement direct aux côtés du fonds`, ['direct', 'cote', 'aux cotes']], [`Peu ou pas de fees / carry`, ['fee', 'frais', 'carry']], [`Intérêt du GP : deal plus gros`, ['gros', 'concentration', 'taille']]],
  }),
  q('204', 2, `Que sont les fonds evergreen et l'ELTIF 2.0 ?`, {
    courte: `<p>Des fonds <strong>sans durée de vie fixe</strong> qui réinvestissent et permettent des <strong>souscriptions et rachats périodiques</strong> (liquidité limitée) ; l'ELTIF 2.0 est le cadre européen qui facilite l'accès des particuliers au non-coté. C'est la « démocratisation » du private equity.</p>`,
    complete: `<ul><li>Enjeux : gestion de la liquidité (plafonds de rachat, poche liquide), valorisation fréquente des actifs, frais.</li><li>Pour les GP : capital plus stable, nouvelle base d'investisseurs.</li></ul>`,
    points: [[`Pas de durée fixe`, ['durée', 'fixe', 'ouvert', 'evergreen']], [`Souscriptions / rachats périodiques`, ['rachat', 'souscription', 'liquidit']], [`Particuliers / ELTIF`, ['particulier', 'eltif', 'retail']]],
  }),
  q('205', 2, `Quelles différences au quotidien entre un fonds mid-cap et un fonds large cap ?`, {
    courte: `<p>En <strong>mid-cap</strong> : petites deal teams (3-4), junior polyvalent (origination, exécution, suivi des participations), cibles souvent en premier LBO avec un fondateur, création de valeur <strong>opérationnelle</strong> et buy-and-build, financement unitranche / banques. En <strong>large cap</strong> : process très compétitifs, dette syndiquée (TLB, high yield), équipes spécialisées, deals médiatisés.</p>`,
    points: [[`Taille des équipes / polyvalence`, ['equipe', 'polyvalen', 'petite']], [`Cibles : fondateurs, premier LBO`, ['fondateur', 'premier lbo', 'dirigeant']], [`Création de valeur opérationnelle / build-up`, ['operationnel', 'build', 'acquisition']], [`Financement`, ['unitranche', 'tlb', 'high yield', 'banque']]],
  }),
  q('206', 2, `Comment un fonds valorise-t-il ses participations entre deux exits ?`, {
    courte: `<p>À la <strong>fair value</strong>, selon les lignes directrices <strong>IPEV</strong>, en général chaque trimestre : souvent par <strong>multiples de comparables</strong> appliqués à l'EBITDA de la participation, moins la net debt, éventuellement recoupés par un DCF ou une transaction récente.</p>`,
    complete: `<ul><li>Ces valorisations font le RVPI et le TVPI publiés aux LP.</li><li>Débat : valorisations « lissées » qui réagissent lentement au marché ; écart possible avec le prix réellement obtenu à l'exit.</li></ul>`,
    points: [[`Fair value / IPEV`, ['fair value', 'ipev', 'juste valeur']], [`Multiples de comparables`, ['multiple', 'compar']], [`Trimestriel`, ['trimestr']], [`Alimente RVPI / TVPI`, ['rvpi', 'tvpi', 'lp']]],
  }),
  q('207', 2, `Qu'est-ce qu'un IC memo et comment se passe un comité d'investissement ?`, {
    courte: `<p>L'<strong>IC memo</strong> est le document qui présente le deal à l'<strong>Investment Committee</strong> : thèse, marché, financiers, business plan et cas, valorisation et structure, rendement (base / downside), risques et parades, conclusions des DD, recommandation. Il y a souvent un IC préliminaire (avant l'offre indicative) et un IC final (avant l'offre ferme).</p>`,
    points: [[`Document de présentation du deal`, ['document', 'memo', 'presentation']], [`Contenu : thèse, financiers, rendement, risques`, ['these', 'risque', 'rendement', 'irr', 'financier']], [`IC préliminaire et final`, ['preliminaire', 'final', 'deux']], [`Recommandation`, ['recommand', 'decision']]],
  }),
  q('208', 2, `Gross IRR vs net IRR : quelle différence et quel ordre de grandeur ?`, {
    courte: `<p>Le <strong>gross IRR</strong> est celui des deals, avant frais ; le <strong>net IRR</strong> est celui que touchent les LP, après <strong>management fees, frais du fonds et carry</strong>. L'écart est souvent de <strong>4 à 8 points</strong> (ex. 25 % brut → ~18 % net).</p>`,
    points: [[`Gross = deals avant frais`, ['gross', 'brut', 'avant']], [`Net = après fees et carry`, ['net', 'apres', 'fee', 'carry']], [`Écart de plusieurs points`, ['point', 'ecart', '%']]],
  }),
  calcul('209', 2, `Fonds de 400 M€ entièrement appelé au départ, durée 5 ans, distributions totales 800 M€. Hurdle 8 % composé, catch-up 100 %, carry 20 % (waterfall européen, sans fees). Quel est le hurdle cumulé et le carry du GP ?`, [
    ['Hurdle cumulé', 187.7, 'M€', 1.5, 1],
    ['Carry du GP', 80, 'M€', 1.5, 0],
  ], `<p><strong>Hurdle</strong> = 400 × (1,08^5 − 1) = 400 × 0,4693 = <strong>187,7 M€</strong>.</p>
    <p><strong>Profit</strong> = 800 − 400 = 400. Le catch-up est complet si le profit ≥ 1,25 × hurdle = 234,6 : c'est le cas → <strong>carry = 20 % × 400 = 80 M€</strong>.</p>
    <p>Cascade : LP reçoivent 400 (capital) + 187,7 (hurdle) ; GP reçoit 46,9 de catch-up (= hurdle / 4) ; reste 165,4 partagé 80/20 (LP 132,3, GP 33,1). Total GP = 80.</p>`),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Qu'est-ce qu'un GP-led secondary (continuation vehicle) et pourquoi est-ce en forte croissance ?`, {
    duree: 150,
    courte: `<p>Le GP transfère une ou plusieurs participations d'un <strong>fonds ancien</strong> vers un <strong>nouveau véhicule</strong> qu'il gère, financé par des acheteurs secondaires. Les LP existants choisissent : <strong>liquidité</strong> (vendre) ou <strong>roll-over</strong>. C'est une réponse au marché des exits difficile et au besoin de DPI des LP.</p>`,
    complete: `<ul><li><strong>Pourquoi</strong> : exits rares (en France, valeur des sorties en baisse 4 années de suite jusqu'en 2025 selon le guide Chambers 2026), LP qui veulent du cash, GP qui veulent garder plus longtemps leurs meilleurs actifs et financer des add-ons.</li><li><strong>Enjeu</strong> : conflit d'intérêts (le GP est vendeur et acheteur) → prix testé de façon indépendante (fairness opinion, process concurrentiel), consultation du <strong>LPAC</strong>, information et choix laissés aux LP.</li><li><strong>Exemple</strong> : PAI Partners et Froneri (environ 3,6 Md€, octobre 2025), en structure de « continuation fund squared ».</li></ul>`,
    points: [[`Transfert vers un nouveau véhicule du même GP`, ['nouveau vehicule', 'continuation', 'transfer', 'meme gp']], [`Choix des LP : liquidité ou roll-over`, ['liquidit', 'roll', 'vendre', 'rester']], [`Pourquoi : exits difficiles, DPI`, ['exit', 'sortie', 'dpi', 'difficile']], [`Conflit d'intérêts / prix indépendant / LPAC`, ['conflit', 'fairness', 'independant', 'lpac']]],
  }),
  q('302', 3, `Qu'est-ce que le NAV financing et pourquoi fait-il débat ?`, {
    courte: `<p>Un prêt accordé <strong>au fonds</strong>, garanti par la valeur (NAV) de son portefeuille, pour générer de la liquidité (distributions aux LP), financer des add-ons ou soutenir des participations. Débat : il ajoute du <strong>levier au niveau du fonds</strong>, peut servir à « fabriquer » du DPI et a un coût qui pèse sur le rendement final.</p>`,
    points: [[`Prêt au fonds garanti par le portefeuille`, ['pret', 'fonds', 'portefeuille', 'nav']], [`Usages : distributions, add-ons`, ['distribution', 'add-on', 'liquidit']], [`Débat : levier supplémentaire / DPI artificiel`, ['levier', 'dpi', 'risque', 'cout']]],
  }),
  q('303', 3, `Pourquoi les LP regardent-ils aujourd'hui surtout le DPI ?`, {
    courte: `<p>Parce que les <strong>exits sont rares</strong> depuis 2022 : les fonds affichent des TVPI corrects mais rendent peu de cash. Les LP ont besoin de <strong>distributions</strong> pour honorer leurs autres engagements et réinvestir ; ils se méfient des valorisations (RVPI) non réalisées. D'où l'essor des secondaires, continuation vehicles, dividend recaps et NAV loans.</p>`,
    complete: `<ul><li>Conséquence pour les levées : les LP sans distributions réduisent leurs nouveaux engagements → fundraising plus difficile et concentré sur les GP qui distribuent.</li><li>Selon le guide Chambers 2026, en France les levées ont été de 11,8 Md€ pour 25 fonds en 2025 et 2,4 Md€ pour 7 fonds au S1 2026.</li></ul>`,
    points: [[`Exits rares`, ['exit', 'sortie', 'rare']], [`DPI = cash réel vs valorisations`, ['dpi', 'cash', 'valorisation', 'rvpi']], [`Besoin de distributions des LP`, ['distribution', 'lp', 'besoin']], [`Conséquences (secondaires, levées)`, ['secondaire', 'continuation', 'levee', 'fundraising']]],
  }),
  q('304', 3, `Comment un GP gagne-t-il de l'argent, et où sont les conflits d'intérêts avec les LP ?`, {
    courte: `<p>Par les <strong>management fees</strong> (revenus fixes, proportionnels à la taille) et le <strong>carried interest</strong> (variable, lié à la performance). Conflits possibles : grossir les fonds pour les fees au détriment du rendement, frais refacturés aux participations, timing des exits (IRR vs MOIC), transactions entre fonds du même GP (continuation vehicles), allocation des deals entre fonds et co-investisseurs.</p>`,
    complete: `<ul><li>Parades : hurdle, carry en waterfall européen, GP commitment, LPAC, politiques d'allocation, offset des fees de transaction.</li></ul>`,
    points: [[`Fees (fixes) et carry (variable)`, ['fee', 'carry', 'fixe', 'variable']], [`Conflit : taille des fonds / fees`, ['taille', 'grossir', 'fee']], [`Conflit : transactions entre fonds / timing`, ['entre fonds', 'continuation', 'timing', 'irr']], [`Parades : hurdle, GP commitment, LPAC`, ['hurdle', 'commitment', 'lpac', 'europeen']]],
  }),
  q('305', 3, `Pourquoi l'IRR d'un fonds peut-il être « amélioré » sans créer de valeur ?`, {
    courte: `<p>Parce que l'IRR dépend du <strong>temps</strong> : retarder les capital calls avec des <strong>subscription lines</strong> (lignes de crédit adossées aux engagements des LP), rendre du cash tôt avec des <strong>dividend recaps</strong> ou des exits partielles, ou des <strong>NAV loans</strong> améliorent l'IRR sans changer (voire en réduisant) le multiple.</p>`,
    complete: `<ul><li>C'est pourquoi les LP regardent aussi le MOIC, le DPI et des indicateurs comme le Public Market Equivalent (PME : comparaison au marché coté).</li><li>Exemple : une subscription line de 12 mois sur un deal qui fait 2x en 5 ans fait passer l'IRR « fonds » de ~15 % à ~19 % (2x en 4 ans).</li></ul>`,
    points: [[`L'IRR dépend du temps`, ['temps', 'timing']], [`Subscription lines`, ['subscription', 'ligne de credit', 'capital call']], [`Dividend recap / exits partielles / NAV`, ['recap', 'partiel', 'nav']], [`Le multiple ne change pas`, ['multiple', 'moic', 'dpi']]],
  }),
]);
