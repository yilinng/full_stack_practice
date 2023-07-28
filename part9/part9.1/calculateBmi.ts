interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseBMIArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (a: number, b: number) => {
  const squareOfheight = Math.pow((a / 100), 2); 
  const bmi = b / squareOfheight; 
  console.log('bmi', bmi);
  if (bmi < 16) {
    console.log ('Underweight (Severe thinness) ');
  }

  if (bmi > 16 && bmi < 16.9) {
    console.log('Underweight (Moderate thinness)');
  }

  
  if (bmi > 17 && bmi < 18.4) {
    console.log('Underweight (Mild thinness)');
  }

  if (bmi > 18.5 && bmi < 24.9) {
    console.log('Normal (healthy weight)');
  }

  if (bmi > 25 && bmi < 29.9) {
    console.log('Overweight (Pre-obese)');
  }

  if (bmi > 30 && bmi < 34.9) {
    console.log('Obese (Class I)');
  }

  if (bmi > 35 && bmi < 39.9) {
    console.log('Obese (Class II)');
  }

  if (bmi > 40 ) {
    console.log('Obese (Class III)');
  }

};

try {
  const { value1, value2 } = parseBMIArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}