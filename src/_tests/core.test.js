import { describe, expect, test } from "vitest";
import {
  calculateDiscount,
  canDrive,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../core";
// #region getCoupons
describe("getCoupons", () => {
  test("should return an array of coupons", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBeTruthy();
    expect(coupons.length).toBeGreaterThan(0); // My implementation
    expect(coupons).toHaveLength(2); // Could you this, but might be classed as a 'tight' assertion
  });

  test("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code.length).toBeTruthy();
    });
  });

  test("should return an array with valid discounts", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeTruthy();
    });
  });

  test("should render a discount value between 0 and 1", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon.discount).not.toBeLessThan(0);
      expect(coupon.discount).not.toBeGreaterThan(1);
    });
  });
});
// #endregion

// #region calculateDiscount
describe("calculateDiscount", () => {
  test("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  test("should handle non-numeric price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });
  test;

  test("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  test("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "INVALID")).toBe(10);
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });
});
// #endregion

// #region validateUserInput
describe("validateUserInput", () => {
  test("should render success message when using valid username and age", () => {
    const result = validateUserInput("jane doe", 25);
    expect(result).toMatch(/success/i);
  });

  test("should return an error message for invalid username", () => {
    const result = validateUserInput(5, 25);
    expect(result).toMatch(/invalid/i);
  });

  test("should return an error message for usernames under 3 characters", () => {
    const result = validateUserInput("jo", 25);
    expect(result).toMatch(/invalid/i);
  });
  test("should return an error message for usernames longer than 225 characters", () => {
    const result = validateUserInput("A".repeat(256), 25);
    expect(result).toMatch(/invalid/i);
  });

  test("should return an error message for invalid age", () => {
    const result = validateUserInput("jane doe", "25");
    expect(result).toMatch(/invalid/i);
  });

  test("should return an error message for ages under 18 ", () => {
    const result = validateUserInput("jane doe", 16);
    expect(result).toMatch(/invalid/i);
  });

  test("should return an error message for ages above 100 ", () => {
    const result = validateUserInput("jane doe", 105);
    expect(result).toMatch(/invalid/i);
  });

  test("should return errors messages if both username and age is invalid", () => {
    const result = validateUserInput("jo", "25");
    expect(result).toMatch(/invalid username/i);
    expect(result).toMatch(/invalid age/i);
  });

  test("should return all error messages in a concatenation", () => {
    const result = validateUserInput("jo", "25");
    expect(result).toMatch(/invalid/i, /invalid/i);
  });
});
// #endregion

// #region isPriceInRange
describe("isPriceInRange", () => {
  test.each([
    {
      scenario: "price < min",
      price: -10,
      result: false,
    },
    { scenario: "price = max", price: 100, result: true },
    { scenario: "price between min and max", price: 50, result: true },
    { scenario: "price = min", price: 0, result: true },
    {
      scenario: "price > max",
      price: 200,
      result: false,
    },
  ])("should return $result when $scenario", ({ price, result }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(result);
  });
});
// #endregion

// #region isValidUsername
describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;
  test("should return true if username is within the length constraint", () => {
    expect(isValidUsername("a".repeat(minLength + 1))).toBe(true);
  });

  test("should return false when username is too short", () => {
    expect(isValidUsername("a".repeat(minLength - 1))).toBe(false);
  });

  test("should return false when username is too long", () => {
    expect(isValidUsername("a".repeat(maxLength + 1))).toBe(false);
  });

  test("should return false when entering invalid types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});
// #endregion

// #region canDrive
describe("canDrive", () => {
  test("should return error for invalid country code", () => {
    expect(canDrive(20, "FR")).toMatch(/invalid/i);
  });

  test.each([
    { age: 15, country: "US", result: false },
    { age: 16, country: "US", result: true },
    { age: 17, country: "US", result: true },
    { age: 16, country: "UK", result: false },
    { age: 17, country: "UK", result: true },
    { age: 18, country: "UK", result: true },
  ])("should return $result for $age, $country", ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});
// #endregion
