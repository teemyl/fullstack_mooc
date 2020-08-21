import patients from '../../data/patients';
import { NonSensitivePatientData } from '../types';

const getPatients = (): Array<NonSensitivePatientData> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}

export default {
  getPatients
}