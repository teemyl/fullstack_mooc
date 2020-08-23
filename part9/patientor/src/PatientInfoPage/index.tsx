import React from 'react'
import { Header, Icon, Button } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { useStateValue, updateCurrentPatient, updatePatient } from "../state";
import { Patient, Entry } from '../types';
import { apiBaseUrl } from "../constants";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

enum GenderIcon {
  male = 'mars',
  female = 'venus'
}

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    const fetchPatient = async () => {
      const { data: fetchedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updateCurrentPatient(fetchedPatient));
    }

    if (!patient || patient.id !== id) {
      fetchPatient();
    }
  }, [id, dispatch, patient]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
  
  if (!patient) return <div>404</div>;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      dispatch(updateCurrentPatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button primary onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInfoPage;