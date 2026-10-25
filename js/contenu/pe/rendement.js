// PE — Returns (IRR, MOIC) et paper LBO
import { q, calcul, theme } from '../fabriques.js';

const REPERES = `<table class="tableau compact"><thead><tr><th>Années</th><th>15 %</th><th>20 %</th><th>25 %</th><th>30 %</th></tr></thead><tbody>
  <tr><td>3</td><td>1,52x</td><td>1,73x</td><td>1,95x</td><td>2,20x</td></tr>
  <tr><td>4</td><td>1,75x</td><td>2,07x</td><td>2,44x</td><td>2,86x</td></tr>
  <tr><td>5</td><td>2,01x</td><td>2,49x</td><td>3,05x</td><td>3,71x</td></tr></tbody></table>`;

export default theme('pe', 'rendement', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Un fonds fait 2x sa mise en 5 ans. Quel est l'IRR, de tête ?`, {
    courte: `<p>Environ <strong>15 %</strong> (exactement 14,9 % : 1,15^5 ≈ 2,01).</p>`,
    complete: `<p>Méthode : connaître par cœur quelques puissances, puis interpoler.</p>${REPERES}`,
    points: [[`~15 %`, ['15', '14,9', '14.9']], [`Méthode (1,15^5 ≈ 2)`, ['1,15', '1.15', 'puissance', 'repere']]],
    conseil: `Annonce d'abord l'ordre de grandeur (« autour de 15 % »), puis affine si on te le demande.`,
  }),
  q('102', 1, `Un fonds fait 3x sa mise en 5 ans. Quel est l'IRR, de tête ?`, {
    courte: `<p>Environ <strong>25 %</strong> (24,6 % : 1,25^5 ≈ 3,05).</p>`,
    complete: REPERES,
    points: [[`~25 %`, ['25', '24,6', '24.6']], [`Repère 1,25^5 ≈ 3`, ['1,25', '1.25']]],
  }),
  q('103', 1, `Un fonds fait 2x sa mise en 3 ans. Quel est l'IRR, de tête ?`, {
    courte: `<p>Environ <strong>26 %</strong> (1,26³ ≈ 2). Même multiple qu'en 5 ans, mais en moins de temps : l'IRR est bien plus élevé.</p>`,
    complete: REPERES,
    points: [[`~26 %`, ['26']], [`Le temps change l'IRR`, ['temps', 'moins de temps', 'plus court']]],
  }),
  q('104', 1, `Le fonds vise 20 % d'IRR sur 5 ans. Quel MOIC faut-il ?`, {
    courte: `<p>Environ <strong>2,5x</strong> (1,2^5 = 2,49).</p>`,
    complete: `<p>Calcul de tête : 1,2² = 1,44 ; 1,44² ≈ 2,07 (4 ans) ; × 1,2 ≈ 2,49 (5 ans).</p>${REPERES}`,
    points: [[`~2,5x`, ['2,5', '2.5', '2,49']], [`Méthode (1,2² = 1,44…)`, ['1,44', '1.44', '1,2']]],
  }),
  q('105', 1, `Qu'est-ce que la règle de 72 et comment l'utiliser en entretien ?`, {
    courte: `<p>Le temps de doublement d'un placement ≈ <strong>72 / taux annuel</strong> (en %). À 12 %, l'argent double en ~6 ans ; à 24 %, en ~3 ans. Utile pour vérifier un IRR de tête : 2x en 4 ans → 72/4 = 18 % (exact : 18,9 %).</p>`,
    points: [[`72 / taux = années de doublement`, ['72']], [`Exemple (12 % → 6 ans)`, ['12', '6 ans']], [`Usage : contrôle d'un IRR`, ['controle', 'verif', 'irr']]],
  }),
  q('106', 1, `Pourquoi un fonds regarde-t-il à la fois l'IRR et le MOIC ?`, {
    courte: `<p>L'<strong>IRR</strong> mesure la performance annuelle mais peut être flatté par une exit très rapide ; le <strong>MOIC</strong> mesure la valeur créée (cash-on-cash) sans tenir compte du temps. Les LP veulent les deux : un bon IRR <strong>et</strong> un vrai multiple (ils doivent redéployer leur capital).</p>`,
    exemple: `<p>1,3x en 1 an = 30 % d'IRR mais peu de valeur ; 2,5x en 5 ans = 20 % d'IRR mais 150 % de gain.</p>`,
    points: [[`IRR = performance annuelle (temps)`, ['annuel', 'temps']], [`MOIC = valeur créée`, ['multiple', 'valeur', 'cash']], [`Exit rapide flatte l'IRR`, ['rapide', 'flatt', 'court']], [`Les LP veulent les deux`, ['lp', 'deux', 'redeploy']]],
  }),
  q('107', 1, `Qu'est-ce qu'un paper LBO ?`, {
    courte: `<p>Un exercice d'entretien : modéliser un LBO <strong>de tête ou sur une feuille</strong>, sans Excel, en quelques minutes : prix d'entrée, structure (dette / equity), cash flows et remboursement de la dette, valeur d'exit, <strong>MOIC</strong> et <strong>IRR</strong>.</p>`,
    complete: `<ul><li>Les grands fonds le font souvent passer chronométré ; les fonds mid-cap donnent plutôt un cas de quelques heures ou à la maison.</li><li>On juge la <strong>méthode</strong> et la <strong>vraisemblance</strong> autant que le chiffre.</li></ul>`,
    points: [[`LBO de tête / sur feuille`, ['tete', 'feuille', 'papier', 'sans excel']], [`Entrée, dette, cash, exit`, ['entree', 'dette', 'cash', 'exit']], [`MOIC et IRR`, ['moic', 'irr', 'tri']]],
  }),
  q('108', 1, `Quelles sont les étapes d'un paper LBO ?`, {
    courte: `<p>1) <strong>Prix d'entrée</strong> = EBITDA × multiple (+ frais). 2) <strong>Structure</strong> : dette = x × EBITDA, equity = le reste. 3) <strong>Projection</strong> de l'EBITDA et du <strong>cash disponible</strong> pour la dette (après intérêts, impôt, capex, NWC). 4) <strong>Dette à l'exit</strong> = dette − cash cumulé. 5) <strong>Equity à l'exit</strong> = EBITDA de sortie × multiple − net debt ; MOIC = equity sortie / entrée ; IRR par les repères.</p>`,
    complete: REPERES,
    points: [[`Prix d'entrée`, ['multiple', 'prix', 'entree']], [`Dette / equity`, ['dette', 'equity', 'fonds propres']], [`Cash flow pour la dette`, ['cash', 'flux', 'fcf']], [`Dette à l'exit / equity à l'exit`, ['exit', 'sortie', 'net debt']], [`MOIC et IRR`, ['moic', 'irr', 'tri']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  calcul('201', 2, `Mise de 100, exit à 250 au bout de 4 ans, sans flux intermédiaire. IRR ?`, [
    ['IRR', 25.7, '%', 0.7],
  ], `<p>2,5^(1/4) − 1 ≈ <strong>25,7 %</strong>. Repère : 1,25⁴ ≈ 2,44, donc un peu plus de 25 %.</p>${REPERES}`),
  calcul('202', 2, `Mise de 100 en année 0. Dividende de 40 en année 2, exit à 180 en année 5. MOIC et IRR ?`, [
    ['MOIC', 2.2, 'x', 0.05],
    ['IRR', 20, '%', 1, 0],
  ], `<p>MOIC = (40 + 180) / 100 = <strong>2,2x</strong>. IRR : on cherche r tel que 40/(1+r)² + 180/(1+r)⁵ = 100 → r ≈ <strong>20 %</strong> (à 20 % : 40 / 1,44 + 180 / 2,49 ≈ 27,8 + 72,3 = 100,1).</p>
    <p>Un 2,2x « sec » en 5 ans ne donnerait que ≈ 17 % : le dividende précoce améliore l'IRR.</p>`),
  q('203', 2, `Deal A : 1,3x en 1 an (30 % d'IRR). Deal B : 2,5x en 5 ans (20 % d'IRR). Lequel préfère un LP ?`, {
    courte: `<p><strong>Pas forcément A</strong> : B crée bien plus de valeur en absolu (+150 % contre +30 %). Avec A, le LP récupère son capital vite mais doit le <strong>redéployer</strong> (frais, temps, risque de ne pas retrouver un tel rendement : reinvestment risk). Le bon critère dépend de la capacité à réinvestir et du coût du capital.</p>`,
    points: [[`Pas forcément A`, ['pas forcement', 'depend']], [`B crée plus de valeur absolue`, ['valeur', 'absolu', '150']], [`Reinvestment risk`, ['redeploy', 'reinvest', 'reinvestment']]],
  }),
  q('204', 2, `Comment approximes-tu un IRR de tête en entretien ?`, {
    courte: `<p>1) Je calcule le <strong>MOIC</strong>. 2) Je le compare à des <strong>repères</strong> appris (2x/5 ans ≈ 15 %, 2,5x ≈ 20 %, 3x ≈ 25 % ; 1,2² = 1,44 ; 1,25⁴ ≈ 2,44). 3) J'<strong>interpole</strong>. 4) Je contrôle avec la <strong>règle de 72</strong>. 5) Avec des flux intermédiaires, je raisonne en valeur actuelle approximative.</p>`,
    complete: REPERES,
    points: [[`Calculer le MOIC`, ['moic', 'multiple']], [`Repères appris`, ['repere', '15', '20', '25']], [`Interpoler`, ['interpol']], [`Contrôle (règle de 72)`, ['72', 'controle']]],
  }),
  q('205', 2, `À MOIC constant, comment l'IRR réagit-il à la durée de détention ?`, {
    courte: `<p>L'IRR <strong>baisse</strong> quand la durée s'allonge : 2,5x en 3 ans ≈ 36 % ; en 5 ans ≈ 20 % ; en 7 ans ≈ 14 %. C'est pourquoi les holding periods plus longues (exits difficiles) pèsent sur les IRR des fonds.</p>`,
    points: [[`IRR baisse avec la durée`, ['baisse', 'allonge', 'duree']], [`Exemple chiffré`, ['36', '20', '14', 'ans']], [`Lien avec les exits difficiles`, ['exit', 'sortie', 'detention']]],
  }),
  q('206', 2, `De 25 % de gross IRR, à combien arrive-t-on en net IRR pour les LP ?`, {
    courte: `<p>Souvent autour de <strong>17-20 %</strong> : les management fees (~1,5-2 % par an sur les commitments), les frais du fonds et le carried interest (20 % de la plus-value au-delà du hurdle) coûtent plusieurs points d'IRR, d'autant plus que le capital est appelé progressivement.</p>`,
    points: [[`Net plus bas de plusieurs points`, ['point', 'plus bas', 'net']], [`Fees`, ['fee', 'frais']], [`Carry`, ['carry', 'carried', '20 %']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Paper LBO : EBITDA 50 M€, entrée à 10x, dette 5x l'EBITDA (frais ignorés). L'EBITDA croît de 8 % par an pendant 5 ans ; 50 % de l'EBITDA de chaque année sert à rembourser la dette ; exit à 10x. MOIC et IRR ?`, {
    duree: 420,
    courte: `<p>EV d'entrée 500, dette 250, <strong>equity 250</strong>. EBITDA année 5 ≈ 50 × 1,47 ≈ <strong>73,5</strong>. Cash cumulé pour la dette ≈ 50 % × (54 + 58 + 63 + 68 + 73,5) ≈ <strong>158</strong> → dette à l'exit ≈ <strong>92</strong>. EV d'exit ≈ 735 → equity ≈ <strong>643</strong> → <strong>MOIC ≈ 2,6x</strong>, <strong>IRR ≈ 21 %</strong>.</p>`,
    complete: `<table class="tableau"><thead><tr><th>Étape</th><th>Calcul</th><th>M€</th></tr></thead><tbody>
      <tr><td>EV d'entrée</td><td>50 × 10</td><td class="num">500</td></tr>
      <tr><td>Dette</td><td>50 × 5</td><td class="num">250</td></tr>
      <tr class="total"><td>Equity investie</td><td>500 − 250</td><td class="num">250</td></tr>
      <tr><td>EBITDA années 1 à 5</td><td>× 1,08 chaque année</td><td class="num">54 ; 58,3 ; 63 ; 68 ; 73,5</td></tr>
      <tr><td>Cash pour la dette</td><td>50 % × 316,8</td><td class="num">158,4</td></tr>
      <tr><td>Dette à l'exit</td><td>250 − 158,4</td><td class="num">91,6</td></tr>
      <tr><td>EV d'exit</td><td>73,5 × 10</td><td class="num">735</td></tr>
      <tr class="total"><td>Equity à l'exit</td><td>735 − 91,6</td><td class="num">643</td></tr>
      <tr><td>MOIC / IRR</td><td>643 / 250</td><td class="num">2,57x / ≈ 20,8 %</td></tr></tbody></table>
      <p><strong>Value creation bridge</strong> : EBITDA growth (73,5 − 50) × 10 = 235 ; deleveraging 158 ; multiple 0 → gain total ≈ 393 = 643 − 250.</p>`,
    pieges: [`Oublier de déduire la dette résiduelle à l'exit.`, `Annoncer un IRR sans vérifier sa vraisemblance (un LBO mid-cap fait typiquement 15-30 %).`],
    conseil: `En entretien : écris une colonne « entrée » et une colonne « exit », arrondis franchement et annonce chaque résultat intermédiaire.`,
    points: [[`Equity investie 250`, ['250']], [`EBITDA exit ≈ 73,5 (× 1,47)`, ['73', '1,47', '1.47']], [`Dette à l'exit ≈ 92`, ['92', '91']], [`Equity exit ≈ 643`, ['643', '640']], [`MOIC ≈ 2,6x / IRR ≈ 21 %`, ['2,6', '2.6', '2,57', '21', '20,8']]],
  }),
  q('302', 3, `Comment calcules-tu l'exit multiple nécessaire pour atteindre 20 % d'IRR ?`, {
    courte: `<p>J'inverse le calcul : equity nécessaire à l'exit = <strong>equity investie × 1,2^n</strong> ; EV nécessaire = equity nécessaire + net debt à l'exit ; <strong>multiple = EV nécessaire / EBITDA d'exit</strong>. Je compare ensuite au multiple d'entrée : si j'ai besoin d'une multiple expansion pour faire 20 %, le dossier dépend du marché.</p>`,
    exemple: `<p>Equity 100, 5 ans → besoin de 249 ; net debt d'exit 60 ; EBITDA d'exit 30 → multiple = (249 + 60) / 30 ≈ <strong>10,3x</strong>.</p>`,
    points: [[`Equity nécessaire = mise × (1+IRR)^n`, ['1,2', '1.2', 'puissance', 'necessaire']], [`EV = equity + net debt`, ['net debt', 'dette', 'ev']], [`Multiple = EV / EBITDA d'exit`, ['multiple', 'ebitda']], [`Comparer au multiple d'entrée`, ['entree', 'compar', 'expansion']]],
  }),
  q('303', 3, `Décompose la value creation d'un LBO : entrée EBITDA 20 à 9x avec 80 de dette ; exit EBITDA 30 à 10x avec 40 de dette.`, {
    courte: `<p>Equity d'entrée = 180 − 80 = 100 ; equity d'exit = 300 − 40 = 260 ; gain 160. <strong>EBITDA growth</strong> = (30 − 20) × 9 = <strong>90</strong> ; <strong>multiple expansion</strong> = (10 − 9) × 30 = <strong>30</strong> ; <strong>deleveraging</strong> = 80 − 40 = <strong>40</strong>. Total 160 ✓.</p>`,
    complete: `<ul><li>Convention : EBITDA growth valorisée au multiple d'entrée ; multiple expansion appliquée à l'EBITDA d'exit (d'autres conventions existent : dis laquelle tu prends).</li><li>Lecture : 56 % du gain vient de l'EBITDA (maîtrisé), 19 % du multiple (marché), 25 % du deleveraging.</li></ul>`,
    points: [[`Equity entrée 100 / exit 260`, ['100', '260']], [`EBITDA growth 90`, ['90']], [`Multiple 30`, ['30']], [`Deleveraging 40`, ['40']], [`Convention annoncée`, ['convention', 'multiple d entree']]],
  }),
  q('304', 3, `Un deal affiche 25 % d'IRR mais seulement 1,6x de MOIC. Qu'en penses-tu ?`, {
    courte: `<p>C'est une exit <strong>rapide</strong> (~2 ans) : bon pour l'IRR et le DPI, mais <strong>peu de valeur absolue</strong> créée. À juger selon le contexte : le fonds peut-il redéployer ce capital à un rendement similaire ? Était-ce la meilleure offre ou une vente précipitée ? Les LP regardent aussi le multiple global du fonds.</p>`,
    complete: `<ul><li>1,6^(1/2) ≈ 1,26 → 26 % sur 2 ans.</li><li>Côté GP : le carry dépend du profit en valeur, pas de l'IRR ; une exit rapide à 1,6x peut rapporter moins qu'une détention plus longue.</li></ul>`,
    points: [[`Exit rapide (~2 ans)`, ['rapide', '2 ans', 'court']], [`Peu de valeur absolue`, ['valeur', 'absolu', 'faible']], [`Reinvestment / contexte`, ['redeploy', 'reinvest', 'contexte']], [`Multiple global du fonds / carry`, ['carry', 'fonds', 'lp']]],
  }),
]);
