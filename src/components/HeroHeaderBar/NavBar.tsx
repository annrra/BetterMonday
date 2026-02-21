import React from 'react';
import Link from 'next/link';
import Menu from './Menu';
import Connect from './Connect';
import styles from './hhb.module.css';

const NavBar: React.FC = () => {

  return (
    <div className={styles.topbar}>
      <div className={styles.nh}>
        <Menu />
        <svg
          width={50}
          height={10}
          viewBox="0 0 50 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx={5} cy={5} r={5} />
          <circle cx={25} cy={5} r={5} />
          <circle cx={45} cy={5} r={5} />
        </svg>
      </div>
      <div className={styles['connect-wrapper']}>
        <Connect />
      </div>
    </div>
  );

};

export default NavBar;
