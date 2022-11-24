export default {
  column: '2',

  demos: [
    {
      demoId: 'checkgroup-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          'Checkgroup 组件的最简用法。通过<code>tiCheckgroup</code>的双向绑定接口<code>checkeds</code>获取选中值。',
        'en-US': '',
      },
      apis: [
        'TiCheckgroupComponent.properties.checkeds',
        'TiCheckgroupComponent.properties.items',
        'TiCheckgroupComponent.events.checkedsChange',
        'TiCheckgroupComponent.properties.label',
      ],
    },
    {
      demoId: 'checkgroup-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过属性<code>disabled</code>配置 tiCheckgroup、tiCheckitem 是否禁用。',
        'en-US': '',
      },
      apis: ['TiCheckgroupComponent.properties.disabled'],
    },
    {
      demoId: 'checkgroup-item',
      name: {
        'zh-CN': '不使用全选',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '没有全选按钮时，通过<code>tiCheckitem</code>的<code>beCheckeds</code>获取选中值。在表单中，更推荐使用<code>ti-checkbox-group</code>，可以双向绑定选中值，而且在校验时体验更好。',
        'en-US': '',
      },
      apis: [
        'TiCheckgroupComponent.properties.beCheckeds',
        'TiCheckgroupComponent.properties.item',
      ],
    },
    {
      demoId: 'checkgroup-level',
      name: {
        'zh-CN': '关系复杂的数据',
        'en-US': '',
      },
      desc: {
        'zh-CN': '管理较为复杂的数据。',
        'en-US': '',
      },
    },
    {
      demoId: 'checkgroup-valuekey',
      name: {
        'zh-CN': '选中值是一个基本类型数据',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>valueKey</code>配置选中值是一个基本类型的数据，而不是默认的引用类型。<code>valueKey</code>传入<code>item</code>对象某个键名，选中值即为该键名的值。',
        'en-US': '',
      },
      apis: ['TiCheckgroupComponent.properties.valueKey'],
    },
  ],
};
