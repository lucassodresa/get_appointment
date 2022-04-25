module.exports = {
  extends: ['prettier', 'plugin:json/recommended'],
  parserOptions: {
    ecmaVersion: 9
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-var': 'error',
    'no-unused-vars': 'error',
    'no-delete-var': 'error',
    'no-console': 'warn',
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
