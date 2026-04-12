import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Independent Web Designer & Developer',
  description: 'Independent web designer & developer delivering custom websites, UI/UX design, and digital solutions to help brands stand out.',

  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  // Page exists only to create the route.
  // Visible content is rendered in the group layout.
  return null;
}
