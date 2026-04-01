'use client';
import Image from 'next/image';
import styles from './scp.module.css';
import { motion } from 'framer-motion';
import classNames from 'classnames';

type ShowCasePreviewProps = {
  media?: string;
  altText?: string;
  mimeType?: string;
  customClass?: string;
};

const ShowCasePreview = ({
  media,
  altText,
  mimeType,
  customClass,
}: ShowCasePreviewProps) => {
  const isVideo = mimeType?.startsWith('video/');

  return (
    <motion.div
      className={classNames(styles.preview, customClass && styles[customClass])}
      variants={{
        initial: { scale: 0.94, opacity: 0, pointerEvents: 'none' },
        hover: {
          scale: [0.94, 1.04, 1],
          opacity: 1,
          pointerEvents: 'auto',
          transition: {
            duration: 0.3,
            ease: "easeInOut",
          },
        },
      }}
    >
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
              aria-label={altText ?? 'Preview video'}
            />
          ) : (
            <Image
              src={media}
              className={styles.figure}
              alt={altText ?? ''}
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
