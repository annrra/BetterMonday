import Link from 'next/link';
import styles from './hb.module.css';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';
import Menu from './Menu';

const HeaderBar = async () => {

  return (
    <div className={styles.header}>
      <div className={styles['logo-wrapper']}>
        <Link href="/" id="logo" className={styles['logo-link']}>
          <MondayLogoSvg />
        </Link>
      </div>
      <Menu />
    </div>
  );

};

export default HeaderBar;
