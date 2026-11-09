import { Heading } from "@/components";
import { KeySkills, skills } from "@/lib/consts";
import { AnimatedSection } from "./AnimatedSection";
import { Fragment } from "react/jsx-runtime";

export const SkillsBlock = () => {
  return <AnimatedSection className="Block SkillsBlock" id="skills">
    <div className="Block__container">
      <div data-animate="intro">
        <Heading size='section' level={2} text='Key skills'/>
      </div>
      <div className="SkillsBlock__grid">
        {KeySkills.map((skill, index) => <div 
          className="SkillsBlock__card" 
          key={`keySkill__${index}`} 
          data-idx={`${index + 1}`}
          data-animate="content"
        >
          <span className="--highlight">{index < 9 ? `0${index + 1}` : index + 1}</span>
          <Heading level={3} size="card" text={skill.name}/>
          <p>{skill.description}</p>
        </div>)}
      </div>
      <div className="SkillsBlock__tags" data-animate="content">
        <span>Also:</span>
        {skills.map((skill, idx) => <span className="--tag" key={`skill${idx}`}>{skill}</span>)}
      </div>
    </div>
  </AnimatedSection>
}