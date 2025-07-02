module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-navigation|react-native-markdown-display|react-native-vector-icons|@apollo/client|graphql)/)"
  ],
  moduleNameMapper: {
    // mock .ttf files
    '\\.(png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    '\\.(ttf)$': '<rootDir>/__mocks__/react-native-vector-icons/fileMock.js',
    '^react-native-vector-icons/(.*)$': '<rootDir>/__mocks__/react-native-vector-icons.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};