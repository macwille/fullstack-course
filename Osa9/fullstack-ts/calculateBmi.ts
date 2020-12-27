interface Values {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enought arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Values were not numbers');
  }
};

const calculateBmi = (height: number, weight: number,): string => {
  const bmi = (weight / (height * height)) * 10000;
  if (bmi < 18.5) {
    return `Underweight - BMI(${Math.round(bmi)}).`;
  }
  if (bmi > 25) {
    return `Overweight aka. Fatboi - BMI(${Math.round(bmi)}).`;
  }
  return `Normal - BMI(${Math.round(bmi)}).`;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error && error.message) {
    console.log(`Error ${error.message}`);
  } else {
    throw error;
  }
}

export { calculateBmi };