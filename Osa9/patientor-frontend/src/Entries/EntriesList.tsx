import React from 'react'
import { CardGroup, Container, Header } from 'semantic-ui-react';
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
      <CardGroup>
        {entries.map(e => {
          switch (e.type) {
            case 'Hospital':
              return <HospitalEntry entry={e} />
            case 'OccupationalHealthcare':
              return <OccupationalHealthcare entry={e} />
            case 'HealthCheck':
              return <HealthCheck entry={e} />
            default:
              return null;
          }
        }
        )}
      </CardGroup>
    </Container>
  );

}

export default EntriesList