'use client';
import { TransitionLink } from '@/src/components/transitions';
import { ComingSoonTooltip } from '@/src/components/_utils/ComingSoonTooltip';
import styles from './hb.module.css';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';

type MenuProps = {
  mode?: 'dark' | 'light';
  layout?: 'default' | 'alt';
};

const Menu = ({ 
  mode = 'dark',
  layout = 'default'
}: MenuProps ) => {
  const pathname = usePathname(); // current route

  return (
    <nav className={classNames(styles.nav, { [styles.light]: mode === 'light' }, { [styles.alt]: layout === 'alt' })}>
      <TransitionLink 
        href="/about"
        className={classNames({ [styles.active]: pathname === '/about' })}
      >
        <span>about</span>
      </TransitionLink>
      <ComingSoonTooltip message='Under development..'>
        <TransitionLink 
          href="/work"
          className={classNames({ [styles.active]: pathname === '/work' })}
        >
          <span>work</span>
        </TransitionLink>
      </ComingSoonTooltip>
    </nav>
  );

};

export default Menu;
