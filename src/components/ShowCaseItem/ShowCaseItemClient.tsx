'use client';
import { ReactLenis } from 'lenis/react';
// import styles from './sci.module.css';

const ShowCaseItemClient = ({ children }: { children: React.ReactNode }) => {

  return (
    <ReactLenis 
      root 
      options={{
        orientation: 'horizontal',
        gestureOrientation: 'both',
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default ShowCaseItemClient;

