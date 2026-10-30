import { Button, DownloadButton, LiquidSphere } from '@/components';
import Link from 'next/link';

export const HeroBlock = () => {
  return <section className="Block HeroBlock" id="about">
    <div className="Block__container">
      <div className="HeroBlock__content">
        <span className="HeroBlock__tag">// Software Developer · Front-end</span>
        <h1 className="Heading --size-hero">Hi, I&apos;m <span className="--highlight">Eoin Fanning</span></h1>
        <p>A front end developer with 15+ years building responsive, accessible and well-tested user interfaces. I specialise in React, Next.js and TypeScript, and I’m most interested in UI development, reusable component libraries and design systems that help teams ship consistent, high-quality products faster.</p>
        <div className='HeroBlock__actions'>
          <DownloadButton variant="primary" size="medium" fileName="EoinFanning_CV"/>
          <Button variant='outline' asChild className='Button --outline'>
            <Link href="#contact-container">
              <span className="Button__label">Get in touch</span>
            </Link>
          </Button>
        </div>
        <span className="HeroBlock__fileInfo">PDF · 190kb · updated October 2026</span>
      </div>
      <div className="HeroBlock__sphere">
        <LiquidSphere/>
      </div>
    </div>
  </section>
}