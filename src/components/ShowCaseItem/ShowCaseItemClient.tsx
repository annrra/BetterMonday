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

  useEffect(() => {
    if (!lenis || orientation === 'vertical') return;

    const track = document.querySelector<HTMLElement>('[data-showcase-track]');
    if (!track) {
      lenis.resize();
      return;
    }

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleResize = () => {
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
      resizeTimer = setTimeout(() => {
        lenis.resize();
      }, 100);
    };

    const resizeObserver = new ResizeObserver(() => {
      scheduleResize();
    });

    resizeObserver.observe(track);

    const images = Array.from(track.querySelectorAll('img'));
    const pendingImages = images.filter((img) => !img.complete);

    pendingImages.forEach((img) => {
      img.addEventListener('load', scheduleResize);
      img.addEventListener('error', scheduleResize);
    });

    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        scheduleResize();
      });
    }

    scheduleResize();

    return () => {
      resizeObserver.disconnect();
      pendingImages.forEach((img) => {
        img.removeEventListener('load', scheduleResize);
        img.removeEventListener('error', scheduleResize);
      });
      if (resizeTimer) {
        clearTimeout(resizeTimer);
      }
    };
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

