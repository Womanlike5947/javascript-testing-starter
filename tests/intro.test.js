// test and it are aliases for the same function
import { describe, test, it, expect } from "vitest";
import { calculateAverage, fizzBuzz, max } from "../src/intro";

describe("max", () => {
  test("should return the first argument if it is greater", () => {
    // // Arrange: Turn on the TV
    // const a = 2;
    // const b = 1;

    // // Act - Press the power button
    // const result = max(a, b);

    // Assert - Check the TV is off
    // expect(result).toBe(2);

    // Combined all of the above
    expect(max(2, 1)).toBe(2);
  });

  test("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  test("should return the first argument if arguments are equal", () => {
    expect(max(2, 2)).toBe(2);
  });
});

describe("fizzBuzz", () => {
  test('should return "fizzBuzz" when number is divisible by 3 and 5', () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  test('should return "Fizz" when number is divisible by 3', () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  test('should return "Fizz" when number is divisible by 5', () => {
    expect(fizzBuzz(10)).toBe("Buzz");
  });
});

// Test-Driven Development Test Example
describe("calculateAverage", () => {
  test("should return NaN if given an empty array", () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  test("should calculate the average of an array with a single element", () => {
    expect(calculateAverage([1])).toBe(1);
  });

  test("should calculate the average of an array with two elements", () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  test("should calculate the average of an array with three elements", () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });

  test("should calculate the average of an array with multiple elements", () => {
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
  });
});
