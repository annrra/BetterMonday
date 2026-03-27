import Link from 'next/link';
import Image from 'next/image';
import styles from './as.module.css';
import classNames from 'classnames';
import { HeaderBar } from '@/src/components/HeaderBar'; 
import { NavBar } from '@/src/components/NavBar';
import { ScrambleCreatedText } from '@/src/components/ui/ScrambleCreatedText';
import { HeartShapedBox } from '@/src/components/ui/HeartShapedBox';
import { EmailLink } from '@/src/components/_utils/EmailLink';
import ManualGraphSvg from './ManualGraphSvg';

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
              <div className={styles.playbook}>
                <div className={styles.preface}>
                  A brief manual on how to work with me.<br />
                  Pretty simple to operate - no assembly required.<br />
                  Tweak anything or challenge anything - good results will follow.
                </div>
                <div className={styles.manualgraph}>
                  <ManualGraphSvg />
                </div>
              </div>
              <div className={styles['heart-pointer']}>
                <svg
                  viewBox="0 0 254 233"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles['heart-arrow']}
                >
                  <path
                    id="HeartShapedBoxArrow"
                    d="M252.953 3.3279C253.109 3.10017 253.051 2.78895 252.823 2.63277L249.112 0.0876771C248.884 -0.0685018 248.573 -0.0104947 248.417 0.217237C248.261 0.444971 248.319 0.756195 248.546 0.912374L251.845 3.17467L249.583 6.47346C249.427 6.70119 249.485 7.01242 249.712 7.1686C249.94 7.32478 250.251 7.26677 250.408 7.03904L252.953 3.3279ZM121.04 124.545L121.54 124.514L121.539 124.503L121.04 124.545ZM252.54 3.04512C252.449 2.55358 252.448 2.55371 252.447 2.55394C252.446 2.55415 252.444 2.55448 252.442 2.55489C252.437 2.55573 252.431 2.55697 252.422 2.5586C252.405 2.56188 252.379 2.56677 252.345 2.57328C252.277 2.58632 252.176 2.60586 252.043 2.6321C251.778 2.68457 251.385 2.76378 250.873 2.87106C249.849 3.08561 248.351 3.41246 246.447 3.86223C242.639 4.76174 237.211 6.15307 230.723 8.12137C217.75 12.0573 200.528 18.3035 183.551 27.5435C149.62 46.0119 116.517 76.5339 120.542 124.587L121.04 124.545L121.539 124.503C117.564 77.0567 150.211 46.8286 184.029 28.4219C200.928 19.2244 218.081 13.0018 231.014 9.0783C237.479 7.11689 242.887 5.73086 246.677 4.83544C248.572 4.38774 250.062 4.06273 251.078 3.84979C251.586 3.74332 251.975 3.66488 252.237 3.61313C252.368 3.58726 252.467 3.56805 252.533 3.55536C252.567 3.54902 252.591 3.5443 252.608 3.54119C252.616 3.53963 252.622 3.53848 252.626 3.53772C252.628 3.53735 252.63 3.53708 252.631 3.53689C252.632 3.53672 252.632 3.53665 252.54 3.04512ZM121.04 124.545L120.541 124.576C123.523 172.537 93.4836 199.137 62.5763 213.781C47.1227 221.103 31.4756 225.42 19.6871 227.908C13.7942 229.151 8.86854 229.936 5.41759 230.41C3.6922 230.647 2.33565 230.807 1.41139 230.907C0.949248 230.957 0.595214 230.992 0.357195 231.014C0.238185 231.026 0.14819 231.034 0.0881795 231.039C0.0581738 231.042 0.035665 231.044 0.0207892 231.045C0.0133519 231.046 0.00782902 231.046 0.00420564 231.046C0.00239455 231.047 0.00113311 231.047 0.000238106 231.047C-0.000542592 231.047 -0.000840117 231.047 0.0403504 231.545C0.0815408 232.043 0.0822084 232.043 0.0833592 232.043C0.0843932 232.043 0.0860248 232.043 0.0880916 232.043C0.0922018 232.043 0.0982362 232.042 0.106162 232.041C0.122036 232.04 0.145547 232.038 0.176578 232.035C0.238596 232.03 0.330675 232.021 0.451779 232.01C0.693985 231.987 1.05234 231.951 1.51892 231.901C2.45209 231.8 3.81819 231.639 5.55374 231.401C9.02466 230.924 13.974 230.135 19.8936 228.886C31.7301 226.389 47.458 222.05 63.0044 214.685C94.0971 199.953 124.557 173.054 121.539 124.514L121.04 124.545Z"
                    fill="#838383"
                  />
                </svg>
              </div>
              {/* <div className={styles.media}>
                <Image
                  src="https://bettermonday.org/wp-content/uploads/cudillero-mirror.jpg"
                  alt=""
                  fill
                  className={styles.i}
                />
                <video
                  src="vid-rotate-bw.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={styles.video}
                />
              </div> */}
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
                    <div className={styles.slide}>
                      <div className={styles.data}>
                        <p>It is all about the joy of creating something that did not exist before. Behind BetterMonday is Andrey Raychev a UX designer / developer and occasional <Link href="https://photocomma.com" target='_blank' rel="noopener noreferrer">photographer</Link>.</p>
                        <p>I build creative front-end and full-scope sites, lead launches, and collaborate with designers to preserve design fidelity.</p>
                      </div>
                      <div className={styles.paginate}>
                        <span className={styles.current}></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
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
