import { Menu } from '@/src/components/HeaderBar';
import Connect from './Connect';
import styles from './nb.module.css';
import classNames from 'classnames';

type NavBarProps = {
  showConnectCta?: boolean;
  mode?: 'dark' | 'light';
  customClassName?: string;
};

const NavBar = ({ 
  showConnectCta = false,
  mode = 'dark',
  customClassName 
}: NavBarProps) => {

  return (
    <div className={classNames(styles.topbar, {[styles.light]: mode === 'light'}, customClassName)}>
      <div className={styles.nh}>
        <Menu mode={mode} />
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
        <Connect showConnectCta={showConnectCta} />
      </div>
    </div>
  );

};

export default NavBar;
