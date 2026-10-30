import { Heading } from "./Heading"

export const KeySkills = [
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

export const SkillsBlock = () => {
  return <section className="Block SkillsBlock" id="skills">
    <div className="Block__container">
      <Heading size='section' level={2} text='Key skills'/>
      <div className="SkillsBlock__grid">
        {KeySkills.map((skill, index) => <div className="SkillsBlock__card" key={`keySkill__${index}`} data-idx={`${index + 1}`}>
          <span className="--highlight">{index < 9 ? `0${index + 1}` : index + 1}</span>
          <Heading level={3} size="card" text={skill.name}/>
          <p>{skill.description}</p>
        </div>)}
      </div>
      <div className="SkillsBlock__tags">
        <span>Also:</span>
        {skills.map((skill, idx) => <span className="--tag" key={`skill${idx}`}>{skill}</span>)}
      </div>
    </div>
  </section>
}