// Secteurs utilisés par les études de cas générées (sociétés FICTIVES, ordres de grandeur réalistes du mid-market).
// marge = EBITDA margin, crois = croissance annuelle du revenue, mult = fourchette d’EV/EBITDA, capex = % du revenue,
// jours = DSO / DIO / DPO typiques, saison = amplitude de saisonnalité du NWC (0 = aucune).

export const SECTEURS = [
  {
    id: 'distribution', nom: 'Distribution B2B de fournitures industrielles', court: 'distribution B2B',
    activite: 'distribue 25 000 références (consommables, outillage, EPI) à 8 000 clients industriels via 14 agences',
    marge: [0.07, 0.10], crois: [0.03, 0.07], mult: [7, 9], capex: 0.012, jours: [55, 70, 60], saison: 0.08,
    kpi: ['marge brute par famille', 'Revenue par agence et par commercial', 'rotation des stocks', 'taux de service'],
    forces: ['marché fragmenté propice aux acquisitions (build-up)', 'base clients très dispersée', 'faible besoin d\'investissement'],
    risques: ['dépendance au cycle industriel', 'pression sur la marge brute (prix fournisseurs)', 'stocks à rotation lente / obsolètes'],
    leverages: ['build-up d\'agences régionales', 'e-commerce B2B', 'centralisation des achats'],
    motsRisques: ['cycl', 'marge brute', 'stock'],
  },
  {
    id: 'saas', nom: 'Éditeur de logiciel SaaS vertical (gestion des cabinets dentaires)', court: 'logiciel SaaS',
    activite: 'édite une plateforme SaaS utilisée par 3 200 cabinets en France et en Belgique, facturée par abonnement mensuel',
    marge: [0.22, 0.32], crois: [0.12, 0.22], mult: [13, 17], capex: 0.06, jours: [30, 0, 45], saison: 0.03,
    kpi: ['ARR et MRR', 'churn et rétention nette (NRR)', 'coût d\'acquisition client (CAC) vs valeur client (LTV)', 'part de R&D capitalisée'],
    forces: ['revenus récurrents par abonnement', 'coûts de changement élevés pour les clients', 'forte conversion de l\'EBITDA en cash'],
    risques: ['capitalisation des frais de R&D qui gonfle l\'EBITDA', 'concurrence de grands éditeurs', 'dépendance à quelques développeurs clés'],
    leverages: ['hausse des prix et ventes additionnelles (modules)', 'expansion européenne', 'acquisitions de petits éditeurs'],
    motsRisques: ['capitalis', 'r&d', 'churn'],
  },
  {
    id: 'industrie', nom: 'Fabricant de composants mécaniques de précision', court: 'industrie',
    activite: 'usine des pièces de précision pour l\'aéronautique (55 %) et le ferroviaire (45 %) sur 3 sites',
    marge: [0.11, 0.15], crois: [0.02, 0.06], mult: [6.5, 8.5], capex: 0.045, jours: [75, 90, 65], saison: 0.05,
    kpi: ['carnet de commandes', 'taux d\'utilisation des machines', 'coût matière et énergie', 'taux de rebut'],
    forces: ['savoir-faire certifié (barrières à l\'entrée)', 'contrats pluriannuels avec les donneurs d\'ordre', 'carnet de commandes de 14 mois'],
    risques: ['concentration clients (top 3 = 48 % du revenue)', 'besoin d\'investissement élevé', 'volatilité du prix des matières et de l\'énergie'],
    leverages: ['automatisation des lignes', 'diversification vers la défense', 'renégociation des clauses d\'indexation'],
    motsRisques: ['concentration', 'client', 'capex', 'matiere'],
  },
  {
    id: 'sante', nom: 'Réseau de laboratoires de biologie médicale', court: 'santé',
    activite: 'exploite 38 laboratoires de biologie médicale et 2 plateaux techniques en Auvergne-Rhône-Alpes',
    marge: [0.18, 0.24], crois: [0.02, 0.05], mult: [10, 13], capex: 0.035, jours: [40, 10, 55], saison: 0.04,
    kpi: ['nombre d\'actes par jour', 'valeur moyenne d\'un dossier', 'productivité par technicien', 'évolution de la nomenclature'],
    forces: ['demande non cyclique (vieillissement)', 'densité régionale qui crée des économies d\'échelle', 'marché en consolidation'],
    risques: ['baisses de tarifs décidées par l\'Assurance maladie', 'réglementation sur la détention du capital des laboratoires', 'pénurie de biologistes'],
    leverages: ['acquisitions de laboratoires indépendants', 'mutualisation des plateaux techniques', 'nouveaux tests spécialisés'],
    motsRisques: ['tarif', 'reglement', 'nomenclature'],
  },
  {
    id: 'services', nom: 'Services de maintenance technique multi-sites (CVC, électricité)', court: 'services B2B',
    activite: 'assure la maintenance des installations de chauffage, ventilation et électricité de 2 500 sites tertiaires',
    marge: [0.08, 0.11], crois: [0.05, 0.09], mult: [8, 10], capex: 0.015, jours: [80, 5, 50], saison: 0.06,
    kpi: ['part du revenue sous contrat récurrent', 'taux de renouvellement des contrats', 'Revenue par technicien', 'taux d\'intérim'],
    forces: ['65 % du revenue en contrats pluriannuels', 'réglementation qui rend la maintenance obligatoire', 'marché fragmenté'],
    risques: ['difficulté à recruter des techniciens', 'délais de paiement clients longs (NWC élevé)', 'dérive des coûts sur les contrats au forfait'],
    leverages: ['build-up régional', 'offre d\'efficacité énergétique (décret tertiaire)', 'hausse de prix indexée'],
    motsRisques: ['recrut', 'bfr', 'paiement', 'forfait'],
  },
  {
    id: 'agro', nom: 'Fabricant de produits traiteur frais pour la grande distribution', court: 'agroalimentaire',
    activite: 'produit des plats cuisinés frais vendus sous marques de distributeurs (70 %) et sous sa propre marque (30 %)',
    marge: [0.07, 0.10], crois: [0.02, 0.05], mult: [6, 8], capex: 0.035, jours: [45, 15, 60], saison: 0.10,
    kpi: ['volumes et mix produit', 'coût matière (inflation)', 'taux de service aux enseignes', 'part de la marque propre'],
    forces: ['positionnement sur un marché en croissance (plats frais)', 'outil industriel récent', 'relation de long terme avec les enseignes'],
    risques: ['pouvoir de négociation de la grande distribution', 'inflation des matières premières mal répercutée', 'risque sanitaire (rappel de produits)'],
    leverages: ['montée en gamme de la marque propre', 'export', 'productivité des lignes'],
    motsRisques: ['distribution', 'negociation', 'inflation', 'sanitaire'],
  },
  {
    id: 'education', nom: 'Groupe d\'écoles d\'enseignement supérieur privé', court: 'éducation',
    activite: 'gère 6 écoles (commerce, numérique, design) qui accueillent 7 500 étudiants dans 5 villes',
    marge: [0.16, 0.22], crois: [0.06, 0.11], mult: [10, 13], capex: 0.04, jours: [20, 0, 40], saison: 0.25,
    kpi: ['nombre d\'étudiants inscrits', 'prix moyen de la scolarité', 'taux de remplissage des campus', 'part de l\'alternance'],
    forces: ['NWC négatif (frais de scolarité encaissés d\'avance)', 'demande soutenue', 'visibilité sur l\'année scolaire'],
    risques: ['dépendance aux aides à l\'apprentissage (réforme possible)', 'réputation et accréditations', 'saisonnalité très forte de le cash'],
    leverages: ['ouverture de nouveaux campus', 'nouveaux programmes en ligne', 'acquisitions d\'écoles'],
    motsRisques: ['apprentissage', 'aide', 'accredit', 'saison'],
  },
  {
    id: 'tic', nom: 'Laboratoire d\'essais, d\'inspection et de certification (TIC)', court: 'essais et certification',
    activite: 'réalise des essais et inspections réglementaires (bâtiment, environnement, agroalimentaire) pour 12 000 clients',
    marge: [0.15, 0.20], crois: [0.05, 0.08], mult: [11, 14], capex: 0.04, jours: [70, 3, 45], saison: 0.04,
    kpi: ['croissance à périmètre constant', 'taux d\'occupation des ingénieurs', 'prix moyen par intervention', 'nouvelles accréditations'],
    forces: ['demande portée par la réglementation', 'clients très dispersés', 'accréditations difficiles à obtenir'],
    risques: ['recrutement d\'ingénieurs', 'perte d\'une accréditation', 'concurrence des grands groupes du secteur'],
    leverages: ['acquisitions de laboratoires régionaux', 'nouvelles normes environnementales', 'digitalisation des rapports'],
    motsRisques: ['recrut', 'accredit', 'concurren'],
  },
];

// Noms de sociétés FICTIVES
const DEBUTS = ['Novalis', 'Bréval', 'Ostral', 'Kerdis', 'Valmont', 'Arcadie', 'Lumis', 'Tessan', 'Orvia', 'Celtis', 'Marbeuf', 'Quarzo', 'Sylvane', 'Altéa', 'Bornéo', 'Vauban'];
const FINS = ['Groupe', 'Industries', 'Solutions', 'Services', 'SAS', 'Holding', 'Partners', 'Technologies'];
const VILLES = ['Lyon', 'Nantes', 'Lille', 'Bordeaux', 'Toulouse', 'Rennes', 'Strasbourg', 'Grenoble', 'Clermont-Ferrand', 'Rouen', 'Dijon', 'Angers'];

export function societe(r, secteur) {
  return {
    nom: `${r.choix(DEBUTS)} ${r.choix(FINS)}`,
    ville: r.choix(VILLES),
    creation: r.entier(1978, 2014),
    effectif: r.entier(120, 900),
    secteur,
  };
}
