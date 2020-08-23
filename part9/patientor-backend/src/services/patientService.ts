import patients from '../../data/patients';
import {
  PublicPatient,
  Patient,
  NewPatient,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from '../types';
import { generateUUID } from '../utils';

const getPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
}

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: generateUUID(patients.map(p => p.id)),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: Patient['id'], entry: Entry): Patient | undefined => {
  const patient: Patient | undefined = patients.find(p => p.id === id);
  
  if (!patient)
    throw new Error("Not found");

  const existingIds = patient.entries.map(e => e.id);

  switch (entry.type) {
    case 'HealthCheck':
        if (!isHealthCheckEntry(entry))
          throw new Error('Invalid type');

        patient.entries.push({
          ...entry,
          healthCheckRating: entry.healthCheckRating,
          id: generateUUID(existingIds)
        });

        return patient;
    case 'Hospital':
      if (!isHospitalEntry(entry))
        throw new Error('Invalid type');

      patient.entries.push({
        ...entry,
        discharge: entry.discharge,
        id: generateUUID(existingIds)
      });

      return patient;
    case 'OccupationalHealthcare':
      if (!isOccupationalHealthcareEntry(entry))
        throw new Error('Invalid type');

      patient.entries.push({
        ...entry,
        employerName: entry.employerName,
        id: generateUUID(existingIds)
      });
      
      return patient;
    default: throw new Error('not found');
  }
};

const isHealthCheckEntry = (entry: Entry) : entry is HealthCheckEntry => {
  return (<HealthCheckEntry>entry).healthCheckRating !== undefined;
}

const isHospitalEntry = (entry: Entry) : entry is HospitalEntry => {
  return (<HospitalEntry>entry).discharge !== undefined;
}

const isOccupationalHealthcareEntry = (entry: Entry) : entry is OccupationalHealthcareEntry => {
  return (<OccupationalHealthcareEntry>entry).employerName !== undefined;
}


export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry
};