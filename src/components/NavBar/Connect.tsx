"use client";
import { useState, useRef } from 'react';
import { FluidLink } from '@/src/components/ui/FluidLink';
import { motion, useAnimationControls } from 'framer-motion';
import styles from './nb.module.css';
import { scrambleText } from '@/src/components/_utils/Scramble';

type ConnectProps = {
  showConnectCta?: boolean;
};

const Connect = ({ showConnectCta = false }: ConnectProps) => {
  const [text, setText] = useState("Tell me about your project.\nLet's make it happen.");
  const wordIndex = useRef(0);
  const blobSmControls = useAnimationControls();
  const blobLgControls = useAnimationControls();

  const words = [
    `Tell me about your project.\nLet's make it happen.`,
    `Work, fun, or chaos?\nI'm listening.`,
    `42 deserves a proper introduction.`,
    `Now I'm curious.\nSay hi anyway.`
  ];

  const handleHoverStart = () => {
    const nextIndex = (wordIndex.current + 1) % words.length;
    const nextWord = words[nextIndex];

    scrambleText(text, nextWord, setText);
    wordIndex.current = nextIndex;

    blobSmControls.start({
      opacity: [1, 0, 1],
      scale: [1, 0.8, 1],
      transition: { duration: 0.35, times: [0, 0.3, 1], ease: 'easeInOut' },
    });

    blobLgControls.start({
      opacity: [1, 0, 1],
      scale: [1, 0.8, 1],
      transition: {
        duration: 0.35,
        times: [0, 0.3, 1],
        ease: 'easeInOut',
        delay: 0.1,
      },
    });
  };

  const handleHoverEnd = () => {
    scrambleText(text, "Tell me about your project.\nLet's make it happen.", setText, 600, 0.2);
    blobSmControls.start({ opacity: 1, scale: 1, transition: { duration: 0.15 } });
    blobLgControls.start({ opacity: 1, scale: 1, transition: { duration: 0.15 } });
  };

  return (
    <div className={styles.connect}>
      <FluidLink href="/connect" text="connect" transitionLink mode="alt" />
      {showConnectCta && (
        <div className={styles['cta-tooltip']}>
          <motion.div
            className={styles.cta}
            layout
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onMouseEnter={() => handleHoverStart()}
            onMouseLeave={() => handleHoverEnd()}
          >
            <span className={styles.flip}>
              {text}
            </span>
          </motion.div>
          <svg
            width={67}
            height={75}
            viewBox="0 0 67 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.pointer}
          >
            <g id="arrow">
              <path
                id="arrow-head"
                d="M48.968 0.266864C48.8392 0.0226069 48.5367 -0.0709773 48.2925 0.0578375L44.3121 2.157C44.0678 2.28581 43.9743 2.58824 44.1031 2.8325C44.2319 3.07676 44.5343 3.17034 44.7786 3.04153L48.3167 1.17561L50.1826 4.71374C50.3114 4.95799 50.6139 5.05158 50.8581 4.92276C51.1024 4.79395 51.196 4.49151 51.0672 4.24726L48.968 0.266864ZM48.2301 1.45552L48.7077 1.60332L49.0034 0.647907L48.5257 0.500103L48.0481 0.3523L47.7524 1.30772L48.2301 1.45552Z"
                className={styles['fill-contour']}
              />
              <path
                id="line"
                d="M4.38546 62.5086C15.9331 42.3443 30.3856 56.5086 42.3856 45.0086C54.3856 33.5086 40.8857 20.0089 48.3857 1.00891"
                className={styles['stroke-contour']}
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );

};

export default Connect;
