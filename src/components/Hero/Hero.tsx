'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { metadata } from '@/app/layout';
import styles from './h.module.css';
import classNames from 'classnames';

type HeroProps = {
  left: React.ReactNode;
  right: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ left, right }) => {
  //const altText = metadata.title || 'Better Monday';
  const [load, setLoad] = useState(false);
  const [expandTwin, setExpandTwin] = useState(false);

  const handleLoaderComplete = () => {
    setLoad(true);
    setExpandTwin(true);
  };

  return (
    <section className={styles.hero}>
      {!load && (
        <motion.div
          className={styles.load}
          initial={{ height: 0 }}
          animate={{ height: '80vh' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onAnimationComplete={handleLoaderComplete}
        />
      )}

      {load && (
        <>
          <div className={classNames(styles.twin, { [styles.twinExpanded]: expandTwin })}>
            <div className={styles['panel-wrapper']}>
              <motion.div
                className={classNames(
                  styles.mask,
                  styles['mask--left']
                )}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: 'easeIn' }}
              />
              <div className={classNames(styles.panel, styles['panel--primary'])}>
                {left}
              </div>
            </div>
            <div className={styles['panel-wrapper']}>
              <motion.div
                className={classNames(
                  styles.mask,
                  styles['mask--right']
                )}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 0.3, ease: 'easeIn' }}
              />
              <div className={classNames(styles.panel, styles['panel--secondary'])}>
                {right}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );

};

export default Hero;
