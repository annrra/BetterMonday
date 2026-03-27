"use client";
import { useState, useId, useEffect } from 'react';
import styles from './hsb.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

type HeartShapedBoxProps = {
  inline?: boolean;
}

const HeartShapedBox = ({ inline }: HeartShapedBoxProps) => {
  const [liked, setLiked] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const clipId = useId();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("heart-liked");
    if (saved === "true") {
      // Defer state update to avoid synchronous setState in effect body
      setTimeout(() => setLiked(true), 0);
    }
  }, []);

  const handleClick = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    localStorage.setItem("heart-liked", newLiked.toString());

    // Set toast message depending on like/unlike
    setToast(newLiked ? "Love it..." : "...or leave it");

    // Remove toast after few seconds
    setTimeout(() => setToast(null), 1500);
  };

  return (
    <div 
      className={classNames(styles.box, {[styles.liked]: liked}, {[styles.inline]: inline})}
      onClick={handleClick}
    >
      <motion.svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={classNames(styles.heart)}
        whileHover={{ scale: 1.10 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <defs>
          <clipPath id={clipId}>
            <motion.rect
              x="0"
              y="0"
              width="24"
              height="24"
              fill="white"
              rx="12"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: liked ? 1 : 0 }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </clipPath>
        </defs>
        <g id="HeartBox">
          <path
            id="HeartFill"
            d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
            className={styles['heart-full']}
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath={`url(#${clipId})`}
          />
          <path
            id="Heart"
            d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles['heart-stroke']}
          />
        </g>
      </motion.svg>
      <AnimatePresence>
        {toast && (
          <motion.div
            className={styles["heart-cta"]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeartShapedBox;