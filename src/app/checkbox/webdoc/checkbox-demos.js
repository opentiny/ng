export default {
  column: '2',

  demos: [
    {
      demoId: 'checkbox-default',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'default',
      },
      desc: {
        'zh-CN': 'Checkbox 组件的最简用法。',
        'en-US': '',
      },
      apis: ['TiCheckboxComponent.properties.label'],
    },
    {
      demoId: 'checkbox-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置禁用状态。</p>',
        'en-US': '',
      },
      apis: ['TiCheckboxComponent.properties.disabled'],
    },
    {
      demoId: 'checkbox-label',
      name: {
        'zh-CN': '自定义文本',
        'en-US': 'label',
      },
      desc: {
        'zh-CN': '自定义显示文本',
        'en-US': '',
      },
    },
    {
      demoId: 'checkbox-indeterminate',
      name: {
        'zh-CN': '半选',
        'en-US': 'indeterminate',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>indeterminate</code>配置半选状态。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'checkbox-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'checkbox event',
      },
      desc: {
        'zh-CN': '当元素的值发生变化时触发<code>ngModelChange</code>事件。',
        'en-US': '',
      },
    },
  ],
};
