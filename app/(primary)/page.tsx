import type { Metadata } from 'next';
import { SchemaOrg } from '@/src/components/seo/SchemaOrg';

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
  // Page intentionally renders no UI.
  // It only injects structured data for SEO.
  return (
    <SchemaOrg />
  );
}
