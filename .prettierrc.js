module.exports = {
  tabWidth: 2, // tab等2个空格
  printWidth: 140,
  useTabs: false, // 用空格缩进行
  semi: true, // 行尾使用分号
  singleQuote: true, // 字符串使用单引号
  quoteProps: 'as-needed', // 仅在需要时在对象属性添加引号
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  endOfLine: 'auto' // 结尾是 lf-\n cr-\r lfcr-\n\r  auto-保持现有的行尾设置
};
