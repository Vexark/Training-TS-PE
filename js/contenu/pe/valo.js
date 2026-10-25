// PE — Valuation et pricing
import { q, calcul, theme } from '../fabriques.js';

export default theme('pe', 'valo', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Comment valorises-tu une cible de LBO ?`, {
    courte: `<p>Par les <strong>multiples</strong> (trading et surtout transaction comparables appliqués à l'adjusted EBITDA), recoupés par un <strong>DCF</strong> si utile, et surtout par la <strong>valorisation LBO</strong> (ability to pay) : le prix maximum compatible avec l'IRR / MOIC visé et la dette disponible.</p>`,
    points: [[`Multiples (comparables)`, ['multiple', 'compar']], [`DCF`, ['dcf']], [`Valorisation LBO / ability to pay`, ['lbo', 'ability', 'capacite', 'maximum']], [`Lien avec IRR visé`, ['irr', 'tri', 'moic']]],
  }),
  q('102', 1, `Qu'est-ce que la valorisation LBO (ability to pay) ?`, {
    courte: `<p>On part de l'<strong>exit</strong> pour remonter au prix : equity à l'exit = EBITDA d'exit × exit multiple − net debt d'exit ; <strong>equity maximum</strong> aujourd'hui = equity à l'exit / MOIC visé ; <strong>EV maximum</strong> = equity maximum + dette levée (− frais).</p>`,
    exemple: `<p>Exit : EBITDA 30 × 8 = 240, net debt 60 → equity 180. Objectif 2,5x → equity max 72. Dette levable 70, frais 4 → EV max ≈ 72 + 70 − 4 = <strong>138</strong>.</p>`,
    points: [[`Partir de l'exit`, ['exit', 'sortie']], [`Equity max = equity exit / MOIC visé`, ['moic', 'divis', 'vise']], [`EV max = equity + dette`, ['dette', 'ev']], [`Prix maximum`, ['maximum', 'max']]],
  }),
  q('103', 1, `Pourquoi les sociétés SaaS ont-elles des multiples élevés ?`, {
    courte: `<p>Revenus <strong>récurrents</strong> (abonnements, ARR), <strong>croissance</strong> forte, <strong>marges</strong> élevées à maturité, <strong>peu de capex</strong> et un NWC souvent négatif (facturation d'avance) → forte cash conversion et grande visibilité. Les acheteurs paient la prévisibilité.</p>`,
    pieges: [`Oublier la capitalisation de la R&D qui peut gonfler l'EBITDA.`],
    points: [[`Récurrence (ARR)`, ['recurren', 'abonnement', 'arr']], [`Croissance et marges`, ['croissance', 'marge']], [`Peu de capex / cash conversion`, ['capex', 'cash', 'conversion']], [`Visibilité`, ['visibil', 'previsib']]],
  }),
  q('104', 1, `Pourquoi les fonds prennent-ils un exit multiple inférieur ou égal à l'entry multiple dans le base case ?`, {
    courte: `<p>Par <strong>prudence</strong> : la multiple expansion dépend du <strong>marché</strong> au moment de l'exit (taux, appétit des acheteurs), que le fonds ne maîtrise pas. Un dossier doit atteindre son IRR grâce à l'<strong>EBITDA growth</strong> et au deleveraging, pas grâce à un pari sur le multiple.</p>`,
    points: [[`Prudence`, ['prudence', 'prudent', 'conservat']], [`Le multiple dépend du marché`, ['marche', 'maitrise', 'taux']], [`IRR par l'EBITDA growth / deleveraging`, ['ebitda', 'deleverag', 'croissance']]],
  }),
  q('105', 1, `Quand utilise-t-on un multiple EV/Sales plutôt qu'EV/EBITDA ?`, {
    courte: `<p>Quand l'EBITDA est <strong>faible, négatif ou peu représentatif</strong> : sociétés en forte croissance pas encore rentables, logiciels en phase d'investissement (souvent avec l'ARR), ou pour comparer des sociétés aux marges très différentes en phase de transition.</p>`,
    points: [[`EBITDA faible / négatif`, ['negati', 'faible', 'pas rentable']], [`Forte croissance / SaaS`, ['croissance', 'saas', 'arr']]],
  }),
  q('106', 1, `Comment combler un valuation gap entre acheteur et vendeur ?`, {
    courte: `<p>En partageant le risque : <strong>earn-out</strong> (complément de prix sur la performance), <strong>rollover</strong> (le vendeur réinvestit), <strong>vendor loan</strong> (paiement différé subordonné), <strong>deferred consideration</strong>, actions de préférence. Le guide Chambers 2026 cite earn-outs, rollovers et vendor loans comme outils courants en France.</p>`,
    points: [[`Earn-out`, ['earn']], [`Rollover`, ['rollover', 'reinvest']], [`Vendor loan / paiement différé`, ['vendor loan', 'credit vendeur', 'differ']], [`Partage du risque`, ['risque', 'partage']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  calcul('201', 2, `Le fonds vise 2,5x en 5 ans. À l'exit : EBITDA 30, multiple 8x, net debt 60. Equity maximum à investir aujourd'hui ?`, [
    ['Equity maximum', 72, 'M€', 0.5],
  ], `<p>Equity à l'exit = 30 × 8 − 60 = 180. Equity maximum = 180 / 2,5 = <strong>72 M€</strong>.</p>
    <p><strong>À dire au recruteur</strong> : « ensuite j'ajoute la dette que les prêteurs accepteront aujourd'hui pour obtenir l'EV maximum, et je compare au prix demandé par le vendeur ».</p>`),
  q('202', 2, `Comment justifierais-tu de payer 12x l'EBITDA pour une société ?`, {
    courte: `<p>Par la <strong>qualité de l'actif</strong> (croissance visible, revenus récurrents, marges et cash conversion élevées), une <strong>position concurrentielle</strong> forte (moat, pricing power), un potentiel de <strong>buy-and-build</strong> (add-ons à multiples bas qui « diluent » le multiple payé), des <strong>comparables</strong> cohérents — et surtout un IRR cible atteint <strong>sans multiple expansion</strong>, avec un downside qui préserve le capital.</p>`,
    exemple: `<p>Payer 12x × 10 = 120 puis acheter 5 d'EBITDA d'add-ons à 7x (35) : 155 pour 15 d'EBITDA, soit un multiple moyen de 10,3x.</p>`,
    points: [[`Qualité de l'actif`, ['recurren', 'croissance', 'marge', 'cash']], [`Position concurrentielle`, ['moat', 'leader', 'pricing', 'concurren']], [`Buy-and-build qui dilue le multiple`, ['build', 'add-on', 'dilu', 'moyen']], [`IRR sans multiple expansion`, ['sans', 'expansion', 'irr']]],
  }),
  q('203', 2, `Explique un tableau Sources & Uses.`, {
    courte: `<p><strong>Uses</strong> (emplois) : prix des titres (Equity Value), <strong>refinancement</strong> de la dette existante de la cible, <strong>frais</strong> de transaction (et éventuellement cash au bilan). <strong>Sources</strong> (ressources) : <strong>dette</strong> d'acquisition, <strong>equity</strong> du fonds, <strong>réinvestissement</strong> du management (rollover), éventuellement vendor loan. Les deux colonnes sont égales.</p>`,
    exemple: `<p>EV 200 (dont 50 de dette refinancée), frais 6 → Uses 206. Sources : dette 110, management 6, fonds 90 → 206.</p>`,
    points: [[`Uses : prix, refinancement, frais`, ['prix', 'refinanc', 'frais', 'uses', 'emplois']], [`Sources : dette, equity fonds, management`, ['dette', 'equity', 'management', 'sources']], [`Égalité des deux colonnes`, ['egal', 'equilibr']]],
  }),
  q('204', 2, `Pourquoi un strategic buyer peut-il souvent payer plus cher qu'un fonds ?`, {
    courte: `<p>Grâce aux <strong>synergies</strong> (coûts et revenue) qu'il peut capter et rétrocéder en partie dans le prix, à un <strong>coût du capital</strong> parfois plus bas, à un horizon long et à des motifs <strong>stratégiques</strong> (défendre une position, entrer sur un marché). Un fonds est limité par son IRR cible et la dette disponible.</p>`,
    points: [[`Synergies`, ['synergie']], [`Coût du capital / horizon`, ['cout du capital', 'horizon', 'long']], [`Motifs stratégiques`, ['strateg', 'position', 'marche']], [`Fonds limité par IRR / dette`, ['irr', 'dette', 'limite']]],
  }),
  q('205', 2, `Quel multiple moyen les sponsors ont-ils payé dans le lower mid-market de la zone euro, selon le guide Chambers 2026 ?`, {
    courte: `<p>Environ <strong>10,0x l'EBITDA</strong> (donnée zone euro, pas spécifique à la France). Le même guide note que les multiples se redressent avec des vendeurs plus réalistes, mais qu'en France les écarts de valorisation persistent.</p>`,
    complete: `<p>À citer avec sa source et avec prudence : les multiples varient fortement selon le secteur (logiciel 13-17x, industrie 6-8x), la taille et la qualité de l'actif.</p>`,
    points: [[`~10x`, ['10']], [`Zone euro, lower mid-market`, ['zone euro', 'lower', 'mid']], [`Varie selon le secteur`, ['secteur', 'varie']]],
  }),
  q('206', 2, `Comment choisis-tu l'exit multiple dans ton modèle ?`, {
    courte: `<p>En général <strong>égal ou inférieur à l'entry multiple</strong>, ajusté de ce qui aura changé : taille (une société plus grande peut valoir plus), profil (plus récurrente, plus internationale), cycle du secteur et des taux. Je montre une <strong>sensitivity</strong> IRR / exit multiple.</p>`,
    points: [[`≤ entry multiple`, ['egal', 'inferieur', 'entree']], [`Ajusté du profil / taille`, ['taille', 'profil', 'ajust']], [`Cycle / taux`, ['cycle', 'taux']], [`Sensitivity`, ['sensib']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Le vendeur demande 14x l'EBITDA ; ton modèle dit que 11x est le maximum pour atteindre l'IRR cible. Que fais-tu ?`, {
    courte: `<p>Je <strong>ne force pas le modèle</strong> (plus de dette, multiple expansion). Je cherche à <strong>combler l'écart</strong> : identifier des leviers de value creation supplémentaires crédibles (add-ons, pricing), proposer une <strong>structuration</strong> (earn-out, rollover, vendor loan) — sinon je <strong>recommande de ne pas suivre</strong> à ce prix.</p>`,
    complete: `<ul><li>Comprendre d'où vient l'écart : le vendeur croit à un business plan plus ambitieux ? des synergies d'un industriel en face ?</li><li>Tester : quel IRR à 14x ? quelles hypothèses faudrait-il ? sont-elles réalistes ?</li><li>Un fonds qui « gagne » une enchère en surpayant hypothèque son rendement.</li></ul>`,
    points: [[`Ne pas forcer le modèle`, ['forcer', 'dette', 'expansion', 'pas']], [`Leviers supplémentaires crédibles`, ['levier', 'add-on', 'pricing', 'build']], [`Structuration (earn-out, rollover, vendor loan)`, ['earn', 'rollover', 'vendor']], [`Savoir dire non`, ['non', 'renonc', 'ne pas suivre', 'pas a ce prix']]],
  }),
  q('302', 3, `Comment valoriser une société cyclique en haut de cycle ?`, {
    courte: `<p>En raisonnant sur un <strong>EBITDA normatif « mid-cycle »</strong> (moyenne sur un cycle complet) plutôt que sur l'EBITDA LTM au pic, en appliquant un multiple cohérent avec ce niveau, avec un <strong>levier prudent</strong> et un downside case qui simule le bas de cycle.</p>`,
    exemple: `<p>EBITDA sur 6 ans : 8, 12, 15, 10, 14, 20 (LTM). Mid-cycle ≈ 13. Payer 8x × 20 = 160 revient à payer 12x le mid-cycle.</p>`,
    points: [[`EBITDA mid-cycle / normatif`, ['mid-cycle', 'cycle', 'normatif', 'moyenne']], [`Pas l'EBITDA du pic`, ['pic', 'haut', 'ltm']], [`Levier prudent / downside`, ['prudent', 'levier', 'downside', 'bas de cycle']]],
  }),
  q('303', 3, `Comment intégrer un buy-and-build dans le prix d'entrée ?`, {
    courte: `<p>Avec prudence : la platform se paie sur son <strong>EBITDA actuel</strong> ; les add-ons futurs sont un levier du fonds (il apporte le capital et le risque d'exécution). On peut payer une partie de l'upside si le <strong>pipeline</strong> est concret et que le management a déjà <strong>intégré</strong> des acquisitions — sinon on garde ce potentiel pour son propre IRR.</p>`,
    points: [[`Platform payée sur l'EBITDA actuel`, ['actuel', 'platform', 'plateforme']], [`Add-ons = levier du fonds`, ['levier', 'fonds', 'risque']], [`Payer un peu si pipeline concret`, ['pipeline', 'concret', 'partie']], [`Historique d'intégration`, ['integr', 'historique']]],
  }),
  q('304', 3, `Pourquoi le multiple EV/EBITDA peut-il tromper ?`, {
    courte: `<p>Parce qu'il ignore le <strong>capex</strong> (deux sociétés au même EBITDA peuvent générer des cash flows très différents), la <strong>variation du NWC</strong>, l'<strong>impôt</strong>, et qu'il dépend de la convention (<strong>IFRS 16</strong>, R&D capitalisée, adjustments). D'où l'intérêt d'EV/(EBITDA − capex) ou d'EV/FCF pour comparer.</p>`,
    exemple: `<p>A et B : EBITDA 20, EV 200 (10x). Capex A = 2, B = 10 → EV/(EBITDA − capex) : A 11,1x, B 20x. B est bien plus chère en réalité.</p>`,
    points: [[`Ignore le capex`, ['capex']], [`Ignore NWC / impôt`, ['nwc', 'impot', 'bfr']], [`Dépend des conventions`, ['ifrs 16', 'convention', 'capitalis', 'adjust']], [`Alternatives : EV/(EBITDA − capex), EV/FCF`, ['fcf', 'ebitda - capex', 'ebitda − capex']]],
  }),
]);
