// Problem Statement:
// Write a generic function sum that accepts an array of numbers and returns the sum of all the numbers.


function sum<T extends number>(numbers: T[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}

// console.log(sum([1, 2, 3, 4]));
