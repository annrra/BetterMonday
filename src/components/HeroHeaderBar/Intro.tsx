import React from 'react';
import Link from 'next/link';
import styles from './hhb.module.css';
import MondayLogoSvg from './MondayLogoSvg';
import Menu from './Menu';

const Intro: React.FC = async () => {

  return (
    <div className={styles.hdr}>
      <div className={styles.header}>
        <div className={styles['logo-wrapper']}>
          <Link href="/" id="logo" className={styles['logo-link']}>
            <MondayLogoSvg />
          </Link>
        </div>
        <Menu />
      </div>
      <div className={styles.in}>
        <div className={styles.context}>Independent web designer and developer creating strategic UI/UX and websites for brands that want to grow.</div>
      </div>
    </div>
  );

};

export default Intro;
