import { vi, test, expect, describe } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  login,
  renderPage,
  signUp,
  submitOrder,
  submitOrder,
} from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { getShippingQuote } from "../libs/shipping";
import { trackPageView } from "../libs/analytics";
import { charge } from "../libs/payment";
import { sendEmail } from "../libs/email";
import security from "../libs/security";

// #region Mock Functions
// ⬇️This shall always get executed first (even before the imports - called: Hoisting)
vi.mock("../libs/currency");
vi.mock("../libs/shipping");
vi.mock("../libs/analytics");
vi.mock("../libs/payment");
// vi.mock("../libs/security");
vi.mock("../libs/email", async (importOriginal) => {
  // Using the importOriginal we can import the original isValidEmail function (doesn't have to be named 'importOriginal')
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(), // mock this function only
  };
});
// #endregion

// #region test suite
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
// #endregion

// #region getPriceInCurrency
describe("getPriceInCurrency", () => {
  test("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5); // this will return 1.5, no matter what the argument is

    const price = getPriceInCurrency(10, "AUD"); // Australian currency

    expect(price).toBe(15);
  });
});
// #endregion

// #region getShippingInfo
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
// #endregion

// #region renderPage
describe("renderPage", () => {
  test("should return correct content", async () => {
    const page = await renderPage();

    expect(page).toMatch(/content/i);
  });

  test("should call analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});
// #endregion

// #region submitOrder
describe("submitOrder", () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: 12345 };

  test("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });
    await submitOrder(order, creditCard);

    expect(charge).toBeCalledWith(creditCard, order.totalAmount);
  });

  test("should return success when payment is successful", async () => {
    vi.mocked(charge).mockReturnValue({
      status: "success",
    });

    const result = await submitOrder(order, creditCard);

    expect(result.success).toBeTruthy();
    // toEqual instead of toBe as we are using an object
    expect(result).toEqual({ success: true });
  });

  test("should return failed when payment is unsuccessful", async () => {
    vi.mocked(charge).mockReturnValue({
      status: "failed",
    });

    const result = await submitOrder(order, creditCard);

    // toEqual instead of toBe as we are using an object
    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});
// #endregion

// #region signUp
describe("signUp", () => {
  const validEmail = "name@domain.com";

  test("should return false if email is not valid", async () => {
    const result = await signUp("a");

    expect(result).toBe(false);
  });

  test("should return true if email is  valid", async () => {
    const result = await signUp(validEmail);

    expect(result).toBe(true);
  });

  test("should send the welcome email if email is valid", async () => {
    const result = await signUp(validEmail);

    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(validEmail);
    expect(args[1]).toMatch(/welcome/i);
  });
});
// #endregion

// #region login
describe("login", () => {
  const validEmail = "name@domain.com";

  test("should email the one-time login code", async () => {
    const spy = vi.spyOn(security, "generateCode");

    await login(validEmail);

    const securityCode = spy.mock.results[0].value;
    expect(sendEmail).toHaveBeenCalledWith(validEmail, securityCode.toString());
  });
});
// #endregion
