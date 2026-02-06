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
      <div className={styles.toggle}>
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 8C9 8 23.8522 12.4609 37 8C31.5218 19.8565 37 35 37 35" className={styles.fpath}/>
          <path d="M35 37C35 37 20.1478 32.5391 7 37C12.4782 25.1435 7 10 7 10" className={styles.fpath}/>
        </svg>
      </div>
    </div>
  );

};

export default HeroCopy;

