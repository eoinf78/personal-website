import { Card, Heading } from "@/components";
import { AnimatedSection } from "./AnimatedSection"


export const AboutMeBlock = () => {
  return <AnimatedSection id="aboutme">
    <div className="Block__container">
      <div className="Column">
        <div data-animate="intro" className="Photo">
          <picture>
            <img
              src="/images/eoin_fanning_profile.jpg"
              alt="Eoin Fanning Profile"
            />
          </picture>
        </div>
        <div data-animate="intro">
          <Heading size="section" level={2} text="About me"/>
          <p className="Block__body">Originally from Waterford in Ireland, I moved to Perth WA in 2010. I&apos;m a married Dad of two daughters, and when I&apos;m not at a keyboard you&apos;ll find me on the tennis court, in the gym, watching a movie or binging a TV show.</p>
          <p>I have always loved to travel. Which is what brought me to Australia in the first place. Before permanently moving here, I explored the country on a working holiday. Since then I have visited many other adventures, including climbing the Sydney harbour bridge, sky diving and cave spelunking in New Zealand, hiked volcanoes in Indonesia and a boat ride under Niagra falls.</p>
        </div>
      </div>
    </div>
  </AnimatedSection>
}