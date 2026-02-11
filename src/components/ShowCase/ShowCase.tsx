import React from 'react';
import styles from './sc.module.css';
import classNames from 'classnames';

const ShowCase: React.FC = async () => {

  return (
    <div className={styles.showroom}>
      <div className={classNames(styles.panel, styles.data)}>
        <div className={styles.hd}>
          <h2>work highlights</h2>
          <div className={styles.subheading}>A closer look at the work - and the ideas behind it.</div>
        </div>
        <div className={styles.body}>
          <div className={styles.context}>Activities and workshops for applied arts with children, which  have been happening for more than 10 years in children's centers, restaurants, parents' cooperatives, in the park, during festivals, etc. A dynamic platform for kids workshops, carefully crafted with Next.js and WordPress. Lightning-fast performance, captivating design and robust functionality. Utilizing WordPress as a headless CMS grants flexibility and scalability in content management.</div>
        </div>
      </div>
      <div className={classNames(styles.panel, styles.deck)}>
        <div className={styles.cards}>
          <div className={classNames(styles.card, styles.card1)}><span className={styles.current}></span></div>
          <div className={classNames(styles.card, styles.card2)}></div>
          <div className={classNames(styles.card, styles.card3)}></div>
          <div className={classNames(styles.card, styles.card4)}></div>
        </div>
      </div>
    </div>
  );

};

export default ShowCase;

