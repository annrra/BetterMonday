"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import ConnectOverlay from './ConnectOverlay';

const ConnectPanel: React.FC = () => {
  const pathname = usePathname();
  
  // Show connect overlay and form if URL is /connect
  const showConnectOverlay = pathname === "/connect";

  return (
    <AnimatePresence mode="wait">
      {showConnectOverlay && (
        <ConnectOverlay />
      )}
    </AnimatePresence>
  )
}

export default ConnectPanel;
