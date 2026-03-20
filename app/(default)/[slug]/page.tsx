import styles from './post.module.css';
import { getShowCaseItem } from '@/lib/api';
/* import { generatePageMetadata } from '@/src/components/_utils/MetaDataUtil/MetaDataUtil'; */
import { ShowCaseItemClient, ShowCaseItemServer } from '@/src/components/ShowCaseItem';
import { notFound } from 'next/navigation';
import type { PostProps } from './types';
import type { Category, ShowCaseItemResponse, ShowCasePost } from '@/src/components/ShowCaseItem/types';

/* export async function generateMetadata({ params: { slug } }: PostProps) {
  return await generatePageMetadata(slug);
} */

export default async function Post({ params }: PostProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }

  const rawShowCaseItem: ShowCaseItemResponse = await getShowCaseItem(slug);
  const post: ShowCasePost | null = rawShowCaseItem?.post ?? null;
  //console.log(JSON.stringify(post, null, 2));

  if (!post) {
    notFound();
  }

  // Limit route to posts in "work" category
  // Temporary limit route to posts with nextShowcaseItemHeading content
  const hasWorkCategory = post.categories?.nodes.some(
    (category: Category) => category.name === 'work'
  );

  if (!hasWorkCategory || post.nextshowcaseitem?.nextShowcaseItemHeading === null) {
    notFound();
  }

  // Normalize the nextShowcaseitem to simplify usage in components
  const nextItem = post.nextshowcaseitem;

  const normalizedNextItem = nextItem
    ? {
        heading: nextItem.nextShowcaseItemHeading ?? '',
        subheading: nextItem.nextShowcaseItemSubheading ?? '',
        description: nextItem.nextShowcaseItemDescription ?? '',
        tags: [
          nextItem.nextShowcaseItemTag01,
          nextItem.nextShowcaseItemTag02,
          nextItem.nextShowcaseItemTag03,
          nextItem.nextShowcaseItemTag04,
          nextItem.nextShowcaseItemTag05
        ].filter((t): t is string => !!t),
        link: {
          text: nextItem.nextShowcaseItemLinktext ?? '',
          url: nextItem.nextShowcaseItemLinkurl ?? ''
        },
        nextShowcaseItemMedia01: nextItem.nextShowcaseItemMedia01?.node ?? null,
        nextShowcaseItemMedia02: nextItem.nextShowcaseItemMedia02?.node ?? null,
        nextShowcaseItemMedia03: nextItem.nextShowcaseItemMedia03?.node ?? null,
        nextShowcaseItemMedia04: nextItem.nextShowcaseItemMedia04?.node ?? null,
        nextShowcaseItemMedia05: nextItem.nextShowcaseItemMedia05?.node ?? null,
        nextShowcaseItemMedia06: nextItem.nextShowcaseItemMedia06?.node ?? null,
        nextShowcaseItemMedia07: nextItem.nextShowcaseItemMedia07?.node ?? null,
        nextShowcaseItemMedia08: nextItem.nextShowcaseItemMedia08?.node ?? null,
        captions: [
          nextItem.nextShowcaseItemCaption01,
          nextItem.nextShowcaseItemCaption02,
          nextItem.nextShowcaseItemCaption03
        ].filter((c): c is string => !!c),
        bonusHeading: nextItem.nextShowcaseItemBonusHeading ?? '',
        bonusInfo: nextItem.nextShowcaseItemBonusInfo ?? '',
        featuredImage: nextItem.nextShowcaseItemFeaturedImage?.node ?? null,
        iconFigure: nextItem.nextShowcaseItemIconFigure?.node ?? null
      }
    : null;

  return (
    <div className={styles.container}>
      <ShowCaseItemClient>
        <ShowCaseItemServer post={post} item={normalizedNextItem} />
      </ShowCaseItemClient>
    </div>
  );
}
