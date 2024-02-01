module.exports = {
  parserOptions: {
    project: "tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  extends: ["standard-with-typescript", "prettier"],
  plugins: ["prettier"],
  overrides: [],

  rules: {
    "prettier/prettier": ["error"],
  },
};
