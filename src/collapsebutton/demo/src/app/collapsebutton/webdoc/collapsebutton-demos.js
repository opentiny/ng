export default {
  column: '2',
  demos: [
    {
      demoId: 'collapsebutton-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'collapsebutton basic'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>collapsed</code>实现双向绑定。</p>',
        'en-US': '<p>collapsebutton basic</p>'
      },
      apis: ['TiCollapsebuttonComponent.properties.collapsed']
    },
    {
      demoId: 'collapsebutton-customtext',
      name: {
        'zh-CN': '按钮自定义文本',
        'en-US': 'collapsebutton customtext'
      },
      desc: {
        'zh-CN': '<p>通过<code>ng-template</code>模板元素自定义按钮文本。</p>',
        'en-US': '<p>collapsebutton customtext</p>'
      }
    },
    {
      demoId: 'collapsebutton-searchcount',
      name: {
        'zh-CN': '高级搜索条件计数',
        'en-US': 'collapsebutton searchcount'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>searchCount</code>显示出当前的搜索条件计数。</p>',
        'en-US': '<p>collapsebutton searchcount</p>'
      },
      apis: ['TiCollapsebuttonComponent.properties.searchCount']
    },
    {
      demoId: 'collapsebutton-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'collapsebutton event'
      },
      desc: {
        'zh-CN': '<p>当点击高级搜索按钮后触发<code>collapsedChange</code>事件。</p>',
        'en-US': '<p>collapsebutton event</p>'
      },
      apis: ['TiCollapsebuttonComponent.events.collapsedChange']
    }
  ]
};
