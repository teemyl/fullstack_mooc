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
}

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
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));