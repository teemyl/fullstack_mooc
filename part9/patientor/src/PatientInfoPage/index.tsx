import React, { useEffect } from 'react'
import { Header, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue, updateCurrentPatient } from "../state";
import { Patient, Entry } from '../types';
import { apiBaseUrl } from "../constants";
import EntryDetails from "../components/EntryDetails";

enum GenderIcon {
  male = 'mars',
  female = 'venus'
}

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    const fetchPatient = async () => {
      const { data: fetchedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updateCurrentPatient(fetchedPatient));
    }

    if (!patient || patient.id !== id) {
      fetchPatient();
    }
  }, [id, dispatch, patient]);

  if (!patient) return <div>404</div>;

  const hasEntries = patient.entries && patient.entries.length > 0;
  
  return (
    <div>
      <Header as="h2">
        {patient.name}
        <Icon name={GenderIcon[patient.gender]} />
      </Header>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      
      <Header as="h3">{hasEntries ? "Entries" : "No entries"}</Header>
      {
        hasEntries &&
        patient.entries.map((entry: Entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))
      }
    </div>
  );
};

export default PatientInfoPage;