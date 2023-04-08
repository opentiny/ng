export default {
  column: '2',

  demos: [
    {
      demoId: 'treeselect-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'treeselect basic',
      },
      desc: {
        'zh-CN': 'TreeSelect 组件的最简用法。',
        'en-US': '<p>treeselect basic</p>',
      },
      apis: ['TiTreeselectComponent.properties.options'],
    },
    {
      demoId: 'treeselect-multi',
      name: {
        'zh-CN': '多选',
        'en-US': 'multiple',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>multiple</code>配置组件是否为多选。',
        'en-US': '<p>multiple</p>',
      },
      apis: ['TiTreeselectComponent.properties.multiple'],
    },
    {
      demoId: 'treeselect-selectall',
      name: {
        'zh-CN': '全选',
        'en-US': 'selectAll',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>selectAll</code>配置组件在多选场景下是否显示全选框。',
        'en-US': '<p>selectAll</p>',
      },
      apis: ['TiTreeselectComponent.properties.selectAll'],
    },
    {
      demoId: 'treeselect-labelkey',
      name: {
        'zh-CN': '自定义选中项',
        'en-US': 'labelkey',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置组件下拉显示的字段。',
        'en-US': '<p>labelkey</p>',
      },
      apis: ['TiTreeselectComponent.properties.labelKey'],
    },
    {
      demoId: 'treeselect-clearable',
      name: {
        'zh-CN': '可清除',
        'en-US': 'clearable',
      },
      desc: {
        'zh-CN':
          '通过属性<code>clearable</code>配置组件是否开启清除已选项功能。',
        'en-US': '<p>clearable</p>',
      },
      apis: ['TiTreeselectComponent.properties.clearable'],
    },
    {
      demoId: 'treeselect-search',
      name: {
        'zh-CN': '可搜索',
        'en-US': 'searchable',
      },
      desc: {
        'zh-CN': '通过属性<code>searchable</code>配置组件是否显示搜索框。',
        'en-US': '<p>searchable</p>',
      },
      apis: ['TiTreeselectComponent.properties.searchable'],
    },
    {
      demoId: 'treeselect-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled',
      },
      desc: {
        'zh-CN': '通过属性<code>disabled</code>配置组件是否禁用。',
        'en-US': '<p>disabled</p>',
      },
      apis: ['TiTreeselectComponent.properties.disabled'],
    },
    {
      demoId: 'treeselect-dropmaxheight',
      name: {
        'zh-CN': '下拉面板最大高度',
        'en-US': 'dropMaxHeight',
      },
      desc: {
        'zh-CN': '通过属性<code>dropMaxHeight</code>配置组件下拉面板最大高度。',
        'en-US': '<p>dropMaxHeight</p>',
      },
      apis: ['TiTreeselectComponent.properties.dropMaxHeight'],
    },
    {
      demoId: 'treeselect-nodata',
      name: {
        'zh-CN': '空数据',
        'en-US': 'nodata',
      },
      desc: {
        'zh-CN': '通过属性<code>noDataText</code>配置组件空数据显示文本。',
        'en-US': '<p>nodata</p>',
      },
      apis: ['TiTreeselectComponent.properties.noDataText'],
    },
    {
      demoId: 'treeselect-maxline',
      name: {
        'zh-CN': '显示行数',
        'en-US': 'maxline',
      },
      desc: {
        'zh-CN':
          '通过属性<code>maxLine</code>配置组件在多选场景下选择框显示的最大行数。',
        'en-US': '<p>maxLine</p>',
      },
      apis: ['TiTreeselectComponent.properties.maxLine'],
    },
    {
      demoId: 'treeselect-panelwidth',
      name: {
        'zh-CN': '下拉宽度',
        'en-US': 'panelwidth',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>panelWidth</code>配置下拉宽度，包含<code>justified</code>、<code>auto</code>、<code>string</code>三种类型。',
        'en-US': '<p>panelWidth</p>',
      },
      apis: ['TiTreeselectComponent.properties.panelWidth'],
    },
    {
      demoId: 'treeselect-lazyload',
      name: {
        'zh-CN': '懒加载',
        'en-US': 'lazyload',
      },
      desc: {
        'zh-CN': '通过事件<code>beforeOpen</code>实现懒加载。',
        'en-US': '<p>beforeOpen</p>',
      },
      apis: ['TiTreeselectComponent.events.beforeOpen'],
    },
    {
      demoId: 'treeselect-before-expand',
      name: {
        'zh-CN': '异步加载',
        'en-US': 'before-expand',
      },
      desc: {
        'zh-CN': '通过事件<code>beforeExpand</code>实现异步加载。',
        'en-US': '<p>disabled</p>',
      },
      apis: ['TiTreeselectComponent.events.beforeExpand'],
    },
    {
      demoId: 'treeselect-before-more',
      name: {
        'zh-CN': '分段加载',
        'en-US': 'before-more',
      },
      desc: {
        'zh-CN':
          '点击 “更多” 按钮，通过事件<code>beforeMore</code>实现分段异步加载。',
        'en-US': '<p>before-more</p>',
      },
      apis: ['TiTreeselectComponent.events.beforeMore'],
    },
    {
      demoId: 'treeselect-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN': '点击当前项时，触发<code>select</code>事件。',
        'en-US': '<p>before-event</p>',
      },
      apis: ['TiTreeselectComponent.events.select'],
    },
    {
      demoId: 'treeselect-validation',
      name: {
        'zh-CN': '校验',
        'en-US': 'validation',
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>配置组件的校验规则。',
        'en-US': '<p>validation</p>',
      },
    },
  ],
};
