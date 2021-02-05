import React from 'react';
import { Card } from 'semantic-ui-react';
import { Entry } from '../types';
import Diagnosis from '../components/Diagnosis'

type Props = {
  entry: Entry;
}

const OccupationalHealthcare: React.FC<Props> = ({ entry }) => {
  return (
    <Card key={entry.id}>
      <Card.Content>
        <Card.Header content="Health Check"></Card.Header>
        <Card.Meta>{entry.date}</Card.Meta>
        <Card.Description>
          <p>{entry.description}</p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <div key={code}>
                <Diagnosis code={code} />
              </div>
            )
            )}
          </ul>
        </Card.Description>
      </Card.Content>
    </Card >
  )
}

export default OccupationalHealthcare;