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
  { id: "bb", d: "M152.55 45.75C152.55 30.75 148.217 19.3333 139.55 11.5C130.883 3.83332 116.467 -1.52588e-05 96.3 -1.52588e-05H7.80005C3.80005 0 0.800049 3 0.800049 7V148C0.800049 152 3.80005 155 7.80005 155.25H95.3001C131.467 155.25 149.55 141.583 149.55 114.25C149.55 105.75 148.467 99.1667 146.3 94.5C144.3 89.8333 140.383 85.8333 134.55 82.5V81.5C146.55 76.8333 152.55 64.9167 152.55 45.75ZM78.8001 36V58C78.8001 58 78.8001 62.5 74.8 62.5C70.8 62.5 70.8 58 70.8 58V36C70.8 36 70.8 31.75 74.8 31.75C78.8001 31.75 78.8001 36 78.8001 36ZM78.8001 95V113C78.8001 113 78.8001 117 74.8 117C70.8 117 70.8 113 70.8 113V95C70.8 95 70.8 91 74.8 91C78.8001 91 78.8001 95 78.8001 95Z" },
  { id: "be1", d: "M271.015 -1.52588e-05H165.8C161.8 0 158.8 3 158.515 7V148C158.8 152.5 161.3 155 165.8 155.25H275.765L272.015 104.25H233.8C233.8 104.25 229.23 104.5 229.015 100C228.8 95.5 233.8 95.25 233.8 95.25H271.015L268.515 53.75H233.8C233.8 53.75 228.73 53 229.015 49C229.3 45 233.8 44.75 233.8 44.75H274.765L271.015 -1.52588e-05Z" },
  { id: "bt1", d: "M394.079 104.75H375.8C372.8 104.75 371.8 103.5 371.579 100.792V7C371.3 2.5 368.8 0 364.3 0L307.8 -1.52588e-05C303.8 0 300.8 3 300.829 7V100.5C300.8 103 299.3 104.5 296.8 104.75H275.829L277.97 148C278.3 152 281.8 155 285.8 155.25H397.329L394.079 104.75Z" },
  { id: "bt2", d: "M516.079 104.75H497.8C494.8 104.75 493.8 103.5 493.579 100.792V6.99994C493.3 2.49994 490.8 -6.10352e-05 486.3 -6.10352e-05L429.8 -7.62939e-05C425.8 -6.10352e-05 422.8 2.99994 422.829 6.99994V100.5C422.8 103 421.3 104.5 418.8 104.75H397.829L400.329 155.25H511.8C516.3 155 519.3 152 518.863 148L516.079 104.75Z" },
  { id: "be2", d: "M637.015 -7.62939e-05H531.8C527.8 -6.10352e-05 524.8 2.99994 524.515 6.99994V148C524.8 152.5 527.3 155 531.8 155.25H641.765L638.015 104.25H599.8C599.8 104.25 595.23 104.5 595.015 99.9999C594.8 95.4999 599.8 95.2499 599.8 95.2499H637.015L634.515 53.7499H599.8C599.8 53.7499 594.73 52.9999 595.015 48.9999C595.3 44.9999 599.8 44.7499 599.8 44.7499H640.765L637.015 -7.62939e-05Z" },
  { id: "br", d: "M728.808 155.25C751.141 155.25 767.475 151.167 777.808 143C788.141 134.833 793.308 122.25 793.308 105.25C793.308 88.4167 788.058 75.3333 777.558 66C777.558 66 795.043 9 796.422 6C797.8 3 794.8 0 790.8 -1.52588e-05H737.8C733.8 0 729.8 2 729.176 6.07034C728.68 9.29908 724.02 33.9458 722.114 44C722.114 44 721.3 48.5 719.058 48.25C716.816 48 716.808 44 716.808 44C716.808 44 716.808 21.4494 716.808 7C716.8 3 713.8 0 709.8 -1.52588e-05H653.8C649.8 0 646.3 3 646.308 7V148C646.3 152 649.8 155 653.8 155.25H728.808ZM723.808 89V106C723.808 106 723.8 110.5 719.808 110.5C715.816 110.5 715.808 106 715.808 106V89C715.808 89 715.816 85 719.808 85C723.8 85 723.808 89 723.808 89Z" },
];

