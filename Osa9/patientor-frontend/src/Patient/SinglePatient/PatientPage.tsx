import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Container, Header, Button, Divider } from 'semantic-ui-react';
import { addPatient } from '../../state/reducer';

import { apiBaseUrl } from "../../constants";
import { useStateValue } from "../../state";
import { Patient } from "../../types";
import EntriesList from '../../Entries/EntriesList';
import AddEntryModal from "../../AddEntryModal";
import { EntryFormValues } from '../../AddEntryModal/AddEntryForm';

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).filter(p => p.id === id).pop();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    if (!patients || !patient) {
      axios.get<void>(`${apiBaseUrl}/ping`);

      const updateEntry = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      updateEntry();
    }
  }, [dispatch, id, patients, patient]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log('Values', values)
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log('Updated patient', updatedPatient)
      dispatch(addPatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (patient) {
    return (
      <Container>
        <Header as="h2">{patient.name}</Header>
        <p>Date of Birth: <b>{patient.dateOfBirth}</b></p>
        <p>Gender: <b>{patient.gender.toUpperCase()}</b></p>
        <p>Occupation: <b>{patient.occupation}</b></p>
        <EntriesList entries={patient.entries} />
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Divider hidden />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Header as="h2">No data :/</Header>
    </Container>
  );
}

export default PatientPage;