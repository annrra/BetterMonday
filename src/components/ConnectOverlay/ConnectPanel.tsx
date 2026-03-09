"use client";
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import ConnectOverlay from './ConnectOverlay';

const ConnectPanel = () => {
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
