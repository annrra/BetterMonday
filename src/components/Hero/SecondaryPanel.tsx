"use client";
import React from 'react';
import { usePathname } from "next/navigation";
import styles from './h.module.css';
import classNames from 'classnames';
import { Connect } from '../HeroHeaderBar';
import { MediaRoll } from '../MediaRoll';
import { ConnectOverlay } from '../ConnectOverlay';
import { AnimatePresence } from "framer-motion";

const SecondaryPanel: React.FC = () => {
  const pathname = usePathname();

  // Show connect overlay and form if URL is /connect
  const showConnectOverlay = pathname === "/connect";

  return (
    <div className={classNames(styles.plate, styles.sp)}>
      <Connect />
      <MediaRoll />
      <AnimatePresence mode="wait">
        {showConnectOverlay && (
          <ConnectOverlay />
        )}
      </AnimatePresence>
    </div>
  );

};

export default SecondaryPanel;
