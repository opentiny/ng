export default {
  column: '2',

  demos: [
    {
      demoId: 'crumb-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': '<p>Crumb 组件的最简用法。</p>',
        'en-US': ''
      },
      apis: [
        'TiCrumbComponent.properties.items',
        'TiLink.properties.label'
      ],
    },
    {
      demoId: 'crumb-href',
      name: {
        'zh-CN': '链接跳转',
        'en-US': 'href'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>item.href</code>配置导航项跳转链接地址；通过属性<code>item.target</code>配置导航项链接打开方式。</p>',
        'en-US': ''
      },
      apis: [
        'TiLink.properties.href',
        'TiLink.properties.target'
      ],
    },
    {
      demoId: 'crumb-router',
      name: {
        'zh-CN': '路由跳转',
        'en-US': 'router'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>item.routerLink</code>配置导航项跳转路由；通过属性<code>item.queryParams</code>配置导航项跳转路由参数。</p>',
        'en-US': ''
      },
      apis: [
        'TiLink.properties.routerLink',
        'TiLink.properties.queryParams'
      ],
    },
    {
      demoId: 'crumb-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'events'
      },
      desc: {
        'zh-CN': '<p>当选中非最后一级导航项的时候触发<code>select</code>事件，传递出去的参数为当前选中项的数据。</p>',
        'en-US': ''
      },
      apis: ['TiCrumbComponent.events.select'],
    }
  ],
};
