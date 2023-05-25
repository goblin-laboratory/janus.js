module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'], //指定规则扩展
  plugins: ['stylelint-order'], //载入插件
  // customSyntax: "postcss-lit",
  rules: {
    'selector-class-pattern': [
      '^(([a-z][a-z0-9]*)(-[a-z0-9]+)*)|([a-z][a-zA-Z0-9]*)$',
      {
        message: 'Expected class selector to be kebab-case',
      },
    ],
    'selector-pseudo-class-no-unknown': null,
    'at-rule-no-unknown': null,
  },
  overrides: [
    // 若项目中存在scss文件，添加以下配置
    // {
    //   files: '**/*.scss',
    //   customSyntax: 'postcss-scss',
    // },
    // 若项目中存在less文件，添加以下配置
    {
      files: '**/*.less',
      customSyntax: 'postcss-less',
    },
  ]
};
