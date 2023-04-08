export default {
  column: '2',
  demos: [
    {
      demoId: 'notification-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>Notification 组件的最简用法。</p>',
        'en-US': '<p></p>'
      }
    },
    {
      demoId: 'notification-type',
      name: {
        'zh-CN': '通知类型',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN':
          '<p>通过调用<code>TiNotificationService</code>的不同方法来弹出不同类型的通知，包括：<code>success</code>、<code>prompt</code>、<code>warn</code>、<code>error</code>、<code>simple</code>。</p>',
        'en-US': '<p></p>'
      },
      apis: [
        'TiNotificationService.methods.success',
        'TiNotificationService.methods.prompt',
        'TiNotificationService.methods.warn',
        'TiNotificationService.methods.error',
        'TiNotificationService.methods.simple'
      ]
    },
    {
      demoId: 'notification-template',
      name: {
        'zh-CN': '自定义内容',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过调用<code>TiNotificationService</code>的<code>template</code>方法来自定义通知弹窗内容。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNotificationService.methods.template']
    },
    {
      demoId: 'notification-duration',
      name: {
        'zh-CN': '自动关闭时间',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>duration</code>配置通知自动关闭的时间，单位为毫秒；注意：当设置为 0 时表示不自动关闭。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNoticeConfig.properties.duration']
    },
    {
      demoId: 'notification-position',
      name: {
        'zh-CN': '弹出位置',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>position</code>配置弹出位置，包括<code>top-right</code>、<code>top</code>、<code>top-left</code>、<code>bottom-left</code>、<code>bottom</code>、<code>bottom-right</code>。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNoticeConfig.properties.position']
    },
    {
      demoId: 'notification-animation',
      name: {
        'zh-CN': '禁用动画',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>animation</code>配置是否使用动画，默认开启动画，当配置为 false 禁用动画。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNoticeConfig.properties.animation']
    },
    {
      demoId: 'notification-hover-pause',
      name: {
        'zh-CN': '鼠标悬停时暂停自动关闭计时',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>hoverPause</code>配置是否在鼠标悬停在通知弹窗上时暂停自动关闭的计时。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNoticeConfig.properties.hoverPause']
    },
    {
      demoId: 'notification-name',
      name: {
        'zh-CN': '更新消息内容',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>name</code>配置通知弹窗标识，后续通过唯一的<code>name</code>更新通知弹窗内容。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNoticeConfig.properties.name']
    },
    {
      demoId: 'notification-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>onClose</code>配置通知弹窗关闭时的回调函数。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNoticeConfig.properties.onClose']
    },
    {
      demoId: 'notification-close',
      name: {
        'zh-CN': '关闭通知弹窗',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>TiNotificationService</code>的打开通知弹窗方法，会返回一个可关闭对象，调用这个对象的<code>close</code>方法来关闭对应的通知弹窗。同时，你也可以通过<code>TiNotificationService.closeAll()</code>来关闭</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNotificationService.methods.closeAll']
    },
    {
      demoId: 'notification-config',
      name: {
        'zh-CN': '配置弹窗距顶底距离',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN':
          '<p>通过调用<code>TiNotificationService</code>的<code>config</code>方法来配置通知弹窗距离顶部或底部的距离，接受配置：<code>top</code>、<code>bottom</code>。</p>',
        'en-US': '<p></p>'
      },
      apis: ['TiNotificationService.methods.config']
    }
  ]
};
