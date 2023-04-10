export default {
  column: '2',

  demos: [
    {
      demoId: 'spinner-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Spinner 组件的最简用法。</p>',
        'en-US': '',
      },
      apis: [
        'TiSpinnerComponent.properties.min',
        'TiSpinnerComponent.properties.max',
        'TiSpinnerComponent.properties.placeholder',
      ],
    },
    {
      demoId: 'spinner-format',
      name: {
        'zh-CN': '数字精度',
        'en-US': 'format',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>format</code>配置小数点位数，使用“n(N)+数字”方式设置，数字代表保留几位小数。</p>',
        'en-US': '',
      },
      apis: ['TiSpinnerComponent.properties.format'],
    },
    {
      demoId: 'spinner-localeable',
      name: {
        'zh-CN': '国际化',
        'en-US': 'localeable',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>localeable</code>配置是否开启国际化。</p>',
        'en-US': '',
      },
      apis: ['TiSpinnerComponent.properties.localeable'],
    },
    {
      demoId: 'spinner-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '',
      },
      apis: ['TiSpinnerComponent.properties.disabled'],
    },
    {
      demoId: 'spinner-step',
      name: {
        'zh-CN': '步长',
        'en-US': 'step',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>step</code>配置微调器的步长。</p>',
        'en-US': '',
      },
      apis: ['TiSpinnerComponent.properties.step'],
    },
    {
      demoId: 'spinner-stepfn',
      name: {
        'zh-CN': '动态步长',
        'en-US': 'stepfn',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>stepFn</code>动态配置步长。传递出来的参数为当前值、当前是否点击了加号按钮。</p>',
        'en-US': '',
      },
      apis: ['TiSpinnerComponent.properties.stepFn'],
    },
    {
      demoId: 'spinner-maxlength',
      name: {
        'zh-CN': '允许的最大字符数',
        'en-US': 'maxlength',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>maxlength</code>配置输入框中允许的最大字符数。</p>',
        'en-US': '',
      },
      apis: ['TiSpinnerComponent.properties.maxlength'],
    },
    {
      demoId: 'spinner-tip',
      name: {
        'zh-CN': 'tip提示',
        'en-US': 'tip',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tipContent</code>配置提示内容。通过属性<code>tipPosition</code>配置提示方向。</p>',
        'en-US': '',
      },
      apis: [
        'TiSpinnerComponent.properties.tipContent',
        'TiSpinnerComponent.properties.tipPosition',
      ],
    },
    {
      demoId: 'spinner-validation',
      name: {
        'zh-CN': '校验',
        'en-US': 'validation',
      },
      desc: {
        'zh-CN':
          '<p>通过指令<code>tiValidation</code>实现校验。如果要对最大最小值进行校验就不要给 ti-spinner 设置<code>min</code>和<code>max</code>。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'spinner-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN':
          '<p>当元素内容发生变化的时候触发<code>ngModelChange</code>事件。</p>',
        'en-US': 'spinner event description',
      },
    },
  ],
};
