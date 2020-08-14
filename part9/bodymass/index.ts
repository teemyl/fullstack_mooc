import express from 'express';
import { bmiCalculator } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const weight: number = Number(req.query.weight);
    const height: number = Number(req.query.height);
    const bmi: string = bmiCalculator(height, weight);
    res.send({ weight, height, bmi });
  } catch (e) {
    res.send({ error: 'malformatted parameters' });
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});