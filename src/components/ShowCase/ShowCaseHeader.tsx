import { TransitionLink } from '@/src/components/transitions';
import styles from './sc.module.css';
import { MondayLogoSvg } from '@/src/components/ui/MondayLogoSvg';

const ShowCaseHeader = () => {

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <TransitionLink href="/">
          <MondayLogoSvg />
        </TransitionLink>
      </div>
    </div>
  );

};

export default ShowCaseHeader;

