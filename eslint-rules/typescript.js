/**
 *
 * 依赖版本：
 *   eslint ^7.16.0
 *   babel-eslint ^10.1.0
 *   eslint-plugin-react ^7.21.5
 *   vue-eslint-parser ^7.3.0
 *   eslint-plugin-vue ^7.3.0
 *   @typescript-eslint/parser ^4.11.0
 *   @typescript-eslint/eslint-plugin ^4.11.0
 *
 * @reason 此规则顺序与原库顺序不一致
 */
module.exports = {
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: ['./base.js'],
  rules: {
    // 关闭参考 https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts
    'getter-return': 'off', // ts(2378)
    'constructor-super': 'off', // ts(2335) & ts(2377)
    'no-dupe-args': 'off', // ts(2300)
    'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
    'no-const-assign': 'off', // ts(2588)
    'no-func-assign': 'off', // ts(2539)
    'no-import-assign': 'off', // ts(2539) & ts(2540)
    'no-new-symbol': 'off', // ts(2588)
    'no-dupe-keys': 'off', // ts(1117)
    'no-magic-numbers': 'off',
    'no-redeclare': 'off', // ts(2451)
    'no-setter-return': 'off', // ts(2408)
    'no-this-before-super': 'off', // ts(2376)
    'no-undef': 'off', // ts(2304)
    'no-obj-calls': 'off', // ts(2349)
    'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
    'valid-typeof': 'off', // ts(2367)
    'no-empty-function': 'off', // https://github.com/typescript-eslint/typescript-eslint/issues/491
    'no-unreachable': 'off', // ts(7027)
    'no-invalid-this': 'off',
    'no-unused-vars': 'off',
    'react/sort-comp': 'off',



    // 函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明
    '@typescript-eslint/unified-signatures': 'warn',

    // 重载的函数必须写在一起
    '@typescript-eslint/adjacent-overload-signatures': 'error',


    // 禁止使用指定的类型
    '@typescript-eslint/ban-types': 'off',

    // 禁止对没有 then 方法的对象使用 await
    '@typescript-eslint/await-thenable': 'off',

    // 禁止使用 // @ts-ignore // @ts-nocheck // @ts-check
    '@typescript-eslint/ban-ts-comment': 'off',


    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // 类型断言必须使用 as Type，禁止使用 <Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）
    '@typescript-eslint/consistent-type-assertions': 'off',


    // 函数返回值必须与声明的类型一致
    '@typescript-eslint/explicit-function-return-type': 'off',

    // 有默认值或可选的参数必须放到最后
    '@typescript-eslint/default-param-last': 'off',

    // 导出的函数或类中的 public 方法必须定义输入输出参数的类型
    '@typescript-eslint/explicit-module-boundary-types': 'off',


    // 必须设置类的成员的可访问性
    '@typescript-eslint/explicit-member-accessibility': 'off',

    // 禁止使用 Array 构造函数
    '@typescript-eslint/no-array-constructor': 'off',


    // 限制各种变量或类型的命名规则
    '@typescript-eslint/naming-convention': 'off',

    // 限制数组类型必须使用 Array<T> 或 T[]
    '@typescript-eslint/array-type': 'off',

    // 禁止 delete 时传入的 key 是动态的
    '@typescript-eslint/no-dynamic-delete': 'off',

    // 禁止重复定义类的成员
    '@typescript-eslint/no-dupe-class-members': 'off',

    // 禁止定义空的接口
    '@typescript-eslint/no-empty-interface': 'error',

    // 不允许有空函数
    '@typescript-eslint/no-empty-function': 'off',

    // 禁止多余的 non-null 断言
    '@typescript-eslint/no-extra-non-null-assertion': 'off',


    // 禁止使用 any
    '@typescript-eslint/no-explicit-any': 'off',

    // 禁止调用 Promise 时没有处理异常情况
    '@typescript-eslint/no-floating-promises': 'off',

    // 禁止定义没必要的类，比如只有静态方法的类
    '@typescript-eslint/no-extraneous-class': 'off',

    // 禁止使用 eval
    '@typescript-eslint/no-implied-eval': 'off',

    // 禁止对 array 使用 for in 循环
    '@typescript-eslint/no-for-in-array': 'off',


    // 禁止使用 magic numbers
    '@typescript-eslint/no-magic-numbers': 'off',

    // 禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型
    '@typescript-eslint/no-inferrable-types': 'warn',


    // 避免错误的使用 Promise
    '@typescript-eslint/no-misused-promises': 'off',

    // 禁止在接口中定义 constructor，或在类中定义 new
    '@typescript-eslint/no-misused-new': 'off',

    // 禁止使用namespace 来定义命名空间
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: true,
        allowDefinitionFiles: true,
      },
    ],

    // 禁止在 optional chaining 之后使用 non-null 断言（感叹号）
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',




    // 禁止给类的构造函数的参数添加修饰符
    '@typescript-eslint/no-parameter-properties': 'warn',


    // 禁止使用 non-null 断言（感叹号）
    '@typescript-eslint/no-non-null-assertion': 'off',

    // 禁止将 this 赋值给其他变量，除非是解构赋值
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
      },
    ],

    // 禁止使用三斜杠导入文件
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        path: 'never',
        types: 'always',
        lib: 'always',
      },
    ],

    // 禁止使用 require
    '@typescript-eslint/no-require-imports': 'warn',

    // 禁止使用类型别名
    '@typescript-eslint/no-type-alias': 'off',

    // 禁止 throw 字面量，必须 throw 一个 Error 对象
    '@typescript-eslint/no-throw-literal': 'off',

    // 条件表达式禁止是永远为真（或永远为假）的
    '@typescript-eslint/no-unnecessary-condition': 'off',

    // 测试表达式中的布尔类型禁止与 true 或 false 直接比较
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

    // 禁止范型的类型有默认值时，将范型设置为该默认值
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',

    // 在命名空间中，可以直接使用内部变量，不需要添加命名空间前缀
    '@typescript-eslint/no-unnecessary-qualifier': 'off',

    // 禁止无用的表达式
    '@typescript-eslint/no-unused-expressions': 'off',


    // 禁止无用的类型断言
    '@typescript-eslint/no-unnecessary-type-assertion': 'off',

    // 禁止已定义的变量未使用
    '@typescript-eslint/no-unused-vars-experimental': 'off',

    // 已定义的变量必须使用
    '@typescript-eslint/no-unused-vars': 'off',

    // 禁止出现没必要的 constructor
    '@typescript-eslint/no-useless-constructor': 'error',


    // 禁止在定义变量之前就使用它
    '@typescript-eslint/no-use-before-define': 'off',

    // 使用 as const 替代 as 'bar'
    '@typescript-eslint/prefer-as-const': 'off',

    // 禁止使用 require 来引入模块
    '@typescript-eslint/no-var-requires': 'warn',

    // 使用函数类型别名替代包含函数调用声明的接口
    '@typescript-eslint/prefer-function-type': 'error',

    // 使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环
    '@typescript-eslint/prefer-for-of': 'off',


    // 禁止使用 module 来定义命名空间
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    // 使用 includes 而不是 indexOf
    '@typescript-eslint/prefer-includes': 'off',

    // 使用 optional chaining 替代 &&
    '@typescript-eslint/prefer-optional-chain': 'off',

    // 使用 ?? 替代 ||
    '@typescript-eslint/prefer-nullish-coalescing': 'off',


    // 使用 RegExp#exec 而不是 String#match
    '@typescript-eslint/prefer-regexp-exec': 'off',

    // 私有变量如果没有在构造函数外被赋值，则必须设为 readonly
    '@typescript-eslint/prefer-readonly': 'off',


    // async 函数的返回值必须是 Promise
    '@typescript-eslint/promise-function-async': 'off',

    // 使用 String#startsWith 而不是其他方式
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',


    // 方法调用时需要绑定到正确的 this 上
    '@typescript-eslint/unbound-method': 'off',

    // async 函数中必须存在 await 语句
    '@typescript-eslint/require-await': 'off',

    // 使用 sort 时必须传入比较函数
    '@typescript-eslint/require-array-sort-compare': 'off',


    // 模版字符串中的变量类型必须是字符串
    '@typescript-eslint/restrict-template-expressions': 'off',

    // 使用加号时，两者必须同为数字或同为字符串
    '@typescript-eslint/restrict-plus-operands': 'off',


    // 条件判断必须传入布尔值
    '@typescript-eslint/strict-boolean-expressions': 'off',

    // async 函数必须返回 await
    '@typescript-eslint/return-await': 'off',

    // 使用联合类型作为 switch 的对象时，必须包含每一个类型的 case
    '@typescript-eslint/switch-exhaustiveness-check': 'off',

    // interface 和 type 定义时必须声明成员的类型
    '@typescript-eslint/typedef': 'off',
  },
};
