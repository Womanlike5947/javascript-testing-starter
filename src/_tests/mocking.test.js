import { vi, test, expect, describe } from "vitest";

describe("test suite", () => {
  test("test case", () => {
    const greet = vi.fn();

    // mockReturnValue
    // mockResolvedValue - to get a promise
    // mockImplementation - to add logic or a mock function
    greet.mockImplementation((name) => "Hello " + name);

    greet("Holly");
    expect(greet).toHaveBeenCalledOnce();
    expect(greet).toHaveBeenCalled();
    expect(greet).toHaveBeenCalledWith("Holly");
  });
});
