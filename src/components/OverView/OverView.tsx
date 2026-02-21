import React from 'react';
import OverViewPanel from './OverViewPanel';
import styles from './ov.module.css';
import classNames from 'classnames';

const OverView = async () => {
  // const data = await fetchOverViewData();

  return (
    <OverViewPanel>
        <div className={classNames(styles.feed, styles.feed01)}>
          I am Andrey Raychev a UX designer / developer and occasional photographer. Here at bettermonday can be found some of the stuff over which I've been working lately. With 15+ years of experience and a strong background in design. I love shaping creating intuitive, visually compelling interfaces and bridging the gap between design and development. Skilled in translating complex requirements into practical solutions, with a focus on user experience and creative problem-solving.
        </div>
        <div className={classNames(styles.feed, styles.feed02)}>
          I approach projects from multiple angles - visually, structurally, and functionally. My background in design allows me to think beyond implementation and focus on the full experience. Once direction is clear, I dig deep, refine, iterate, and turn ideas into robust, maintainable frontend solutions.
        </div>
        <div className={classNames(styles.feed, styles.feed03)}>
          Beyond code, I bring curiosity, ownership, and a strong visual sensibility. I care about the details - not just how things work, but how they feel.
        </div>
    </OverViewPanel>
  );
};


export default OverView;
