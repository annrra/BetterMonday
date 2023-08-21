'use client';
import { useLayoutEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const UsePage = ({ children }) => {

  useLayoutEffect( () => {
    gsap.config({
      nullTargetWarn: false
    });

    gsap.registerPlugin(ScrollTrigger);

    const tlCases = gsap.timeline({
      scrollTrigger: {
        scroller: '#reactive',
        trigger: '#cases',
        start: 'top bottom',
        end: 'top top',
        scrub: 0.1,
      }
    });
    tlCases.from('#cases-heading', 1, {duration: 0.1, opacity: 0});

    const tlBanner = gsap.timeline({
      scrollTrigger: {
        scroller: '#reactive',
        trigger: '#pc-banner',
        start: 'top bottom',
        scrub: 0.5,
      }
    });
    tlBanner.to('#pc-banner', 30, {backgroundPosition: 'center 30%'});
  }, []);

  return (
    <>
      {children}
    </>
  )
}

export default UsePage;
