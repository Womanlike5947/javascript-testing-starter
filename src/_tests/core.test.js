import { describe, expect, test } from "vitest";

describe("test suite", () => {
  test("test case - toBe", () => {
    const result = "Holly";
    // toBe checks for strict equality (E.g. Primitives (strings, Numbers, Booleans, etc.))
    expect(result).toBe("Holly");
  });

  test("test case - toEqual", () => {
    const result = { name: "Holly" };
    // toEqual checks for deep equality (E.g. Objects, Arrays, etc.)
    expect(result).toEqual({ name: "Holly" });
  });
});
