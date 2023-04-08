export default {
  column: '1',
  demos: [
    {
      demoId: 'nav-basic',
      name: {
        'zh-CN': '基础',
        'en-US': 'nav basic'
      },
      desc: {
        'zh-CN': '<p>提供 Nav 组件的基本使用示例，其中包含左侧站点标题，中间导航菜单，右侧按钮。</p>',
        'en-US': '<p>nav basic</p>'
      }
    },
    {
      demoId: 'nav-width',
      name: {
        'zh-CN': '自定义宽度',
        'en-US': 'nav width'
      },
      desc: {
        'zh-CN': '<p>通过属性原生属性可以设置导航栏宽度，参考 CSS 的<code>width</code>属性。',
        'en-US': '<p>nav width</p>'
      }
    },
    {
      demoId: 'nav-theme',
      name: {
        'zh-CN': '深色主题',
        'en-US': 'nav theme'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>theme</code>配置 nav 组件主题，提供了深色<code>dark</code>和浅色<code>light</code>两种选项，默认使用<code>light</code>浅色主题。</p>',
        'en-US': '<p>nav theme</p>'
      },
      apis: ['TiNavComponent.properties.theme']
    },
    {
      demoId: 'nav-left',
      name: {
        'zh-CN': '左侧 Logo 区',
        'en-US': 'nav left'
      },
      desc: {
        'zh-CN': '<p>提供一个容器用来放置站点 Logo 图片和站点标题，预设了<code>img</code>标签的样式，也可根据需要自定义内容。</p>',
        'en-US': '<p>nav left</p>'
      }
    },
    {
      demoId: 'nav-right',
      name: {
        'zh-CN': '右侧操作区',
        'en-US': 'nav right'
      },
      desc: {
        'zh-CN': '<p>右侧操作区用于放置<code>a</code>标签、<code>span</code>标签和<code>button</code>标签等元素。</p>',
        'en-US': '<p>nav right</p>'
      }
    },
    {
      demoId: 'nav-align',
      name: {
        'zh-CN': '菜单区对齐',
        'en-US': 'nav align'
      },
      desc: {
        'zh-CN':
          '<p>导航菜单区域采用了<code>display: flex</code>布局，可以通过修改<code>justify-content</code>属性来设置导航菜单元素的对齐方式，参考 CSS 的<code>justfy-content</code>属性。</p>',
        'en-US': '<p>nav align</p>'
      }
    },
    {
      demoId: 'nav-submenu',
      name: {
        'zh-CN': '子菜单',
        'en-US': 'nav submenu'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>items</code>传入菜单项数组，根据菜单对象的<code>children</code>属性嵌套层数决定了展开子菜单的方式，二级嵌套采用下拉菜单，三级嵌套采用下拉面板。</p>',
        'en-US': '<p>nav submenu</p>'
      },
      apis: ['TiNavMenuComponent.properties.items']
    },
    {
      demoId: 'nav-active',
      name: {
        'zh-CN': '激活项',
        'en-US': 'nav active'
      },
      desc: {
        'zh-CN': '<p>通过传入<code>activeId</code>修改当前激活项，被激活的菜单项及其父级菜单会有高亮显示。</p>',
        'en-US': '<p>nav active</p>'
      },
      apis: ['TiNavMenuComponent.properties.activeId']
    },
    {
      demoId: 'nav-selectable',
      name: {
        'zh-CN': '可选择项',
        'en-US': 'nav selectable'
      },
      desc: {
        'zh-CN':
          '<p>通过在<code>items</code>中设置<code>selectable</code>控制对应菜单项是否可被选中，默认为<code>true</code>，被标记为不可选中的项目不会触发选择事件，建议在一级和二级菜单项上根据需要使用。</p>',
        'en-US': '<p>nav selectable</p>'
      }
    },
    {
      demoId: 'nav-disabled',
      name: {
        'zh-CN': '禁用项',
        'en-US': 'nav disabled'
      },
      desc: {
        'zh-CN':
          '<p>通过在<code>items</code>中设置<code>disabled</code>控制对应菜单项及其子项是否处于已禁用状态，默认为<code>false</code>。</p>',
        'en-US': '<p>nav disabled</p>'
      }
    },
    {
      demoId: 'nav-template',
      name: {
        'zh-CN': '使用模板渲染标签',
        'en-US': 'nav template'
      },
      desc: {
        'zh-CN':
          '<p>提供了<code>item</code>插槽来自定义 item 标签的内容，用户可以编写自定义模板，从模板上下文中获取标签对象<code>item: TiNavMenuItem</code>，可以在传入的items中添加需要的自定义数据，例如这里的示例添加了icon字段，并根据是否有icon字段来展示图标。</p>',
        'en-US': '<p>nav template</p>'
      },
      apis: ['TiNavMenuComponent.slots.itemTemplate']
    },
    {
      demoId: 'nav-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'nav event'
      },
      desc: {
        'zh-CN':
          '<p>选择菜单项将触发选择事件，并返回对象，其中<code>item</code>为被选择的对象数据，<code>itemPath</code>是选项数组，保存了从顶层到底层被选择的每一级对象数据。</p>',
        'en-US': '<p>nav event</p>'
      },
      apis: ['TiNavMenuComponent.events.select']
    }
  ]
};
