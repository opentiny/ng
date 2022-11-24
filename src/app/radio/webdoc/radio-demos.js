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
      demoId: 'radio-label',
      name: {
        'zh-CN': '自定义文本',
        'en-US': '',
      },
      desc: {
        'zh-CN': '自定义显示文本',
        'en-US': '',
      },
    },
    {
      demoId: 'radio-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置禁用状态。</p>',
        'en-US': '',
      },
      apis: ['TiRadioComponent.properties.disabled'],
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
};
