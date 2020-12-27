import express from 'express';
import { calculateBmi } from './calculateBmi';
// import { calculateExcercises } from './exerciseCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  const helloString = 'Hello Full Stack!';
  res.send(helloString);
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "Malformatted Parameters" });
  }
  const bmi: string = calculateBmi(height, weight);
  const result = {
    height: height,
    weight: weight,
    bmi: bmi
  };
  res.send(result);
});
/*
app.get('/exercises', (req, res) => {
  const body = req.body;
  const list = body.daily_exercises;
  const target = body.target;
  const result = calculateExcercises(list, target);
  res.send(result);
});
*/
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});