import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Entry } from '../types';
import Diagnosis from '../components/Diagnosis'

type Props = {
  entry: Entry;
}

const OccupationalHealthcare: React.FC<Props> = ({ entry }) => {
  return (
    <Container>
      <Header as="h4">Occupational Healthcare</Header>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <div key={code}>
            <Diagnosis code={code} />
          </div>
        )
        )}
      </ul>
    </Container >
  )
}

export default OccupationalHealthcare;