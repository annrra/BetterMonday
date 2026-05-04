export function SchemaOrgConnect() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://bettermonday.org/connect/#contactpage",
        url: "https://bettermonday.org/connect",
        name: "Contact | BetterMonday",
        description: "Get in touch with Andrey Raychev for web design and development projects.",
        isPartOf: {
          "@id": "https://bettermonday.org/#website"
        },
        about: {
          "@id": "https://bettermonday.org/#organization"
        },
        mainEntity: {
          "@id": "https://bettermonday.org/#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://bettermonday.org/#person",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          url: "https://bettermonday.org/connect",
          availableLanguage: ["en", "bg"]
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