'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './sc.module.css';
import classNames from 'classnames';
import ShowCaseHeader from './ShowCaseHeader';
import LayoutSwitcher from './LayoutSwitcher';
import ShowCasePreview from './ShowCasePreview';
import { ShowCaseEntry } from './ShowCaseServer';

export type ShowCaseListProps = {
  items: ShowCaseEntry[];
}

const ShowCaseClient = ({items}: ShowCaseListProps) => {
  const hasItems = Array.isArray(items) && items.length > 0;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const selected = items[selectedIndex];

  // Track mouse movement inside cards
  const handleMouseMove = (e: React.MouseEvent) => {
    if (hovering) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
  };

  // When entering a card, select it and start hover tracking
  const handleMouseEnterCard = (index: number, e: React.MouseEvent) => {
    setSelectedIndex(index);
    setHovering(true);

    // If this is the first hover, position preview at top-left of card
    if (!cursorSetOnce.current) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setCursor({ x: rect.left, y: rect.top });
      cursorSetOnce.current = true;
    }
  };

  const handleMouseLeaveCards = () => {
    setHovering(false);
  };

  // Track if initial cursor positioning has been done
  const cursorSetOnce = useRef(false);

  useEffect(() => {
    const firstCard = document.querySelector(`.${styles.card}`);
    if (firstCard) {
      const rect = firstCard.getBoundingClientRect();
      requestAnimationFrame(() => {
        setCursor({ x: rect.left, y: rect.top });
        cursorSetOnce.current = true;
      });
    }
  }, []);

  return (
    <div className={styles.board}>
      <ShowCaseHeader />
      <LayoutSwitcher />

      {!hasItems ? (
        <div className={styles.empty}>No highlights available yet.</div>
      ) : (
        <>
          <div className={classNames(styles.panel, styles.data)}>
            <div className={styles.body}>
              <h2>{selected.heading}</h2>
              <div className={styles.context}>{selected.description}</div>
              <div className={styles.tags}>
                {selected.tags.map((tag, i) => (
                  <span key={i}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={classNames(styles.panel, styles.deck)}>
            <div className={styles.cards} onMouseLeave={handleMouseLeaveCards}>
              {items.map((item, index) =>
                item.title ? (
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
                ) : null
              )}
            </div>
          </div>
        </>
      )}

      <ShowCasePreview
        media={selected.imageUrl}
        cursor={cursor}
        visible={true}
      />
    </div>
  );

};

export default ShowCaseClient;

