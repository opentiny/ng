export default {
  column: '2',
  demos: [
    {
      demoId: 'selectgroup-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'selectgroup basic'
      },
      desc: {
        'zh-CN': '<p>Selectgroup 组件的最简用法。</p>',
        'en-US': 'selectgroup basic'
      },
      apis: ['TiSelectitemComponent.properties.item']
    },
    {
      demoId: 'selectgroup-multiple',
      name: {
        'zh-CN': '多选',
        'en-US': 'selectgroup multiple'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>multiple</code>配置是否多选；通过属性<code>checkPosition</code>配置多选角标的位置，包括<code>right-top</code>（默认）、<code>right-bottom</code>两种类型。</p>',
        'en-US': 'selectgroup multiple'
      },
      apis: ['TiSelectgroupComponent.properties.multiple', 'TiSelectitemComponent.properties.checkPosition']
    },
    {
      demoId: 'selectgroup-valuekey',
      name: {
        'zh-CN': '自定义选中值',
        'en-US': 'selectgroup valuekey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>valueKey</code>配置选中项数据的键值。</p>',
        'en-US': 'selectgroup valuekey'
      },
      apis: ['TiSelectgroupComponent.properties.valueKey']
    },
    {
      demoId: 'selectgroup-template',
      name: {
        'zh-CN': '模板',
        'en-US': 'selectgroup template'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>template</code>配置每项卡片展示的模板。</p>',
        'en-US': 'selectgroup template'
      },
      apis: ['TiSelectitemComponent.slots.itemTemplate']
    },
    {
      demoId: 'selectgroup-select',
      name: {
        'zh-CN': '选择下拉',
        'en-US': 'selectgroup select'
      },
      desc: {
        'zh-CN': '<p>在属性<code>items</code>中配置<code>options</code>可以结合下拉框使用。</p>',
        'en-US': 'selectgroup select'
      }
    }
  ],
  ignoreApis: [
    'TiSelectgroupComponent.properties.disabled',
    'TiSelectgroupComponent.properties.tabindex',
    'TiSelectgroupComponent.events.blur',
    'TiSelectgroupComponent.events.focus',
    'TiSelectgroupComponent.methods.blur',
    'TiSelectgroupComponent.methods.focus'
  ]
};
