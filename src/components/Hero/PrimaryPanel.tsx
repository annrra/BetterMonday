import styles from './h.module.css';
import classNames from 'classnames';
import { Intro } from '../HeroHeaderBar';
import { HeroHook } from '../HeroHook';

const PrimaryPanel = async () => {

  return (
    <div className={classNames(styles.plate, styles.pp)}>
      <Intro />
      <HeroHook />
    </div>
  );

};

export default PrimaryPanel;

