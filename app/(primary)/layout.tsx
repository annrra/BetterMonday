import styles from './page.module.css';
import { Hero } from '@/src/components/Hero';

export default function PrimaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.reactive}>
      <Hero />
      <div className={styles.core}>
        {children}
      </div>
    </div>
  );
}
