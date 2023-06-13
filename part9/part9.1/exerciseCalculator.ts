interface ArrayValues {
  valuesArr: Array<string>;
  target: string;
}

const parseExercisesArguments = (args: string[]): ArrayValues => {
  console.log(args.slice(2))

  let argsSlice = args.slice(3)
  let argsTarget = args.slice(2, 3)
  
  if (argsSlice.length < 2) throw new Error('Not enough arguments');
  //if (argsSlice.length > 8) throw new Error('Too many arguments');

  return { valuesArr: argsSlice, target: argsTarget[0] }
  /*
  if (!isNaN(Number(args))) {
    return {
      valuesArr: Array(args[2])
    }
    
  } else {
    throw new Error('Provided values were not numbers!');
  }
  */
}

interface ObjValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

export const calculatExercise = (arr: string[], target: string): ObjValues => {
  console.log('arr calculatExercise', arr)
  const toNbArr = arr.map(item => Number(item))
  console.log('toNbArr', toNbArr)

  let trainingDays = toNbArr.filter(item => item !== 0)
  let averageArr = toNbArr.reduce((acc, cur) => acc + cur, 0)

  let ratingDescription =  Number(target) - (averageArr / toNbArr.length) < 1 ? 'not too bad but could be better' : 'bad'

  console.log('averageArr', averageArr)
    
  let result = {
    periodLength: toNbArr.length,
    trainingDays: trainingDays.length,
    success: Number(target) < toNbArr.length / trainingDays.length,
    rating: Number(target),
    ratingDescription,
    target: Number(target),
    average: averageArr / toNbArr.length
  }

  console.log('result', result)
  
  return result
}

try {
  const { valuesArr, target } = parseExercisesArguments(process.argv);
  calculatExercise(valuesArr, target);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}