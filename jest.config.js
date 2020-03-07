module.exports = {
  preset: '@vue/cli-plugin-unit-jest',

  globals: {
    PATH: 'http://localhost:8080',
  },

  transform: {
    '^.+\\.svg$': '<rootDir>/private/jest/svgMock.js',
  },

  moduleNameMapper: {
    '^components(.*)$': '<rootDir>/src/components$1',
  },

  testMatch: [
    '**/src/**/*.test.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    '**/src/components/**/*.spec.[jt]s?(x)',
  ],
};
