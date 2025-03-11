export interface IMCValues {
    height: number,
    weight: number,
    bmi: string
}

export interface ExerciseValues {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: Rating,
    target: number,
    average: number
}

export interface Rating {
    rating: 1 | 2 | 3,
    description: string
}

export interface ExerciseArgs {
    target: number,
    weekHours: number[]
}