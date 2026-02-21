"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { MondayLogoSvg } from '@/src/components/HeroHeaderBar';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
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

const OverViewPanel: React.FC<OverViewPanelProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const showOverViewOverlay = pathname === "/overview";

  // Scroll to top when returning from overview
  useEffect(() => {
    if (pathname === "/" && !showOverViewOverlay) {
      // Use a small delay to ensure Next.js has finished scroll restoration
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, showOverViewOverlay]);

  // Disable scrolling on body when overview is open
  useEffect(() => {
    if (showOverViewOverlay) {
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      document.body.style.overflowY = 'auto';
    }
    return () => {
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
      document.body.style.overflowY = 'auto';
    };
  }, [showOverViewOverlay]);

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
          <Link 
            href="/"
            className={styles.x}
            onClick={handleClose}
            aria-label="Close overview"
          >
            Close
          </Link>
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
          >
            <div className={styles.story}>
              {children}
            </div>
          </motion.div>
          <motion.div 
            className={styles.footer}
            variants={itemVariants}
          >
            <div className={styles.join}>
              <Link href="mailto:xxx@xxx.xxx" className={styles.link}>Email</Link>
              <Link href="https://www.linkedin.com/in/annrra/" className={styles.link}>LinkedIn</Link>
              <Link href="https://github.com/annrra" className={styles.link}>GitHub</Link>
            </div>
            <div className={styles.copy}>Created by BetterMonday - 2026</div>
          </motion.div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverViewPanel;
