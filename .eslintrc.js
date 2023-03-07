module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['standard', 'standard-jsx'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'multiline-ternary': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
