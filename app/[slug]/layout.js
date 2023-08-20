//'use client';
import '../globals.css';
/*import { useCallback, useEffect, useLayoutEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';*/

export const metadata = {
  title: 'BetterMonday',
  description: 'Web Design & Development',
}

export default function PostLayout({ children }) {

  /*useLayoutEffect( () => {
    
  }, []);*/

  return (
    <>
      {children}
    </>
  )
}
