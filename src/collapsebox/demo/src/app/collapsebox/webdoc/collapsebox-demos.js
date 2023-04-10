export default {
  column: '2',
  demos: [
    {
      demoId: 'collapsebox-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN': '<p>Collapsebox 组件的最简用法。</p>',
        'en-US': '<p>Basic usage</p>',
      },
    },
    {
      demoId: 'collapsebox-closeable',
      name: {
        'zh-CN': '控制关闭按钮显示隐藏',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>closeable</code>配置关闭按钮是否开启。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiCollapseboxComponent.properties.closeable'],
    },
    {
      demoId: 'collapsebox-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'Change event',
      },
      desc: {
        'zh-CN': '<p>当面板关闭的时候触发<code>close</code>事件。</p>',
        'en-US': '<p>Change even</p>',
      },
      apis: ['TiCollapseboxComponent.events.close'],
    },
  ],
};
