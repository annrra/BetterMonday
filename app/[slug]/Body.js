import React from 'react';
import styles from './post.module.css';
import Image from 'next/image';
import { getPostBySlug } from '../../lib/api';

const Body = async ({ slug }) => {
  const post = await getPostBySlug(slug);
	const postContent = post.post;
  const heroImg = postContent.workItems.itemImage03?.sourceUrl;

	const styleHero = {
    backgroundImage: `url(${heroImg})`,
    width:'100%',
    height:'450px'
  }

  return (
    <div className={styles.body}>
      {(heroImg) && (
        <div id='hero' className={styles.hero} style={styleHero}></div>
      )}
      <div className={styles.showcase}>
        
        {(postContent.featuredImage.node?.sourceUrl) && (
          <div className={styles.block}>
            <div className={styles.sight}>
              <Image
                src={postContent.featuredImage.node.sourceUrl}
                alt={postContent.title}
                className={styles.featured}
                sizes='100vw'
                width={100}
                height={100}
                priority
              />
            </div>
            <div className={styles.excerpt}>
              {postContent.workItems.captionItemImage}
            </div>
          </div>
        )}
        
        {(postContent.workItems.itemImage01?.sourceUrl) && (
          <div className={styles.block}>
            <div className={styles.sight}>
              <Image
                src={postContent.workItems.itemImage01.sourceUrl}
                alt={postContent.title}
                className={styles.featured}
                sizes='100vw'
                width={100}
                height={100}
                priority
              />
            </div>
            <div className={styles.excerpt}>
              {postContent.workItems.captionItemImage01}
            </div>
          </div>
        )}
        
        {(postContent.workItems.itemImage02?.sourceUrl) && (
          <div className={styles.block}>
            <div className={styles.sight}>
              <Image
                src={postContent.workItems.itemImage02.sourceUrl}
                alt={postContent.title}
                className={styles.featured}
                sizes='100vw'
                width={100}
                height={100}
                priority
              />
            </div>
            <div className={styles.excerpt}>
              {postContent.workItems.captionItemImage02}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Body;
