// Page « Conseils » et conseils du jour. Les faits datés sont sourcés (liste en bas de page).

export const SOURCES = [
  { nom: 'Glassdoor — retours d\'entretiens TS (Deloitte, KPMG, PwC)', url: 'https://www.glassdoor.fr/Entretien/KPMG-Entretien-E2867-RVW79739774.htm' },
  { nom: 'Copeps — questions d\'entretien en private equity', url: 'https://copeps.fr/actualites/stage-fonds-propres-questions-entretien/' },
  { nom: 'Chambers — Private Equity 2026, France (tendances)', url: 'https://practiceguides.chambers.com/practice-guides/private-equity-2026/france/trends-and-developments/O27084' },
  { nom: 'HLC — réforme fiscale des management packages (LF 2025)', url: 'https://www.hlc.com/en/publications/the-french-finance-act-for-2025-reforms-the-tax-and-social-security-regime-of-management-packages' },
  { nom: 'Rothschild Martin Maurel — réforme des management packages', url: 'https://www.rothschildandco.com/fr-be/actualites/publications/2025/07/rothschild-martin-maurel-reforme-fiscale-des-management-packages-/' },
  { nom: 'Leland — guide des études de cas PE', url: 'https://www.joinleland.com/library/a/private-equity-case-study' },
  { nom: 'Financial Edge — test de modélisation LBO en 90 minutes', url: 'https://www.fe.training/free-resources/careers-in-finance/90-minute-lbo-modeling-test/' },
  { nom: 'Selby Jennings — tests de modélisation buy-side', url: 'https://www.selbyjennings.com/en-ae/industry-insights/career-advice/buy-side-modelling-tests' },
  { nom: 'EY — locked box vs completion accounts', url: 'https://www.ey.com/en_gl/insights/law/locked-box-vs-completion-accounts' },
  { nom: 'Kroll — financial due diligence (working capital peg)', url: 'https://www.kroll.com/en/services/transaction-advisory-services/financial-due-diligence' },
  { nom: 'KPMG — IFRS 18 et l\'EBITDA', url: 'https://kpmg.com/ee/et/insights/2026/05/uus-standard-ifrs-18-kas-senise-ebitda-ajastu-lopp.html' },
];

const section = (titre, contenu) => ({ titre, contenu });
const liste = (lignes) => `<ul>${lignes.map((l) => `<li>${l}</li>`).join('')}</ul>`;

