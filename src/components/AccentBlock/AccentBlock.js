import React from 'react';
import styles from './ab.module.css';
import { AccentFigure } from '../AccentFigure';
import { getHomePageContent } from '../../../lib/api';

const AccentBlock = async () => {
  const homeContent = await getHomePageContent();
  const homeIndex = homeContent.page.metaIndex.metaIndex;
  const homeWhat = homeContent.page.metaIndex.metaWhat;
  const homeOutline = homeContent.page.meta.metaDescription;

  return (
    <section className={`${styles.lax} ${styles.accent}`} data-depth='0.01'>
      <div className={`${styles['accent-story']}`}>
        <div className={`${styles['story-description']}`}>{homeIndex}</div>
        <h1 className={`${styles['story-heading']}`}>{homeWhat}</h1>
        <div className={`${styles['story-description']}`}>{homeOutline}</div>
      </div>
      <AccentFigure />
    </section>
  );

};

export default AccentBlock;
