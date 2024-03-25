export default {
  column: '2',
  demos: [
    {
      demoId: 'modal-content-temp',
      name: {
        'zh-CN': '弹出框内容为 template 形式',
        'en-US': 'template'
      },
      desc: {
        'zh-CN': '<p>使用了<code>ng-template</code>方式自定义弹出框模板。</p>',
        'en-US': '<p>template</p>'
      },
      apis: ['TiModalConfig.properties.id']
    },
    {
      demoId: 'modal-content-comp',
      name: {
        'zh-CN': '弹出框内容定义为组件形式',
        'en-US': 'component'
      },
      desc: {
        'zh-CN': '<p>弹出框内容定义为组件形式时，open 方法传入对应的组件类即可。</p>',
        'en-US': '<p>component</p>'
      },
      apis: ['TiModalConfig.properties.context', 'TiModalConfig.methods.close', 'TiModalConfig.methods.dismiss']
    },
    {
      demoId: 'modal-class',
      name: {
        'zh-CN': '自定义弹出框样式',
        'en-US': 'modalClass'
      },
      desc: {
        'zh-CN': '<p>通过<code>modalClass</code>自定义弹出框样式。</p>',
        'en-US': 'modalClass'
      },
      apis: ['TiModalConfig.properties.modalClass']
    },
    {
      demoId: 'modal-animation',
      name: {
        'zh-CN': '显示/隐藏不带动画效果',
        'en-US': 'animation'
      },
      desc: {
        'zh-CN': '<p>通过<code>animation</code>控制弹出框显示/隐藏是否带动画效果。</p>',
        'en-US': 'animation'
      },
      apis: ['TiModalConfig.properties.animation']
    },
    {
      demoId: 'modal-backdrop',
      name: {
        'zh-CN': '不呈现模态背景',
        'en-US': 'backdrop'
      },
      desc: {
        'zh-CN': '<p>通过<code>backdrop</code>控制是否呈现模态背景。</p>',
        'en-US': 'backdrop'
      },
      apis: ['TiModalConfig.properties.backdrop']
    },
    {
      demoId: 'modal-close-icon',
      name: {
        'zh-CN': '头部不呈现关闭按钮',
        'en-US': 'closeIcon'
      },
      desc: {
        'zh-CN': '<p>通过<code>closeIcon</code>头部是否有关闭按钮。</p>',
        'en-US': 'closeIcon'
      },
      apis: ['TiModalConfig.properties.closeIcon']
    },
    {
      demoId: 'modal-draggable',
      name: {
        'zh-CN': '不可拖拽',
        'en-US': 'draggable'
      },
      desc: {
        'zh-CN': '<p>通过<code>draggable</code>控制弹出框是否可拖拽。</p>',
        'en-US': 'draggable'
      },
      apis: ['TiModalConfig.properties.draggable']
    },
    {
      demoId: 'modal-esc',
      name: {
        'zh-CN': 'Esc 键弹出框不关闭',
        'en-US': 'closeOnEsc'
      },
      desc: {
        'zh-CN': '<p>通过<code>closeOnEsc</code>控制按 Esc 键弹出框是否关闭。</p>',
        'en-US': 'closeOnEsc'
      },
      apis: ['TiModalConfig.properties.closeOnEsc']
    },
    {
      demoId: 'modal-header-align',
      name: {
        'zh-CN': '头部水平居中',
        'en-US': 'headerAlign'
      },
      desc: {
        'zh-CN': '<p>通过<code>headerAlign</code>配置头部内容水平对齐方式。</p>',
        'en-US': 'headerAlign'
      },
      apis: ['TiModalConfig.properties.headerAlign']
    },
    {
      demoId: 'modal-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'beforeClose'
      },
      desc: {
        'zh-CN': '<p>通过<code>beforeClose</code>配置关闭弹出框前的回调函数。</p>',
        'en-US': 'beforeClose'
      },
      apis: ['TiModalConfig.methods.beforeClose', 'TiModalConfig.methods.close', 'TiModalConfig.methods.dismiss']
    }
  ]
};
