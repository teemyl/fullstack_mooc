import patients from '../../data/patients';
import { NonSensitivePatientData, Patient, NewPatient } from '../types';
import { generateUUID } from '../utils';

const getPatients = (): Array<NonSensitivePatientData> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: generateUUID(patients.map(p => p.id)),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
}

export default {
  getPatients,
  addPatient
}