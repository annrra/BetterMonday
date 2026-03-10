"use client";
import { useState, useId } from 'react';
import styles from './sc.module.css';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const HeartShapedBox = () => {
  const [liked, setLiked] = useState(false);
  const clipId = useId();

  return (
    <div className={styles.box}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setLiked((prev) => !prev)}
        className={classNames(styles.heart, {[styles.liked]: liked})}
      >
        <defs>
          <clipPath id={clipId}>
            <motion.rect
              x="0"
              y="0"
              width="24"
              height="24"
              fill="white"
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: liked ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
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
      </svg>
    </div>
  )
}

export default HeartShapedBox;