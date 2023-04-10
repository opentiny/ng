export default {
  column: '2',
  demos: [
    {
      demoId: 'rate-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Rate 组件的最简用法。</p>',
        'en-US': '',
      }
    },
    {
      demoId: 'rate-disabled',
      name: {
        'zh-CN': '只读',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态，即只读模式。</p>',
        'en-US': '',
      },
      apis: ['TiRateComponent.properties.disabled']
    },
    {
      demoId: 'rate-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN': '<p>当评分值改变的时候触发<code>ngModelChange</code>事件。</p>',
        'en-US': '',
      }
    }
  ],
};
