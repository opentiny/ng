export default {
  column: '2',
  demos: [
    {
      demoId: 'cascader-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'cascader basic'
      },
      desc: {
        'zh-CN': 'Cascader 组件的最简用法。',
        'en-US': 'cascader basic'
      },
      apis: [ 'TiCascaderComponent.properties.items' ]
    },
    {
      demoId: 'cascader-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'cascader disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置禁用。</p>',
        'en-US': 'cascader disabled'
      },
      apis: [ 'TiCascaderComponent.properties.disabled' ]
    },
    {
      demoId: 'cascader-panel',
      name: {
        'zh-CN': '面板大小',
        'en-US': 'cascader panel'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>panelWidth</code>、<code>panelHeight</code>配置面板大小。</p>',
        'en-US': 'cascader panel'
      },
      apis: [ 'TiCascaderComponent.properties.panelWidth', 'TiCascaderComponent.properties.panelHeight' ]
    },
    {
      demoId: 'cascader-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': 'labelkey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelkey</code>配置显示的键值。</p>',
        'en-US': 'cascader key'
      },
      apis: [ 'TiCascaderComponent.properties.labelKey' ]
    },
    {
      demoId: 'cascader-valuekey',
      name: {
        'zh-CN': ' 选中值是一个基本类型数据',
        'en-US': 'valuekey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>valueKey</code>指定选中项数据的键值。</p>',
        'en-US': 'cascader key'
      },
      apis: [ 'TiCascaderComponent.properties.valueKey' ]
    },
    {
      demoId: 'cascader-idkey',
      name: {
        'zh-CN': '数据的唯一标识',
        'en-US': 'key'
      },
      desc: {
        'zh-CN': '<p>当显示的文本有重复项时，通过属性<code>idKey</code>指定选项数据的唯一性。</p>',
        'en-US': 'cascader key'
      },
      apis: [ 'TiCascaderComponent.properties.idKey' ]
    },
    {
      demoId: 'cascader-trigger',
      name: {
        'zh-CN': '悬浮触发下一级',
        'en-US': 'cascader trigger'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>trigger</code>配置悬浮触发下一级。</p>',
        'en-US': 'cascader trigger'
      },
      apis: [ 'TiCascaderComponent.properties.trigger' ]
    },
    {
      demoId: 'cascader-showalllevel',
      name: {
        'zh-CN': '显示全部路径',
        'en-US': 'cascader showalllevel'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>showalllevel</code>配置是否显示全部路径。</p>',
        'en-US': 'cascader showalllevel'
      },
      apis: [ 'TiCascaderComponent.properties.showAllLevel' ]
    },
    {
      demoId: 'cascader-onlyselectleaf',
      name: {
        'zh-CN': '点击即选中',
        'en-US': 'cascader onlyselectleaf'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>onlyselectleaf</code>配置是否只能选中叶子节点。</p>',
        'en-US': 'cascader onlyselectleaf'
      },
      apis: [ 'TiCascaderComponent.properties.onlySelectLeaf' ]
    },
    {
      demoId: 'cascader-search',
      name: {
        'zh-CN': '搜索',
        'en-US': 'cascader search'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>search</code>配置可搜索。</p>',
        'en-US': 'cascader search'
      },
      apis: [ 'TiCascaderComponent.properties.searchable' ]
    },
    {
      demoId: 'cascader-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'cascader events'
      },
      desc: {
        'zh-CN': '点击“清除”时，触发<code>clear</code>事件。',
        'en-US': 'cascader events'
      },
      apis: [ 'TiCascaderComponent.properties.clear' ]
    },

  ],
};
