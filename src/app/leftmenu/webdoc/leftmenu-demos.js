export default {
  column: '1',
  demos: [
    {
      demoId: 'leftmenu-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>Leftmenu 组件的最简用法。</p>',
        'en-US': '<p>leftmenu basic</p>',
      },
      apis: [
        'TiLeftmenuComponent.properties.active',
        'TiLeftmenuLevel1Component.properties.item',
        'TiLeftmenuLevel2Component.properties.item',
      ],
    },
    {
      demoId: 'leftmenu-routerlist',
      name: {
        'zh-CN': '同一菜单下挂载多个路由',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>支持在同一菜单下挂载多个路由。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'leftmenu-params',
      name: {
        'zh-CN': '路由参数',
        'en-US': '',
      },
      desc: {
        'zh-CN':
        '<p>通过<code>TiLeftmenuItem</code>实例的<code>routerExtras</code>属性配置路由参数，更多配置请参考 <a href="https://angular.cn/api/router/NavigationExtras" target="blank">Angular 官方文档</a>。注意：如果需要在路由路径中携带参数，请在注册路由时使用冒号 <code>:</code> 表示路径参数，例如下方示例中定义了 <code>/:id</code>。更多路由配置请参考 <a href="https://angular.cn/guide/router-reference#configuration" target="blank">Angular 官方文档</a>。</p>',
        'en-US': '<p></p>',
      },
      codeFiles: [
        'leftmenu-params.html',
        'LeftmenuParamsComponent.ts',
        'RouterparamsComponent.ts',
      ],
    },
    {
      demoId: 'leftmenu-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置菜单的禁用状态。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiLeftmenuLevel1Component.properties.disabled',
        'TiLeftmenuLevel2Component.properties.disabled',
      ],
    },
    {
      demoId: 'leftmenu-reload-state',
      name: {
        'zh-CN': '路由刷新',
        'en-US': '',
      },
      desc: {
        'zh-CN':
        '<p>不设置属性<code>reloadState</code>，则点击当前已激活菜单时右侧内容区不会刷新。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiLeftmenuComponent.properties.reloadState',
      ],
    },
    {
      demoId: 'leftmenu-collapsed',
      name: {
        'zh-CN': '面板水平方向展开状态',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>collapsed</code>配置菜单面板水平方向的展开状态。当菜单面板水平方向折叠/展开状态改变的时候触发<code>collapsedChange</code>事件，传递参数为改变后面板是否处于折叠状态，true 表示面板被折叠，false 表示面板被展开。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiLeftmenuComponent.properties.collapsed',
        'TiLeftmenuComponent.events.collapsedChange',
      ],
    },
    {
      demoId: 'leftmenu-toggleable',
      name: {
        'zh-CN': '不可折叠面板',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>toggleable</code>配置菜单面板是否可以水平方向折叠。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiLeftmenuComponent.properties.toggleable',
      ],
    },
    {
      demoId: 'leftmenu-active-change',
      name: {
        'zh-CN': '切换激活菜单',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>支持通过监听菜单的 click 事件来拿到用户点击菜单的回调</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiLeftmenuComponent.events.activeChange'],
    },
    {
      demoId: 'leftmenu-href',
      name: {
        'zh-CN': '链接跳转',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>TiLeftmenuItem</code>实例的<code>href</code>属性配置链接地址。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'leftmenu-group',
      name: {
        'zh-CN': '分组展示',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>通过<code>LeftmenuGroup</code>组件对路由进行分组。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'leftmenu-foot',
      name: {
        'zh-CN': '自定义标题及底部',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>LeftmenuHead</code>组件配置菜单底部内容；通过<code>LeftmenuFoot</code>组件配置菜单底部内容。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'leftmenu-dividing',
      name: {
        'zh-CN': '分割线',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>TiLeftmenuItem</code>实例的<code>showDividingLine</code>属性配置分割线。注意：该属性仅对一级菜单生效。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'leftmenu-no-router',
      name: {
        'zh-CN': '关闭路由模式',
        'en-US': '',
      },
      desc: {
        'zh-CN':
        '<p>通过属性<code>routable</code>配置是否启用路由模式。注意：本组件路由使用 @angular/router，你可以通过 <a href="https://angular.cn/guide/routing-overview" target="blank">Angular 官方文档</a> 查看更多关于路由的内容。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiLeftmenuComponent.properties.routable'],
    },
  ],
};
