import React from 'react';
import Link from 'next/link';
import styles from './h.module.css';
import classNames from 'classnames';
import MondayLogoSvg from './MondayLogoSvg';

const Intro: React.FC = async () => {

  return (
    <div className={styles.hdr}>
      <div className={classNames(styles.container, styles.flex)}>
        <div className={styles['logo-wrapper']}>
          <Link href="/" id="logo" className={styles['logo-link']}>
            <MondayLogoSvg />
          </Link>
        </div>
      </div>
    </div>
  );

};

export default Intro;
