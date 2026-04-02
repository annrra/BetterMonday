'use client';
import styles from './mls.module.css';
import { motion, SVGMotionProps, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

const SYMBOLS = [
  <path
    key="m1"
    id="m1"
    d="M15.8645 27.2714C17.9041 31.2979 12.9646 33.9412 10.957 30.3758C8.94933 26.8103 10.5427 19.0647 11.7218 16.4521C13.3864 12.7637 18.2227 9.47481 22.6204 11.7494C26.2533 13.8703 25.0423 17.2205 24.3731 18.1119C23.7039 19.0032 18.9556 24.1363 20.3578 24.8739C21.76 25.6116 25.9027 20.3556 26.2851 19.7409C26.6676 19.1262 29.2488 15.2226 32.6267 16.4521C36.0047 17.6816 34.9212 25.2735 34.475 26.8103C34.0289 28.3472 31.5433 34.2179 28.7708 32.7732C25.9983 31.3286 28.229 28.4086 29.3444 27.2714C30.4598 26.1341 34.6982 19.2799 31.9575 18.1119C29.2169 16.9439 27.9741 22.9375 26.8588 24.8739C25.7434 26.8103 22.716 32.2507 18.6051 30.1914C14.4942 28.132 18.6051 22.9375 18.6051 22.9375C18.6051 22.9375 20.9314 20.4479 20.6446 17.2205C20.3578 13.9932 16.0239 14.5958 15.1316 16.4521C14.2393 18.3084 13.825 23.2449 15.8645 27.2714Z"
    className={styles.fdark}
  />,
  <path
    key="te"
    id="te"
    d="M23.1548 25.0723C23.2497 25.9119 25.3376 27.218 25.4325 28.6173C25.5274 30.0167 24.7681 30.6697 23.1548 30.9496C20.4974 31.4104 18.6943 28.6173 18.5994 26.4717C18.5044 24.326 18.6943 24.6059 18.4095 21.6206C18.1248 18.6353 17.1758 18.4487 14.7083 17.9823C13.8541 17.7957 13 17.4226 13 15.8366C13 14.2507 14.3287 13.691 15.7522 13.3178C17.1758 12.9446 21.6741 13.0087 22.87 13.0087C24.066 13.0087 28.1617 12.7284 28.9392 15.3554C29.7167 17.9823 22.7751 17.889 22.87 18.8219C22.965 19.7548 25.4325 20.6877 25.4325 22.087C25.4325 23.4864 23.0599 24.2327 23.1548 25.0723Z"
    className={styles.fdark}
  />,
  <path
    key="m2"
    id="m2"
    d="M15.8854 27.8295C14.4315 29.5202 12.2104 29.3793 11.645 27.4068C10.7566 24.3072 10.9575 21.0499 11.2402 19.0774C11.5229 17.1049 12.3746 14.1732 14.8703 13.2608C17.366 12.3484 20.1446 13.7237 20.6559 19.0775C21.1672 24.4313 23.8007 17.0777 26.6276 15.8535C29.4545 14.6294 30.868 17.2625 31.4333 19.5168C31.9987 21.7711 31.9987 25.2934 31.9987 25.2934C31.9987 25.2934 32.1401 28.8158 29.4545 28.8158C26.7689 28.8158 26.4862 25.2934 25.0728 25.2934C23.6593 25.2934 23.6593 28.9566 21.1151 28.8158C19.419 28.8158 19.1363 24.8707 18.0055 24.8707C16.8748 24.8707 16.7334 26.8432 15.8854 27.8295Z"
    className={styles.fdark}
  />,
  <path
    key="o"
    id="o"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M13.4092 16.5736C16.1575 12.6086 22.0079 11.8235 26.4764 14.8205C30.9449 17.8176 32.339 23.4614 29.5909 27.4264C26.8426 31.3914 20.9922 32.1765 16.5236 29.1795C12.0551 26.1824 10.661 20.5386 13.4092 16.5736ZM21.1511 19.1803C19.4643 18.0491 17.2562 18.3456 16.2188 19.8423C15.1815 21.3391 15.7075 23.4696 17.3943 24.6009C19.0811 25.7322 21.2899 25.4356 22.3273 23.9389C23.3646 22.4421 22.8379 20.3116 21.1511 19.1803Z"
    className={styles.fdark}
  />,
  <path
    key="n"
    id="n"
    d="M7.53467 29.6144C6.36672 28.6794 7.31837 27.0704 8.42144 26.1789C12.8769 22.9609 14.153 22.3086 17.181 17.5686C19.4737 13.8287 22.1124 15.1116 21.9826 19.1341C21.8528 23.1566 24.4266 26.5486 27.3465 23.7002C30.2663 20.8518 30.8969 17.3264 32 15.5C33.1031 13.6736 34.9382 13.7852 35.76 14.3288C36.3224 14.7007 35.76 16.1633 35.4572 16.3509C32.2994 18.3079 32.2036 19.1729 29.5 24.5C26.7964 29.8271 21.4635 32.0279 18.2408 22.1347C17.0513 18.7644 12.8337 23.0696 10.9304 28.6142C10.587 29.6144 8.70261 30.5494 7.53467 29.6144Z"
    className={styles.fdark}
  />,
  <path
    key="e2"
    id="e2"
    d="M15.8659 15.1092C18.7478 12.4022 23.5163 12.0522 27.8437 14.9212C29.3073 16.3225 29.7032 19.3523 27.5005 19.4999C25.2978 19.6475 23.8001 18.6914 22.9639 18.6787C21.0005 18.5 20.3177 20.3645 22.0245 20.6164C23.7312 20.8683 24.4847 20.6839 25.6411 20.9727C26.7974 21.2615 26.6182 23.1428 25.1404 23.1808C23.6626 23.2187 21.3537 22.6184 20.3429 22.6785C18.3987 22.794 18.738 24.042 20.2165 24.4115C20.7945 24.5559 25.2624 23.921 27.198 25.2104C29.1336 26.4999 28.9841 29.2119 26.7643 30.4746C23.4392 32.0897 19.2645 30.542 15.889 27.5291C12.5134 24.5163 12.984 17.8162 15.8659 15.1092Z"
    className={styles.fdark}
  />,
  <path
    key="m3"
    id="m3"
    d="M17.7804 30.1055C16.6779 31.3975 14.9937 31.2899 14.5649 29.7825C13.8913 27.4138 13.9218 16.6471 14.1362 15.1397C14.3506 13.6324 14.7793 11.802 16.8157 12.0174C18.8522 12.2327 19.4291 13.5248 19.8168 17.6161C20.2045 21.7073 24.64 20.9538 25.9261 20.9538C27.2123 20.9538 29.1416 22.0305 29.5703 23.7531C29.999 25.4758 29.999 28.1675 29.999 28.1675C29.999 28.1675 30.1062 30.8592 28.0698 30.8592C26.0333 30.8592 25.819 28.1675 24.7472 28.1675C23.6753 28.1675 23.6753 30.9669 21.7461 30.8592C20.4599 30.8592 20.2455 27.8445 19.3881 27.8445C18.5306 27.8445 18.4235 29.3519 17.7804 30.1055Z"
    className={styles.fdark}
  />,
];

type MondayLogoSvgProps = SVGMotionProps<SVGSVGElement> & {
  autoScramble?: boolean;
  mode?: 'dark' | 'light';
};

const MondayLogoSvg = ({ autoScramble = false, mode = 'dark', ...props }: MondayLogoSvgProps) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const runScramble = (infinite = false) => {
    let i = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    const totalSteps = SYMBOLS.length * 3;

    intervalRef.current = setInterval(() => {
      setIndex(Math.floor(Math.random() * SYMBOLS.length));
      i++;

      if (!infinite && i >= totalSteps) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIndex(0);
      }
    }, 120);
  };

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIndex(0);
  };

  // Auto mode
  useEffect(() => {
    if (autoScramble) {
      runScramble(true);
    } else {
      stopScramble();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoScramble]);

  const circleVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.18 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ touchAction: "manipulation" }}
      className={classNames(styles.logofigure, { [styles.light]: mode === 'light' })}
      initial="initial"
      whileHover={!autoScramble ? "hover" : undefined}
      whileTap={!autoScramble ? "tap" : undefined}
    >
      <g id="logofigure">
        <motion.g 
          id="circle"
          variants={circleVariants}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <circle
            id="ellipse"
            cx={22}
            cy={22}
            r={22}
            className={styles.fpath}
          />
        </motion.g>
        <motion.g id="ico" style={{ position: "relative" }}>
          <AnimatePresence mode="sync">
            <motion.g
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{
                duration: 0.18,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute"
              }}
            >
              {SYMBOLS[index]}
            </motion.g>
          </AnimatePresence>
        </motion.g>
      </g>
    </motion.svg>
  );
};

export default MondayLogoSvg;
