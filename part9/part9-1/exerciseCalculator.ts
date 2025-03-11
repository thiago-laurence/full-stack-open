import { ExerciseValues, Rating } from './types';

export const calculateExercises = (weekHours: number[], target: number): ExerciseValues => {
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

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));