import { vi, test, expect, describe } from "vitest";
import { getPriceInCurrency } from "../mocking";
import { getExchangeRate } from "../libs/currency";

// ⬇️This shall always get executed first (even before the imports - called: Hoisting)
vi.mock("../libs/currency");

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

  test("should send the given text message", () => {
    const sendText = vi.fn();

    sendText.mockReturnValue("ok");
    const result = sendText("message");

    expect(sendText).toHaveBeenCalledWith("message");
    expect(result).toBe("ok");
  });
});

describe("getPriceInCurrency", () => {
  test("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5); // this will return 1.5, no matter what the argument is

    const price = getPriceInCurrency(10, "AUD"); // Australian currency

    expect(price).toBe(15);
  });
});
