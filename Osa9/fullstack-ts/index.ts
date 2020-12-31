import express from 'express';
import { calculateBmi } from './calculateBmi';
import { calculateExcercises } from './exerciseCalculator'

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const getDaily = (object: { daily_exercises: Array<number> }) => {
    if (!(req.body instanceof Object) || !('daily_exercises' in req.body)) {
      throw new Error('Parameters missing');
    } else {
      return object.daily_exercises;
    }
  };
  const getTarget = (object: { target: number }): number => {
    if (!(req.body instanceof Object) || !('target' in req.body)) {
      throw new Error('Parameters missing');
    } else {
      return object.target;
    }
  };
  try {
    const daily = getDaily(req.body);
    const target = getTarget(req.body);
    if (!Array.isArray(daily)) {
      return res.status(400).json({ error: 'Malformated parameters' });
    }
    if (isNaN(Number(target)) || daily.some(isNaN)) {
      return res.status(400).json({ error: 'Malformated parameters' });
    }
    if (daily.length === 0) {
      return res.status(400).json({ error: 'Malformated parameters' });
    }
    return res.send(calculateExcercises(target, daily));
  } catch (error) {
    return res.status(400).send((error as Error).message);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});