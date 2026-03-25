// This page intentionally returns null.
// It exists only to register the `/connect` route.
//
// The actual Connect overlay is rendered inside the Hero and SecondaryPanel layout
// and is controlled via `usePathname()`.
// When the URL is `/connect`, the overlay becomes visible.
//
// Do not remove this file unless the routing strategy changes.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Connect with BetterMonday',
  description: 'Get in touch with BetterMonday, an independent web designer and developer, to discuss custom websites, UI/UX design, and digital solutions tailored to help your brand stand out.',

  openGraph: {
    title: 'Connect with BetterMonday',
    description: 'Get in touch with BetterMonday, an independent web designer and developer, to discuss custom websites, UI/UX design, and digital solutions tailored to help your brand stand out.',
    url: 'https://bettermonday.org/connect',
    siteName: 'BetterMonday',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'BetterMonday - Connect Page',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Connect with BetterMonday',
    description: 'Get in touch with BetterMonday, an independent web designer and developer, to discuss custom websites, UI/UX design, and digital solutions tailored to help your brand stand out.',
    images: ['/og-default.jpg'],
  },
};

export default function ConnectPage() {
  return null;
}