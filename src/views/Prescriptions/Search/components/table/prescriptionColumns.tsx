import intl from 'react-intl-universal';
import { Tooltip } from 'antd';
import { ProColumnType } from '@ferlab/ui/core/components/ProTable/types';
import { formatDate } from 'utils/date';
import { ITablePrescriptionResult } from 'graphql/prescriptions/models/Prescription';
import PositionTag from 'components/uiKit/PositionTag';
import { PATIENT_POSITION } from 'utils/constants';
import { Link } from 'react-router-dom';
import { getPrescriptionStatusDictionnary } from 'views/Prescriptions/utils/constant';
import StatusTag from 'views/Prescriptions/components/StatusTag';

import './tableColumn.scss';

export const prescriptionsColumns = (): ProColumnType<ITablePrescriptionResult>[] => {
  return [
    {
      name: ['cid'],
      render: (cid: string, prescription: any) => {
        return <Link to={`/prescription/entity/${cid}`}>{cid}</Link>;
      },
      title: intl.get('screen.patientsearch.table.prescription'),
    },
    {
      name: ['patientInfo', 'cid'],
      render: (cid: string) => cid,
      summary: false,
      title: intl.get('screen.patientsearch.table.patientId'),
    },
    {
      name: 'status',
      render: (value: string) =>
        !!value ? (
          <StatusTag dictionary={getPrescriptionStatusDictionnary()} status={value} />
        ) : null,
      summary: false,
      title: intl.get('screen.patientsearch.table.status'),
    },
    {
      name: ['patientInfo', 'position'],
      render: (position: string) => (
        <PositionTag isProband={position.toLowerCase() === PATIENT_POSITION.PROBAND} />
      ),
      summary: false,
      title: intl.get('screen.patientsearch.table.position'),
    },
    {
      name: 'timestamp',
      render: (date: string) => formatDate(date),
      summary: false,
      title: (
        <Tooltip placement="topLeft" title={intl.get('standard.format.date')} arrowPointAtCenter>
          {intl.get('screen.patientsearch.table.date')}
        </Tooltip>
      ),
      displayTitle: intl.get('screen.patientsearch.table.date'),
      sorter: (a: ITablePrescriptionResult, b: ITablePrescriptionResult) =>
        new Date(a.timestamp) < new Date(b.timestamp) ? -1 : 0,
    },
    {
      name: ['analysis', 'code'],
      summary: true,
      title: intl.get('screen.patientsearch.table.test'),
    },
    {
      name: ['patientInfo', 'organization', 'cid'],
      summary: true,
      title: intl.get('screen.patientsearch.table.establishment'),
    },
    {
      name: ['laboratory'],
      summary: false,
      title: intl.get('screen.patientsearch.table.ldm'),
    },
  ].map((c) => ({
    ...c,
    dataIndex: c.name,
    key: Array.isArray(c.name) ? c.name.join('.') : c.name,
  }));
};
