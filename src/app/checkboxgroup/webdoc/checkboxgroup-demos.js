export default {
  column: '2',

  demos: [
    {
      demoId: 'checkboxgroup-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': 'Checkboxgroup 组件的最简用法。',
        'en-US': '',
      },
      apis: [
        'TiCheckboxGroupComponent.properties.items',
        'TiCheckboxItem.properties.label',
        'TiCheckboxItem.properties.disabled',
        'TiCheckboxItem.properties.id',
      ],
    },
    {
      demoId: 'checkboxgroup-valuekey',
      name: {
        'zh-CN': '选中值',
        'en-US': 'checkboxgroup valuekey',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>valueKey</code>自定义组件选中值。',
        'en-US': 'checkboxgroup valuekey',
      },
      apis: ['TiCheckboxGroupComponent.properties.valueKey'],
    },
    {
      demoId: 'checkboxgroup-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': 'checkboxgroup labelkey',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置显示的键值。',
        'en-US': 'checkboxgroup labelkey',
      },
      apis: ['TiCheckboxGroupComponent.properties.labelKey'],
    },
    {
      demoId: 'checkboxgroup-direction',
      name: {
        'zh-CN': '竖向排列',
        'en-US': 'direction',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>direction</code>配置排列方向。</p>',
        'en-US': '',
      },
      apis: ['TiCheckboxGroupComponent.properties.direction'],
    },
    {
      demoId: 'checkboxgroup-linewrap',
      name: {
        'zh-CN': '自动换行',
        'en-US': 'linewrap',
      },
      desc: {
        'zh-CN': '超过固定宽度会自动换行。',
        'en-US': '',
      },
    },
    {
      demoId: 'checkboxgroup-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'template',
      },
      desc: {
        'zh-CN': '<p>通过<code>#item</code>模板自定义选项模板。</p>',
        'en-US': '',
      },
      apis: ['TiCheckboxGroupComponent.slots.itemTemplate'],
    },
  ],
};
