export default {
  column: '2',

  demos: [
    {
      demoId: 'radio-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN':
          '<p>Radio 组件的最简用法。一组单选框需要使用相同的<code>name</code>属性且 ngModel 绑定同一变量，才能实现单选效果。<code>value</code>属性表示该选项的值，当 ngModel 和某项的<code>value</code>值相等时，表示该项选中。</p>',
        'en-US': '',
      },
      apis: ['TiRadioComponent.properties.label'],
    },
    {
      demoId: 'radio-group',
      name: {
        'zh-CN': '单选组',
        'en-US': 'group',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>items</code>配置<code>radio-group</code>所有选项的数据集合，各选项互斥。</p>',
        'en-US': '',
      },
      apis: [
        'TiRadioGroupComponent.properties.items',
        'TiRadioItem.properties.value'
      ],
    },
    {
      demoId: 'radio-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置禁用状态；通过属性<code>item.disabled</code>配置<code>radio-group</code>选项禁用状态。</p>',
        'en-US': '',
      },
      apis: [
        'TiRadioComponent.properties.disabled',
      ],
    },
    {
      demoId: 'radio-label',
      name: {
        'zh-CN': '自定义文本',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>label</code>标签自定义显示文本；通过<code>#item</code>配置<code>radio-group</code>选项区域的模板。',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.slots.itemTemplate'],
    },
    {
      demoId: 'radio-group-direction',
      name: {
        'zh-CN': '竖向排列',
        'en-US': 'direction',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>direction</code>配置<code>radio-group</code>排列的方向，包括<code>vertical</code>、<code>horizontal</code>（默认）两种类型。</p>',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.properties.direction'],
    },
    {
      demoId: 'radio-group-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': 'labelkey',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置<code>radio-group</code>组件显示数据的键值。</p>',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.properties.labelKey'],
    },
    {
      demoId: 'radio-group-valuekey',
      name: {
        'zh-CN': '选中值',
        'en-US': 'valuekey',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>valueKey</code>配置<code>radio-group</code>组件选中项数据的键值。</p>',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.properties.valueKey'],
    },
    {
      demoId: 'radio-group-validation',
      name: {
        'zh-CN': '表单校验',
        'en-US': 'validation',
      },
      desc: {
        'zh-CN':
          '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'radio-group-linewrap',
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
      demoId: 'radio-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'radio event',
      },
      desc: {
        'zh-CN': '当元素的值发生变化时触发<code>ngModelChange</code>事件。',
        'en-US': '',
      },
    },
  ],
  ignoreApis: [
    'TiRadioGroupComponent.properties.disabled'
  ],
};
