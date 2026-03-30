import { getShowCaseList } from '@/lib/api';
import styles from './sc.module.css';
import ShowCaseLayout from './ShowCaseLayout';

export type ShowCaseEntry = {
  id: number;
  colorMode: "light" | "dark";
  title: string;
  heading: string;
  meta: string;
  description: string;
  tags: string[];
  mediaUrl: string;
  mediaAlt: string;
  mediaTitle: string;
  link: string;
  uri: string;
  slug: string;
  mimeType?: string;
  backdropUrl: string;
  backdropMimeType?: string;
  backdropAltText: string;
  backdropTitle: string;
  backdropsrcSet: string;
  snapshotUrl: string;
  snapshotMimeType?: string;
  snapshotAltText: string;
  snapshotTitle: string;
};

export type ShowCaseItem = {
  nextshowcaselist: {
    nextshowcasecolormode: "light" | "dark";
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
        altText: string;
        title: string;
        mediaItemUrl: string;
        mediaType: string;
        mimeType: string;
      };
    };
    nextshowcasebackdrop?: {
      node: {
        altText: string;
        title: string;
        mediaItemUrl: string;
        mediaType: string;
        mimeType: string;
        srcSet: string;
      };
    };
    nextshowcasesnapshot?: {
      node: {
        altText: string;
        title: string;
        mediaItemUrl: string;
        mediaType: string;
        mimeType: string;
      };
    };
  };
  guid: string;
  link: string;
  postId: number;
  uri: string;
  slug: string;
};

const ShowCaseServer = async () => {
  const showCaseList = await getShowCaseList();
  const rawItems = showCaseList?.posts?.nodes ?? [];

  const items: ShowCaseEntry[] = rawItems
    .map((item: ShowCaseItem) => {
      const sc = item.nextshowcaselist;

      return {
        id: item.postId,
        colorMode: sc.nextshowcasecolormode,
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
        mediaUrl: sc.nextshowcasepreview?.node?.mediaItemUrl ?? "",
        mediaAltText: sc.nextshowcasepreview?.node?.altText ?? "",
        mediaTitle: sc.nextshowcasepreview?.node?.title ?? "",
        link: item.link,
        uri: item.uri,
        slug: item.slug,
        mimeType: sc.nextshowcasepreview?.node?.mimeType ?? "",
        backdropUrl: sc.nextshowcasebackdrop?.node?.mediaItemUrl ?? "",
        backdropUrlMimeType: sc.nextshowcasebackdrop?.node?.mimeType ?? "",
        backdropAltText: sc.nextshowcasebackdrop?.node?.altText ?? "",
        backdropTitle: sc.nextshowcasebackdrop?.node?.title ?? "",
        backdropsrcSet: sc.nextshowcasebackdrop?.node?.srcSet ?? "",
        snapshotUrl: sc.nextshowcasesnapshot?.node?.mediaItemUrl ?? "",
        snapshotMimeType: sc.nextshowcasesnapshot?.node?.mimeType ?? "",
        snapshotAltText: sc.nextshowcasesnapshot?.node?.altText ?? "",
        snapshotTitle: sc.nextshowcasesnapshot?.node?.title ?? "",
      };
    })
    .filter((item: ShowCaseEntry) => Boolean(item.title?.trim()));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={styles.showroom}>
        <h1 className={styles.sronly}>Selected projects by BetterMonday</h1>
        <ShowCaseLayout items={items} />
    </div>
  );

};

export default ShowCaseServer;

