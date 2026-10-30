"use client";

import type { MouseEvent, ReactNode } from "react";

type AnchorLinkProps = {
  href: `#${string}`;
  children: ReactNode;
  className?: string;
};

export const AnchorLink = ({ href, children, className }: AnchorLinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Keep the URL in sync without stacking duplicate history entries
    if (window.location.hash !== href) {
      history.pushState(null, "", href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}