import { TransitionLink } from '@/src/components/transitions';
import styles from './hb.module.css';
import classNames from 'classnames';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';
import Menu from './Menu';

type HeaderBarProps = {
  mode?: 'dark' | 'light';
};

const HeaderBar = async ({ mode = 'dark' }: HeaderBarProps) => {

  return (
    <div className={classNames(styles.header, { [styles.light]: mode === 'light' })}>
      <div className={styles['logo-wrapper']}>
        <TransitionLink href="/" id="logo" className={styles['logo-link']}>
          <MondayLogoSvg mode={mode} />
        </TransitionLink>
      </div>
      <Menu mode={mode} />
    </div>
  );

};

export default HeaderBar;
