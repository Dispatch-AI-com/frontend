// @ts-check
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint, { parser } from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import importSort from 'eslint-plugin-simple-import-sort';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jestPlugin from 'eslint-plugin-jest';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser,
      parserOptions: {
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      'simple-import-sort': importSort,
      'jsx-a11y': jsxA11y,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // General style rules
      'prettier/prettier': 'error', // Enforce correct formatting
      'no-console': 'warn', // Warn for uncleared console
      'no-debugger': 'error', // Disallow debugger left in code

      // TS style
      '@typescript-eslint/no-explicit-any': 'warn', // Not recommended to use any
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error', // Use import type
      '@typescript-eslint/no-deprecated': 'off',

      // React related
      'react/react-in-jsx-scope': 'off', // Next.js does not need to import React
      'react/jsx-uses-react': 'off', // Outdated React 17 rule
      'react/jsx-uses-vars': 'warn', // Ensure JSX variables are not mistakenly deleted

      // React Hooks
      'react-hooks/rules-of-hooks': 'error', // Hook usage must be correct
      'react-hooks/exhaustive-deps': 'warn', // useEffect and other dependency arrays must be complete

      // MUI / JSX accessibility suggestions
      'jsx-a11y/alt-text': 'warn', // Check if img or Image has alt attribute
      'jsx-a11y/anchor-is-valid': 'warn', // Ensure <a> uses reasonable
      'jsx-a11y/click-events-have-key-events': 'warn', // Ensure click events also support keyboard

      // Next.js recommended settings
      '@next/next/no-img-element': 'warn', // Recommend using <Image /> instead of <img /> for better performance and security
      '@next/next/no-html-link-for-pages': 'off', // Allow <a href> navigation
      '@next/next/no-sync-scripts': 'error', // Disallow synchronous <script>
      '@next/next/no-title-in-document-head': 'error', // Disallow setting <title> in _document.js, should be set in _app.js or page component
      '@next/next/no-document-import-in-page': 'error', // Disallow importing _document.js in page components to prevent SSR issues
      '@next/next/no-head-element': 'error', // Disallow using <head> directly in _document.js, should use <Head /> component

      // Import sorting
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.test.tsx', '**/*.test.ts'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: { ...globals.jest },
    },
    rules: {
      'jest/no-disabled-tests': 'warn', // Avoid forgetting to remove test.skip
      'jest/expect-expect': 'warn', // Each test must have expect
    },
  },
);
