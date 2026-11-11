import Link from "next/link";
import { ReactElement } from "react";
import { DownloadButton } from "./DownloadButton";
import { AnchorLink } from "./AnchorLink";
import { HeaderScrollSentinel } from "./HeaderSentinal";


export const Header = (): ReactElement => {
  return <>
    <header className="Header">
      <nav className="Header__nav">
        <AnchorLink className="Header__logo">[Eoin Fanning]<span>_</span></AnchorLink>
        <div className="Header__navItems">
          <AnchorLink href="#aboutme">About</AnchorLink>          
          <AnchorLink href="#skills">Skills</AnchorLink>
          <AnchorLink href="#work">Work</AnchorLink>
          <AnchorLink href="#contact-container">Contact</AnchorLink>
          <DownloadButton variant="outline" size="small" fileName="EoinFanning_CV"/>
        </div>
      </nav>
    </header>
    <HeaderScrollSentinel/>
  </>
}