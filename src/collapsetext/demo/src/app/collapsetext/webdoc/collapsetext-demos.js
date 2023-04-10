export default {
  column: '2',
  demos: [
    {
      demoId: 'collapsetext-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'collapsetext basic'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>label</code>配置头部文本内容。</p>',
        'en-US': 'collapsetext basic'
      },
      apis: ['TiCollapsetextComponent.properties.label']
    },
    {
      demoId: 'collapsetext-type',
      name: {
        'zh-CN': '类型',
        'en-US': 'collapsetext type'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>type</code>配置是标题/内容下展，包含<code>title</code>、<code>content</code>两种类型。</p>',
        'en-US': 'collapsetext type'
      },
      apis: ['TiCollapsetextComponent.properties.type']
    },
    {
      demoId: 'collapsetext-highlight',
      name: {
        'zh-CN': '高亮',
        'en-US': 'collapsetext highlight'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>highlight</code>配置默认状态是否高亮。</p>',
        'en-US': 'collapsetext highlight'
      },
      apis: ['TiCollapsetextComponent.properties.highlight']
    },
    {
      demoId: 'collapsetext-collapsed',
      name: {
        'zh-CN': '折叠',
        'en-US': 'collapsetext collapsed'
      },
      desc: {
        'zh-CN':
          '<p>通过双向绑定的属性<code>collapsed</code>配置和获取是否处于折叠状态；当<code>collapsed</code>发生变化时触发<code>collapsedChange</code>事件。</p>',
        'en-US': 'collapsetext collapsed'
      },
      apis: ['TiCollapsetextComponent.properties.collapsed', 'TiCollapsetextComponent.events.collapsedChange']
    },
    {
      demoId: 'collapsetext-scene',
      name: {
        'zh-CN': '常用场景',
        'en-US': 'collapsetext scene'
      },
      desc: {
        'zh-CN': '<p>常用的使用场景。</p>',
        'en-US': 'collapsetext scene'
      }
    }
  ]
};
