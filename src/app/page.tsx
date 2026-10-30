import { ContactBlock, SkillsBlock } from '@/components';
import { Header } from '@/components/Header';
import { HeroBlock } from '@/components';
import '@/scss/page.scss';

export default function Home() {
  return <>
    <Header/>
    <main className="main" id="top">
      <HeroBlock/>
      <SkillsBlock/>
      <ContactBlock/>
    </main>
    {/* Footer */}
  </>;
}
