import styles from './page.module.css';

export default function PrimaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.reactive}>
      <div className={styles.core}>
        {children}
      </div>
    </div>
  );
}
