"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import Link from 'next/link';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';
import ScrambleCreatedText from './ScrambleCreatedText';
import { EmailLink } from '@/src/components/_utils/EmailLink';
import { Close } from '@/src/components/ui/Close';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import styles from './ov.module.css';

type OverViewPanelProps = {
  children: React.ReactNode;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.15, // wait for panel
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const OverViewPanel = ({ children }: OverViewPanelProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const showOverViewOverlay = pathname === "/about";
  const bodyRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState<{ left: number; right: number }>({ left: 0, right: 0 });
  const dragX = useMotionValue(0);

  // Scroll to top when returning from about
  useEffect(() => {
    if (pathname === "/" && !showOverViewOverlay) {
      // Use a small delay to ensure Next.js has finished scroll restoration
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, showOverViewOverlay]);

  // Disable scrolling on body when about is open
  useEffect(() => {
    if (showOverViewOverlay) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.position = 'static';
    }
    return () => {
      document.body.style.position = 'static';
    };
  }, [showOverViewOverlay]);

  // Fake scroll via drag
  useEffect(() => {
    if (!showOverViewOverlay) return;

    const vp = viewportRef.current;
    if (!vp) return;

    const handleVpWheel = (e: WheelEvent) => {
      const vp = viewportRef.current;
      const st = storyRef.current;
      if (!vp || !st) return;

      const viewportWidth = vp.clientWidth;
      const storyWidth = st.scrollWidth;
      if (storyWidth <= viewportWidth) return;

      e.preventDefault();

      const currentX = dragX.get();
      const maxDrag = viewportWidth - storyWidth; // negative

      const newX = Math.max(maxDrag, Math.min(0, currentX - e.deltaY));
      dragX.set(newX);
    };

    vp.addEventListener('wheel', handleVpWheel, { passive: false });
    return () => vp.removeEventListener('wheel', handleVpWheel);
  }, [showOverViewOverlay, dragX]);

  // Calculate drag constraints based on content width
  useLayoutEffect(() => {
    if (!showOverViewOverlay) return;

    const calc = () => {
      const vp = viewportRef.current;
      const st = storyRef.current;
      if (!vp || !st) return;

      const viewportWidth = vp.offsetWidth;
      const storyWidth = st.scrollWidth;
      const left = Math.min(0, viewportWidth - storyWidth); // Max drag left
      setDragConstraints({ left, right: 0 });
    };

    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, [showOverViewOverlay, children]);

  const handleClose = () => {
    router.push('/');
  };

  return (
    <AnimatePresence mode="wait">
      {showOverViewOverlay && (
      <motion.div
        className={styles.overlay}
        key="connect"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.77, 0, 0.175, 1],
        }}
      >
        <motion.div 
          className={styles.pane}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <Close onClick={handleClose} customClassName={styles.close} />

          <motion.div
            className={styles.header}
            variants={itemVariants}
          >
            <div className={styles.logo}>
              <MondayLogoSvg />
            </div>
          </motion.div>
          <motion.div 
            className={styles.body}
            variants={itemVariants}
            ref={bodyRef}
          >
            <div className={styles.viewport} ref={viewportRef}>
              <motion.div
                className={styles.story}
                ref={storyRef}
                drag="x"
                dragConstraints={dragConstraints}
                dragElastic={0.1}
                dragMomentum={true}
                style={{ x: dragX }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            className={styles.footer}
            variants={itemVariants}
          >
            <div className={styles.join}>
              <EmailLink className={styles.link} />
              <Link href="https://www.linkedin.com/in/annrra/" target='_blank' rel="noopener noreferrer" className={styles.link}>LinkedIn</Link>
              <Link href="https://github.com/annrra" target='_blank' rel="noopener noreferrer" className={styles.link}>GitHub</Link>
            </div>
            <ScrambleCreatedText />
          </motion.div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverViewPanel;
