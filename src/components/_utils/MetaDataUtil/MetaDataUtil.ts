import { getMetaBySlug } from '@/lib/api';
import type { MetaResponse, PageMetadata } from './types';

export async function generatePageMetadata(slug: string): Promise<PageMetadata> {
  const meta: MetaResponse | null = await getMetaBySlug(slug);
  
  if (!meta || !meta.post) {
    return {
      title: 'Not Found',
      description: 'Page not found',
			openGraph: {
        title: 'Page Not Found - BetterMonday',
        description: 'Oops! The page you are looking for does not exist. Explore BetterMonday for web design, UI/UX design, and digital solutions.',
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
        description: 'Oops! The page you are looking for does not exist. Explore BetterMonday for web design, UI/UX design, and digital solutions.',
        images: ['/og-default.jpg'],
      }
    };
  }

  const metaPost = meta.post;
  const metaData = metaPost.meta;

  const openGraphImage = metaData.metaOpengraphimage?.node?.sourceUrl;
  const siteBase = 'https://bettermonday.org';
  const ogImageUrl = openGraphImage
    ? openGraphImage.startsWith('http')
      ? openGraphImage
      : `${siteBase}${openGraphImage}`
    : '/og-default.jpg';

  const metadata: PageMetadata = {
    title: metaData.metaTitle,
    description: metaData.metaDescription,
    alternates: {
      canonical: `${siteBase}/${slug}`,
    },
    openGraph: {
      title: metaData.metaTitle,
      description: metaData.metaDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.metaTitle,
      description: metaData.metaDescription,
      images: [],
    },
  };

  metadata.openGraph.images = [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: metaPost.title,
    },
  ];

  metadata.twitter.images = [ogImageUrl];

  return metadata;
}
