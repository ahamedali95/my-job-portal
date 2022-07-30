module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  plugins: [
    "react",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:react-hooks/recommended"
  ],
  parserOptions: {
    ecmaVersion: 11,
    ecmaFeatures: {
      jsx: true
    },
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  rules: {
    indent: [ 'error', 4 ]
  }
};