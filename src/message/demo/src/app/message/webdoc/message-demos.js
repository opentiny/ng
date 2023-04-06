export default {
  column: '2',
  demos: [
    {
      demoId: 'message-type',
      name: {
        'zh-CN': '消息弹框类型',
        'en-US': 'type',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>type</code>配置消息弹框类型，包含<code>confirm</code>、<code>prompt</code>、<code>warn</code>、<code>error</code>类型。</p>',
        'en-US': '<p>button color</p>',
      },
      apis: ['TiMessageConfig.properties.type'],
    },
    {
      demoId: 'message-title',
      name: {
        'zh-CN': '自定义标题',
        'en-US': 'title',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>title</code>配置消息弹框标题。</p>',
        'en-US': '<p>title</p>',
      },
      apis: ['TiMessageConfig.properties.title'],
    },
    {
      demoId: 'message-content',
      name: {
        'zh-CN': '内容',
        'en-US': 'content',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>content</code>配置内容，支持设置为字符串/ template 模板/组件形式。</p>',
        'en-US': 'content',
      },
      apis: [
        'TiMessageConfig.properties.content',
        'TiMessageConfig.properties.context',
      ],
    },
    {
      demoId: 'message-btn',
      name: {
        'zh-CN': '确认、取消按钮配置',
        'en-US': 'button',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>okButton</code>配置确认按钮，通过<code>cancelButton</code>配置取消按钮。</p>',
        'en-US': 'button',
      },
      apis: [
        'TiMessageConfig.properties.okButton',
        'TiMessageConfig.properties.cancelButton',
        'TiMessageButtonConfig.properties.text',
        'TiMessageButtonConfig.properties.primary',
        'TiMessageButtonConfig.properties.show',
        'TiMessageButtonConfig.properties.autofocus',
        'TiMessageButtonConfig.properties.disabled',
        'TiMessageButtonConfig.methods.click',
      ],
    },
  ],
};
