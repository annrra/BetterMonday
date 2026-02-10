import React from 'react';
import styles from './h.module.css';
import classNames from 'classnames';
import { Connect } from '../HeroHeaderBar';
import { MediaRoll } from '../MediaRoll';

const SecondaryPanel: React.FC = async () => {

  return (
    <div className={classNames(styles.plate, styles.sp)}>
      <div className={styles.topbar}>
        <Connect />
      </div>
      <div className={styles['media-roll']}>
          <MediaRoll />
      </div>
    </div>
  );

};

export default SecondaryPanel;
