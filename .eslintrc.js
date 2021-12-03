module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/no-children-prop': 'off',
    'no-nested-ternary': 'off',
    'no-extend-native': 'off',
    'react/no-this-in-sfc': 'off',
    'array-callback-return': 'off',

  },
};
