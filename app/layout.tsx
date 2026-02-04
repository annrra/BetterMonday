import type { Metadata } from "next";
import { Geist, Montserrat } from "next/font/google";
import "./globals.css";

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
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
