"use client";

type FooterProps = {
  year: number;
};

export default function Footer({ year }: FooterProps) {
  return (
    <footer className="Footer">
    <div className="Footer__container">
      <p>&copy; {year} Eoin Fanning | Software Developer · Front-end</p>
      <p>Built with Next.js, TypeScript and SCSS</p>
    </div>
    </footer>
  );
}