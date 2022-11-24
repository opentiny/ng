export default {
  column: '2',

  demos: [
    {
      demoId: 'select-basic',
      name: {
        'zh-CN': '基础',
        'en-US': 'select basic',
      },
      desc: {
        'zh-CN': '<code>select</code>组件的最简用法。',
        'en-US': '<p>select basic</p>',
      },
      apis: [
        'TiSelectComponent.properties.options',
        'TiSelectComponent.properties.placeholder',
      ],
    },
    {
      demoId: 'select-multi',
      name: {
        'zh-CN': '多选',
        'en-US': 'select multi',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>multiple</code>配置多选。',
        'en-US': 'select multi',
      },
      apis: ['TiSelectComponent.properties.multiple'],
    },
    {
      demoId: 'select-selectall',
      name: {
        'zh-CN': '全选',
        'en-US': 'select selectall',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>selectAll</code>配置组件在多选场景下是否显示全选框。',
        'en-US': 'select selectall',
      },
      apis: ['TiSelectComponent.properties.selectAll'],
    },
    {
      demoId: 'select-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'select disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置组件是否禁用。',
        'en-US': 'select disabled',
      },
      apis: ['TiSelectComponent.properties.disabled'],
    },
    {
      demoId: 'select-template',
      name: {
        'zh-CN': '模板',
        'en-US': 'select template',
      },
      desc: {
        'zh-CN':
          '自定义模板，组件提供了<code>selected</code>、<code>item</code>、<code>placeholder</code>、<code>footer</code>四个插槽。',
        'en-US': 'select template',
      },
      apis: [
        'TiSelectComponent.slots.selectedTemplate',
        'TiSelectComponent.slots.itemTemplate',
        'TiSelectComponent.slots.placeholderTemplate',
        'TiSelectComponent.slots.footerTemplate',
      ],
    },
    {
      demoId: 'select-valuekey',
      name: {
        'zh-CN': '选中值',
        'en-US': 'select valuekey',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>valueKey</code>自定义组件选中值。',
        'en-US': 'select valuekey',
      },
      apis: ['TiSelectComponent.properties.valueKey'],
    },
    {
      demoId: 'select-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': 'select labelkey',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置组件下拉面板显示字段。',
        'en-US': 'select labelkey',
      },
      apis: ['TiSelectComponent.properties.labelKey'],
    },
    {
      demoId: 'select-idkey',
      name: {
        'zh-CN': '唯一值',
        'en-US': 'select idkey',
      },
      desc: {
        'zh-CN':
          '<p>当<code>labelkey</code>或<code>valuekey</code>有重复项时，通过属性<code>idKey</code>设置唯一属性，实现下拉选中。',
        'en-US': 'select idkey',
      },
      apis: ['TiSelectComponent.properties.idKey'],
    },
    {
      demoId: 'select-maxline',
      name: {
        'zh-CN': '最大显示行数',
        'en-US': 'select maxline',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>maxLine</code>配置组件在多选场景下选择框显示的最大行数。',
        'en-US': 'select maxline',
      },
      apis: ['TiSelectComponent.properties.maxLine'],
    },
    {
      demoId: 'select-group',
      name: {
        'zh-CN': '分组',
        'en-US': 'select group',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>options</code>中的<code>children</code>属性设置分组。',
        'en-US': 'select group',
      },
      apis: ['TiSelectComponent.properties.options'],
    },
    {
      demoId: 'select-pagination',
      name: {
        'zh-CN': '分页',
        'en-US': 'select pagination',
      },
      desc: {
        'zh-CN': '通过<code>footer</code>插槽，实现下拉面板分页场景。',
        'en-US': 'select pagination',
      },
      apis: ['TiSelectComponent.slots.footerTemplate'],
    },
    {
      demoId: 'select-search',
      name: {
        'zh-CN': '搜索',
        'en-US': 'select search',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>searchable</code>配置组件是否显示搜索框。',
        'en-US': 'select search',
      },
      apis: ['TiSelectComponent.properties.searchable'],
    },
    {
      demoId: 'select-searchkeys',
      name: {
        'zh-CN': '搜索字段',
        'en-US': 'select searchkeys',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>searchKeys</code>配置组件搜索字段。',
        'en-US': 'select searchkeys',
      },
      apis: ['TiSelectComponent.properties.searchKeys'],
    },
    {
      demoId: 'select-reservesearchword',
      name: {
        'zh-CN': '保留搜索关键词',
        'en-US': 'select reservesearchword',
      },
      desc: {
        'zh-CN':
          '<p>搜索场景下，通过属性<code>reserveSearchword</code>配置下拉面板收起后是否保留搜素关键词。',
        'en-US': 'select reservesearchword',
      },
      apis: ['TiSelectComponent.properties.reserveSearchword'],
    },
    {
      demoId: 'select-beforesearch',
      name: {
        'zh-CN': '后台搜索',
        'en-US': 'select beforesearch',
      },
      desc: {
        'zh-CN': '<p>通过事件<code>beforeSearch</code>实现后台搜索。',
        'en-US': 'select beforesearch',
      },
      apis: ['TiSelectComponent.events.beforeSearch'],
    },
    {
      demoId: 'select-lazy',
      name: {
        'zh-CN': '懒加载',
        'en-US': 'select lazy',
      },
      desc: {
        'zh-CN': '<p>通过事件<code>beforeOpen</code>实现懒加载。',
        'en-US': 'select lazy',
      },
      apis: ['TiSelectComponent.events.beforeOpen'],
    },
    {
      demoId: 'select-showselectednumber',
      name: {
        'zh-CN': '显示已选项个数',
        'en-US': 'select showSelectedNumber',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>showSelectedNumber</code>配置组件在多选场景下选择框是否显示已选项的个数。',
        'en-US': 'select showSelectedNumber',
      },
      apis: [
        'TiSelectComponent.properties.showSelectedNumber',
        'TiSelectComponent.properties.showSelectedNumberTip',
        'TiSelectComponent.properties.selectedNumberTipPosition',
      ],
    },
    {
      demoId: 'select-clearable',
      name: {
        'zh-CN': '可清除',
        'en-US': 'select clearable',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>clearable</code>配置组件是否开启清除已选项功能。',
        'en-US': 'select clearable',
      },
      apis: [
        'TiSelectComponent.properties.clearable',
        'TiSelectComponent.events.clear',
      ],
    },
    {
      demoId: 'select-panel',
      name: {
        'zh-CN': '面板样式',
        'en-US': 'select panel',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>panelWidth</code>配置下拉面板宽度，通过属性<code>panelMaxHeight</code>配置下拉面板最大高度。',
        'en-US': 'select panel',
      },
      apis: [
        'TiSelectComponent.properties.panelWidth',
        'TiSelectComponent.properties.panelMaxHeight',
      ],
    },
    {
      demoId: 'select-tip',
      name: {
        'zh-CN': '文字提示',
        'en-US': 'select tip',
      },
      desc: {
        'zh-CN': '组件的文字提示场景。',
        'en-US': 'select tip',
      },
      apis: [
        'TiSelectComponent.properties.tipMaxWidth',
        'TiSelectComponent.properties.selectedTipPosition',
        'TiSelectComponent.properties.tipPosition',
      ],
    },
    {
      demoId: 'select-nodata',
      name: {
        'zh-CN': '空数据',
        'en-US': 'select nodata',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>noDataText</code>配置组件空数据时显示文本。',
        'en-US': 'select nodata',
      },
      apis: ['TiSelectComponent.properties.noDataText'],
    },
    {
      demoId: 'select-appendtobody',
      name: {
        'zh-CN': 'appendToBody',
        'en-US': 'select appendtobody',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>appendToBody</code>配置下拉面板是否添加在body上。',
        'en-US': 'select appendtobody',
      },
      apis: ['TiSelectComponent.properties.appendToBody'],
    },
    {
      demoId: 'select-virtualscroll',
      name: {
        'zh-CN': '虚拟滚动',
        'en-US': 'select virtualscroll',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>virtual</code>配置组件是否开启虚拟滚动。',
        'en-US': 'select virtualscroll',
      },
      apis: ['TiSelectComponent.properties.virtual'],
    },
    {
      demoId: 'select-scroll-load',
      name: {
        'zh-CN': '下拉滚动加载',
        'en-US': 'select scroll-load',
      },
      desc: {
        'zh-CN': '<p>通过事件<code>scrollToBottom</code>实现下拉滚动加载。',
        'en-US': 'select scroll-load',
      },
      apis: [
        'TiSelectComponent.events.scrollToBottom',
        'TiSelectComponent.methods.getSearchResult',
        'TiSelectComponent.methods.getSearchWord',
        'TiSelectComponent.methods.open',
      ],
    },
    {
      demoId: 'select-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'select event',
      },
      desc: {
        'zh-CN': '点击当前项时，触发<code>select</code>事件。',
        'en-US': 'select event',
      },
      apis: ['TiSelectComponent.events.select'],
    },
  ],
};
