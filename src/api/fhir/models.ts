export type ResourceType =
  | 'Practitioner'
  | 'Patient'
  | 'Observation'
  | 'ClinicalImpression'
  | 'FamilyMemberHistory'
  | 'ServiceRequest'
  | 'Organization'
  | 'PractitionerRole'
  | 'Group'
  | 'Bundle';

export enum StatusType {
  draft = 'draft',
  submitted = 'submitted',
  active = 'active',
  'on-hold' = 'on-hold',
  revoked = 'revoked',
  completed = 'completed',
  incomplete = 'incomplete',
}

export type FhirResource =
  | Practitioner
  | Patient
  | Observation
  | ClinicalImpression
  | FamilyMemberHistory
  | ServiceRequest
  | Organization
  | PractitionerRole
  | FamilyGroup
  | Bundle<FhirResource>;

export type BundleMethod = 'PUT' | 'GET' | 'POST';

export interface BundleEntry<T> {
  request: {
    method: BundleMethod;
    url: string;
  };
  fullUrl?: string;
  resource?: T;
}

export interface Bundle<FhirResource> {
  resourceType: ResourceType;
  id?: string;
  type: string;
  entry: BundleEntry<FhirResource>[];
}

export interface Meta {
  profile: string[];
  lastUpdated?: string;
}

export interface Coding {
  system?: string;
  code: string;
  display?: string;
}

export interface CodeableConcept {
  coding?: Coding[];
  text?: string;
}

export interface Identifier {
  use?: string;
  type: CodeableConcept;
  value: string;
  assigner?: Reference;
}

export interface Name {
  use?: string;
  family: string;
  given: string[];
  prefix?: string[];
  suffix?: string[];
}

export interface Age {
  value: number;
  unit: string;
  system: string;
  code: string;
}

export interface Reference {
  reference: string;
}

export interface Extension {
  url: string;
  valueCoding?: Coding;
  valueReference?: Reference;
  valueBoolean?: boolean;
  valueAge?: Age;
  valueCodeableConcept?: CodeableConcept;
  extension?: Extension[];

  [key: string]: any;
}

export interface Investigation {
  code: CodeableConcept;
  item: Reference[];
}

export interface Note {
  text: string;
  time?: string;
  authorReference?: Reference;
}

export interface Category {
  text: string;
}

export interface Telecom {
  system: string;
  value: string;
  use: string;
  rank?: number;
}

export interface Interpretation {
  coding: Coding[];
  text: string;
}

export interface Patient {
  id?: string;
  resourceType: ResourceType;
  meta: Meta;
  extension: Extension[];
  identifier: Identifier[];
  active: boolean;
  name: Name[];
  birthDate?: string;
  gender: string;
  generalPractitioner: Reference[];
  managingOrganization: Reference;
}

export interface ClinicalImpression {
  id?: string;
  resourceType: ResourceType;
  meta: Meta;
  extension: Extension[];
  status: 'in-progress' | 'completed' | 'entered-in-error';
  subject: Reference;
  date: string;
  assessor?: Reference;
  investigation: Investigation[];
}

export interface FamilyMemberHistory {
  id?: string;
  resourceType: ResourceType;
  meta: Meta;
  status: string;
  patient: Reference;
  relationship: CodeableConcept;
  note?: Note[];
}

export interface ServiceRequest {
  id?: string;
  resourceType: ResourceType;
  meta: Meta;
  extension: Extension[];
  status: StatusType;
  intent: string;
  authoredOn: string;
  identifier: Identifier[];
  category: Category[];
  priority: string;
  code?: CodeableConcept;
  requester?: Reference;
  performer: Reference[];
  subject: Reference;
  note?: Note[];
}

export interface Observation {
  id?: string;
  resourceType: ResourceType;
  meta: Meta;
  status: string;
  category: CodeableConcept[];
  code: CodeableConcept;
  subject: Reference;
  interpretation?: Interpretation[];
  note?: Note[];
  extension?: Extension[];
  valueCodeableConcept?: CodeableConcept;
  valueBoolean?: boolean;
  valueString?: string;
}

export type FamilyGroupType =
  | 'person'
  | 'animal'
  | 'practitioner'
  | 'device'
  | 'medication'
  | 'substance';

export interface BackboneElement {
  entity: Reference;
}

export interface FamilyGroup {
  resourceType: ResourceType;
  id?: string;
  meta: Meta;
  type: FamilyGroupType;
  actual: boolean;
  extension: Extension[];
  member: BackboneElement[];
}

export interface Practitioner {
  resourceType: ResourceType;
  id: string;
  meta: Meta;
  identifier: Identifier[];
  name: Name[];
}

export interface SupervisorsBundle {
  entry: [
    resource: {
      entry: [resource: Practitioner];
    },
  ];
}
export interface Organization {
  resourceType: ResourceType;
  id: string;
  meta: Meta;
  name: string;
  alias: string[];
  type: CodeableConcept[];
}

export interface PractitionerRole {
  resourceType: ResourceType;
  id: string;
  meta: Meta;
  active: boolean;
  practitioner: Reference;
  organization: Reference;
  telecom: Telecom[];
  code: CodeableConcept[];
}

export interface Member {
  extension: Extension[];
  entity: Reference;
}

export interface Group {
  id: string;
  meta: Meta;
  extension: Extension[];
  member: Member[];
}

export enum PrescriptionStatus {
  draft = 'draft',
  hold = 'on-hold',
  active = 'active',
  completed = 'completed',
  revoked = 'revoked',
  incomplete = 'incomplete',
}
