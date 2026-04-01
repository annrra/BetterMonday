'use client';
import React, { useEffect } from 'react';
import styles from './hs.module.css';
import { motion, useAnimation, SVGMotionProps } from 'framer-motion';

interface HueSliderKnobProps extends SVGMotionProps<SVGSVGElement> {
  hovered?: boolean;
}

const curveRange = [
  `M46.0855 54.1724C57.8957 67.0639 45.7289 77.3464 38.5 76.5005C33.647 75.9327 30.468 71.7701 29.6145 68.2172C28.7609 64.6643 32.95 55.4473 38.99 60.6727C45.0299 65.8982 46.4802 58.2501 37.0086 51.7291C27.537 45.2081 27.7457 36.6606 30.7542 33.9044C33.7627 31.1483 41.2003 30.2362 47.5122 43.9345C55.7533 61.8193 60.0644 51.7668 53.7938 43.6114C49.9769 38.6473 48.5561 29.3469 54.6936 26.0744C68.1085 19.6342 75.6421 41.8753 75.6987 44.9571C75.7745 49.0855 71.5613 53.0823 67.1324 47.6866C59.9385 38.9223 61.0306 47.636 63.5892 52.0815C66.1479 56.5269 65.8146 62.4666 61.4954 65.1241C57.1762 67.7815 51.6406 63.9679 49.432 53.6657C47.2235 43.3634 40.7744 41.5941 39.0265 43.561C35.9677 47.003 42.6824 50.9705 46.0855 54.1724Z`,
  `M46.0855 54.1724C57.8957 67.0639 48.0856 72.9819 56.0002 78.5004C51.1472 77.9325 39.8801 90.0534 39.0266 86.5005C38.1731 82.9476 29.9602 66.775 36.0002 72.0004C42.0402 77.2259 46.4803 58.2501 37.0087 51.7291C27.5371 45.2081 27.7458 36.6606 30.7543 33.9044C33.7628 31.1483 41.2004 30.2362 47.5123 43.9345C55.7533 61.8193 56.0002 29.5005 44.5 29.5005C40.6831 24.5364 47.5855 20.5005 54 12.0005C65.0893 18.0005 71.9434 27.4187 72 30.5005C72.0758 34.629 69.9289 39.3001 65.5 33.9044C58.3061 25.1401 61.0306 47.636 63.5893 52.0815C66.148 56.527 65.8146 62.4666 61.4954 65.1241C57.1763 67.7815 51.6407 63.9679 49.4321 53.6657C47.2235 43.3634 40.7744 41.5941 39.0266 43.561C35.9677 47.003 42.6824 50.9705 46.0855 54.1724Z`
];

const HueSliderKnob = ({ hovered = false }: HueSliderKnobProps) => {

  return (
    <div className={styles.thumb}>
      <div className={styles.tooltip}>Slide up or down to adjust color</div>
      <motion.svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        className={styles.expand}
        initial="initial"
        whileHover="hover"
      >
        <motion.g 
          id="expand"
        >
          <motion.path
            id="ellipse"
            d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z"
            className={styles['tone-neutral']}
          />
          <motion.g 
            id="curves"
            animate={{
              scale: hovered ? 0.85 : 1
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            style={{ originX: 0.3, originY: 0.5 }}
          >
            <motion.path
              initial={{ d: curveRange[0] }}
              animate={{
                d: hovered ? curveRange[1] : curveRange[0],
                scale: hovered ? 0.95 : 1
              }}
              transition={{ duration: 0.3 }}
              className={styles['tone-secondary']}
            />
          </motion.g>
        </motion.g>
      </motion.svg>
    </div>
  );
};

export default HueSliderKnob;
