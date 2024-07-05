/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: ['<rootDir>/test'],
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  workerThreads: true,
  setupFiles: [],
  setupFilesAfterEnv: [],
  transform: {},
};