import Link from 'next/link';
import Image from 'next/image';
import styles from './as.module.css';
import classNames from 'classnames';
import { HeaderBar } from '@/src/components/HeaderBar'; 
import { NavBar } from '@/src/components/NavBar';
import ScrambleCreatedText from './ScrambleCreatedText';
import { FluidLink } from '@/src/components/ui/FluidLink';
import { HeartShapedBox } from '@/src/components/ui/HeartShapedBox';
import { EmailLink } from '@/src/components/_utils/EmailLink';

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
              <div className={styles.media}>
                <Image
                  src="https://bettermonday.org/wp-content/uploads/cudillero-mirror.jpg"
                  alt=""
                  fill
                  className={styles.i}
                />
                {/* <video
                  src="vid-rotate-bw.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={styles.video}
                /> */}
              </div>
            </div>
          </div>
          <div className={styles['panel-wrapper']}>
            <div className={classNames(styles.panel, styles['panel--right'])}>
              <div className={styles.overview}>
                <div className={styles.header}>
                  <NavBar mode='light' />
                </div>
                <div className={styles.body}>
                  <div className={styles.intro}>
                    <div className={styles.slide}>
                      <div className={styles.data}>
                        <p>It is all about the joy of creating something that did not exist before. Behind BetterMonday is Andrey Raychev a UX designer / developer and occasional photographer.</p>
                        <p>I build creative front-end and full-scope sites, lead launches, and collaborate with designers to preserve design fidelity.</p>
                      </div>
                      <div className={styles.paginate}>
                        <span></span>
                        <span className={styles.current}></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                    <div className={styles.connect}>
                      <h2>Contact</h2>
                      <div className={styles['contact-info']}>
                        <span>+359 879 901 835</span>
                        <span><EmailLink showEmail /></span>
                      </div>
                      <div className={styles['cta']}>
                        <FluidLink href="/connect" text="tell me what you're building" hasBackground />
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
          <HeartShapedBox />
        </div>
      </>
    </section>
  );

};

export default AboutScreen;
