export default {
  column: '2',

  demos: [
    {
      demoId: 'time-format',
      name: {
        'zh-CN': '显示格式',
        'en-US': 'format',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>format</code>配置时间显示的格式。包括 HH:mm:ss、HH:mm、HH 三种格式。</p>',
        'en-US': '<p>format</p>',
      },
      apis: ['TiTimeComponent.properties.format'],
    },
    {
      demoId: 'time-maxmin',
      name: {
        'zh-CN': '预设范围',
        'en-US': 'maxmin',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>max</code>配置可以选择或输入的合法的最大时间。通过属性<code>min</code>配置可以选择或输入的合法的最小时间。</p>',
        'en-US': '<p>maxmin</p>',
      },
      apis: [
        'TiTimeComponent.properties.max',
        'TiTimeComponent.properties.min',
      ],
    },
    {
      demoId: 'time-clearicon',
      name: {
        'zh-CN': '清除功能',
        'en-US': 'clear',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>clearIcon</code>配置是否存在清除功能。</p>',
        'en-US': '<p>clear</p>',
      },
      apis: ['TiTimeComponent.properties.clearIcon'],
    },
    {
      demoId: 'time-panelalign',
      name: {
        'zh-CN': '面板对齐方式',
        'en-US': 'panelalign',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>panelAlign</code>配置时间下拉面板与时间框的对齐方式，包括<code>left</code>（默认）、<code>right</code>。</p>',
        'en-US': '<p>panelalign</p>',
      },
      apis: ['TiTimeComponent.properties.panelAlign'],
    },
    {
      demoId: 'time-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN':
          '<p>当时间框内值改变的时候触发<code>ngModelChange</code>事件。</p>',
        'en-US': '<p>event</p>',
      },
    },
    {
      demoId: 'time-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': 'disabled',
      },
    },
    {
      demoId: 'time-reactive',
      name: {
        'zh-CN': '响应式表单',
        'en-US': 'reactive',
      },
      desc: {
        'zh-CN': '<p>响应式表单中时间选择器的最简用法。</p>',
        'en-US': '<p>time-reactive</p>',
      },
    },
    {
      demoId: 'time-validation',
      name: {
        'zh-CN': '校验',
        'en-US': 'validation',
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': '<p>validation</p>',
      },
    },
  ],
};
