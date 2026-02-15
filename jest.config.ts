import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'jsdom',          // simulate browser
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',    // transform TS/TSX files
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // mock CSS imports
  },
}

export default config
