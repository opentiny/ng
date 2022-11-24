export default {
  column: '2',
  demos: [
    {
      demoId: 'collapse-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN': '<p>Collapse 组件的最简用法。</p>',
        'en-US': '<p>Basic usage</p>',
      },
      apis: ['TiCollapseDirective.properties.tiCollapse'],
    },
    {
      demoId: 'collapse-event',
      name: {
        'zh-CN': '状态改变事件',
        'en-US': 'Change event',
      },
      desc: {
        'zh-CN':
          '<p>当面板状态改变的时候触发<code>toggleDone</code>事件。传递出去的参数为 boolean 类型，表示当前面板是否为收起状态。</p>',
        'en-US': '<p>Change even</p>',
      },
      apis: ['TiCollapseDirective.events.toggleDone'],
    },
  ],
};
