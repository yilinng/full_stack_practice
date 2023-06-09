/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { calculateBmi1 } = require('./utils');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
const { calculatExercise } = require('./exerciseCalculator');

app.use(express.json());

app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: { query: { height: any; weight: any; }; }, res: { json: (arg0: { error?: string; height?: any; weight?: any; bmi?: string; }) => void; }) => {
  console.log('req.query', req.query);

  const { height, weight } = req.query;
  if(!height || !weight) return res.json({error: "malformatted parameters"});
 
  const final = {
    height,
    weight,
    bmi: calculateBmi1(height, weight)
  };
    res.json(final);
});

app.post('/exercises', (req: any, res: { json: (arg0: {error?: string}) => void; }) => {
  console.log('req.body', req.body);
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) return res.json({ error: "parameters missing" });
   
  res.json(calculatExercise(daily_exercises, target));
  //res.json('Hello Full Stack!');
});



const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});