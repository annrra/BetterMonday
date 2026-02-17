'use client';
import styles from './hs.module.css';
import { motion, SVGMotionProps } from 'framer-motion';
import { useState, useRef } from 'react';

const HueSliderKnob = (props: SVGMotionProps<SVGSVGElement>) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className={styles.thumb}>
      <div className={styles.tooltip}>Slide up or down to adjust color</div>
      <svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.expand}
      >
        <g id="expand">
          <path
            id="ellipse"
            d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z"
            className={styles['tone-neutral']}
          />
          <g id="arrows">
            <path
              id="l"
              d="M36 35C36 35 50.8522 39.4609 64 35C58.5218 46.8565 64 62 64 62"
              className={styles['tone-primary']}
            />
            <path
              id="r"
              d="M62 64C62 64 47.1478 59.5391 34 64C39.4782 52.1435 34 37 34 37"
              className={styles['tone-secondary']}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
export default HueSliderKnob;
