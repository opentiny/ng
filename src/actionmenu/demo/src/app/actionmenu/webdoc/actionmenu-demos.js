export default {
  column: '2',
  demos: [
    {
      demoId: 'actionmenu-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Actionmenu 组件的基本用法。',
        'en-US': '<p>basic</p>',
      },
      apis: [
        'TiActionmenuComponent.properties.items',
        'TiMenuItem.properties.children',
        'TiMenuItem.properties.id',
        'TiMenuItem.properties.label',
      ],
    },
    {
      demoId: 'actionmenu-labelkey',
      name: {
        'zh-CN': '显示文本',
        'en-US': 'labelkey',
      },
      desc: {
        'zh-CN': '通过属性<code>labelKey</code>配置要显示文本的键值。',
        'en-US': '<p>labelKey</p>',
      },
      apis: ['TiActionmenuComponent.properties.labelKey'],
    },
    {
      demoId: 'actionmenu-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN':
          '通过属性<code>item.disabled</code>配置当前下拉选项是否为禁用状态。',
        'en-US': '<p>disabled</p>',
      },
      apis: [
        'TiActionmenuComponent.properties.disabled',
        'TiMenuItem.properties.disabled',
      ],
    },
    {
      demoId: 'actionmenu-tips',
      name: {
        'zh-CN': '提示信息',
        'en-US': 'tips',
      },
      desc: {
        'zh-CN':
          '通过属性<code>item.tip</code>配置当前菜单项提示信息；通过属性<code>item.tipPosition</code>配置当前菜单项提示信息弹出方向；通过属性<code>tipMaxWidth</code>配置各菜单项提示信息最大宽度。',
        'en-US': '<p>tips</p>',
      },
      apis: [
        'TiMenuItem.properties.tip',
        'TiMenuItem.properties.tipPosition',
        'TiActionmenuComponent.properties.tipMaxWidth',
      ],
    },
    {
      demoId: 'actionmenu-shownum',
      name: {
        'zh-CN': '显示个数',
        'en-US': 'showNum',
      },
      desc: {
        'zh-CN':
          '通过属性<code>maxShowNum</code>配置显示菜单按钮的最大个数；通过属性<code>maxWidth</code>配置组件最大宽度，使用<code>maxWidth</code>接口在表格中不生效，可通过设置 td 的 white-space: normal 来解决。',
        'en-US': '<p>showNum</p>',
      },
      apis: [
        'TiActionmenuComponent.properties.maxShowNum',
        'TiActionmenuComponent.properties.maxWidth',
      ],
    },
    {
      demoId: 'actionmenu-space',
      name: {
        'zh-CN': '间距',
        'en-US': 'space',
      },
      desc: {
        'zh-CN': '通过属性<code>space</code>配置菜单按钮之间的间距。',
        'en-US': '<p>space</p>',
      },
      apis: ['TiActionmenuComponent.properties.space'],
    },
    {
      demoId: 'actionmenu-panelstyle',
      name: {
        'zh-CN': '下拉面板样式',
        'en-US': 'panelstyle',
      },
      desc: {
        'zh-CN':
          '通过属性<code>panelMaxWidth</code>配置下拉面板最大宽度；通过属性<code>panelMaxHeight</code>配置下拉面板最大高度。',
        'en-US': '<p>panelstyle</p>',
      },
      apis: [
        'TiActionmenuComponent.properties.panelMaxWidth',
        'TiActionmenuComponent.properties.panelMaxHeight',
      ],
    },
    {
      demoId: 'actionmenu-menutext',
      name: {
        'zh-CN': '下拉菜单显示文本',
        'en-US': 'menuText',
      },
      desc: {
        'zh-CN':
          '通过属性<code>moreText</code>配置下拉菜单显示文本；通过属性<code>menuText</code>配置只有更多项时的下拉菜单显示文本。',
        'en-US': '<p>menuText</p>',
      },
      apis: [
        'TiActionmenuComponent.properties.moreText',
        'TiActionmenuComponent.properties.menuText',
      ],
    },
    {
      demoId: 'actionmenu-templete',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'templete',
      },
      desc: {
        'zh-CN':
          '通过<code>#item</code>配置下拉面板中选项的模板；通过<code>#tip</code>配置当前菜单项提示信息的模板。',
        'en-US': '<p>templete</p>',
      },
      apis: [
        'TiActionmenuComponent.slots.itemTemplate',
        'TiActionmenuComponent.slots.tipTemplate',
      ],
    },
    {
      demoId: 'actionmenu-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN':
          '当选中菜单项时触发<code>select</code>事件，传递出去的参数为当前选中项的数据；当点击下拉菜单时触发<code>moreClick</code>事件，传递出去的参数为面板展开状态。',
        'en-US': '<p>event</p>',
      },
      apis: [
        'TiActionmenuComponent.events.select',
        'TiActionmenuComponent.events.moreClick',
      ],
    },
    {
      demoId: 'actionmenu-table',
      name: {
        'zh-CN': '表格操作列',
        'en-US': 'table',
      },
      desc: {
        'zh-CN':
          '通过属性<code>data</code>通常配置表格当前行数据；通过属性<code>dataToItemsFn</code>配置当前行数据转化为<code>items</code>数据；通过属性<code>item.popConfig</code>配置当前行显示在外部的菜单按钮气泡确认框数据。',
        'en-US': '<p>table</p>',
      },
      apis: [
        'TiActionmenuComponent.properties.data',
        'TiActionmenuComponent.properties.dataToItemsFn',
        'TiActionmenuItem.properties.popConfig',
        'TiPopconfirmConfig.properties.content',
        'TiPopconfirmConfig.methods.close',
        'TiPopconfirmConfig.methods.dismiss',
      ],
    },
  ],
};
