"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getPhotocommaPreview } from '@/lib/api';
import styles from './ov.module.css';

type MediaNode = {
  mediaItemUrl: string;
  file: string;
  fileSize: number;
  mediaItemId: number;
  guid: string;
};

type MediaPreviewsRaw = Record<string, { node: MediaNode | null } | null>;

const PhotocommaLink = () => {
  const [items, setItems] = useState<MediaNode[]>([]);
  const [current, setCurrent] = useState<MediaNode | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediaData = await getPhotocommaPreview();
        const itemsObject: MediaPreviewsRaw =
          mediaData?.page?.nextphotocommapreview ?? {};

        const validItems: MediaNode[] = Object.values(itemsObject)
          .filter(Boolean)
          .map(item => item!.node)
          .filter((node): node is MediaNode =>
            Boolean(
              node &&
              node.mediaItemUrl &&
              node.mediaItemId &&
              node.guid
            )
          );

        setItems(validItems);
      } catch (error) {
        console.error("Failed to fetch media:", error);
      }
    };

    fetchData();
  }, []);

  const pickRandomImage = () => {
    if (items.length === 0) return;

    const random =
      items[Math.floor(Math.random() * items.length)];

    setCurrent(random);
  };

  return (
    <>
      <Link 
        href="https://photocomma.com/"
        target="_blank"
        className={styles['preview-link']}
        onMouseEnter={pickRandomImage}
      >
        photographer
        {current?.mediaItemUrl && (
          <div className={styles.tooltip}>
            <Image
              src={current.mediaItemUrl}
              className={styles.figure}
              alt=""
              width={300}
              height={200}
            />
            <div className={styles.caption}>
              photocomma.com
              <div className={styles.cap}>
                <svg
                  width={33}
                  height={33}
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="accept">
                    <rect id="rect" width={33} height={33} rx={5} className={styles['accept-btn']} />
                    <path
                      id="arrow"
                      d="M22.7071 16.7071C23.0976 16.3166 23.0976 15.6834 22.7071 15.2929L16.3431 8.92893C15.9526 8.53841 15.3195 8.53841 14.9289 8.92893C14.5384 9.31946 14.5384 9.95262 14.9289 10.3431L20.5858 16L14.9289 21.6569C14.5384 22.0474 14.5384 22.6805 14.9289 23.0711C15.3195 23.4616 15.9526 23.4616 16.3431 23.0711L22.7071 16.7071ZM9 16V17H22V16V15H9V16Z"
                      className={styles.ico}
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        )}
      </Link>
    </>
  );
}

export default PhotocommaLink;