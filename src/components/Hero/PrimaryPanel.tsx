import styles from './h.module.css';
import classNames from 'classnames';
import { HeaderBar } from '@/src/components/HeaderBar';
import Intro from './Intro';
import { HeroHook } from '../HeroHook';

const PrimaryPanel = async () => {

  return (
    <div className={classNames(styles.plate, styles.pp)}>
      <div className={styles.hdr}>
        <HeaderBar />
        <Intro />
      </div>
      <HeroHook />
    </div>
  );

};

export default PrimaryPanel;

