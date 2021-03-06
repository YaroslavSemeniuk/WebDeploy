module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/babel',
    'prettier/react',
    'prettier/standard',
    'plugin:redux-saga/recommended',
  ],
  plugins: ['react-hooks', 'babel', 'prettier', 'redux-saga'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    benchmark: true,
    expect: true,
    React: true,
    suite: true,
    __DEV__: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        bracketSpacing: true,
        jsxBracketSameLine: false,
        jsxSingleQuote: false,
        printWidth: 100,
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
        useTabs: false,
        endOfLine: 'lf',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'default-case': 'off',
    'func-names': 'off',
    'function-paren-newline': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-shadow': 'off',
    'no-unused-expressions': 'error',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'warn',
    'react/jsx-filename-extension': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/button-has-type': 'off',
    'react/prop-types': [
      'warn',
      {
        ignore: ['children', 'className', 'style', 'disabled'],
      },
    ],
    'react/no-unused-prop-types': 'warn',
    'react/prefer-stateless-function': 'error',
    'react/require-default-props': 'off',
    'react/forbid-prop-types': 'off',
    'react/sort-comp': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': [
      'warn',
      {
        aspects: ['invalidHref'],
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'import/no-extraneous-dependencies': 'warn',
    'no-console': ['warn', { allow: ['error'] }],
    'redux-saga/no-unhandled-errors': 'warn',
    'import/no-cycle': 'warn',
    'no-bitwise': 'warn',
    'jsx-a11y/label-has-for': [
      'error',
      {
        components: ['label'],
        required: {
          every: ['nesting', 'id'],
        },
        allowChildren: true,
      },
    ],
    'react/jsx-props-no-spreading': ['warn', { html: 'ignore', exceptions: ['Component'] }],
  },
};
