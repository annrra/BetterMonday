"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
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
      delayChildren: 0.25, // wait for panel
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 34,
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
          <button 
            onClick={handleClose}
            className={styles.x}
            aria-label="Close overview"
          />
          <motion.div 
            className={styles.body}
            variants={itemVariants}
          >
            {children}
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
