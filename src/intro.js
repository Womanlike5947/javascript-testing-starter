// Lesson: Writing your first tests
export function max(a, b) {
  return a > b ? a : b;
}

// Exercise
export function fizzBuzz(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FizzBuzz";
  if (n % 3 === 0) return "Fizz";
  if (n % 5 === 0) return "Buzz";
  return n.toString();
}

// Test-Driven Development Test Example
export function calculateAverage(numbers) {
  if (numbers.length === 0) return NaN;

  const sum = numbers.reduce((sum, current) => sum + current, 0);
  return sum / numbers.length;

  // if(numbers.length === 1) return
  // return numbers[0];
}

// Test-Driven Development Example
export function factorial(n) {
  if (n < 0) return undefined;
  if (n <= 1) return 1;
  let result = n;
  while (n > 1) {
    n--;
    result = result * n;
  }
  return result;
}
