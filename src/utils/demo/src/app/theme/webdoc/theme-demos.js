export default {
  column: '2',
  demos: [
    {
      demoId: 'theme-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'theme-basic'
      },
      desc: {
        'zh-CN': '在线换肤能力展示。（仅支持生产环境，不支持调试环境）',
        'en-US': '<p>theme basic</p>'
      },
      apis: ['TiTheme.methods.loadCss']
    },
    {
      demoId: 'theme-palette',
      name: {
        'zh-CN': '自动生成调色板',
        'en-US': 'theme-palette'
      },
      desc: {
        'zh-CN': '根据一个色值，生成调色板。',
        'en-US': '<p>theme basic</p>'
      },
      apis: ['TiTheme.methods.setBrandColors']
    }
  ]
};
