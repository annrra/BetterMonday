import { getShowCaseList } from '@/lib/api';
import styles from './sc.module.css';
import ShowCaseClient from './ShowCaseClient';

export type ShowCaseEntry = {
  id: number;
  title: string;
  heading: string;
  meta: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link: string;
  slug: string;
};

export type ShowCaseItem = {
  nextshowcaselist: {
    nextshowcasetitle: string;
    nextshowcaseheading: string;
    nextshowcasemeta: string;
    nextshowcasedescription: string;
    nextshowcasetag01: string;
    nextshowcasetag02: string;
    nextshowcasetag03: string;
    nextshowcasetag04: string;
    nextshowcasetag05: string;
    nextshowcasepreview?: {
      node: {
        mediaItemUrl: string;
      };
    };
  };
  guid: string;
  link: string;
  postId: number;
  uri: string;
};

const ShowCaseServer = async () => {
  const showCaseList = await getShowCaseList();
  const rawItems = showCaseList?.posts?.nodes ?? [];

  const items: ShowCaseEntry[] = rawItems.map((item: ShowCaseItem) => {
    const sc = item.nextshowcaselist;

    return {
      id: item.postId,
      title: sc.nextshowcasetitle,
      heading: sc.nextshowcaseheading,
      meta: sc.nextshowcasemeta,
      description: sc.nextshowcasedescription,
      tags: [
        sc.nextshowcasetag01,
        sc.nextshowcasetag02,
        sc.nextshowcasetag03,
        sc.nextshowcasetag04,
        sc.nextshowcasetag05,
      ].filter(Boolean), // removes empty tags
      imageUrl: sc.nextshowcasepreview?.node?.mediaItemUrl ?? "",
      link: item.link,
      slug: item.uri,
    };
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.showroom}>
        <ShowCaseClient items={items} />
    </div>
  );

};

export default ShowCaseServer;

