export default {
  column: '2',
  demos: [
    {
      demoId: 'alert-type',
      name: {
        'zh-CN': 'alert告警类型',
        'en-US': 'alert type',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>type</code>配置 alert 警告的不同类型的外观，包括<code>success</code>（默认）、<code>prompt</code><code>warn</code>、<code>error</code>、<code>simple</code>五种类型。</p>',
        'en-US': '<p>alert type description</p>',
      },
      apis: ['TiAlertComponent.properties.type'],
    },
    {
      demoId: 'alert-darktheme',
      name: {
        'zh-CN': '深色主题',
        'en-US': 'darkTheme',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>darkTheme</code>配置 alert 警告的深色样式。<code>success</code>和<code>prompt</code>类型默认的消失时间是 5000ms，<code>warn</code>和<code>error</code>类型默认的消失时间是 10000ms。</p>',
        'en-US': '<p>darkTheme</p>',
      },
      apis: ['TiAlertComponent.properties.darkTheme'],
    },
    {
      demoId: 'alert-dismiss',
      name: {
        'zh-CN': '5000ms 后消失',
        'en-US': 'dismissOnTimeout',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>dismissOnTimeout</code>配置 alert 警告经过 5000ms 时间后自动消失。</p>',
        'en-US': '<p>dismissOnTimeout</p>',
      },
      apis: ['TiAlertComponent.properties.dismissOnTimeout'],
    },
    {
      demoId: 'alert-icon',
      name: {
        'zh-CN': '图标隐藏',
        'en-US': 'iconhidden',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>typeIcon</code>配置类型图标是否显示。通过属性<code>closeIcon</code>配置关闭图标是否显示。</p>',
        'en-US': '<p>icon</p>',
      },
      apis: [
        'TiAlertComponent.properties.typeIcon',
        'TiAlertComponent.properties.closeIcon',
      ],
    },
    {
      demoId: 'alert-open',
      name: {
        'zh-CN': '控制 alert 警告的显示与隐藏',
        'en-US': 'open',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>open</code>配置 alert 警告的显示与隐藏状态。当 alert 的<code>open</code>属性改变的时候触发<code>openChange</code>事件。</p>',
        'en-US': '<p>open</p>',
      },
      apis: [
        'TiAlertComponent.properties.open',
        'TiAlertComponent.events.openChange',
      ],
    },
    {
      demoId: 'alert-size',
      name: {
        'zh-CN': '大小',
        'en-US': 'size',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>size</code>配置 alert 警告显示的大小。</p>',
        'en-US': '<p>size</p>',
      },
      apis: ['TiAlertComponent.properties.size'],
    },
    {
      demoId: 'alert-messages',
      name: {
        'zh-CN': '轮播',
        'en-US': 'autoplay',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>autoplay</code>配置 alert 警告是否轮播。通过属性<code>autoplaySpeed</code>配置 alert 警告轮播的速度。仅支持<code>prompt</code>和<code>simple</code>两种类型。</p>',
        'en-US': '<p>autoplay</p>',
      },
      apis: [
        'TiAlertComponent.properties.autoplay',
        'TiAlertComponent.properties.autoplaySpeed',
      ],
    },
    {
      demoId: 'alert-trigger-scroll',
      name: {
        'zh-CN': 'alert 消失时下拉面板收起',
        'en-US': 'triggerScroll',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>triggerScroll</code>配置 alert 警告消失时下拉面板收起。</p>',
        'en-US': '<p>triggerScroll</p>',
      },
      apis: ['TiAlertComponent.properties.triggerScroll'],
    },
  ],
};
