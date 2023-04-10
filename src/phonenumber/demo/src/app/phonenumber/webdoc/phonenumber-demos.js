export default {
  column: '2',
  demos: [
    {
      demoId: 'phonenumber-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'phonenumber basic'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>options</code>配置国家/地区码数据集。</p>',
        'en-US': 'phonenumber basic'
      },
      apis: ['TiPhonenumberComponent.properties.options']
    },
    {
      demoId: 'phonenumber-country',
      name: {
        'zh-CN': '当前国家/地区码',
        'en-US': 'phonenumber country'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>country</code>配置当前国家/地区码。</p>',
        'en-US': 'phonenumber country'
      },
      apis: ['TiPhonenumberComponent.properties.country']
    },
    {
      demoId: 'phonenumber-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'phonenumber disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>selectDisabled</code>配置左侧下拉框禁用状态。</p>',
        'en-US': 'phonenumber disabled'
      },
      apis: ['TiPhonenumberComponent.properties.selectDisabled']
    },
    {
      demoId: 'phonenumber-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'phonenumber event'
      },
      desc: {
        'zh-CN':
          '<p>当<code>country</code>发生变化时触发<code>countryChange</code>事件；当选中下拉项时触发<code>countrySelect</code>事件。</p>',
        'en-US': 'phonenumber event'
      },
      apis: ['TiPhonenumberComponent.events.countryChange', 'TiPhonenumberComponent.events.countrySelect']
    },
    {
      demoId: 'phonenumber-valid',
      name: {
        'zh-CN': '',
        'en-US': 'phonenumber valid'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>validType</code>配置校验类型，包含<code>change（即时校验）</code>、<code>blur（失焦检验）</code>两种类型。</p>',
        'en-US': 'phonenumber valid'
      },
      apis: ['TiPhonenumberComponent.properties.validType']
    }
  ],
  ignoreApis: [
    'TiPhonenumberComponent.properties.disabled',
    'TiPhonenumberComponent.properties.tabindex',
    'TiPhonenumberComponent.events.blur',
    'TiPhonenumberComponent.events.focus',
    'TiPhonenumberComponent.methods.blur',
    'TiPhonenumberComponent.methods.focus'
  ]
};
