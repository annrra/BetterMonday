'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './scl.module.css';
import classNames from 'classnames';
import ShowCaseHeader from './ShowCaseHeader';
import ShowCaseNav from './ShowCaseNav';
import ShowCaseLayoutFooter from './ShowCaseLayoutFooter';
import ShowCasePreview from './ShowCasePreview';
import { HeartShapedBox } from '@/src/components/ui/HeartShapedBox';
import { ShowCaseEntry } from './ShowCaseServer';
import { motion, AnimatePresence } from 'framer-motion';

export type ShowCaseListProps = {
  items: ShowCaseEntry[];
}

const ShowCaseLayout = ({items}: ShowCaseListProps) => {
  /* const validItems = Array.isArray(items)
    ? items.filter(item => Boolean(item && item.title?.trim().length))
    : []; */

  // Temporarily filter out items without snapshotUrl
  const validItems = Array.isArray(items)
    ? items.filter(item => 
        Boolean(item && item.title?.trim().length && item.snapshotUrl) 
      )
    : [];

  const hasItems = validItems.length > 0;
  const itemCount = validItems.length;

  const [[index, direction], setIndex] = useState([0, 0]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const paginate = (dir: number) => {
    if (itemCount === 0) return;
    setIndex(([prev]) => {
      const next = (prev + dir + itemCount) % itemCount;
      return [next, dir];
    });
  };

  const selected = validItems[index] ?? validItems[0];

  const prevIndex = itemCount > 0 ? (index - 1 + itemCount) % itemCount : 0;
  const nextIndex = itemCount > 0 ? (index + 1) % itemCount : 0;
  const prevItem = validItems[prevIndex];
  const nextItem = validItems[nextIndex];

  const isVideo = selected?.snapshotMimeType?.startsWith('video/') ?? false;

  const handleChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      paginate(1);
    } else {
      paginate(-1);
    }
  };

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1200);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const variants = {
    enter: () => ({
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      opacity: 1,
      scale: 1,
    },
    exit: () => ({
      opacity: 0,
      scale: 0.98,
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
                unoptimized
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
                <motion.div 
                  className={classNames(styles.paginate, styles.prev)} 
                  onClick={() => handleChange('prev')}
                  whileHover={isLargeScreen ? "hover" : undefined}
                  initial="initial"
                  animate="initial"
                  variants={{
                    initial: {},
                    hover: {},
                  }}
                >
                  {isLargeScreen && (
                    <ShowCasePreview
                      media={prevItem.mediaUrl}
                      mimeType={prevItem.mimeType}
                      altText={prevItem.mediaAlt}
                      customClass="preview-prev"
                    />
                  )}
                  <motion.svg
                    width={45}
                    height={8}
                    viewBox="0 0 45 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={{
                      hover: { x: 4 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <path
                      id="prev"
                      d="M0.146446 3.32845C-0.0488167 3.52371 -0.0488167 3.84029 0.146446 4.03556L3.32843 7.21754C3.52369 7.4128 3.84027 7.4128 4.03553 7.21754C4.2308 7.02228 4.2308 6.70569 4.03553 6.51043L1.20711 3.682L4.03553 0.853576C4.2308 0.658314 4.2308 0.341732 4.03553 0.146469C3.84027 -0.0487928 3.52369 -0.0487928 3.32843 0.146469L0.146446 3.32845ZM44.5 3.68201L44.5 3.18201L0.5 3.182L0.5 3.682L0.5 4.182L44.5 4.18201L44.5 3.68201Z"
                      className={styles['fill-paginate']}
                    />
                  </motion.svg>
                  <motion.span 
                    className={styles['paginate-name']}
                    key={prevItem?.title ?? 'prev'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    variants={{
                      hover: { x: -4 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {prevItem?.title || 'Previous'}
                  </motion.span>
                </motion.div>
                <AnimatePresence mode='wait'>
                  <motion.div 
                    className={styles.snapframe}
                    key={selected.id}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    drag="x" // allow horizontal drag
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(event, info) => {
                      const offset = info.offset.x;
                      const velocity = info.velocity.x;
                      // simple threshold for swipe
                      if (offset < -50 || velocity < -500) {
                        paginate(1); // next
                      } else if (offset > 50 || velocity > 500) {
                        paginate(-1); // previous
                      }
                    }}
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
                        src={selected.snapshotUrl ? selected.snapshotUrl : "https://api.bettermonday.org/wp-content/uploads/cudillero-mirror.jpg"}
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
                <motion.div 
                  className={classNames(styles.paginate, styles.next)} 
                  onClick={() => handleChange('next')}
                  whileHover={isLargeScreen ? "hover" : undefined}
                  initial="initial"
                  animate="initial"
                  variants={{
                    initial: {},
                    hover: {},
                  }}
                >
                  {isLargeScreen && (
                    <ShowCasePreview
                      media={nextItem.mediaUrl}
                      mimeType={nextItem.mimeType}
                      altText={nextItem.mediaAlt}
                    />
                  )}
                  <motion.span 
                    className={styles['paginate-name']}
                    key={nextItem?.title ?? 'next'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    variants={{
                      hover: { x: 4 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {nextItem?.title || 'Next'}
                  </motion.span>
                  <motion.svg
                    width={45}
                    height={8}
                    viewBox="0 0 45 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    variants={{
                      hover: { x: -4 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <path
                      id="next"
                      d="M44.3536 3.32845C44.5488 3.52371 44.5488 3.84029 44.3536 4.03556L41.1716 7.21754C40.9763 7.4128 40.6597 7.4128 40.4645 7.21754C40.2692 7.02228 40.2692 6.70569 40.4645 6.51043L43.2929 3.682L40.4645 0.853576C40.2692 0.658314 40.2692 0.341732 40.4645 0.146469C40.6597 -0.0487928 40.9763 -0.0487928 41.1716 0.146469L44.3536 3.32845ZM0 3.68201L-4.37114e-08 3.18201L44 3.182L44 3.682L44 4.182L4.37114e-08 4.18201L0 3.68201Z"
                      className={styles['fill-paginate']}
                    />
                  </motion.svg>
                </motion.div>
              </div>

            </div>
          </div>
          <ShowCaseLayoutFooter 
            uri={selected.uri}
            heading={selected.heading}
            description={selected.description}
            tags={selected.tags}
            colorMode={selected.colorMode}
          />
        </div>
      </>

    </div>
  );

};

export default ShowCaseLayout;

