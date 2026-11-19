/* ============================================================
   Toutes les données du portfolio sont ici.
   - Ajouter un projet : copie un bloc dans "projects" (le slug devient
     l'adresse de sa page : projet.html#mon-slug).
   - Ajouter une image à un projet : mets le fichier dans assets/projects/
     puis renseigne  image: "assets/projects/mon-image.jpg"
     (et, si tu veux, une galerie :  gallery: ["assets/projects/a.jpg", ...]).
   - Ajouter un certificat : copie un bloc dans "certs".
   Catégories : sec = Cybersécurité · net = Systèmes & réseaux
                dev = Développement · ml = Machine learning & data
   ============================================================ */
window.PORTFOLIO = {
  person: {
    name: "Tchedre Aboudoul-Koudouse",
    short: "Koudousse",
    city: "Kara, Togo",
    email: "koudousetchedre@gmail.com",
    phone: "+228 90 15 96 39",
    phoneHref: "+22890159639",
    linkedin: "https://www.linkedin.com/in/koudousse-tchedre-134711397",
    github: "https://github.com/koudousse-ab",
    // Remplace par "assets/CV-Tchedre-Aboudoul-Koudouse.pdf" quand tu ajoutes ton CV dans assets/.
    cv: "https://tchedre-aboudoul-portfolio.lovable.app/__l5e/assets-v1/c5a3e1d2-7b52-40e4-afd1-9058236c2f1e/CV-Tchedre-Aboudoul-Koudouse.pdf"
  },

  domains: [
    {
      id: "sec", code: "SEC", name: "Cybersécurité",
      text: "Tests d'intrusion en laboratoire, audit de réseaux et de partages, durcissement des accès et des déploiements. Je travaille depuis Kali Linux contre des machines Windows et Linux montées pour l'exercice.",
      groups: [
        { label: "Offensif", items: ["Kali Linux", "Nmap", "Énumération SMB", "OSINT"] },
        { label: "Défensif", items: ["Clés SSH ed25519", "Hachage bcrypt", "Signature Ed25519", "Port limité à 127.0.0.1"] },
        { label: "Livrables", items: ["Rapport d'audit", "Preuves et journal d'actions", "Script Python d'analyse"] }
      ]
    },
    {
      id: "net", code: "NET", name: "Systèmes & réseaux",
      text: "Windows Server et Active Directory, Linux Ubuntu, VLAN, routage inter-VLAN, NAT et ACL. Je monte mes laboratoires sur Packet Tracer, GNS3 et VirtualBox.",
      groups: [
        { label: "Systèmes", items: ["Windows Server", "Active Directory", "GPO", "Ubuntu", "GLPI"] },
        { label: "Réseaux", items: ["Cisco", "VLAN", "Inter-VLAN", "OSPF", "NAT", "ACL"] },
        { label: "Laboratoires", items: ["GNS3", "Packet Tracer", "VirtualBox", "VM Azure"] }
      ]
    },
    {
      id: "dev", code: "DEV", name: "Développement",
      text: "Applications de bureau, services web et API pour l'éducation et le secteur public togolais, de l'interface Tkinter jusqu'au déploiement sur Render. Le développement revient dans tous mes projets, alors je le fais sérieusement.",
      groups: [
        { label: "Langages", items: ["Python", "Java", "JavaScript", "SQL", "Bash", "PowerShell"] },
        { label: "Frameworks", items: ["Flask", "FastAPI", "Spring Boot", "React", "Node.js", "Tkinter"] },
        { label: "Outils", items: ["Docker", "Git", "Render", "ReportLab", "pytest"] }
      ]
    },
    {
      id: "ml", code: "ML", name: "Machine learning & data",
      text: "Appris au Togo AI Summer School 2026 (Togo AI Lab, Université de Lomé) : préparation de données, segmentation client, vision par ordinateur et données satellite.",
      groups: [
        { label: "Méthodes", items: ["K-means", "Segmentation RFM", "CNN", "Prédiction par préfecture"] },
        { label: "Outils", items: ["Python", "pandas", "PyTorch", "Jupyter", "Streamlit"] },
        { label: "Données", items: ["Images satellite Planet", "Données géospatiales", "Données ouvertes"] }
      ]
    }
  ],

  projects: [
    {
      slug: "gestion-scolaire",
      title: "Gestion Scolaire",
      kicker: "Lycée Technique de Bangeli · établissements secondaires togolais",
      type: "Application de bureau",
      cats: ["dev"],
      featured: true,
      summary: "Application de bureau pour la scolarité : inscriptions, saisie des notes, bulletins PDF, examens blancs sur plusieurs classes et tableau de bord statistique.",
      context: "Logiciel pensé pour les collèges et lycées du Togo, dans le cadre d'un projet porté pour le Ministère de l'Éducation nationale. Il remplace les registres et les tableurs dispersés par une seule base de la scolarité, utilisable par une secrétaire seule.",
      done: [
        "Inscriptions, classes, matières et coefficients, saisie des notes d'interrogation et de composition.",
        "Bulletins PDF, avec les matières scientifiques regroupées avant les matières littéraires, et archive filtrable.",
        "Examens blancs qui combinent des élèves de plusieurs classes, avec un classement général continu et un détail par classe et par sexe (effectif, admis, taux de réussite, moyenne). Export PDF et Excel.",
        "Module de promotion de fin d'année réécrit.",
        "Tableau de bord : répartition par sexe, moyenne par classe, distribution des notes et évolution par période, avec des graphiques matplotlib intégrés à Tkinter.",
        "Deux thèmes à bascule (clair et sombre) avec une palette centralisée, et une aide avec assistant FAQ fonctionnant hors ligne."
      ],
      tech: [
        "Mots de passe migrés d'un SHA-256 sans sel vers bcrypt, mis à niveau automatiquement à la première connexion.",
        "Licence signée en Ed25519 : la clé publique est dans l'application, la clé privée reste dans un outil d'administration hors ligne.",
        "Identifiant machine mémorisé dans un fichier pour que la licence reste stable d'un démarrage à l'autre.",
        "Suite de tests pytest, serveurs Flask déployés sur Render avec gunicorn et eventlet."
      ],
      stack: ["Python", "Tkinter", "SQLAlchemy", "ReportLab", "Flask", "matplotlib", "bcrypt", "pytest"]
    },
    {
      slug: "missionflow",
      title: "MissionFlow",
      kicker: "Cabinet ACTe · stage en équipe de trois",
      type: "Application web et mobile",
      cats: ["dev"],
      featured: true,
      summary: "Gestion des projets, des tâches et du programme hebdomadaire des collaborateurs d'un cabinet, avec rapports PDF.",
      context: "Application réalisée pendant mon stage au Cabinet ACTe, en équipe de trois, pour que les collaborateurs et la direction suivent les projets, les tâches et le programme de la semaine au même endroit. Le stage a donné lieu à un rapport.",
      done: [
        "Suivi des projets et des tâches, et programme hebdomadaire par collaborateur.",
        "Ciblage par groupes (classe, session, grade) et affectation d'un cours à plusieurs cibles à la fois.",
        "Génération de rapports PDF.",
        "Interface avec barre latérale repliable.",
        "Refonte de l'architecture après les premiers retours."
      ],
      tech: [
        "API Spring Boot et interface React.",
        "Déploiement sur Render."
      ],
      stack: ["Spring Boot", "React", "Render", "PDF"]
    },
    {
      slug: "kondji-pacs",
      title: "Kondji-PACS",
      kicker: "Téléradiologie · Togo",
      type: "Passerelle de données médicales",
      cats: ["dev", "sec"],
      featured: true,
      summary: "Passerelle PACS pour la téléradiologie : pipeline DICOM avec pseudonymisation des patients et compression JPEG 2000.",
      context: "Les images médicales contiennent des données de patients. Cette passerelle reçoit des examens DICOM, retire l'identité des patients avant l'envoi et réduit le poids des images pour les connexions limitées.",
      done: [
        "Pipeline de traitement DICOM de bout en bout.",
        "Pseudonymisation des champs d'identité des patients.",
        "Compression JPEG 2000 des images.",
        "Pile Docker Compose complète : base de séries temporelles, cache et gestionnaire de secrets."
      ],
      tech: [
        "Secrets gérés par Vault plutôt que dans des fichiers de configuration.",
        "TimescaleDB pour l'historique et Redis pour le cache, orchestrés avec Docker Compose."
      ],
      stack: ["FastAPI", "Docker Compose", "TimescaleDB", "Redis", "Vault", "DICOM"]
    },
    {
      slug: "devisbtp",
      title: "DevisBTP",
      kicker: "Génie civil · Togo",
      type: "Application de bureau",
      cats: ["dev"],
      summary: "Génération de devis du bâtiment en FCFA, avec TVA à 18 % et export PDF dans le format d'une société de BTP.",
      context: "Les devis du bâtiment sont longs à composer et doivent suivre un format précis. L'application garde les prix et produit un devis PDF conforme à la présentation d'une société du BTP.",
      done: [
        "Prix en FCFA, TVA de 18 % et totaux calculés automatiquement.",
        "Devis PDF reprenant la mise en page d'une société existante (SNC SARLU).",
        "Base SQLite locale, interface à panneaux redimensionnables."
      ],
      tech: [
        "Refonte de la mise en page à panneaux (PanedWindow) pour un affichage stable.",
        "Correction de bugs de widgets parent-enfant propres à Tkinter."
      ],
      stack: ["Python", "Tkinter", "SQLite", "ReportLab"]
    },
    {
      slug: "tenezus",
      title: "Tenezus",
      kicker: "Plateforme universitaire · projet d'équipe",
      type: "Projet d'équipe",
      cats: ["dev", "net"],
      summary: "Annonces, messagerie et emplois du temps pour étudiants et administration. J'ai monté la base de données sur une VM Azure.",
      context: "Application pour les étudiants et l'administration : inscription et connexion avec rôles étudiant et admin, annonces, messagerie entre étudiants, emplois du temps et cours. Ma part : la base de données et son hébergement.",
      done: [
        "PostgreSQL 16 lancé dans Docker sur une VM Azure Linux, avec volume dédié.",
        "Base « tenezus » de 9 tables et rôle applicatif distinct, testé.",
        "Première sauvegarde pg_dump réalisée.",
        "Documentation PDF de la journée, envoyée à l'équipe."
      ],
      tech: [
        "Port PostgreSQL lié à 127.0.0.1 : la base n'est jamais exposée sur Internet.",
        "Rôle applicatif séparé de l'administrateur de la base.",
        "Stack prévue : Node.js/Express, React (Vite), Nginx, puis migration vers un VPS Contabo."
      ],
      stack: ["PostgreSQL", "Docker", "Node.js", "React", "Azure", "Caddy"]
    },
    {
      slug: "audit-ethical-hacking",
      title: "Audit d'une entreprise fictive",
      kicker: "TP intégrateur Ethical Hacking · Cisco NetAcad",
      type: "Travaux pratiques",
      cats: ["sec"],
      summary: "Laboratoire à deux machines virtuelles (Kali et Windows 10) : scans Nmap, énumération SMB, script d'analyse et rapport.",
      context: "Audit guidé d'une entreprise imaginaire, « Togo Services Numériques », en binôme. Le but est de suivre toute la démarche : préparer le laboratoire, scanner, trouver les failles, prouver et rédiger.",
      done: [
        "Laboratoire sur réseau interne : Kali en 192.168.56.10 et Windows 10 en 192.168.56.20.",
        "Kali configuré avec deux interfaces (NAT et réseau hôte uniquement), IP statique via NetworkManager.",
        "Outils : Nmap, smbclient et Python 3.",
        "Livrables attendus : rapport Word et PDF, preuves, scans Nmap, script analyse_nmap.py et journal d'actions."
      ],
      tech: [
        "Réseau hôte uniquement : les machines vulnérables ne sont pas accessibles depuis Internet.",
        "Script Python pour analyser automatiquement les sorties de Nmap."
      ],
      stack: ["Kali Linux", "Nmap", "SMB", "Python", "VirtualBox"]
    },
    {
      slug: "deploiement-git-push",
      title: "Déploiement sécurisé sur git push",
      kicker: "TP DevSecOps · Ubuntu + Kali",
      type: "Travaux pratiques",
      cats: ["sec", "net"],
      summary: "Un push depuis la VM Kali met en ligne le site sur le serveur Ubuntu, par clé SSH dédiée et tunnel SSH.",
      context: "Chapitre 2 du cours « Sécurité DevOps : du git push au pipeline ». Mon PC Ubuntu joue le rôle de serveur et la VM Kali celui du client, sur le site fictif « Délices de Bè ».",
      done: [
        "Dépôt Git central côté serveur et releases versionnées.",
        "Réseau dédié entre les deux machines : adaptateur hôte uniquement en 192.168.57.0/24.",
        "Alias SSH pour pousser vers le serveur en une commande.",
        "Premier déploiement (v1) réussi le 18 novembre 2026, site servi à travers un tunnel SSH."
      ],
      tech: [
        "Clé SSH ed25519 dédiée au déploiement, séparée de mes autres clés.",
        "Le site n'est pas exposé : il se consulte à travers un tunnel SSH."
      ],
      stack: ["Git", "SSH", "Bash", "Linux", "VirtualBox"]
    },
    {
      slug: "reseau-gns3",
      title: "Réseau d'entreprise sur GNS3",
      kicker: "TogoTech SARL · exercice",
      type: "Travaux pratiques",
      cats: ["net"],
      summary: "Réseau d'entreprise segmenté en VLAN, avec routage inter-VLAN, NAT et listes de contrôle d'accès.",
      context: "Exercice de conception d'un réseau pour une entreprise fictive, TogoTech SARL : séparer les services, les faire communiquer de façon contrôlée et donner accès à Internet.",
      done: [
        "Segmentation en VLAN par service.",
        "Routage inter-VLAN.",
        "NAT pour l'accès à Internet.",
        "ACL pour limiter ce que chaque VLAN peut atteindre.",
        "Documentation de l'exercice dans un rapport PDF."
      ],
      tech: [
        "Les ACL appliquent le principe du moindre privilège entre les VLAN."
      ],
      stack: ["GNS3", "Cisco", "VLAN", "NAT", "ACL"]
    },
    {
      slug: "dashboard-energie-togo",
      title: "Tableau de bord énergie du Togo",
      kicker: "Hackathon · énergies propres et forêts",
      type: "Hackathon",
      cats: ["ml"],
      summary: "Tableau de bord interactif sur l'accès à l'électricité, les énergies propres, les forêts et les émissions de gaz à effet de serre.",
      context: "Hackathon sur l'accès à l'électricité au Togo, les énergies propres, la protection des forêts et l'objectif national de 2030. Il fallait livrer un tableau de bord interactif et un rapport de dix diapositives.",
      done: [
        "Six jeux de données nettoyés : accès à l'électricité, CO₂ du secteur énergie, émissions par secteur, énergies renouvelables, températures de dix villes (2013-2019) et 53 zones protégées avec leurs géométries.",
        "Application Streamlit de sept pages, avec cartes d'indicateurs, filtres et carte des zones protégées.",
        "Thème personnalisé et navigation soignée.",
        "Rapport PowerPoint de dix diapositives."
      ],
      tech: [
        "Choix de rester en Python pur, sans Power BI.",
        "Travail guidé par le barème du hackathon : ergonomie, pertinence des analyses, richesse des interactions et qualité du rapport."
      ],
      stack: ["Python", "Streamlit", "Données ouvertes", "GeoJSON"]
    },
    {
      slug: "rendement-agricole",
      title: "Prédiction de rendements agricoles",
      kicker: "TAISS 2026 · TP",
      type: "Travaux pratiques",
      cats: ["ml"],
      summary: "Rendements FEWS NET par préfecture rapprochés de features trimestrielles issues d'images satellite Planet.",
      context: "TP du parcours Data Science du Togo AI Summer School. L'objectif est de relier ce que voit un satellite à ce que les agriculteurs récoltent, préfecture par préfecture.",
      done: [
        "Chargement et compréhension de trois sources : limites administratives GADM (niveau préfecture), rendements FEWS NET 2016-2019 pour 13 cultures et features satellite Planet.",
        "Features de 4 trimestres par préfecture et par année, avec environ 4 000 points par préfecture.",
        "Notebook de préparation des données (featuring)."
      ],
      tech: [
        "Priorité donnée à la démarche : comprendre pourquoi chaque étape est faite avant de lancer le code.",
        "Jointure de données géospatiales et tabulaires à l'échelle de la préfecture."
      ],
      stack: ["Python", "Jupyter", "Données géospatiales", "pandas"]
    },
    {
      slug: "segmentation-rfm",
      title: "Segmentation client RFM",
      kicker: "TAISS 2026 · TP2 · filière Data Science",
      type: "Travaux pratiques",
      cats: ["ml"],
      summary: "Récence, fréquence, montant puis K-means pour regrouper les clients d'un site de vente en ligne.",
      context: "TP2 de la filière Data Science : regrouper des clients selon leurs habitudes d'achat pour adapter l'action commerciale à chaque groupe.",
      done: [
        "Notebook 1 : nettoyage du jeu online_retail_II.",
        "Notebook 2 : construction des variables Récence, Fréquence et Montant, passage au logarithme et standardisation.",
        "Notebook 3 : choix du nombre de clusters.",
        "Notebook 4 : description des segments obtenus."
      ],
      tech: [
        "Transformation logarithmique pour limiter l'effet des gros acheteurs avant la standardisation."
      ],
      stack: ["Python", "pandas", "K-means", "Jupyter"]
    },
    {
      slug: "fissures-beton",
      title: "Détection de fissures dans le béton",
      kicker: "Vision par ordinateur · TP",
      type: "Travaux pratiques",
      cats: ["ml"],
      summary: "Classification binaire fissure / non-fissure sur environ 40 000 images avec un CNN écrit en PyTorch.",
      context: "Contrôler automatiquement l'état d'une structure en béton : dire, à partir d'une photo, s'il y a une fissure. Dataset « Concrete Crack Images for Classification », deux classes équilibrées.",
      done: [
        "CNN à trois blocs convolutifs (Conv2d, BatchNorm, ReLU, MaxPool).",
        "Images redimensionnées en 128×128, découpage stratifié 70/15/15.",
        "Notebook de 18 sections et réponses à 10 questions de synthèse."
      ],
      tech: [
        "Convention 1 = fissure, 0 = pas de fissure.",
        "Découpage stratifié pour garder l'équilibre des classes dans chaque jeu."
      ],
      stack: ["PyTorch", "CNN", "Jupyter", "Python"]
    }
  ],

  certs: [
    {
      id: "hacker-ethique",
      title: "Hacker éthique",
      issuer: "Cisco Networking Academy",
      date: "2026-11-07",
      detail: "ID 059307c5-48e7-46d4-8a93-e3c4cf852629",
      cats: ["sec"],
      thumb: "assets/certs/hacker-ethique-cisco.jpg",
      full: "assets/certs/hacker-ethique-cisco.jpg",
      pdf: "assets/certs/hacker-ethique-cisco.pdf"
    },
    {
      id: "taiss-2026",
      title: "Parcours Data Science · Togo AI Summer School",
      issuer: "Togo AI Lab · Université de Lomé (UniPod)",
      date: "2026-08-29",
      dateLabel: "24 – 29 août 2026",
      detail: "Attestation de participation",
      cats: ["ml"],
      thumb: "assets/certs/taiss-2026-attestation.jpg",
      full: "assets/certs/taiss-2026-attestation.jpg",
      pdf: "assets/certs/taiss-2026-attestation.pdf"
    },
    {
      id: "ccsc",
      title: "Cybersecurity Career Starter Certification (CCSC)",
      issuer: "Hack & Fix Academy",
      date: "2025-12-25",
      detail: "ID 4030-5461-1375-2888",
      cats: ["sec"],
      thumb: "assets/certs/ccsc-hack-and-fix.jpg",
      full: "assets/certs/ccsc-hack-and-fix.jpg",
      pdf: "assets/certs/ccsc-hack-and-fix.pdf"
    },
    {
      id: "windows-server",
      title: "Windows Server : Administration et fondamentaux système",
      issuer: "StudyRaid",
      date: "2025-12-17",
      detail: "Score 100 %",
      cats: ["net"],
      thumb: "assets/certs/windows-server-studyraid-card.jpg",
      full: "assets/certs/windows-server-studyraid.jpg",
      pdf: "assets/certs/windows-server-studyraid.pdf",
      verify: "https://app.studyraid.com/certificate/20539/ff064eba-31f4-4d8e-aa22-f71aa6e864ee"
    },
    {
      id: "reseaux",
      title: "Réseaux informatiques : principes et protocoles essentiels",
      issuer: "StudyRaid",
      date: "2025-12-17",
      detail: "Score 93 %",
      cats: ["net"],
      thumb: "assets/certs/reseaux-studyraid-card.jpg",
      full: "assets/certs/reseaux-studyraid.jpg",
      pdf: "assets/certs/reseaux-studyraid.pdf",
      verify: "https://app.studyraid.com/certificate/20539/900407fa-8531-46f9-a334-65dc9c45f617"
    },
    {
      id: "intro-cybersecurity",
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "2025-12-17",
      detail: "Certificat de fin de cours",
      cats: ["sec"],
      thumb: "assets/certs/intro-cybersecurity-cisco.jpg",
      full: "assets/certs/intro-cybersecurity-cisco.jpg",
      pdf: "assets/certs/intro-cybersecurity-cisco.pdf"
    }
  ],

  services: [
    {
      code: "DEV", title: "Applications de gestion sur mesure",
      text: "Scolarité, devis, suivi de projets : une application adaptée à votre façon de travailler, avec exports PDF et Excel et des sauvegardes.",
      items: ["Application de bureau ou web", "Bulletins, devis, rapports PDF", "Comptes, rôles et mots de passe protégés", "Guide d'utilisation et prise en main"],
      refs: ["gestion-scolaire", "devisbtp", "missionflow"]
    },
    {
      code: "NET", title: "Administration et sécurisation d'infrastructure",
      text: "Serveurs Windows et Linux, réseaux segmentés en VLAN, accès par clés SSH, bases de données isolées et sauvegardées.",
      items: ["Installation de serveurs et de bases de données", "Segmentation réseau et règles d'accès", "Accès SSH par clés", "Sauvegardes et documentation"],
      refs: ["tenezus", "reseau-gns3", "deploiement-git-push"]
    },
    {
      code: "SEC", title: "Audit et tests d'intrusion en laboratoire",
      text: "Scan, énumération et rapport sur un environnement de test, avec les preuves et les corrections à appliquer.",
      items: ["Scans Nmap et analyse des résultats", "Vérification des partages et des comptes", "Rapport d'audit clair", "Recommandations de durcissement"],
      refs: ["audit-ethical-hacking", "kondji-pacs"]
    },
    {
      code: "ML", title: "Données, tableaux de bord et machine learning",
      text: "Nettoyer des données, les montrer dans un tableau de bord et en tirer des segments ou des prédictions.",
      items: ["Nettoyage et préparation", "Tableaux de bord interactifs", "Segmentation et classification", "Rapport et présentation des résultats"],
      refs: ["dashboard-energie-togo", "segmentation-rfm", "rendement-agricole"]
    }
  ],

  steps: [
    { t: "Cadrage", d: "On décrit le besoin, les utilisateurs et ce qui doit sortir de l'outil (un bulletin, un devis, un rapport)." },
    { t: "Prototype", d: "Je montre vite une première version utilisable, pour corriger avant d'aller loin." },
    { t: "Livraison", d: "Installation, sécurité des accès, sauvegarde et guide d'utilisation." },
    { t: "Suivi", d: "Corrections et évolutions après les premiers usages réels." }
  ]
};
