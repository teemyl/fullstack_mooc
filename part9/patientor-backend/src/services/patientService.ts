import patients from '../../data/patients';
import { PublicPatient, Patient, NewPatient } from '../types';
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

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: generateUUID(patients.map(p => p.id)),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  addPatient
};