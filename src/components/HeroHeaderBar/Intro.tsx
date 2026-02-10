import React from 'react';
import Link from 'next/link';
import styles from './hhb.module.css';
import MondayLogoSvg from './MondayLogoSvg';

const Intro: React.FC = async () => {

  return (
    <div className={styles.hdr}>
      <div className={styles.in}>
        <div className={styles['logo-wrapper']}>
          <Link href="/" id="logo" className={styles['logo-link']}>
            <MondayLogoSvg />
          </Link>
        </div>
        <div className={styles.context}>Independent web designer and developer creating strategic UI/UX and websites for brands that want to grow.</div>
      </div>
    </div>
  );

};

export default Intro;
