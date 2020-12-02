module.exports = {
  extends: 'imbudhiraja/react-native',
  parser: '@babel/eslint-parser',
  rules: {
    camelcase: ['error', { ignoreDestructuring: true }],
    'class-methods-use-this': 'off',
    'filenames/match-exported': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never', children: 'ignore',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
    'max-len': ['error', 200],
    'max-lines': ['error', 1000],
  },
};
