export const IMC = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    if (bmi < 18.5) {
        return "Underweight";
    }
    
    if (bmi < 24.9) {
        return "Normal (healthy weight)";
    }

    return "Overweight";
}

console.log(IMC(180, 59)); // Underweight
console.log(IMC(180, 74)); // Normal (healthy weight)
console.log(IMC(180, 90)); // Overweight