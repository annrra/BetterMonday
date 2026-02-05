import styles from './page.module.css';
import { Hero } from '@/src/components/Hero';
import { Footer } from '@/src/components/Footer';

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
      <Footer />
    </div>
  );
}
