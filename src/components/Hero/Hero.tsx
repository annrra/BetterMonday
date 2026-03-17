import React from 'react';
import { metadata } from '@/app/layout';
import styles from './h.module.css';
import classNames from 'classnames';
import { HueSlider } from '@/src/components/HueSlider';
import { HeartShapedBox } from '@/src/components/ui/HeartShapedBox';

type HeroProps = {
  left: React.ReactNode;
  right: React.ReactNode;
  overview: React.ReactNode;
}

const Hero = ({ left, right, overview }: HeroProps) => {
  //const altText = metadata.title || 'Better Monday';

  return (
    <section className={styles.hero}>
      <>
        <div className={classNames(styles.twin)}>
          <div className={styles.twinner}>
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
            <HeartShapedBox />
            {overview}
          </div>
        </div>
      </>
    </section>
  );

};

export default Hero;
