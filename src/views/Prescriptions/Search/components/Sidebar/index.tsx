import React, { useState } from 'react';
import cx from 'classnames';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';
import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import ScrollContent from '@ferlab/ui/core/layout/ScrollContent';
import { Spin } from 'antd';
import { Aggregations } from 'graphql/models';
import { ExtendedMappingResults } from 'graphql/models';
import SidebarFilters from './Filter';

import styles from './index.module.scss';

export type SidebarData = {
  queryBuilderId: string;
  aggregations: Aggregations;
  extendedMapping: ExtendedMappingResults;
  isLoading?: boolean;
};

type PrescriptionSidebarProps = SidebarData & {
  filters: ISqonGroupFilter;
};

const PrescriptionSidebar = ({
  queryBuilderId,
  aggregations,
  extendedMapping,
  filters,
  isLoading = false,
}: PrescriptionSidebarProps): React.ReactElement => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <StackLayout
      center={false}
      className={cx(styles.siderContainer, collapsed ? styles.collapsed : '')}
      flexContent
      vertical
    >
      {collapsed ? (
        <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
      ) : (
        <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
      )}
      <ScrollContent className={cx(styles.scrollWrapper, collapsed ? styles.collapsed : '')}>
        <Spin className={styles.loader} spinning={isLoading}>
          <SidebarFilters
            queryBuilderId={queryBuilderId}
            aggregations={aggregations}
            extendedMapping={extendedMapping}
            filters={filters}
          />
        </Spin>
      </ScrollContent>
    </StackLayout>
  );
};

export default PrescriptionSidebar;
