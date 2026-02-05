import React from 'react';
import styles from './sc.module.css';
import classNames from 'classnames';

const ShowCaseSwiper: React.FC = async () => {

  return (
    <div className={styles.swiper}>
      <div className={styles.showcase}>
        {/* Showcase items temporary markup structure */}
        <div className={classNames(styles.item, styles['item--first'])}>
          <div className={styles.visual}></div>
          <div className={styles.meta}></div>
        </div>
        <div className={classNames(styles.item, styles['item--second'])}>
          <div className={styles.visual}></div>
          <div className={styles.meta}></div>
        </div>
        <div className={classNames(styles.item, styles['item--third'])}>
          <div className={styles.visual}></div>
          <div className={styles.meta}></div>
        </div>
      </div>
    </div>
  );

};

export default ShowCaseSwiper;

