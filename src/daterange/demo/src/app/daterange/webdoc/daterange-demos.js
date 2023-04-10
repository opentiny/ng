export default {
  column: '2',

  demos: [
    {
      demoId: 'daterange-value',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': '<p>DateRange 组件的最简用法。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'daterange-format',
      name: {
        'zh-CN': '日期范围格式',
        'en-US': 'format'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>format</code>配置日期范围显示格式。</p>',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.properties.format']
    },
    {
      demoId: 'daterange-maxmin',
      name: {
        'zh-CN': '预设范围',
        'en-US': 'maxmin'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>max</code>配置可选择日期范围的最大值；通过属性<code>min</code>配置可选择日期范围的最小值。</p>',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.properties.max', 'TiDateRangeComponent.properties.min']
    },
    {
      demoId: 'daterange-panelalign',
      name: {
        'zh-CN': '下拉面板对齐方向',
        'en-US': 'panelAlign'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>panelAlign</code>配置下拉面板对齐方向，包括<code>left</code>、<code>right</code>。</p>',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.properties.panelAlign']
    },
    {
      demoId: 'daterange-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.properties.disabled']
    },
    {
      demoId: 'daterange-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event'
      },
      desc: {
        'zh-CN':
          '当点击下拉面板上的日期时触发<code>dayClick</code>事件，传递出去的参数为包含<code>value</code>、<code>focusedPosition</code>、<code>beginValue</code>、<code>endValue</code>这四个属性的对象；当点击面板上的确认按钮时触发<code>okClick</code>事件，传递出去的参数为选中的日期。',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.events.dayClick', 'TiDateRangeComponent.events.okClick']
    },
    {
      demoId: 'daterange-fixedvalue',
      name: {
        'zh-CN': '固定开始日期或者结束日期',
        'en-US': 'isBeginOrEndFixed'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>isBeginFixed</code>、<code>isEndFixed</code>配置是否固定开始日期或者结束日期；通过属性<code>clearIcon</code>配置选择框右侧是否显示清除的叉号图标。</p>',
        'en-US': ''
      },
      apis: [
        'TiDateRangeComponent.properties.isBeginFixed',
        'TiDateRangeComponent.properties.isEndFixed',
        'TiDateRangeComponent.properties.clearIcon'
      ]
    },
    {
      demoId: 'daterange-isallowbeginequalend',
      name: {
        'zh-CN': '不允许开始日期和结束日期相同',
        'en-US': 'isAllowBeginEqualEnd'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>isAllowBeginEqualEnd</code>配置是否允许结束日期与开始日期相同。</p>',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.properties.isAllowBeginEqualEnd']
    },
    {
      demoId: 'daterange-customize',
      name: {
        'zh-CN': '自定义下拉面板内容',
        'en-US': 'customize'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>customizeOptions</code>自定义下拉面板左侧内容，设置可快捷选择的常用日期范围；当点击自定义下拉面板左侧内容时触发<code>customizeOptionClick</code>事件，传递出去的参数为选中的日期范围。</p>',
        'en-US': ''
      },
      apis: [
        'TiDateRangeComponent.properties.customizeOptions',
        'TiDateCustomizeOptions.properties.label',
        'TiDateCustomizeOptions.properties.value',
        'TiDateValue.properties.begin',
        'TiDateValue.properties.end'
      ]
    },
    {
      demoId: 'daterange-disableddays',
      name: {
        'zh-CN': '不可选择日期',
        'en-US': 'disabledDays'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabledDays</code>配置禁止选择的部分日期。</p>',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.properties.disabledDays']
    },
    {
      demoId: 'daterange-validation',
      name: {
        'zh-CN': '校验',
        'en-US': 'daterange validation'
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'daterange-nowdatetime',
      name: {
        'zh-CN': '自定义当前日期',
        'en-US': 'nowDateTime'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>nowDateTime</code>自定义当前日期，可用于矫正实际日期和计算机系统日期的偏差。</p>',
        'en-US': ''
      },
      apis: ['TiDateRangeComponent.properties.nowDateTime']
    }
  ],
  ignoreApis: ['TiDateValue.properties.timeZone']
};
