import { getOverviewContent } from '@/lib/api';
import AboutCarouselClient from './AboutCarouselClient';

type OverviewItem = {
  [key: string]: string | null;
};

const AboutCarouselServer = async () => {
  const overviewData = await getOverviewContent();
  const overview: Record<string, OverviewItem> = overviewData?.page ?? {};

  const sections = Object.entries(overview).map(([sectionKey, sectionValue]) => {
    const heading = Object.entries(sectionValue).find(([key]) =>
      key.includes("heading")
    )?.[1];

    const meta = Object.entries(sectionValue).find(([key]) =>
      key.includes("meta")
    )?.[1];

    return {
      key: sectionKey,
      heading,
      meta,
    };
  }).filter(section => section.heading || section.meta);

  return <AboutCarouselClient sections={sections} />;
};


export default AboutCarouselServer;
