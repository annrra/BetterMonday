import Image from 'next/image';
import styles from './sc.module.css';
import classNames from 'classnames';

type ShowCasePreviewProps = {
  media?: string;
};

const ShowCasePreview = ({ media }: ShowCasePreviewProps) => {

  return (
    <div className={styles.preview}>
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
    </div>
  );

};

export default ShowCasePreview;

