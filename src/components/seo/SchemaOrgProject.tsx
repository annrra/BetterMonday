import type { FileNode, ShowCasePost } from '@/src/components/ShowCaseItem/types';

type SchemaOrgProjectProps = {
  post: ShowCasePost;
};

const mediaKeys = [
  "nextShowcaseItemMedia01",
  "nextShowcaseItemMedia02",
  "nextShowcaseItemMedia03",
  "nextShowcaseItemMedia04",
  "nextShowcaseItemMedia05",
  "nextShowcaseItemMedia06",
  "nextShowcaseItemMedia07",
  "nextShowcaseItemMedia08"
] as const;

export function SchemaOrgProject({ post }: SchemaOrgProjectProps) {
  const baseUrl = "https://bettermonday.org";

  const mediaNodes = mediaKeys
    .map((key) => post.nextshowcaseitem?.[key]?.node)
    .filter((node): node is FileNode => Boolean(node));

  const images = mediaNodes.filter((m) =>
    m.file?.match(/\.(png|jpg|jpeg|webp)$/i)
  );

  const videos = mediaNodes.filter((m) =>
    m.file?.match(/\.(mp4|webm)$/i)
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}${post.uri}#webpage`,
        url: `${baseUrl}${post.uri}`,
        name: post.title,
        description: post.nextshowcaseitem?.nextShowcaseItemDescription ?? "",
        isPartOf: {
          "@id": `${baseUrl}/#website`
        },
        mainEntity: {
          "@id": `${baseUrl}${post.uri}#work`
        }
      },
      {
        "@type": "CreativeWork",
        "@id": `${baseUrl}${post.uri}#work`,
        name: post.title,
        url: `${baseUrl}${post.uri}`,
        description: post.nextshowcaseitem?.nextShowcaseItemBonusInfo ?? "",
        keywords: [
          post.nextshowcaseitem?.nextShowcaseItemTag01,
          post.nextshowcaseitem?.nextShowcaseItemTag02,
          post.nextshowcaseitem?.nextShowcaseItemTag03,
          post.nextshowcaseitem?.nextShowcaseItemTag04,
          post.nextshowcaseitem?.nextShowcaseItemTag05
        ].filter(Boolean),
        creator: {
          "@id": `${baseUrl}/#person`
        },
        about: {
          "@id": `${baseUrl}/#organization`
        },

        ...(images.length > 0
          ? {
              image: images.map((img) => img.guid)
            }
          : {}),

        ...(videos.length > 0
          ? {
              video: videos.map((v) => ({
                "@type": "VideoObject",
                contentUrl: v.guid,
                name: v.title,
                description: v.altText || post.title
              }))
            }
          : {}),

        sameAs: post.nextshowcaseitem?.nextShowcaseItemLinkurl
          ? [post.nextshowcaseitem.nextShowcaseItemLinkurl]
          : undefined
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