import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';
import { PublicPatient, Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient: PublicPatient | undefined = patientService.getPatient(req.params.id);
  if (!patient) {
    res.status(404).send('Not found')
  }
  else {
    res.json(patient);
  }
})

router.post('/:id/entries', (req, res) => {
  try {
    const patient: Patient | undefined = patientService.addEntry(req.params.id, req.body);
    res.json(patient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
})

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send((e as Error).message);
  }
});

export default router;