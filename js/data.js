/* ============================================================
   Toutes les données du portfolio sont ici.
   Pour ajouter un projet ou un certificat, ajoute un objet dans
   la liste correspondante : le site se met à jour tout seul
   (compteurs, filtres, cartes).
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
    // Remplace par "assets/CV-Tchedre-Aboudoul-Koudouse.pdf" quand tu ajoutes ton CV dans le dossier assets.
    cv: "https://tchedre-aboudoul-portfolio.lovable.app/__l5e/assets-v1/c5a3e1d2-7b52-40e4-afd1-9058236c2f1e/CV-Tchedre-Aboudoul-Koudouse.pdf"
  },

  domains: [
    {
      id: "sec", code: "SEC", name: "Cybersécurité",
      text: "Tests d'intrusion en laboratoire, audit de réseaux et de partages, durcissement des accès et des déploiements. Je travaille depuis Kali Linux contre des machines Windows et Linux montées pour l'exercice.",
      stack: ["Kali Linux", "Nmap", "SMB", "OSINT", "Clés SSH ed25519", "Rapports d'audit"]
    },
    {
      id: "net", code: "NET", name: "Systèmes & réseaux",
      text: "Windows Server et Active Directory, Linux Ubuntu, VLAN, routage inter-VLAN, NAT et ACL. Je monte mes laboratoires sur Packet Tracer, GNS3 et VirtualBox.",
      stack: ["Windows Server", "Active Directory", "GPO", "Ubuntu", "Cisco", "VLAN", "OSPF", "GNS3", "Packet Tracer", "GLPI"]
    },
    {
      id: "dev", code: "DEV", name: "Développement",
      text: "Applications de bureau, services web et API pour l'éducation et le secteur public togolais, de l'interface Tkinter jusqu'au déploiement sur Render. Le développement revient dans tous mes projets, alors je le fais sérieusement.",
      stack: ["Python", "Flask", "FastAPI", "Tkinter", "Spring Boot", "React", "JavaScript", "SQL", "Docker", "Git", "ReportLab"]
    },
    {
      id: "ml", code: "ML", name: "Machine learning & data",
      text: "Appris au Togo AI Summer School 2026 (Togo AI Lab, Université de Lomé) : préparation de données, segmentation client, vision par ordinateur et données satellite.",
      stack: ["Python", "Jupyter", "PyTorch", "K-means", "CNN", "Données géospatiales", "Streamlit"]
    }
  ],

  projects: [
    {
      title: "Gestion Scolaire",
      kicker: "Lycée Technique de Bangeli · établissements secondaires togolais",
      cats: ["dev"],
      text: "Application de bureau pour la scolarité : inscriptions, saisie des notes, bulletins PDF, examens blancs sur plusieurs classes et tableau de bord statistique. Thèmes clair et sombre, mots de passe hachés avec bcrypt, licence signée en Ed25519.",
      stack: ["Python", "Tkinter", "SQLAlchemy", "ReportLab", "Flask", "pytest"]
    },
    {
      title: "MissionFlow",
      kicker: "Cabinet ACTe · stage",
      cats: ["dev"],
      text: "Application web et mobile de gestion des projets, des tâches et du programme hebdomadaire des collaborateurs du cabinet, avec rapports PDF. Déployée sur Render.",
      stack: ["Spring Boot", "React", "Render", "PDF"]
    },
    {
      title: "DevisBTP",
      kicker: "Génie civil · Togo",
      cats: ["dev"],
      text: "Génération de devis du bâtiment en FCFA, avec TVA à 18 % et export PDF dans le format d'une société de BTP.",
      stack: ["Python", "Tkinter", "SQLite", "ReportLab"]
    },
    {
      title: "Kondji-PACS",
      kicker: "Téléradiologie · Togo",
      cats: ["dev", "sec"],
      text: "Passerelle PACS pour la téléradiologie : pipeline DICOM avec pseudonymisation des patients et compression JPEG 2000, secrets gérés par Vault.",
      stack: ["FastAPI", "Docker Compose", "TimescaleDB", "Redis", "Vault"]
    },
    {
      title: "Tenezus",
      kicker: "Plateforme universitaire · projet d'équipe",
      cats: ["dev", "net"],
      text: "Annonces, messagerie et emplois du temps pour étudiants et administration. J'ai monté la base PostgreSQL dans Docker sur une VM Azure : rôle applicatif dédié, port limité à 127.0.0.1, sauvegardes pg_dump.",
      stack: ["PostgreSQL", "Docker", "Node.js", "React", "Azure", "Caddy"]
    },
    {
      title: "Audit d'une entreprise fictive",
      kicker: "TP intégrateur Ethical Hacking · Cisco NetAcad",
      cats: ["sec"],
      text: "Laboratoire à deux machines virtuelles (Kali et Windows 10) sur réseau interne : scans Nmap, énumération du partage SMB, script Python d'analyse des résultats et rapport d'audit.",
      stack: ["Kali Linux", "Nmap", "SMB", "Python", "VirtualBox"]
    },
    {
      title: "Déploiement sécurisé sur git push",
      kicker: "TP DevSecOps · Ubuntu + Kali",
      cats: ["sec", "net"],
      text: "Un push depuis la VM Kali déclenche la mise en ligne sur le serveur Ubuntu : dépôt Git central, releases versionnées, clé SSH ed25519 dédiée et site servi à travers un tunnel SSH.",
      stack: ["Git", "SSH", "Bash", "Linux", "VirtualBox"]
    },
    {
      title: "Réseau d'entreprise sur GNS3",
      kicker: "TogoTech SARL · exercice",
      cats: ["net"],
      text: "Conception d'un réseau d'entreprise segmenté en VLAN, avec routage inter-VLAN, NAT et listes de contrôle d'accès, documenté dans un rapport PDF.",
      stack: ["GNS3", "Cisco", "VLAN", "NAT", "ACL"]
    },
    {
      title: "Tableau de bord énergie du Togo",
      kicker: "Hackathon",
      cats: ["ml"],
      text: "Tableau de bord interactif sur l'accès à l'électricité, les énergies propres, les forêts et les émissions de gaz à effet de serre, accompagné d'un rapport de dix diapositives.",
      stack: ["Python", "Streamlit", "Données ouvertes"]
    },
    {
      title: "Prédiction de rendements agricoles",
      kicker: "TAISS 2026 · TP",
      cats: ["ml"],
      text: "Rendements FEWS NET 2016-2019 par préfecture, rapprochés de features trimestrielles issues d'images satellite Planet et des limites administratives GADM.",
      stack: ["Python", "Jupyter", "Données géospatiales"]
    },
    {
      title: "Segmentation client RFM",
      kicker: "TAISS 2026 · TP",
      cats: ["ml"],
      text: "Nettoyage du jeu online_retail_II, construction des variables Récence, Fréquence et Montant, choix du nombre de clusters avec K-means et description des segments.",
      stack: ["Python", "pandas", "K-means"]
    },
    {
      title: "Détection de fissures dans le béton",
      kicker: "Vision par ordinateur · TP",
      cats: ["ml"],
      text: "Classification binaire fissure / non-fissure sur environ 40 000 images : CNN à trois blocs convolutifs, images 128×128, découpage 70/15/15 stratifié.",
      stack: ["PyTorch", "CNN", "Jupyter"]
    }
  ],

  certs: [
    {
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
      title: "Windows Server : Administration et fondamentaux système",
      issuer: "StudyRaid",
      date: "2025-12-17",
      detail: "Score 100 %",
      cats: ["net"],
      thumb: "assets/certs/windows-server-studyraid-card.jpg",
      full: "assets/certs/windows-server-studyraid.jpg",
      pdf: "assets/certs/windows-server-studyraid.pdf"
    },
    {
      title: "Réseaux informatiques : principes et protocoles essentiels",
      issuer: "StudyRaid",
      date: "2025-12-17",
      detail: "Score 93 %",
      cats: ["net"],
      thumb: "assets/certs/reseaux-studyraid-card.jpg",
      full: "assets/certs/reseaux-studyraid.jpg",
      pdf: "assets/certs/reseaux-studyraid.pdf"
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "2025-12-17",
      detail: "Certificat de fin de cours",
      cats: ["sec"],
      thumb: "assets/certs/intro-cybersecurity-cisco.jpg",
      full: "assets/certs/intro-cybersecurity-cisco.jpg",
      pdf: "assets/certs/intro-cybersecurity-cisco.pdf"
    }
  ]
};
