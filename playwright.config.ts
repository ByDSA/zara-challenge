// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "@playwright/test";

export default defineConfig( {
  testMatch: "**/*.e2e.spec.ts",
  timeout: 5 * 1000,
  use: {
    baseURL: "http://localhost:3000",
  },
  workers: 4,
} );
