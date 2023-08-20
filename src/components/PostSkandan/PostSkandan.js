//'use client';
import React from 'react';
import styles from './ps.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getPostSkandan } from '../../../lib/api';

const PostSkandan = async () => {
  const psContent = await getPostSkandan();
  //const banner = psContent.post.workItems.itemImage03.sourceUrl;
  const frontImg = psContent.post.workItems.itemImageFront.sourceUrl;
  const meta = psContent.post.meta.metaDescription;
  const title = psContent.post.title;
  const subtitle = psContent.post.workItems.itemSubtitle;

  /*const styleBanner = {
    backgroundImage: `url(${banner})`,
    width:'100%',
    height:'350px'
  }*/

  return (
    <div className={styles.item}>
      {/*<div id='pc-banner' className={`${styles['case-banner']}`} style={styleBanner}></div>*/}
      <div className={styles.flex}>
        <div className={styles.info}>
          <h3>{title}</h3>
          <h4 className={styles.subtitle}
            dangerouslySetInnerHTML={{
              __html: subtitle,
            }}
          />
          {meta}
          <div className={styles.caseFooter}><Link href={psContent.post.slug} className={styles.link}>View case study</Link></div>
        </div>
        <div className={styles.info}>
          <Link href={psContent.post.workItems.linkExternalSite} className={styles.extlink} target="_blank">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <path d="M10.8101 1.96222L0.726954 12.0453L1.66171 12.9801L11.7448 2.89698L11.9344 9.4447L13.208 9.07311L13.0134 2.35278C12.9877 1.46249 12.2434 0.718185 11.3531 0.692412L4.80762 0.502924L4.43487 1.77539L10.8101 1.96222Z" fill="white" stroke="white" strokeWidth="0.542084"></path>
            </svg>
          </Link>
          <Image
            src={frontImg}
            alt="photocomma"
            className={styles.front}
            sizes='100vw'
            width={100}
            height={100}
            priority
          />
        </div>
      </div>
    </div>
  );

};

export default PostSkandan;
