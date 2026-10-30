import localFont from 'next/font/local';

export const grotesk = localFont({
  src: [
    { path: './space-grotesk-light.ttf', weight: '300', style: 'normal' },
    { path: './space-grotesk-regular.ttf', weight: '400', style: 'normal' },
    { path: './space-grotesk-medium.ttf', weight: '500', style: 'normal' },
    { path: './space-grotesk-semiBold.ttf', weight: '600', style: 'normal' },
    { path: './space-grotesk-bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
}); 

export const mono = localFont({
  src: './JetBrainsMono-VariableFont_wght.ttf',
  weight: '100 800',
  style: 'normal',
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
});