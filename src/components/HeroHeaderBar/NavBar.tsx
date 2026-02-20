import React from 'react';
import Connect from './Connect';
import styles from './hhb.module.css';

const NavBar: React.FC = () => {

  return (
    <div className={styles.topbar}>
      <div className={styles['connect-wrapper']}>
        <Connect />
      </div>
    </div>
  );

};

export default NavBar;
