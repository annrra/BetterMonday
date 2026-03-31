'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './sclf.module.css';
import classNames from 'classnames';
import { ShowCaseEntry } from './ShowCaseServer';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionLink } from '@/src/components/transitions';
import { scrambleText } from '@/src/components/_utils/Scramble';

export type ShowCaseListProps = {
  items: ShowCaseEntry[];
}

export type ShowCaseLayoutFooterProps = {
  uri?: string;
  heading?: string;
  description?: string;
  tags: string[];
  colorMode: "light" | "dark";
};

const MotionTransitionLink = motion(TransitionLink);

const ShowCaseLayoutFooter = ({
  uri,
  heading,
  description,
  tags,
  colorMode
}: ShowCaseLayoutFooterProps) => {
  const [scrambledTags, setScrambledTags] = useState<string[]>(tags);
  const prevTagsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!tags || tags.length === 0) return;

    const fromTags = prevTagsRef.current;
    const toTags = tags;

    const newTags: string[] = Array(toTags.length).fill("");

    for (let i = 0; i < toTags.length; i++) {
      const from = fromTags[i] || "";
      const to = toTags[i];

      scrambleText(from, to, (value) => {
        newTags[i] = value;
        setScrambledTags([...newTags]);
      });
    }

    prevTagsRef.current = toTags;
  }, [tags]); // <-- watch for changes in tags prop

  return (
    <div className={classNames(styles.footer, {[styles.dark]: colorMode === "dark"})}>
      <div className={styles.summary}>
        <div className={styles.details}>
          <MotionTransitionLink 
            href={uri} 
            className={styles.link}
            whileHover="hovered"
          >
            View Details
            <motion.span 
              className={classNames(styles['link-frame-corner'], styles['link-frame-tl'])}
              variants={{
                hovered: { top: '1px', left: '2px' },
                initial: { top: '-1px', left: '-1px' }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className={classNames(styles['link-frame-corner'], styles['link-frame-tr'])} 
              variants={{
                hovered: { top: '1px', right: '2px' },
                initial: { top: '-1px', right: '-1px' }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className={classNames(styles['link-frame-corner'], styles['link-frame-bl'])} 
              variants={{
                hovered: { bottom: '1px', left: '2px' },
                initial: { bottom: '-1px', left: '-1px' }
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span 
              className={classNames(styles['link-frame-corner'], styles['link-frame-br'])} 
              variants={{
                hovered: { bottom: '1px', right: '2px' },
                initial: { bottom: '-1px', right: '-1px' }
              }}
              transition={{ duration: 0.3 }}
            />
          </MotionTransitionLink>
        </div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={heading} // important: change triggers re-render
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {heading}
          </motion.h2>
        </AnimatePresence>
        <div className={styles.tags}>
          {scrambledTags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.context}
        >
          {description}
        </motion.div>
      </AnimatePresence>
    </div>
  );

};

export default ShowCaseLayoutFooter;

