// TS — Valuation et EV-to-Equity bridge
import { q, calcul, theme } from '../fabriques.js';

export default theme('ts', 'valo', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Qu'est-ce que l'Enterprise Value ?`, {
    courte: `<p>L'<strong>Enterprise Value</strong> est la valeur de l'outil économique, pour <strong>l'ensemble des financeurs</strong> (actionnaires et prêteurs), indépendamment de la façon dont il est financé. En deal : EV = multiple × adjusted EBITDA (ou DCF).</p>`,
    complete: `<ul><li>Pour une société cotée : EV = capitalisation boursière + net debt (+ minority interests − actifs hors exploitation).</li><li>Deux sociétés identiques, l'une endettée et l'autre non, ont la même EV mais pas la même Equity Value.</li></ul>`,
    points: [[`Valeur de l'outil économique`, ['outil', 'activite', 'operationnel']], [`Pour tous les financeurs (dette + equity)`, ['financeur', 'dette', 'actionnaire', 'preteur']], [`Indépendante de la structure financière`, ['independ', 'structure']], [`Multiple × EBITDA ou DCF`, ['multiple', 'dcf']]],
  }),
  q('102', 1, `Comment passe-t-on de l'Enterprise Value à l'Equity Value ?`, {
    courte: `<p><strong>Equity Value = EV − net debt financière − debt-like items + cash-like items ± écart de NWC vs peg − minority interests + actifs hors exploitation</strong> (participations non consolidées, immobilier non utilisé).</p>`,
    complete: `<ul><li>C'est le cœur du SPA en cash-free / debt-free : l'EV est négociée sur l'adjusted EBITDA, puis chaque ligne du bridge se négocie euro pour euro.</li><li>Les minority interests se déduisent car l'EV est calculée sur 100 % de l'EBITDA consolidé alors qu'une partie des filiales appartient à des tiers.</li></ul>`,
    exemple: `<p>EBITDA ajusté 8 × 9 = EV 72 ; net debt 22 ; debt-like 2 ; NWC livré 1 sous le peg → Equity Value = 72 − 22 − 2 − 1 = <strong>47</strong>.</p>`,
    conseil: `Récite le bridge toujours dans le même ordre : c'est une question réflexe.`,
    points: [[`− net debt`, ['net debt', 'dette nette']], [`− debt-like / + cash-like`, ['debt-like', 'debt like', 'cash-like']], [`± écart de NWC`, ['nwc', 'peg', 'bfr']], [`− minorities + actifs hors exploitation`, ['minorit', 'hors exploitation', 'participation']]],
  }),
  q('103', 1, `Quelles sont les principales méthodes de valorisation ?`, {
    courte: `<p>Les <strong>trading comparables</strong> (multiples de sociétés cotées), les <strong>transaction comparables</strong> (multiples payés lors de rachats), le <strong>DCF</strong> (flux futurs actualisés) et, côté PE, la <strong>valorisation LBO</strong> (prix maximum compatible avec l'IRR visé).</p>`,
    complete: `<ul><li>Multiples : rapides, reflètent le marché, mais dépendent du choix des comparables et du moment.</li><li>DCF : valeur intrinsèque, mais très sensible au WACC et à la terminal value.</li><li>On présente souvent un « football field » : fourchettes de chaque méthode côte à côte.</li></ul>`,
    points: [[`Trading comparables`, ['trading', 'boursier', 'cote']], [`Transaction comparables`, ['transaction', 'rachat']], [`DCF`, ['dcf', 'actualis']], [`Valorisation LBO`, ['lbo', 'irr', 'tri']]],
  }),
  q('104', 1, `Qu'est-ce qu'un multiple EV/EBITDA et comment l'utilise-t-on ?`, {
    courte: `<p>Le rapport entre l'Enterprise Value et l'EBITDA : « 9x » signifie que la société vaut 9 fois son EBITDA. On observe les multiples de sociétés ou de transactions comparables, puis on applique un multiple à l'<strong>adjusted EBITDA</strong> de la cible.</p>`,
    complete: `<ul><li>Choisir le bon agrégat : LTM ou NTM, pre- ou post-IFRS 16, adjusted ou reported — même convention pour la cible et les comparables.</li><li>Ajuster pour la taille, la croissance, les marges, la récurrence (décote ou prime).</li><li>Préférer la médiane à la moyenne (moins sensible aux extrêmes).</li></ul>`,
    points: [[`EV / EBITDA`, ['ev', 'ebitda', 'rapport']], [`Comparables observés`, ['compar', 'observ']], [`Appliqué à l'adjusted EBITDA`, ['adjusted', 'ebitda ajuste', 'cible']], [`Même convention / ajustements`, ['convention', 'ltm', 'decote', 'prime']]],
  }),
  q('105', 1, `Décris un DCF en 4 étapes.`, {
    courte: `<p>1) Projeter les <strong>unlevered free cash flows</strong> (EBITDA − impôt − capex − ΔNWC) sur 5-10 ans ; 2) calculer le <strong>WACC</strong> ; 3) calculer la <strong>terminal value</strong> (Gordon growth ou exit multiple) ; 4) <strong>actualiser</strong> flux et terminal value au WACC → EV, puis passer à l'Equity Value.</p>`,
    complete: `<ul><li>Sensibilités : WACC ± 0,5-1 pt, croissance à l'infini ± 0,5 pt.</li><li>Contrôles : terminal value / EV (souvent 60-80 %), multiple implicite de la terminal value cohérent avec le marché.</li></ul>`,
    points: [[`Projection des FCF`, ['fcf', 'free cash flow', 'flux', 'projet']], [`WACC`, ['wacc']], [`Terminal value`, ['terminal', 'valeur terminale', 'gordon']], [`Actualisation → EV → Equity`, ['actualis', 'ev', 'equity']]],
  }),
  q('106', 1, `Qu'est-ce que le WACC ?`, {
    courte: `<p>Le <strong>Weighted Average Cost of Capital</strong> : le coût moyen des financements de la société, pondéré par leur poids. <strong>WACC = Ke × E/(D+E) + Kd × (1 − t) × D/(D+E)</strong>. C'est le taux d'actualisation des free cash flows d'un DCF.</p>`,
    complete: `<ul><li>Ke (cost of equity) : souvent par le CAPM = taux sans risque + bêta × prime de risque.</li><li>Kd × (1 − t) : les intérêts sont déductibles.</li><li>Poids en valeur de marché (cible de structure financière), pas en valeur comptable.</li></ul>`,
    points: [[`Coût moyen pondéré des financements`, ['moyen', 'pondere', 'financement']], [`Formule Ke / Kd (1 − t)`, ['ke', 'kd', '1 - t', '1 − t']], [`Taux d'actualisation du DCF`, ['actualis', 'dcf']]],
  }),
  q('107', 1, `Pourquoi un multiple de transaction est-il en général supérieur à un multiple boursier ?`, {
    courte: `<p>Parce qu'il inclut une <strong>control premium</strong> : l'acheteur paie pour contrôler la société (stratégie, cash, dividendes) et souvent une partie des <strong>synergies</strong> qu'il attend. Un multiple boursier reflète des transactions sur de petites participations minoritaires.</p>`,
    points: [[`Control premium`, ['controle', 'control premium', 'prime']], [`Synergies`, ['synergie']], [`Boursier = minoritaire`, ['minoritaire', 'bourse']]],
  }),
  q('108', 1, `Pourquoi comparer avec EV/EBITDA plutôt qu'avec le P/E ?`, {
    courte: `<p>L'EV/EBITDA est <strong>indépendant de la structure financière</strong> (avant intérêts), de la <strong>fiscalité</strong> et des politiques d'<strong>amortissement</strong> : deux sociétés identiques financées différemment ont le même EV/EBITDA mais des P/E différents.</p>`,
    complete: `<ul><li>Le P/E reste utile pour les banques et assurances (où la dette est une matière première) et en bourse.</li><li>Limite de l'EV/EBITDA : il ignore le capex et le NWC → compléter par EV/EBIT ou EV/(EBITDA − capex) pour les sociétés capitalistiques.</li></ul>`,
    points: [[`Indépendant de la dette`, ['dette', 'structure', 'interet']], [`Indépendant de l'impôt et des amortissements`, ['impot', 'amortissement', 'fiscal']], [`Limite : capex / NWC`, ['capex', 'nwc', 'limite']]],
  }),
  q('109', 1, `Un ajustement de 1 M€ d'EBITDA et un ajustement de 1 M€ de net debt : quel impact sur le prix ?`, {
    courte: `<p>1 M€ d'EBITDA vaut <strong>« multiple » M€</strong> d'EV (9 M€ à 9x) ; 1 M€ de net debt vaut <strong>1 M€</strong> de prix des titres (euro pour euro). C'est pourquoi la négociation se concentre d'abord sur l'adjusted EBITDA.</p>`,
    points: [[`EBITDA × multiple`, ['multiple', 'x', '9']], [`Net debt euro pour euro`, ['euro pour euro', '1 m', 'une fois']], [`Conséquence pour la négociation`, ['negoci', 'priorit']]],
  }),
  q('110', 1, `Qu'est-ce que la terminal value dans un DCF ?`, {
    courte: `<p>La valeur des flux <strong>au-delà de l'horizon explicite</strong> (5-10 ans). Deux méthodes : <strong>Gordon growth</strong> (FCF de l'année suivante / (WACC − g)) ou <strong>exit multiple</strong> (multiple × EBITDA de la dernière année). Elle pèse souvent <strong>60 à 80 %</strong> de la valeur.</p>`,
    points: [[`Valeur au-delà de l'horizon`, ['au-dela', 'horizon', 'infini']], [`Gordon growth ou exit multiple`, ['gordon', 'exit multiple', 'multiple']], [`60-80 % de la valeur`, ['60', '80', '%']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Quelle est la différence structurelle entre un DCF et une valorisation par multiples ?`, {
    courte: `<p>Le <strong>DCF</strong> donne une valeur <strong>intrinsèque</strong> fondée sur les flux futurs de la société (et ses hypothèses : business plan, WACC, croissance à l'infini). Les <strong>multiples</strong> donnent une valeur <strong>relative</strong>, observée sur le marché à un instant donné, qui intègre le sentiment des investisseurs.</p>`,
    complete: `<ul><li>DCF : sensible aux hypothèses (terminal value, WACC), utile pour tester un business plan.</li><li>Multiples : simples, ancrés dans le marché, mais dépendent des comparables et du cycle.</li><li>Les deux se complètent ; en LBO, le prix se discute surtout en multiples, et le fonds vérifie son IRR.</li></ul>`,
    conseil: `Question citée dans des retours d'entretiens TS. Donne l'avantage et la limite de chacune.`,
    points: [[`DCF = intrinsèque`, ['intrinseque', 'flux', 'futur']], [`Multiples = relative / marché`, ['relatif', 'relative', 'marche', 'observ']], [`Sensibilité aux hypothèses`, ['hypothese', 'wacc', 'terminal', 'sensib']], [`Complémentarité`, ['complement', 'deux']]],
  }),
  q('202', 2, `Pourquoi déduit-on les minority interests dans le bridge EV → Equity Value ?`, {
    courte: `<p>Parce que l'EV est calculée sur <strong>100 % de l'EBITDA consolidé</strong>, alors qu'une partie des filiales appartient à des <strong>tiers</strong> : la valeur de leur part ne revient pas aux actionnaires du groupe. On la déduit, idéalement à sa <strong>valeur</strong> (pas à sa valeur comptable).</p>`,
    exemple: `<p>Une filiale qui fait 3 M€ d'EBITDA est détenue à 80 %. À 9x, la part des minoritaires vaut environ 20 % × 27 = <strong>5,4 M€</strong> à déduire.</p>`,
    points: [[`EV sur 100 % de l'EBITDA consolidé`, ['100', 'consolid']], [`Part des tiers`, ['tiers', 'minoritaire']], [`À la valeur, pas comptable`, ['valeur', 'comptable']]],
  }),
  q('203', 2, `Comment choisis-tu des comparables ?`, {
    courte: `<p>Même <strong>activité</strong> et modèle économique, même <strong>géographie</strong> si possible, <strong>taille</strong>, <strong>croissance</strong> et <strong>marges</strong> proches, et des multiples calculés de façon <strong>homogène</strong> (LTM / NTM, IFRS 16, adjusted).</p>`,
    complete: `<ul><li>Transactions : récentes (le marché change), de taille comparable, en notant la nature de l'acheteur (industriel ou fonds).</li><li>Utiliser la médiane, exclure les cas aberrants (société en difficulté, OPA hostile).</li><li>Justifier une décote (taille, liquidité, croissance plus faible) ou une prime (leader, récurrence).</li></ul>`,
    points: [[`Activité et modèle`, ['activite', 'modele', 'secteur']], [`Taille / croissance / marges`, ['taille', 'croissance', 'marge']], [`Homogénéité des calculs`, ['homogen', 'ltm', 'ifrs', 'convention']], [`Médiane / décote ou prime`, ['mediane', 'decote', 'prime']]],
  }),
  q('204', 2, `Formule de Gordon growth : quels sont les pièges ?`, {
    courte: `<p>TV = FCF(n+1) / (WACC − g). Pièges : un <strong>g trop élevé</strong> (au-dessus de la croissance long terme de l'économie), un <strong>FCF terminal non normatif</strong> (capex < D&A, NWC qui ne croît pas avec g), et la <strong>sensibilité extrême</strong> quand g se rapproche du WACC.</p>`,
    exemple: `<p>FCF 10, WACC 8 % : g = 2 % → TV = 10 / 6 % = 167 ; g = 3 % → 200 (+20 %) ; g = 4 % → 250.</p>`,
    points: [[`TV = FCF / (WACC − g)`, ['wacc - g', 'wacc − g', 'formule']], [`g trop élevé`, ['g', 'croissance', 'eleve']], [`FCF terminal normatif`, ['normatif', 'capex', 'nwc']], [`Sensibilité extrême`, ['sensib']]],
  }),
  q('205', 2, `Qu'est-ce que le CAPM ?`, {
    courte: `<p>Le <strong>Capital Asset Pricing Model</strong> (MEDAF) estime le coût des fonds propres : <strong>Ke = taux sans risque + bêta × prime de risque du marché</strong> (+ éventuelles primes de taille ou spécifiques).</p>`,
    complete: `<ul><li>Bêta : sensibilité de la société au marché, estimée sur des comparables cotés puis « réendettée » selon la structure financière cible.</li><li>Pour une PME non cotée, on ajoute souvent une prime de taille / d'illiquidité.</li></ul>`,
    points: [[`Ke = rf + bêta × prime`, ['taux sans risque', 'beta', 'prime']], [`Bêta des comparables`, ['beta', 'compar', 'endett']], [`Primes de taille / spécifiques`, ['taille', 'illiquid', 'specifique']]],
  }),
  q('206', 2, `Comment IFRS 16 affecte-t-il la valorisation ?`, {
    courte: `<p>En théorie, pas du tout : l'économie ne change pas. En pratique, il faut être <strong>cohérent</strong> : EBITDA post-IFRS 16 (plus élevé) × multiple post-IFRS 16 (plus bas) − net debt incluant les lease liabilities = même Equity Value qu'en pre-IFRS 16. Les erreurs viennent du mélange des conventions.</p>`,
    points: [[`Économiquement neutre`, ['neutre', 'economie', 'pas du tout']], [`Cohérence EBITDA / multiple / net debt`, ['coheren', 'multiple', 'net debt']], [`Erreur = mélange des conventions`, ['melange', 'erreur', 'convention']]],
  }),
  calcul('207', 2, `Adjusted EBITDA 8 M€ ; multiple 9x ; net debt financière 22 M€ ; debt-like items (nets) 2 M€ ; NWC livré 1 M€ sous le peg. Equity Value ?`, [
    ['Equity Value', 47, 'M€', 0.05],
  ], `<p>EV = 8 × 9 = 72 ; − 22 de net debt ; − 2 de debt-like ; − 1 d'écart de NWC → <strong>47 M€</strong>.</p>
    <p><strong>À dire au recruteur</strong> : je récite le bridge dans l'ordre (EV → net debt → debt-like → NWC → minorities → actifs hors exploitation) et je précise que chaque ligne se négocie euro pour euro.</p>`),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Dans ton DCF, la terminal value représente 80 % de la valeur. Comment le présentes-tu et le défends-tu ?`, {
    courte: `<p>C'est fréquent mais cela signifie que la valeur dépend surtout d'hypothèses de long terme. Je le <strong>dis clairement</strong>, je montre des <strong>sensibilités</strong> (WACC, g), je vérifie le <strong>multiple implicite</strong> de la terminal value par rapport au marché et la <strong>normalité du FCF terminal</strong>, et je recoupe avec les multiples.</p>`,
    complete: `<ul><li>Multiple implicite : TV / EBITDA terminal — s'il est très au-dessus des multiples de marché, g ou le WACC sont trop optimistes.</li><li>FCF terminal : capex ≈ D&A (ou un peu plus en croissance), NWC qui croît avec g, marges soutenables.</li><li>Allonger l'horizon explicite si la société n'a pas encore atteint son régime de croisière.</li></ul>`,
    points: [[`Le dire et l'assumer`, ['dire', 'transparen', 'assum']], [`Sensibilités WACC / g`, ['sensib', 'wacc', 'g ']], [`Multiple implicite de la TV`, ['multiple implicite', 'implicite']], [`FCF terminal normatif / recoupement`, ['normatif', 'recoup', 'multiples']]],
  }),
  q('302', 3, `Pourquoi deux acheteurs peuvent-ils payer des prix très différents pour la même société ?`, {
    courte: `<p>Parce que la valeur dépend de <strong>qui achète</strong> : <strong>synergies</strong> (un industriel peut en capter beaucoup), <strong>coût et structure du financement</strong> (un fonds plus endetté ou avec une dette moins chère), <strong>rendement exigé</strong> (IRR cible), <strong>vision du business plan</strong> et des risques, <strong>stratégie</strong> (plateforme de buy-and-build, entrée sur un marché).</p>`,
    complete: `<ul><li>Un fonds qui voit des add-ons à faire paiera plus (multiple arbitrage).</li><li>Un acheteur qui a moins de doutes après sa DD (ou qui accepte plus de risques) paiera plus.</li><li>En enchères, le prix se fixe par le deuxième acheteur le plus motivé.</li></ul>`,
    points: [[`Synergies`, ['synergie']], [`Financement / IRR exigé`, ['financement', 'dette', 'irr', 'tri', 'rendement']], [`Vision du business plan / risques`, ['business plan', 'risque', 'vision']], [`Stratégie (buy-and-build…)`, ['strateg', 'build', 'plateforme']]],
  }),
  q('303', 3, `Comment valoriser une société qui n'est pas encore rentable ?`, {
    courte: `<p>Avec des multiples de <strong>revenue</strong> (EV/Sales) ou d'indicateurs d'activité (ARR en SaaS), un <strong>DCF</strong> sur un horizon long jusqu'à la rentabilité normative (avec scénarios), ou une <strong>valeur de sortie actualisée</strong> (méthode VC : valeur future à l'exit / (1 + rendement cible)^n).</p>`,
    complete: `<ul><li>Ajuster les multiples à la croissance et aux unit economics (marge brute, churn, CAC / LTV).</li><li>Tester le besoin de financement futur (dilution).</li><li>Ce n'est pas une cible de LBO classique : peu de cash pour rembourser une dette.</li></ul>`,
    points: [[`Multiples de revenue / ARR`, ['ev/sales', 'revenue', 'chiffre', 'arr']], [`DCF long / scénarios`, ['dcf', 'scenario', 'horizon']], [`Méthode VC (valeur d'exit actualisée)`, ['vc', 'exit', 'actualis']], [`Unit economics / dilution`, ['churn', 'cac', 'ltv', 'marge brute', 'dilution']]],
  }),
  q('304', 3, `Le WACC augmente d'un point (8 % → 9 %). Quel impact sur la valeur d'un DCF ?`, {
    courte: `<p>Une <strong>baisse significative</strong>, surtout via la terminal value. Avec une croissance à l'infini de 2 %, le dénominateur de Gordon passe de 6 % à 7 % : la terminal value baisse d'environ <strong>14 %</strong> (6/7), et la valeur totale d'environ 12-15 % selon le poids de la TV.</p>`,
    exemple: `<p>FCF terminal 10 : TV = 10 / 6 % = 167 → 10 / 7 % = 143 (−14 %).</p>`,
    complete: `<ul><li>C'est ce qui s'est passé pour les valorisations avec la hausse des taux de 2022-2023 : taux sans risque plus élevé → WACC plus élevé → multiples plus bas.</li></ul>`,
    points: [[`Baisse significative`, ['baisse']], [`Via la terminal value (WACC − g)`, ['terminal', 'gordon', 'wacc - g', 'denominateur']], [`Ordre de grandeur (~-14 %)`, ['14', '%']], [`Lien avec la hausse des taux`, ['taux', '2022', '2023']]],
  }),
]);
