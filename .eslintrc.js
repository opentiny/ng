module.exports = {
    extends: [
        './eslint-rules/typescript'
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // jQuery: false,
        // $: false
    },
    rules: {

        "@typescript-eslint/no-unused-expressions": ["error"],

        "no-unused-vars": "error",
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
        'no-parameter-properties': 'off'
    }
};
