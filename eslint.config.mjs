// @ts-check
import eslint from "@eslint/js";
import globals from "globals";
import tseslint, { parser } from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import importSort from "eslint-plugin-simple-import-sort";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jestPlugin from "eslint-plugin-jest";
import nextPlugin from "@next/eslint-plugin-next";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
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
      // 通用风格规范
      "prettier/prettier": "error", // 强制格式正确
      "no-console": "warn", // 警告未清除的 console
      "no-debugger": "error", // 禁止 debugger 留在代码中

      // TS 风格
      "@typescript-eslint/no-explicit-any": "warn", // 不推荐使用 any
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error", // 使用 import type
      "@typescript-eslint/no-deprecated": "off",

      // React 相关
      "react/react-in-jsx-scope": "off", // Next.js 无需 import React
      "react/jsx-uses-react": "off",   // Outdated React 17 规则
      "react/jsx-uses-vars": "warn", // 确保 JSX 变量未被误删

      // React Hooks
      "react-hooks/rules-of-hooks": "error", // Hook 用法必须正确
      "react-hooks/exhaustive-deps": "warn", // useEffect 等依赖数组必须完整

      // MUI / JSX 可访问性建议
      "jsx-a11y/alt-text": "warn", // 检查 img 或 Image 是否有 alt 属性
      "jsx-a11y/anchor-is-valid": "warn", // 确保 <a> 使用合理
      "jsx-a11y/click-events-have-key-events": "warn", // 保证点击事件同时支持键盘

      // Next.js 推荐设置
      "@next/next/no-img-element": "warn", // 建议用 <Image /> 替代 <img />，以获得更好的性能和安全性
      "@next/next/no-html-link-for-pages": "off",  // 允许 <a href> 跳转
      "@next/next/no-sync-scripts": "error", // 禁止同步 <script>
      "@next/next/no-title-in-document-head": "error", // 禁止在 _document.js 里设置 <title>，应在 _app.js 或页面组件设置
      "@next/next/no-document-import-in-page": "error", // 禁止在页面组件中导入 _document.js，防止 SSR 问题
      "@next/next/no-head-element": "error", // 禁止在 _document.js 里直接使用 <head>，应使用 <Head /> 组件

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
      "jest/no-disabled-tests": "warn", // 避免忘记移除 test.skip
      "jest/expect-expect": "warn",  // 每个测试必须有 expect
    },
  }
);
