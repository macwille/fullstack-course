import React from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Container, Header } from 'semantic-ui-react';
import { addPatient } from '../state/reducer';

import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = Object.values(patients).filter(p => p.id === id).pop();

  React.useEffect(() => {
    if (!patients || !patient) {
      axios.get<void>(`${apiBaseUrl}/ping`);

      const fetchPatient = async () => {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatient(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      };
      fetchPatient();
    }
  }, [dispatch, id, patients, patient]);

  if (patient) {
    return (
      <Container>
        <Header as="h2">{patient.name}</Header>
        <p>Date of Birth: <b>{patient.dateOfBirth}</b></p>
        <p>Gender: <b>{patient.gender.toUpperCase()}</b></p>
        <p>Occupation: <b>{patient.occupation}</b></p>
      </Container>
    );
  }
  return (
    <div>
      No data :/
    </div>
  );
}

export default PatientPage;