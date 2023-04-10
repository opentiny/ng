export default {
  column: '2',

  demos: [
    {
      demoId: 'textarea-autofocus',
      name: {
        'zh-CN': '自动聚焦',
        'en-US': 'autofocus',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>autofocus</code>配置页面重新加载时是否自动聚焦。</p>',
        'en-US': '<p>autofocus</p>',
      },
    },
    {
      demoId: 'textarea-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'textarea disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '<p>disabled</p>',
      },
    },
    {
      demoId: 'textarea-maxlength',
      name: {
        'zh-CN': '限制可输入字数',
        'en-US': 'maxlength',
      },
      desc: {
        'zh-CN':
          ' <p>通过属性<code>maxlength</code>配置文本框可输入字符的最大长度。</p>',
        'en-US': '<p>maxlength</p>',
      },
    },
    {
      demoId: 'textarea-resize',
      name: {
        'zh-CN': '调整文本框大小',
        'en-US': 'resize',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>resize</code>配置文本框调整的方向，包含<code>none、vertical、horizontal</code>三种类型。</p>',
        'en-US': '<p>resize</p>',
      },
      apis: ['TiTextareaComponent.properties.resize'],
    },
  ],
};
