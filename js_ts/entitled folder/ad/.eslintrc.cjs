module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', 2],
    'max-len': ['error', 120],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index'],module.exports = {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            project: 'tsconfig.json',
            tsconfigRootDir: __dirname,
            sourceType: 'module',
          },
          plugins: ['@typescript-eslint/eslint-plugin'],
          extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:prettier/recommended',
          ],
          root: true,
          env: {
            node: true,
            jest: true,
          },
          ignorePatterns: ['.eslintrc.js'],
          rules: {
            '@typescript-eslint/interface-name-prefix': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
          },
        };
        
        'newlines-between': 'always',
      },
    ],
  },
};
