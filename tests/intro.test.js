// test and it are aliases for the same function
import { describe, test, it, expect } from "vitest";
import { fizzBuzz, max } from "../src/intro";

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
