'use client';
import Image from 'next/image';
import styles from './sc.module.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type ShowCasePreviewProps = {
  media?: string;
  mimeType?: string;
  cursor: { x: number; y: number };
  visible: boolean;
  hideBlobs: boolean;
};

const PREVIEW_WIDTH = 460;
const PREVIEW_HEIGHT = 250;

const ShowCasePreview = ({
  media,
  mimeType,
  cursor,
  visible,
  hideBlobs,
}: ShowCasePreviewProps) => {
  const isVideo = mimeType?.startsWith('video/');

  return (
    <motion.div
      className={styles.preview}
      animate={{
        x: cursor.x - PREVIEW_WIDTH - 70,
        y: cursor.y - PREVIEW_HEIGHT - 30,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.2,
      }}
    >
      <div className={classNames(styles.blob, styles.sm)}>
        <motion.span
          key={`sm-${media}`}
          initial={{ opacity: 1, scale: 1 }}
          animate={
            hideBlobs
              ? { opacity: 0, scale: 0.8 }
              : { opacity: 1, scale: 1.06 }
          }
          transition={{
            duration: 0.32,
            ease: "easeOut",
            delay: hideBlobs ? 0 : 0.02,
          }}
        ></motion.span>
      </div>
      <div className={classNames(styles.blob, styles.lg)}>
        <motion.span
          key={`lg-${media}`}
          initial={{ opacity: 1, scale: 1 }}
          animate={
            hideBlobs
              ? { opacity: 0, scale: 0.8 }
              : { opacity: 1, scale: 1.08 }
          }
          transition={{
            duration: 0.44,
            ease: "easeOut",
            delay: hideBlobs ? 0 : 0.07,
          }}
        ></motion.span>
      </div>
      <motion.div
        key={`case-${media}`}
        className={styles.case}
        initial={{ scale: 0.96, opacity: 0.85 }}
        animate={{ scale: [0.96, 1.02, 1], opacity: [0.85, 1, 1] }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
      >
        {media ? (
          isVideo ? (
            <video
              src={media}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={styles.video}
            />
          ) : (
            <Image
              src={media}
              className={styles.figure}
              alt=""
              width={300}
              height={200}
            />  
          )
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </motion.div>
    </motion.div>
  );

};

export default ShowCasePreview;
