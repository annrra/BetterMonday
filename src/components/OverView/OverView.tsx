import React from 'react';
import OverViewPanel from './OverViewPanel';
import OverviewLogoSvg from './OverviewLogoSvg';
import styles from './ov.module.css';
import classNames from 'classnames';

const OverView = async () => {
  // const data = await fetchOverViewData();

  return (
    <OverViewPanel>
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
    </OverViewPanel>
  );
};


export default OverView;
