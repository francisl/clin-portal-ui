import StackLayout from '@ferlab/ui/core/layout/StackLayout';
import { Typography } from 'antd';
import intl from 'react-intl-universal';
import {
  ClinicalGenesTableSource,
  Conditions,
  CosmicConditions,
  DddConditions,
  HpoConditions,
  Inheritance,
  OmimConditions,
  OmimGene,
  OmimInheritance,
  OrphanetConditions,
  OrphanetInheritance,
  SingleValuedInheritance,
} from 'graphql/variants/models';
import OrphanetConditionCell from 'views/Variants/Entity/SummaryPanel/Clinical/conditions/OrphanetConditionCell';
import HpoConditionCell from 'views/Variants/Entity/SummaryPanel/Clinical/conditions/HpoConditionCell';
import DddConditionCell from 'views/Variants/Entity/SummaryPanel/Clinical/conditions/DddConditionCell';
import CosmicConditionCell from 'views/Variants/Entity/SummaryPanel/Clinical/conditions/CosmicConditionCell';
import OmimConditionCell from 'views/Variants/Entity/SummaryPanel/Clinical/conditions/OmimConditionCell';
import { TABLE_EMPTY_PLACE_HOLDER } from 'utils/constants';
import ExternalLink from 'components/uiKit/ExternalLink';

const { Text } = Typography;

export const columnsClinVar = [
  {
    title: () => intl.get('interpretation'),
    dataIndex: 'interpretation',
  },
  {
    title: () => intl.get('condition'),
    dataIndex: 'condition',
    width: '33%',
  },
  {
    title: () => intl.get('inheritance'),
    dataIndex: 'inheritance',
    width: '33%',
  },
];

type Record = {
  source: ClinicalGenesTableSource;
  gene: string | OmimGene;
  conditions: Conditions;
  inheritance: Inheritance;
};

export const columnsPhenotypes = [
  {
    title: () => intl.get('screen.variantDetails.clinicalAssociationsTab.source'),
    dataIndex: 'source',
  },
  {
    title: () => intl.get('screen.variantDetails.clinicalAssociationsTab.gene'),
    dataIndex: 'gene',
    render: (text: Conditions, record: Record) => {
      const source = record.source;
      if (source === ClinicalGenesTableSource.omim) {
        const [geneName, omimId] = record.gene as OmimGene;
        return (
          <>
            <Text>{geneName}</Text>&nbsp;(MIM:
            <ExternalLink href={`https://www.omim.org/entry/${omimId}`}>{omimId}</ExternalLink>)
          </>
        );
      }
      return record.gene;
    },
  },
  {
    title: () => intl.get('screen.variantDetails.clinicalAssociationsTab.condition'),
    dataIndex: 'conditions',
    render: (text: Conditions, record: Record) => {
      switch (record.source) {
        case ClinicalGenesTableSource.omim:
          return <OmimConditionCell conditions={record.conditions as OmimConditions} />;
        case ClinicalGenesTableSource.orphanet:
          return <OrphanetConditionCell conditions={record.conditions as OrphanetConditions} />;
        case ClinicalGenesTableSource.hpo:
          return <HpoConditionCell conditions={record.conditions as HpoConditions} />;
        case ClinicalGenesTableSource.ddd:
          return <DddConditionCell conditions={record.conditions as DddConditions} />;
        default:
          return <CosmicConditionCell conditions={record.conditions as CosmicConditions} />;
      }
    },
    width: '33%',
  },
  {
    title: () => intl.get('screen.variantDetails.clinicalAssociationsTab.inheritance'),
    dataIndex: 'inheritance',
    render: (text: Inheritance, record: Record) => {
      const source = record.source;
      if (source === ClinicalGenesTableSource.orphanet) {
        const orphanetInheritance = (record.inheritance || []) as OrphanetInheritance;
        return (
          <>
            {orphanetInheritance.map((inheritance: string[], index: number) => (
              <StackLayout key={index}>
                <Text>{inheritance ? inheritance.join(',') : TABLE_EMPTY_PLACE_HOLDER}</Text>
              </StackLayout>
            ))}
          </>
        );
      } else if (source === ClinicalGenesTableSource.omim) {
        const omimInheritance = record.inheritance as OmimInheritance;
        return (
          <>
            {omimInheritance.map((inheritance: string[], index: number) => (
              <StackLayout key={index}>
                <Text>{inheritance ? inheritance.join(',') : TABLE_EMPTY_PLACE_HOLDER}</Text>
              </StackLayout>
            ))}
          </>
        );
      }
      const inheritance = record.inheritance as SingleValuedInheritance;
      return inheritance || TABLE_EMPTY_PLACE_HOLDER;
    },
    width: '33%',
  },
];
