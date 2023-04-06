export default {
  column: '2',
  demos: [
    {
      demoId: 'steps-base',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'base',
      },
      desc: {
        'zh-CN': '<p>Steps 组件的最简用法。</p>',
        'en-US': '',
      },
      apis: [
        'TiStepsComponent.properties.steps',
        'TiStepsComponent.properties.activeStep',
        'TiStepsComponent.properties.disabled',
      ],
    },
    {
      demoId: 'steps-clickable',
      name: {
        'zh-CN': '是否可点击跳转',
        'en-US': 'clickable',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>clickable</code>配置步骤是否可被点击跳转。</p>',
        'en-US': '',
      },
      apis: ['TiStepsComponent.properties.clickable'],
    },
    {
      demoId: 'steps-label',
      name: {
        'zh-CN': '显示文本',
        'en-US': 'labelkey',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置显示文本的键值。</p>',
        'en-US': '',
      },
      apis: ['TiStepsComponent.properties.labelKey'],
    },
    {
      demoId: 'steps-maxwidth',
      name: {
        'zh-CN': '文本最大宽度',
        'en-US': 'maxwidth',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>maxWidth</code>配置文本最大宽度。</p>',
        'en-US': '',
      },
      apis: ['TiStepsComponent.properties.maxWidth'],
    },
    {
      demoId: 'steps-adaptive',
      name: {
        'zh-CN': '宽度自适应',
        'en-US': 'adaptive',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>adaptive</code>配置宽度自适应。</p>',
        'en-US': '',
      },
      apis: ['TiStepsComponent.properties.adaptive'],
    },
    {
      demoId: 'steps-before',
      name: {
        'zh-CN': '必选项',
        'en-US': 'require',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>require</code>配置某一步骤为必选项。当点击必选步骤的时候触发<code>beforeStep</code>事件。</p>',
        'en-US': '',
      },
      apis: ['TiStepsComponent.events.beforeStep'],
    },
    {
      demoId: 'steps-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN':
          '<p>当步骤改变的时候触发<code>activeStepChange</code>事件。</p>',
        'en-US': '',
      },
      apis: ['TiStepsComponent.events.activeStepChange'],
    },
    {
      demoId: 'steps-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'custom template',
      },
      desc: {
        'zh-CN': '<p>通过<code>#icon</code>配置图标区域的模板，通过<code>#step</code>配置文本区域的模板。</p>',
        'en-US': '',
      },
    },
  ],
};
