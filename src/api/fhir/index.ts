import { sendRequestWithRpt } from 'api';
import { Rpt } from 'auth/types';
import { Bundle, Patient, PractitionerRole } from './models';
import { getFhirPractitionerId } from 'auth/keycloak';
import EnvironmentVariables from 'utils/EnvVariables';

const FHIR_API_URL = EnvironmentVariables.configFor('FHIR_API');

const searchPatient = (rpt: Rpt, ramq: string) =>
  sendRequestWithRpt<Bundle<Patient>>({
    method: 'GET',
    url: `${FHIR_API_URL}/Patient`,
    params: {
      identifier: ramq,
    },
  });

const searchPractitionerRole = () =>
  sendRequestWithRpt<Bundle<PractitionerRole>>({
    method: 'GET',
    url: `${FHIR_API_URL}/PractitionerRole`,
    params: {
      practitioner: getFhirPractitionerId(),
      _include: 'PractitionerRole:practitioner',
    },
  });

export const FhirApi = {
  searchPatient,
  searchPractitionerRole,
};
