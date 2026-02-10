"use client";
import React, { useEffect, useState } from 'react';
import styles from './mr.module.css';
import { getMediaRollContent } from '@/lib/api';
import classNames from 'classnames';

type MediaNode = {
  mediaItemUrl: string
  file: string
  fileSize: number
  mediaItemId: number
  guid: string
}

type MediaRollRaw = Record<string, { node: MediaNode | null }>

const MediaRoll: React.FC = () => {
  const [media, setMedia] = useState<MediaNode[]>([]);
  const [current, setCurrent] = useState<MediaNode | null>(null);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const mediaData = await getMediaRollContent();
        const itemsObject: MediaRollRaw = mediaData?.page?.mediaroll ?? {};
        console.log(JSON.stringify(itemsObject, null, 2));
        

        const items: MediaNode[] = Object.values(itemsObject)
          .filter((item): item is { node: MediaNode | null } => item != null) // prevent null
          .map(item => item.node)
          .filter((node): node is MediaNode => node != null);

        if (!isMounted) return;

        const firstMedia = items[0] ?? null;

        setMedia(items);
        if (items.length > 0) {
          setCurrent(firstMedia);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setReload(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false
    }
  }, []);

  const handleReload = async () => {
    setReload(true);
    if (media.length === 0) return

    let next: MediaNode
    do {
      next = media[Math.floor(Math.random() * media.length)]
    } while (media.length > 1 && next.mediaItemId === current?.mediaItemId)

    setCurrent(next);
  };

  const handleVideoReady = () => {
    setReload(false);
  };

  const currentIndex = media.findIndex((item) => item.mediaItemId === current?.mediaItemId) + 1;


  return (
    <div className={classNames(styles.gig, { [styles.loading]: reload })}>
      <div className={styles.loop}>
        {current && (
          <video
            key={current.mediaItemId}
            src={current.mediaItemUrl}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={handleVideoReady}
            className={classNames(
              styles.video,
              media.findIndex((item) => item.mediaItemId === current.mediaItemId) >= 0
                ? styles[`video-${currentIndex}`]
                : ''
            )}
          />
        )}
      </div>

      <button onClick={handleReload} className={styles.redo} aria-label="Refresh media">
        Refresh
      </button>
      <div className={styles.rim}>
        <span className={styles.north}>north</span>
        <span className={styles.west}>west</span>
        <span className={styles.east}>east</span>
        <span className={styles.south}>south</span>
      </div>
    </div>
  )
}

export default MediaRoll;
