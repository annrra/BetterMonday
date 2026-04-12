import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Oops! The page you are looking for does not exist. Explore BetterMonday for web design, UI/UX, and digital solutions.',

  openGraph: {
    title: 'Page Not Found - BetterMonday',
    description: 'Oops! The page you are looking for does not exist. Explore BetterMonday for web design, UI/UX, and digital solutions.',
    siteName: 'BetterMonday',
    type: 'website',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'BetterMonday - Page Not Found',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Page Not Found - BetterMonday',
    description: 'Oops! The page you are looking for does not exist. Explore BetterMonday for web design, UI/UX, and digital solutions.',
    images: ['/og-default.jpg'],
  },
};

export default function NotFound() {

	return (
		<div className={styles.notfound}>
			<Link href="/" className={styles.logo}>
				<MondayLogoSvg autoScramble mode="light" />
			</Link>
			<div className={styles.notice}>
				<h1>Page not found</h1>
				<div>Try again later, or go to <Link href="/">homepage</Link>.</div>
			</div>
		</div>
	)
}