export const CONSEILS = {
  commun: [
    section('La méthode de réponse qui marche à l\'oral', liste([
      '<strong>1 phrase de réponse directe</strong> (la conclusion), puis <strong>3 points</strong> structurés, puis <strong>1 exemple chiffré</strong>, puis l\'implication (« donc pour le prix… »).',
      '<strong>Pense à voix haute</strong> sur les calculs : annonce la méthode avant le chiffre.',
      'Tu ne sais pas ? Dis-le, puis <strong>raisonne</strong> à partir de ce que tu sais. Un raisonnement juste vaut mieux qu\'un chiffre récité.',
      '<strong>Chiffre</strong> tes exemples : un recruteur retient « 0,3 M€ d\'EBITDA à 9x = 2,7 M€ de prix ».',
      'Arrête-toi quand tu as répondu. Une réponse de 60 à 90 secondes, c\'est déjà long.',
    ])),
    section('Les erreurs qui coûtent un entretien', liste([
      'Ne pas savoir expliquer une ligne de son CV.',
      'Des réponses de « pourquoi ce cabinet / fonds » génériques (aucun deal, aucune personne citée).',
      'Réciter une définition sans exemple ; se perdre dans les détails sans conclusion.',
      'Confondre HT et TTC, pré et post-IFRS 16, EBITDA et cash.',
      'Annoncer un IRR sans ordre de grandeur (un IRR de 80 % sur un LBO doit t\'alerter).',
      'Ne pas avoir de question à poser à la fin.',
    ])),
    section('Plan intensif conseillé (2 semaines avant un entretien)', liste([
      '<strong>Chaque jour</strong> : la session du jour (30 min) dans la matière visée + un sprint de calcul mental (2 min) + 1 révision de fiche.',
      '<strong>Jours 1 à 4</strong> : bases (thèmes les plus faibles en priorité, l\'application les choisit).',
      '<strong>Jours 5 à 9</strong> : une étude de cas par jour, chronométrée ; rédige et répète ton pitch (« Mon pitch »).',
      '<strong>Jours 10 à 13</strong> : une simulation d\'entretien complète par jour ; corrige tes points faibles.',
      '<strong>Veille</strong> : relis les fiches, ton pitch et 2 deals de ta Veille ; prépare tes questions ; dors.',
    ])),
    section('La veille de l\'entretien : check-list', liste([
      'Fiche de l\'entreprise : taille, équipe, 3 deals récents, actualité, 1 personne rencontrée.',
      'Ton pitch de 2 minutes, répété à voix haute (chronométré).',
      '2 deals récents que tu peux présenter en 2 minutes chacun (avec ton avis).',
      'Tes repères de calcul (IRR, multiples) et les formules clés (fiches).',
      '3 questions à poser, adaptées à l\'interlocuteur (manager, associé, RH).',
      'Logistique : trajet, tenue, CV imprimé, batterie, calme.',
    ])),
  ],
  ts: [
    section('Comment se passe un recrutement en Transaction Services', `<p>D'après des retours d'entretiens (Deloitte, PwC, KPMG à Paris sur Glassdoor) : souvent un <strong>entretien RH ou manager</strong> (fit + bases techniques), un <strong>entretien technique</strong> d'environ 1h à 1h30 sur la due diligence financière, et/ou un <strong>cas pratique</strong> (environ 1h30 à 2h, parfois devant deux managers, suivi d'une restitution orale), puis un <strong>entretien avec un associé</strong> (motivation, personnalité). Les questions varient selon les bureaux et les années.</p>
      ${liste([
        'Questions techniques qui reviennent : ajustements d\'EBITDA, adjusted EBITDA, ajustement du NWC, dette et debt-like, buy-side vs sell-side, DCF vs multiples, impact d\'une opération sur les 3 états financiers.',
        'Cas pratique type : une série de situations à classer selon leur impact sur l\'EBITDA, la net debt ou le NWC, ou un mini-databook à analyser.',
        'Fit : « Pourquoi le TS ? », « Pourquoi nous ? », ton parcours.',
      ])}`),
    section('Réussir le cas pratique TS', liste([
      'Lis tout avant de calculer. Repère la matérialité.',
      'Une ligne par ajustement, avec son sens (+/−) et son « pourquoi » en une phrase.',
      'Vérifie la cohérence : pas de double comptage entre EBITDA, net debt et NWC.',
      'Termine par une synthèse en 3 messages chiffrés + impact sur le prix + recommandation (mécanisme, garanties).',
      'À l\'oral, commence par la conclusion : « l\'adjusted EBITDA est de X, soit Y de moins que le management ».',
    ])),
    section('Ce qui fait la différence en TS', liste([
      'Montrer que tu penses <strong>prix</strong> : chaque constat a un impact (EBITDA × multiple, dette euro pour euro).',
      'Montrer que tu penses <strong>client</strong> : un fonds veut des messages clairs et rapides.',
      'Montrer ta <strong>veille</strong> : IFRS 18 en 2027, management packages, marché des sorties.',
      'Parler d\'un deal récent avec l\'angle « ce que j\'aurais regardé en DD ».',
    ])),
  ],
  pe: [
    section('Comment se passe un recrutement en private equity', `<p>D'après le guide Copeps : deux volets, <strong>fit</strong> et <strong>technique</strong> ; pour un stage en mid ou large cap, souvent <strong>2 à 3 tours</strong>, et entre <strong>4 et 12 tours</strong> pour un CDI. Les grands fonds testent souvent un <strong>paper LBO</strong> sous forte contrainte de temps ; les fonds mid-cap donnent plutôt un cas de quelques heures ou à la maison, avec un mémo d'investissement (Leland). Un test de modélisation LBO de 90 minutes est courant au niveau associate en mid-market (Financial Edge).</p>
      ${liste([
        'Technique : dérouler un compte de résultat, NWC, étapes d\'un deal, principe du LBO, cas LBO (Excel ou feuille blanche), parfois un cas stratégique façon conseil.',
        'Fit : pourquoi le PE, présentation (90-120 s), autres processus en cours, centres d\'intérêt, forces, gestion de conflit, avis sur un deal.',
        'Erreur classique (Leland) : traiter le cas comme un test de modélisation et pas comme une décision d\'investissement.',
      ])}`),
    section('Réussir un paper LBO', liste([
      'Une feuille : colonne « entrée », colonne « sortie », et un tableau de dette au milieu.',
      'Arrondis franchement (13,7 → 14) et dis-le.',
      'Repères : 2x/5 ans ≈ 15 %, 2,5x ≈ 20 %, 3x ≈ 25 % ; 2x/3 ans ≈ 26 %.',
      'Vérifie la vraisemblance : IRR d\'un LBO mid-cap typiquement 15-30 %.',
      'Termine par la décomposition de la value creation et ton avis.',
    ])),
    section('Ce qui fait la différence en PE', liste([
      'Un <strong>avis tranché</strong> et argumenté (« j\'irais / je n\'irais pas, parce que… »).',
      'Voir les <strong>red flags</strong> que les autres ratent (concentration, key man, capex, NWC).',
      'Connaître <strong>le fonds</strong> : stratégie, ticket, 3 participations, un deal que tu aurais aimé faire.',
      'Avoir une <strong>lecture du marché</strong> sourcée (guide Chambers 2026 : build-ups, sorties difficiles, continuation vehicles, dette privée).',
      'Ta preuve de motivation : ta veille hebdomadaire de deals publiée sur LinkedIn.',
    ])),
  ],
};

