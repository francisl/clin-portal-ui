import React from 'react';
import { useHistory } from 'react-router';
import { Radio } from 'antd';

import { DYNAMIC_ROUTES, STATIC_ROUTES } from 'utils/routes';

export enum PageType {
  PATIENT = 'patient',
  SEARCH = 'search',
}

export enum VariantType {
  SNV = 'snv',
  CNV = 'cnv',
}

export interface OwnProps {
  pageType: PageType;
  variantType: VariantType;
  patientId?: string;
  prescriptionId?: string;
}

const getPatientUrl = (route: string, patientId?: string, prescriptionId?: string) =>
  route.replace(':patientid?', patientId || '').replace(':prescriptionid?', prescriptionId || '');

const VariantTypeNav = ({
  pageType,
  variantType,
  patientId,
  prescriptionId,
}: OwnProps): React.ReactElement => {
  const history = useHistory();

  switch (pageType) {
    case PageType.PATIENT:
      return (
        <Radio.Group defaultValue={variantType} buttonStyle="solid" size="small">
          <Radio.Button
            value={VariantType.SNV}
            onClick={() => {
              history.push(
                getPatientUrl(DYNAMIC_ROUTES.SNV_EXPLORATION_PATIENT, patientId, prescriptionId),
              );
            }}
          >
            SNV
          </Radio.Button>
          <Radio.Button
            value={VariantType.CNV}
            onClick={() => {
              history.push(
                getPatientUrl(DYNAMIC_ROUTES.CNV_EXPLORATION_PATIENT, patientId, prescriptionId),
              );
            }}
          >
            CNV
          </Radio.Button>
        </Radio.Group>
      );
    case PageType.SEARCH:
      return (
        <Radio.Group defaultValue={variantType} buttonStyle="solid">
          <Radio.Button
            value={VariantType.SNV}
            onClick={() => {
              history.push(STATIC_ROUTES.SNV_EXPLORATION_RQDM);
            }}
          >
            SNV
          </Radio.Button>
          <Radio.Button
            value={VariantType.CNV}
            onClick={() => {
              history.push(STATIC_ROUTES.CNV_EXPLORATION_RQDM);
            }}
          >
            CNV
          </Radio.Button>
        </Radio.Group>
      );
  }
};

export default VariantTypeNav;
