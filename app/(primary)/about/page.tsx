// This page intentionally returns null.
// It exists only to register the `/about` route.
//
// The actual About overlay is rendered inside the Hero and PrimaryPanel layout
// and is controlled via `usePathname()`.
// When the URL is `/about`, the overlay becomes visible.
//
// Do not remove this file unless the routing strategy changes.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About BetterMonday',
  description: 'Learn more about BetterMonday, an independent web designer and developer creating custom websites, UI/UX design, and digital solutions that help brands stand out.',

  openGraph: {
    title: 'About BetterMonday',
    description: 'Learn more about BetterMonday, an independent web designer and developer creating custom websites, UI/UX design, and digital solutions that help brands stand out.',
    url: 'https://bettermonday.org/about',
    siteName: 'BetterMonday',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'BetterMonday - About Page',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'About BetterMonday',
    description: 'Learn more about BetterMonday, an independent web designer and developer creating custom websites, UI/UX design, and digital solutions that help brands stand out.',
    images: ['/og-default.jpg'],
  },
};

export default function AboutPage() {
  return null;
}