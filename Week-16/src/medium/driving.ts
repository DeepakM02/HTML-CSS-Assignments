// Problem Statement:
// Write a function isEligibleForDriving that takes a user object as input and returns true if the user is eligible for a driving license (age >= 16), and false otherwise. Ensure the function has proper type annotations.

// Example Input:
const userObj = { name: "Alice", age: 20 }
// Example Output:
// true


interface UserType {
    name: string;
    age: number;
}

export function isEligibleForDriving(user:UserType):boolean {
    return user.age >= 16
}

console.log(isEligibleForDriving(userObj))
