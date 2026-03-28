"use client";
import { useState, useRef } from 'react';
import { TransitionLink } from '@/src/components/transitions';
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

  const iconControls = useAnimationControls();

  return (
    <div className={styles.connect}>
      <TransitionLink href="/connect">
        <div 
          className={styles.btn}
          onMouseEnter={() => {
            iconControls.start({
              rotate: [0, 360],
              scale: [1, 0.65, 1.05, 1],
              transition: {
                duration: 0.5,
                ease: [0.65, 0, 0.35, 1],
                times: [0, 0.4, 0.8, 1],
              },
            });
          }}
          onMouseLeave={() => {
            iconControls.start({
              rotate: [360, 0],
              scale: [1, 0.65, 1.05, 1],
              transition: {
                duration: 0.5,
                ease: [0.65, 0, 0.35, 1],
                times: [0, 0.4, 0.8, 1],
              },
            });
          }}
        >
          <div className={styles.txt}><span>connect</span></div>
          <motion.svg
            width={33}
            height={33}
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={iconControls}
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <g id="accept">
              <rect id="rect" width={33} height={33} rx={3} className={styles['accept-btn']} />
              <path
                id="arrow"
                d="M17.3572 20.5499C17.2384 20.5499 17.1195 20.5058 17.029 20.4181C16.8474 20.2421 16.8474 19.9577 17.029 19.7818L19.9507 16.9499H9.92864C9.67236 16.9499 9.46436 16.7483 9.46436 16.4999C9.46436 16.2515 9.67236 16.0499 9.92864 16.0499H19.9507L17.029 13.2181C16.8474 13.0421 16.8474 12.7577 17.029 12.5818C17.2105 12.4058 17.5039 12.4058 17.6855 12.5818L21.3997 16.1818C21.4448 16.225 21.4782 16.2754 21.501 16.3285C21.5232 16.3807 21.5358 16.4383 21.5358 16.4986V16.5013C21.5358 16.5616 21.5232 16.6192 21.501 16.6714C21.4782 16.7249 21.4448 16.7749 21.3997 16.8181L17.6855 20.4181C17.5949 20.5058 17.4761 20.5499 17.3572 20.5499Z"
                className={styles.btnarrow}
              />
            </g>
          </motion.svg>
        </div>
      </TransitionLink>
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
