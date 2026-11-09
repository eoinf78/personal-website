import Link from "next/link";
import { Button, Heading, DownloadButton } from "@/components";
import { Icon } from "@/components/icon"
import { AnimatedSection } from "./AnimatedSection";


export const ContactBlock = () => {
  return <AnimatedSection id="contact-container">
    <div className="Block__container">
      <div data-animate="intro">
        <Heading size='display' level={2} text='Let&apos;s build something together.'/>
        <p className="Block__body">Open to full-time, contract or remote roles. The quickest way to reach me is email.</p>
      </div>
      <div className='Block__actions' data-animate="content">
        <Button variant="secondary" asChild>
          <Link href="mailto:fanning.eoin@gmail.com">
            <span className="Button__label">
              <Icon name='email'/>
              fanning.eoin@gmail.com
            </span>
          </Link>
        </Button>
        <DownloadButton variant="primary" size="medium" fileName="EoinFanning_CV"/>
      </div>
      <div className="Block__actions --inline" data-animate="content">
        <Link target="_blank" href="https://github.com/eoinf78"><Icon name='github' style="fill" size="small"/>GitHub</Link>
        <span>|</span>
        <Link target="_blank" href="https://www.linkedin.com/in/eoinfanning/"><Icon name='linkedin' style="fill" size="small"/>LinkedIn</Link>
      </div>
    </div>
  </AnimatedSection>
}