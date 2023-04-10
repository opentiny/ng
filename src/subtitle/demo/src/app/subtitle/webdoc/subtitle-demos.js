export default {
  column: '2',
  demos: [
    {
      demoId: 'subtitle-items',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'base',
      },
      desc: {
        'zh-CN': '<p>标题数据集，如果只有一个选项则标题以文本形式呈现，如果选项大于1个，标题以下拉的形式呈现。</p>',
        'en-US': '',
      },
      apis: [
        'TiSubtitleComponent.properties.href',
        'TiSubtitleComponent.properties.items'
      ]
    },
    {
      demoId: 'subtitle-target',
      name: {
        'zh-CN': '跳转路径',
        'en-US': 'dark',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>target</code>配置在何处打开链接。</p>',
        'en-US': '',
      },
      apis: [
        'TiSubtitleComponent.properties.target'
      ]
    },
    {
      demoId: 'subtitle-tip-position',
      name: {
        'zh-CN': 'tip方向',
        'en-US': 'dark',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>tipPosition</code>配置标题溢出提示的方向。</p>',
        'en-US': '',
      },
      apis: [
        'TiSubtitleComponent.properties.tipPosition'
      ]
    },
    {
      demoId: 'subtitle-dark',
      name: {
        'zh-CN': '暗色背景',
        'en-US': 'dark',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>dark</code>配置组件在暗色场景呈现。</p>',
        'en-US': '',
      }
    },
    {
      demoId: 'subtitle-maxwidth',
      name: {
        'zh-CN': '最大宽度',
        'en-US': 'maxWidth',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>maxWidth</code>配置组件最大宽度。</p>',
        'en-US': '',
      },
      apis: ['TiSubtitleComponent.properties.maxWidth']
    },
    {
      demoId: 'subtitle-panelwidth',
      name: {
        'zh-CN': '面板最大宽度',
        'en-US': 'panelwidth'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>panelWidth</code>配置下拉面板宽度。</p>',
        'en-US': ''
      },
      apis: ['TiSubtitleComponent.properties.panelWidth']
    },
    {
      demoId: 'subtitle-searchable',
      name: {
        'zh-CN': '搜索',
        'en-US': 'searchable'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>searchable</code>配置<code>items</code>大于1项时，展开面板中是否有搜索。</p>',
        'en-US': ''
      },
      apis: ['TiSubtitleComponent.properties.searchable']
    },
    {
      demoId: 'subtitle-idkey',
      name: {
        'zh-CN': '唯一值',
        'en-US': 'idKey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>idKey</code>设置唯一属性，实现下拉选中。</p>',
        'en-US': ''
      },
      apis: ['TiSubtitleComponent.properties.idKey']
    },
    {
      demoId: 'subtitle-scroll-load',
      name: {
        'zh-CN': '下拉加载',
        'en-US': 'scrollToBottom'
      },
      desc: {
        'zh-CN': '<p>当下拉列表数据量大时，先请求部分数据，等滚动条滚动到底部时利用<code>scrollToBottom</code>事件接口提供的时机再一次次去加载后面的数据。</p>',
        'en-US': ''
      },
      apis: ['TiSubtitleComponent.events.scrollToBottom']
    },
    {
      demoId: 'subtitle-before-search',
      name: {
        'zh-CN': '后台搜索',
        'en-US': 'beforeSearch',
      },
      desc: {
        'zh-CN': '<p>必须搭配<code>scrollToBottom</code>事件接口使用，后台搜索传出下拉搜索框的值，使用了该事件接口，组件内部将不再进行搜索，搜索需由业务在该事件回调中进行(后台搜索)，将搜索后的数据传给<code>items</code>接口。</p>',
        'en-US': '',
      },
      apis: ['TiSubtitleComponent.events.beforeSearch']
    },
    {
      demoId: 'subtitle-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN': '<p>当点击后退按钮的时候触发<code>back</code>事件，当选中项变化的时候触发<code>selectedChange</code>事件。</p>',
        'en-US': '',
      },
      apis: [
        'TiSubtitleComponent.properties.selected',
        'TiSubtitleComponent.events.back',
        'TiSubtitleComponent.events.selectedChange'
      ]
    },
  ]
}