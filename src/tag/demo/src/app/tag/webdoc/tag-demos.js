export default {
  column: '2',
  demos: [
    {
      demoId: 'tag-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Tag 组件的最简用法。</p>',
        'en-US': '',
      }
    },
    {
      demoId: 'tag-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '',
      },
      apis: ['TiTagComponent.properties.disabled'],
    },
    {
      demoId: 'tag-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN':'<p>当点击删除按钮的时候触发<code>delete</code>事件。</p>',
        'en-US': '',
      },
      apis: ['TiTagComponent.events.delete'],
    }
  ]
};
