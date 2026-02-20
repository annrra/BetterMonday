import React from 'react';
import Link from 'next/link';
import OverViewPanel from './OverViewPanel';
import OverviewLogoSvg from './OverviewLogoSvg';
import styles from './ov.module.css';
import classNames from 'classnames';

const OverView = async () => {
  // const data = await fetchOverViewData();

  return (
    <OverViewPanel>
      <div className={styles.pane}>
        <Link href="/" className={styles.x} />
        <div className={styles.body}>
          <div className={styles.logo}>
            <OverviewLogoSvg />
          </div>
          <div className={classNames(styles.feed, styles.feed01)}>
            I am a UX designer / developer and occasional photographer from Bulgaria currently living in Sofia. Here at bettermonday can be found some of the stuff over which I've been working lately. My recent work consists mostly of design, Front-end development and its implementation into different content management systems.
          </div>
          <div className={classNames(styles.feed, styles.feed02)}>
            I like to keep things simple mixing up thoughtful research and attention for the detail in the process. I'm currently available for web design and development projects.
          </div>
          <div className={classNames(styles.feed, styles.feed03)}>
            ...
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.join}>
            <Link href="mailto:xxx@xxx.xxx" className={styles.link}>Email</Link>
            <Link href="https://www.linkedin.com/in/annrra/" className={styles.link}>LinkedIn</Link>
            <Link href="https://github.com/annrra" className={styles.link}>GitHub</Link>
          </div>
          <div className={styles.copy}>Created by BetterMonday - 2026</div>
        </div>
      </div>
    </OverViewPanel>
  );
};


export default OverView;
