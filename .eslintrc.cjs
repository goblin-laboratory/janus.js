module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'standard', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  // extends: [
  //   'eslint:recommended',
  //   'plugin:@typescript-eslint/recommended',
  //   'plugin:@typescript-eslint/eslint-recommended',
  //   'standard',
  //   'plugin:prettier/recommended',
  // ],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    // React: false,
    // ReactDOM: false
  },
  settings: {
    // 'import/resolver': { node: { extensions: ['.mjs', '.js', '.json', '.ts', '.tsx'] } },
    // 'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx'],
  },
  rules: {
    // 这里填入你的项目需要的个性化配置
    'no-debugger': 'warn',
    'accessor-pairs': 'warn',
    yoda: ['error', 'always', { onlyEquality: true }],
    'no-unused-vars': 'warn',
  },
};
