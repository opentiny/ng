export default {
  column: '2',

  demos: [
    {
      demoId: 'popconfirm-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': '<p>Popconfirm 组件的最简用法。</p>',
        'en-US': '<p>basic</p>'
      }
    },
    {
      demoId: 'popconfirm-define',
      name: {
        'zh-CN': '自定义使用',
        'en-US': 'define'
      },
      desc: {
        'zh-CN':
          '<p>Popconfirm 组件的自定义用法。通过配置<code>TiPopconfirmConfig</code>接口的内容，如<code>content</code>、<code>yesText</code>、<code>noText</code>等传递数据。</p>',
        'en-US': '<p>define</p>'
      },
      apis: ['TiPopconfirmDirective.properties.tiPopconfirm']
    },
    {
      demoId: 'popconfirm-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event'
      },
      desc: {
        'zh-CN':
          '<p>当点击弹出确认框中“是”的按钮时触发<code>close</code>事件。当点击弹出确认框中的“否”的按钮时触发<code>dismiss</code>事件。</p>',
        'en-US': '<p>event</p>'
      },
      apis: ['TiPopconfirmConfig.methods.close', 'TiPopconfirmConfig.methods.dismiss']
    },
    {
      demoId: 'popconfirm-table',
      name: {
        'zh-CN': '在表格中结合 actionmenu 的用法',
        'en-US': 'PopconfirmInTable'
      },
      desc: {
        'zh-CN':
          '<p>通过配置<code>TiActionmenuItem</code>接口中的内容传递数据。使用 Actionmenu 组件，请导入<code>TiActionmenuModule</code>，具体可参考 Actionmenu 组件的使用说明。</p>',
        'en-US': '<p>PopconfirmInTable</p>'
      },
      apis: ['TiPopconfirmDirective.properties.data', 'TiActionmenuItem.properties.popConfig']
    },
    {
      demoId: 'popconfirm-table-define',
      name: {
        'zh-CN': '在表格中自定义使用',
        'en-US': 'PopconfirmInTable'
      },
      desc: {
        'zh-CN': '<p>通过配置<code>TiPopconfirmConfig</code>接口的内容传递数据。</p>',
        'en-US': '<p>PopconfirmInTable</p>'
      },
      apis: ['TiPopconfirmDirective.properties.tiPopconfirm']
    }
  ]
};
