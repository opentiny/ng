export default {
  column: '2',
  demos: [
    {
      demoId: 'halfmodal-basic',
      name: {
        'zh-CN': '基础',
        'en-US': 'halfmodal basic'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>width</code>配置半屏弹窗宽度;通过属性<code>clientRectTop</code>配置半屏弹窗顶部距窗口顶部的距离;通过属性<code>closeIcon</code>配置是否显示右上角的关闭按钮;通过属性<code>nomaskCloseable</code>配置不带遮罩层的场景下，点击页面是否允许关闭。</p>',
        'en-US': 'halfmodal basic'
      },
      apis: [
        'TiHalfmodalComponent.properties.width',
        'TiHalfmodalComponent.properties.clientRectTop',
        'TiHalfmodalComponent.properties.closeIcon',
        'TiHalfmodalComponent.properties.nomaskCloseable'
       ]
    },
    {
      demoId: 'halfmodal-backdrop',
      name: {
        'zh-CN': '遮罩',
        'en-US': 'halfmodal backdrop'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>backdrop</code>配置是否带有遮罩层。</p>',
        'en-US': 'halfmodal backdrop'
      },
      apis: [ 'TiHalfmodalComponent.properties.backdrop' ]
    },
    {
      demoId: 'halfmodal-beforehide',
      name: {
        'zh-CN': 'beforeHide事件',
        'en-US': 'halfmodal beforehide'
      },
      desc: {
        'zh-CN': '<p>当半屏弹窗将要关闭的时候触发<code>beforeHide</code>事件，如果增加该事件需要业务手动关闭半屏弹窗。</p>',
        'en-US': 'halfmodal beforehide'
      },
      apis: [ 'TiHalfmodalComponent.events.beforeHide' ]
    },
    {
      demoId: 'halfmodal-content',
      name: { 'zh-CN': '使用头部、内容和底部标签', 'en-US': 'halfmodal content' },
      desc: {
        'zh-CN': '<p>可以结合<code>ti-halfmodal-header</code>、<code>ti-halfmodal-body</code>和<code>ti-halfmodal-footer</code>标签使用。</p>',
        'en-US': 'halfmodal content'
      },
      apis: [
        'TiHalfmodalBodyComponent',
        'TiHalfmodalFooterComponent',
        'TiHalfmodalHeaderComponent'
       ]
    },
    {
      demoId: 'halfmodal-service',
      name: {
        'zh-CN': '服务方式生成半屏弹窗',
        'en-US': 'halfmodal service'
       },
      desc: {
        'zh-CN': '<p>通过服务方式生成半屏弹窗。</p>',
        'en-US': 'halfmodal service'
      },
      apis: [
        'TiHalfmodalService',
        'TiHalfmodalRef',
        'TiHalfmodalConfig'
      ]
    }
  ]
}