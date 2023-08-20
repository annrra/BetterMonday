import Image from 'next/image';
import Link from 'next/link';
import styles from './h.module.css';
import { HeaderAside } from '../HeaderAside';

const Header = async ({ mode='light' }) => {
  const logo = mode == 'light' ? '/bettermonday.svg' : '/bettermonday-inverted.svg';

  return (
    <header className={styles.header} data-mode={mode}>
      <div className={`${styles['outdent-h']} ${styles.flex}`}>
        <div className={`${styles.logo}`}>
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              className={styles.bettermonday}
              width={147}
              height={30}
              priority
            />
          </Link>
        </div>
        <div className={styles['header-aside']}>
          <HeaderAside />
        </div>
      </div>
    </header>
  );

};

export default Header;
