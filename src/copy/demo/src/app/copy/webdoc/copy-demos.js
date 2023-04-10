export default {
  column: '2',
  demos: [
    {
      demoId: 'copy-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'copy basic'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>content</code>设置复制内容。<code>content</code>接口值为空时，不能复制。</p>',
        'en-US': '<p>copy basic</p>'
      },
      apis: ['TiCopyComponent.properties.content']
    },
    {
      demoId: 'copy-dark',
      name: {
        'zh-CN': '深色背景',
        'en-US': 'copy dark'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>dark</code>配置深色背景复制。</p>',
        'en-US': '<p>copy dark</p>'
      }
    },
    {
      demoId: 'copy-tip',
      name: {
        'zh-CN': '提示信息',
        'en-US': 'copy tip'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>title</code>配置图标的说明信息；通过属性<code>successTip</code>配置完成复制提示信息。</p>',
        'en-US': '<p>copy tip</p>'
      },
      apis: ['TiCopyComponent.properties.title', 'TiCopyComponent.properties.successTip']
    },
    {
      demoId: 'copy-table',
      name: {
        'zh-CN': '在表格中使用',
        'en-US': 'copy table'
      },
      desc: {
        'zh-CN': '<p>通过元素<code>ti-cell-icons</code>包裹。</p>',
        'en-US': '<p>copy table</p>'
      }
    },
    {
      demoId: 'copy-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'copy event'
      },
      desc: {
        'zh-CN': '<p>当点击复制图标后触发<code>copy</code>事件。</p>',
        'en-US': '<p>copy event</p>'
      },
      apis: ['TiCopyComponent.events.copy']
    }
  ]
};
