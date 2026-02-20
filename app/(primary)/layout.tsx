import styles from './page.module.css';
import { Hero, PrimaryPanel, SecondaryPanel } from '@/src/components/Hero';
import { OverView } from '@/src/components/OverView';

export default function PrimaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.reactive}>
      <Hero
        left={<PrimaryPanel />}
        right={<SecondaryPanel />}
        overview={<OverView />}
      />
      <div className={styles.core}>
        {children}
      </div>
    </div>
  );
}
