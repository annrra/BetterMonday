import styles from './hl.module.css';
import { ShowCaseServer } from '@/src/components/ShowCase';

export default function HighlightsPage() {
  return (
    <div className={styles.module}>
      <ShowCaseServer />
    </div>
  );
}
