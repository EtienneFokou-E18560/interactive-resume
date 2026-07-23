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
    },
    home: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      architecture: "Architecture",
      certifications: "Certifications",
      terminal: "Terminal Mode",
      viewAll: "View all",
    },
    about: {
      title: "About Me",
      highlights: "Career Highlights",
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
      greeting: "Hi! Ask me about Etienne's experience, skills, or contact info.",
      placeholder: "Ask a question...",
      experience: (title: string) =>
        `I have experience at Microsoft, Aflac, and Urgent2k as a ${title}.`,
      skills:
        "My core skills include Azure, AWS, Terraform, Docker, Kubernetes, Python, and TypeScript.",
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
    },
    home: {
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      architecture: "Architecture",
      certifications: "Certifications",
      terminal: "Mode Terminal",
      viewAll: "Voir tout",
    },
    about: {
      title: "À propos de moi",
      highlights: "Points forts",
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
      greeting:
        "Bonjour ! Posez-moi des questions sur l'expérience, les compétences ou le contact d'Étienne.",
      placeholder: "Posez une question...",
      experience: (title: string) =>
        `J'ai de l'expérience chez Microsoft, Aflac et Urgent2k en tant que ${title}.`,
      skills:
        "Mes compétences principales incluent Azure, AWS, Terraform, Docker, Kubernetes, Python et TypeScript.",
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
    common: {
      allRightsReserved: "Tous droits réservés.",
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Locale];
