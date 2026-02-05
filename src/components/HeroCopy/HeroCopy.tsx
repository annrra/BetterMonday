import React from 'react';
import styles from './hc.module.css';

const HeroCopy: React.FC = async () => {

  return (
    <div className={styles.overview}>
      <div className={styles.copy}>
        <div className={styles.tagline}><h1>This might be Better Monday</h1></div>
        <div className={styles.subtitle}>Independent web designer and developer creating strategic UI/UX and websites for brands that want to grow.</div>
      </div>
      <div className={styles.toggle}></div>
    </div>
  );

};

export default HeroCopy;

