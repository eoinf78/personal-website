"use client";

import type { MouseEvent, ReactNode } from "react";

type AnchorLinkProps = {
  children: ReactNode;
  className?: string;
  href?: `#${string}`;
};

export const AnchorLink = ({ href, children, className }: AnchorLinkProps) => {

  if (!href) {
    const handleHomeClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return <button className={`${className ? `${className} ` : ''}--text`} type="button" onClick={handleHomeClick} aria-label="Return to top">
      {children}
    </button>
  }

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!href) return;

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <a href="" onClick={handleClick} className={className}>
    {children}
  </a>;
}