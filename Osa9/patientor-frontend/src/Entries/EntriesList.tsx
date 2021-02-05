import React from 'react'
import { Container, Header } from 'semantic-ui-react';
import DiagnosisComponent from '../components/Diagnosis'
import { Entry } from '../types'
import HealthCheck from './HealthCheck';
import HospitalEntry from './HostpitalEntry';
import OccupationalHealthcare from './OccupationalHealthcare';

type Props = {
  entries: Entry[];
};

const EntriesList: React.FC<Props> = ({ entries }) => {
  return (
    <Container>
      <Header as="h2">Entries</Header>
      {entries.map(e => {
        switch (e.type) {
          case 'Hospital':
            return (<div key={e.id}><HospitalEntry entry={e} /></div>)
          case 'OccupationalHealthcare':
            return (<div key={e.id}><OccupationalHealthcare entry={e} /></div>)
          case 'HealthCheck':
            return (<div key={e.id}><HealthCheck entry={e} /></div>)
          default:
            return null;
        }
      }
      )}
    </Container>
  );

}

export default EntriesList