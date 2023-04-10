export default {
  column: '1',

  demos: [
    {
      demoId: 'slider-limits',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'limits',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>min</code>、<code>max</code>配置滑动条的范围；通过属性<code>step</code>配置滑动条拖动时的最小间隔。</p>',
        'en-US': '<p>limits</p>',
      },
      apis: [
        'TiSliderComponent.properties.max',
        'TiSliderComponent.properties.min',
        'TiSliderComponent.properties.step',
      ],
    },
    {
      demoId: 'slider-formcontrol',
      name: {
        'zh-CN': '响应式表单',
        'en-US': 'formcontrol',
      },
      desc: {
        'zh-CN': '<p>响应式表单的用法。</p>',
        'en-US': '<p>formcontrol</p>',
      },
    },
    {
      demoId: 'slider-scales',
      name: {
        'zh-CN': '显示文本',
        'en-US': 'scales',
      },
      desc: {
        'zh-CN':
          '</p>通过属性<code>scales</code>配置滑动条刻度的显示文本；可使用 Array 和 Function 两种方式。</p>',
        'en-US': '<p>scales</p>',
      },
      apis: ['TiSliderComponent.properties.scales'],
    },
    {
      demoId: 'slider-template',
      name: {
        'zh-CN': '自定义文本',
        'en-US': 'template',
      },
      desc: {
        'zh-CN': '</p>通过模板<code>scale</code>配置刻度显示文本。</p>',
        'en-US': '<p>template</p>',
      },
      apis: ['TiSliderComponent.slots.labelTemplate'],
    },
    {
      demoId: 'slider-ratios',
      name: {
        'zh-CN': '不均匀分配的滑动条',
        'en-US': 'ratios',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>ratios</code>配置滑动条每段所占长度比。</p>',
        'en-US': '<p>ratios</p>',
      },
      apis: ['TiSliderComponent.properties.ratios'],
    },
    {
      demoId: 'slider-tip',
      name: {
        'zh-CN': '提示',
        'en-US': 'tip',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tipMode</code>配置 tip 的显示方式，包括<code>auto</code>、<code>always</code>两种类型；通过属性<code>tipFormatterFn</code>配置 tip 的显示文本。</p>',
        'en-US': '<p>tip</p>',
      },
      apis: [
        'TiSliderComponent.properties.tipMode',
        'TiSliderComponent.properties.tipFormatterFn',
      ],
    },
    {
      demoId: 'slider-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN':
          '<p>当绑定的值变化停止的时候触发<code>changeStop</code>事件，传递出去的参数为：停止时的值。</p>',
        'en-US': '<p>event</p>',
      },
      apis: ['TiSliderComponent.events.changeStop'],
    },
  ],
};
