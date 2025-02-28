import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';
import { ISqonGroupFilter } from '@ferlab/ui/core/data/sqon/types';

export const wrapSqonWithDonorIdAndSrId = (
  resolvedSqon: ISqonGroupFilter,
  patientId?: string,
  prescriptionId?: string,
) => {
  if (patientId || prescriptionId) {
    let subContent: any[] = [];

    if (patientId) {
      subContent.push({
        content: { field: 'donors.patient_id', value: [patientId] },
        op: TermOperators.in,
      });
    }

    if (prescriptionId) {
      subContent.push({
        content: { field: 'donors.service_request_id', value: [prescriptionId] },
        op: TermOperators.in,
      });
    }

    return {
      content: [
        {
          content: subContent,
          op: 'and',
        },
        { ...resolvedSqon },
      ],
      op: 'and',
      pivot: 'donors',
    };
  }

  return resolvedSqon;
};

export const lol = (
  resolvedSqon: ISqonGroupFilter,
  patientId: string | undefined,
  prescriptionId: string | undefined,
) => {
  if (patientId || prescriptionId) {
    let content: any = [{ ...resolvedSqon }];

    if (patientId) {
      content.push({
        content: { field: 'donors.patient_id', value: [patientId] },
        op: TermOperators.in,
      });
    }

    if (prescriptionId) {
      content.push({
        content: { field: 'donors.service_request_id', value: [prescriptionId] },
        op: TermOperators.in,
      });
    }

    return {
      content,
      op: 'and',
      pivot: 'donors',
    };
  }

  return resolvedSqon;
};
