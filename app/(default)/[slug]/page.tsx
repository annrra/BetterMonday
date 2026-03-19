import styles from './post.module.css';
import { getShowCaseItem } from '@/lib/api';
/* import { generatePageMetadata } from '@/src/components/_utils/MetaDataUtil/MetaDataUtil'; */
import { notFound } from 'next/navigation';
import type { PostProps, Category } from './types';

/* export async function generateMetadata({ params: { slug } }: PostProps) {
  return await generatePageMetadata(slug);
} */

export default async function Post({ params }: PostProps) {
  const { slug } = await params;

  if (!slug || typeof slug !== 'string') {
    notFound();
  }
  const post = await getShowCaseItem(slug);
  console.log(JSON.stringify(post, null, 2));
  

  if (!post || !post.post) {
    notFound();
  }

  // Limit route to posts in "work" category
  // Temporary limit route to posts with nextShowcaseItemHeading content
  const hasWorkCategory = post.post.categories.nodes.some(
    (category: Category) => category.name === 'work'
  );

  if (!hasWorkCategory || post.post.nextshowcaseitem.nextShowcaseItemHeading === null) {
    notFound();
  }

  /* const track = post.post.slug;
  const title = post.post.nextshowcaseitem.nextShowcaseItemHeading;
  const info = post.post.nextshowcaseitem.nextShowcaseItemDescription; */

  return (
    <div className={styles.container}>
      ...
    </div>
  );
}
