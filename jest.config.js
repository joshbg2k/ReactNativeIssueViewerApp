module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-vector-icons' + // 👈 add this so it gets transformed by Babel
      ')/)',
  ],
  moduleNameMapper: {
    // mock .ttf files
    '\\.ttf$': '<rootDir>/__mocks__/fileMock.js',
  },
};
