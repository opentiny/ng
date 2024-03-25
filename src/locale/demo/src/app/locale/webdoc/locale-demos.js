export default {
  column: '2',
  demos: [
    {
      demoId: 'locale-basic',
      name: {
        'zh-CN': '基础用法',
        'en-US': 'locale Basic',
      },
      desc: {
        'zh-CN': '语言切换，页面不刷新场景。',
        'en-US': '<p>locale Basic</p>',
      },
    },
    {
      demoId: 'locale-language',
      name: {
        'zh-CN': '扩展其他语言',
        'en-US': 'locale Language',
      },
      desc: {
        'zh-CN': '支持设置并扩展使用其他语言。',
        'en-US': '<p>locale Language</p>',
      },
    },
    {
      demoId: 'locale-reload',
      name: {
        'zh-CN': '过滤器',
        'en-US': 'locale reload',
      },
      desc: {
        'zh-CN':
          '使用过滤器做国际化转换，此方式只支持刷新页面切换语言，用户可结合 cookie 进行语言切换',
        'en-US': 'locale reload',
      },
      apis: ['TiLocale.methods.setLocale'],
    },
    {
      demoId: 'locale-format',
      name: {
        'zh-CN': '格式化',
        'en-US': 'format',
      },
      desc: {
        'zh-CN': '使用组件 API 格式化本地数字、货币、时间日期。',
        'en-US': 'locale format',
      },
    },
  ],
};
