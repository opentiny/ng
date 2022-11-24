export default {
  column: '2',

  demos: [
    {
      demoId: 'text-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Text 组件的最简用法。</p>',
        'en-US': '<p>basic</p>',
      },
    },
    {
      demoId: 'text-clear',
      name: {
        'zh-CN': '清除功能',
        'en-US': 'clear',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>clearable</code>配置一键清除功能。</p>',
        'en-US': '<p>clear</p>',
      },
      apis: ['TiTextComponent.properties.clearable'],
    },
    {
      demoId: 'text-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'text disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '<p>disabled</p>',
      },
    },
    {
      demoId: 'text-focus',
      name: {
        'zh-CN': '聚焦',
        'en-US': 'focus',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>autofocus</code>配置页面重新加载时是否自动聚焦。</p>',
        'en-US': '<p>focus</p>',
      },
    },
    {
      demoId: 'text-password',
      name: {
        'zh-CN': '密码框',
        'en-US': 'password',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>type = "password"</code>配置为密码框。通过<code>noeye</code>属性配置为密码不显示。</p>',
        'en-US': '<p>password</p>',
      },
      apis: [
        'TiTextComponent.properties.type',
        'TiTextComponent.properties.noeye',
      ],
    },
    {
      demoId: 'text-password-visible',
      name: {
        'zh-CN': '密码是否可见',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>passwordVisible</code>属性配置密码是否可见，默认不可见。当密码可见状态改变的时候触发<code>passwordVisibleChange</code>事件。</p>',
        'en-US': '<p>reactive</p>',
      },
      apis: [
        'TiTextComponent.properties.passwordVisible',
        'TiTextComponent.events.passwordVisibleChange',
      ],
    },
    {
      demoId: 'text-maskinput',
      name: {
        'zh-CN': '格式化输入',
        'en-US': 'maskinput',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>tiMask</code>配置其输入框数字的格式；输入框中呈现的是格式化后的数字，但是通过<code>ngModel<code>取得的值为纯数字。',
        'en-US': '',
      },
      apis: ['TiMaskDirective.properties.tiMask'],
    },
    {
      demoId: 'text-readonly',
      name: {
        'zh-CN': '只读状态',
        'en-US': 'readonly',
      },
      desc: {
        'zh-CN': '<p>通过<code>readonly</code>属性配置只读状态。</p>',
        'en-US': '<p>readonly</p>',
      },
    },
    {
      demoId: 'text-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN':
          '<p>当元素聚焦的时候触发<code>focus</code>事件。当元素失焦的时候触发<code>blur</code>事件。当元素内容发生变化的时候的时候触发<code>ngModelChange</code>事件。当点击清除图标的时候触发<code>clear</code>事件。</p>',
        'en-US': '<p>events</>',
      },
      apis: ['TiTextComponent.events.clear'],
    },
    {
      demoId: 'text-reactive',
      name: {
        'zh-CN': '响应式表单',
        'en-US': 'reactive-form',
      },
      desc: {
        'zh-CN': '<p>响应式表单的基本用法</p>',
        'en-US': '<p>reactive</p>',
      },
    },
  ],
};
