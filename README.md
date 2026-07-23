# Interactive Resume

A modern, interactive resume and portfolio built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. This project showcases professional experience, technical expertise, cloud architecture, and software engineering projects through an engaging web experience.

**Live repository:** [github.com/EtienneFokou-E18560/interactive-resume](https://github.com/EtienneFokou-E18560/interactive-resume)

---

## About This Project

This is the personal portfolio site of **Etienne Fokou**, a Senior Software Engineer specializing in cloud engineering and site reliability. Instead of a static PDF, the site presents career history, skills, and projects as an interactive web application with animations, dark mode, bilingual support, and optional assistant features.

The site is designed to be:

- **Fast** — statically generated pages with optimized assets
- **Accessible** — semantic HTML, keyboard navigation, and WCAG-minded patterns
- **Customizable** — content lives in typed TypeScript data files, not a CMS
- **Deployable anywhere** — standard Next.js build output, compatible with Vercel, Docker, or any Node.js host

---

## Features

| Feature | Description |
|---------|-------------|
| Interactive landing page | Animated hero, summary, and section previews |
| Responsive design | Mobile-first layout across all screen sizes |
| Dark / Light mode | System-aware theme toggle via `next-themes` |
| Animated career timeline | Visual work history with Framer Motion |
| Technical skills dashboard | Animated progress bars grouped by category |
| Expandable work experience | Accordion-style experience cards |
| Project portfolio | Interactive project cards with tech tags and links |
| Architecture diagrams | Interactive cloud stack visualization |
| Certifications section | Professional credentials display |
| Downloadable PDF resume | One-click download from `/public/resume.pdf` |
| Contact form | Client-side form ready for API integration |
| AI Resume Assistant | Floating chatbot with FAQ-style responses |
| Terminal Mode | CLI-style interface for browsing resume data |
| Multi-language support | English and French (i18n) |
| SEO optimized | Open Graph metadata and semantic structure |

---

## Tech Stack

### Frontend

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)

### Tooling

- ESLint (Next.js config)
- Vitest + Testing Library (dev)
- Geist font via `next/font`

---

## Project Structure

```
interactive-resume/
│
├── app/
│   ├── about/              # About page
│   ├── globals.css         # Global styles & Tailwind imports
│   ├── layout.tsx          # Root layout, metadata, providers
│   └── page.tsx            # Home page (all main sections)
│
├── components/
│   ├── Hero.tsx            # Animated introduction
│   ├── Navbar.tsx          # Navigation + theme/language toggles
│   ├── Footer.tsx          # Footer with social links
│   ├── Timeline.tsx        # Career timeline
│   ├── SkillChart.tsx        # Skills progress bars
│   ├── ExperienceCard.tsx  # Expandable job cards
│   ├── ProjectCard.tsx       # Project showcase cards
│   ├── ContactForm.tsx       # Contact form
│   ├── Terminal.tsx          # Terminal mode
│   ├── Chatbot.tsx           # Resume assistant
│   ├── ArchitectureDiagram.tsx
│   └── ThemeProvider.tsx     # Dark/light mode wrapper
│
├── data/
│   ├── profile.ts          # Personal info & summary
│   ├── experience.ts       # Work history
│   ├── projects.ts         # Portfolio projects
│   ├── skills.ts           # Skill categories & levels
│   └── certifications.ts   # Certifications
│
├── hooks/
│   └── useLanguage.tsx     # i18n context (EN / FR)
│
├── lib/
│   ├── i18n.ts             # Translation strings
│   └── utils.ts            # Shared utilities
│
├── public/
│   ├── images/             # Project screenshots
│   └── resume.pdf          # Downloadable resume
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** 20 or later
- **npm**, **pnpm**, or **yarn**

### 1. Clone the repository

```bash
git clone https://github.com/EtienneFokou-E18560/interactive-resume.git
cd interactive-resume
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional — for contact form email delivery
RESEND_API_KEY=your_resend_api_key

# Optional — for future database features
DATABASE_URL=file:./dev.db
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Serve the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Build for Production

```bash
npm run build
npm start
```

The build produces statically prerendered pages for `/` and `/about`, optimized for deployment on any Next.js-compatible platform.

---

## Customization Guide

