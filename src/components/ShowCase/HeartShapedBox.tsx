import { useState } from 'react';
import styles from './sc.module.css';
import { motion } from 'framer-motion';

const HeartShapedBox = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.box}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.heart}
        onClick={() => setLiked((prev) => !prev)}
      >
        <defs>
          <mask id="heart-fill-mask">
            {/* black = hidden */}
            <rect width="24" height="24" fill="black" />
            <motion.rect
              x="0"
              y="24"
              width="24"
              height="0"
              fill="white"
              initial={false}
              whileTap={{ y: 0, height: 24 }}
              animate={
                liked
                  ? { y: 0, height: 24 }
                  : { y: 24, height: 0 }
              }
              transition={{
                duration: 0.45,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            />
          </mask>
        </defs>
        <g id="HeartBox">
          <path
            id="HeartFill"
            d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
            className={styles['heart-full']}
            strokeLinecap="round"
            strokeLinejoin="round"
            mask="url(#heart-fill-mask)"
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