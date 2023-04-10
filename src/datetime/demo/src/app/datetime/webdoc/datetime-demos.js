export default {
  column: '2',

  demos: [
    {
      demoId: 'datetime-value',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': '<p>Datetime 组件的最简用法。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'datetime-format',
      name: {
        'zh-CN': '日期时间格式',
        'en-US': 'format'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>format</code>配置日期时间显示格式。</p>',
        'en-US': ''
      },
      apis: ['TiDatetimeComponent.properties.format', 'TiDatetimeFormat.properties.date', 'TiDatetimeFormat.properties.time']
    },
    {
      demoId: 'datetime-maxmin',
      name: {
        'zh-CN': '预设范围',
        'en-US': 'maxmin'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>max</code>配置配置可选择日期时间的最大值；通过属性<code>min</code>配置可选择日期时间的最小值。</p>',
        'en-US': ''
      },
      apis: ['TiDatetimeComponent.properties.max', 'TiDatetimeComponent.properties.min']
    },
    {
      demoId: 'datetime-panelalign',
      name: {
        'zh-CN': '下拉面板对齐方向',
        'en-US': 'panelalign'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>panelAlign</code>配置下拉面板对齐方向，包括<code>left</code>、<code>right</code>。</p>',
        'en-US': ''
      },
      apis: ['TiDatetimeComponent.properties.panelAlign']
    },
    {
      demoId: 'datetime-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。',
        'en-US': ''
      },
      apis: ['TiDatetimeComponent.properties.disabled']
    },
    {
      demoId: 'datetime-clearicon',
      name: {
        'zh-CN': '清除功能',
        'en-US': 'clearIcon'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>clearIcon</code>配置是否显示清除的叉号图标。</p>',
        'en-US': ''
      },
      apis: ['TiDatetimeComponent.properties.clearIcon']
    },
    {
      demoId: 'datetime-customize',
      name: {
        'zh-CN': '自定义下拉面板内容',
        'en-US': 'customize'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>customizeOptions</code>自定义下拉面板左侧内容，设置可快捷选择的常用日期时间；当点击自定义下拉面板左侧内容时触发<code>customizeOptionClick</code>事件，传递出去的参数为选中的日期时间。</p>',
        'en-US': ''
      },
      apis: [
        'TiDatetimeComponent.properties.customizeOptions',
        'TiDateCustomizeOptions.properties.label',
        'TiDateCustomizeOptions.properties.value',
        'TiDateValue.properties.begin'
      ]
    },
    {
      demoId: 'datetime-nowdatetime',
      name: {
        'zh-CN': '自定义当前时间',
        'en-US': 'nowDateTime'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>nowDateTime</code>自定义当前日期时间，可用于矫正实际日期时间和计算机系统日期时间的偏差。</p>',
        'en-US': ''
      },
      apis: ['TiDatetimeComponent.properties.nowDateTime']
    },

    {
      demoId: 'datetime-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event'
      },
      desc: {
        'zh-CN':
          '<p>当日期时间框内值改变的时候触发<code>ngModelChange</code>事件；当点击面板上的确认按钮时触发<code>okClick</code>事件，传递出去的参数为选中的日期时间。</p>',
        'en-US': ''
      },
      apis: ['TiDatetimeComponent.events.okClick']
    },
    {
      demoId: 'datetime-validation',
      name: {
        'zh-CN': '校验',
        'en-US': 'datetime validation'
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'datetime-timezoneable',
      name: {
        'zh-CN': '时区选择',
        'en-US': 'timeZoneable'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>timeZoneable</code>配置是否显示时区选择框，支持时区选择；通过属性<code>timeZone</code>配置时区选择框的当前选中值，包括本地时区、UTC/GMT；当时区选择框的选中值变化时，点击日期时间面板确定按钮或自定义下拉面板左侧内容后触发<code>timeZoneChange</code>事件，传递出去的参数为当前时区。</p>',
        'en-US': ''
      },
      apis: [
        'TiDatetimeComponent.properties.timeZoneable',
        'TiDatetimeComponent.properties.timeZone',
        'TiDatetimeComponent.events.timeZoneChange'
      ]
    }
  ],
  ignoreApis: [
    'TiDatetimeComponent.properties.disabledDays',
    'TiDatetimeComponent.properties.isBeginFixed',
    'TiDatetimeComponent.properties.isEndFixed',
    'TiDatetimeComponent.events.dayClick',
    'TiDateValue.properties.end',
    'TiDateValue.properties.timeZone'
  ]
};
