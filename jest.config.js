// jest.config.js
module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['**/**/*.spec.ts'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@functions/(.*)$': '<rootDir>/src/functions/$1',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infra/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
  },
};
