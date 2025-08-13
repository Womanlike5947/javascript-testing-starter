import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // this will automatically clear all mocks inbetween tests
    clearMocks: true,
  },
});
