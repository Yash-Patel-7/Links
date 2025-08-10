import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

const flatStrictTypeChecked = tseslint.configs[
  'flat/strict-type-checked'
] as Array<Record<string, unknown>>;

export default [
  {
    ignores: ['node_modules/', 'dist/', 'bin/'],
  },
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: ['tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
  },
  {
    ...flatStrictTypeChecked[1],
    files: ['**/*.ts', '**/*.tsx'],
  },
  {
    ...flatStrictTypeChecked[2],
    files: ['**/*.ts', '**/*.tsx'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  eslintPluginPrettierRecommended,
];
