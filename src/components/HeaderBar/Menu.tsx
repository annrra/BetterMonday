"use client";
import { TransitionLink } from '@/src/components/transitions';
import { ComingSoonTooltip } from '@/src/components/_utils/ComingSoonTooltip';
import styles from './hb.module.css';
import classNames from 'classnames';

type MenuProps = {
  mode?: 'default' | 'light';
};

const Menu = ( { mode = 'default' }: MenuProps ) => {

  return (
    <nav className={classNames(styles.nav, { [styles.light]: mode === 'light' })}>
      <TransitionLink href="/about">
        <span>about</span>
      </TransitionLink>
      <ComingSoonTooltip message='Under development..'>
        <TransitionLink href="/work">
          <span>work</span>
        </TransitionLink>
      </ComingSoonTooltip>
    </nav>
  );

};

export default Menu;
