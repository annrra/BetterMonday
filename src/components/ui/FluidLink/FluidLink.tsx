'use client';
import Link from 'next/link';
import styles from './fl.module.css';
import classNames from 'classnames';
import { motion, easeInOut } from 'framer-motion';

type FluidLinkProps = {
  href?: string;
  text?: string;
  customClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const FluidLink = ({
  href = "/",
  text = "view live site",
  customClassName,
  onClick,
}: FluidLinkProps) => {

  // Animate the container to shift right on hover
  const containerVariants = {
    rest: { x: 0 },
    hover: { x: 20, transition: { duration: 0.3, ease: easeInOut } }
  };

  // Shrink on hover
  const rightIconVariants = {
    rest: { scale: 1, opacity: 1, rotate: 0 },
    hover: { scale: 0, opacity: 0, rotate: 90, transition: { duration: 0.3, ease: easeInOut } }
  };

  // Expand on hover
  const leftIconVariants = {
    rest: { scale: 0, opacity: 0, rotate: -90 },
    hover: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.3, ease: easeInOut } }
  };

  const leftSvgVariants = {
    rest: { scale: 0 },
    hover: { scale: 1, transition: { delay: 0.15, duration: 0.3, ease: easeInOut } }
  };

  return (
    <motion.div 
      className={classNames(styles.link, customClassName)}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={containerVariants}
    >
      <Link href={href} target='_blank' rel="noopener noreferrer" onClick={onClick}>
        <motion.span 
          className={classNames(styles['link-icon'], styles['link-icon-left'])}
          variants={leftIconVariants}
        >
          <motion.svg
            width={9}
            height={9}
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            variants={leftSvgVariants}
          >
            <path
              id="arr"
              d="M8.57387 5.94735C8.48983 6.03139 8.3746 6.08425 8.24853 6.08622C7.99575 6.09017 7.79465 5.88907 7.7986 5.63629L7.86217 1.56788L0.775496 8.65456C0.594275 8.83578 0.304644 8.8403 0.128999 8.66466C-0.0466465 8.48901 -0.042121 8.19938 0.1391 8.01816L7.22577 0.931487L3.15736 0.995056C2.90458 0.999005 2.70348 0.797904 2.70743 0.545124C2.71138 0.292343 2.91887 0.084857 3.17165 0.0809073L8.34363 9.51646e-05C8.40602 -0.00120262 8.4653 0.0107983 8.51893 0.0322591C8.5716 0.0534119 8.62119 0.0852765 8.66383 0.127915L8.66574 0.129825C8.70838 0.172463 8.74025 0.222057 8.7614 0.274726C8.78318 0.328678 8.79486 0.387635 8.79356 0.450027L8.71275 5.62201C8.71078 5.74808 8.65792 5.8633 8.57387 5.94735Z"
              className={styles.arr}
            />
          </motion.svg>
        </motion.span>
        
        <motion.span 
          className={styles['link-text']}
        >
          {text}
        </motion.span>

        <motion.span 
          className={classNames(styles['link-icon'], styles['link-icon-right'])}
          variants={rightIconVariants}
        >
          <svg
            width={9}
            height={9}
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="arr"
              d="M8.57387 5.94735C8.48983 6.03139 8.3746 6.08425 8.24853 6.08622C7.99575 6.09017 7.79465 5.88907 7.7986 5.63629L7.86217 1.56788L0.775496 8.65456C0.594275 8.83578 0.304644 8.8403 0.128999 8.66466C-0.0466465 8.48901 -0.042121 8.19938 0.1391 8.01816L7.22577 0.931487L3.15736 0.995056C2.90458 0.999005 2.70348 0.797904 2.70743 0.545124C2.71138 0.292343 2.91887 0.084857 3.17165 0.0809073L8.34363 9.51646e-05C8.40602 -0.00120262 8.4653 0.0107983 8.51893 0.0322591C8.5716 0.0534119 8.62119 0.0852765 8.66383 0.127915L8.66574 0.129825C8.70838 0.172463 8.74025 0.222057 8.7614 0.274726C8.78318 0.328678 8.79486 0.387635 8.79356 0.450027L8.71275 5.62201C8.71078 5.74808 8.65792 5.8633 8.57387 5.94735Z"
              className={styles.arr}
            />
          </svg>
        </motion.span>
      </Link>
    </motion.div>
  );

};

export default FluidLink;

