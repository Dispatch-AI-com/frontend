// eslint.config.mjs
// @ts-check
import eslint from "@eslint/js";
import globals from "globals";
import tseslint, { parser } from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import importSort from "eslint-plugin-simple-import-sort";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import jestPlugin from "eslint-plugin-jest";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      "simple-import-sort": importSort,
      "jsx-a11y": jsxA11y,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // 通用风格
      "prettier/prettier": "error",
      "no-console": "warn",
      "no-debugger": "error",

      // TS 风格
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",

      // React 相关
      "react/react-in-jsx-scope": "off", // Next.js 无需 import React
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // MUI / JSX 可访问性建议
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",

      // Next.js 推荐设置
      "@next/next/no-img-element": "warn", // 建议用 <Image />
      "@next/next/no-html-link-for-pages": "off", // 已弃用

      // 导入排序
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  {
    files: ["**/*.test.tsx", "**/*.test.ts"],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: { ...globals.jest },
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/expect-expect": "warn",
    },
  }
);
