export default {
  column: '2',
  demos: [
    {
      demoId: 'browser-usage',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'browser usage',
      },
      desc: {
        'zh-CN': '<p>检测当前浏览器的相关信息。</p>',
        'en-US': '<p>browser usage</p>',
      },
      apis: [
        'TiBrowser.methods.browser',
        'TiBrowser.methods.isFirefox',
        'TiBrowser.methods.isOther',
        'TiBrowser.methods.isChrome',
        'TiBrowser.methods.isIE',
        'TiBrowser.methods.isEdge',
        'TiBrowser.methods.isOpera',
        'TiBrowser.methods.isSafari',
        'TiBrowser.methods.version',
      ],
    },
  ],
};
