export default {
  column: '2',

  demos: [
    {
      demoId: 'switch-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Switch 组件的基本用法。</p>',
        'en-US': '<p>basic</p>',
      },
    },
    {
      demoId: 'switch-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '<p>disabled</p>',
      },
      apis: ['TiSwitchComponent.properties.disabled'],
    },
    {
      demoId: 'switch-before',
      name: {
        'zh-CN': '开关状态拦截',
        'en-US': 'beforeChange',
      },
      desc: {
        'zh-CN':
          '<p>当开关状态将要发生变化的时候触发<code>beforeChange</code>事件。</p>',
        'en-US': '<p>beforeChange</p>',
      },
      apis: ['TiSwitchComponent.events.beforeChange'],
    },
    {
      demoId: 'switch-explanation',
      name: {
        'zh-CN': '自定义文本',
        'en-US': 'explanation',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>onText</code>和<code>offText</code>配置开关时显示的文本。</p>',
        'en-US': '<p>explanation</p>',
      },
      apis: [
        'TiSwitchComponent.properties.onText',
        'TiSwitchComponent.properties.offText',
      ],
    },
    {
      demoId: 'switch-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'template',
      },
      desc: {
        'zh-CN':
          '<p>通过模板<code>on</code>和<code>off</code>配置开关时显示的自定义内容。</p>',
        'en-US': '<p>template</p>',
      },
      apis: [
        'TiSwitchComponent.slots.onTemplate',
        'TiSwitchComponent.slots.offTemplate',
      ],
    },
  ],
};
