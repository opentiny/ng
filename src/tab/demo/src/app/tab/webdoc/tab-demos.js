export default {
  column: '2',
  demos: [
    {
      demoId: 'tab-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Tabs 组件的最简用法。</p>',
        'en-US': '',
      },
      apis: [
        'TiTabComponent.properties.disabled',
        'TiTabComponent.properties.active',
      ],
    },
    {
      demoId: 'tab-dark',
      name: {
        'zh-CN': '深色背景',
        'en-US': 'dark',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>dark</code>配置深色背景页签。</p>',
        'en-US': '',
      },
      apis: ['TiTabComponent.properties.dark'],
    },
    {
      demoId: 'tab-small',
      name: {
        'zh-CN': '小尺寸页签',
        'en-US': 'small',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>small</code>配置小尺寸页签。</p>',
        'en-US': '',
      },
      apis: ['TiTabComponent.properties.small'],
    },
    {
      demoId: 'tab-level2',
      name: {
        'zh-CN': '二级页签',
        'en-US': 'level2',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>level2</code>配置二级页签。</p>',
        'en-US': '',
      },
      apis: ['TiTabComponent.properties.level2'],
    },
    {
      demoId: 'tab-custom-head',
      name: {
        'zh-CN': '自定义页签头部',
        'en-US': 'custom head',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>ti-tab-header</code>标签自定义当前页签头部。</p>',
        'en-US': '',
      },
      apis: ['TiTabComponent.properties.header'],
    },
    {
      demoId: 'tab-overflow',
      name: {
        'zh-CN': '页签超长下拉展示',
        'en-US': 'overflow',
      },
      desc: {
        'zh-CN':
          '<p>使用大量选项卡切换的场景。通过属性<code>panelWidth</code>配置下拉面板的宽度，包含<code>auto</code>、<code>justified</code>、<code>string</code>三种类型。通过属性<code>panelMaxHeight</code>配置下拉面板的最大高度。通过<code>panelAlign</code>配置面板对齐方式。</p>',
        'en-US': '',
      },
      apis: [
        'TiTabsComponent.properties.panelWidth',
        'TiTabsComponent.properties.panelMaxHeight',
        'TiTabsComponent.properties.panelAlign',
      ],
    },
    {
      demoId: 'tab-lazy-load',
      name: {
        'zh-CN': '懒加载',
        'en-US': 'lazyload',
      },
      desc: {
        'zh-CN':
          '<p>通过 ng-template 标签包裹懒加载的内容区，并且加上<code>#tiTabContent</code>标识。当页签初次激活时，才会加载对应的内容。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'tab-route',
      name: {
        'zh-CN': '路由',
        'en-US': 'route',
      },
      desc: {
        'zh-CN': '<p>Tabs 组件只用作头部导航展示，内容区由路由控制。</p>',
        'en-US': '',
      },
    },
    {
      demoId: 'tab-beforeactivechange',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN':
          '<p>切换页签之前触发<code>beforeActiveChange</code>事件。当切换页签时触发<code>activeChange</code>事件。</p>',
        'en-US': '',
      },
      apis: [
        'TiTabComponent.events.activeChange',
        'TiTabComponent.events.beforeActiveChange',
        'TiTabsComponent.methods.changeActive',
      ],
    },
  ],
};
