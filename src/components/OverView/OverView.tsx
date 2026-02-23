import React from 'react';
import OverViewPanel from './OverViewPanel';
import { getOverviewContent } from '@/lib/api';
import styles from './ov.module.css';
import classNames from 'classnames';

type OverviewItem = {
  [key: string]: string | null;
};

const OverView = async () => {
  const overviewData = await getOverviewContent();
  const overview: Record<string, OverviewItem> = overviewData?.page ?? {};
  
  

  return (
    <OverViewPanel>
      {Object.entries(overview).map(([sectionKey, sectionValue], index) => {
        // Extract heading + meta dynamically
        const heading = Object.entries(sectionValue).find(([key]) =>
          key.includes("heading")
        )?.[1];

        const meta = Object.entries(sectionValue).find(([key]) =>
          key.includes("meta")
        )?.[1];

        return (
          <div
            key={sectionKey}
            className={classNames(
              styles.feed,
              styles[`feed0${index + 1}`]
            )}
          >
            {meta && (
              <div
                className={styles.info}
                dangerouslySetInnerHTML={{ __html: meta }}
              />
            )}
            {heading && (
              <div
                className={styles.title}
                dangerouslySetInnerHTML={{ __html: heading }}
              />
            )}
          </div>
        );
      })}
    </OverViewPanel>
  );
};


export default OverView;
