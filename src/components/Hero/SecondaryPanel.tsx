import React from 'react';
import styles from './h.module.css';
import classNames from 'classnames';
import { NavBar } from '../HeroHeaderBar';
import { MediaRoll } from '../MediaRoll';
import { ConnectPanel } from '../ConnectOverlay';

const SecondaryPanel: React.FC = () => {

  return (
    <div className={classNames(styles.plate, styles.sp)}>
      <NavBar />
      <MediaRoll />
      <ConnectPanel />
    </div>
  );

};

export default SecondaryPanel;
