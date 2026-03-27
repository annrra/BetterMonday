import { TransitionLink } from '@/src/components/transitions';
import styles from './hb.module.css';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';
import Menu from './Menu';

const HeaderBar = async () => {

  return (
    <div className={styles.header}>
      <div className={styles['logo-wrapper']}>
        <TransitionLink href="/" id="logo" className={styles['logo-link']}>
          <MondayLogoSvg />
        </TransitionLink>
      </div>
      <Menu />
    </div>
  );

};

export default HeaderBar;
