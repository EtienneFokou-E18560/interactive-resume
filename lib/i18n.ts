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
      download: "Download Resume",
      contact: "Get in Touch",
      projects: "View Projects",
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
        "A detailed look at my professional journey across cloud engineering, software development, and site reliability.",
      timeline: "Timeline",
      allRoles: "All Roles",
    },
    projects: {
      title: "Projects",
      description:
        "A collection of applications and platforms I have built across cloud, backend, and full-stack development.",
      code: "Code",
      demo: "Demo",
    },
    skills: {
      title: "Skills",
      description:
        "Core competencies in cloud platforms, DevOps tooling, and backend development.",
      certifications: "Certifications",
      architecture: "Cloud Architecture",
      viewCredential: "View credential",
    },
    contact: {
      title: "Contact Me",
      description:
        "Interested in working together? Send a message or reach out directly through any of the channels below.",
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
    },
    chatbot: {
      title: "Resume Assistant",
      greeting: (name: string) =>
        `Hi! Ask me about ${name}'s experience, skills, or contact info.`,
      placeholder: "Ask a question...",
      experience: (title: string) =>
        `I have experience at Gartner, Microsoft, and Aflac as a ${title}.`,
      skills:
        "My core skills include Python, Go, AWS, Azure, GCP, Terraform, Docker, Kubernetes, Prometheus, and Grafana.",
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
        "Open to platform, SRE, and cloud engineering roles. Reach out to discuss your team, a project, or how I can help.",
      contact: "Start a Conversation",
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
      contact: "Me contacter",
      projects: "Voir les projets",
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
        "Un aperçu détaillé de mon parcours professionnel en ingénierie cloud, développement logiciel et fiabilité.",
      timeline: "Chronologie",
      allRoles: "Tous les postes",
    },
    projects: {
      title: "Projets",
      description:
        "Une collection d'applications et de plateformes que j'ai construites en cloud, backend et full-stack.",
      code: "Code",
      demo: "Démo",
    },
    skills: {
      title: "Compétences",
      description:
        "Compétences clés en plateformes cloud, outils DevOps et développement backend.",
      certifications: "Certifications",
      architecture: "Architecture Cloud",
      viewCredential: "Voir la certification",
    },
    contact: {
      title: "Me contacter",
      description:
        "Intéressé par une collaboration ? Envoyez un message ou contactez-moi directement.",
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
    },
    chatbot: {
      title: "Assistant CV",
      greeting: (name: string) =>
        `Bonjour ! Posez-moi des questions sur l'expérience, les compétences ou le contact de ${name}.`,
      placeholder: "Posez une question...",
      experience: (title: string) =>
        `J'ai de l'expérience chez Gartner, Microsoft et Aflac en tant que ${title}.`,
      skills:
        "Mes compétences principales incluent Python, Go, AWS, Azure, GCP, Terraform, Docker, Kubernetes, Prometheus et Grafana.",
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
        "Ouvert aux postes en plateforme, SRE et ingénierie cloud. Contactez-moi pour discuter de votre équipe ou d'un projet.",
      contact: "Démarrer une conversation",
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
