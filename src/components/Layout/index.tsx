import React from 'react';
import { Layout as AntLayout } from 'antd';
import Header from 'components/Layout/Header';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { MAIN_SCROLL_WRAPPER_ID } from 'utils/constants';

import styles from './index.module.scss';

interface OwnProps {
  children: React.ReactElement;
}

const PageLayout = ({ children }: OwnProps) => (
  <AntLayout className={styles.mainLayout}>
    <Header />
    <ScrollContent id={MAIN_SCROLL_WRAPPER_ID} className={styles.mainContent}>
      <div id="content">{children}</div>
    </ScrollContent>
  </AntLayout>
);

export default PageLayout;
