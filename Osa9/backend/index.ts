import express from 'express';
import cors from 'cors';
import patientRouter from './src/controller/patientsRouter';
import diagnosesRouter from './src/controller/diagnosesRouter';

const app = express();

app.use(express.json());
app.use(cors());
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('server ping');
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});