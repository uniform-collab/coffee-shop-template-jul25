import { DM_Sans, Space_Mono } from 'next/font/google';

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  variable: '--primary',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
  preload: true,
});

export const space_mono = Space_Mono({
  subsets: ['latin'],
  variable: '--secondary',
  display: 'swap',
  weight: ['400', '700'],
  style: ['italic', 'normal'],
  preload: true,
});

export const customFontVariables = [dm_sans.variable, space_mono.variable].join(' ');
