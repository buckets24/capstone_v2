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
    'react/jsx-first-prop-new-line': [1, 'multiline'],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
