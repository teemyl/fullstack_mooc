/* interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>) : BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}; */

const calculateBmi = (height: number, weight: number) : string => {
  const bmi: number = weight / Math.pow(height * 0.01, 2);
  if (bmi < 15) return 'Very severely underweight';
  else if (bmi < 16) return 'Severely underweight';
  else if (bmi < 18.5) return 'Underweight';
  else if (bmi < 25) return 'Normal (healthy weight)';
  else if (bmi < 30) return 'Overweight';
  else if (bmi < 35) return 'Obese Class I (Moderately obese)';
  else if (bmi < 40) return 'Obese Class II (Severely obese)';
  else if (bmi >= 40) return 'Obese Class III (Very severely obese)';
  else throw new Error('Couldn\'t calculate bmi');
};

/* try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log('Something went wrong, message:', (e as Error).message);
} */

export { calculateBmi as bmiCalculator };