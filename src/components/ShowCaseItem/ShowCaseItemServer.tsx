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
    <div className={classNames(styles.showslide, styles[post.slug])}>
      <div className={classNames(styles.section, styles['hero-section'])}>
        <div className={styles.hero} data-speed={-0.5}>
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
      <div className={classNames(styles.section, styles['screen-section'])}>
        <div className={styles.screen}>
          {item?.nextShowcaseItemMedia01?.guid && (
            <Image
              src={item?.nextShowcaseItemMedia01?.guid}
              alt={item.nextShowcaseItemMedia01.altText ?? ''}
              priority
              width={0}
              height={0}
              sizes="100vw"
              className={styles['screen-image']}
            />
          )}
        </div>
      </div>
      <div className={classNames(styles.section, styles['after-section'])}>
        <div className={styles.caption}>
          {item?.bonusInfo && item?.bonusInfo}
        </div>
        <div className={styles.imagery}>
          <div className={classNames(styles.frame, styles.frame01)}>
            {item?.nextShowcaseItemMedia02?.guid && (
              <Image
                src={item?.nextShowcaseItemMedia02?.guid}
                alt={item.nextShowcaseItemMedia02.altText ?? ''}
                width={0}
                height={0}
                sizes="100vw"
                className={styles.scene}
              />
            )}
          </div>
          <div className={classNames(styles.frame, styles.frame02)}>
            {item?.nextShowcaseItemMedia03?.guid && (
              <Image
                src={item?.nextShowcaseItemMedia03?.guid}
                alt={item.nextShowcaseItemMedia03.altText ?? ''}
                width={0}
                height={0}
                sizes="100vw"
                className={styles.scene}
              />
            )}
          </div>
          <div className={classNames(styles.frame, styles.frame03)}>
            {item?.nextShowcaseItemMedia04?.guid && (
              <Image
                src={item?.nextShowcaseItemMedia04?.guid}
                alt={item.nextShowcaseItemMedia04.altText ?? ''}
                width={0}
                height={0}
                sizes="100vw"
                className={styles.scene}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );

};

export default ShowCaseItemServer;

