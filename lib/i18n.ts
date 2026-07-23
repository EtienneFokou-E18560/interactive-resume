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
    },
    hero: {
      download: "Download Resume",
      contact: "Get in Touch",
    },
    contact: {
      title: "Contact Me",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      success: "Message sent successfully!",
      error: "Failed to send message. Please try again.",
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
    },
    hero: {
      download: "Télécharger le CV",
      contact: "Me contacter",
    },
    contact: {
      title: "Me contacter",
      name: "Nom",
      email: "E-mail",
      message: "Message",
      send: "Envoyer",
      success: "Message envoyé avec succès !",
      error: "Échec de l'envoi. Veuillez réessayer.",
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Locale];