const lettersMonday = [
  { id: "mm", d: "M165.046 159.326H114.505L112.659 218.41C112.659 218.41 112.3 220 111.632 219.728C110.964 219.455 110.611 218.41 110.611 218.41L105.902 166.247C105.3 161 102.175 159.326 97.8 159.326H64.8C60.8 159.5 57.3 161.5 56.7195 166L52.5112 218.699C52.5112 218.699 52.3 219.5 51.5901 219.728C50.8802 219.955 50.712 218.699 50.712 218.699L48.4444 159.326H0L5.20045 303C5.30005 307 8.80005 310 12.8 309.967H66.8C70.8 310 74.8 307 75.0656 303L80.5077 257.108C80.5077 257.108 80.6173 255.288 82.2087 255.144C83.8 255 83.8721 257.108 83.8721 257.108L88.4364 303C88.8 307 92.8 310 96.8 309.967H152.8C156.8 310 159.8 307 159.846 303L165.046 159.326Z" },
  { id: "mo", d: "M163.191 235.495C163.191 262.502 167.504 281.989 178.129 293.957C188.895 306.086 206.651 312.15 231.397 312.15C256.144 312.15 273.76 306.166 284.246 294.199C294.871 282.394 299.184 262.988 299.184 235.98C299.184 209.135 294.731 189.244 283.826 176.306C272.921 163.369 255.235 156.9 230.768 156.9C206.441 156.9 188.895 163.288 178.129 176.064C167.504 188.839 163.191 208.65 163.191 235.495ZM235.801 202V260.5C235.801 260.5 235.8 265 232.446 264.847C229.091 264.695 229.09 260.5 229.09 260.5V202C229.09 202 229.091 197.321 232.446 197.411C235.8 197.5 235.801 202 235.801 202Z" },
  { id: "mn", d: "M420.8 159.326H373.988L352.547 203C352.547 203 350.3 208 350.29 203V159.326H306.8C302.8 159.5 299.3 162.5 299.329 166.5V303C299.3 307 302.8 310 306.8 309.967H354.484L373.704 267C373.704 267 376.3 260.5 376.294 267V309.967H420.8C424.8 310 427.8 307 427.675 303V166.338C427.8 162 425.3 159.5 420.8 159.326Z" },
  { id: "md", d: "M557.981 237.921C557.981 185.524 534.073 159.326 486.258 159.326H436.8C432.8 159.5 429.8 163 429.844 167V303C429.8 307 432.8 310 436.8 309.967H487.516C513.101 309.967 531.207 303.741 541.832 291.288C552.598 278.998 557.981 261.209 557.981 237.921ZM494.017 201.268V260.754C494.017 260.754 493.8 265 490.526 264.847C487.252 264.695 487.306 260.754 487.306 260.754V201.268C487.306 201.268 487.134 197.821 490.467 197.411C493.8 197 494.017 201.268 494.017 201.268Z" },
  { id: "ma", d: "M691.194 309.493H630.376L627.975 293C627.3 288.5 624.8 286.5 620.8 286.448H616.8C612.8 286.5 610.3 289 609.649 293L607.098 309.493H548.377L572.613 165.622C573.3 161.5 576.8 159 580.8 158.852H658.8C662.8 159 666.3 161.5 667.022 166L691.194 309.493ZM622.407 249.912V228C622.407 228 622.3 224 618.8 224.106C615.3 224.211 615.696 228 615.696 228V249.793C615.696 249.793 615.696 254.183 619.052 254.185C622.407 254.188 622.407 249.912 622.407 249.912Z" },
  { id: "my", d: "M797.51 158.852L763.88 266C762.8 269 762.3 271 762.487 274V309.493H703.348V274C703.3 271 702.8 268.5 702.067 266L669.374 158.852H720.8C725.3 158.852 727.8 162 728.432 166L732.617 205.5C732.617 205.5 733.052 208.176 734.176 208.338C735.3 208.5 735.735 205.5 735.735 205.5L739.92 166C740.3 161.5 743.8 159 747.8 158.852H797.51Z" },
];

const words = ["quiet", "rainy", "calm down", "messy", "coffee", "call", "next", "skip", "honest", "damn", "flip", "scramble", "than"];

const BetterMondaySvg = () => {
  const [text, setText] = useState("calm down");
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
    scrambleText(text, "calm down", setText, 600, 0.4);
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
