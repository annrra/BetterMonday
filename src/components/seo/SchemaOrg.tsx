export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bettermonday.org/#website",
        url: "https://bettermonday.org",
        name: "BetterMonday",
        description:
          "Independent web designer and developer creating strategic UI/UX and websites for growing brands.",
        inLanguage: "en",
        publisher: {
          "@id": "https://bettermonday.org/#organization"
        }
      },
      {
        "@type": "Person",
        "@id": "https://bettermonday.org/#person",
        name: "Andrey Raychev",
        url: "https://bettermonday.org",
        mainEntityOfPage: {
          "@id": "https://bettermonday.org/#website"
        },
        jobTitle: "Web Designer & Developer",
        worksFor: {
          "@id": "https://bettermonday.org/#organization"
        },
        sameAs: [
          "https://www.linkedin.com/in/annrra/",
          "https://github.com/annrra"
        ],
      },
      {
        "@type": "Organization",
        "@id": "https://bettermonday.org/#organization",
        name: "BetterMonday",
        url: "https://bettermonday.org",
        logo: {
          "@type": "ImageObject",
          url: "https://bettermonday.org/logo.png",
          width: 512,
          height: 512,
        },
        image: "https://bettermonday.org/og-default.jpg",
        description:
          "Independent web designer & developer delivering custom websites, UI/UX design, and digital solutions.",
        founder: {
          "@id": "https://bettermonday.org/#person"
        },
        sameAs: [
          "https://www.linkedin.com/in/annrra/",
          "https://github.com/annrra"
        ],
        makesOffer: {
          "@id": "https://bettermonday.org/#service"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://bettermonday.org/#service",
        name: "BetterMonday",
        url: "https://bettermonday.org",
        description:
          "Independent web designer and developer creating strategic UI/UX and websites for brands that want to grow.",
        provider: {
          "@id": "https://bettermonday.org/#organization"
        },
        areaServed: {
          "@type": "Place",
          name: "Worldwide"
        },
        knowsAbout: [
          "Web Development",
          "UI/UX Design",
          "Frontend Development",
          "Responsive Design",
          "Performance Optimization",
          "Accessibility"
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Services",
          itemListElement: [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Custom Website Design",
                "description": "UI/UX design tailored to brand identity and business goals."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Frontend Development",
                "description": "Responsive, high-performance frontend development."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Full Website Development",
                "description": "End-to-end website creation from design to deployment."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "UI/UX Strategy",
                "description": "Improving usability, conversions, and user experience."
              }
            }
          ]
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