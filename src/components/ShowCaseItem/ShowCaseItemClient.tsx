'use client';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';

const ShowCaseItemClient = ({ children }: { children: React.ReactNode }) => {

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const elements = document.querySelectorAll('[data-speed]');

    const handleScroll = ({ scroll }: { scroll: number }) => {
      elements.forEach((el) => {
        const speed = parseFloat((el as HTMLElement).dataset.speed || '1');
        (el as HTMLElement).style.transform = `translateX(${-scroll * speed}px)`;
      });
    };

    lenis.on('scroll', handleScroll);

    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]);

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

