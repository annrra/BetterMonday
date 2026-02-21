import React from 'react';
import OverViewPanel from './OverViewPanel';
import { getOverviewContent } from '@/lib/api';
import styles from './ov.module.css';
import classNames from 'classnames';

const OverView = async () => {
  const overviewData = await getOverviewContent();
  const overview: Record<string, string> = overviewData?.page?.nextoverviewmeta ?? '';

  return (
    <OverViewPanel>
        {Object.entries(overview).map(([key, value], index) => (
          <div
            key={key}
            className={classNames(
              styles.feed,
              styles[`feed0${index + 1}`]
            )}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ))}
    </OverViewPanel>
  );
};


export default OverView;
