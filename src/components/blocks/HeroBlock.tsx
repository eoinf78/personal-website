'use client';

import { Button, DownloadButton, LiquidSphere } from '@/components';
import { AnimatedSection } from './AnimatedSection';
import { MouseEvent } from 'react';
import { useIsMobile } from '@/hooks';

export const HeroBlock = () => {
  const isMobile = useIsMobile();

  const handleContactClick = (event: MouseEvent) => {
    const target = document.getElementById('contact-container');
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <AnimatedSection className="HeroBlock" id="about">
    <div className="Block__container">
      <div className="HeroBlock__content">
        <div data-animate="intro">
          <span className="HeroBlock__tag">// Senior Software Developer</span>
          <h1 className="Heading --size-hero"><span className="--highlight">Eoin Fanning</span></h1>
          <p className="Block__body">A software developer with 15+ years building responsive, accessible and well-tested user interfaces. I specialise in React, Next.js and TypeScript, and I’m most interested in UI development, reusable component libraries and design systems that help teams ship consistent, high-quality products faster.</p>
        </div>
        <div className='Block__actions' data-animate="content">
          <DownloadButton variant="primary" size="medium" fileName="EoinFanning_CV"/>
          <Button variant='outline' className='Button --outline' onClick={handleContactClick}>
            Get in touch
          </Button>
        </div>
        <span data-animate="content" className="HeroBlock__fileInfo">PDF · 190kb · updated October 2026</span>
      </div>
      {!isMobile && <div className="HeroBlock__sphere">
        <LiquidSphere/>
      </div>}
    </div>
  </AnimatedSection>
}