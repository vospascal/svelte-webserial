module.exports = {
  verbose: true,
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
  testURL: "http://localhost:3000",
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 10,
      functions: 10,
      lines: 10,
    },
  },
  coverageDirectory: "<rootDir>/build/coverage",
  moduleDirectories: ["node_modules", "src"],
  setupFilesAfterEnv: ["<rootDir>/jestsetup.js"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/src/$1", // add alias to root with ~
  },
};
