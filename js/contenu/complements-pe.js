// Compléments de correction — PRIVATE EQUITY (fusionnés au chargement, sans écraser un champ déjà rempli)
export const COMPLEMENTS_PE = {
  'pe-metier-104': {
    complete: `<ul><li><strong>Années 1-3</strong> : le fonds appelle du capital, paie des management fees et des frais de deals ; les participations sont valorisées au coût (ou en dessous) → IRR négatif.</li>
      <li><strong>Années 4-10</strong> : création de valeur, revalorisations, puis exits et distributions → la courbe remonte et l'IRR devient positif.</li>
      <li>Leviers pour aplatir la J-curve : subscription lines (appels de capital retardés), secondaires, co-investissements, exits rapides.</li></ul>`,
    pieges: [`Croire qu'un IRR négatif en année 2 signifie un mauvais fonds.`],
    relances: [[`Pourquoi les LP l'acceptent-ils ?`, `Parce qu'ils raisonnent sur la vie entière du fonds et comparent les fonds d'un même vintage au même âge.`]],
  },
  'pe-metier-108': {
    complete: `<table class="tableau"><thead><tr><th></th><th>Venture capital</th><th>Growth equity</th><th>Buyout (LBO)</th></tr></thead><tbody>
      <tr><td>Cible</td><td>Start-up, souvent non rentable</td><td>Rentable, en forte croissance</td><td>Mature, génère du cash</td></tr>
      <tr><td>Participation</td><td>Minoritaire</td><td>Souvent minoritaire</td><td>Souvent majoritaire</td></tr>
      <tr><td>Dette</td><td>Aucune</td><td>Peu ou pas</td><td>Importante (3,5-5,5x l'EBITDA)</td></tr>
      <tr><td>Rendement</td><td>Quelques très gros succès, beaucoup d'échecs</td><td>Croissance du business</td><td>EBITDA growth + deleveraging + multiple</td></tr></tbody></table>`,
    relances: [[`Où se situe un OBO ?`, `C'est un LBO, souvent minoritaire ou à parité, où le dirigeant reste actionnaire de référence.`]],
  },
  'pe-metier-109': {
    complete: `<ul><li>Les bornes varient : certains parlent de small cap jusqu'à ~50-100 M€ d'EV, de mid-cap jusqu'à 500 M€ - 1 Md€, de large cap au-delà.</li>
      <li>On peut aussi raisonner en <strong>ticket d'equity</strong> : un fonds mid-cap investit souvent entre ~20 et ~150 M€ par deal.</li>
      <li>En France, le mid-cap est très actif : beaucoup de primary LBO de sociétés familiales et de build-ups.</li></ul>`,
    pieges: [`Donner des bornes comme s'il s'agissait d'une définition officielle.`],
    relances: [[`Quel est le ticket de notre fonds ?`, `À préparer pour chaque fonds : taille du dernier fonds, ticket moyen, nombre de participations.`]],
  },
  'pe-metier-110': {
    complete: `<ul><li><strong>Investisseurs institutionnels</strong> (assureurs, caisses de retraite) : cherchent un rendement supérieur au coté sur le long terme.</li>
      <li><strong>Fonds souverains, family offices</strong> : horizon long, souvent des co-investissements.</li>
      <li><strong>Fonds de fonds</strong> : diversification pour des investisseurs plus petits.</li>
      <li><strong>Bpifrance</strong> : LP majeur des fonds français small et mid-cap (rôle de soutien à l'écosystème).</li>
      <li><strong>Particuliers</strong> : via les fonds evergreen / ELTIF, en croissance.</li></ul>`,
    relances: [[`Que regardent les LP pour choisir un GP ?`, `La performance passée (IRR net, MOIC, DPI), la stabilité de l'équipe, la stratégie, l'alignement (GP commitment), les frais et la gouvernance.`]],
  },
  'pe-metier-111': {
    complete: `<ul><li><strong>Intermédié</strong> : la banque d'affaires du vendeur organise un auction process : concurrence, prix plus élevés.</li>
      <li><strong>Propriétaire</strong> : relation directe avec un dirigeant, souvent construite sur des années ; moins de concurrence.</li>
      <li><strong>Outils</strong> : cartographie sectorielle (cibles, actionnaires, maturité), suivi CRM, rencontres régulières des conseils.</li>
      <li>Les juniors construisent les listes de cibles, préparent les premières analyses et les rencontres.</li></ul>`,
    pieges: [`Croire que tous les deals viennent d'enchères.`],
    relances: [[`Comment approcherais-tu un dirigeant ?`, `Avec une thèse sur son secteur et sa société, en proposant un échange plutôt qu'une offre, et sur la durée.`]],
  },
  'pe-metier-112': {
    complete: `<ol><li><strong>Fundraising</strong> (12-18 mois) : premier et dernier closing du fonds.</li><li><strong>Période d'investissement</strong> (4-5 ans) : nouveaux deals, management fees sur les commitments.</li>
      <li><strong>Gestion</strong> : value creation, add-ons, refinancements.</li><li><strong>Exits</strong> et distributions aux LP (souvent à partir de l'année 4-5).</li>
      <li><strong>Liquidation</strong> (année ~10), avec prorogations possibles si des participations restent.</li></ol>`,
    relances: [[`Que se passe-t-il s'il reste des participations à la fin ?`, `Prorogation avec accord des LP, cession à un fonds secondaire ou continuation vehicle.`]],
  },
  'pe-metier-202': {
    complete: `<ul><li><strong>Européen</strong> : 1) les LP récupèrent tout le capital appelé, 2) le hurdle, 3) catch-up du GP, 4) 80/20. Le GP attend souvent plusieurs années avant de toucher du carry.</li>
      <li><strong>Américain</strong> : le calcul se fait deal par deal ; le GP touche du carry dès les premières exits réussies, même si d'autres deals perdront ensuite → <strong>clawback</strong> (restitution) si l'ensemble ne justifie pas le carry versé, souvent avec un escrow sur le carry.</li></ul>`,
    exemple: `<p>Deal A : +50 au bout de 3 ans ; deal B : −40 l'année suivante. En américain, le GP touche du carry sur A dès l'année 3 ; en européen, il attendrait que le capital de A et B (et le hurdle) soit rendu.</p>`,
    relances: [[`Lequel est le plus fréquent en Europe ?`, `Le waterfall européen (whole-of-fund), préféré par les LP.`]],
  },
  'pe-metier-203': {
    complete: `<ul><li><strong>Pour le LP</strong> : frais moyens plus bas (pas ou peu de fees / carry sur la poche co-investie), exposition ciblée aux deals qu'il préfère, meilleure connaissance du GP.</li>
      <li><strong>Pour le GP</strong> : faire un deal plus gros que ses limites de concentration, renforcer la relation avec ses LP (fundraising futur).</li>
      <li><strong>Contraintes</strong> : le LP doit pouvoir décider vite (quelques semaines), et la politique d'allocation des co-investissements doit être équitable.</li></ul>`,
    pieges: [`Oublier le risque de sélection adverse (le GP proposerait ses deals les moins bons en co-investissement).`],
  },
  'pe-metier-205': {
    complete: `<ul><li><strong>Mid-cap</strong> : 3-4 personnes par deal, l'analyste fait le modèle, coordonne les DD, rédige l'IC memo, rencontre le management ; suivi des participations au board.</li>
      <li><strong>Large cap</strong> : équipes plus grandes et spécialisées, process très compétitifs, financement syndiqué (TLB, high yield), plus de financial engineering.</li>
      <li><strong>Création de valeur</strong> : en mid-cap, beaucoup d'opérationnel (DAF, reporting, international, build-ups).</li></ul>`,
    relances: [[`Lequel te correspond et pourquoi ?`, `Réponse personnelle argumentée : par exemple, la proximité avec les dirigeants et la polyvalence du mid-cap.`]],
  },
  'pe-metier-207': {
    complete: `<ul><li><strong>IC préliminaire</strong> : intérêt pour le deal, premières hypothèses, budget de DD, prix indicatif (avant la Non-Binding Offer).</li>
      <li><strong>IC final</strong> : après les DD ; recommandation, prix, structure de dette, management package, rendements base / downside, risques et parades, points du SPA.</li>
      <li>Le comité challenge : hypothèses du business plan, prix, sortie, risques ; il peut dire non ou imposer des conditions.</li></ul>`,
    relances: [[`Que doit contenir la première page d'un IC memo ?`, `La recommandation, le prix et le multiple, l'equity investie, l'IRR / MOIC base et downside, et la thèse en 3 points.`]],
  },
  'pe-metier-208': {
    complete: `<ul><li>Écart dû aux <strong>management fees</strong> (payées même sur le capital non investi au début), aux <strong>frais du fonds</strong> (juridique, administration) et au <strong>carried interest</strong>.</li>
      <li>Le <strong>timing</strong> des appels et des distributions compte aussi : le capital non appelé n'est pas « au travail ».</li>
      <li>Les LP comparent les fonds sur le net IRR, le net MOIC (TVPI) et le DPI.</li></ul>`,
    exemple: `<p>Gross 25 % / 2,5x → net souvent ~17-19 % / ~2,1x pour les LP.</p>`,
  },
  'pe-metier-302': {
    complete: `<ul><li><strong>Fonctionnement</strong> : le prêteur s'appuie sur la valeur de plusieurs participations (diversification) ; le prêt est remboursé par les futures exits.</li>
      <li><strong>Usages</strong> : distribuer du cash aux LP (DPI), financer des add-ons ou soutenir une participation sans nouvelle levée.</li>
      <li><strong>Débat</strong> : levier supplémentaire « caché », coût élevé, risque si les valorisations baissent ; les LP veulent de la transparence et des limites.</li></ul>`,
    relances: [[`Différence avec un dividend recap ?`, `Le dividend recap endette une participation ; le NAV financing endette le fonds, garanti par l'ensemble du portefeuille.`]],
  },
  'pe-lbo-107': {
    complete: `<ul><li><strong>MBO</strong> : continuité (le management connaît la société) ; enjeu : le management devient acheteur et vendeur d'information.</li>
      <li><strong>MBI</strong> : nouvelle équipe, risque d'exécution plus élevé.</li>
      <li><strong>OBO</strong> : le dirigeant « sort » une partie de son patrimoine en gardant le contrôle ; attention à l'amendement Charasse.</li>
      <li><strong>SBO</strong> : process rodé, mais les leviers « faciles » ont souvent été utilisés par le premier fonds.</li></ul>`,
    relances: [[`Lequel est le plus risqué pour un fonds ?`, `Souvent le MBI : l'équipe ne connaît pas encore la société.`]],
  },
  'pe-lbo-108': {
    complete: `<ul><li><strong>Quand</strong> : la société s'est désendettée et le marché de la dette est ouvert ; les exits sont difficiles ; les LP attendent du DPI.</li>
      <li><strong>Effet</strong> : le fonds récupère une partie de sa mise (souvent 30-60 %) sans vendre ; le risque de la société augmente (plus de dette).</li>
      <li><strong>Vigilance</strong> : capacité de remboursement (downside case), covenants, image auprès des prêteurs et du management.</li></ul>`,
    exemple: `<p>Equity 100 ; dividende de 50 en année 3 ; exit 192,5 en année 5 (au lieu de 250 sans recap) → MOIC 2,43x au lieu de 2,5x, mais IRR ≈ 21,6 % au lieu de 20,1 %.</p>`,
  },
  'pe-lbo-110': {
    complete: `<ul><li><strong>Leviers typiques</strong> : recruter un DAF, mettre en place un reporting mensuel et des KPI, revoir le pricing, lancer des build-ups, internationaliser, digitaliser.</li>
      <li><strong>Risques</strong> : dépendance au fondateur, informations financières moins fiables (FDD plus lourde), transition de gouvernance.</li>
      <li><strong>Prix</strong> : souvent plus raisonnable qu'en SBO (moins de concurrence, vendeur non financier).</li></ul>`,
    relances: [[`Pourquoi un fondateur vend-il à un fonds plutôt qu'à un industriel ?`, `Pour garder son indépendance et son équipe, réinvestir et profiter d'une seconde plus-value, ou préparer sa succession progressivement.`]],
  },
  'pe-lbo-111': {
    complete: `<ul><li><strong>Prêteurs</strong> : ils veulent que l'equity absorbe les premières pertes ; plus de dette = plus de risque pour eux.</li>
      <li><strong>Capacité de remboursement</strong> : la dette doit être servie avec les cash flows, même dans un downside case.</li>
      <li><strong>Coût marginal</strong> : au-delà d'un certain levier, la dette coûte beaucoup plus cher (mezzanine, PIK), ce qui annule l'effet de levier.</li>
      <li><strong>Covenants</strong> : trop de dette = aucun headroom.</li></ul>`,
    exemple: `<p>EBITDA 20, cash flow avant service de la dette 10 : à 4x (80 de dette à 7 %), intérêts 5,6 → 4,4 pour rembourser ; à 7x (140 à 9 %), intérêts 12,6 → la société ne couvre même plus ses intérêts.</p>`,
  },
  'pe-lbo-203': {
    complete: `<ul><li>Objectif : éviter qu'un actionnaire qui contrôle déjà la société ne se la « revende » via une holding pour déduire des intérêts.</li>
      <li>Conditions : la cible est achetée (directement ou indirectement) à des personnes qui contrôlent la holding, et elle entre dans le groupe fiscal.</li>
      <li>Effet : réintégration d'une partie des charges financières pendant plusieurs exercices (en général jusqu'à 9 ans) → le levier fiscal est réduit.</li></ul>`,
    pieges: [`L'oublier dans la structuration d'un OBO.`],
    relances: [[`Comment l'éviter ?`, `En structurant pour que le vendeur ne contrôle pas la holding (fonds majoritaire) — à valider avec les avocats fiscalistes.`]],
  },
  'pe-lbo-206': {
    complete: `<ul><li>Effet de levier : Re = Ra + (Ra − i) × D/E. Si Ra baisse sous i (coût de la dette), plus de dette = rendement plus faible.</li>
      <li>Coût croissant : la dette supplémentaire est plus chère (mezzanine, PIK).</li>
      <li>Risque de faillite : covenants, impossibilité de refinancer, perte totale de l'equity.</li>
      <li>Moins de flexibilité : pas de cash pour investir ou faire des add-ons.</li></ul>`,
    exemple: `<p>EBITDA 20 → 16 (−20 %), exit 9x : avec 3x de dette (60), equity à l'exit 84 ; avec 6x (120), equity 24 : la perte de valeur est 3,5 fois plus forte en %.</p>`,
  },
  'pe-lbo-207': {
    complete: `<ul><li><strong>Prix</strong> : prime de 20-40 % sur le cours (control premium), à justifier par la value creation.</li>
      <li><strong>DD limitée</strong> : informations publiques, accès restreint, contraintes de marché (information privilégiée).</li>
      <li><strong>Financement certain</strong> : l'offre doit être financée (certain funds) dès son dépôt.</li>
      <li><strong>Seuils</strong> : en France, retrait obligatoire à 90 % du capital et des droits de vote ; en dessous, la société reste cotée avec des minoritaires (pas de tax consolidation possible à moins de 95 %).</li>
      <li><strong>Gouvernance</strong> : avis motivé du conseil, expert indépendant (attestation d'équité).</li></ul>`,
    relances: [[`Exemple récent ?`, `Le guide Chambers 2026 note un marché des IPO marginal en France, mais des take-private existent ; cite un cas de ta veille (OPA d'un fonds sur une société cotée).`]],
  },
  'pe-lbo-208': {
    complete: `<ul><li><strong>Dividendes</strong> : seulement sur les bénéfices distribuables (réserves) de l'OpCo.</li>
      <li><strong>Prêts intragroupe</strong> : encadrés (intérêt social, garanties limitées).</li>
      <li><strong>Tax consolidation</strong> : l'économie d'impôt liée aux intérêts de la HoldCo reste dans le groupe.</li>
      <li><strong>Solutions</strong> : loger une partie de la dette directement à l'OpCo (si possible) ou prévoir des mécanismes de remontée dès la structuration.</li></ul>`,
    pieges: [`Supposer que le cash de l'OpCo est automatiquement disponible pour la HoldCo.`],
  },
  'pe-lbo-304': {
    complete: `<ul><li><strong>Financement</strong> : capex / acquisition facilities déjà en place, pas besoin d'une nouvelle structure.</li>
      <li><strong>Prix</strong> : petites cibles moins chères → multiple arbitrage.</li>
      <li><strong>Contexte</strong> : exits difficiles et détention plus longue → les fonds créent de la valeur dans leurs participations existantes.</li>
      <li><strong>Limites</strong> : intégration (systèmes, équipes, culture), risque de surpayer en concurrence avec d'autres plateformes, levier qui monte, « roll-up » sans logique industrielle que l'acheteur final ne valorisera pas.</li></ul>`,
    relances: [[`Qu'est-ce qui rend un add-on « réussi » ?`, `Une intégration réelle (synergies réalisées), un prix discipliné, et un EBITDA combiné que l'acheteur final paie au multiple de l'ensemble.`]],
  },
  'pe-lbo-305': {
    complete: `<ul><li><strong>Risques</strong> : levier excessif, sous-investissement (capex, R&D, salaires), dépendance au refinancement, choc externe (taux, crise) mal absorbé.</li>
      <li><strong>Bénéfices</strong> : gouvernance plus exigeante, professionnalisation, croissance externe, alignement du management.</li>
      <li><strong>Conclusion</strong> : un LBO bien calibré (levier adapté au cash flow, plan de value creation opérationnel) crée de la valeur ; un LBO trop financiarisé peut en détruire.</li></ul>`,
    relances: [[`Comment un fonds limite-t-il ces risques ?`, `Levier prudent, downside case, investissements protégés dans le plan, dialogue avec les prêteurs.`]],
  },
  'pe-rendement-105': {
    complete: `<ul><li>Formule : années pour doubler ≈ 72 / taux (en %). Approximation de ln(2) / ln(1 + r).</li>
      <li>Usages en entretien : contrôler un IRR (2x en 5 ans → 72/5 ≈ 14 % ; exact 14,9 %), estimer un multiple (à 18 %, doublement en 4 ans → ~4x en 8 ans).</li>
      <li>Plus précise entre 6 % et 20 % ; au-delà, elle sous-estime légèrement le taux.</li></ul>`,
    pieges: [`L'utiliser pour des multiples autres que 2x sans adapter (pour 3x, on utilise plutôt 110 / taux).`],
  },
  'pe-rendement-203': {
    complete: `<ul><li><strong>Valeur absolue</strong> : sur 100 investis, A rend 130 après 1 an ; B rend 250 après 5 ans.</li>
      <li><strong>Réinvestissement</strong> : pour égaler B, il faudrait réinvestir 4 fois de suite à 30 % — rarement possible (deal flow, frais, temps).</li>
      <li><strong>Pour un GP</strong> : le carry dépend du profit en valeur → B rapporte bien plus.</li>
      <li><strong>Pour un LP</strong> : A améliore le DPI, B le multiple ; le choix dépend de son besoin de liquidité.</li></ul>`,
    relances: [[`Quel indicateur les combine ?`, `Aucun parfaitement ; on regarde l'IRR, le MOIC et le DPI ensemble, et parfois le Public Market Equivalent (comparaison au marché coté).`]],
  },
  'pe-rendement-205': {
    complete: `<ul><li>À multiple fixe, chaque année supplémentaire dilue l'IRR : (MOIC)^(1/n) − 1.</li>
      <li>Conséquence : les fonds veulent créer de la valeur vite et préparer l'exit tôt ; une détention longue doit être compensée par un multiple plus élevé.</li>
      <li>Les continuation vehicles et dividend recaps sont des réponses à cet effet temps.</li></ul>`,
    exemple: `<p>Pour garder 20 % d'IRR : 2,5x en 5 ans, mais 3,6x en 7 ans.</p>`,
  },
  'pe-rendement-206': {
    complete: `<ul><li>Management fees : ~1,5-2 % par an, sur les commitments au début (même non investis).</li>
      <li>Carried interest : 20 % du profit au-delà du hurdle, avec catch-up.</li>
      <li>Frais du fonds : juridique, administration, audit.</li>
      <li>Effet de timing : le capital est appelé progressivement, les distributions arrivent tard.</li></ul>`,
    exemple: `<p>Deals à 25 % brut / 2,5x → environ 18 % net / 2,1x pour les LP (ordre de grandeur).</p>`,
  },
  'pe-dette-102': {
    complete: `<ul><li><strong>Structure</strong> : une tranche bullet (souvent 6-7 ans), parfois avec une RCF bancaire à côté (super senior).</li>
      <li><strong>Prix</strong> : Euribor + une marge plus élevée qu'une senior bancaire, des frais d'arrangement (OID), parfois une option PIK.</li>
      <li><strong>Avantages</strong> : certitude et rapidité (un club de quelques fonds), flexibilité (covenants plus souples, delayed draw pour les add-ons), relation directe.</li>
      <li><strong>Inconvénients</strong> : coût, pénalités de remboursement anticipé, prêteurs parfois plus exigeants en cas de difficulté.</li></ul>`,
    relances: [[`Pourquoi s'est-elle imposée en mid-cap ?`, `Parce qu'elle permet de signer vite dans des process compétitifs et que les banques ont réduit leurs prises de risque.`]],
  },
  'pe-dette-106': {
    complete: `<ul><li>Calculé sur l'<strong>excess cash flow</strong> annuel (cash après service de la dette, capex et impôt), avec un pourcentage qui baisse quand le levier diminue (ex. 75 % au-dessus de 4x, 50 % entre 3 et 4x, 0 % en dessous).</li>
      <li>Réduit le risque des prêteurs et augmente l'equity à l'exit, mais limite le cash disponible pour les add-ons ou les dividendes.</li></ul>`,
    exemple: `<p>Excess cash flow 10, sweep 50 % → 5 de remboursement anticipé, 5 conservés par la société.</p>`,
  },
  'pe-dette-107': {
    complete: `<ul><li><strong>Senior</strong> : 1er rang, sûretés (nantissement des titres, comptes), covenants, coût le plus faible.</li>
      <li><strong>Mezzanine</strong> : 2e rang, souvent bullet, coupon cash + PIK (rendement total élevé), parfois des BSA (« equity kicker »).</li>
      <li><strong>Usage</strong> : la mezzanine complète la senior quand on veut plus de levier sans plus d'equity ; elle recule face à l'unitranche.</li></ul>`,
    relances: [[`Pourquoi le prêteur mezzanine accepte-t-il d'être subordonné ?`, `Contre une rémunération plus élevée et parfois une part de l'upside (BSA).`]],
  },
  'pe-dette-108': {
    complete: `<ul><li>Montant typique : 10-20 % de la dette senior ; utilisé pour le NWC saisonnier, les besoins ponctuels, les garanties bancaires.</li>
      <li>Souvent soumis à un <strong>springing covenant</strong> (testé seulement si la ligne est tirée au-delà d'un seuil).</li>
      <li>Coûte une commission de non-utilisation sur la partie non tirée.</li></ul>`,
    pieges: [`Financer des investissements de long terme avec le RCF.`],
  },
  'pe-dette-109': {
    complete: `<ul><li>Logique : chacun est rémunéré selon son rang ; les derniers servis (equity) captent l'upside mais perdent tout en premier.</li>
      <li>Dans une restructuration, les prêteurs seniors peuvent prendre le contrôle de la société (conversion de dette en capital) si la valeur ne couvre plus leur créance.</li></ul>`,
    exemple: `<p>Société vendue 100 ; senior 70, mezzanine 25, equity 50 investis → senior remboursée 70, mezzanine 25, equity reçoit 5 (perte de 90 %).</p>`,
  },
  'pe-dette-110': {
    complete: `<ul><li><strong>Amortissable</strong> : moins chère et rassurante pour les prêteurs (le risque baisse vite) mais consomme du cash chaque année.</li>
      <li><strong>Bullet</strong> : laisse le cash pour la croissance et les add-ons, mais concentre le risque à l'échéance (refinancement).</li>
      <li>En mid-cap, l'unitranche bullet est fréquente ; une senior bancaire combine souvent TLA (amortissable) et TLB (bullet).</li></ul>`,
  },
  'pe-dette-204': {
    complete: `<ul><li>Mécanique : l'apport (equity ou shareholder loan subordonné) est ajouté à l'EBITDA (« EBITDA cure ») ou déduit de la dette (« debt cure ») pour le calcul du covenant.</li>
      <li>Limites : souvent 2 à 4 cures sur la vie du prêt, pas deux trimestres consécutifs, parfois un montant plafonné.</li>
      <li>Décision du fonds : réinjecter (s'il croit à la valeur de l'equity) ou négocier un waiver / reset.</li></ul>`,
    exemple: `<p>Net debt 110, EBITDA 20 (5,5x), covenant 5x : il faut une baisse de dette de 10 (100 / 20 = 5x) → equity cure de 10 si le contrat compte l'apport en réduction de dette.</p>`,
  },
  'pe-dette-208': {
    complete: `<ul><li>Montant défini à la signature, tirable pendant une période (ex. 2-3 ans), souvent conditionné à des critères (levier pro forma, nature de la cible).</li>
      <li>Coût : commission d'engagement sur la partie non tirée, marge identique ou proche de la dette principale.</li>
      <li>Avantage : rapidité d'exécution des add-ons, pas de nouvelle négociation avec les prêteurs.</li></ul>`,
  },
  'pe-dette-302': {
    complete: `<ul><li><strong>Amend & extend</strong> : plus simple et rapide, utile quand le marché est fermé ou la société fragile ; contrepartie : marge plus élevée, frais, parfois remboursement partiel.</li>
      <li><strong>Refinancement</strong> : nouvelle documentation, nouveaux prêteurs ; permet de lever plus (add-ons, dividend recap), d'améliorer les conditions si le marché est favorable.</li>
      <li>Enjeu commun : éviter le « mur de maturités » (beaucoup de dettes qui arrivent à échéance en même temps).</li></ul>`,
  },
  'pe-dette-304': {
    complete: `<ul><li>Positionnement : au-dessus des prêteurs seniors (dans une HoldCo supérieure), sans garantie de l'OpCo → structurellement subordonné.</li>
      <li>Coût : 10-13 % capitalisés, la dette grossit vite (×1,6-1,8 en 5 ans).</li>
      <li>Remboursement : à l'exit ou au refinancement ; rien n'est payé avant.</li>
      <li>Risque : en cas de baisse de valeur, le PIK est remboursé après tous les autres et peut être perdu ; il réduit aussi la part de l'equity à l'exit.</li></ul>`,
    exemple: `<p>50 M€ de PIK à 12 % pendant 5 ans → 50 × 1,12^5 ≈ 88 M€ à rembourser à l'exit.</p>`,
  },
  'pe-valo-101': {
    complete: `<ol><li><strong>Multiples</strong> : transaction comparables (control premium incluse) et trading comparables, appliqués à l'adjusted EBITDA LTM issu de la FDD.</li>
      <li><strong>Valorisation LBO</strong> : à partir du business plan, de la dette levable et de l'IRR / MOIC cible, on calcule le prix maximum.</li>
      <li><strong>DCF</strong> : en recoupement, surtout pour les sociétés en forte croissance.</li>
      <li><strong>Négociation</strong> : la fourchette se confronte au prix demandé et aux autres offres.</li></ol>`,
    relances: [[`Quelle méthode prime en pratique ?`, `La valorisation LBO : un fonds ne peut pas payer plus que ce que son IRR cible et la dette disponible permettent.`]],
  },
  'pe-valo-104': {
    complete: `<ul><li>Le multiple d'entrée reflète le marché du moment ; à l'exit (4-6 ans plus tard), il peut être plus bas (taux plus hauts, secteur moins à la mode).</li>
      <li>Hypothèse prudente : exit multiple = entry multiple, voire −0,5x / −1x ; on montre la multiple expansion en upside seulement.</li>
      <li>Exception argumentée : une société beaucoup plus grande, plus récurrente ou plus internationale à l'exit peut justifier un multiple plus élevé.</li></ul>`,
    relances: [[`Le fonds compte sur 2x de multiple expansion : ta réaction ?`, `Je recalcule l'IRR à multiple constant ; si le dossier ne tient plus, il dépend d'un pari de marché.`]],
  },
  'pe-valo-105': {
    complete: `<ul><li>EV/Sales ignore les marges : à utiliser avec des sociétés comparables en termes de profil de marge future.</li>
      <li>En SaaS : EV/ARR, ajusté de la croissance et de la rétention (NRR) ; la « rule of 40 » (croissance + marge) aide à comparer.</li>
      <li>Pour un LBO classique, EV/EBITDA reste la référence : sans EBITDA, pas de dette.</li></ul>`,
  },
  'pe-valo-106': {
    complete: `<ul><li><strong>Earn-out</strong> : si l'écart vient du business plan ; adapté quand le dirigeant reste.</li>
      <li><strong>Rollover</strong> : le vendeur réinvestit 10-30 % et profite de l'upside futur : il « paie » une partie de l'écart lui-même.</li>
      <li><strong>Vendor loan</strong> : paiement différé, subordonné ; améliore l'IRR de l'acheteur et montre la confiance du vendeur.</li>
      <li><strong>Actions de préférence</strong> : rendement prioritaire pour l'acheteur, upside partagé.</li>
      <li>D'abord, diagnostiquer la source de l'écart (EBITDA, multiple, croissance, dette).</li></ul>`,
  },
  'pe-valo-204': {
    complete: `<ul><li><strong>Synergies</strong> : un concurrent peut supprimer des coûts en double (sièges, achats, réseaux) ou vendre plus (cross-selling).</li>
      <li><strong>Coût du capital</strong> : un grand groupe finance une acquisition avec un coût moyen inférieur au rendement exigé par un fonds (20-25 %).</li>
      <li><strong>Horizon</strong> : pas d'exit à prévoir.</li>
      <li>Mais : un industriel peut être plus lent (gouvernance, autorités de concurrence) et plus sélectif.</li></ul>`,
  },
  'pe-valo-206': {
    complete: `<ul><li>Point de départ : l'entry multiple ; ajustements : taille et profil à l'exit, cycle sectoriel, niveau des taux.</li>
      <li>Recoupement : multiples de transactions comparables historiques (moyenne de cycle, pas le pic).</li>
      <li>Toujours une <strong>sensitivity</strong> IRR / exit multiple (ex. −2x, −1x, 0, +1x).</li></ul>`,
  },
  'pe-valo-303': {
    complete: `<ul><li>Principe : on paie la platform sur son EBITDA actuel ; l'upside des add-ons rémunère le capital et le risque d'exécution du fonds.</li>
      <li>Exception : si le pipeline est signé ou très avancé et que le management a déjà intégré des acquisitions, payer une partie de cet upside peut être nécessaire pour gagner.</li>
      <li>Vérifier : disponibilité des cibles, multiples payés, capacité d'intégration, financement (acquisition facility).</li></ul>`,
  },
  'pe-these-102': {
    complete: `<ul><li>Test : la société peut-elle augmenter ses prix sans perdre de clients ? ses marges sont-elles durablement supérieures à celles des concurrents ?</li>
      <li>Exemples : logiciel métier (coûts de changement), laboratoire accrédité (barrière réglementaire), réseau d'agences dense (coûts logistiques), marque forte, base installée.</li>
      <li>Un moat justifie un multiple plus élevé et plus de levier (cash flows prévisibles).</li></ul>`,
    relances: [[`Donne un exemple de moat qui s'érode.`, `Une marque face à un nouvel entrant digital moins cher, ou une barrière réglementaire qui disparaît.`]],
  },
  'pe-these-103': {
    complete: `<ul><li><strong>Rivalité</strong> : nombre de concurrents, croissance du marché, différenciation.</li><li><strong>Nouveaux entrants</strong> : barrières (capital, réglementation, marque).</li>
      <li><strong>Substituts</strong> : autres solutions au même besoin.</li><li><strong>Clients</strong> : concentration, coûts de changement, sensibilité au prix.</li>
      <li><strong>Fournisseurs</strong> : concentration, importance pour la cible.</li></ul>
      <p>En cas : 1 phrase par force, puis une conclusion sur l'attractivité et le pricing power.</p>`,
  },
  'pe-these-104': {
    complete: `<ul><li>Méthodes : interviews de clients (satisfaction, part de portefeuille, intentions), de concurrents et d'experts, enquêtes, données de marché.</li>
      <li>Livrable : taille et croissance du marché, parts de marché, avantages compétitifs, validation (ou correction) des hypothèses du business plan, risques.</li>
      <li>Utilisation : construire le sponsor case et convaincre les prêteurs.</li></ul>`,
  },
  'pe-these-105': {
    complete: `<ul><li><strong>Gouvernance</strong> : composition du board, calendrier, reporting mensuel et KPI.</li><li><strong>Finance</strong> : trésorerie, covenants, recrutement d'un DAF si nécessaire.</li>
      <li><strong>Quick wins</strong> : achats, pricing, réduction de coûts évidents.</li><li><strong>Chantiers de la thèse</strong> : lancement des add-ons, international, digital.</li>
      <li><strong>Humain</strong> : communication interne, management package, alignement de l'équipe.</li></ul>`,
  },
  'pe-these-106': {
    complete: `<ul><li><strong>Base case</strong> : le sponsor case (business plan du management ajusté de façon prudente).</li>
      <li><strong>Downside</strong> : croissance plus faible, marges sous pression, perte d'un gros client : vérifier les covenants (headroom), le DSCR et l'IRR (capital préservé ?).</li>
      <li><strong>Upside</strong> : add-ons, meilleure croissance, multiple expansion.</li></ul>`,
    exemple: `<p>Base : IRR 22 % ; downside (EBITDA −15 %, exit −1x) : IRR 8 %, covenants tenus ; upside : IRR 30 %.</p>`,
  },
  'pe-these-107': {
    complete: `<ul><li>Identifier : qui détient les relations clients, le savoir-faire technique, les décisions ? existe-t-il un n°2 ?</li>
      <li>Traiter : rollover et management package avec vesting, recrutement d'un DG délégué / DAF, documentation des process, contrats clients au nom de la société, non-concurrence.</li>
      <li>Intégrer au prix : si le risque reste fort, prix plus bas ou earn-out.</li></ul>`,
  },
  'pe-these-108': {
    complete: `<ul><li><strong>Commerciaux</strong> : concentration clients, perte de parts de marché, pricing sous pression.</li><li><strong>Financiers</strong> : EBITDA de mauvaise qualité, cash conversion faible, NWC qui dérive, capex en retard.</li>
      <li><strong>Humains</strong> : key man, turnover, climat social.</li><li><strong>Externes</strong> : cyclicité, réglementation, dépendance à un fournisseur, risques ESG.</li></ul>
      <p>Chaque red flag doit être chiffré et associé à une parade (prix, structure, garanties, plan d'action).</p>`,
  },
  'pe-these-109': {
    complete: `<ul><li><strong>Format</strong> : 2 à 4 heures, le CEO, le DAF et parfois les directeurs opérationnels présentent un deck ; questions-réponses, parfois une visite de site.</li>
      <li><strong>Ce que tu observes</strong> : la vision (où sera la société dans 5 ans ?), la maîtrise des chiffres (le CEO connaît-il ses marges par produit ?), la cohésion de l'équipe (qui répond à quoi ?), la dépendance à une personne.</li>
      <li><strong>Ce que tu vérifies</strong> : la crédibilité du business plan (d'où vient la croissance ?), les risques que le management reconnaît (ou pas).</li>
      <li><strong>Après</strong> : liste de questions de suivi pour la data room, mise à jour du modèle et de l'avis sur l'équipe.</li></ul>`,
    pieges: [`Penser que c'est une simple présentation commerciale : c'est aussi le management qui choisit son futur actionnaire.`],
    relances: [[`Que fais-tu si le CEO ne maîtrise pas ses chiffres ?`, `C'est un signal : je regarde le rôle du DAF et la qualité du reporting, et j'en tiens compte dans le risque d'exécution (et dans le plan des 100 jours).`]],
  },
  'pe-these-110': {
    complete: `<ul><li><strong>Formule</strong> : cash conversion = (EBITDA − capex − variation du NWC) / EBITDA.</li>
      <li><strong>Pourquoi c'est central</strong> : la dette est servie avec du cash après impôt et intérêts ; une faible conversion limite le levier possible, ralentit le deleveraging et augmente le risque de covenant breach.</li>
      <li><strong>Ce qu'on vérifie</strong> : capex de maintenance réels (pas seulement le budget), saisonnalité du NWC, conversion historique sur 3-5 ans.</li></ul>`,
    exemple: `<p>Deux sociétés, EBITDA 20, EV 180 (9x), dette 80, intérêts 5,6 et impôt 3 par an (simplifié). A convertit 85 % (17) → 8,4 de remboursement par an, 42 en 5 ans ; B convertit 50 % (10) → 1,4 par an, 7 en 5 ans. Exit à 180 : equity de A = 180 − 38 = 142 ; de B = 180 − 73 = 107. Même EBITDA, 35 d'écart d'equity.</p>`,
    relances: [[`Qu'est-ce qui dégrade la cash conversion sans toucher l'EBITDA ?`, `Des capex en hausse, des délais clients qui s'allongent, des stocks qui gonflent, des fournisseurs payés plus vite.`]],
  },
  'pe-these-201': {
    complete: `<ul><li><strong>Croissance</strong> : « Quelle part de la croissance vient des prix, des volumes, des nouveaux clients ? Quelle visibilité avez-vous (backlog, contrats récurrents) ? »</li>
      <li><strong>Concurrence</strong> : « Contre qui perdez-vous des appels d'offres, et pourquoi ? Avez-vous augmenté vos prix ces 2 dernières années ? »</li>
      <li><strong>Clients</strong> : « Quel est votre churn ? Que se passe-t-il si votre premier client part ? »</li>
      <li><strong>Organisation</strong> : « Qui vous remplace si vous êtes absent 6 mois ? Quels recrutements clés prévoyez-vous ? »</li>
      <li><strong>Plan</strong> : « Qu'est-ce qui pourrait vous empêcher d'atteindre le business plan ? » et « Quelles acquisitions avez-vous identifiées ? »</li></ul>`,
    pieges: [`Poser des questions dont la réponse est dans l'information memorandum.`, `Un ton d'audit agressif : le management choisit aussi son actionnaire.`],
    relances: [[`Si tu n'avais qu'une question ?`, `« Qu'est-ce qui pourrait vous empêcher d'atteindre votre business plan ? » : elle révèle les risques et la lucidité du dirigeant.`]],
  },
  'pe-these-205': {
    complete: `<ul><li><strong>Risques</strong> : environnement (pollution des sites, énergie, émissions de CO₂), social (santé-sécurité, turnover, climat social), gouvernance (conformité, anticorruption, cybersécurité), chaîne d'approvisionnement.</li>
      <li><strong>Réglementation</strong> : CSRD (périmètre réduit par le paquet « Omnibus » de l'UE : à vérifier selon la taille de la cible), taxonomie, exigences SFDR du fonds lui-même (fonds article 8 ou 9).</li>
      <li><strong>Création de valeur</strong> : feuille de route ESG (KPI suivis au board), efficacité énergétique (économies réelles), sustainability-linked loans (marge réduite si les KPI ESG sont atteints).</li>
      <li><strong>Exit</strong> : une société avec une bonne maturité ESG intéresse plus d'acheteurs.</li></ul>`,
    pieges: [`Présenter l'ESG uniquement comme de la conformité, sans impact sur la valeur.`],
    relances: [[`Un exemple de risque ESG qui change le prix ?`, `Un site industriel pollué : coût de dépollution traité en debt-like ou couvert par une garantie spécifique dans le SPA.`]],
  },
  'pe-these-206': {
    complete: `<ul><li><strong>Réseau</strong> : nombre de points de vente, revenue like-for-like, ouvertures, fermetures, pipeline signé.</li>
      <li><strong>Franchisés</strong> : rentabilité d'un point de vente (unit economics), délai de retour sur investissement d'une ouverture : s'il s'allonge, les ouvertures ralentissent.</li>
      <li><strong>Franchiseur</strong> : redevances (en % du chiffre d'affaires des franchisés), droits d'entrée, durée et renouvellement des contrats.</li>
      <li><strong>Modèle</strong> : asset-light et forte cash conversion pour le franchiseur, mais dépendance à la santé des franchisés.</li></ul>`,
    exemple: `<p>Une ouverture coûte 300 k€ au franchisé et dégage 75 k€ d'EBITDA par an → retour en 4 ans. Si la rentabilité tombe à 43 k€, il faut 7 ans : les candidats à la franchise se raréfient.</p>`,
    relances: [[`Pourquoi regarder les fermetures autant que les ouvertures ?`, `Parce qu'un réseau peut afficher une croissance du nombre de points de vente tout en cachant des franchisés en difficulté.`]],
  },
  'pe-these-207': {
    complete: `<ul><li><strong>Historique</strong> : budgets passés comparés au réalisé, crises traversées, acquisitions déjà intégrées.</li>
      <li><strong>Sources</strong> : management presentation, sessions de questions-réponses, visites de site, reference checks (anciens collègues, clients), parfois un management assessment par un cabinet spécialisé.</li>
      <li><strong>Complétude</strong> : y a-t-il un vrai DAF, un directeur commercial, un n°2 ?</li>
      <li><strong>Alignement</strong> : le management est-il prêt à réinvestir une part significative ?</li></ul>`,
    pieges: [`Juger sur le charisme du CEO plutôt que sur ses résultats.`],
    relances: [[`Que fais-tu si l'équipe est incomplète ?`, `Je l'intègre au plan : recrutements dans les 100 jours, budget associé, et je le prends en compte dans le risque d'exécution.`]],
  },
  'pe-these-301': {
    complete: `<ul><li><strong>30 s</strong> — Recommandation et chiffres clés : prix, multiple, equity investie, IRR / MOIC base et downside.</li>
      <li><strong>20 s</strong> — La société : activité, taille, position.</li><li><strong>40 s</strong> — La thèse en 3 points.</li>
      <li><strong>30 s</strong> — Value creation : EBITDA bridge, add-ons.</li><li><strong>20 s</strong> — Structure : dette (x EBITDA), management package.</li>
      <li><strong>30 s</strong> — Risques principaux et parades ; <strong>10 s</strong> — prochaines étapes.</li></ul>`,
    exemple: `<p>« Nous recommandons d'investir 110 M€ d'equity pour acquérir 100 % de X à 9,5x l'EBITDA LTM de 21 M€ (EV ≈ 200 M€), financé par 4,5x de dette ; IRR de 23 % / 2,8x en base case, 1,4x en downside. »</p>`,
    pieges: [`Commencer par l'historique de la société au lieu de la recommandation.`],
  },
  'pe-these-303': {
    complete: `<ul><li><strong>Choix</strong> : pourquoi ce fournisseur, quelles alternatives considérées.</li><li><strong>Satisfaction</strong> : qualité, prix, service, note sur 10 et comparaison avec les concurrents.</li>
      <li><strong>Part de portefeuille</strong> : quelle part de vos achats, évolution prévue sur 2-3 ans.</li><li><strong>Prix</strong> : accepteriez-vous une hausse de 5 % ? que se passerait-il ?</li>
      <li><strong>Changement</strong> : coût et durée d'un changement de fournisseur.</li></ul>`,
    pieges: [`Des questions orientées (« vous êtes satisfait, n'est-ce pas ? »).`, `Révéler qu'une vente est en cours : les calls passent par un cabinet de CDD, de façon confidentielle.`],
    relances: [[`Combien de calls faut-il ?`, `Assez pour voir des tendances, souvent une dizaine à quelques dizaines selon la concentration de la clientèle ; on cherche des répétitions, pas des anecdotes.`]],
  },
  'pe-these-304': {
    complete: `<ul><li><strong>Valorisation</strong> : sur un EBITDA mid-cycle (moyenne de cycle), pas sur un EBITDA LTM de haut de cycle.</li>
      <li><strong>Dette</strong> : levier plus bas, covenants avec plus de headroom, RCF pour absorber les creux de NWC.</li>
      <li><strong>Scénarios</strong> : un downside case qui reproduit un vrai creux de cycle.</li>
      <li><strong>Timing</strong> : entrer en bas de cycle et sortir en haut est idéal mais difficile à prévoir.</li></ul>`,
    exemple: `<p>EBITDA historique 18, 22, 25 (LTM), creux à 15, moyenne ~20. À 8x : 200 sur le LTM contre 160 sur le mid-cycle. Une dette de 4x le LTM (100) vaut 5x le mid-cycle et 6,7x au creux.</p>`,
    relances: [[`Comment sais-tu où tu es dans le cycle ?`, `Par l'historique long de la société et du secteur (10 ans), les carnets de commandes et les indicateurs avancés du secteur.`]],
  },
  'pe-these-305': {
    complete: `<ul><li><strong>Quantifier</strong> : downside si le dirigeant part (EBITDA, clients perdus, exit multiple) → IRR, covenants.</li>
      <li><strong>Réduire le risque</strong> : rollover significatif, management package avec vesting et clauses de leaver, n°2 / DAF recruté dans les 100 jours, clauses de non-concurrence, key man insurance (décès ou invalidité seulement).</li>
      <li><strong>Ajuster le prix ou la structure</strong> : earn-out, vendor loan, prix plus bas.</li>
      <li><strong>Décider</strong> : investir si le risque est maîtrisé et payé ; sinon, ne pas y aller malgré les 25 %.</li></ul>`,
    pieges: [`Se laisser convaincre par l'IRR du base case seul.`],
    relances: [[`Que couvre une key man insurance ?`, `Elle verse un capital à la société en cas de décès ou d'invalidité d'une personne clé ; elle ne couvre pas une démission.`]],
  },
  'pe-mgmt-103': {
    complete: `<ul><li><strong>Mécanique</strong> : souvent des bons de souscription (BSA ratchet) ou des actions de préférence qui donnent plus de titres aux managers si les seuils sont atteints à l'exit.</li>
      <li><strong>Pour le fonds</strong> : il ne « paie » que s'il a déjà atteint son objectif.</li>
      <li><strong>Seuils</strong> : souvent IRR ET MOIC (une exit rapide peut donner un IRR élevé avec un petit multiple).</li>
      <li><strong>Reverse ratchet</strong> : la part des managers baisse si la performance est faible.</li></ul>`,
    exemple: `<p>Plus-value totale de 150 avec un MOIC du fonds de 2,6x ; ratchet de 5 % de la plus-value au-delà de 2,5x → 7,5 de plus pour les managers, pris sur la part du fonds.</p>`,
    relances: [[`Pourquoi conditionner le ratchet à l'IRR ET au MOIC ?`, `Pour éviter qu'une exit très rapide (IRR élevé, petit multiple) ou très lente (multiple élevé, IRR faible) déclenche le ratchet.`]],
  },
  'pe-mgmt-104': {
    complete: `<ul><li><strong>Mécanisme</strong> : le manager signe des promesses de vente de ses titres au profit du fonds (ou de la HoldCo), activées en cas de départ.</li>
      <li><strong>Good leaver</strong> : prix = valeur de marché (parfois seulement pour la part « acquise » par vesting).</li>
      <li><strong>Bad leaver</strong> : prix = le plus faible du coût d'acquisition et de la valeur de marché.</li>
      <li><strong>Pourquoi</strong> : protéger l'alignement (on ne garde pas l'upside si on part tôt ou en faute) et récupérer des titres pour le successeur.</li></ul>`,
    exemple: `<p>Manager entré pour 100 k€, titres valant 300 k€ à son départ : good leaver → 300 k€ ; bad leaver → 100 k€.</p>`,
    pieges: [`Oublier que les définitions précises (démission, licenciement, faute) font l'objet de longues négociations.`],
  },
  'pe-mgmt-105': {
    complete: `<ul><li><strong>Drag-along</strong> (sortie forcée) : protège le majoritaire ; un acheteur veut presque toujours 100 % du capital.</li>
      <li><strong>Tag-along</strong> (sortie conjointe) : protège les minoritaires ; total (100 % en cas de changement de contrôle) ou proportionnel (cession partielle).</li>
      <li>Les deux se trouvent dans le shareholders' agreement d'un LBO, avec des seuils et des conditions de prix.</li></ul>`,
    exemple: `<p>Le fonds (70 %) reçoit une offre pour 100 % : grâce au drag-along, il oblige les managers (30 %) à vendre au même prix par action. S'il vendait seulement ses 70 %, le tag-along permettrait aux managers de vendre aussi.</p>`,
    relances: [[`Pourquoi les managers tiennent-ils au tag-along ?`, `Pour ne pas rester minoritaires face à un nouvel actionnaire qu'ils n'ont pas choisi.`]],
  },
  'pe-mgmt-106': {
    complete: `<ul><li><strong>Gouvernance</strong> : board, droits de veto (budget, acquisitions, dette, dirigeants), information et reporting.</li>
      <li><strong>Transferts</strong> : inaliénabilité (lock-up), préemption, agrément, drag-along, tag-along.</li>
      <li><strong>Managers</strong> : good / bad leaver, vesting, non-concurrence, exclusivité.</li>
      <li><strong>Sortie</strong> : clause de liquidité (le fonds peut organiser l'exit après X années), ratchet, répartition du prix.</li>
      <li><strong>Financier</strong> : anti-dilution, droits préférentiels, politique de dividendes.</li></ul>`,
    relances: [[`Quelle différence entre les statuts et le pacte ?`, `Les statuts sont publics et opposables à tous ; le pacte est confidentiel et ne lie que ses signataires (sa violation se règle surtout par des dommages et intérêts).`]],
  },
  'pe-mgmt-202': {
    complete: `<ul><li><strong>Ordinary shares</strong> : captent toute la valeur restante après les instruments prioritaires (l'upside).</li>
      <li><strong>Instruments prioritaires du fonds</strong> : actions de préférence (ADP) avec un rendement prioritaire, obligations convertibles (OC) ou shareholder loans à intérêts capitalisés.</li>
      <li><strong>Sweet equity</strong> : le fonds met l'essentiel de sa mise dans les instruments prioritaires ; les managers investissent dans les ordinary shares → ils détiennent une part des ordinary shares supérieure à leur part de l'investissement.</li>
      <li><strong>Managers</strong> : BSA (ratchet), parfois AGA pour un cercle plus large.</li></ul>`,
    exemple: `<p>Equity 100 : fonds 70 en ADP à 8 % + 25 en ordinary shares ; managers 5 en ordinary shares (16,7 % des ordinary shares pour 5 % de la mise). Exit à 250 après 5 ans : ADP = 70 × 1,08⁵ ≈ 103 ; reste 147 pour les ordinary shares, dont 24,5 pour les managers → 4,9x pour eux, ~2,4x pour le fonds.</p>`,
    relances: [[`Pourquoi le fonds accepte-t-il ce partage ?`, `Pour aligner le management sur la création de valeur : leur gain n'apparaît qu'au-delà du rendement prioritaire du fonds.`]],
  },
  'pe-mgmt-204': {
    complete: `<ul><li><strong>Board</strong> : représentants du fonds, dirigeants, parfois des administrateurs indépendants ; comités d'audit ou de rémunération dans les plus grosses sociétés.</li>
      <li><strong>Reporting</strong> : flash mensuel (revenue, EBITDA, cash, KPI), test trimestriel des covenants, budget annuel.</li>
      <li><strong>Décisions réservées</strong> (veto du fonds) : budget, capex importants, acquisitions, dette, recrutement des dirigeants, dividendes.</li>
      <li><strong>Suivi du plan</strong> : plan des 100 jours puis plan de value creation.</li></ul>`,
    relances: [[`Quel est le rôle de l'analyste dans le suivi ?`, `Préparer les boards, analyser le reporting mensuel, suivre la trésorerie et les covenants, et mettre à jour la valorisation trimestrielle.`]],
  },
  'pe-mgmt-205': {
    complete: `<ul><li><strong>Alignement</strong> : sans réinvestissement, le management a encaissé et n'a plus rien à gagner (ni à perdre).</li>
      <li><strong>Signal</strong> : réinvestir montre sa confiance dans le nouveau business plan.</li>
      <li><strong>Équilibre</strong> : le management encaisse une partie (récompense du premier LBO) et réinvestit le reste, souvent par apport de ses titres à la nouvelle HoldCo (la plus-value d'apport peut alors bénéficier d'un sursis ou d'un report d'imposition selon les cas).</li></ul>`,
    exemple: `<p>Un manager touche 2 M€ nets à la sortie du premier LBO ; il en réinvestit 1 M€ dans le nouveau deal et garde 1 M€.</p>`,
    pieges: [`Exiger un réinvestissement de 100 % (démotivant) ou l'accepter quasi nul (pas d'alignement).`],
  },
  'pe-mgmt-206': {
    complete: `<ul><li><strong>BSPCE</strong> : droit d'acheter des actions à un prix fixé à l'attribution ; le gain = valeur de l'action − prix d'exercice. Conditions strictes (société de moins de 15 ans, non issue d'une reprise d'activité, détention minimale par des personnes physiques…) → surtout utilisés dans les start-up, rarement dans la HoldCo d'un LBO.</li>
      <li><strong>AGA</strong> : actions remises gratuitement après une période d'acquisition (au moins 1 an ; acquisition + conservation au moins 2 ans), dans la limite d'un plafond du capital ; coût pour la société : une contribution patronale.</li>
      <li>En LBO, le management package repose surtout sur l'investissement des managers (sweet equity) et les BSA ; les AGA servent à associer un cercle plus large.</li></ul>`,
    relances: [[`Comment est imposé un management package en France ?`, `Depuis la loi de finances 2025 (article 163 bis H du CGI), le gain est imposé comme une plus-value dans la limite de 3 fois la performance financière de la société, et comme un salaire au-delà.`]],
  },
  'pe-mgmt-302': {
    complete: `<ul><li><strong>Constat</strong> : les instruments prioritaires du fonds accumulent leur rendement ; si l'Equity Value ne le couvre plus, les ordinary shares des managers ne valent rien.</li>
      <li><strong>Risque</strong> : démotivation, départs, managers qui « jouent la montre ».</li>
      <li><strong>Options du fonds</strong> : reset du package (nouveaux instruments, nouveau ratchet), renonciation à une partie du rendement prioritaire, nouvel investissement des managers à des conditions favorables ; ou changement de management si le problème vient de l'exécution.</li></ul>`,
    exemple: `<p>Fonds : 90 en OC à 10 % ; ordinary shares : 10. Après 4 ans, OC = 90 × 1,1⁴ ≈ 132. Si l'Equity Value vaut 120, les ordinary shares (et le package) valent 0.</p>`,
    relances: [[`Pourquoi le fonds accepterait-il de se diluer ?`, `Parce qu'un management démotivé ou qui part détruit plus de valeur que le coût du reset.`]],
  },
  'pe-mgmt-303': {
    complete: `<ul><li><strong>Critères</strong> : rôle, impact sur la création de valeur, difficulté à remplacer, montant investi par chacun.</li>
      <li><strong>Pool</strong> : une réserve pour les recrutements à venir (DAF, directeur international…).</li>
      <li><strong>Protections</strong> : vesting et clauses de leaver ; possibilité de réattribuer les titres d'un partant.</li>
      <li><strong>Cercle élargi</strong> : AGA ou bonus de sortie pour les managers hors du premier cercle.</li></ul>`,
    exemple: `<p>Management package = 10 % des ordinary shares : CEO 3,5 %, DAF 1,5 %, quatre directeurs 0,75 % chacun (3 %), pool 2 %.</p>`,
    pieges: [`Un partage égalitaire qui ne reflète pas les responsabilités.`, `Ne rien garder pour les futurs recrutements.`],
  },
  'pe-sortie-102': {
    complete: `<ul><li><strong>Trade sale</strong> : prix souvent plus élevé (synergies), exit à 100 % ; mais process plus long (autorités de concurrence), informations sensibles données à un concurrent, management parfois réticent (perte d'indépendance), garanties souvent plus demandées.</li>
      <li><strong>SBO</strong> : process rapide et rodé (VDD, W&I), continuité du management qui réinvestit avec un nouveau package ; mais prix limité par l'IRR cible de l'acheteur et par la dette disponible.</li></ul>`,
    relances: [[`Peut-on mettre les deux en concurrence ?`, `Oui, c'est fréquent : on invite industriels et fonds dans le même process pour maximiser le prix.`]],
  },
  'pe-sortie-104': {
    complete: `<ul><li><strong>Tendance</strong> : autour de 4-5 ans dans les périodes fastes, la durée médiane a remonté vers ~6 ans avec le ralentissement des exits depuis 2022.</li>
      <li><strong>Causes</strong> : écart de valorisation entre acheteurs et vendeurs, dette plus chère, IPO quasi fermées.</li>
      <li><strong>Conséquences</strong> : IRR dilués par le temps, LP qui attendent du DPI, prorogations de fonds.</li>
      <li><strong>Solutions</strong> : continuation vehicles, exits partielles, dividend recaps, NAV financing.</li></ul>`,
    exemple: `<p>Un MOIC de 2,5x donne 20 % d'IRR en 5 ans mais seulement ~14 % en 7 ans.</p>`,
  },
  'pe-sortie-105': {
    complete: `<ul><li><strong>VDD</strong> (financière, fiscale, juridique, parfois commerciale et ESG) : même base d'information pour tous les acheteurs, DD acheteur plus courte ; une reliance letter permet à l'acheteur et aux prêteurs de s'appuyer sur le rapport.</li>
      <li><strong>W&I insurance</strong> : un assureur couvre les violations des garanties du SPA (warranties) ; souvent souscrite par l'acheteur, avec une franchise (retention) et un plafond (souvent 10-30 % de l'EV).</li>
      <li><strong>Exclusions</strong> : faits connus (découverts en DD), prévisions, ajustements de prix, certains risques (pollution, certains impôts).</li>
      <li><strong>Pourquoi</strong> : le fonds doit distribuer le produit de cession à ses LP et clôturer son fonds : il ne veut ni escrow ni garanties qui durent.</li></ul>`,
    exemple: `<p>EV 200 M€ : police W&I avec un plafond de 20 M€ et une franchise de 1 M€ ; prime de l'ordre de 1 % du montant couvert (variable selon le marché).</p>`,
  },
  'pe-sortie-202': {
    complete: `<ul><li><strong>Principe</strong> : le GP transfère une ou plusieurs participations d'un ancien fonds vers un nouveau véhicule financé par des investisseurs secondaires ; chaque LP choisit de vendre (cash) ou de réinvestir (rollover).</li>
      <li><strong>Conflit</strong> : le GP fixe un prix dont il est vendeur et acheteur, et cristallise souvent du carry.</li>
      <li><strong>Parades</strong> : process concurrentiel pour choisir le lead investor, fairness opinion, accord du LPAC, délai suffisant pour décider, réinvestissement d'une partie du carry et nouvel engagement du GP.</li></ul>`,
    relances: [[`Pourquoi un GP fait-il un continuation vehicle ?`, `Pour garder plus longtemps un actif qui a encore du potentiel tout en offrant de la liquidité aux LP de l'ancien fonds.`]],
  },
  'pe-sortie-203': {
    complete: `<ul><li><strong>Fonctionnement</strong> : préparation de l'IPO (documentation, banques, analystes) et process de cession en parallèle ; décision au dernier moment.</li>
      <li><strong>Avantages</strong> : l'IPO sert de prix plancher dans la négociation, alternative si un marché se ferme.</li>
      <li><strong>Limites</strong> : coût et mobilisation du management ; l'IPO ne permet souvent de vendre qu'une partie (lock-up, décote d'introduction).</li>
      <li>En pratique, beaucoup de dual tracks finissent en cession.</li></ul>`,
    relances: [[`Pourquoi la cession l'emporte-t-elle souvent ?`, `Elle donne 100 % du prix tout de suite et une certitude ; l'IPO laisse le fonds exposé au cours de bourse pendant plusieurs années.`]],
  },
  'pe-sortie-204': {
    complete: `<ul><li><strong>Formes</strong> : cession d'une participation minoritaire à un autre fonds ou à un co-investisseur, cession à parité (co-contrôle).</li>
      <li><strong>Avantages</strong> : DPI pour les LP, upside conservé, valorisation de référence (mark) par un tiers.</li>
      <li><strong>Limites</strong> : gouvernance plus complexe (droits du nouvel entrant), le prix fixé devient une référence pour l'exit finale, frais de transaction.</li></ul>`,
    exemple: `<p>Le fonds vend 40 % de sa participation à 2,5x : il rend une partie du capital à ses LP et garde 60 % pour une exit plus tard.</p>`,
  },
  'pe-sortie-301': {
    complete: `<ul><li><strong>Chiffres</strong> : reporting mensuel fiable, KPI, comptes LTM rapidement disponibles, QoE anticipée.</li>
      <li><strong>Equity story</strong> : croissance prouvée, add-ons intégrés (synergies réalisées), pipeline, potentiel pour l'acheteur suivant.</li>
      <li><strong>Équipe</strong> : DAF solide, n°2 identifié, management motivé pour la suite.</li>
      <li><strong>Nettoyage</strong> : contrats clés, litiges, structure juridique et fiscale, clauses de changement de contrôle.</li>
      <li><strong>Calendrier</strong> : VDD environ 6 mois avant le lancement, choix des conseils, état du marché.</li></ul>`,
    relances: [[`Pourquoi ne pas lancer l'exit tout de suite ?`, `Parce que 2 ans de résultats tenus, d'add-ons intégrés et de reporting fiable font monter le multiple et la confiance des acheteurs.`]],
  },
  'pe-sortie-303': {
    complete: `<ul><li><strong>Pourquoi</strong> : beaucoup de dry powder à investir, process rapides, actifs déjà « LBO-ready » (reporting, gouvernance), industriels plus prudents, IPO quasi fermées.</li>
      <li><strong>Limites</strong> : leviers de value creation « faciles » déjà utilisés, multiples d'entrée élevés, un même LP peut se retrouver des deux côtés de la transaction, IRR souvent plus faibles en SBO.</li>
      <li><strong>Pour réussir un SBO</strong> : une thèse nouvelle (international, add-ons plus gros, digital).</li></ul>`,
    pieges: [`Présenter un SBO comme sans risque parce que la société a déjà été « préparée ».`],
  },
  'pe-fit-103': {
    complete: `<ul><li><strong>Mid-cap</strong> (2-3 raisons) : proximité des dirigeants, value creation opérationnelle, junior impliqué sur tout le deal, buy-and-build.</li>
      <li><strong>Ce fonds</strong> (3 éléments précis) : sa stratégie (secteurs, majoritaire ou minoritaire), un deal de son portefeuille et ce qui t'y intéresse, sa culture ou une rencontre avec l'équipe.</li>
      <li><strong>Toi</strong> : ce que tu apportes à cette équipe.</li></ul>`,
    pieges: [`Une réponse interchangeable entre fonds.`, `Se tromper sur la stratégie du fonds (minoritaire / majoritaire, ticket, secteurs).`],
    relances: [[`Quel deal de notre portefeuille t'intéresse le plus ?`, `Prépare-en un : la société, la thèse probable, ce que tu aurais regardé en DD, ce qui a été fait depuis.`]],
  },
  'pe-fit-105': {
    complete: `<ul><li><strong>Qualités</strong> : deux, utiles en PE, chacune prouvée par un exemple concret (« rigueur : dans ma veille de deals, j'ai repéré… »).</li>
      <li><strong>Défaut</strong> : réel mais non rédhibitoire, avec ce que tu fais pour le corriger.</li></ul>`,
    exemple: `<p>« J'ai tendance à trop peaufiner la forme : je fixe désormais un temps maximum et je valide d'abord le fond avec mon manager. »</p>`,
    pieges: [`Un faux défaut (« je suis trop perfectionniste » sans suite).`, `Un défaut incompatible avec le métier (« je n'aime pas les chiffres »).`],
  },
  'pe-fit-106': {
    complete: `<ul><li><strong>Situation et tâche</strong> : contexte en 2 phrases.</li><li><strong>Action</strong> : ce que tu as fait et ta part de responsabilité dans l'échec.</li>
      <li><strong>Résultat</strong> : ce qui n'a pas marché, sans minimiser.</li><li><strong>Leçon</strong> : ce que tu as appris et un exemple où tu l'as appliqué depuis.</li></ul>`,
    pieges: [`Une réussite déguisée en échec.`, `Rejeter la faute sur les autres.`],
    relances: [[`Que ferais-tu différemment aujourd'hui ?`, `Une réponse concrète (alerter plus tôt, vérifier une hypothèse) montre que la leçon est réellement apprise.`]],
  },
  'pe-fit-201': {
    complete: `<ul><li><strong>Conclusion d'abord</strong> : « J'investirais dans X parce que… ».</li>
      <li><strong>Description</strong> : activité, taille (revenue, EBITDA), clients.</li><li><strong>Marché</strong> : taille, croissance, concurrence.</li>
      <li><strong>Avantage compétitif</strong> et <strong>financiers</strong> : croissance, marges, cash conversion.</li>
      <li><strong>Thèse en 3 points</strong>, <strong>risques et parades</strong>, <strong>prix et sortie</strong> (multiple, acheteurs possibles).</li></ul>`,
    pieges: [`Choisir une très grande société cotée impossible à acheter en LBO.`, `Aucun chiffre, aucun risque, pas d'exit.`],
    relances: [[`Combien la paierais-tu, et avec quelle dette ?`, `Un multiple justifié par les comparables et un levier cohérent avec la cash conversion (par exemple 4x).`], [`Qui l'achèterait à l'exit ?`, `Un industriel du secteur (synergies) ou un fonds plus grand (plateforme de build-up).`]],
  },
  'pe-fit-203': {
    complete: `<ul><li><strong>Ce que tu apportes</strong> : lecture fine d'une FDD (QoE, NWC, net debt), capacité à challenger les conseils, esprit critique sur la qualité des chiffres.</li>
      <li><strong>Preuves</strong> : un exemple où un ajustement ou un debt-like changeait le prix, ta veille de deals.</li>
      <li><strong>Ce que tu développes</strong> : modélisation LBO, rythme des process (entraînement régulier).</li></ul>`,
    pieges: [`Dénigrer les banquiers.`],
    relances: [[`Que sait faire un banquier mieux que toi ?`, `La modélisation rapide et la conduite des process M&A ; je travaille ces points (paper LBO, cas pratiques).`]],
  },
  'pe-fit-204': {
    complete: `<ul><li>Choisis 2 fonds et, pour chacun : stratégie (taille, secteurs, majoritaire / minoritaire), un deal emblématique et la valeur créée, ce que tu admires (approche opérationnelle, buy-and-build, ESG).</li>
      <li>Vérifie chaque fait (site du fonds, presse spécialisée) : un recruteur connaît bien ses concurrents.</li></ul>`,
    pieges: [`Ne citer que les plus grands fonds mondiaux sans rien en dire.`, `Citer un concurrent direct en le préférant ouvertement.`],
  },
  'pe-fit-205': {
    complete: `<ul><li><strong>Préparer</strong> : faits et chiffres, impact sur le deal.</li><li><strong>Échanger</strong> : en privé, en écoutant d'abord (il a souvent plus de contexte).</li>
      <li><strong>Proposer</strong> : une analyse complémentaire pour trancher (sensitivity, appel d'expert).</li><li><strong>Appliquer</strong> la décision finale, même si elle n'est pas la tienne.</li></ul>`,
    exemple: `<p>« Je pensais que le NWC était sous-estimé dans le modèle : j'ai montré la saisonnalité mensuelle à mon associate, il a validé un ajustement de 2 M€. »</p>`,
    relances: [[`Et s'il maintient sa position ?`, `J'applique la décision et je garde mon analyse documentée ; si c'est un risque majeur pour le fonds, je le redis clairement une fois, chiffres à l'appui.`]],
  },
  'pe-fit-301': {
    complete: `<ul><li><strong>Diagnostiquer</strong> : marché, exécution ou budget irréaliste ? (données mensuelles, discussion franche avec le dirigeant).</li>
      <li><strong>Cash</strong> : prévision de trésorerie à 13 semaines, headroom des covenants.</li>
      <li><strong>Agir</strong> : plan d'action chiffré, suivi rapproché ; renfort ou changement de management si nécessaire.</li>
      <li><strong>Prêteurs</strong> : les prévenir tôt (waiver, reset, equity cure si besoin).</li>
      <li><strong>Fonds</strong> : mise à jour de la valorisation et information des LP.</li></ul>`,
    exemple: `<p>Net debt 88, EBITDA 20 → 4,4x pour un covenant à 4,5x : l'EBITDA ne peut plus baisser que jusqu'à 19,6 (−2 %) avant le breach : il faut agir maintenant.</p>`,
  },
  'pe-fit-302': {
    complete: `<ul><li>Une bonne question montre que tu as lu le dossier et que tu vas à l'essentiel : le risque de perte, la dépendance à une hypothèse, l'exit.</li>
      <li>Exemples : « L'IRR tient-il sans multiple expansion ? », « Quelle part de la value creation dépend des add-ons non signés ? », « Qui achète la société dans 5 ans, et pourquoi paierait-il ce multiple ? »</li></ul>`,
    pieges: [`Une question technique de détail qui montre que tu n'as pas vu l'essentiel.`],
    relances: [[`Et ta propre réponse à cette question sur ce dossier ?`, `Prépare-la : le comité attend une question ET un avis.`]],
  },
  'pe-lbo-103': {
    complete: `<ul><li><strong>Cash flows</strong> stables et prévisibles : revenus récurrents, contrats, faible cyclicité.</li>
      <li><strong>Cash conversion</strong> forte : peu de capex, NWC maîtrisé.</li>
      <li><strong>Position</strong> solide (moat, pricing power) sur un marché en croissance.</li>
      <li><strong>Management</strong> solide, prêt à réinvestir.</li>
      <li><strong>Leviers</strong> de value creation identifiés (build-up, international, pricing, opérations) et <strong>exit</strong> visible (acheteurs possibles).</li></ul>`,
    relances: [[`Un exemple de mauvaise cible ?`, `Une société très cyclique ou très capitalistique, dépendante d'un client ou d'un dirigeant, ou dont le marché décroît.`], [`Et une start-up en forte croissance mais non rentable ?`, `Pas pour un LBO : sans EBITDA ni cash flow, pas de dette possible ; c'est du venture ou du growth equity.`]],
  },
  'pe-lbo-104': {
    complete: `<ul><li><strong>Effet de levier</strong> : rentabilité de l'equity = rentabilité de l'actif + (rentabilité de l'actif − coût de la dette après impôt) × dette / equity.</li>
      <li><strong>Moins d'equity</strong> pour la même plus-value en euros → pourcentage plus élevé.</li>
      <li><strong>Deleveraging</strong> : la dette remboursée par la société augmente la part de l'equity dans l'EV.</li>
      <li><strong>Tax shield</strong> : intérêts déductibles, dans la limite en France de 30 % de l'EBITDA fiscal ou 3 M€ (plafonnement des charges financières).</li>
      <li><strong>Limite</strong> : si l'actif rapporte moins que le coût de la dette, le levier détruit du rendement.</li></ul>`,
    pieges: [`Oublier que le levier amplifie aussi les pertes.`],
    relances: [[`Pourquoi ne pas financer à 100 % par dette ?`, `Les prêteurs exigent un coussin d'equity, le coût de la dette grimpe avec le levier et la société ne pourrait pas servir sa dette.`]],
  },
  'pe-lbo-109': {
    complete: `<ul><li><strong>Taille</strong> : moins d'acheteurs (trop petite pour la plupart des fonds), financement plus difficile → multiple plus bas.</li>
      <li><strong>Risque</strong> : dépendance au dirigeant, reporting moins fiable, concentration clients.</li>
      <li><strong>Vendeur</strong> : souvent un fondateur qui cherche une solution de succession et sensible au projet industriel.</li>
      <li><strong>Multiple arbitrage</strong> : une fois intégré, l'EBITDA de l'add-on est valorisé au multiple de la platform à l'exit ; les synergies ajoutent de la valeur.</li></ul>`,
    pieges: [`Compter sur le multiple arbitrage sans intégration réelle : l'acheteur final ne paiera pas le multiple de la platform pour un assemblage disparate.`],
    relances: [[`Quel est le principal risque d'un add-on ?`, `L'intégration : systèmes, culture, départ du dirigeant vendeur, synergies non réalisées.`]],
  },
  'pe-lbo-201': {
    complete: `<ul><li><strong>Conditions</strong> : HoldCo détenant au moins 95 % de la cible, sociétés à l'IS, exercices de 12 mois aux mêmes dates, option pour le régime.</li>
      <li><strong>Effet</strong> : le déficit de la HoldCo (intérêts de la dette d'acquisition) s'impute sur le bénéfice de la cible → économie d'IS (25 %).</li>
      <li><strong>Limites</strong> : plafonnement des charges financières nettes (30 % de l'EBITDA fiscal ou 3 M€), amendement Charasse, taux des prêts d'actionnaires plafonné, règles anti-hybrides.</li>
      <li><strong>Sous 95 %</strong> : pas d'intégration fiscale → on fait investir le management et le vendeur au niveau de la HoldCo plutôt que de la cible.</li></ul>`,
    pieges: [`Oublier le plafonnement des charges financières : l'économie d'impôt n'est pas illimitée.`],
    relances: [[`Pourquoi le seuil de 95 % compte-t-il avec des managers actionnaires ?`, `Si le fondateur ou les managers détiennent plus de 5 % de la cible en direct, l'intégration est impossible : ils investissent donc dans la HoldCo.`]],
  },
  'pe-lbo-205': {
    complete: `<ul><li><strong>Mécanique</strong> : nouvelle dette levée par la société ou la HoldCo → dividende ou remboursement d'instruments du fonds.</li>
      <li><strong>IRR</strong> : en hausse, car une partie du cash revient plus tôt.</li>
      <li><strong>MOIC</strong> : stable ou en légère baisse (la nouvelle dette et ses intérêts réduisent l'equity à l'exit).</li>
      <li><strong>DPI</strong> : en hausse, les LP reçoivent du cash.</li>
      <li><strong>Risques</strong> : levier plus élevé, covenants plus tendus ; à réserver aux sociétés performantes, marché de la dette ouvert.</li></ul>`,
    pieges: [`Affirmer que le MOIC augmente : il baisse en général un peu, à cause des intérêts.`],
    relances: [[`Quand le fonds préfère-t-il un dividend recap à une exit ?`, `Quand la société a encore du potentiel mais que les LP attendent du DPI, ou quand le marché des exits est fermé.`]],
  },
  'pe-rendement-106': {
    complete: `<ul><li><strong>IRR</strong> : rendement annualisé, tient compte du timing ; flatté par une exit rapide (un petit multiple en 1 an donne un gros IRR).</li>
      <li><strong>MOIC</strong> : multiple du cash investi, mesure la valeur créée en absolu, ignore le temps.</li>
      <li><strong>Ensemble</strong> : 30 % d'IRR avec 1,3x crée peu de valeur ; 3x en 10 ans ne fait que 11,6 % d'IRR.</li>
      <li>Les LP regardent aussi le <strong>DPI</strong> (cash réellement rendu) et le <strong>TVPI</strong> (valeur totale / capital appelé).</li></ul>`,
    pieges: [`Comparer des IRR de durées très différentes sans regarder le multiple.`],
    relances: [[`Que sont le DPI et le TVPI ?`, `DPI = distributions / capital appelé ; TVPI = (distributions + valeur résiduelle) / capital appelé.`]],
  },
  'pe-rendement-302': {
    complete: `<ol><li>Equity nécessaire à l'exit = equity investie × 1,2ⁿ (repères : 1,2³ = 1,73 ; 1,2⁴ = 2,07 ; 1,2⁵ = 2,49).</li>
      <li>EV nécessaire = equity nécessaire + net debt à l'exit (après deleveraging).</li>
      <li>Exit multiple nécessaire = EV nécessaire / EBITDA de l'année d'exit.</li>
      <li>Comparer à l'entry multiple : s'il faut une multiple expansion, le dossier dépend du marché.</li></ol>`,
    pieges: [`Oublier la net debt à l'exit : la cible d'IRR porte sur l'equity, pas sur l'EV.`],
    relances: [[`Et pour 25 % d'IRR sur 5 ans ?`, `1,25⁵ ≈ 3,05 : il faut environ tripler l'equity.`]],
  },
  'pe-dette-104': {
    complete: `<ul><li><strong>Définition</strong> : net debt / EBITDA (souvent LTM, parfois pro forma des acquisitions) ; on distingue le senior leverage et le total leverage.</li>
      <li><strong>Lecture</strong> : nombre d'années d'EBITDA pour rembourser (approximation qui ignore capex, impôt et intérêts).</li>
      <li><strong>Niveaux</strong> : souvent 3,5-5,5x en LBO mid-cap ; plus pour des revenus très récurrents, moins pour des cycliques.</li>
      <li><strong>Covenant</strong> : levier maximum testé chaque trimestre, avec des paliers qui baissent (step-downs).</li></ul>`,
    pieges: [`Confondre dette brute et dette nette.`],
    relances: [[`Pourquoi le leverage « du contrat » peut-il différer du tien ?`, `Parce que l'EBITDA défini dans le contrat inclut des add-backs négociés (synergies, coûts exceptionnels) et que certaines dettes peuvent être exclues.`]],
  },
  'pe-dette-105': {
    complete: `<ul><li><strong>Mécanique</strong> : intérêts ajoutés au capital à chaque période → la dette grossit à taux composé.</li>
      <li><strong>Usages</strong> : HoldCo PIK, mezzanine avec une part PIK, option PIK (PIK toggle) dans certaines unitranches.</li>
      <li><strong>Coût</strong> : taux plus élevé que la dette payée en cash (rémunère le risque et l'attente).</li>
      <li><strong>Effet</strong> : préserve le cash de la société aujourd'hui, réduit l'equity à l'exit.</li></ul>`,
    pieges: [`Oublier les intérêts capitalisés dans la net debt à l'exit.`],
    relances: [[`Qu'est-ce qu'un PIK toggle ?`, `Une option pour l'emprunteur de payer certains intérêts en PIK plutôt qu'en cash, contre une marge plus élevée ; son activation signale souvent une tension sur le cash.`]],
  },
  'pe-dette-202': {
    complete: `<ul><li><strong>ICR</strong> = EBITDA / intérêts : capacité à payer les intérêts (covenant typique : au moins 3x).</li>
      <li><strong>DSCR</strong> = cash flow disponible (EBITDA − capex − impôt ± variation du NWC) / (intérêts + remboursements) : capacité à servir toute la dette (covenant typique : au moins 1,0-1,2x).</li>
      <li>Avec une dette bullet (unitranche), le DSCR compte moins ; on suit surtout le leverage et la liquidité.</li></ul>`,
    pieges: [`Calculer le DSCR avec l'EBITDA au lieu du cash flow disponible.`],
    relances: [[`Un DSCR inférieur à 1, cela signifie quoi ?`, `Le cash flow de l'année ne couvre pas intérêts et remboursements : il faut puiser dans la trésorerie, tirer le RCF ou renégocier.`]],
  },
  'pe-dette-203': {
    complete: `<ul><li><strong>Formule</strong> : headroom = 1 − net debt / (levier maximum × EBITDA) = baisse d'EBITDA tolérée avant le breach.</li>
      <li><strong>Calibrage</strong> : à la signature, les covenants laissent souvent 25-35 % de headroom par rapport au business plan.</li>
      <li><strong>Évolution</strong> : les step-downs resserrent le covenant chaque année ; le headroom futur dépend du deleveraging.</li>
      <li><strong>Si le headroom est faible</strong> : prévision de trésorerie, discussion avec les prêteurs, equity cure, waiver ou reset.</li></ul>`,
    pieges: [`Exprimer le headroom en écart de ratio (5x − 4,4x) au lieu de la baisse d'EBITDA tolérée en %.`],
    relances: [[`Le headroom peut-il baisser alors que l'EBITDA monte ?`, `Oui : si les step-downs sont plus rapides que la progression de l'EBITDA, ou si la dette augmente (add-on financé par dette).`]],
  },
  'pe-dette-207': {
    complete: `<ul><li><strong>Instruments</strong> : swap (taux variable échangé contre un taux fixe), cap (plafond de taux contre une prime), collar (cap + floor).</li>
      <li><strong>Exigence classique</strong> : couvrir une part de la dette senior (souvent 50-75 %) pendant 2-3 ans.</li>
      <li><strong>Arbitrage</strong> : le swap fixe le coût mais fait perdre le bénéfice d'une baisse des taux ; le cap coûte une prime mais garde ce bénéfice.</li>
      <li><strong>Effet</strong> : protège l'ICR, le DSCR et le business plan contre une hausse de l'Euribor.</li></ul>`,
    pieges: [`Couvrir 100 % de la dette sur toute sa durée : coûteux, et inutile si elle doit être remboursée ou refinancée.`],
    relances: [[`Swap ou cap ?`, `Swap si l'on veut un coût certain et que l'on croit à des taux stables ou en hausse ; cap si l'on veut se protéger tout en profitant d'une baisse éventuelle.`]],
  },
  'pe-dette-303': {
    complete: `<ul><li><strong>Point de départ</strong> : cash flow disponible pour la dette (EBITDA − capex − variation du NWC − impôt) et sa stabilité.</li>
      <li><strong>Marché</strong> : niveaux de levier acceptés par les prêteurs pour ce type d'actif (deals comparables récents).</li>
      <li><strong>Tests</strong> : downside case → covenants respectés, DSCR au-dessus de 1, liquidité (RCF), refinancement possible à l'échéance.</li>
      <li><strong>Arbitrage</strong> : IRR de l'equity contre risque ; garder de la capacité pour les add-ons.</li>
      <li><strong>Mix</strong> : senior, unitranche, mezzanine selon le coût et la flexibilité.</li></ul>`,
    pieges: [`Dimensionner la dette sur l'EBITDA seul, sans capex, NWC ni impôt.`],
    relances: [[`Pourquoi ne pas prendre le maximum proposé par les prêteurs ?`, `Un levier maximal ne laisse aucune marge en downside et prive la société de flexibilité pour investir.`]],
  },
  'pe-dette-305': {
    complete: `<ul><li><strong>Calcul</strong> : intérêts supplémentaires = 2 % × 5 × EBITDA = 10 % de l'EBITDA sur la dette non couverte (≈ 7,5 % après économie d'impôt à 25 % si déductible).</li>
      <li><strong>Effets</strong> : moins de cash pour rembourser, deleveraging plus lent, ICR et DSCR en baisse, headroom réduit.</li>
      <li><strong>Valorisation</strong> : des taux plus hauts pèsent souvent aussi sur l'exit multiple.</li>
      <li><strong>Parades</strong> : couverture existante (swap, cap), plan de cash, discussion avec les prêteurs.</li></ul>`,
    pieges: [`Oublier l'effet sur l'exit multiple, qui peut peser plus lourd que les intérêts.`],
    relances: [[`Et si 60 % de la dette est couverte par un swap ?`, `L'impact ne porte que sur 40 % : 2 % × 5 × 40 % = 4 % de l'EBITDA.`]],
  },
  'pe-valo-102': {
    complete: `<ol><li>EBITDA d'exit (business plan) × exit multiple = EV d'exit.</li><li>− net debt d'exit = equity d'exit.</li>
      <li>÷ MOIC cible (ou ÷ (1 + IRR cible)ⁿ) = equity maximum aujourd'hui.</li>
      <li>+ dette levable aujourd'hui − frais de transaction = EV maximum (ability to pay).</li></ol>
      <p>On compare ce plafond à la valorisation par multiples et aux offres concurrentes ; sensibilités sur l'exit multiple, la croissance et le levier.</p>`,
    pieges: [`Oublier les frais de transaction entre l'equity et l'EV maximum.`],
    relances: [[`Pourquoi l'ability to pay d'un fonds est-elle souvent inférieure à celle d'un industriel ?`, `Parce que le fonds exige 20-25 % d'IRR et ne compte pas sur des synergies.`]],
  },
  'pe-valo-103': {
    complete: `<ul><li><strong>Récurrence</strong> : ARR prévisible ; NRR supérieur à 100 % = les clients existants dépensent plus chaque année.</li>
      <li><strong>Économie</strong> : marge brute élevée (souvent 70-80 % ou plus), coût marginal faible, capex faibles, NWC négatif (facturation d'avance) → forte cash conversion à maturité.</li>
      <li><strong>Coûts de changement</strong> : logiciel intégré aux process du client.</li>
      <li><strong>Mais</strong> : valeur très éloignée dans le futur → multiples très sensibles aux taux (forte baisse en 2022).</li></ul>`,
    relances: [[`Qu'est-ce que la rule of 40 ?`, `Croissance du revenue (%) + marge d'EBITDA ou de FCF (%) ≥ 40 % : repère d'équilibre entre croissance et rentabilité.`], [`Qu'est-ce que le NRR ?`, `Net revenue retention : revenue d'une cohorte de clients un an après / revenue initial, upsell compris, churn déduit.`]],
  },
  'pe-valo-202': {
    complete: `<ul><li><strong>Qualité de l'actif</strong> : croissance visible (récurrence, backlog), marges et cash conversion élevées, peu de capex.</li>
      <li><strong>Position</strong> : leader de niche, pricing power, coûts de changement.</li>
      <li><strong>Plan</strong> : build-ups à des multiples plus bas (le multiple moyen d'entrée baisse), international, pricing.</li>
      <li><strong>Sortie</strong> : transactions comparables à 12x ou plus, acheteurs identifiés.</li>
      <li><strong>Test</strong> : l'IRR doit rester acceptable avec un exit multiple de 12x, voire 10-11x.</li></ul>`,
    pieges: [`Justifier le prix par « le marché paie ce multiple » sans argument sur la qualité de l'actif.`],
    relances: [[`Et si l'exit multiple redescend à 10x ?`, `Je montre l'IRR à 10x : si le dossier tient grâce à la croissance, au deleveraging et aux add-ons, le prix est défendable.`]],
  },
  'pe-valo-203': {
    complete: `<ul><li><strong>Uses</strong> : Equity Value (prix des titres), refinancement de la dette existante, frais (conseils, frais de financement), éventuellement cash minimum au bilan.</li>
      <li><strong>Sources</strong> : dette d'acquisition (senior ou unitranche, mezzanine), equity du fonds et des co-investisseurs, rollover du management ou du vendeur, vendor loan.</li>
      <li><strong>Équilibre</strong> : Total Sources = Total Uses ; l'equity est souvent le montant d'équilibre, car la dette est plafonnée par les prêteurs.</li></ul>`,
    pieges: [`Additionner l'EV et le refinancement de la dette (double comptage) : c'est soit Equity Value + refinancement, soit EV.`, `Oublier les frais.`],
    relances: [[`Pourquoi l'equity est-elle le montant d'équilibre ?`, `Parce que la dette est limitée par ce que les prêteurs acceptent ; le fonds apporte le reste.`]],
  },
  'pe-valo-302': {
    complete: `<ul><li><strong>EBITDA mid-cycle</strong> : moyenne sur un cycle complet (7-10 ans) ou EBITDA normatif corrigé des prix et volumes de pic.</li>
      <li><strong>Multiple</strong> : cohérent avec ce niveau ; au pic, les cycliques cotent souvent à des multiples LTM bas (le marché anticipe la baisse).</li>
      <li><strong>Indicateurs du cycle</strong> : carnet de commandes, prix des matières premières, taux d'utilisation des capacités.</li>
      <li><strong>Structure</strong> : earn-out, dette prudente, downside case de creux de cycle.</li></ul>`,
    pieges: [`Appliquer un multiple moyen à un EBITDA de pic : double optimisme.`],
    relances: [[`Pourquoi les multiples des cycliques sont-ils bas au pic ?`, `Parce que l'EBITDA de pic n'est pas durable : multiple bas × EBITDA haut = valeur « normale ».`]],
  },
  'pe-valo-304': {
    complete: `<ul><li><strong>Capex</strong> ignorés : deux sociétés au même EBITDA mais avec 5 % ou 25 % de capex / revenue ont des cash flows très différents.</li>
      <li><strong>Aussi ignorés</strong> : variation du NWC, impôt, qualité de l'EBITDA (adjustments).</li>
      <li><strong>Conventions</strong> : IFRS 16 (pre ou post), LTM ou forward, pro forma des acquisitions.</li>
      <li><strong>Compléments</strong> : EV / (EBITDA − capex), EV/EBIT, FCF yield, DCF.</li></ul>`,
    pieges: [`Comparer des multiples calculés avec des conventions différentes.`],
    relances: [[`Quel multiple pour une société très capitalistique ?`, `EV/EBIT ou EV / (EBITDA − capex), qui intègrent le coût de renouvellement des actifs.`]],
  },
  'pe-these-208': {
    complete: `<ul><li><strong>Top-down</strong> : marché global (études) × part pertinente (géographie, segment).</li>
      <li><strong>Bottom-up</strong> : nombre de clients cibles × panier moyen × fréquence ; plus vérifiable.</li>
      <li><strong>TAM / SAM / SOM</strong> : marché total / marché adressable avec l'offre et la géographie / part atteignable réalistement.</li>
      <li><strong>Recoupement</strong> : écart entre les deux approches, cohérence avec le revenue et la part de marché de la cible.</li>
      <li><strong>Croissance</strong> : moteurs (volumes, prix, réglementation, substitution).</li></ul>`,
    pieges: [`Présenter un TAM gigantesque comme le marché de la cible.`],
    relances: [[`Que fais-tu si les deux approches divergent fortement ?`, `Je remets en cause les hypothèses (part pertinente, panier, fréquence), je cherche des données tierces et je retiens une fourchette prudente.`]],
  },
  'pe-mgmt-102': {
    complete: `<ul><li><strong>Structure</strong> : equity totale = instruments prioritaires (surtout le fonds) + ordinary shares (fonds + managers).</li>
      <li><strong>Effet</strong> : la part des managers dans les ordinary shares dépasse largement leur part de l'investissement total → leur multiple est démultiplié si la valeur dépasse le rendement prioritaire.</li>
      <li><strong>Risque symétrique</strong> : en dessous, les ordinary shares valent peu ou rien.</li>
      <li><strong>Fiscalité</strong> : régime spécifique des management packages en France depuis la loi de finances 2025.</li></ul>`,
    pieges: [`Croire que la sweet equity est gratuite : les managers investissent leur argent et peuvent tout perdre.`],
    relances: [[`Comment mesures-tu l'effet sweet ?`, `Part des managers dans les ordinary shares / part des managers dans l'investissement total : par exemple 15 % / 5 % = 3x.`]],
  },
  'pe-fit-102': {
    complete: `<ul><li><strong>Structure</strong> : 3 raisons + 1 preuve + le lien avec ton parcours.</li>
      <li><strong>Raisons</strong> : être investisseur (se forger une conviction, la défendre devant un comité, en assumer le résultat) ; l'impact durable sur une entreprise et ses dirigeants (4-6 ans de value creation) ; la variété (finance, stratégie, négociation, relationnel).</li>
      <li><strong>Preuve</strong> : ta veille de deals, une analyse publiée, un stage.</li>
      <li><strong>Lien</strong> : ce que ton expérience (TS, audit…) t'a appris et pourquoi le PE est l'étape suivante.</li></ul>`,
    relances: [[`Pourquoi pas la banque d'affaires ?`, `Parce que je veux être du côté de l'investisseur, sur la durée, et pas seulement accompagner une transaction jusqu'au closing.`], [`Pourquoi pas rester en TS ?`, `Le TS apprend à juger la qualité des chiffres ; le PE y ajoute la décision d'investir et l'accompagnement de l'entreprise ensuite.`]],
  },
  'pe-fit-104': {
    complete: `<ul><li>2-3 questions préparées et propres au fonds :</li>
      <li><strong>Rôle</strong> : « Comment se répartit le temps d'un analyste entre origination, exécution et suivi des participations ? »</li>
      <li><strong>Deals</strong> : « Sur [deal récent], quelle part de la value creation est venue des add-ons ? »</li>
      <li><strong>Marché</strong> : « Comment voyez-vous le marché des exits dans votre segment ? »</li>
      <li><strong>Équipe</strong> : « Qu'est-ce qui distingue les analystes qui réussissent chez vous ? »</li>
      <li>Adapte la question à l'interlocuteur (RH, associate, partner).</li></ul>`,
    relances: [[`Et si on a déjà répondu à tes questions ?`, `Je le dis (« vous avez répondu à ma question sur… ») et j'en pose une de réserve, par exemple : « Qu'est-ce qui vous a fait rejoindre ce fonds ? »`]],
  },
};