All resume content is managed through typed data files in the `data/` directory. Edit these files to update the site — no component changes required for most updates.

### Update personal information

Edit `data/profile.ts`:

```ts
export const profile = {
  name: "Etienne Fokou",
  title: "Senior Software Engineer",
  subtitle: "Cloud Engineer · Site Reliability Engineer",
  location: "Redmond, WA, USA",
  email: "etiennefokou@gmail.com",
  phone: "+1 (425) 555-1234",
  github: "https://github.com/EtienneFokou-E18560",
  linkedin: "https://linkedin.com/in/efokou",
  summary: "Your professional summary...",
  highlights: ["Highlight 1", "Highlight 2"],
};
```

### Add work experience

Edit `data/experience.ts`:

```ts
{
  company: "Microsoft",
  role: "Software Engineer",
  start: "2022",
  end: "Present",
  location: "Redmond, WA",
  description: [
    "Built cloud automation tools",
    "Developed observability dashboards",
  ],
  technologies: ["Azure", "Terraform", "Python"],
}
```

### Add projects

Edit `data/projects.ts`:

```ts
{
  title: "Mapan",
  description: "Bus reservation platform",
  technologies: ["React Native", "Node.js", "MongoDB"],
  github: "https://github.com/EtienneFokou-E18560/mapan",
  demo: "https://example.com",
  image: "/images/mapan.png",
}
```

### Update skills

Edit `data/skills.ts` — adjust categories, skill names, and proficiency levels (0–100).

### Add certifications

Edit `data/certifications.ts`:

```ts
{
  name: "Azure Solutions Architect Expert",
  issuer: "Microsoft",
  year: "2023",
  credentialUrl: "https://...",
}
```

### Add your PDF resume

Place your resume file at:

```
public/resume.pdf
```

The download button on the hero section links to this file automatically.

### Add translations

Edit `lib/i18n.ts` to add or modify English and French strings for navigation, hero, and contact sections.

---

## Deployment

This project can be deployed to any platform that supports Next.js.

### Vercel (recommended)

1. Push the repository to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL
4. Deploy — Vercel detects Next.js automatically

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
```

### Other platforms

- **Netlify** — connect GitHub repo, build command: `npm run build`
- **Azure Static Web Apps** — connect repository, auto-deploys on push
- **Cloudflare Pages** — supports Next.js via `@cloudflare/next-on-pages`

Set `NEXT_PUBLIC_SITE_URL` to your production domain in all environments.

---

## Testing Checklist

Before deploying, verify:

- [ ] Responsive layout on mobile, tablet, and desktop
- [ ] Dark mode and light mode toggle correctly
- [ ] Language toggle switches EN / FR labels
- [ ] Resume PDF downloads from the hero button
- [ ] Experience cards expand and collapse
- [ ] Project links open correctly
- [ ] Animations are smooth (no layout shift)
- [ ] SEO metadata appears in page source
- [ ] `npm run lint` passes
- [ ] `npm run build` completes without errors

---

## Performance Targets

The site is built with performance in mind:

- Next.js Image optimization
- Static generation for main pages
- Lazy-loaded animations via Framer Motion `whileInView`
- Server Components where applicable

Expected Lighthouse scores:

| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 100 |
| SEO | 100 |

---

## Roadmap

- [ ] AI Resume Assistant with LLM integration
- [ ] Interactive coding playground
- [ ] GitHub contribution graph
- [ ] Blog section
- [ ] Resume analytics
- [ ] Visitor dashboard
- [ ] Multi-theme support
- [ ] CMS integration

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Etienne Fokou**  
Senior Software Engineer · Cloud Engineer · Site Reliability Engineer  
Redmond, WA, USA

### Contact

| | |
|---|---|
| **Email** | [etiennefokou@gmail.com](mailto:etiennefokou@gmail.com) |
| **Phone** | +1 (678) 650-4245 |
| **GitHub** | [github.com/EtienneFokou-E18560](https://github.com/EtienneFokou-E18560) |
| **LinkedIn** | [linkedin.com/in/efokou](https://linkedin.com/in/efokou) |
| **Repository** | [interactive-resume](https://github.com/EtienneFokou-E18560/interactive-resume) |

---

If you found this project useful, please consider giving it a star on GitHub.
