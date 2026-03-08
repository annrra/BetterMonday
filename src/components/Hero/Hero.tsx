import React from 'react';
import { metadata } from '@/app/layout';
import styles from './h.module.css';
import classNames from 'classnames';
import { HueSlider } from '@/src/components/HueSlider';

type HeroProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  overview: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ left, right, overview }) => {
  //const altText = metadata.title || 'Better Monday';

  return (
    <section className={styles.hero}>
      <>
        <div className={classNames(styles.twin)}>
          <div className={styles['panel-wrapper']}>
            <div className={classNames(styles.panel, styles['panel--primary'])}>
              {left}
            </div>
          </div>
          <div className={styles['panel-wrapper']}>
            <div className={classNames(styles.panel, styles['panel--secondary'])}>
              {right}
            </div>
          </div>

          <HueSlider />
          {overview}
        </div>
      </>
    </section>
  );

};

export default Hero;
