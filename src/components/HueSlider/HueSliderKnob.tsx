'use client';
import React, { useEffect } from 'react';
import styles from './hs.module.css';
import { motion, useAnimation, SVGMotionProps } from 'framer-motion';

interface HueSliderKnobProps extends SVGMotionProps<SVGSVGElement> {
  hovered: boolean;
}

const lPathInitial = "M36 35C36 35 50.8522 39.4609 64 35C58.5218 46.8565 64 62 64 62";
const lPathHover   = "M38 33C38 33 52.8522 37.4609 66 33C60.5218 44.8565 66 60 66 60";

const rPathInitial = "M62 64C62 64 47.1478 59.5391 34 64C39.4782 52.1435 34 37 34 37";
const rPathHover   = "M60 66C60 66 45.1478 61.5391 32 66C37.4782 54.1435 32 39 32 39";

const HueSliderKnob: React.FC<HueSliderKnobProps> = ({ hovered, ...props }) => {
  const controlsL = useAnimation();
  const controlsR = useAnimation();

  useEffect(() => {
    if (!hovered) return;

    const animate = async () => {
      for (let i = 0; i < 2; i++) {
        // expand
        await Promise.all([
          controlsL.start({
            d: lPathHover,
            transition: { duration: 0.12, ease: [0.34, 1.56, 0.64, 1] }
          }),
          controlsR.start({
            d: rPathHover,
            transition: { duration: 0.12, ease: [0.34, 1.56, 0.64, 1] }
          })
        ]);

        // collapse
        await Promise.all([
          controlsL.start({
            d: lPathInitial,
            transition: { duration: 0.10, ease: "easeInOut" }
          }),
          controlsR.start({
            d: rPathInitial,
            transition: { duration: 0.10, ease: "easeInOut" }
          })
        ]);
      }
    };

    animate();
  }, [hovered, controlsL, controlsR]);

  return (
    <div className={styles.thumb}>
      <div className={styles.tooltip}>Slide up or down to adjust color</div>
      <motion.svg
        width={100}
        height={100}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.expand}
        {...props} // allow Framer Motion props
        animate={{
          scale: hovered ? 1.1 : 1,
          rotate: hovered ? 315 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <g id="expand">
          <motion.path
            id="ellipse"
            d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z"
            className={styles['tone-neutral']}
          />
          <motion.g 
            id="arrows"
            animate={{
              scale: hovered ? 0.9 : 1,
            }}
          >
            <motion.path
              id="l"
              className={styles['tone-primary']}
              d={lPathInitial}
              animate={controlsL}
            />
            <motion.path
              id="r"
              className={styles['tone-secondary']}
              d={rPathInitial}
              animate={controlsR}
            />
          </motion.g>
        </g>
      </motion.svg>
    </div>
  );
};

export default HueSliderKnob;
