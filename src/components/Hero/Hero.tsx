import React from 'react';
import { metadata } from '@/app/layout';
import styles from './h.module.css';
import { Header } from '@/src/components/Header';
import classNames from 'classnames';
import ElephantSvg from './ElephantSvg';
import { HeroCopy } from '@/src/components/HeroCopy';

const Hero: React.FC = async () => {
  const altText = metadata.title || 'Better Monday';

  return (
    <section className={styles.hero}>
      <div className={styles.twin}>
        <Header />
        <div className={classNames(styles['twin-pane'], styles['twin-pane--primary'])}>
          <ElephantSvg />
        </div>
        <div className={classNames(styles['twin-pane'], styles['twin-pane--secondary'])}>
          <HeroCopy />
        </div>
      </div>
    </section>
  );

};

export default Hero;
