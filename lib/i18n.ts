export type Locale = "en" | "fr";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      menu: "Open menu",
      close: "Close menu",
    },
    hero: {
      download: "Download Résumé",
      contact: "Discuss a Platform Role",
      projects: "View Selected Engineering Work",
      portfolio: "Portfolio",
    },
    home: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      architecture: "Architecture",
      certifications: "Certifications",
      terminal: "Terminal Mode",
      techStack: "Tech Stack",
      viewAll: "View all",
      selectedExperience: "Selected experience",
      caseStudies: "Featured case studies",
      focusAreas: "Focus areas",
      developerMode: "Developer mode",
      developerModeHint: "Prefer a CLI view of the same data?",
    },
    about: {
      title: "About Me",
      highlights: "Career Highlights",
      education: "Education",
      bio: "Background",
    },
    experience: {
      title: "Experience",
      description:
        "Outcome-focused roles across platform engineering, cloud infrastructure, and site reliability at Gartner, Microsoft, and Aflac.",
      timeline: "Timeline",
      allRoles: "All Roles",
    },
    projects: {
      title: "Projects",
      description:
        "Engineering work across cloud platforms, reliability, and production AI — with clear labels for portfolio demos versus case studies.",
      code: "Code",
      demo: "Demo",
      caseStudy: "Read case study",
      caseStudyOnly: "Case study (no public repo)",
    },
    skills: {
      title: "Skills",
      description:
        "Evidence-based competencies in platform engineering, cloud, automation, reliability, and production AI.",
      certifications: "Certifications",
      architecture: "Cloud Architecture",
      viewCredential: "View credential",
    },
    contact: {
      title: "Contact Me",
      description:
        "Open to Senior Platform Engineer and related SRE, cloud, and infrastructure roles. Prefer email — I typically respond within 1–2 business days.",
      getInTouch: "Get in Touch",
      directContact: "Direct Contact",
      social: "Social",
      portfolio: "Portfolio",
      resume: "Resume",
      downloadPdf: "Download PDF",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
      considering:
        "Currently considering platform engineering, SRE, cloud infrastructure, and production AI platform roles.",
      preferredChannel: "Preferred channel: email",
      responseTime: "Typical response time: 1–2 business days",
      phoneNote: "Phone available on request for scheduled calls.",
    },
    chatbot: {
      title: "Resume Assistant",
      greeting: (name: string) =>
        `Hi! Ask me about ${name}'s experience, skills, or contact info.`,
      placeholder: "Ask a question...",
      experience: (title: string) =>
        `I have experience at Gartner, Microsoft, and Aflac as a ${title}.`,
      skills:
        "My core skills include platform and cloud engineering (AWS, Azure, GCP), infrastructure automation (Terraform, Ansible, GitOps), reliability/observability, backend systems (Python, Go), and production AI workflows.",
      contact: (email: string, linkedin: string) =>
        `You can reach me at ${email} or via ${linkedin}.`,
      default:
        "I can answer questions about my experience, skills, and contact info. Try asking about those topics!",
    },
    notFound: {
      title: "Page not found",
      description: "The page you are looking for does not exist or has been moved.",
      backHome: "Back to home",
    },
    cta: {
      title: "Let's build something reliable together",
      description:
        "Open to Senior Platform Engineer and related SRE, cloud, and infrastructure roles. Reach out to discuss your team or a project.",
      contact: "Discuss a Platform Engineering Role",
    },
    resumeDownload: {
      title: "Download Resume",
      description:
        "Choose a role focus and generate a fresh PDF from the same data that powers this site — no stale attachments.",
      roleLabel: "Target role",
      previewTitle: "Preview",
      formatNote: "PDF only for now — generated on demand. More formats coming soon.",
      generate: "Generate & Download PDF",
      generating: "Generating…",
      viewExperience: "View full experience on site",
      error: "Could not generate PDF. Please try again.",
    },
    common: {
      allRightsReserved: "All rights reserved.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      experience: "Expérience",
      projects: "Projets",
      skills: "Compétences",
      contact: "Contact",
      menu: "Ouvrir le menu",
      close: "Fermer le menu",
    },
    hero: {
      download: "Télécharger le CV",
      contact: "Discuter d'un poste plateforme",
      projects: "Voir les travaux sélectionnés",
      portfolio: "Portfolio",
    },
    home: {
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      architecture: "Architecture",
      certifications: "Certifications",
      terminal: "Mode Terminal",
      techStack: "Stack Technique",
      viewAll: "Voir tout",
      selectedExperience: "Expérience sélectionnée",
      caseStudies: "Études de cas",
      focusAreas: "Domaines clés",
      developerMode: "Mode développeur",
      developerModeHint: "Préférez une vue CLI des mêmes données ?",
    },
    about: {
      title: "À propos de moi",
      highlights: "Points forts",
      education: "Formation",
      bio: "Parcours",
    },
    experience: {
      title: "Expérience",
      description:
        "Rôles axés sur les résultats en ingénierie de plateforme, cloud et fiabilité chez Gartner, Microsoft et Aflac.",
      timeline: "Chronologie",
      allRoles: "Tous les postes",
    },
    projects: {
      title: "Projets",
      description:
        "Travaux d'ingénierie en cloud, fiabilité et IA en production — avec des libellés clairs pour portfolio et études de cas.",
      code: "Code",
      demo: "Démo",
      caseStudy: "Lire l'étude de cas",
      caseStudyOnly: "Étude de cas (pas de dépôt public)",
    },
    skills: {
      title: "Compétences",
      description:
        "Compétences fondées sur des preuves en plateforme, cloud, automatisation, fiabilité et IA en production.",
      certifications: "Certifications",
      architecture: "Architecture Cloud",
      viewCredential: "Voir la certification",
    },
    contact: {
      title: "Me contacter",
      description:
        "Ouvert aux postes Senior Platform Engineer, SRE, cloud et infrastructure. Préférez l'e-mail — réponse sous 1 à 2 jours ouvrés.",
      getInTouch: "Envoyer un message",
      directContact: "Contact direct",
      social: "Réseaux sociaux",
      portfolio: "Portfolio",
      resume: "CV",
      downloadPdf: "Télécharger le PDF",
      name: "Nom",
      email: "E-mail",
      message: "Message",
      send: "Envoyer",
      success: "Message envoyé avec succès !",
      error: "Échec de l'envoi. Veuillez réessayer.",
      considering:
        "Ouvert aux postes en ingénierie de plateforme, SRE, cloud et IA en production.",
      preferredChannel: "Canal préféré : e-mail",
      responseTime: "Délai de réponse typique : 1 à 2 jours ouvrés",
      phoneNote: "Téléphone disponible sur demande pour les appels planifiés.",
    },
    chatbot: {
      title: "Assistant CV",
      greeting: (name: string) =>
        `Bonjour ! Posez-moi des questions sur l'expérience, les compétences ou le contact de ${name}.`,
      placeholder: "Posez une question...",
      experience: (title: string) =>
        `J'ai de l'expérience chez Gartner, Microsoft et Aflac en tant que ${title}.`,
      skills:
        "Mes compétences principales couvrent la plateforme et le cloud (AWS, Azure, GCP), l'automatisation (Terraform, Ansible, GitOps), la fiabilité, le backend (Python, Go) et l'IA en production.",
      contact: (email: string, linkedin: string) =>
        `Vous pouvez me joindre à ${email} ou via ${linkedin}.`,
      default:
        "Je peux répondre à des questions sur mon expérience, mes compétences et mes coordonnées.",
    },
    notFound: {
      title: "Page introuvable",
      description: "La page que vous recherchez n'existe pas ou a été déplacée.",
      backHome: "Retour à l'accueil",
    },
    cta: {
      title: "Construisons quelque chose de fiable ensemble",
      description:
        "Ouvert aux postes Senior Platform Engineer, SRE, cloud et infrastructure. Contactez-moi pour discuter de votre équipe ou d'un projet.",
      contact: "Discuter d'un rôle plateforme",
    },
    resumeDownload: {
      title: "Télécharger le CV",
      description:
        "Choisissez un rôle cible et générez un PDF à jour à partir des mêmes données que ce site — pas de pièce jointe obsolète.",
      roleLabel: "Rôle cible",
      previewTitle: "Aperçu",
      formatNote:
        "PDF uniquement pour l'instant — généré à la demande. D'autres formats bientôt.",
      generate: "Générer et télécharger le PDF",
      generating: "Génération…",
      viewExperience: "Voir toute l'expérience sur le site",
      error: "Impossible de générer le PDF. Veuillez réessayer.",
    },
    common: {
      allRightsReserved: "Tous droits réservés.",
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Locale];
