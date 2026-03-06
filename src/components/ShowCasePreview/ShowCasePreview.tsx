import React from 'react';
import Image from 'next/image';
import styles from './scp.module.css';
import classNames from 'classnames';

const ShowCasePreview: React.FC = async () => {

  return (
    <div className={styles.preview}>
      <span className={classNames(styles.blob, styles.sm)}></span>
      <span className={classNames(styles.blob, styles.lg)}></span>
      <div className={styles.case}>
        <Image
          src={''}
          className={styles.figure}
          alt=""
          width={300}
          height={200}
        />
      </div>
    </div>
  );

};

export default ShowCasePreview;

