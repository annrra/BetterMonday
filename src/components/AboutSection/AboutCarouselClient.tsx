'use client';
import { useState } from 'react';
import styles from './ac.module.css';
import classNames from 'classnames';

type Section = {
  key: string;
  heading?: string | null;
  meta?: string | null;
};

const AboutCarouselClient = ({ sections }: { sections: Section[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={styles.slide}>
      {sections.map((section, index) => (
        <div
          key={section.key}
          className={classNames(
            styles.feed,
            styles[`feed0${index + 1}`],
            { [styles.active] : index === activeIndex}
          )}
        >
          {section.heading && (
            <div className={styles.heading}>
              <div
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: section.heading }}
              />
            </div>
          )}

          {section.meta && (
            <div
              className={styles.info}
              dangerouslySetInnerHTML={{ __html: section.meta }}
            />
          )}
        </div>
      ))}

      <div className={styles.paginate}>
        {sections.map((section, index) => (
          <span
            key={section.key}
            onClick={() => setActiveIndex(index)}
            className={classNames(styles.bullet, { [styles.active] : index === activeIndex})}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutCarouselClient;