'use client';
import styles from './hs.module.css';
import { motion, SVGMotionProps } from 'framer-motion';

interface HueSliderKnobProps extends SVGMotionProps<SVGSVGElement> {
  hovered?: boolean;
}

const curveRange = [
  `M46.0855 54.1724C57.8957 67.0639 45.7289 77.3464 38.5 76.5005C33.647 75.9327 30.468 71.7701 29.6145 68.2172C28.7609 64.6643 32.95 55.4473 38.99 60.6727C45.0299 65.8982 46.4802 58.2501 37.0086 51.7291C27.537 45.2081 27.7457 36.6606 30.7542 33.9044C33.7627 31.1483 41.2003 30.2362 47.5122 43.9345C55.7533 61.8193 60.0644 51.7668 53.7938 43.6114C49.9769 38.6473 48.5561 29.3469 54.6936 26.0744C68.1085 19.6342 75.6421 41.8753 75.6987 44.9571C75.7745 49.0855 71.5613 53.0823 67.1324 47.6866C59.9385 38.9223 61.0306 47.636 63.5892 52.0815C66.1479 56.5269 65.8146 62.4666 61.4954 65.1241C57.1762 67.7815 51.6406 63.9679 49.432 53.6657C47.2235 43.3634 40.7744 41.5941 39.0265 43.561C35.9677 47.003 42.6824 50.9705 46.0855 54.1724Z`,
  `M46.0655 53.971C57.8756 66.8625 45.7089 77.145 38.4799 76.2991C33.6269 75.7312 30.448 71.5687 29.5944 68.0158C28.7409 64.4629 32.9299 55.2458 38.9699 60.4713C45.0099 65.6967 46.4602 58.0487 36.9886 51.5277C27.517 45.0066 27.7257 36.4592 30.7342 33.703C33.7427 30.9469 41.1803 30.0348 47.4922 43.733C55.7332 61.6179 60.0444 51.5654 53.7738 43.41C49.9569 38.4459 48.5361 29.1455 54.6736 25.873C68.0885 19.4328 75.6221 41.6739 75.6787 44.7556C75.7545 48.8841 71.5412 52.8809 67.1123 47.4852C59.9184 38.7209 61.0105 47.4346 63.5692 51.8801C66.1279 56.3255 65.7945 62.2652 61.4754 64.9227C57.1562 67.5801 51.6206 63.7665 49.412 53.4642C47.2034 43.162 40.7543 41.3927 39.0065 43.3596C35.9477 46.8016 42.6623 50.7691 46.0655 53.971Z`
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
        <g id="expand">
          <motion.path
            id="ellipse"
            d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z"
            className={styles['tone-neutral']}
          />
          <motion.g 
            id="curves"
            animate={{
              scale: hovered ? 1.05 : 1
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            {/* Gradient version */}
            <motion.path
              d={hovered ? curveRange[1] : curveRange[0]}
              fill="url(#gradient)"
              animate={{ opacity: hovered ? 1 : 0 }}
              initial={false}
            />

            {/* Solid version */}
            <motion.path
              d={hovered ? curveRange[1] : curveRange[0]}
              className={styles['tone-secondary']}
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.g>
        </g>
        <defs>
          <linearGradient
            id="gradient"
            x1={66.48}
            y1={30.2991}
            x2={47.98}
            y2={63.2991}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EA7A5D" />
            <stop offset={1} stopColor="#9874D7" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default HueSliderKnob;
