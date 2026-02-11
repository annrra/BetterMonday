'use client';
import React, { useState, useRef } from 'react';
import styles from './hh.module.css';
import { motion, Variants, useScroll, useTransform, useSpring } from 'framer-motion';
import { scrambleText } from '@/src/components/_utils/Scramble';

const flipVariants: Variants = {
  rest: { 
    scaleY: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  hover: (custom: { index: number; baseDelay?: number }) => ({
    scaleY: [1, -1, 1, -1],
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      delay: (custom.baseDelay ?? 0) + custom.index * 0.05,
    },
  }),
};

const lettersBetter = [
  { id: "bb", d: "M152.55 45.75C152.55 30.75 148.217 19.3333 139.55 11.5C130.883 3.83332 116.467 -1.52588e-05 96.3 -1.52588e-05H0.800049V155.25H95.3001C131.467 155.25 149.55 141.583 149.55 114.25C149.55 105.75 148.467 99.1667 146.3 94.5C144.3 89.8333 140.383 85.8333 134.55 82.5V81.5C146.55 76.8333 152.55 64.9167 152.55 45.75ZM78.8001 31.75V62.5H70.8V31.75H78.8001ZM78.8001 91V117H70.8V91H78.8001Z" },
  { id: "be1", d: "M271.015 -1.52588e-05H158.515V155.25H275.765L272.015 104.25H229.015V95.25H271.015L268.515 53.75H229.015V44.75H274.765L271.015 -1.52588e-05Z" },
  { id: "bt1", d: "M394.079 104.75H371.579V-1.52588e-05H300.829V104.75H275.829L278.329 155.25H397.329L394.079 104.75Z" },
  { id: "bt2", d: "M515.661 104.75H493.161V-1.52588e-05H422.411V104.75H397.411L399.911 155.25H518.911L515.661 104.75Z" },
  { id: "be2", d: "M636.493 -1.52588e-05H523.993V155.25H641.243L637.493 104.25H594.493V95.25H636.493L633.993 53.75H594.493V44.75H640.243L636.493 -1.52588e-05Z" },
  { id: "br", d: "M728.808 155.25C751.141 155.25 767.475 151.167 777.808 143C788.141 134.833 793.308 122.25 793.308 105.25C793.308 88.4167 788.058 75.3333 777.558 66L798.308 -1.52588e-05H730.308L721.308 48.25H716.808V-1.52588e-05H646.308V155.25H728.808ZM723.808 85V110.5H715.808V85H723.808Z" },
];

const lettersMonday = [
  { id: "mm", d: "M165.27 159H114.66L112.77 211.29H110.88L105.42 159H57.33L52.5 211.29H50.82L48.51 159H0L5.46 289.41H74.34L80.85 241.95H83.79L89.25 289.41H159.81L165.27 159Z" },
  { id: "mo", d: "M162.41 224.94C162.41 248.32 167.73 265.19 178.37 275.55C189.15 286.05 206.93 291.3 231.71 291.3C256.49 291.3 274.13 286.12 284.63 275.76C295.27 265.54 300.59 248.74 300.59 225.36C300.59 202.12 295.13 184.9 284.21 173.7C273.29 162.5 255.58 156.9 231.08 156.9C206.72 156.9 189.15 162.43 178.37 173.49C167.73 184.55 162.41 201.7 162.41 224.94ZM236.12 191.97V250.35H229.4V191.97H236.12Z" },
  { id: "mn", d: "M428.254 159H374.494L350.764 200.79V159H299.734V289.41H354.964L376.804 247.2V289.41H428.254V159Z" },
  { id: "md", d: "M558.736 227.04C558.736 181.68 534.796 159 486.916 159H430.426V289.41H488.176C513.796 289.41 531.926 284.02 542.566 273.24C553.346 262.6 558.736 247.2 558.736 227.04ZM494.686 191.97V250.35H487.966V191.97H494.686Z" },
  { id: "ma", d: "M692.13 289H631.23L627.87 269.05H611.49L607.92 289H549.12L574.53 158.59H666.72L692.13 289ZM623.25 241.12V215.08H616.53V241.12H623.25Z" },
  { id: "my", d: "M798.59 158.59L763.52 255.19V289H704.3V254.98L670.28 158.59H728.66L733.91 201.43H736.43L741.68 158.59H798.59Z" },
];

const words = ["quiet", "rainy", "calm dawn", "messy", "coffee", "call", "next", "skip", "honest", "damn", "flip", "scramble"];

const BetterMondaySvg = () => {
  const [text, setText] = useState("calm dawn");
  const wordIndex = useRef(0);
  const { scrollY } = useScroll();

  // Scaling for MONDAY
  const scaleMonday = useTransform(scrollY, [0, 500], [1, 1.95]);
  const yOffsetMonday = useTransform(scaleMonday, s => (s - 1) * 65); // small translation to pin top
  const smoothScaleMonday = useSpring(scaleMonday, { stiffness: 140, damping: 25 });
  const smoothYOffsetMonday = useSpring(yOffsetMonday, { stiffness: 140, damping: 25 });

  // Scaling for BETTER
  const scaleBetter = useTransform(scrollY, [0, 500], [1, 0.5]);
  const yOffsetBetter = useTransform(scaleBetter, s => (1 - s) * 75);
  const smoothScaleBetter = useSpring(scaleBetter, { stiffness: 140, damping: 25 });
  const smoothYOffsetBetter = useSpring(yOffsetBetter, { stiffness: 140, damping: 25 });


  const handleHoverStart = () => {
    const nextIndex = (wordIndex.current + 1) % words.length;
    const nextWord = words[nextIndex];

    scrambleText(text, nextWord, setText, 600, 0.4);
    wordIndex.current = nextIndex;
  };

  const handleHoverEnd = () => {
    scrambleText(text, "calm dawn", setText, 600, 0.4);
  };

  return (
    <motion.svg
      viewBox="0 0 799 292"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.pitch}
      initial="rest"
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <g id="bettermonday">
        <motion.g
          id="better"
          style={{
            scaleY: smoothScaleBetter,
            y: smoothYOffsetBetter,
            transformOrigin: "center bottom",
            transformBox: "fill-box",
          }}
        >
          {lettersBetter.map((letter, index) => (
            <motion.path
              key={letter.id}
              id={letter.id}
              d={letter.d}
              className={styles.glyph}
              variants={flipVariants}
              custom={{ index, baseDelay: 0 }} // no delay on first group
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
          ))}
        </motion.g>
        <motion.g
          id="monday"
          style={{
            scaleY: smoothScaleMonday,
            y: smoothYOffsetMonday,
            transformOrigin: "center top",
            transformBox: "fill-box",
          }}
        >
          {lettersMonday.map((letter, index) => (
            <motion.path
              key={letter.id}
              id={letter.id}
              d={letter.d}
              className={styles.glyph}
              variants={flipVariants}
              custom={{ index, baseDelay: 0.3 }} // second group starts with delay
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
          ))}
        </motion.g>
        <g id="clip" className={styles.rect}>
          <rect
            id="pad"
            x={330.8}
            y={137}
            width={138}
            height={44}
            rx={5}
            className={styles.pad}
          />
          <text
            id="affix"
            className={styles.txt}
            style={{
              whiteSpace: "pre",
            }}
            xmlSpace="preserve"
            fontFamily="Geist"
            fontSize={16}
            fontWeight={300}
            letterSpacing="0em"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan x={399.8} y={159}>
              {text}
            </tspan>
          </text>
        </g>
      </g>
    </motion.svg>
  );
};
export default BetterMondaySvg;
