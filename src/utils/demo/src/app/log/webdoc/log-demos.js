export default {
  column: '2',
  demos: [
    {
      demoId: 'log-usage',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'log usage',
      },
      desc: {
        'zh-CN':
          '<p>当前日志的数值大于等于日志等级时，当前日志才会被打印输出</p>',
        'en-US': '<p>log usage</p>',
      },
      apis: [
        'TiLog.methods.log',
        'TiLog.methods.error',
        'TiLog.methods.warn',
        'TiLog.methods.setLevel',
      ],
    },
  ],
};
