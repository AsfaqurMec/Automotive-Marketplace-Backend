import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        fetch: 'readonly',
        Express: 'readonly',
        Response: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      // ...typescript.configs.recommended.rules,
      // '@typescript-eslint/no-unused-vars': 'error',
      // '@typescript-eslint/no-explicit-any': 'warn',
      // 'no-console': 'warn',
      // 'prefer-const': 'error',
      // 'no-undef': 'error',
    },
  },
  {
    ignores: ['dist/', 'node_modules/'],
  },
];
