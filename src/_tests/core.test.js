import { describe, expect, test } from "vitest";
import { calculateDiscount, getCoupons, validateUserInput } from "../core";

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
