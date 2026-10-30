import Link from "next/link";
import { ReactElement } from "react";
import { DownloadButton } from "./DownloadButton";


export const Header = (): ReactElement => {
  return <header className="Header">
    <nav className="Header__nav">
      <Link href="/" className="Header__logo">[Eoin Fanning]<span>_</span></Link>
      <div className="Header__navItems">
        <Link href="#about">About</Link>
        <Link href="#skills">Skills</Link>
        <Link href="#contact-container">Contact</Link>
        <DownloadButton variant="outline" size="small" fileName="EoinFanning_CV"/>
      </div>
    </nav>
  </header>
}