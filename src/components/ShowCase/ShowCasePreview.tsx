import Image from 'next/image';
import styles from './sc.module.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type ShowCasePreviewProps = {
  media?: string;
  cursor: { x: number; y: number };
  visible: boolean;
};

const PREVIEW_WIDTH = 460;
const PREVIEW_HEIGHT = 250;

const ShowCasePreview = ({ media, cursor, visible }: ShowCasePreviewProps) => {

  return (
    <motion.div
      className={styles.preview}
      animate={{
        x: cursor.x - PREVIEW_WIDTH - 90,
        y: cursor.y - PREVIEW_HEIGHT - 60,
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
          initial={{ scale: 1 }}
          animate={{ scale: [1, 0.1, 1] }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0 }}
        ></motion.span>
      </div>
      <div className={classNames(styles.blob, styles.lg)}>
        <motion.span
          key={`lg-${media}`}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 0.1, 1] }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.08 }}
        ></motion.span>
      </div>
      <motion.div
        key={`case-${media}`}
        className={styles.case}
        initial={{ scale: 0.99, opacity: 0.85 }}
        animate={{ scale: [0.99, 1.01, 1], opacity: [0.85, 1, 1] }}
        transition={{ duration: 0.3, ease: "easeOut", delay: 0.16 }}
      >
        {media ? (
          <Image
            src={media}
            className={styles.figure}
            alt=""
            width={300}
            height={200}
          />
        ) : (
          <div className={styles.placeholder}></div>
        )}
      </motion.div>
    </motion.div>
  );

};

export default ShowCasePreview;
