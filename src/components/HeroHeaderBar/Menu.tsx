"use client";
import React from 'react';
import Link from 'next/link';
import { ComingSoonTooltip } from '@/src/components/_utils/ComingSoonTooltip';
import styles from './hhb.module.css';

const Menu: React.FC = () => {

  return (
    <nav className={styles.nav}>
      <Link href="/overview">
        <span>overview</span>
      </Link>
      <ComingSoonTooltip>
        <Link href="/">
          <span>highlights</span>
        </Link>
      </ComingSoonTooltip>
    </nav>
  );

};

export default Menu;
