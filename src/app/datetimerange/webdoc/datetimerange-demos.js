export default {
  column: '2',
  demos: [
    {
      demoId: 'datetimerange-value',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>DatetimeRange 组件的最简用法。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'datetimerange-format',
      name: {
        'zh-CN': '日期时间范围格式',
        'en-US': 'format',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>format</code>配置日期时间范围显示格式。</p>',
        'en-US': '',
      },
      apis: [
        'TiDatetimeRangeComponent.properties.format',
        'TiDatetimeFormat.properties.date',
        'TiDatetimeFormat.properties.time',
      ],
    },
    {
      demoId: 'datetimerange-maxmin',
      name: {
        'zh-CN': '预设范围',
        'en-US': 'maxmin',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>max</code>配置配置可选择日期时间范围的最大值；通过属性<code>min</code>配置可选择日期时间范围的最小值。</p>',
        'en-US': '',
      },
      apis: [
        'TiDatetimeRangeComponent.properties.max',
        'TiDatetimeRangeComponent.properties.min',
      ],
    },
    {
      demoId: 'datetimerange-panelalign',
      name: {
        'zh-CN': '下拉面板对齐方向',
        'en-US': 'panelAlign',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>panelAlign</code>配置下拉面板对齐方向，包括<code>left</code>、<code>right</code>。</p>',
        'en-US': '',
      },
      apis: ['TiDatetimeRangeComponent.properties.panelAlign'],
    },
    {
      demoId: 'datetimerange-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '',
      },
      apis: ['TiDatetimeRangeComponent.properties.disabled'],
    },
    {
      demoId: 'datetimerange-clearicon',
      name: {
        'zh-CN': '清除功能',
        'en-US': 'clearIcon',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>clearIcon</code>配置是否显示清除的叉号图标。</p>',
        'en-US': '',
      },
      apis: ['TiDatetimeRangeComponent.properties.clearIcon'],
    },
    {
      demoId: 'datetimerange-customize',
      name: {
        'zh-CN': '自定义下拉面板内容',
        'en-US': 'customize',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>customizeOptions</code>自定义下拉面板内容，设置可快捷选择的常用日期时间范围。</p>',
        'en-US': '',
      },
      apis: [
        'TiDatetimeRangeComponent.properties.customizeOptions',
        'TiDateCustomizeOptions.properties.label',
        'TiDateCustomizeOptions.properties.value',
        'TiDateValue.properties.begin',
        'TiDateValue.properties.end',
      ],
    },
    {
      demoId: 'datetimerange-nowdatetime',
      name: {
        'zh-CN': '自定义当前时间',
        'en-US': 'nowDateTime',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>nowDateTime</code>自定义当前时间，可用于矫正实际日期时间和计算机系统时间的偏差。</p>',
        'en-US': '',
      },
      apis: ['TiDatetimeRangeComponent.properties.nowDateTime'],
    },
    {
      demoId: 'datetimerange-isallowbeginequalend',
      name: {
        'zh-CN': '不允许开始时间和结束时间相同',
        'en-US': 'isAllowBeginEqualEnd',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>isAllowBeginEqualEnd</code>配置是否允许结束时间与开始时间相同。</p>',
        'en-US': '',
      },
      apis: ['TiDatetimeRangeComponent.properties.isAllowBeginEqualEnd'],
    },
    {
      demoId: 'datetimerange-timezoneable',
      name: {
        'zh-CN': '时区选择',
        'en-US': 'timeZoneable',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>timeZoneable</code>配置是否显示时区选择框，支持时区选择；通过属性<code>timeZone</code>配置时区选择框的当前选中值，包括本地时区、UTC/GMT。</p>',
        'en-US': '',
      },
      apis: [
        'TiDatetimeRangeComponent.properties.timeZoneable',
        'TiDateValue.properties.timeZone',
      ],
    },
    {
      demoId: 'datetimerange-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN':
          '<p>当日期时间范围框内值改变的时候触发<code>ngModelChange</code>事件；当点击下拉面板上的日期时触发<code>dayClick</code>事件，传递出去的参数为包括 value、focusedPosition、beginValue、endValue 这四个属性的对象；当点击面板上的确认按钮时触发<code>okClick</code>事件，传递出去的参数为选中的日期时间。</p>',
        'en-US': '',
      },
      apis: [
        'TiDatetimeRangeComponent.events.dayClick',
        'TiDatetimeRangeComponent.events.okClick',
      ],
    },
    {
      demoId: 'datetimerange-validation',
      name: {
        'zh-CN': '校验',
        'en-US': 'datetimerange validation',
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': 'datetimerange validation description',
      },
    },
  ],
  ignoreApis: [
    'TiDatetimeRangeComponent.properties.disabledDays',
    'TiDatetimeRangeComponent.properties.isBeginFixed',
    'TiDatetimeRangeComponent.properties.isEndFixed',
  ],
};
