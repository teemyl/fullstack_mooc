import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { exerciseCalculator, ExerciseResult } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const bmi: string = bmiCalculator(height, weight);
    res.json({ weight, height, bmi });
  } catch (e) {
    res.json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const { dailyHours, target } = req.body;

    if(dailyHours.length === 0 || !target) {
      throw new Error('parameters missing');
    }

    if(isNaN(Number(target)) || dailyHours.some((e: number) => isNaN(e))) {
      throw new Error('malformatted data');
    }

    const result: ExerciseResult = exerciseCalculator(dailyHours, target);

    res.json(result);
  } catch (e) {
    res.json({ error: (e as Error).message });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});