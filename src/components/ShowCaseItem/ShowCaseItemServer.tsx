import styles from './sci.module.css';
import Image from 'next/image';
import Link from 'next/link';
import type { FileNode, ShowCasePost } from './types';
import classNames from 'classnames';

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
  item?: NormalizedNextItem | null;
}

const ShowCaseItemServer = async ({ post, item }: ShowCaseItemServerProps) => {
  console.log(JSON.stringify(item, null, 2));
  

  return (
    <div className={styles.showslide}>
      <div className={classNames(styles.section, styles['hero-section'])}>
        <div className={styles.hero}>
          {item?.featuredImage?.guid && (
            <Image
              src={item?.featuredImage?.guid}
              alt={item.featuredImage.altText ?? ''}
              fill
              className={styles['hero-image']}
            />
          )}
        </div>
        
        <div className={styles['summary-pane']}>
          <div className={styles.figure}>
            {item?.iconFigure?.guid && (
              <Image
                src={item?.iconFigure?.guid}
                alt={item.iconFigure.altText ?? ''}
                width={160}
                height={160}
                className={styles['brand-accent']}
              />
            )}
          </div>
          <div className={styles.summary}>
            <div className={styles['summary-body']}>
              <div className={styles['summary-header']}>
                <div className={styles['heading']}>
                  {item?.heading && <h1>{item.heading}</h1>}
                </div>
                <div className={styles['subheading']}>
                  {item?.subheading && <h2>{item.subheading}</h2>}
                </div>
              </div>
              <div className={styles['summary-content']}>
                {item?.description && item?.description}
              </div>
            </div>
            <div className={styles['summary-footer']}>
              <div className={styles.tags}>
                {item?.tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.link}>
                {item?.link.url && (
                  <Link href={item.link.url} target='_blank' rel="noopener noreferrer">
                    {item.link.text}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={classNames(styles.section, styles['screen-section'])}>Section 2</div>
      <div className={classNames(styles.section, styles['after-section'])}>Section 3</div>
    </div>
  );

};

export default ShowCaseItemServer;

