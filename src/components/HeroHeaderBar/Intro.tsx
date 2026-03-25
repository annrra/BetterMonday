import Link from 'next/link';
import styles from './hhb.module.css';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';
import Menu from './Menu';

const Intro = async () => {

  return (
    <div className={styles.hdr}>
      <div className={styles.header}>
        <div className={styles['logo-wrapper']}>
          <Link href="/" id="logo" className={styles['logo-link']}>
            <MondayLogoSvg />
          </Link>
        </div>
        <Menu />
      </div>
      <div className={styles.in}>
        <div className={styles.context}><h1>Independent web designer and developer creating strategic UI/UX and websites for brands that want to grow.</h1></div>
      </div>
    </div>
  );

};

export default Intro;
