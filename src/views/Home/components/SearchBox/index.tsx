import { SearchOutlined } from '@ant-design/icons';
import GridCard from '@ferlab/ui/core/view/v2/GridCard';
import { AutoComplete, AutoCompleteProps, Input, Space, Typography } from 'antd';
import LabelWithInfo from 'components/uiKit/form/LabelWithInfo';

import styles from './index.module.scss';

interface OwnProps {
  icon: React.ReactNode;
  title: string;
  searchLabel: string;
  searchPlaceholder?: string;
  autoCompleteProps?: Omit<AutoCompleteProps, 'className' | 'getPopupContainer'>;
  customAutoComplete?: React.ReactNode;
}

const SearchBox = ({
  icon,
  title,
  searchPlaceholder,
  searchLabel,
  autoCompleteProps,
  customAutoComplete,
}: OwnProps) => (
  <GridCard
    theme="shade"
    className={styles.searchCard}
    wrapperClassName={styles.searchBox}
    content={
      <div className={styles.searchWrapper}>
        <div className={styles.searchHeader}>
          <span className={styles.searchBoxIcon}>{icon}</span>
          <Typography.Text strong className={styles.searchBoxTitle}>
            {title}
          </Typography.Text>
        </div>
        <Space direction="vertical" className={styles.searchInputWrapper}>
          <LabelWithInfo title={searchLabel} colon />
          {customAutoComplete ? (
            customAutoComplete
          ) : (
            <AutoComplete
              {...autoCompleteProps}
              className={styles.searchInput}
              getPopupContainer={(trigger) => trigger.parentElement!}
            >
              <Input
                suffix={<SearchOutlined />}
                size="large"
                placeholder={searchPlaceholder}
              ></Input>
            </AutoComplete>
          )}
        </Space>
      </div>
    }
  />
);

export default SearchBox;
