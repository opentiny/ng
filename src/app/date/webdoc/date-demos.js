export default {
  column: '2',

  demos: [
    {
      demoId: 'date-value',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Date 组件的最简用法。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'date-format',
      name: {
        'zh-CN': '日期格式',
        'en-US': 'format',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>format</code>配置日期显示格式。</p>',
        'en-US': '',
      },
      apis: ['TiDateComponent.properties.format'],
    },
    {
      demoId: 'date-maxmin',
      name: {
        'zh-CN': '预设范围',
        'en-US': 'maxmin',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>max</code>配置可选择日期的最大值；通过属性<code>min</code>配置可选择日期的最小值。</p>',
        'en-US': '',
      },
      apis: [
        'TiDateComponent.properties.max',
        'TiDateComponent.properties.min',
      ],
    },
    {
      demoId: 'date-panelalign',
      name: {
        'zh-CN': '下拉面板对齐方向',
        'en-US': 'panelAlign',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>panelAlign</code>配置下拉面板对齐方向，包括<code>left</code>、<code>right</code>。</p>',
        'en-US': '',
      },
      apis: ['TiDateComponent.properties.panelAlign'],
    },
    {
      demoId: 'date-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '',
      },
      apis: ['TiDateComponent.properties.disabled'],
    },
    {
      demoId: 'date-clearicon',
      name: {
        'zh-CN': '清除功能',
        'en-US': 'clearIcon',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>clearIcon</code>配置选择框右侧是否显示清除的叉号图标。</p>',
        'en-US': '',
      },
      apis: ['TiDateComponent.properties.clearIcon'],
    },
    {
      demoId: 'date-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN':
          '<p>当日期框内值改变的时候触发<code>ngModelChange</code>事件。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'date-customize',
      name: {
        'zh-CN': '自定义下拉面板内容',
        'en-US': 'customize',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>customizeOptions</code>自定义下拉面板内容，设置可快捷选择的常用日期。</p>',
        'en-US': '',
      },
      apis: [
        'TiDateComponent.properties.customizeOptions',
        'TiDateCustomizeOptions.properties.label',
        'TiDateCustomizeOptions.properties.value',
        'TiDateValue.properties.begin',
      ],
    },
    {
      demoId: 'date-disableddays',
      name: {
        'zh-CN': '不可选择日期',
        'en-US': 'disabledDays',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>disabledDays</code>配置禁止选择的部分日期。</p>',
        'en-US': '',
      },
      apis: ['TiDateComponent.properties.disabledDays'],
    },
    {
      demoId: 'date-validation',
      name: {
        'zh-CN': '校验',
        'en-US': 'date validation',
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'date-nowdatetime',
      name: {
        'zh-CN': '自定义当前日期',
        'en-US': 'nowDateTime',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>nowDateTime</code>自定义当前日期，可用于矫正实际日期和计算机系统日期的偏差。</p>',
        'en-US': '',
      },
      apis: ['TiDateComponent.properties.nowDateTime'],
    },
  ],
  ignoreApis: [
    'TiDateComponent.properties.isBeginFixed',
    'TiDateComponent.properties.isEndFixed',
    'TiDateComponent.events.dayClick',
    'TiDateComponent.events.okClick',
    'TiDateValue.properties.end',
    'TiDateValue.properties.timeZone',
  ],
};
