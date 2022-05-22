module.exports = {
  extends: ['prettier', 'plugin:json/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-var': 'error',
    'no-unused-vars': 'error',
    'no-delete-var': 'error',
    'no-console': 'warn',
    'no-unsafe-optional-chaining': 'off',
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ]
  },
  env: {
    es6: true
  }
};
