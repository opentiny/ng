export default {
  column: '2',

  demos: [
    {
      demoId: 'inputnumber-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>InputNumber 指令的最简用法。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'inputnumber-format',
      name: {
        'zh-CN': '数字精度',
        'en-US': 'format',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>format</code>配置小数点位数，使用“n+数字”方式设置，数字代表保留几位小数。不配置 format 时，默认最少保留 0 位小数，最多保留 3 位小数。</p>',
        'en-US': '',
      },
      apis: ['TiInputNumberDirective.properties.format'],
    },
    {
      demoId: 'inputnumber-localeable',
      name: {
        'zh-CN': '国际化',
        'en-US': 'localeable',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>localeable</code>配置是否开启国际化。默认值为 true，开启国际化。</p>',
        'en-US': '',
      },
      apis: ['TiInputNumberDirective.properties.localeable'],
    },
    {
      demoId: 'inputnumber-maxlength',
      name: {
        'zh-CN': '可输入最大长度',
        'en-US': 'maxlength',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>maxlength</code>配置输入的最大字符数。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'inputnumber-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN':
          '<p>当元素聚焦的时候触发<code>focus</code>事件。当元素失焦的时候触发<code>blur</code>事件。当元素内容发生变化的时候触发<code>ngModelChange</code>事件。</p>',
        'en-US': '',
      },
    },
  ],
};
