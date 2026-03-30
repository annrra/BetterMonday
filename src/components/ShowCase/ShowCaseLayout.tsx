'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './scl.module.css';
import classNames from 'classnames';
import ShowCaseHeader from './ShowCaseHeader';
import ShowCaseNav from './ShowCaseNav';
import { HeartShapedBox } from '@/src/components/ui/HeartShapedBox';
import ShowCasePreview from './ShowCasePreview';
import { ShowCaseEntry } from './ShowCaseServer';
import { scrambleText } from '@/src/components/_utils/Scramble';
import { motion, AnimatePresence } from 'framer-motion';
import { style } from 'framer-motion/client';

export type ShowCaseListProps = {
  items: ShowCaseEntry[];
}

const ShowCaseLayout = ({items}: ShowCaseListProps) => {
  const hasItems = Array.isArray(items) && items.length > 0;

  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (dir: number) => {
    setIndex(([prev]) => [
      (prev + dir + items.length) % items.length,
      dir,
    ]);
  };

  const selected = items[index];
  //console.log(JSON.stringify(selected, null, 2));
  
  
  const prevIndex = (index - 1 + items.length) % items.length;
  const nextIndex = (index + 1) % items.length;
  const prevItem = items[prevIndex];
  const nextItem = items[nextIndex];

  const isVideo = selected.snapshotMimeType?.startsWith('video/');

  const [scrambledTags, setScrambledTags] = useState(selected.tags);
  
  useEffect(() => {
    setScrambledTags(selected.tags);
  }, [selected]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 10 : -10,
      opacity: 0,
      scale: 0.98,
      filter: "blur(3px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -10 : 10,
      opacity: 0,
      scale: 0.98,
      filter: "blur(3px)",
    }),
  };

  if (!hasItems) {
    return (
      <div className={styles.board}>
        <div className={styles.empty}>No projects available yet.</div>
      </div>
    );
  }

  return (
    <div className={classNames(styles.board, styles[selected.slug], {[styles.dark]: selected.colorMode === "dark"})}>

      <>
        <AnimatePresence mode="wait">
          {selected.backdropUrl && (
            <motion.div
              key={selected.backdropUrl}
              className={styles.frame}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src={selected.backdropUrl}
                alt={selected.backdropAltText}
                className={styles.backdrop}
                priority
                width={0}
                height={0}
                sizes="100vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <ShowCaseHeader />
        <ShowCaseNav mode={selected.colorMode} />
        <HeartShapedBox />

      
        <div className={styles.pane}>
          <div className={classNames(styles.panel, styles.data)}>
            <div className={styles.body}>

              <div className={styles.slide}>
                <div className={classNames(styles.paginate, styles.prev)} onClick={() => paginate(-1)}>
                  <svg
                    width={45}
                    height={8}
                    viewBox="0 0 45 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="prev"
                      d="M0.146446 3.32845C-0.0488167 3.52371 -0.0488167 3.84029 0.146446 4.03556L3.32843 7.21754C3.52369 7.4128 3.84027 7.4128 4.03553 7.21754C4.2308 7.02228 4.2308 6.70569 4.03553 6.51043L1.20711 3.682L4.03553 0.853576C4.2308 0.658314 4.2308 0.341732 4.03553 0.146469C3.84027 -0.0487928 3.52369 -0.0487928 3.32843 0.146469L0.146446 3.32845ZM44.5 3.68201L44.5 3.18201L0.5 3.182L0.5 3.682L0.5 4.182L44.5 4.18201L44.5 3.68201Z"
                      className={styles['fill-paginate']}
                    />
                  </svg>
                  <motion.span 
                    className={styles['paginate-name']}
                    key={prevItem.title}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {prevItem.title}
                  </motion.span>
                </div>
                <AnimatePresence mode='wait'>
                  <motion.div 
                    className={styles.snapframe}
                    key={selected.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    {isVideo ? (
                      <video
                        src={selected.snapshotUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className={styles.video}
                      />
                    ) : (
                      <Image
                        src={selected.snapshotUrl ? selected.snapshotUrl : "https://bettermonday.org/wp-content/uploads/cudillero-mirror.jpg"}
                        alt={selected.snapshotAltText}
                        className={styles.snapshot}
                        priority
                        width={0}
                        height={0}
                        sizes="100vw"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className={classNames(styles.paginate, styles.next)} onClick={() => paginate(1)}>
                  <motion.span 
                    className={styles['paginate-name']}
                    key={nextItem.title}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    {nextItem.title}
                  </motion.span>
                  <svg
                    width={45}
                    height={8}
                    viewBox="0 0 45 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="next"
                      d="M44.3536 3.32845C44.5488 3.52371 44.5488 3.84029 44.3536 4.03556L41.1716 7.21754C40.9763 7.4128 40.6597 7.4128 40.4645 7.21754C40.2692 7.02228 40.2692 6.70569 40.4645 6.51043L43.2929 3.682L40.4645 0.853576C40.2692 0.658314 40.2692 0.341732 40.4645 0.146469C40.6597 -0.0487928 40.9763 -0.0487928 41.1716 0.146469L44.3536 3.32845ZM0 3.68201L-4.37114e-08 3.18201L44 3.182L44 3.682L44 4.182L4.37114e-08 4.18201L0 3.68201Z"
                      className={styles['fill-paginate']}
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.summary}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={selected.heading} // important: change triggers re-render
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selected.heading}
                </motion.h2>
              </AnimatePresence>
              <div className={styles.tags}>
                {scrambledTags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.context}
              >
                {selected.description}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* <div
            className={classNames(styles.panel, styles.deck)}
            onMouseLeave={handleMouseLeaveCards}
          >
            <div className={styles.cards}>
              {items.map((item, index) =>
                item.title ? (
                  <TransitionLink href={item.slug} key={item.id} className={styles.link}>
                    <div
                      key={item.id}
                      className={classNames(
                        styles.card,
                        index === selectedIndex ? styles.current : ""
                      )}
                      onClick={() => setSelectedIndex(index)}
                      onMouseMove={handleMouseMove}
                      onMouseEnter={(e) => handleMouseEnterCard(index, e)}
                    >
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.meta}>{item.meta}</div>
                    </div>
                  </TransitionLink>
                ) : null
              )}
            </div>
          </div> */}

        </div>
      </>

      {/* {previewReady && (
        <ShowCasePreview
          media={selected.mediaUrl}
          mimeType={selected.mimeType}
          cursor={cursor}
          visible={true}
          hideBlobs={isCursorMoving}
        />
      )} */}
    </div>
  );

};

export default ShowCaseLayout;

