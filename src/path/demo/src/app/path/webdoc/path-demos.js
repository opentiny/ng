export default {
  column: '2',
  demos: [
    {
      demoId: 'pathfield-items',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'pathfield items'
      },
      desc: {
        'zh-CN': '<p>Path 组件的最简用法；通过属性<code>items</code>配置具体路径。</p>',
        'en-US': 'pathfield items'
      },
      apis: ['TiPathFieldComponent.properties.items', 'TiPathFieldItem.properties.label', 'TiPathFieldItem.properties.label']
    },
    {
      demoId: 'pathfield-ispanel',
      name: {
        'zh-CN': '下拉面板',
        'en-US': 'pathfield ispanel'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>isPanel</code>配置点击上级按钮是否展开下拉面板。</p>',
        'en-US': 'pathfield ispanel'
      },
      apis: ['TiPathFieldComponent.properties.isPanel']
    },
    {
      demoId: 'pathfield-panelwidth',
      name: {
        'zh-CN': '面板宽度',
        'en-US': 'pathfield panelwidth'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>panelWidth</code>配置下拉面板宽度。</p>',
        'en-US': 'pathfield panelwidth'
      },
      apis: ['TiPathFieldComponent.properties.panelWidth']
    },
    {
      demoId: 'pathfield-editable',
      name: {
        'zh-CN': '可编辑',
        'en-US': 'pathfield editable'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>editable</code>配置是否支持路径编辑功能；通过属性<code>keepEditState</code>配置按下回车键是否保持编辑状态。</p>',
        'en-US': 'pathfield editable'
      },
      apis: ['TiPathFieldComponent.properties.editable', 'TiPathFieldComponent.properties.keepEditState']
    },
    {
      demoId: 'pathfield-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'pathfield event'
      },
      desc: {
        'zh-CN': '<p>当激活路径发生变化的时候触发<code>pathChange</code>事件。</p>',
        'en-US': 'pathfield event'
      },
      apis: ['TiPathFieldComponent.events.pathChange', 'TiPathChangeEvent.properties.type']
    },
    {
      demoId: 'path-list',
      name: {
        'zh-CN': '路径列表',
        'en-US': 'path list'
      },
      desc: {
        'zh-CN':
          '<p>PathList 组件的使用方法；通过属性<code>items</code>配置路径列表,通过属性<code>clearable</code>配置路径项是否可删除；当路径项删除的时候触发<code>clear</code>事件。</p>',
        'en-US': 'path list'
      },
      apis: [
        'TiPathListComponent.properties.items',
        'TiPathListComponent.properties.clearable',
        'TiPathListComponent.events.clear',
        'TiPathListItem.properties.label',
        'TiPathListItem.properties.type'
      ]
    }
  ]
};
