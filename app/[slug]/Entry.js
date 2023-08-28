import React from 'react';
import styles from './post.module.css';
import Link from 'next/link';
import { getPostBySlug } from '../../lib/api';
import { Header } from '../../src/components/Header';

const Entry = async ({ slug }) => {
  const post = await getPostBySlug(slug);
	const postContent = post.post;

  return (
    <div className={styles['post-entry']}>
      <Header mode='dark' />
      <div className={styles['entry-intro']}>
        <div className={styles.heading}>
          <div><h1>{postContent.title}</h1></div>
          <div>
            <h3 className={styles.subtitle}
              dangerouslySetInnerHTML={{
                __html: postContent.workItems.itemSubtitle,
              }}
            />
          </div>
        </div>
        <div className={styles.entry}>
          <div className={styles['entry-info']}
            dangerouslySetInnerHTML={{
              __html: postContent.workItems.listViewInfo,
            }}
          />
          <div className={styles['entry-extra']}>
            <h4>{postContent.workItems.additionalInfoTitle}</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: postContent.workItems.additionalField,
              }}
            />
            <div className={styles.live}>
              <Link href={postContent.workItems.linkExternalSite} target="_blank">view live site</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;
