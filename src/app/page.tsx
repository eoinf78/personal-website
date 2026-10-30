import { Heading, LiquidSphere, SkillsBlock } from '@/components';
import { Header } from '@/components/Header';
import { HeroBlock } from '@/components';
import '@/scss/page.scss';

export default function Home() {
  return <>
    <Header/>
    <main className="main" id="top">
      <HeroBlock/>
      <SkillsBlock/>
      <section className="Block" id="contact-container">
        <div className="Block__container">
          <Heading size='section' level={2} text='Get in touch'/>
        </div>
      </section>
    </main>
    {/* Footer */}
  </>;
}
