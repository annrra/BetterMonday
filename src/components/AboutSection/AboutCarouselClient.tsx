'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import styles from './ac.module.css';
import classNames from 'classnames';

type Section = {
  key: string;
  heading?: string | null;
  meta?: string | null;
};

const AboutCarouselClient = ({ sections }: { sections: Section[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const changeSlide = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  return (
    <div className={styles.slide}>
      <div className={styles.data}>
        <AnimatePresence mode="wait">
          <motion.div
            key={sections[activeIndex].key}
            initial={{ opacity: 0, x: 10 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 * direction }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={styles.feed}
          >
            {sections[activeIndex].heading && (
              <div className={styles.heading}>
                <div
                  className={styles.title}
                  dangerouslySetInnerHTML={{
                    __html: sections[activeIndex].heading,
                  }}
                />
              </div>
            )}

            {sections[activeIndex].meta && (
              <div
                className={styles.info}
                dangerouslySetInnerHTML={{
                  __html: sections[activeIndex].meta,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.paginate}>
        {sections.map((section, index) => (
          <span
            key={section.key}
            onClick={() => changeSlide(index)}
            className={classNames(styles.bullet, { [styles.active] : index === activeIndex})}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutCarouselClient;