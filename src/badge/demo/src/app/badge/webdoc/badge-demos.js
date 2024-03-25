export default {
  column: '2',
  demos: [
    {
      demoId: 'badge-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>value</code>配置指定的数据信息。</p>',
        'en-US': ''
      },
      apis: ['TiBadgeComponent.properties.value']
    },
    {
      demoId: 'badge-dot',
      name: {
        'zh-CN': '小圆点标识',
        'en-US': ''
      },
      desc: {
        'zh-CN': '<p>当不传<code>value</code>或传入的<code>value</code>值为 undefined 时，显示的状态为小圆点。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'badge-show',
      name: {
        'zh-CN': '动态隐藏标识',
        'en-US': ''
      },
      desc: {
        'zh-CN': '<p>通过属性<code>show</code>配置标识是否显示。</p>',
        'en-US': ''
      },
      apis: ['TiBadgeComponent.properties.show']
    }
  ]
};
