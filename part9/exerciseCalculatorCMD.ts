import { parseArguments } from './utils';

interface ExerciseValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    target: number,
    average: number
}

interface Rating {
    rating: 1 | 2 | 3,
    description: string
}

interface ExerciseArgs {
    target: number,
    weekHours: number[]
}

const validateExercise = (args: string[]): ExerciseArgs => {
    if (isNaN(Number(args[2])) || args.slice(3).some(h => isNaN(Number(h)))) throw new Error('Provided values were not numbers!');

    return { target: Number(args[2]), weekHours: args.slice(3).map(h => Number(h)) };
}

const calculateExercises = (target: number, weekHours: number[]): ExerciseValues => {
    const periodLength = weekHours.length;
    const trainingDays = weekHours.filter(h => h > 0).length;
    const average = weekHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating: Rating = (average < target / 2) ? { rating: 1, description: 'you are nothing' } 
        : (average < target) ? { rating: 2, description: 'not too bad but could be better' } 
            : { rating: 3, description: 'gymbro!' };

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        target,
        average
    };
};

try{
    const { target, weekHours } = parseArguments(process.argv, validateExercise, 4);
    const result: ExerciseValues = calculateExercises(target, weekHours);
    console.log(result);
}catch(error: unknown){
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}