'use client';
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import styles from './sc.module.css';
import classNames from 'classnames';
import ShowCaseHeader from './ShowCaseHeader';
import LayoutSwitcher from './LayoutSwitcher';
import { HeartShapedBox } from '@/src/components/ui/HeartShapedBox';
import ShowCasePreview from './ShowCasePreview';
import { ShowCaseEntry } from './ShowCaseServer';
import { scrambleText } from '@/src/components/_utils/Scramble';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionLink } from '@/src/components/transitions';

export type ShowCaseListProps = {
  items: ShowCaseEntry[];
}

const ShowCaseClient = ({items}: ShowCaseListProps) => {
  const hasItems = Array.isArray(items) && items.length > 0;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 20, y: 20 }); // small offset to prevent flash at (0,0)
  const [hovering, setHovering] = useState(false);
  const [isCursorMoving, setIsCursorMoving] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);

  const selected = items[selectedIndex];

  const [scrambledTags, setScrambledTags] = useState(selected.tags);

  const cursorSetOnce = useRef(false);
  const cursorMoveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const MOVEMENT_THRESHOLD_PX = 8; // minimum movement to consider as "moving"

  // Track mouse movement inside cards
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hovering) {
      const next = { x: e.clientX, y: e.clientY };
      const dx = next.x - cursor.x;
      const dy = next.y - cursor.y;
      const distanceSq = dx * dx + dy * dy;

      // Always update the cursor for smooth preview movement
      setCursor(next);

      // Only treat as "moving" if movement exceeds threshold
      if (distanceSq < MOVEMENT_THRESHOLD_PX * MOVEMENT_THRESHOLD_PX) {
        return;
      }

      setIsCursorMoving(true);

      if (cursorMoveTimeoutRef.current) {
        clearTimeout(cursorMoveTimeoutRef.current);
      }

      cursorMoveTimeoutRef.current = setTimeout(() => {
        setIsCursorMoving(false);
      }, 260);
    }
  };

  // When entering a card, select it and start hover tracking
  const handleMouseEnterCard = (index: number, e: React.MouseEvent) => {
    const item = items[index];
  
    setSelectedIndex(index);
    setHovering(true);

    // scramble tags
    const maxLength = Math.max(scrambledTags.length, item.tags.length);
    const newTags: string[] = [];

    for (let i = 0; i < maxLength; i++) {
      const from = scrambledTags[i] || "";
      const to = item.tags[i] || "";

      // For each tag, scramble individually
      scrambleText(from, to, (value) => {
        newTags[i] = value;
        setScrambledTags([...newTags]);
      }, 500, 0.25);
    }

    // Only set cursor once on first hover to position preview at top-left of first card
    if (!cursorSetOnce.current) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setCursor({ x: rect.left, y: rect.top });
      cursorSetOnce.current = true;
      setPreviewReady(true);
    }
  };

  const handleMouseLeaveCards = () => {
    setHovering(false);
    setIsCursorMoving(false);

    if (cursorMoveTimeoutRef.current) {
      clearTimeout(cursorMoveTimeoutRef.current);
      cursorMoveTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (cursorMoveTimeoutRef.current) {
        clearTimeout(cursorMoveTimeoutRef.current);
      }
    };
  }, []);

  // Initial preview positioning at top-left of first card
  useLayoutEffect(() => {
    const firstCard = document.querySelector(`.${styles.card}`);
    if (firstCard) {
      const rect = firstCard.getBoundingClientRect();
      requestAnimationFrame(() => {
        setCursor({ x: rect.left, y: rect.top });
        cursorSetOnce.current = true;
        setPreviewReady(true);
      });
    } else {
      setPreviewReady(true);
    }
  }, []);

  return (
    <div className={styles.board}>
      <ShowCaseHeader />
      <LayoutSwitcher />
      <HeartShapedBox />

      {!hasItems ? (
        <div className={styles.empty}>No highlights available yet.</div>
      ) : (
        <>
          <div className={classNames(styles.panel, styles.data)}>
            <div className={styles.body}>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={selected.heading} // important: change triggers re-render
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {selected.heading}
                </motion.h2>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.description}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={styles.context}
                >
                  {selected.description}
                </motion.div>
              </AnimatePresence>
              <div className={styles.tags}>
                {scrambledTags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div
            className={classNames(styles.panel, styles.deck)}
            onMouseLeave={handleMouseLeaveCards}
          >
            <div className={styles.cards}>
              {items.map((item, index) =>
                item.title ? (
                  <TransitionLink href={item.slug} key={item.id} className={styles.link}>
                    <div
                      key={item.id}
                      className={classNames(
                        styles.card,
                        index === selectedIndex ? styles.current : ""
                      )}
                      onClick={() => setSelectedIndex(index)}
                      onMouseMove={handleMouseMove}
                      onMouseEnter={(e) => handleMouseEnterCard(index, e)}
                    >
                      <div className={styles.title}>{item.title}</div>
                      <div className={styles.meta}>{item.meta}</div>
                    </div>
                  </TransitionLink>
                ) : null
              )}
            </div>
          </div>
        </>
      )}

      {previewReady && (
        <ShowCasePreview
          media={selected.mediaUrl}
          mimeType={selected.mimeType}
          cursor={cursor}
          visible={true}
          hideBlobs={isCursorMoving}
        />
      )}
    </div>
  );

};

export default ShowCaseClient;

