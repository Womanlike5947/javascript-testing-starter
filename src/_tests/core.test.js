import { describe, expect, test } from "vitest";

describe("test suite", () => {
  describe("Using Matchers", () => {
    test("should render 'Holly' as a string", () => {
      const result = "Holly";
      // toBe checks for strict equality (E.g. Primitives (strings, Numbers, Booleans, etc.))
      expect(result).toBe("Holly");
    });

    test("should render 'Holly' in an object", () => {
      const result = { name: "Holly" };
      // toEqual checks for deep equality (E.g. Objects, Arrays, etc.)
      expect(result).toEqual({ name: "Holly" });
    });
  });

  describe("Writing Good Assertions", () => {
    test("should return the correct error message", () => {
      const result = "The requested file was not found.";
      // Loose assertion (too general)
      expect(result).toBeDefined();
      // Tight assertion (too specific)
      expect(result).toBe("The requested file was not found.");
      // Better assertion (just right)
      expect(result).toMatch("not found"); // string
      expect(result).toMatch(/not found/); // regular expression (regex)
      expect(result).toMatch(/not found/i); // regular expression (regex) - case-insensitive
    });

    test("should return an array of numbers", () => {
      const result = [1, 2, 3];
      // Loose assertion (too general)
      expect(result).toBeDefined();
      // Tight assertion (too specific)
      expect(result).toEqual([1, 2, 3]);
      // Better assertion (just right)
      expect(result).toContain(2);
      expect(result).toHaveLength(3);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
    });

    test("should return an object", () => {
      const result = { name: "Holly" };
      // Loose assertion (too general)
      // Tight assertion (too specific)
      expect(result).toEqual({ name: "Holly" });
      // Better assertion (just right)
      expect(result).toMatchObject({ name: "Holly" });
      expect(result).toHaveProperty("name");
      expect(typeof result.name).toBe("string");
    });
  });
});
