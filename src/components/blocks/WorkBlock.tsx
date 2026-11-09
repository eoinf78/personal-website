import { Heading } from "@/components/Heading";
import { work } from "@/lib/consts";
import { AnimatedSection } from "./AnimatedSection";

export const WorkBlock = () => {
  return <AnimatedSection id="work">
    <div className="Block__container">
      <div data-animate="intro">
        <Heading size='section' level={2} text='Work history'/>
        <p className="Block__body">A look at my more recent roles. <span className="--highlight">Download my CV</span> for my full work history</p>
      </div>
      <ol className="WorkBlock__timeline">
        {work.map((job) => (
          <li key={job.company} className="WorkBlock__item" data-animate="content">
            <p className="WorkBlock__itemDates">
              {job.start} - {job.end}
            </p>

            <div className="WorkBlock__itemBody">
              <Heading size="card" level={3} text={job.company}/>
              <p className="WorkBlock__itemRole">{job.role}</p>
              <p className="WorkBlock__itemSummary">{job.summary}</p>

              <ul className="WorkBlock__itemTags" aria-label={`Technologies used at ${job.company}`}>
                {job.tags.map((tag) => (
                  <li className="Tag" key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </AnimatedSection>
}