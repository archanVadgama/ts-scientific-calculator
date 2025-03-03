// Interface for error messages
interface ErrorMessage {
  message: string;
}

// Custom error messages
export const Error: ErrorMessage[] = [
  { message: "Internal Server Error" },
  { message: "NaN" },
  { message: "Error" },
  { message: "Invalid operator" },
  { message: "Infinity" },
  { message: "undefined" },
  { message: "Cannot divide by zero" },
  { message: "Missing operand" },
  { message: "Too many operands" },
];

// Function to check for error and reset the display if needed
export function isError(display: HTMLInputElement | null): void {
  if (display && Error.some((err) => err.message === display.value)) {
    display.value = "";
  }
}
