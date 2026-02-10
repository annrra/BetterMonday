import React from 'react';
import styles from './h.module.css';
import classNames from 'classnames';
import { Intro } from '../HeroHeaderBar';
import { HeroHook } from '../HeroHook';

const PrimaryPanel: React.FC = async () => {

  return (
    <div className={classNames(styles.plate, styles.pp)}>
      <Intro />
      <HeroHook />
    </div>
  );

};

export default PrimaryPanel;

