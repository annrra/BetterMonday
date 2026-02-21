import React from 'react';
import Link from 'next/link';
import styles from './hhb.module.css';

const Menu: React.FC = () => {

  return (
    <nav className={styles.nav}>
      <Link href="/overview">
        <span>overview</span>
      </Link>
      <Link href="/">
        <span>highlights</span>
      </Link>
    </nav>
  );

};

export default Menu;
