import React from 'react';
import styles from './h.module.css';
import classNames from 'classnames';
import { Intro } from '../Header';

const PrimaryPanel: React.FC = async () => {

  return (
    <div className={classNames(styles.plate, styles.pp)}>
      <Intro />
    </div>
  );

};

export default PrimaryPanel;

