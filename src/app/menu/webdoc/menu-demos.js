export default {
  column: '2',
  demos: [
    {
      demoId: 'menu-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Menu 组件的基本用法。',
        'en-US': '<p>basic</p>',
      },
      apis: [
        'TiMenuComponent.properties.items',
        'TiMenuItem.properties.children',
        'TiMenuItem.properties.id',
        'TiMenuItem.properties.label',
      ],
    },
    {
      demoId: 'menu-buttoncolor',
      name: {
        'zh-CN': '按钮颜色',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>color</code>配置按钮下拉类型菜单的按钮颜色，包括<code>default</code>、<code>danger</code>。',
        'en-US': '',
      },
      apis: ['TiMenuComponent.properties.color'],
    },
    {
      demoId: 'menu-labelkey',
      name: {
        'zh-CN': '显示文本',
        'en-US': 'labelkey',
      },
      desc: {
        'zh-CN': '通过属性<code>labelKey</code>配置要显示文本的键值。',
        'en-US': '<p>labelKey</p>',
      },
      apis: ['TiMenuComponent.properties.labelKey'],
    },
    {
      demoId: 'menu-group',
      name: {
        'zh-CN': '分组',
        'en-US': 'groupId',
      },
      desc: {
        'zh-CN': '通过<code>item.groupId</code>配置下拉菜单项分组。',
        'en-US': '<p>groupId</p>',
      },
      apis: ['TiMenuItem.properties.groupId'],
    },
    {
      demoId: 'menu-panelalign',
      name: {
        'zh-CN': '下拉面板对齐方向',
        'en-US': 'panelAlign',
      },
      desc: {
        'zh-CN':
          '通过属性<code>panelAlign</code>配置下拉面板对齐方向，包括<code>left</code>、<code>right</code>。',
        'en-US': '<p>panelAlign</p>',
      },
      apis: ['TiMenuComponent.properties.panelAlign'],
    },
    {
      demoId: 'menu-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>disabled</code>配置是否为禁用状态；通过属性<code>item.disabled</code>配置当前下拉选项是否为禁用状态。',
        'en-US': '<p>disabled</p>',
      },
      apis: [
        'TiMenuComponent.properties.disabled',
        'TiMenuItem.properties.disabled',
      ],
    },
    {
      demoId: 'menu-tips',
      name: {
        'zh-CN': '提示信息',
        'en-US': 'menu tips',
      },
      desc: {
        'zh-CN':
          '通过属性<code>item.tip</code>配置当前菜单项提示信息；通过属性<code>item.tipPosition</code>配置当前菜单项提示信息弹出方向；通过属性<code>tipMaxWidth</code>配置各菜单项提示信息最大宽度。',
        'en-US': '<p>menu tips description</p>',
      },
      apis: [
        'TiMenuItem.properties.tip',
        'TiMenuItem.properties.tipPosition',
        'TiMenuComponent.properties.tipMaxWidth',
      ],
    },
    {
      demoId: 'menu-panelstyle',
      name: {
        'zh-CN': '下拉面板样式',
        'en-US': 'menu panelstyle',
      },
      desc: {
        'zh-CN':
          '通过属性<code>panelMaxWidth</code>配置下拉面板最大宽度；通过属性<code>panelMaxHeight</code>配置下拉面板最大高度。',
        'en-US': '<p>menu panelstyle description</p>',
      },
      apis: [
        'TiMenuComponent.properties.panelMaxWidth',
        'TiMenuComponent.properties.panelMaxHeight',
      ],
    },
    {
      demoId: 'menu-beforeopen',
      name: {
        'zh-CN': '懒加载',
        'en-US': 'lazy',
      },
      desc: {
        'zh-CN':
          '当下拉面板展开前触发<code>beforeOpen</code>事件，传递出去的参数为组件实例（TiMenuComponent）。',
        'en-US': '<p>lazy</p>',
      },
      apis: [
        'TiMenuComponent.events.beforeOpen',
        'TiMenuComponent.methods.open',
      ],
    },
    {
      demoId: 'menu-templete',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'custom template',
      },
      desc: {
        'zh-CN':
          '通过<code>#item</code>配置下拉面板中选项的模板；通过<code>#tip</code>配置当前菜单项提示信息的模板。',
        'en-US': '<p>custom template description</p>',
      },
      apis: [
        'TiMenuComponent.slots.itemTemplate',
        'TiMenuComponent.slots.tipTemplate',
      ],
    },
    {
      demoId: 'menu-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN':
          '当选中菜单项时触发<code>select</code>事件，传递出去的参数为当前选中项的数据。',
        'en-US': '<p>event</p>',
      },
      apis: ['TiMenuComponent.events.select'],
    },
  ],
};
