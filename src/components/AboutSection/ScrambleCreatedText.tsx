"use client";
import React, { useState, useRef } from 'react';
import { scrambleText } from '@/src/components/_utils/Scramble';
import styles from './as.module.css';

const words = [
  `Created ✨`,
  `Crafted 🔥`,
  `Built ⚡`,
  `Imagined 💡`,
  `Made with ☕`,
  `Engineered ⚡`,
  `Designed 🎨`,
  `Made with 🤍 by`
];

const ScrambleCreatedText = () => {
  const [createdText, setCreatedText] = useState("Created ✨");
  const wordIndex = useRef(0);

  const handleHoverStart = () => {
    const nextIndex = (wordIndex.current + 1) % words.length;
    const nextWord = words[nextIndex];

    scrambleText(createdText, nextWord, setCreatedText);
    wordIndex.current = nextIndex;
  };

  const handleHoverEnd = () => {
    scrambleText(createdText, "Created ✨", setCreatedText, 600, 0.2);
  };

  return (
    <div 
      className={styles.copy}
      onMouseEnter={() => handleHoverStart()}
      onMouseLeave={() => handleHoverEnd()}
    >
      {createdText} BetterMonday
    </div>
  );
}

export default ScrambleCreatedText;