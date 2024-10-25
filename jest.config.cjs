const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testMatch: ['**/tests/**/*.(test|spec).[jt]s'],
  collectCoverage: true,
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  //setupFilesAfterEnv: ['./jest.setup.js'], // Assuming you have a CommonJS setup file
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
