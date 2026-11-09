import { Skill, WorkItem } from "./types";

export const KeySkills: Skill[] = [
  {
    name: "React",
    description:
      "Component architecture, hooks, state management and reusable UI libraries.",
  },
  {
    name: "Next.js",
    description:
      "Full-stack web apps, internal tools and headless CMS-driven sites.",
  },
  {
    name: "TypeScript",
    description:
      "Type-safe components, APIs and tooling for maintainable front end and Node code.",
  },
  {
    name: "CSS3 / SCSS / LESS",
    description:
      "Design tokens, mixins and maintainable, responsive styling systems.",
  },
  {
    name: "Design systems",
    description:
      "Building and owning UI kits of consistent, documented components using Atomic Design.",
  },
  {
    name: "Accessibility",
    description:
      "Building and testing inclusive interfaces that work for everyone who needs to use them.",
  }
];

export const skills = [
  // Languages and markup
  "JavaScript",
  "HTML5",

  // Frameworks and libraries
  "Astro",
  "Angular",
  "Node.js",
  "Radix UI",
  "Three.js",
  "Konva.js",

  // CMS and data
  "Payload CMS",
  "Sanity.io",
  "PostgreSQL",
  "MongoDB",

  // Cloud, DevOps and auth
  "AWS",
  "Vercel",
  "CI/CD",
  "OAuth",
  "AWS Cloud Practitioner",

  // Testing and quality
  "Jest",
  "Cypress",
  "Accessibility",
  "Code review",

  // UI, design and web fundamentals
  "Design systems",
  "Component libraries",
  "Atomic Design",
  "Responsive design",
  "SEO",
  "GA4",
  "Figma",

  // AI
  "Claude Code",
  "AI-assisted development",
  "LLM integration",

  // Tools and ways of working
  "Git",
  "GitHub",
  "Bitbucket",
  "Jira",
  "Confluence",
  "VS Code",
  "Agile",
];

export const work: WorkItem[] = [
  {
    company: 'Anthologie',
    role: 'Senior Software Developer',
    start: 'January 2025',
    end: 'October 2026',
    summary:
      'Built client websites and internal tools with React, Next.js and the Payload headless CMS, including a Next.js and Postgres app with Microsoft Entra ID sign-in. Set up CI/CD pipelines to AWS and Vercel, and used Claude Code to speed up development.',
    tags: ['React', 'Next.js', 'Typescript', 'Payload CMS', 'PostgreSQL', 'OAuth', 'AWS', 'Vercel'],
  },
  {
    company: 'Hatchd',
    role: 'Senior Front End Developer',
    start: 'January 2020',
    end: 'December 2024',
    summary: 'I led front end development on a range of client projects, from headless CMS websites to data-heavy interactive software. I built AI-powered diagnostic software for detecting coronary heart disease with a client, headless CMS sites with Sanity.io, React and Next.js, and interactive video player software for large touch devices. I worked closely with UX and UI designers and project managers to define scope, write Jira tickets and deliver responsive, accessible interfaces.',
    tags: ['React', 'Next.js', 'Typescript', 'Sanity CMS', 'OAuth', 'AWS', 'Vercel', 'ThreeJS'],
  },
  {
    company: 'Bankwest',
    role: 'Senior IT Specialist',
    start: 'October 2018',
    end: 'December 2019',
    summary: 'I worked as a developer within the home loan application team at a major Australian bank, building and maintaining software used in the home loan application process.',
    tags: ['Angular', 'Typescript'],
  },
  {
    company: 'HBF Health',
    role: 'Senior Front End Developer',
    start: 'October 2016',
    end: 'December 2018',
    summary: 'I worked as a front end developer on both internal projects and HBF`s public-facing website and customer portal, building interfaces for members and staff.',
    tags: ['Angular', 'Typescript', 'C#', '.Net'],
  }
];