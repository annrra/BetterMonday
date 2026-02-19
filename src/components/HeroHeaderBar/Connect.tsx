"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './hhb.module.css';
import { scrambleText } from '@/src/components/_utils/Scramble';
import { ComingSoonTooltip } from "@/src/components/_utils/ComingSoonTooltip";

type ConnectProps = {
  onOpenOverlay: () => void;
}

const Connect: React.FC<ConnectProps> = ({ onOpenOverlay }) => {
  const [text, setText] = useState("Tell me about your project.\nLet's make it happen.");
  const wordIndex = useRef(0);

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
  };

  const handleHoverEnd = () => {
    scrambleText(text, "Tell me about your project.\nLet's make it happen.", setText, 600, 0.2);
  };

  return (
    <div className={styles.topbar}>
      <div className={styles['connect-wrapper']}>
        <div className={styles.connect}>
          <Link 
            href="/"
            onClick={onOpenOverlay}
          >
            <div className={styles.btn}><span>connect...</span></div>
            <svg
              width={33}
              height={33}
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="accept">
                <rect id="rect" width={33} height={33} rx={5} className={styles['accept-btn']} />
                <path
                  id="arrow"
                  d="M22.7071 16.7071C23.0976 16.3166 23.0976 15.6834 22.7071 15.2929L16.3431 8.92893C15.9526 8.53841 15.3195 8.53841 14.9289 8.92893C14.5384 9.31946 14.5384 9.95262 14.9289 10.3431L20.5858 16L14.9289 21.6569C14.5384 22.0474 14.5384 22.6805 14.9289 23.0711C15.3195 23.4616 15.9526 23.4616 16.3431 23.0711L22.7071 16.7071ZM9 16V17H22V16V15H9V16Z"
                  className={styles.btnarrow}
                />
              </g>
            </svg>
          </Link>
          <div
            className={styles.cta}
            onMouseEnter={() => handleHoverStart()}
            onMouseLeave={() => handleHoverEnd()}
          >
            <span className={styles.flip}>
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Connect;
