export default {
  column: '2',
  demos: [
    {
      demoId: 'loading-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN': '<p>Loading 组件的最简用法。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'loading-type',
      name: {
        'zh-CN': '加载类型',
        'en-US': 'Type',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>type</code>配置加载显示类型，包括<code>default</code>、<code>weak</code>。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiLoadingComponent.properties.type'],
    },
    {
      demoId: 'loading-size',
      name: {
        'zh-CN': '大小',
        'en-US': 'Size',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>size</code>配置加载图标的大小，包括<code>small</code>、<code>middle</code>、<code>large</code>，支持直接配置值。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiLoadingComponent.properties.size'],
    },
  ],
};
