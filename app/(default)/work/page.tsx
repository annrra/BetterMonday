import { ShowCaseServer } from '@/src/components/ShowCase';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "A selection of digital projects crafted by BetterMonday - combining strategy, design, and development to create impactful online experiences.",

  alternates: {
    canonical: '/work',
  },

  openGraph: {
    title: "Selected Work - BetterMonday",
    description:
      "Discover websites and digital experiences built with a focus on clarity, performance, and design precision.",
    url: "https://bettermonday.org/work",
    siteName: "BetterMonday",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "BetterMonday - UI/UX Design and Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work - BetterMonday",
    description:
      "Discover websites and digital experiences built with a focus on clarity, performance, and design precision.",
    images: ["/og-default.jpg"],
  },
};

export default function WorkPage() {
  return (
    <div>
      <ShowCaseServer />
    </div>
  );
}
