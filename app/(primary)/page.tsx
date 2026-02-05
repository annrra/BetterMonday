import styles from './page.module.css';
import { ShowCase } from '@/src/components/ShowCase';

export default function Home() {
  return (
    <div className={styles.module}>
      <ShowCase />
    </div>
  );
}
