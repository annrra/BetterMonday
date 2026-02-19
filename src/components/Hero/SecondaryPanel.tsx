"use client";
import React, { useState } from 'react';
import styles from './h.module.css';
import classNames from 'classnames';
import { Connect } from '../HeroHeaderBar';
import { MediaRoll } from '../MediaRoll';
import { ConnectOverlay } from '../ConnectOverlay';
import { AnimatePresence } from "framer-motion";

const SecondaryPanel: React.FC = () => {
  const [showConnectOverlay, setShowConnectOverlay] = useState(false);

  return (
    <div className={classNames(styles.plate, styles.sp)}>
      <Connect onOpenOverlay={() => setShowConnectOverlay(true)} />
      <MediaRoll />
      <AnimatePresence mode="wait">
        {showConnectOverlay && (
          <ConnectOverlay onClose={() => setShowConnectOverlay(false)} />
        )}
      </AnimatePresence>
    </div>
  );

};

export default SecondaryPanel;
