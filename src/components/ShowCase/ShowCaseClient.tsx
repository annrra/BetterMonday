'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import styles from './sc.module.css';
import classNames from 'classnames';
import { MondayLogoSvg } from '@/src/components/HeroHeaderBar';
import { ShowCasePreview } from '@/src/components/ShowCasePreview';
import { ShowCaseEntry } from './ShowCaseServer';

export type ShowCaseListProps = {
  items: ShowCaseEntry[];
}

const ShowCaseClient = ({items}: ShowCaseListProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // default first item
  const selected = items[selectedIndex];

  return (
    <div className={styles.board}>

      <div className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
           <MondayLogoSvg />
          </Link>
        </div>
      </div>

      <div className={styles.view}>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.active}
        >
          <path
            d="M5 4.5H9C9.27614 4.5 9.5 4.72386 9.5 5V9C9.5 9.27614 9.27614 9.5 9 9.5H5C4.72386 9.5 4.5 9.27614 4.5 9V5C4.5 4.72386 4.72386 4.5 5 4.5ZM3 5V9C3 10.1046 3.89543 11 5 11H9C10.1046 11 11 10.1046 11 9V5C11 3.89543 10.1046 3 9 3H5C3.89543 3 3 3.89543 3 5ZM5 14.5H9C9.27614 14.5 9.5 14.7239 9.5 15V19C9.5 19.2761 9.27614 19.5 9 19.5H5C4.72386 19.5 4.5 19.2761 4.5 19V15C4.5 14.7239 4.72386 14.5 5 14.5ZM3 15V19C3 20.1046 3.89543 21 5 21H9C10.1046 21 11 20.1046 11 19V15C11 13.8954 10.1046 13 9 13H5C3.89543 13 3 13.8954 3 15ZM19 4.5C19.2761 4.5 19.5 4.72386 19.5 5V9C19.5 9.27614 19.2761 9.5 19 9.5H15C14.7239 9.5 14.5 9.27614 14.5 9V5C14.5 4.72386 14.7239 4.5 15 4.5H19ZM15 3C13.8954 3 13 3.89543 13 5V9C13 10.1046 13.8954 11 15 11H19C20.1046 11 21 10.1046 21 9V5C21 3.89543 20.1046 3 19 3H15ZM15 14.5H19C19.2761 14.5 19.5 14.7239 19.5 15V19C19.5 19.2761 19.2761 19.5 19 19.5H15C14.7239 19.5 14.5 19.2761 14.5 19V15C14.5 14.7239 14.7239 14.5 15 14.5ZM13 15V19C13 20.1046 13.8954 21 15 21H19C20.1046 21 21 20.1046 21 19V15C21 13.8954 20.1046 13 19 13H15C13.8954 13 13 13.8954 13 15Z"
            className={styles.filter}
          />
        </svg>
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20C21.1045 6 22 6.89543 22 8V16C22 17.1045 21.1045 18 20 18H4C2.89543 18 2 17.1045 2 16V8C2 6.89543 2.89543 6 4 6ZM0 8V16C0 18.2092 1.79087 20 4 20H20C22.2092 20 24 18.2092 24 16V8C24 5.79087 22.2092 4 20 4H4C1.79087 4 0 5.79087 0 8Z"
            className={styles.filter}
          />
        </svg>
        <div className={styles.close}>
          <Link href="/" className={styles.x}>
            Close
          </Link>
        </div>
      </div>
  
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
          {items.map((item, index) =>
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
                <div className={styles.title}>{item.title}</div>
                <div className={styles.meta}>{item.meta}</div>
              </div>
            ) : null
          )}
        </div>
      </div>

    </div>
  );

};

export default ShowCaseClient;

