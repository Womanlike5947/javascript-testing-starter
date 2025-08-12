import { vi, test, expect, describe } from "vitest";
import { getPriceInCurrency, getShippingInfo } from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { getShippingQuote } from "../libs/shipping";

// ⬇️This shall always get executed first (even before the imports - called: Hoisting)
vi.mock("../libs/currency");
vi.mock("../libs/shipping");

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

describe("getShippingInfo", () => {
  test("should return shipping unavailable if quote cannot be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValueOnce(null);

    const shippingInfo = getShippingInfo("England");

    expect(shippingInfo).toMatch(/unavailable/i);
  });

  test("should return shipping info if quote can be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 50, estimatedDays: 2 });

    const shippingInfo = getShippingInfo("England");

    expect(shippingInfo).toMatch("$50");
    expect(shippingInfo).toMatch(/2 Days/i);
    expect(shippingInfo).toMatch(/shipping cost: \$50 \(2 Days\)/i); // '\' allows you to use symbols
  });
});