// Conseils du jour : un par matière et par jour (rotation)
export const CONSEILS_DU_JOUR = {
  ts: [
    'Pour chaque ajustement d\'EBITDA, dis qui il avantage (acheteur ou vendeur) : ça montre que tu penses négociation.',
    'Un « non récurrent » présent chaque année est récurrent. Dis-le sans hésiter.',
    'Toujours préciser la base : HT ou TTC, 360 ou 365 jours, pré ou post-IFRS 16.',
    'Le peg protège l\'acheteur contre un vendeur qui gonfle sa trésorerie en tirant sur le NWC avant le closing.',
    'Les provisions se retiennent nettes d\'impôt si la charge sera déductible : 1 M€ à 25 % d\'IS = 0,75 M€.',
    'Un EBITDA qui ne se transforme pas en cash est le premier signal d\'un EBITDA de mauvaise qualité.',
    'IFRS 18 s\'applique aux exercices ouverts à compter du 1er janvier 2027 : prépare 3 phrases dessus.',
    'Locked box = certitude pour le vendeur ; completion accounts = protection pour l\'acheteur.',
    'Dans un cas pratique, garde 15 minutes pour la synthèse : c\'est elle que le manager lit en premier.',
    'Les synergies appartiennent à l\'acheteur : jamais dans l\'adjusted EBITDA de la cible.',
    'Cherche les debt-like dans l\'annexe, les PV d\'AG, les contrats et les balances âgées.',
    'Le cash nanti, les dépôts de garantie et le cash piégé à l\'étranger ne sont pas du cash libre.',
    'Pour « pourquoi le TS ? », évite de présenter le métier comme un tremplin : parle de ce qu\'il t\'apporte.',
    'Récite le pont EV → titres dans l\'ordre : EV − net debt − debt-like ± NWC − minoritaires + hors exploitation.',
    'Un CA de décembre anormalement élevé l\'année de la cession : demande les avoirs de janvier.',
    'Stand-alone costs : dans un carve-out, la filiale perd les services gratuits du groupe. Chiffre-les.',
  ],
  pe: [
    'Commence toujours une thèse par ta conclusion : « j\'investirais, parce que… ».',
    '2x en 5 ans ≈ 15 %, 2,5x ≈ 20 %, 3x ≈ 25 %. Récite-les jusqu\'à ce que ce soit automatique.',
    'Un comité préfère un dossier qui marche sans hausse du exit multiple.',
    'La dette amplifie le rendement… et les pertes. Dimensionne-la sur la prévisibilité du cash.',
    'Le build-up crée de la valeur par l\'arbitrage de multiples : add-on acheté 6x, valorisé 10x.',
    'Dans un paper LBO, annonce chaque résultat intermédiaire à voix haute.',
    'Prépare un deal que tu aurais aimé faire pour chaque fonds que tu rencontres.',
    'Un dividend recap optimise l’IRR et le DPI, pas le multiple.',
    'Le DPI (cash rendu) est devenu l\'indicateur que les LP regardent le plus.',
    'Concentration client et dépendance au fondateur : les deux red flags les plus fréquents en mid-cap.',
    'Sweet equity : les managers gagnent plus en multiple car le fonds porte la partie obligataire du risque.',
    'Continuation vehicle : le mot-clé est conflit d\'intérêts → test de prix indépendant et LPAC.',
    'Cite tes sources sur le marché : « d\'après le guide Chambers 2026, les build-ups font plus de 50 % des deals ».',
    'L’IRR seul peut tromper : 1,3x en 1 an fait 30 % de IRR mais peu de valeur créée.',
    'Pour un covenant : headroom = 1 − dette / (levier max × EBITDA).',
    'Un avis tranché vaut mieux qu\'un inventaire : go, go sous conditions, ou no-go.',
  ],
};
