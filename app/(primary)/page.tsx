import styles from './page.module.css';
import { ShowCase } from '@/src/components/ShowCase';
import { Footer } from '@/src/components/Footer';

export default function Home() {
  return (
    <div className={styles.module}>
      <ShowCase />
      <Footer />
    </div>
  );
}
