import styles from './h.module.css';
import classNames from 'classnames';
import { NavBar } from '@/src/components/NavBar';
import { MediaRoll } from '@/src/components/MediaRoll';
import { ConnectPanel } from '@/src/components/ConnectOverlay';

const SecondaryPanel = () => {

  return (
    <div className={classNames(styles.plate, styles.sp)}>
      <NavBar showConnectCta />
      <MediaRoll />
      <ConnectPanel />
    </div>
  );

};

export default SecondaryPanel;
