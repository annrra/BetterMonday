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
      <span className={classNames(styles.blob, styles.sm)}></span>
      <span className={classNames(styles.blob, styles.lg)}></span>
      <div className={styles.case}>
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
      </div>
    </motion.div>
  );

};

export default ShowCasePreview;
