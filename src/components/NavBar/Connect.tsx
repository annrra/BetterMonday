"use client";
import { useState, useRef } from 'react';
import { TransitionLink } from '@/src/components/transitions';
import { motion, useAnimationControls } from 'framer-motion';
import styles from './nb.module.css';
import { scrambleText } from '@/src/components/_utils/Scramble';
import classNames from 'classnames';

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
      <TransitionLink href="/connect">
        <div className={styles.btn}><span>connect...</span></div>
        <svg
          width={33}
          height={33}
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="accept">
            <rect id="circle" width={33} height={33} rx={3} className={styles['accept-btn']} />
            <g id="arr" clipPath="url(#clip0_336_104)">
              <path
                id="Vector"
                d="M17.3572 20.5499C17.2384 20.5499 17.1195 20.5058 17.029 20.4181C16.8474 20.2421 16.8474 19.9577 17.029 19.7818L19.9507 16.9499H9.92864C9.67236 16.9499 9.46436 16.7483 9.46436 16.4999C9.46436 16.2515 9.67236 16.0499 9.92864 16.0499H19.9507L17.029 13.2181C16.8474 13.0421 16.8474 12.7577 17.029 12.5818C17.2105 12.4058 17.5039 12.4058 17.6855 12.5818L21.3997 16.1818C21.4448 16.225 21.4782 16.2754 21.501 16.3285C21.5232 16.3807 21.5358 16.4383 21.5358 16.4986V16.5013C21.5358 16.5616 21.5232 16.6192 21.501 16.6714C21.4782 16.7249 21.4448 16.7749 21.3997 16.8181L17.6855 20.4181C17.5949 20.5058 17.4761 20.5499 17.3572 20.5499Z"
                className={styles.btnarrow}
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_336_104">
              <rect width={13} height={9} fill="white" transform="translate(10 12)" />
            </clipPath>
          </defs>
        </svg>
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
          <motion.span
            className={classNames(styles.blob, styles['blob-sm'])}
            initial={{ opacity: 1, scale: 1 }}
            animate={blobSmControls}
          />
          <motion.span
            className={classNames(styles.blob, styles['blob-lg'])}
            initial={{ opacity: 1, scale: 1 }}
            animate={blobLgControls}
          />
        </div>
      )}
    </div>
  );

};

export default Connect;
