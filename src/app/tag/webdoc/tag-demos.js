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
        'zh-CN': '<p>Tag 组件的最简用法，当点击删除按钮的时候触发<code>delete</code>事件。</p>',
        'en-US': '',
      },
      apis: ['TiTagComponent.events.delete'],

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
      demoId: 'tag-edit',
      name: {
        'zh-CN': '动态编辑标签',
        'en-US': 'edit',
      },
      desc: {
        'zh-CN':'<p>用数组生成一组标签，可以动态添加和删除。</p>',
        'en-US': '',
      }
    }
  ]
};
