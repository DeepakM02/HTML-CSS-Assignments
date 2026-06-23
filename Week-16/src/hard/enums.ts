// Problem Statement
// Write a function that describes a selected seat position on a flight.

// Use an enum to represent the possible seat positions: Window, Middle, and Aisle.
// The function should take the seat position as input and return a corresponding message.
// If the input is invalid, the function should throw an error.
// Ensure proper type annotations and error handling.

// Example Input:
// SeatPosition.Window

// Example Output:
// "You have selected a window seat."


export const SeatPosition = {
  Window: "window",
  Middle: "middle",
  Aisle: "aisle",
} as const;

export type SeatPosition =
  typeof SeatPosition[keyof typeof SeatPosition];


export function getSeatDescription(input: SeatPosition):string {
    switch (input) {
        case SeatPosition.Window:
            return `You have selected a ${input} seat.`
        case SeatPosition.Middle:
            return `You have selected a ${input} seat.`
        case SeatPosition.Aisle:
            return `You have selected an ${input} seat.`
        default:
            throw new Error("Invalid seat position")
    }
    
}

// console.log(getSeatDescription(SeatPosition.Window))