import type { Metadata } from "next";
import { Geist, Passion_One } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { PageTransitionEffect } from '@/src/components/transitions';

export const metadata: Metadata = {
  title: {
    template: '%s | BetterMonday',
    default: 'BetterMonday',
  },
  description: 'Independent web designer & developer delivering custom websites, UI/UX design, and digital solutions to help brands stand out.',
  metadataBase: new URL('https://bettermonday.org/'),
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "800"],
  display: "swap",
});

const passionOne = Passion_One({
  variable: "--font-passion-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${passionOne.variable}`}>
        <Providers>
          <PageTransitionEffect>
            {children}
          </PageTransitionEffect>
        </Providers>
      </body>
    </html>
  );
}
