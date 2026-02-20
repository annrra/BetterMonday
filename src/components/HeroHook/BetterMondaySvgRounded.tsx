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
  { id: "bb", d: "M152.55 45.75C152.55 30.75 148.217 19.3333 139.55 11.5C130.883 3.83331 116.467 -1.52588e-05 96.3 -1.52588e-05C96.3 -1.52588e-05 12.8 -1.52588e-05 8.80005 -1.52588e-05C4.80005 -1.52588e-05 0.800049 4 0.800049 8C0.800049 12 0.800049 143.574 0.800049 147C0.800049 151 4.80005 155.25 8.80005 155.25C12.8 155.25 95.3001 155.25 95.3001 155.25C131.467 155.25 149.55 141.583 149.55 114.25C149.55 105.75 148.467 99.1666 146.3 94.5C144.3 89.8333 140.383 85.8333 134.55 82.5V81.5C146.55 76.8333 152.55 64.9166 152.55 45.75ZM73.8 39.5C81.0636 41.2699 81.0636 55.7301 73.8 57.5C71.9103 57.9604 70.6898 57.9604 68.8 57.5C61.5365 55.7301 61.5365 41.2699 68.8 39.5C70.6898 39.0395 71.9103 39.0395 73.8 39.5ZM73.8 102.5C80.8 104.5 81.1351 118 73.8 120.5C71.9338 121.136 70.6663 121.136 68.8 120.5C61.8 118.114 61.465 105 68.8 102.5C70.6663 101.864 71.9042 101.958 73.8 102.5Z" },
  { id: "be1", d: "M271.015 -1.52588e-05C271.015 -1.52588e-05 170.8 -1.52588e-05 166.8 -1.52588e-05C162.8 -1.52588e-05 158.515 4 158.515 8C158.515 11.4172 158.515 143 158.515 147C158.515 151 162.8 155.25 166.8 155.25C170.8 155.25 275.765 155.25 275.765 155.25L272.015 104.25H229.015V95.25H271.015L268.515 53.75H229.015V44.75H274.765L271.015 -1.52588e-05Z" },
  { id: "bt1", d: "M394.079 104.75H371.579V-1.52588e-05H300.829V104.75H275.829L278.329 155.25H397.329L394.079 104.75Z" },
  { id: "bt2", d: "M515.661 104.75H493.161V-1.52588e-05H422.411V104.75H397.411L399.911 155.25H518.911L515.661 104.75Z" },
  { id: "be2", d: "M637.015 -1.52588e-05C637.015 -1.52588e-05 536.8 -1.52588e-05 532.8 -1.52588e-05C528.8 -1.52588e-05 524.515 4 524.515 8C524.515 11.4172 524.515 143 524.515 147C524.515 151 528.8 155.25 532.8 155.25C536.8 155.25 641.765 155.25 641.765 155.25L638.015 104.25H595.015V95.25H637.015L634.515 53.75H595.015V44.75H640.765L637.015 -1.52588e-05Z" },
  { id: "br", d: "M728.808 155.25C751.141 155.25 767.475 151.167 777.808 143C788.141 134.833 793.308 122.25 793.308 105.25C793.308 88.4167 788.058 75.3333 777.558 66L798.308 -1.52588e-05H730.308L721.308 48.25H716.808V-1.52588e-05H646.308C646.308 -1.52588e-05 646.308 143 646.308 147C646.308 151 650.8 155.25 654.8 155.25H728.808ZM721.808 85C727.746 86.8704 727.746 99.1296 721.808 101C719.945 101.587 718.671 101.587 716.808 101C710.869 99.1296 710.869 86.8704 716.808 85C718.671 84.4132 719.945 84.4132 721.808 85Z" },
];

