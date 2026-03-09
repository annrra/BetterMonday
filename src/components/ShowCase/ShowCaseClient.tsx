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
  const selected = items[selectedIndex];

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
              <div className={styles.cards}>
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
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <ShowCasePreview media={item.imageUrl} />
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

    </div>
  );

};

export default ShowCaseClient;

