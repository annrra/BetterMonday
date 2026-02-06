import React from 'react';
import styles from './hc.module.css';
import Image from 'next/image';
import tenor from '@/src/assets/images/tenor.gif';

const HeroCopy: React.FC = async () => {

  return (
    <div className={styles.overview}>
      <div className={styles.copy}>
        <div className={styles.tag}>
          <h1>This might be Better Monday</h1>
          <div className={styles.gig}>
            <div className={styles.loop}>
              {/* Todo: Replace with a dedicated component that fetches avatars from the API */}
              <Image src={tenor} alt="tenor" />
            </div>
            <span className={styles.redo}></span>
          </div>
        </div>
        <div className={styles.subtitle}>Independent web designer and developer creating strategic UI/UX and websites for brands that want to grow.</div>
      </div>
      <div className={styles.toggle}></div>
    </div>
  );

};

export default HeroCopy;

