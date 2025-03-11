import { parseArguments } from './utils';

interface IMCValues{
    height: number;
    weight: number;
}

const validateIMC = (args: string[]): IMCValues => {
    if ( isNaN(Number(args[2])) || isNaN(Number(args[3])) ) throw new Error('Provided values were not numbers!');
    
    return { height: Number(args[2]), weight: Number(args[3]) };
}

const IMC = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return "Underweight";
    }
    
    if (bmi < 24.9) {
        return "Normal (healthy weight)";
    }

    return "Overweight";
}

try {
    const { height, weight } = parseArguments(process.argv, validateIMC, 4, 4);
    const result: string = IMC(height, weight);
    console.log(`For the height ${height} CM and weight ${weight} KG, the result is: ${result}`);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}