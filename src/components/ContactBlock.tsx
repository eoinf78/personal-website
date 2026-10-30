import Link from "next/link"
import { Button } from "./Button"
import { Heading } from "./Heading"
import { DownloadButton } from "./DownloadButton"
import { Icon } from "./icon"


export const ContactBlock = () => {
  return <section className="Block ContactBlock" id="contact-container">
    <div className="Block__container">
      <Heading size='display' level={2} text='Let&apos;s build something together.'/>
      <p>Open to full-time, remote or roles. The quickest way to reach me is email.</p>
      <div className='Block__actions'>
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
      <div className="Block__actions">
        <Link target="_blank" href="https://github.com/eoinf78"><Icon name='github' style="fill" size="small"/>GitHub</Link>
        <span>|</span>
        <Link target="_blank" href="https://www.linkedin.com/in/eoinfanning/"><Icon name='linkedin' style="fill" size="small"/>LinkedIn</Link>
      </div>
    </div>
  </section>
}