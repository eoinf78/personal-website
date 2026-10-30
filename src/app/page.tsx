import '@/scss/page.scss';
import { BackToTop, ContactBlock, SkillsBlock } from '@/components';
import { HeroBlock } from '@/components';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { cacheLife } from "next/cache";

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Home() {
  const currentYear = await getCurrentYear();
  return <>
    <Header/>
    <main className="main" id="top">
      <HeroBlock/>
      <SkillsBlock/>
      <ContactBlock/>
    </main>
    <Footer year={currentYear}/>
    <BackToTop/>
  </>;
}
