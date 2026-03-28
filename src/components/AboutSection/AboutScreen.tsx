import Link from 'next/link';
import styles from './as.module.css';
import classNames from 'classnames';
import { HeaderBar } from '@/src/components/HeaderBar'; 
import { NavBar } from '@/src/components/NavBar';
import { ScrambleCreatedText } from '@/src/components/ui/ScrambleCreatedText';
import { HeartShapedBox } from '@/src/components/ui/HeartShapedBox';
import { EmailLink } from '@/src/components/_utils/EmailLink';
import PlayBook from './PlayBook';
import AboutCarouselServer from './AboutCarouselServer';

const AboutScreen = () => {

  return (
    <section className={styles.pane}>
      <>
        <div className={classNames(styles.twin)}>
          <div className={styles['panel-wrapper']}>
            <div className={classNames(styles.panel, styles['panel--left'])}>
              <div className={styles.hdr}>
                <HeaderBar />
              </div>
              <PlayBook />
            </div>
          </div>
          <div className={styles['panel-wrapper']}>
            <div className={classNames(styles.panel, styles['panel--right'])}>
              <div className={styles.overview}>
                <div className={styles.header}>
                  <NavBar />
                </div>
                <div className={styles.body}>
                  <div className={styles.intro}>
                    <AboutCarouselServer />
                    <div className={styles.connect}>
                      <h3>Contact</h3>
                      <div className={styles['connect-info']}>
                        <span>+359 879 901 835</span>
                        <span><EmailLink showEmail /></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.footer}>
                  <div className={styles.join}>
                    <Link href="https://www.linkedin.com/in/annrra/" target='_blank' rel="noopener noreferrer" className={styles.link}>LinkedIn</Link>
                    <Link href="https://github.com/annrra" target='_blank' rel="noopener noreferrer" className={styles.link}>GitHub</Link>
                  </div>
                  <ScrambleCreatedText />
                </div>
              </div>
            </div>
          </div>
          <HeartShapedBox inline />
        </div>
      </>
    </section>
  );

};

export default AboutScreen;
