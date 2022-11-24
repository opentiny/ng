export default {
  column: '2',

  demos: [
    {
      demoId: 'radiogroup-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN':
          '<p>Radiogroup 的最简用法。通过属性<code>items</code>配置所有单选项的数据集合。</p>',
        'en-US': '',
      },
      apis: [
        'TiRadioGroupComponent.properties.items',
        'TiRadioGroupComponent.properties.disabled',
      ],
    },
    {
      demoId: 'radiogroup-direction',
      name: {
        'zh-CN': '竖向排列',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>direction</code>配置排列的方向，包括<code>vertical</code>、<code>horizontal</code>（默认）两种类型。</p>',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.properties.direction'],
    },
    {
      demoId: 'radiogroup-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置组件显示数据的键值。</p>',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.properties.labelKey'],
    },
    {
      demoId: 'radiogroup-valuekey',
      name: {
        'zh-CN': '选中值',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>valueKey</code>配置组件选中项数据的键值。</p>',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.properties.valueKey'],
    },
    {
      demoId: 'radiogroup-validation',
      name: {
        'zh-CN': '模板驱动式表单整体校验',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN':
          '<p>通过模板驱动式表单配置单选组的整体校验。通过配置<code>TiValidationConfig</code>接口的内容展示校验提示语句。通过注入<code>tiRequired</code>指令声明校验。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'radiogroup-reactive-validation',
      name: {
        'zh-CN': '响应式表单整体校验',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN':
          '<p>通过响应式表单配置单选组的整体校验。通过配置<code>TiValidationConfig</code>接口的内容展示校验提示语句。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'radiogroup-define',
      name: {
        'zh-CN': '自定义 label',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过<code>#item</code>模板配置单选内容。</p>',
        'en-US': '',
      },
      apis: ['TiRadioGroupComponent.slots.itemTemplate'],
    },
  ],
};
