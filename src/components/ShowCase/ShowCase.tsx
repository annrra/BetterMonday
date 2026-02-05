import React from 'react';
import styles from './sc.module.css';
import ShowCaseSwiper from './ShowCaseSwiper';

const ShowCase: React.FC = async () => {

  return (
    <div className={styles.showroom}>
      <div className={styles['module-heading']}>
        <h2>Work Highlights</h2>
        <div className={styles['module-subheading']}>A closer look at the work - and the ideas behind it.</div>
      </div>
      <div className={styles['showcase-module']}>
        <ShowCaseSwiper />
      </div>
    </div>
  );

};

export default ShowCase;