const lettersMonday = [
  { id: "mm", d: "M165.046 159.326H114.505L112.618 219.728H110.73L105.277 159.326H57.2525L52.429 219.728H50.7513L48.4444 159.326H0C0 159.326 5.02845 298 5.16425 302C5.30005 306 9.80005 309.967 13.8 309.967H74.2395L80.7407 255.144H83.6767L89.1293 309.967H151.8C155.8 310 159.8 306 159.882 302C159.964 298 165.046 159.326 165.046 159.326Z" },
  { id: "mo", d: "M162.191 235.495C162.191 262.502 167.504 281.989 178.129 293.957C188.895 306.086 206.651 312.15 231.397 312.15C256.144 312.15 273.76 306.166 284.245 294.199C294.871 282.394 300.184 262.988 300.184 235.98C300.184 209.135 294.731 189.244 283.826 176.306C272.921 163.369 255.235 156.9 230.768 156.9C206.441 156.9 188.895 163.288 178.129 176.064C167.504 188.839 162.191 208.65 162.191 235.495ZM231.801 219.411C239.611 220.377 239.611 243.444 231.801 244.411C231.024 244.507 230.578 244.507 229.801 244.411C221.991 243.444 221.991 220.377 229.801 219.411C230.578 219.314 231.024 219.314 231.801 219.411Z" },
  { id: "mn", d: "M419.8 159.326C415.8 159.326 373.987 159.326 373.987 159.326L350.29 207.599V159.326C350.29 159.326 311.8 159.326 307.8 159.326C303.8 159.326 299.329 163 299.329 167C299.329 171 299.329 298.571 299.329 302C299.329 306 303.8 309.967 307.8 309.967C311.8 309.967 354.484 309.967 354.484 309.967L376.294 261.209V309.967C376.294 309.967 415.8 309.967 419.8 309.967C423.8 309.967 427.675 306 427.675 302C427.675 298.571 427.675 171 427.675 167C427.675 163 423.8 159.326 419.8 159.326Z" },
  { id: "md", d: "M557.981 237.921C557.981 185.524 534.073 159.326 486.258 159.326C486.258 159.326 441.8 159.326 437.8 159.326C433.8 159.326 429.844 163 429.844 167C429.844 171 429.844 298.571 429.844 302C429.844 306 433.8 309.967 437.8 309.967C441.8 309.967 487.516 309.967 487.516 309.967C513.101 309.967 531.207 303.741 541.832 291.288C552.598 278.998 557.981 261.209 557.981 237.921ZM490.306 217.437C498.116 218.587 498.116 246.287 490.306 247.437C489.529 247.551 489.084 247.551 488.306 247.437C480.496 246.287 480.496 218.587 488.306 217.437C489.084 217.322 489.529 217.322 490.306 217.437Z" },
  { id: "ma", d: "M691.194 309.493H630.376L627.021 286.448H610.663L607.098 309.493H548.378C548.378 309.493 571.798 169.5 572.549 166C573.3 162.5 577.8 158.852 581.8 158.852C585.018 158.852 653.8 158.852 657.8 158.852C661.8 158.852 666.3 162 667.023 166C667.745 170 691.194 309.493 691.194 309.493ZM621.407 240.106C628.241 238.745 628.241 225.466 621.407 224.106C619.883 223.802 618.932 223.802 617.407 224.106C610.574 225.466 610.574 238.745 617.407 240.106C618.932 240.409 619.883 240.409 621.407 240.106Z" },
  { id: "my", d: "M795.267 166C793.733 170 762.487 270.438 762.487 270.438V309.493H703.347V270.195C703.347 270.195 672.809 169.5 671.555 166C670.3 162.5 673.8 158.852 677.8 158.852C681.8 158.852 727.675 158.852 727.675 158.852L732.917 208.338H735.434L740.677 158.852C740.677 158.852 784.8 158.852 788.8 158.852C792.8 158.852 796.8 162 795.267 166Z" },
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
      onTapStart={handleHoverStart}
      onTapCancel={handleHoverEnd}
      onTap={handleHoverEnd}
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
