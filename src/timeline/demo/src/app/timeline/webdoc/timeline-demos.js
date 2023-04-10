export default {
  column: '2',

  demos: [
    {
      demoId: 'timeline-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Timeline 组件的最简用法。</p>',
        'en-US': '',
      },
      apis: [
        'TiTimelineComponent.properties.options',
        'TiTimelineOption.properties.label',
        'TiTimelineOption.properties.time'
      ],
    },
    {
      demoId: 'timeline-type',
      name: {
        'zh-CN': '类型',
        'en-US': 'type',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>option.type</code>配置 timeline 节点类型，包括<code>info</code>、<code>success</code>、<code>danger</code>、<code>primary</code>、<code>warning</code>。</p>',
        'en-US': '',
      },
      apis: ['TiTimelineOption.properties.type'],
    },
    {
      demoId: 'timeline-multi',
      name: {
        'zh-CN': '多级',
        'en-US': 'multi',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>activeIndex</code>配置当前激活项；通过属性<code>option.isTitle</code>配置是否为一级节点标题；通过属性<code>option.errorMessage</code>配置节点执行失败的错误信息。</p>',
        'en-US': '',
      },
      apis: [
        'TiTimelineComponent.properties.activeIndex',
        'TiTimelineOption.properties.isTitle',
        'TiTimelineOption.properties.errorMessage'
      ],
    },
    {
      demoId: 'timeline-dark',
      name: {
        'zh-CN': '深色背景',
        'en-US': 'dark',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>dark</code>配置深色背景时间线。</p>',
        'en-US': '',
      }
    },
    {
      demoId: 'timeline-helptip',
      name: {
        'zh-CN': '提示信息',
        'en-US': 'helptip',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>option.iconTip</code>配置帮助图标提示内容；通过属性<code>option.iconTipPosition</code>配置提示方向；通过属性<code>option.iconTipMaxWidth</code>配置提示信息最大宽度。</p>',
        'en-US': '',
      },
      apis: [
        'TiTimelineOption.properties.iconTip',
        'TiTimelineOption.properties.iconTipPosition',
        'TiTimelineOption.properties.iconTipMaxWidth'
      ],
    },
    {
      demoId: 'timeline-templete',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'templete',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>#item</code>配置时间线节点内容的模板。</p>',
        'en-US': '',
      },
      apis: ['TiTimelineComponent.slots.itemTemplate'],
    }
  ]
}
