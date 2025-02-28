import cx from 'classnames';
import { Space } from 'antd';
import { GeneEntity, VariantEntity } from 'graphql/variants/models';
import SummaryCard from 'views/Variants/Entity/SummaryPanel/Summary';
import { ArrangerResultsTree } from 'graphql/models';
import Consequecenses from './Consequences';
import ACMGCriteria from './AcmgCriteria';
import FrequencyCard from './Frequency';
import ClinicalCard from './Clinical';

import styles from './index.module.scss';
import Container from 'components/Layout/Container';

interface OwnProps {
  className?: string;
  locus: string;
  data: {
    loading: boolean;
    variantData: VariantEntity | null;
  };
}

export const shortToLongPrediction: Record<string, string> = {
  'sift.d': 'damaging',
  'sift.t': 'tolerated',
  'polyphen2.p': 'possibly damaging',
  'polyphen2.d': 'probably damaging',
  'polyphen2.b': 'benign',
  'fathmm.d': 'damaging',
  'fathmm.t': 'tolerated',
  'lrt.d': 'deleterious',
  'lrt.n': 'neutral',
  'lrt.u': 'unknown',
};

const ResumePanel = ({ data, locus, className = '' }: OwnProps) => {
  const variantData = data.variantData;
  const genes = (variantData?.genes as ArrangerResultsTree<GeneEntity>)?.hits.edges;

  return (
    <div className={cx(styles.resumePanelWrapper, className)}>
      <Space direction="vertical" className={styles.resumePanel} size="middle">
        <SummaryCard loading={data.loading} variant={variantData} genes={genes} />
        <Consequecenses data={data} />
        <ACMGCriteria data={data} />
        <FrequencyCard locus={locus} />
        <ClinicalCard locus={locus} />
      </Space>
    </div>
  );
};

export default ResumePanel;
