'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useContext, useEffect, useRef, useState } from 'react';
import styles from './pte.module.css';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';
import classNames from 'classnames';

function FrozenRouter({ children }: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {});
  const [frozen] = useState(context);

  if (!frozen) return <>{children}</>;

  return <LayoutRouterContext.Provider value={frozen}>{children}</LayoutRouterContext.Provider>;
}

type CurtainPhase = 'idle' | 'enter' | 'exit';

const curtainVariants = {
  hidden: { y: '-100%' },
  cover: { y: '0%' },
  reveal: { y: '100%' },
};

const normalizePath = (rawPath: string) => {
  try {
    return new URL(rawPath, window.location.origin).pathname.replace(/\/+$/, '');
  } catch {
    return rawPath.replace(/\/+$/, '');
  }
};

const isSamePath = (a: string, b: string) => normalizePath(a) === normalizePath(b);

const PageTransitionEffect = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [curtainPhase, setCurtainPhase] = useState<CurtainPhase>('idle');
  const [hasNavigated, setHasNavigated] = useState(false);
  const targetPathRef = useRef<string | null>(null);
  const isAnimatingRef = useRef(false);

  // Listen for navigation requests from TransitionLink
  useEffect(() => {
    const handleStartCurtain = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const href = customEvent.detail;

      // Ignore if we're already animating or target is current route
      if (!href || isAnimatingRef.current || isSamePath(href, pathname)) return;

      targetPathRef.current = normalizePath(href);
      isAnimatingRef.current = true;
      setHasNavigated(false);
      setCurtainPhase('enter');
    };

    window.addEventListener('start-curtain', handleStartCurtain as EventListener);
    return () => {
      window.removeEventListener('start-curtain', handleStartCurtain as EventListener);
    };
  }, [pathname]);

  // Once the route has actually changed to the target path, start revealing
  // the new page by moving the curtain off-screen.
  useEffect(() => {
    if (
      isAnimatingRef.current &&
      curtainPhase === 'enter' &&
      targetPathRef.current &&
      isSamePath(pathname, targetPathRef.current) &&
      hasNavigated
    ) {
      // Defer phase change to avoid synchronous setState inside the effect.
      // This still reacts immediately after the route matches the target.
      queueMicrotask(() => {
        setCurtainPhase((current) =>
          isAnimatingRef.current &&
          current === 'enter' &&
          targetPathRef.current &&
          isSamePath(targetPathRef.current, pathname) &&
          hasNavigated
            ? 'exit'
            : current,
        );
      });
    }
  }, [pathname, curtainPhase, hasNavigated]);

  // Safety fallback in case match/normalize path cannot be resolved exactly.
  useEffect(() => {
    if (curtainPhase === 'enter' && hasNavigated) {
      const fallback = setTimeout(() => {
        if (isAnimatingRef.current && curtainPhase === 'enter') {
          setCurtainPhase('exit');
        }
      }, 1400);

      return () => clearTimeout(fallback);
    }
    return;
  }, [curtainPhase, hasNavigated]);

  return (
    <>
      {/* AnimatePresence for pages (keeps old page frozen until exit completes) */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={styles.pte}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>

      {/* AnimatePresence for the curtain.
          It is only mounted while a transition is in progress, so it will not
          cover the page on first load or when idle. */}
      <AnimatePresence>
        {curtainPhase !== 'idle' && (
          <div className={classNames(styles.holder, { [styles.enter]: curtainPhase === 'enter' })}>
            <motion.div
              key="curtain"
              variants={curtainVariants}
              initial="hidden"
              animate={curtainPhase === 'enter' ? 'cover' : 'reveal'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onAnimationComplete={() => {
                if (curtainPhase === 'enter') {
                  // First half finished: curtain fully covers the page.
                  // Navigate to the target route while the page is fully covered.
                  const href = targetPathRef.current;
                  if (href && !isSamePath(href, pathname) && !hasNavigated) {
                    router.push(href);
                    setHasNavigated(true);
                  }
                } else if (curtainPhase === 'exit') {
                  // Curtain is fully off-screen at the top; clean up.
                  setCurtainPhase('idle');
                  isAnimatingRef.current = false;
                  targetPathRef.current = null;
                  setHasNavigated(false);
                }
              }}
              className={styles.curtain}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: curtainPhase === 'enter' ? 1 : 0 }}
              transition={{
                duration: 0.2,
                ease: 'easeInOut',
                // Delay logo fade-in relative to curtain start;
                // no delay when fading out.
                delay: curtainPhase === 'enter' ? 0.15 : 0,
              }}
              className={styles.logoWrapper}
            >
              <MondayLogoSvg autoScramble />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PageTransitionEffect;