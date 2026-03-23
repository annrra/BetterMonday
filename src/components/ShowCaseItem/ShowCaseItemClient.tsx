'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, useState } from 'react';

const ShowCaseItemClient = ({ children }: { children: React.ReactNode }) => {
  const lenis = useLenis();
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  // Update orientation based on screen width
  useEffect(() => {
    const updateOrientation = () => {
      if (window.innerWidth < 768) {
        setOrientation('vertical');
      } else {
        setOrientation('horizontal');
      }
    };

    updateOrientation();
    window.addEventListener('resize', updateOrientation);

    return () => window.removeEventListener('resize', updateOrientation);
  }, []);

  useEffect(() => {
    if (!lenis || orientation === 'vertical') return;

    const elements = document.querySelectorAll('[data-speed]');

    const handleScroll = ({ scroll }: { scroll: number }) => {
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1');
        (el as HTMLElement).style.transform = `translateX(${-scroll * speed}px)`;
      });
    };

    lenis.on('scroll', handleScroll);
    return () => lenis.off('scroll', handleScroll);
  }, [lenis, orientation]);

  return (
    <ReactLenis 
      root 
      options={{
        orientation,
        gestureOrientation: 'both',
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default ShowCaseItemClient;

