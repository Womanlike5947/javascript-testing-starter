import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,,mjs,cjs}"],
    plugins: {
      // Register the plugin under a name
      "@typescript-eslint": tseslint.plugin,
    },
    extends: [
      js.configs.recommended, // JS recommended
      ...tseslint.configs.recommended, // TS recommended rules
    ],
    languageOptions: { globals: globals.browser },
  },
]);
