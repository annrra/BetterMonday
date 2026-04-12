export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "BetterMonday",
    url: "https://bettermonday.org",
    description:
      "Independent web designer & developer delivering custom websites and digital solutions.",
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