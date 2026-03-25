"use client";
import Link from 'next/link';
import { TransitionLink } from '@/src/components/transitions';
import { ComingSoonTooltip } from '@/src/components/_utils/ComingSoonTooltip';
import styles from './hhb.module.css';

const Menu = () => {

  return (
    <nav className={styles.nav}>
      <Link href="/about">
        <span>about</span>
      </Link>
      <ComingSoonTooltip message='Under development..'>
        <TransitionLink href="/work">
          <span>work</span>
        </TransitionLink>
      </ComingSoonTooltip>
    </nav>
  );

};

export default Menu;
