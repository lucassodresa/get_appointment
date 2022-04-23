module.exports = {
  extends: [
    'prettier',
    'plugin:json/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    ecmaVersion: 9
  },
  plugins: ['react', 'prettier'],
  parser: 'babel-eslint',
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
    ],
    'react/display-name': 'off',
    'react/prop-types': 'warn',
    'react/no-string-refs': 'warn',
    'react/jsx-key': 'warn'
  },
  env: {
    es6: true,
    browser: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};
