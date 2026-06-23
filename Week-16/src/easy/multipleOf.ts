// Write a function that checks if a number is a multiple of another number. 
// The function should return true if the first number is divisible by the second number, otherwise false.
// Ensure the function has proper type annotations.
// Example Input: num = 15, divisor = 5
// Example Output: true

export function isMultipleOf(firstNum:number, secondNum:number):boolean {
    return firstNum % secondNum === 0
}

// console.log(isMultipleOf(15, 2));
