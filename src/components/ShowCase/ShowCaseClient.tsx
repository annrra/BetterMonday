'use client';
import React, { useState } from 'react';
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hovering) {
      setCursor({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseEnterCard = (index: number) => {
    setSelectedIndex(index);
    setHovering(true);
  };

  const handleMouseLeaveCards = () => {
    setHovering(false);
  };

  return (
    <div className={styles.board}>

      <ShowCaseHeader />
      <LayoutSwitcher />

      { !hasItems ? (
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
              <div
                className={styles.cards}
                onMouseLeave={handleMouseLeaveCards}
              >
                {items.map((item, index) => {
                  console.log(JSON.stringify(item, null, 2));

                  return (
                    item.title ? (
                      <div
                        key={item.id}
                        className={classNames(
                          styles.card,
                          index === selectedIndex ? styles.current : ""
                        )}
                        onClick={() => setSelectedIndex(index)}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => handleMouseEnterCard(index)}
                      >
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.meta}>{item.meta}</div>
                      </div>
                    ) : null
                  )
                })}
              </div>
            </div>   
          </>
        )
      }

      <ShowCasePreview
        media={selected.imageUrl}
        cursor={cursor}
        visible={hovering} // follow cursor if hovering
      />

    </div>
  );

};

export default ShowCaseClient;

