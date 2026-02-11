'use client';
import styles from './h.module.css';
import { motion, SVGMotionProps } from 'framer-motion';
import { useState, useRef } from 'react';
import { ComingSoonTooltip } from "@/src/components/_utils/ComingSoonTooltip";

const HeroExpandSvg = (props: SVGMotionProps<SVGSVGElement>) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className={styles.shell}>
      <ComingSoonTooltip>
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
              fill="#E9E9E9"
            />
            <g id="arrows">
              <path
                id="l"
                d="M36 35C36 35 50.8522 39.4609 64 35C58.5218 46.8565 64 62 64 62"
                fill="#8B9887"
              />
              <path
                id="r"
                d="M62 64C62 64 47.1478 59.5391 34 64C39.4782 52.1435 34 37 34 37"
                fill="#796655"
              />
            </g>
          </g>
        </svg>
      </ComingSoonTooltip>
    </div>
  );
};
export default HeroExpandSvg;
