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
  { id: "mm", d: "M165.046 159.326H114.505L112.618 219.728H110.73L105.277 159.326H57.2525L52.429 219.728H50.7513L48.4444 159.326H0L5.45262 309.967H74.2395L80.7407 255.144H83.6767L89.1293 309.967H159.594L165.046 159.326Z" },
  { id: "mo", d: "M162.191 235.495C162.191 262.502 167.504 281.989 178.129 293.957C188.895 306.086 206.651 312.15 231.397 312.15C256.144 312.15 273.76 306.166 284.246 294.199C294.871 282.394 300.184 262.988 300.184 235.98C300.184 209.135 294.731 189.244 283.826 176.306C272.921 163.369 255.235 156.9 230.768 156.9C206.441 156.9 188.895 163.288 178.129 176.064C167.504 188.839 162.191 208.65 162.191 235.495ZM235.801 197.411V264.847H229.09V197.411H235.801Z" },
  { id: "mn", d: "M427.675 159.326H373.987L350.29 207.599V159.326H299.329V309.967H354.484L376.294 261.209V309.967H427.675V159.326Z" },
  { id: "md", d: "M557.981 237.921C557.981 185.524 534.073 159.326 486.258 159.326H429.844V309.967H487.516C513.101 309.967 531.207 303.741 541.832 291.288C552.598 278.998 557.981 261.209 557.981 237.921ZM494.017 197.411V264.847H487.306V197.411H494.017Z" },
  { id: "ma", d: "M691.194 309.493H630.376L627.021 286.448H610.663L607.098 309.493H548.378L573.753 158.852H665.818L691.194 309.493ZM622.407 254.185V224.106H615.696V254.185H622.407Z" },
  { id: "my", d: "M797.51 158.852L762.487 270.438V309.493H703.348V270.195L669.374 158.852H727.675L732.917 208.338H735.434L740.677 158.852H797.51Z" },
];

const words = ["quiet", "rainy", "calm dawn", "messy", "coffee", "call", "next", "skip", "honest", "damn", "flip", "scramble", "than"];

const BetterMondaySvg = () => {
  const [text, setText] = useState("calm dawn");
  const wordIndex = useRef(0);
  const { scrollY } = useScroll();

  // Scaling for MONDAY
  const scaleMonday = useTransform(scrollY, [0, 500], [1, 1.45]);
  const yOffsetMonday = useTransform(scaleMonday, s => (s - 1) * 75); // small translation to pin top
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
      viewBox="0 0 799 313"
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
