// TS — Fit et motivation
import { q, theme } from '../fabriques.js';

export default theme('ts', 'fit', [
  // ------------------------------------------------------------------ FACILE
  q('101', 1, `Présente-toi en 2 minutes.`, {
    duree: 120,
    courte: `<p>Quatre temps, 90 à 120 secondes : <strong>accroche</strong> (qui tu es en une phrase), <strong>parcours</strong> (2-3 étapes avec une réalisation chiffrée chacune), <strong>déclic pour le Transaction Services</strong>, <strong>pourquoi ce poste, ici, maintenant</strong>.</p>`,
    complete: `<ul><li>Fil rouge : chaque étape doit mener logiquement au TS (analyse financière, deals, rigueur).</li><li>Preuve de motivation : ta veille hebdomadaire de deals (une analyse par semaine publiée sur LinkedIn) montre que tu suis le marché et que tu sais analyser une opération.</li><li>Pas de récitation du CV : on choisit ce qui sert le message.</li></ul>`,
    pieges: [`Dépasser 2 minutes.`, `Raconter sa vie chronologiquement sans message.`],
    conseil: `Chronomètre-toi et répète à voix haute jusqu'à ce que ce soit fluide sans être récité (onglet « Mon pitch »).`,
    points: [[`Accroche / fil rouge`, ['parcours', 'formation', 'ecole', 'diplome']], [`Réalisations concrètes`, ['realis', 'projet', 'mission', '%']], [`Lien logique avec le TS`, ['transaction services', 'ts', 'due diligence', 'deal']], [`Pourquoi ce poste / cabinet`, ['poste', 'cabinet', 'equipe', 'rejoindre']]],
  }),
  q('102', 1, `Pourquoi le Transaction Services ?`, {
    courte: `<p>Trois raisons + une preuve : être <strong>au cœur des deals</strong> et voir l'impact direct de l'analyse sur un prix ; un métier d'<strong>analyse financière exigeante</strong> (Quality of Earnings, NWC, net debt) qui forme vite ; la <strong>variété</strong> (secteurs, clients, missions courtes). Preuve : un exemple de ta veille de deals où l'adjusted EBITDA faisait toute la différence.</p>`,
    complete: `<ul><li>Montrer que tu sais ce qu'est le métier au quotidien (data room, databook, entretiens DAF, rapport).</li><li>Relier à tes compétences (comptabilité, Excel, rigueur, communication).</li></ul>`,
    pieges: [`Présenter le TS comme un simple tremplin vers le private equity.`, `Réponse générique (« j'aime la finance »).`],
    points: [[`Au cœur des deals / impact sur le prix`, ['deal', 'transaction', 'prix', 'impact']], [`Analyse financière exigeante`, ['analyse', 'rigueur', 'comptab', 'qoe', 'ebitda']], [`Variété / apprentissage rapide`, ['variete', 'secteur', 'apprend']], [`Exemple personnel`, ['exemple', 'veille', 'stage', 'experience']]],
  }),
  q('103', 1, `Pourquoi notre cabinet plutôt qu'un autre ?`, {
    courte: `<p>Des <strong>faits précis</strong> : taille et positionnement de l'équipe TS (Big 4 ou indépendant), types de clients (fonds mid-cap, corporates), secteurs forts, deals récents publics ; une <strong>rencontre</strong> avec un collaborateur ; la <strong>culture</strong> et la formation ; l'<strong>adéquation</strong> avec ton projet.</p>`,
    complete: `<ul><li>Prépare une fiche par cabinet : 3 deals récents, 2 personnes rencontrées, 1 élément différenciant.</li><li>Big 4 : formation structurée, grands dossiers, réseau international. Indépendants : équipes plus petites, responsabilités plus tôt, forte clientèle de fonds.</li></ul>`,
    pieges: [`Réponse interchangeable entre cabinets.`],
    points: [[`Faits spécifiques (équipe, clients, deals)`, ['equipe', 'client', 'deal', 'secteur', 'fonds']], [`Rencontre`, ['rencontr', 'echange', 'collaborat']], [`Culture / formation`, ['culture', 'formation', 'staffing']], [`Adéquation avec ton projet`, ['projet', 'correspond', 'adequation']]],
  }),
  q('104', 1, `Quelles sont tes principales qualités, et un défaut ?`, {
    courte: `<p><strong>Deux qualités utiles en TS</strong> (rigueur, résistance à la pression, esprit de synthèse, curiosité), chacune illustrée par un <strong>exemple vécu</strong> ; <strong>un défaut réel mais non rédhibitoire</strong>, avec ce que tu fais pour le corriger.</p>`,
    pieges: [`« Je suis trop perfectionniste » sans preuve ni correction.`],
    points: [[`Qualités utiles en TS`, ['rigueur', 'synthese', 'curio', 'pression', 'organis']], [`Exemples concrets`, ['exemple', 'lors de', 'quand']], [`Défaut réel`, ['defaut']], [`Correction`, ['corrig', 'travaille', 'progress', 'desormais']]],
  }),
  q('105', 1, `Où te vois-tu dans 5 ans ?`, {
    courte: `<p>Une ambition <strong>cohérente avec le poste</strong> : avoir progressé (senior puis manager), être autonome sur des missions, encadrer des juniors, avoir construit une <strong>expertise sectorielle</strong>. Rester honnête sans annoncer un départ.</p>`,
    points: [[`Progression dans le métier`, ['senior', 'manager', 'progress', 'evolu']], [`Expertise sectorielle`, ['expertise', 'secteur', 'specialis']], [`Encadrement`, ['encadr', 'equipe', 'responsabil']], [`Cohérence avec le poste`, ['ts', 'transaction', 'cabinet']]],
  }),
  q('106', 1, `As-tu des questions pour nous ?`, {
    duree: 90,
    courte: `<p>Toujours oui, avec <strong>3 questions préparées</strong> et adaptées à l'interlocuteur : staffing et formation des juniors, type de missions et de clients, ce qui distingue un junior qui réussit, une question d'actualité (IFRS 18, IA dans la DD) pour un associé.</p>`,
    complete: `<ul><li>« Comment se passe le staffing des juniors : buy-side, VDD, mix sectoriel ? »</li><li>« Quelle part de votre activité vient de fonds mid-cap, et comment évolue-t-elle ? »</li><li>« Qu'est-ce qui distingue un junior qui réussit très bien la première année ? »</li></ul>`,
    pieges: [`Ne pas avoir de question.`, `Demander ce qui est sur le site.`, `Parler salaire ou vacances au premier entretien.`],
    points: [[`Au moins 2 questions préparées`, ['?']], [`Sur le quotidien / staffing`, ['staffing', 'mission', 'formation', 'quotidien']], [`Sur l'activité / le marché`, ['activite', 'marche', 'client', 'fonds']], [`Sur la réussite`, ['reussi', 'evolution', 'progress']]],
  }),
  q('107', 1, `Pourquoi le TS plutôt que l'audit ?`, {
    courte: `<p>L'audit est tourné vers la <strong>conformité et le passé</strong> ; le TS vers la <strong>valeur, le prix et la décision</strong>. Le rythme deal (missions courtes, enjeux immédiats, contact avec des fonds et des dirigeants) et l'analyse <strong>économique</strong> (récurrence, normalisation, business plan) me correspondent — en respectant l'audit, qui est la base technique sur laquelle s'appuie le TS.</p>`,
    points: [[`Conformité vs valeur / décision`, ['conformit', 'valeur', 'decision', 'prix']], [`Rythme deal`, ['rythme', 'court', 'deal']], [`Analyse économique`, ['economique', 'business plan', 'normatif', 'recurren']], [`Respect de l'audit`, ['respect', 'base', 'technique']]],
  }),
  q('108', 1, `Les périodes de deals impliquent des horaires lourds. Comment le vis-tu ?`, {
    courte: `<p>Avec lucidité : tu connais le rythme (pics avant les remises de rapport), tu l'as déjà vécu (exemple), tu sais t'organiser pour tenir (priorités, sport, sommeil) et tu sais signaler à temps quand une charge devient impossible pour que l'équipe s'organise.</p>`,
    points: [[`Lucidité sur le rythme`, ['rythme', 'pic', 'charge', 'horaire']], [`Exemple vécu`, ['exemple', 'deja', 'stage', 'experience']], [`Organisation`, ['organis', 'priorit', 'equilibre', 'sport']], [`Communication avec l'équipe`, ['equipe', 'signal', 'communiq']]],
  }),

  // ------------------------------------------------------------------ MOYEN
  q('201', 2, `Parle-moi d'un deal récent qui t'a intéressé.`, {
    duree: 150,
    courte: `<p>Six points en 2 minutes : <strong>acteurs et type d'opération</strong> ; <strong>chiffres</strong> publics (valeur, multiple) ; <strong>logique stratégique</strong> ; <strong>structuration</strong> (financement, rollover) ; <strong>angle TS</strong> (ce que tu aurais regardé en due diligence : récurrence de l'EBITDA, NWC, debt-like) ; <strong>ton avis</strong>.</p>`,
    complete: `<p>Utilise un deal de ta Veille de deal (exercice « Pitch d'un deal ») : tu as déjà l'analyse. L'angle TS fait la différence : « j'aurais regardé la saisonnalité du NWC et les earn-outs des acquisitions passées ».</p>`,
    points: [[`Acteurs et type d'opération`, ['acheteur', 'vendeur', 'fonds', 'lbo', 'cible']], [`Chiffres`, ['valeur', 'multiple', 'm€', 'millions', 'ebitda']], [`Logique stratégique`, ['strateg', 'logique', 'pourquoi', 'synergie']], [`Angle TS`, ['due diligence', 'dd', 'ebitda', 'nwc', 'debt']], [`Avis`, ['avis', 'je pense', 'selon moi']]],
  }),
  q('202', 2, `Raconte une situation où tu as dû gérer une forte charge de travail avec une échéance serrée.`, {
    courte: `<p>Méthode <strong>STAR</strong> : Situation (contexte en une phrase), Tâche (ce qui était attendu, l'échéance), <strong>Action</strong> (ce que TU as fait : priorisation, organisation, communication avec ton responsable), Résultat (chiffré si possible) et leçon.</p>`,
    points: [[`Situation et enjeu`, ['situation', 'contexte', 'echeance', 'deadline']], [`Actions personnelles`, ['j ai', 'je ']], [`Priorisation / communication`, ['priori', 'organis', 'communiq']], [`Résultat et leçon`, ['resultat', 'appris', 'lecon']]],
  }),
  q('203', 2, `Tu découvres une erreur dans un rapport déjà envoyé au client. Que fais-tu ?`, {
    courte: `<p>J'<strong>alerte immédiatement</strong> mon manager, je <strong>mesure l'impact</strong> (chiffre concerné, conséquence sur les conclusions : prix, net debt), je <strong>propose la correction</strong> ; le manager ou l'associé informe le client (la transparence protège la relation) ; j'en tire une <strong>leçon</strong> de process (revue croisée, check-list).</p>`,
    pieges: [`Corriger en silence.`, `Contacter le client sans le manager.`],
    points: [[`Alerter immédiatement`, ['alert', 'manager', 'immediat']], [`Mesurer l'impact`, ['impact', 'mesur', 'quantif']], [`Proposer la correction`, ['corrig', 'propos']], [`Transparence avec le client`, ['client', 'transparen']], [`Leçon de process`, ['revue', 'controle', 'lecon', 'process']]],
  }),
  q('204', 2, `Qu'est-ce qu'un bon rapport de due diligence, selon toi ?`, {
    courte: `<p>Un rapport <strong>orienté décision</strong> : un executive summary qui donne en 2 pages les messages chiffrés (adjusted EBITDA, net debt, NWC, red flags) et leur <strong>impact prix / SPA</strong> ; hiérarchisé par materiality ; clair ; <strong>traçable</strong> (chaque chiffre renvoie au databook) ; honnête sur ses <strong>limites</strong>.</p>`,
    points: [[`Executive summary orienté décision`, ['executive summary', 'synthese', 'decision']], [`Impact prix / SPA`, ['prix', 'impact', 'spa']], [`Materiality / hiérarchie`, ['materialit', 'hierarch']], [`Traçabilité`, ['databook', 'source', 'tracab']], [`Limites`, ['limit', 'scope']]],
  }),
  q('205', 2, `Big 4 ou cabinet indépendant : pourquoi ce choix ?`, {
    courte: `<p>Argumente selon ce que <strong>tu</strong> recherches. <strong>Big 4</strong> : formation structurée, grands dossiers et cross-border, réseau, marque. <strong>Indépendant</strong> : équipes plus petites, responsabilités plus tôt, forte clientèle de fonds mid-cap, polyvalence. Montre que ton choix est réfléchi et cohérent avec ton projet.</p>`,
    pieges: [`Dénigrer l'autre modèle.`],
    points: [[`Arguments Big 4`, ['big 4', 'formation', 'reseau', 'international']], [`Arguments indépendant`, ['independant', 'responsabil', 'petite', 'mid-cap']], [`Lien avec ton projet`, ['projet', 'moi', 'je cherche']]],
  }),
  q('206', 2, `Comment travailles-tu en équipe sous pression ?`, {
    courte: `<p>Un exemple STAR qui montre : <strong>clarification</strong> des priorités avec le manager, <strong>communication</strong> proactive (points d'avancement, alertes tôt), <strong>entraide</strong> (reprendre une tâche d'un collègue), et le <strong>résultat</strong> obtenu.</p>`,
    points: [[`Clarifier les priorités`, ['priorit', 'clarif']], [`Communication proactive`, ['communiq', 'alert', 'point']], [`Entraide`, ['aide', 'equipe', 'collegue']], [`Résultat`, ['resultat', 'livr']]],
  }),

  // ------------------------------------------------------------------ DIFFICILE
  q('301', 3, `Pourquoi pas directement le M&A ou le private equity ?`, {
    courte: `<p>Parce que le TS m'apporte ce que je veux maîtriser d'abord : <strong>comprendre en profondeur la qualité d'une société</strong> (Quality of Earnings, cash, dette) et son impact sur le prix — la base de tout jugement d'investissement. C'est un métier à part entière, avec une vraie expertise et une évolution, pas un détour.</p>`,
    complete: `<ul><li>Montrer du respect pour le M&A et le PE sans en faire ta destination affichée.</li><li>Mettre en avant ce que le TS a de spécifique : profondeur d'analyse, contact avec des fonds, impact concret sur les deals.</li></ul>`,
    pieges: [`Dire « le TS est un tremplin vers le PE » : le recruteur craint un départ rapide.`],
    points: [[`Maîtriser la qualité d'une société / cash / dette`, ['qualite', 'qoe', 'cash', 'dette', 'profondeur']], [`Impact sur le prix`, ['prix', 'impact']], [`Métier à part entière`, ['metier', 'expertise', 'evolution']], [`Pas un tremplin`, ['tremplin', 'detour']]],
  }),
  q('302', 3, `Convaincs-moi en 1 minute que tu seras opérationnel vite.`, {
    duree: 60,
    courte: `<p>Trois preuves concrètes : <strong>bases techniques</strong> (tu peux expliquer adjusted EBITDA, NWC peg, debt-like items, locked box), <strong>pratique</strong> (ta veille hebdomadaire de deals, tes outils Excel, tes expériences), <strong>savoir-être</strong> (rigueur, résistance, communication) — puis une phrase d'engagement.</p>`,
    points: [[`Bases techniques`, ['ebitda', 'nwc', 'peg', 'debt', 'locked']], [`Pratique / veille / Excel`, ['veille', 'excel', 'experience', 'deal']], [`Savoir-être`, ['rigueur', 'pression', 'communic']], [`Engagement`, ['engag', 'operationnel', 'vite']]],
  }),
  q('303', 3, `Ton manager veut retenir un adjustment que tu trouves non défendable. Que fais-tu ?`, {
    courte: `<p>Je prépare des <strong>faits</strong> (historique, documents, impact chiffré), j'en parle avec lui <strong>en privé</strong>, j'<strong>écoute</strong> son raisonnement (il a souvent plus de contexte client), je propose une alternative (présenter l'adjustment séparément, avec ses limites). Si le désaccord persiste sur un point important, on peut solliciter l'associé ; une fois la décision prise, je l'applique.</p>`,
    points: [[`Faits et chiffres`, ['fait', 'chiffre', 'document', 'historique']], [`Échange en privé / écoute`, ['prive', 'ecout', 'contexte']], [`Alternative de présentation`, ['alternati', 'separ', 'limite']], [`Escalade mesurée puis application`, ['associe', 'decision', 'appliqu']]],
  }),
]);
