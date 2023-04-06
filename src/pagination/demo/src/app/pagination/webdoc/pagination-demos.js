export default {
  column: '2',
  demos: [
    {
      demoId: 'pagination-type',
      name: {
        'zh-CN': '分页类型',
        'en-US': 'pagination type',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>type</code>配置分页组件的类型，包括<code>default(默认)</code>、<code>simple</code>、<code>mini</code>。',
        'en-US': '<p>pagination type</p>',
      },
      apis: [
        'TiPaginationComponent.properties.type',
        'TiPaginationComponent.properties.currentPage',
        'TiPaginationComponent.properties.totalNumber',
      ],
    },
    {
      demoId: 'pagination-pagesize',
      name: {
        'zh-CN': '下拉框选项',
        'en-US': 'pagination pagesize',
      },
      desc: {
        'zh-CN':
          '通过属性<code>pageSize</code>实现分页组件每页显示条数的相关配置，包括每页显示条数选项列表、每页显示条数选项列表宽度、隐藏每页显示条数选项列表、默认每页显示条数选项列表。',
        'en-US': '<p>pagination pagesize</p>',
      },
      apis: [
        'TiPaginationComponent.properties.pageSize',
        'TiPaginationComponent.properties.largeData',
        'TiPageSizeConfig',
      ],
    },
    {
      demoId: 'pagination-pageselectwidth',
      name: {
        'zh-CN': 'mini 类型大数据场景',
        'en-US': 'pagination pageselectwidth',
      },
      desc: {
        'zh-CN':
          '通过属性<code>pageSelectWidth</code>配置 mini 类型下拉框宽度；通过属性<code>pageSelectVirtual</code>配置 mini 类型下拉是否开启虚拟滚动。',
        'en-US': '<p>pagination pageselectwidth</p>',
      },
      apis: [
        'TiPaginationComponent.properties.pageSelectWidth',
        'TiPaginationComponent.properties.pageSelectVirtual',
      ],
    },
    {
      demoId: 'pagination-showlastpage',
      name: {
        'zh-CN': '分页类型',
        'en-US': 'pagination showlastpage',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>showLastPage</code>配置是否展示最后一页页码。',
        'en-US': '<p>pagination showlastpage</p>',
      },
      apis: ['TiPaginationComponent.properties.showLastPage'],
    },
    {
      demoId: 'pagination-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'pagination disabled',
      },
      desc: {
        'zh-CN': '通过属性<code>disabled</code>配置分页是否为禁用状态。',
        'en-US': '<p>pagination disabled</p>',
      },
      apis: ['TiPaginationComponent.properties.disabled'],
    },
    {
      demoId: 'pagination-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'pagination event',
      },
      desc: {
        'zh-CN':
          '当操作选择框改变每页显示条数的时候触发<code>pageNumChange</code>事件；当组件内部改变当前页码的时候触发<code>currentPageChange</code>事件；当操作选择框改变每页显示条数或操作页码改变当前页码的时候触发<code>pageUpdate</code>事件；当组件内部改变总条数的时候触发<code>totalNumberChange</code>事件。',
        'en-US': '<p>pagination event</p>',
      },
      apis: [
        'TiPaginationComponent.events.currentPageChange',
        'TiPaginationComponent.events.pageNumChange',
        'TiPaginationComponent.events.pageUpdate',
        'TiPaginationComponent.events.totalNumberChange',
        'TiPaginationEvent',
      ],
    },
    {
      demoId: 'pagination-showtotalnumber',
      name: {
        'zh-CN': '展示总条数',
        'en-US': 'pagination showtotalnumber',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>showTotalNumber</code>配置是否展示总条数。',
        'en-US': '<p>pagination showtotalnumber</p>',
      },
      apis: ['TiPaginationComponent.properties.showTotalNumber'],
    },
    {
      demoId: 'pagination-autohide',
      name: {
        'zh-CN': '自动隐藏',
        'en-US': 'pagination autohide',
      },
      desc: {
        'zh-CN':
          '通过属性<code>autoHide</code>配置总条数少于每页显示条数选项列表中的最小值时是否隐藏分页。',
        'en-US': '<p>pagination autohide</p>',
      },
      apis: ['TiPaginationComponent.properties.autoHide'],
    },
    {
      demoId: 'pagination-showgotolink',
      name: {
        'zh-CN': '跳转按钮',
        'en-US': 'pagination showgotolink',
      },
      desc: {
        'zh-CN':
          '通过属性<code>showGotoLink</code>配置是否显示跳转按钮，仅在<code>default</code>生效。',
        'en-US': '<p>pagination showgotolink</p>',
      },
      apis: ['TiPaginationComponent.properties.showGotoLink'],
    },
    {
      demoId: 'pagination-fixed',
      name: {
        'zh-CN': '分页吸底',
        'en-US': 'pagination fixed',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>fixed</code>配置是否开启分页吸底。',
        'en-US': '<p>pagination fixed</p>',
      },
      apis: ['TiPaginationComponent.properties.fixed'],
    },
    {
      demoId: 'pagination-loading',
      name: {
        'zh-CN': '加载态',
        'en-US': 'pagination loading',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>loading</code>配置是否开启加载态。',
        'en-US': '<p>pagination loading</p>',
      },
      apis: ['TiPaginationComponent.properties.loading'],
    },
  ],
};
