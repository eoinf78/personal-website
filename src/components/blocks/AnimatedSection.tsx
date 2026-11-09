'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactNode, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);


export const AnimatedSection = ({id, className, children}: {id: string, className?: string, children: ReactNode}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Only animate for people who haven't asked for reduced motion
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 1. Heading + intro fade up together
        gsap.from('[data-animate="intro"]', {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // top of section is 20% into the viewport
            once: true,
          },
        });

        // 2. Each role fades in as it reaches the same point
        gsap.utils.toArray<HTMLElement>('[data-animate="content"]').forEach((job) => {
          gsap.from(job, {
            opacity: 0,
            y: 32,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: job,
              start: 'top 80%',
              once: true,
            },
          });
        });
      });
    },
    { scope: sectionRef }
  );

  return <section className={`Block${className ? ` ${className}` : ``}`} ref={sectionRef} id={id}>
    {children}
  </section>
}