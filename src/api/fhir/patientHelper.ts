import { capitalize, get } from 'lodash';
import moment from 'moment';
import { Patient } from './models';

export type RamqDetails = {
  startFirstname?: string;
  startLastname?: string;
  sex?: 'male' | 'female';
  birthDate?: Date;
};

export const RAMQ_PATTERN = RegExp(/^[a-zA-Z-]{4}\d{8,8}$/);
export const RAMQ_NUMBER_LENGTH = 12;

export const isRamqValid = (ramq: string) => RAMQ_PATTERN.test(ramq.replaceAll(' ', ''));

export const formatRamq = (value: string) =>
  value
    ? value
        .toUpperCase()
        .replace(/\s/g, '')
        .split('')
        .splice(0, RAMQ_NUMBER_LENGTH)
        .reduce(
          (acc, char, index) =>
            char !== ' ' && [3, 7].includes(index) ? `${acc}${char} ` : `${acc}${char}`,
          '',
        )
        .trimEnd()
    : value;

export const getRAMQValue = (patient?: Patient): string | undefined =>
  patient
    ? patient.identifier.find((id) => get(id, 'type.coding[0].code', '') === 'JHN')?.value
    : undefined;

export const getDetailsFromRamq = (ramq: string): RamqDetails | null => {
  if (!isRamqValid(ramq)) {
    return null;
  }

  const yearValue = ramq.slice(4, 6);
  const monthValue = Number.parseInt(ramq.slice(6, 8), 10);
  const dayValue = Number.parseInt(ramq.slice(8, 10), 10);

  if (monthValue < 0 || (monthValue > 12 && monthValue < 51) || monthValue > 63) {
    return null;
  }

  const isFemale = monthValue >= 51;
  const birthDateYearPrefix =
    moment().year() > Number.parseInt(`${20}${yearValue}`, 10) ? '20' : '19';
  const birthDateString = `${birthDateYearPrefix}${yearValue}/${
    isFemale ? monthValue - 50 : monthValue
  }/${dayValue} 00:00`;
  const birthDate = moment(birthDateString, 'YYYY/M/D').toDate();

  return {
    birthDate: birthDate <= moment().toDate() ? birthDate : undefined,
    sex: isFemale ? 'female' : 'male',
    startFirstname: ramq.slice(3, 4),
    startLastname: capitalize(ramq.slice(0, 3)),
  };
};
