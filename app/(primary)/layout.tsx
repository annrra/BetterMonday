import styles from './page.module.css';
import { Hero, PrimaryPanel, SecondaryPanel } from '@/src/components/Hero';

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
      />
      {children}
    </div>
  );
}
