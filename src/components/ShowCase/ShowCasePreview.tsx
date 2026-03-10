import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './sc.module.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type ShowCasePreviewProps = {
  media?: string;
  cursor: { x: number; y: number };
  visible: boolean;
};

const PREVIEW_WIDTH = 460;
const PREVIEW_HEIGHT = 250;

const ShowCasePreview = ({ media, cursor, visible }: ShowCasePreviewProps) => {
  // Track if component has mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted after first render
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  return (
    <motion.div
      className={styles.preview}
      // Only fade in on first render, don't animate x/y from 0
      initial={mounted ? false : { opacity: 0 }}
      animate={{
        x: cursor.x - PREVIEW_WIDTH - 90,
        y: cursor.y - PREVIEW_HEIGHT - 60,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.2,
        opacity: { duration: 0.3 }, // fade-in duration
      }}
      style={{ pointerEvents: "none" }}
    >
      <span className={classNames(styles.blob, styles.sm)}></span>
      <span className={classNames(styles.blob, styles.lg)}></span>
      <div className={styles.case}>
        {media ? (
          <Image
            src={media}
            className={styles.figure}
            alt=""
            width={300}
            height={200}
          />
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </div>
    </motion.div>
  );

};

export default ShowCasePreview;

