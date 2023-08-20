'use client';
import React from 'react';
import styles from './af.module.css';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const AccentFigure = () => {
  const figure = useRef(null);

  const figureFat = 'M860.991 263.651L612.314 511.98L860.991 760.308L760.329 860.97L512 612.293L263.671 860.97L163.009 760.308L411.686 511.98L163.009 263.651L263.671 162.989L512 411.666L760.329 162.989L860.991 263.651Z';
  const figureThin = 'M814.991 217.651L520.314 511.98L814.991 806.308L806.329 814.97L512 520.293L217.671 814.97L209.009 806.308L503.686 511.98L209.009 217.651L217.671 208.989L512 503.666L806.329 208.989L814.991 217.651Z';

  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
        scrollTrigger: {
          scroller: "#reactive",
          trigger: "#reactive",
          scrub: true,
          start: "top",
          end: "+=300px",
          scrub: true
        },
    })

    timeline
        .to(figure.current, .8, {
          attr: { d: figureThin },
        })
  }, []);

  return (
    <div className={`${styles['accent-figure']}`}>
      <video autoPlay playsInline muted loop preload='1' poster='/x.jpg'>
        <source src="https://bettermonday.org/wp-content/uploads/x.mp4" />
      </video>
      <svg className={styles.figure} viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="maskfigure" x="0" y="0" width="100%" height="100%" >
            <rect x="0" y="0" width="100%" height="100%" />
            <path ref={figure} d="M860.991 263.651L612.314 511.98L860.991 760.308L760.329 860.97L512 612.293L263.671 860.97L163.009 760.308L411.686 511.98L163.009 263.651L263.671 162.989L512 411.666L760.329 162.989L860.991 263.651Z" fill='black' />
          </mask>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" />
      </svg>
    </div>
  );

};

export default AccentFigure;
