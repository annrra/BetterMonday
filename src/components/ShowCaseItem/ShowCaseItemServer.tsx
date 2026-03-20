import styles from './sci.module.css';
import type { FileNode, ShowCasePost } from './types';

type NormalizedNextItem = {
  heading: string;
  subheading: string;
  description: string;
  tags: string[];
  link: { text: string; url: string };
  nextShowcaseItemMedia01?: FileNode | null;
  nextShowcaseItemMedia02?: FileNode | null;
  nextShowcaseItemMedia03?: FileNode | null;
  nextShowcaseItemMedia04?: FileNode | null;
  nextShowcaseItemMedia05?: FileNode | null;
  nextShowcaseItemMedia06?: FileNode | null;
  nextShowcaseItemMedia07?: FileNode | null;
  nextShowcaseItemMedia08?: FileNode | null;
  captions: string[];
  bonusHeading: string;
  bonusInfo: string;
  featuredImage: FileNode | null;
  iconFigure: FileNode | null;
}

type ShowCaseItemServerProps = {
  post: ShowCasePost;
  nextItem?: NormalizedNextItem | null;
}

const ShowCaseItemServer = async ({ post, nextItem }: ShowCaseItemServerProps) => {
  console.log(JSON.stringify(nextItem, null, 2));
  

  return (
    <div className={styles.showroom}>
      <div className={styles.section}>Section 1</div>
      <div className={styles.section}>Section 2</div>
      <div className={styles.section}>Section 3</div>
    </div>
  );

};

export default ShowCaseItemServer;

