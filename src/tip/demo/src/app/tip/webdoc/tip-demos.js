export default {
  column: '2',
  demos: [
    {
      demoId: 'tip-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'tiTip',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>tiTip</code>配置气泡提示内容。</p>',
        'en-US': '<p>tiTip</p>',
      },
      apis: ['TiTipDirective.properties.tiTip'],
    },
    {
      demoId: 'tip-content-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'tiTipContext',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipContext</code>配置显示内容对应的上下文。</p>',
        'en-US': '<p>button color</p>',
      },
      apis: ['TiTipDirective.properties.tiTipContext'],
    },
    {
      demoId: 'tip-content-comp',
      name: {
        'zh-CN': '内容为组件',
        'en-US': 'component',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipContext</code>配置显示内容对应的上下文，适用于 tip 内容较复杂且多个页面中共用的场景。</p>',
        'en-US': '<p>item</p>',
      },
      apis: ['TiTipDirective.properties.tiTipContext'],
    },
    {
      demoId: 'tip-has-arrow',
      name: {
        'zh-CN': '气泡提示不带箭头',
        'en-US': 'hasArrow',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>tiTipHasArrow</code>配置是否带箭头。</p>',
        'en-US': '<p>item</p>',
      },
      apis: ['TiTipDirective.properties.tiTipHasArrow'],
    },
    {
      demoId: 'tip-position',
      name: {
        'zh-CN': '位置',
        'en-US': 'position',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>tiTipPosition</code>配置 tip 显示位置。</p>',
        'en-US': '<p>item</p>',
      },
      apis: ['TiTipDirective.properties.tiTipPosition', 'TiPositionType'],
    },
    {
      demoId: 'tip-max-width',
      name: {
        'zh-CN': '最大宽度',
        'en-US': 'position',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipMaxWidth</code>配置 tip 的最大宽度。</p>',
        'en-US': '<p>item</p>',
      },
      apis: ['TiTipDirective.properties.tiTipMaxWidth'],
    },
    {
      demoId: 'tip-service',
      name: {
        'zh-CN': '服务生成',
        'en-US': 'position',
      },
      desc: {
        'zh-CN': '<p>通过服务的方式生成 tip。</p>',
        'en-US': '<p>item</p>',
      },
      apis: [
        'TiTipService.methods.create',
        'TiTipDirective.methods.hide',
        'TiTipDirective.methods.show',
        'TiTipShowInfo',
      ],
    },
    {
      demoId: 'tip-zindex',
      name: {
        'zh-CN': '层级',
        'en-US': 'position',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipZIndex</code>配置 tip 的 z-index 属性值。</p>',
        'en-US': '<p>item</p>',
      },
      apis: ['TiTipDirective.properties.tiTipZIndex'],
    },
    {
      demoId: 'tip-trigger',
      name: {
        'zh-CN': '点击触发',
        'en-US': 'trigger',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipTrigger</code>配置 tip 的生成方式。</p>',
        'en-US': '<p>item</p>',
      },
      apis: ['TiTipDirective.properties.tiTipTrigger'],
    },
  ],
};
