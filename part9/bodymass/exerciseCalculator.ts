interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  value: number;
  description: string;
}

interface ExerciseData {
  dailyHours: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>) : ExerciseData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  
  let target: number;
  let dailyHours: Array<number>;

  if (!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error('Provided target value is not a number!');
  }
  
  if (args.slice(3, args.length).every(e => !isNaN(Number(e)))) {
    dailyHours = args.slice(3, args.length).map(e => Number(e));
  } else {
    throw new Error('Provided daily hours were not numbers!');
  }
  
  return { dailyHours, target };
};

const getRating = (average: number, target: number) : Rating => {
  let value: number;
  let description: string;

  if (average < target) {
    value = 1;
    description = 'Not too bad but could be better';
  }
  else if (average > target * 1.25) {
    value = 3;
    description = 'Great job, consider increasing your target';
  }
  else {
    value = 2;
    description = 'You reached the target, good job';
  }

  return { value, description };
};

const calculateExercises = (dailyHours: Array<number>, target: number) : Result => {
  const period: number = dailyHours.length;
  const training: number = dailyHours.filter(h => h > 0).length;
  const average: number = dailyHours.reduce((a, b) => a + b, 0) / period;
  const rating: Rating = getRating(average, target);

  return {
    periodLength: period,
    trainingDays: training,
    success: average >= target,
    rating: rating.value,
    ratingDescription: rating.description,
    target: target,
    average: average
  };
};

try {
  const { dailyHours, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (e) {
  console.log('Something went wrong, message:', (e as Error).message);
}