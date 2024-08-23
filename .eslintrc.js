module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 15,
  },
  plugins: ['@typescript-eslint', 'unused-imports'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  rules: {
    'no-restricted-syntax': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/ban-tslint-comment': 'off', // caused by no way to remove this from generated code
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
        // allowMultiplePropertiesPerLine is deprecated property, but is used by Webstorm
        allowMultiplePropertiesPerLine: true,
      },
    ],
    'no-multiple-empty-lines': 'error',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true, boolean: true } }],
    'unused-imports/no-unused-imports': 'error',
    'import/no-unresolved': 'error',
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': ['error', { allow: ['warn', 'error', 'info', 'log'] }],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
      },
    ],
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: {
          '=': 'ignore',
          ':': 'before',
          '||': 'before',
          '&&': 'before',
          '??': 'before',
        },
      },
    ],
  },
  ignorePatterns: ['.eslintrc.js'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
