import type { ShowCaseEntry } from '@/src/components/ShowCase/ShowCaseServer';

type SchemaOrgWorkProps = {
  items: ShowCaseEntry[];
};

export function SchemaOrgWork({ items }: SchemaOrgWorkProps) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://bettermonday.org/work/#page",
        url: "https://bettermonday.org/work",
        name: "Selected Projects | BetterMonday",
        description: "A selection of web design and development projects by Andrey Raychev.",
        isPartOf: {
          "@id": "https://bettermonday.org/#website"
        },
        about: {
          "@id": "https://bettermonday.org/#person"
        }
      },
      {
        "@type": "ItemList",
        "@id": "https://bettermonday.org/work/#list",
        name: "Featured Projects",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `https://bettermonday.org/work/${item.slug}/#work`,
            name: item.title,
            headline: item.heading,
            description: item.description,
            url: `https://bettermonday.org${item.uri}`,
            ...(item.mimeType?.startsWith("image/")
              ? {
                  image: item.mediaUrl
                }
              : item.mimeType?.startsWith("video/")
              ? {
                  video: {
                    "@type": "VideoObject",
                    contentUrl: item.mediaUrl
                  }
                }
              : {}),
            keywords: item.tags,
            about: {
              "@id": "https://bettermonday.org/#organization"
            },
            creator: {
              "@id": "https://bettermonday.org/#person"
            },
            workExample: item.snapshotUrl
              ? {
                  "@type": "ImageObject",
                  url: item.snapshotUrl,
                  caption: item.snapshotAltText
                }
              : undefined
          }
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}