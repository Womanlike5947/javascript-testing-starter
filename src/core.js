// #region getCoupons
// Exercise: Writing good assertions
export function getCoupons() {
  return [
    { code: "SAVE20NOW", discount: 0.2 },
    { code: "DISCOUNT50OFF", discount: 0.5 },
  ];
}
// #endregion

// #region calculateDiscount
// Lesson: Positive and negative testing
export function calculateDiscount(price, discountCode) {
  if (typeof price !== "number" || price <= 0) {
    return "Invalid price";
  }

  if (typeof discountCode !== "string") {
    return "Invalid discount code";
  }

  let discount = 0;
  if (discountCode === "SAVE10") {
    discount = 0.1;
  } else if (discountCode === "SAVE20") {
    discount = 0.2;
  }

  return price - price * discount;
}
// #endregion

// #region validateUserInput
// Exercise: Positive and negative testing
export function validateUserInput(username, age) {
  const errors = [];

  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 255
  ) {
    errors.push("Invalid username");
  }

  if (typeof age !== "number" || age < 18 || age > 100) {
    errors.push("Invalid age");
  }

  return errors.length === 0 ? "Validation successful" : errors.join(", ");
}
// #endregion

// #region isPriceInRange
// Lesson: Boundary testing
export function isPriceInRange(price, min, max) {
  return price >= min && price <= max;
}
// #endregion

// #region isValidUsername
// Exercise: Boundary testing
export function isValidUsername(username) {
  const minLength = 5;
  const maxLength = 15;

  if (!username) return false;

  return username.length >= minLength && username.length <= maxLength;
}
// #endregion

// #region canDrive
// Exercise: Boundary testing
export function canDrive(age, countryCode) {
  const legalDrivingAge = {
    US: 16,
    UK: 17,
  };

  if (!legalDrivingAge[countryCode]) {
    return "Invalid country code";
  }

  return age >= legalDrivingAge[countryCode];
}
// #endregion

// #region fetchData
// Lesson: Testing asynchronous code
export function fetchData() {
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject({ reason: "Operation failed" });
}
// #endregion

// #region Stack
// Lesson: Setup and teardown
export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}
// #endregion

// #region createProduct
// Additional exercises
export function createProduct(product) {
  if (!product.name)
    return {
      success: false,
      error: { code: "invalid_name", message: "Name is missing" },
    };

  if (product.price <= 0)
    return {
      success: false,
      error: { code: "invalid_price", message: "Price is missing" },
    };

  return { success: true, message: "Product was successfully published" };
}
// #endregion

//  #region isStrongPassword
export function isStrongPassword(password) {
  // Check the length of the password (minimum 8 characters)
  if (password.length < 8) {
    return false;
  }

  // Check if the password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return false;
  }

  // Check if the password contains at least one digit (number)
  if (!/\d/.test(password)) {
    return false;
  }

  // If all criteria are met, consider the password strong
  return true;
}
// #endregion
