import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest( {
  dir: "./",
} );
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^#modules/(.*)$": "<rootDir>/src/modules/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/(.*).e2e.spec.ts",
  ],
};

export default createJestConfig(config);
