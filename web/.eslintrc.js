module.exports = {
  extends: [
    '../.eslintrc.js',
    'react-app',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['react'],
  parser: '@babel/eslint-parser',
  rules: {
    'import/no-anonymous-default-export': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/no-string-refs': 'warn',
    'react/jsx-key': 'warn',
    'react/react-in-jsx-scope': 'off'
  },
  env: {
    browser: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  }
};
