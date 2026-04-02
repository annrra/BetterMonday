'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './pb.module.css';
import classNames from 'classnames';
import ManualGraphSvg from './ManualGraphSvg';
import { motion, AnimatePresence } from "framer-motion";

const PlayBook = () => {
  const [activePanel, setActivePanel] = useState('manual');
  const imageRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleMouseMove = (e: MouseEvent) => {
      if (!mediaQuery.matches) return;
      if (!mediaRef.current || !imageRef.current) return;

      const mediaRect = mediaRef.current.getBoundingClientRect();
      const relativeY = Math.min(Math.max((e.clientY - mediaRect.top) / mediaRect.height, 0), 1);
      const maxShift = imageRef.current.offsetHeight - mediaRect.height;
      const newY = -relativeY * maxShift;
      setOffsetY(Math.min(0, Math.max(-maxShift, newY)));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleResize = () => {
      if (!mediaQuery.matches) {
        setOffsetY(0);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={classNames(styles.playbook, styles[activePanel])}>
        <div className={styles.preface}>
          A brief manual on how to work with me.<br />
          Pretty simple to operate - no assembly required.<br />
          <span
            onClick={() => setActivePanel('manual')}
            className={classNames(styles.tab, styles['tab-manual'])}
          >
            Tweak
            <span>
              <svg
                width={62}
                height={85}
                viewBox="0 0 62 85"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles['tab-pointer']}
              >
                <path
                  id="arrow-manual"
                  d="M59.7471 84.0586C60.0194 84.1046 60.2774 83.9211 60.3234 83.6488L61.0725 79.2116C61.1185 78.9393 60.935 78.6813 60.6627 78.6354C60.3904 78.5894 60.1324 78.7729 60.0865 79.0452L59.4206 82.9893L55.4764 82.3234C55.2041 82.2775 54.9461 82.4609 54.9001 82.7332C54.8541 83.0055 55.0376 83.2635 55.3099 83.3095L59.7471 84.0586ZM10.7756 0.154445L10.3001 0.308931C15.0199 14.8372 11.3251 24.5702 7.1048 32.824C5.001 36.9384 2.71832 40.765 1.33295 44.5871C-0.0643955 48.4422 -0.579915 52.3612 0.855416 56.7219L1.33035 56.5655L1.80528 56.4092C0.459241 52.3198 0.928032 48.6387 2.27309 44.9279C3.63013 41.184 5.84795 37.4786 7.99516 33.2792C12.2769 24.9052 16.0861 14.8828 11.2512 -4.14002e-05L10.7756 0.154445ZM1.33035 56.5655L0.855416 56.7219C2.31474 61.1554 5.83431 63.6308 10.4033 65.2222C14.9536 66.807 20.6523 67.5514 26.5908 68.4599C38.5419 70.2882 51.5603 72.7987 59.4229 83.8554L59.8303 83.5656L60.2378 83.2758C52.1004 71.8325 38.6501 69.2931 26.742 67.4714C20.7508 66.5548 15.1722 65.8242 10.7322 64.2778C6.31096 62.7379 3.12734 60.4257 1.80528 56.4092L1.33035 56.5655Z"
                  className={styles['fill-contour']}
                />
              </svg>
            </span>
          </span>{" "}
          anything, challenge anything or{" "}
          <span
            onClick={() => setActivePanel('media')}
            className={classNames(styles.tab, styles['tab-media'])}
          >
            frame
            <span>
              <svg
                width={42}
                height={77}
                viewBox="0 0 42 77"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles['tab-pointer']}
              >
                <path
                  id="arrow-frame"
                  d="M40.0537 26.4389L39.5788 26.5953L40.0537 26.4389ZM22.7002 76.7925C22.8955 76.9877 23.2121 76.9877 23.4073 76.7925L26.5893 73.6105C26.7846 73.4152 26.7846 73.0986 26.5893 72.9034C26.3941 72.7081 26.0775 72.7081 25.8822 72.9034L23.0538 75.7318L20.2254 72.9034C20.0301 72.7081 19.7135 72.7081 19.5183 72.9034C19.323 73.0986 19.323 73.4152 19.5183 73.6105L22.7002 76.7925ZM0.499228 0.0277505L1.06529e-06 0.0555541C0.394664 7.14191 2.76091 11.3816 6.25669 13.9556C9.7188 16.5048 14.2119 17.358 18.7181 17.8594C23.2765 18.3667 27.8145 18.5159 31.6091 19.5886C35.3561 20.6478 38.2568 22.5788 39.5788 26.5953L40.0537 26.4389L40.5287 26.2826C39.0693 21.8489 35.8293 19.7424 31.8812 18.6263C27.9807 17.5237 23.2692 17.3597 18.8287 16.8655C14.3358 16.3656 10.0805 15.5293 6.84961 13.1503C3.65237 10.7962 1.38102 6.86919 0.998454 -5.30618e-05L0.499228 0.0277505ZM40.0537 26.4389L39.5788 26.5953C42.2716 34.7761 38.1989 40.6931 33.2277 47.9309C28.2802 55.134 22.5538 63.5216 22.5538 76.4389L23.0538 76.4389L23.5538 76.4389C23.5538 63.8563 29.1088 55.6939 34.0519 48.4971C38.9713 41.3349 43.3987 35.0019 40.5287 26.2826L40.0537 26.4389Z"
                  className={styles['fill-contour']}
                />
              </svg>
            </span>
          </span>{" "}
          it differently — good results will follow.
        </div>
        <AnimatePresence mode="wait">
          {activePanel === "manual" && (
            <motion.div 
              className={styles.manualgraph}
              key="manual"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <ManualGraphSvg />
            </motion.div>
          )}
          {activePanel === "media" && (
            <motion.div 
              className={styles['media-view']}
              key="media"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className={styles['media-frame']}
                ref={mediaRef}
              >
                <motion.div
                  ref={imageRef}
                  animate={{ y: offsetY }}
                  transition={{ type: 'spring', stiffness: 50, damping: 20 }}
                  className={styles['media-motion']}
                >
                  <Image
                    src="https://api.bettermonday.org/wp-content/uploads/cudillero-mirror.jpg"
                    alt=""
                    width={1400} // use actual image width
                    height={933} // use actual image height
                    className={styles.i}
                  />
                </motion.div>
              </motion.div>
              <div className={styles.caption}>
                Any resemblance to actual persons is not coincidental.<br />
                Inspired by true events.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePanel}
          className={classNames(
            styles['heart-pointer'],
            { [styles['ismedia']]: activePanel === 'media' }
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            viewBox="0 0 254 233"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles['heart-arrow']}
          >
            <path
              id="HeartShapedBoxArrow"
              d="M252.953 3.3279C253.109 3.10017 253.051 2.78895 252.823 2.63277L249.112 0.0876771C248.884 -0.0685018 248.573 -0.0104947 248.417 0.217237C248.261 0.444971 248.319 0.756195 248.546 0.912374L251.845 3.17467L249.583 6.47346C249.427 6.70119 249.485 7.01242 249.712 7.1686C249.94 7.32478 250.251 7.26677 250.408 7.03904L252.953 3.3279ZM121.04 124.545L121.54 124.514L121.539 124.503L121.04 124.545ZM252.54 3.04512C252.449 2.55358 252.448 2.55371 252.447 2.55394C252.446 2.55415 252.444 2.55448 252.442 2.55489C252.437 2.55573 252.431 2.55697 252.422 2.5586C252.405 2.56188 252.379 2.56677 252.345 2.57328C252.277 2.58632 252.176 2.60586 252.043 2.6321C251.778 2.68457 251.385 2.76378 250.873 2.87106C249.849 3.08561 248.351 3.41246 246.447 3.86223C242.639 4.76174 237.211 6.15307 230.723 8.12137C217.75 12.0573 200.528 18.3035 183.551 27.5435C149.62 46.0119 116.517 76.5339 120.542 124.587L121.04 124.545L121.539 124.503C117.564 77.0567 150.211 46.8286 184.029 28.4219C200.928 19.2244 218.081 13.0018 231.014 9.0783C237.479 7.11689 242.887 5.73086 246.677 4.83544C248.572 4.38774 250.062 4.06273 251.078 3.84979C251.586 3.74332 251.975 3.66488 252.237 3.61313C252.368 3.58726 252.467 3.56805 252.533 3.55536C252.567 3.54902 252.591 3.5443 252.608 3.54119C252.616 3.53963 252.622 3.53848 252.626 3.53772C252.628 3.53735 252.63 3.53708 252.631 3.53689C252.632 3.53672 252.632 3.53665 252.54 3.04512ZM121.04 124.545L120.541 124.576C123.523 172.537 93.4836 199.137 62.5763 213.781C47.1227 221.103 31.4756 225.42 19.6871 227.908C13.7942 229.151 8.86854 229.936 5.41759 230.41C3.6922 230.647 2.33565 230.807 1.41139 230.907C0.949248 230.957 0.595214 230.992 0.357195 231.014C0.238185 231.026 0.14819 231.034 0.0881795 231.039C0.0581738 231.042 0.035665 231.044 0.0207892 231.045C0.0133519 231.046 0.00782902 231.046 0.00420564 231.046C0.00239455 231.047 0.00113311 231.047 0.000238106 231.047C-0.000542592 231.047 -0.000840117 231.047 0.0403504 231.545C0.0815408 232.043 0.0822084 232.043 0.0833592 232.043C0.0843932 232.043 0.0860248 232.043 0.0880916 232.043C0.0922018 232.043 0.0982362 232.042 0.106162 232.041C0.122036 232.04 0.145547 232.038 0.176578 232.035C0.238596 232.03 0.330675 232.021 0.451779 232.01C0.693985 231.987 1.05234 231.951 1.51892 231.901C2.45209 231.8 3.81819 231.639 5.55374 231.401C9.02466 230.924 13.974 230.135 19.8936 228.886C31.7301 226.389 47.458 222.05 63.0044 214.685C94.0971 199.953 124.557 173.054 121.539 124.514L121.04 124.545Z"
              className={styles['fill-contour']}
            />
          </svg>
        </motion.div>
      </AnimatePresence>
    </>
  );

};

export default PlayBook;
