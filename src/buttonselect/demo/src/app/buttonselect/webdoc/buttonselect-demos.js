export default {
  column: '2',
  demos: [
    {
      demoId: 'buttonselect-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>Buttonselect 组件的最简用法。</p>',
        'en-US': 'Basic usage'
      },
      apis: ['TiButtonselectComponent.properties.options']
    },
    {
      demoId: 'buttonselect-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': 'Basic usage'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置组件面板显示字段。</p>',
        'en-US': 'Basic usage'
      },
      apis: ['TiButtonselectComponent.properties.labelKey']
    }
  ],
  ignoreApis: [
    'TiButtonselectComponent.properties.tabindex',
    'TiButtonselectComponent.properties.valueKey',
    'TiButtonselectComponent.properties.disabled',
    'TiButtonselectComponent.methods.focus',
    'TiButtonselectComponent.methods.blur',
    'TiButtonselectComponent.events.focus',
    'TiButtonselectComponent.events.blur'
  ]
};
