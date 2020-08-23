import React from 'react';
import { Segment, Header, Icon, List } from 'semantic-ui-react';

import { useStateValue } from "../state";
import {
  Entry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HospitalEntry,
  Diagnosis } from '../types';
import { assertNever } from '../utils';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

enum HealthCareIcon {
  Hospital = 'hospital',
  OccupationalHealthcare = 'stethoscope',
  HealthCheck = 'user md'
}

const getHealthCheckColor = (rating: number): SemanticCOLORS => {
  switch (rating) {
    case 0: return 'green';
    case 1: return 'yellow';
    case 2: return 'orange';
    case 3: return 'red';
    default: return 'grey';
  }
}

const DiagnosisEntry: React.FC<{ code: string}> = ({ code }) => {
  const [{ diagnoses }, ] = useStateValue();
  const diagnosis: Diagnosis | undefined = diagnoses.find(d => d.code === code);
  return <>{code} { diagnosis && diagnosis.name}</>
};

const DiagnosisList: React.FC<{ diagnoses: string[] | undefined }> = ({ diagnoses }) => {
  if (diagnoses && diagnoses.length > 0) {
    return (
      <List bulleted>
        {
          diagnoses.map(code => (
            <List.Item key={code}><DiagnosisEntry code={code} /></List.Item>
          ))
        }
      </List>
    )
  }
  return null;
};

const HospitalEntryDisplay: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name={HealthCareIcon[entry.type]} /></Header>
      <i>{entry.description}</i>
      <DiagnosisList diagnoses={entry.diagnosisCodes} />
    </Segment>
  )
};

const OccupationalHealthcareEntryDisplay: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name={HealthCareIcon[entry.type]} /> {entry.employerName}</Header>
      <i>{entry.description}</i>
      <DiagnosisList diagnoses={entry.diagnosisCodes} />
    </Segment>
  )
};

const HealthCheckEntryDisplay: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name={HealthCareIcon[entry.type]} /></Header>
      <i>{entry.description}</i>
      <br />
      <Icon name="heart" color={getHealthCheckColor(entry.healthCheckRating)} />
      <DiagnosisList diagnoses={entry.diagnosisCodes} />
    </Segment>
  )
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntryDisplay entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDisplay entry={entry} />
    case "HealthCheck":
      return <HealthCheckEntryDisplay entry={entry} />
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;