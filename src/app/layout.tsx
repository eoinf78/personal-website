import { grotesk, mono } from '@/lib/fonts'

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eoin Fanning",
  description: "A software developer with 15+ years building responsive, accessible and well-tested user interfaces. I specialise in React, Next.js and TypeScript, and I’m most interested in UI development, reusable component libraries and design systems that help teams ship consistent, high-quality products faster.",
  alternates: {
    canonical: "https://www.eoinfanning.au/"
  },
  icons: [
    {url: '/favicon.ico', type: 'image/x-icon', sizes: '48x48', rel: 'icon'},
    {url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any', rel: 'icon'},
    {url: '/apple-touch-icon.png', type: 'image/png', rel: 'apple-touch-icon'}
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${grotesk.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
