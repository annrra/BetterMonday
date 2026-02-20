"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './ov.module.css';

type OverViewPanelProps = {
  children: React.ReactNode;
};

const OverViewPanel: React.FC<OverViewPanelProps> = ({ children }) => {
  const pathname = usePathname();
  const showOverViewOverlay = pathname === "/overview";

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
        {children}
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OverViewPanel;
