// /app/sitemap.ts
import { MetadataRoute } from 'next';

type PostNode = {
  slug: string;
  modified: string;
};

type StaticPage = {
  slug: string;
  priority: number;
  changefreq: 'monthly' | 'weekly' | 'always' | 'hourly' | 'daily' | 'yearly' | 'never';
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const API_URL = process.env.API_URL!;
  const SITE_URL = process.env.SITE_URL || 'https://bettermonday.org';

  const staticPages: StaticPage[] = [
    { slug: 'about', priority: 0.9, changefreq: 'monthly' },
    { slug: 'work', priority: 0.9, changefreq: 'monthly' },
    { slug: 'connect', priority: 0.9, changefreq: 'monthly' },
  ];

  // GraphQL query to get posts
  const query = `
    query {
      posts(first: 100, where: {categoryName: "work"}) {
        nodes {
          slug
          modified
        }
      }
    }
  `;

  const res = await fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error('Failed to fetch posts for sitemap', await res.text());
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
      },
    ];
  }

  const data = await res.json();
  const posts: PostNode[] = data?.data?.posts?.nodes || [];

  // Build sitemap
  const urls: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    ...staticPages.map(page => ({
      url: `${SITE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq, // ✅ TypeScript is happy
      priority: page.priority,
    })),
    ...posts.map(post => ({
      url: `${SITE_URL}/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return urls;
}