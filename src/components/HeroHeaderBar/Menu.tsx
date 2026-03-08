"use client";
import React from 'react';
import Link from 'next/link';
import { TransitionLink } from '@/src/components/transitions';
import { ComingSoonTooltip } from '@/src/components/_utils/ComingSoonTooltip';
import styles from './hhb.module.css';

const Menu: React.FC = () => {

  return (
    <nav className={styles.nav}>
      <Link href="/overview">
        <span>overview</span>
      </Link>
      <ComingSoonTooltip message='Under development..'>
        <TransitionLink href="/highlights">
          <span>highlights</span>
        </TransitionLink>
      </ComingSoonTooltip>
    </nav>
  );

};

export default Menu;
