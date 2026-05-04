export function SchemaOrgAbout() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://bettermonday.org/about/#aboutpage",
        url: "https://bettermonday.org/about",
        name: "About | BetterMonday",
        description:
          "About Andrey Raychev - web designer and developer behind BetterMonday.",
        isPartOf: {
          "@id": "https://bettermonday.org/#website"
        },
        about: {
          "@id": "https://bettermonday.org/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://bettermonday.org/#person",
        name: "Andrey Raychev",
        description:
          "UX designer and developer behind BetterMonday, focused on creating user-centered digital experiences, combining design sensibility with technical expertise.",
        knowsAbout: [
          "UI/UX Design",
          "Frontend Development",
          "Web Development",
          "Headless CMS",
          "WordPress Development",
          "User Experience Strategy",
          "Interaction Design"
        ],
        telephone: "+359879901835",
        sameAs: [
          "https://www.linkedin.com/in/annrra/",
          "https://github.com/annrra"
        ],
        worksFor: {
          "@id": "https://bettermonday.org/#organization"
        }
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