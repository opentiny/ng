module.exports = {
  extends: [
    './eslint-rules/eslint-config-cbc-1-7-8-angular.js',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['build', 'website-tinydoc', 'tools', '*.js'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // jQuery: false,
    // $: false
  },
  rules: {

    '@typescript-eslint/no-unused-expressions': ['error'],
    // 添加类型声明提示
    '@typescript-eslint/typedef': [
      'warn',
      {
        arrayDestructuring: true,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      }
    ],
    // 函数返回值类型声明提示
    '@typescript-eslint/explicit-function-return-type': 'warn',
    // 类型声明周围的间距，提高代码可读性
    '@typescript-eslint/type-annotation-spacing': 'warn',
    "no-unused-vars": "error",
    // 变量必须先定义后使用
    'no-use-before-define': 'off',
    // 允许在参数，变量和属性上进行显式类型声明
    '@typescript-eslint/no-inferrable-types': 'off',
    'no-inferrable-types': 'off',
    // angular场景下，constructor为空的情况很多，也是官方推荐的用法
    '@typescript-eslint/no-useless-constructor': 'off',
    'no-useless-constructor': 'off',
    // 函数的参数禁止超过 5 个，不适合angular场景
    'max-params': 'off',
    'no-array-constructor': 'off',
    'prefer-regex-literals': 'off',
    // 消除参数顺序告警（eslint）
    '@typescript-eslint/member-ordering': 'off',
    'member-ordering': 'off',
    // 禁止给类的构造函数的参数添加修饰符
    '@typescript-eslint/no-parameter-properties': 'off',
    'no-parameter-properties': 'off',
    // 禁止重复引用
    'no-duplicate-imports': 'error',
  }
};
