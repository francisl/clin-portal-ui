import { useHistory, useLocation } from 'react-router';
import { Tag, Tabs } from 'antd';
import { TeamOutlined, BarChartOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import ServerError from 'components/Results/ServerError';
import NotFound from 'components/Results/NotFound';
import ResumePanel from './SummaryPanel';
import { GraphqlBackend } from 'providers/';
import ApolloProvider from 'providers/ApolloProvider';
import { useTabSummaryData } from 'graphql/variants/tabActions';
import PatientPanel from 'views/Variants/Entity/PatientPanel';
import ContentWithHeader from 'components/Layout/ContentWithHeader';

import styles from './index.module.scss';

export const getVepImpactTag = (score: number | string) => {
  switch (score) {
    case 1:
    case 'modifier':
      return <Tag>MODIFIER</Tag>;
    case 2:
    case 'low':
      return <Tag color="green">LOW</Tag>;
    case 3:
    case 'moderate':
      return <Tag color="gold">MODERATE</Tag>;
    case 4:
    case 'high':
      return <Tag color="red">HIGH</Tag>;

    default:
      return true;
  }
};

export enum TAB_ID {
  SUMMARY = 'summary',
  PATIENTS = 'patients',
  FREQUENCY = 'frequency',
  CLINICAL = 'clinical',
}

interface OwnProps {
  hash: string;
  tabid: string;
}

const VariantEntityPage = ({ hash, tabid }: OwnProps) => {
  const { loading, data, error } = useTabSummaryData(hash);
  const location = useLocation();
  const history = useHistory();
  const patientId = new URLSearchParams(location.search).get('patientid');

  if (error) {
    return <ServerError />;
  }

  if (!data && !loading) {
    return <NotFound />;
  }

  return (
    <ContentWithHeader
      className={styles.variantEntity}
      headerProps={{
        title: data?.hgvsg,
        loading,
        extra: [
          <Tag color="purple">{data?.variant_type.toLocaleUpperCase()}</Tag>,
          getVepImpactTag(data?.max_impact_score),
        ],
      }}
    >
      <Tabs
        size="small"
        className={styles.entitySections}
        activeKey={tabid}
        onChange={(key) => {
          if (history.location.hash !== key) {
            history.push(`/variant/entity/${hash}/${key}?patientid=${patientId || ''}`);
          }
        }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <BarChartOutlined height="16" width="16" />
              {intl.get('screen.variantdetails.tab.summary')}
            </span>
          }
          key={TAB_ID.SUMMARY}
        >
          <ResumePanel
            className={styles.pageContainer}
            hash={hash}
            data={{
              loading: loading,
              variantData: data,
            }}
          />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span>
              <TeamOutlined height="16" width="16" />
              {intl.get('screen.variantdetails.tab.patients')}
            </span>
          }
          key={TAB_ID.PATIENTS}
        >
          <PatientPanel className={styles.pageContainer} hash={hash} />
        </Tabs.TabPane>
      </Tabs>
    </ContentWithHeader>
  );
};

const EntityPage = (props: OwnProps) => (
  <ApolloProvider backend={GraphqlBackend.ARRANGER}>
    <VariantEntityPage {...props} />
  </ApolloProvider>
);

export default EntityPage;
