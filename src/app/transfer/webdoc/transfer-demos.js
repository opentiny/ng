export default {
  column: '1',
  demos: [
    {
      demoId: 'transfer-basic',
      name: { 'zh-CN': '基本用法', 'en-US': 'transfer basic' },
      desc: {
        'zh-CN': '<p>Transfer 的最简用法。</p>',
        'en-US': 'transfer basic'
      },
      apis: [ 'TiTransferComponent.properties.options' ],
      codeFiles: [
        'transfer-basic.html',
        'TransferBasicComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'transfer disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>options</code>配置哪些数据被禁用</p>',
        'en-US': 'transfer disabled'
      },
      codeFiles: [
        'transfer-disabled.html',
        'TransferDisabledComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-lazy',
      name: {
        'zh-CN': '懒加载',
        'en-US': 'transfer lazy'
      },
      desc: {
        'zh-CN': '<p>懒加载的场景。</p>',
        'en-US': 'transfer lazy'
      },
      codeFiles: [
        'transfer-lazy.html',
        'TransferLazyComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-size',
      name: {
        'zh-CN': '自定义大小',
        'en-US': 'transfer size'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>width</code>和<code>height</code>配置宽高。</p>',
        'en-US': 'transfer size'
      },
      apis: [
        'TiTransferComponent.properties.height',
        'TiTransferComponent.properties.width'
      ],
      codeFiles: [
        'transfer-size.html',
        'TransferSizeComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': 'transfer labelkey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置显示字段。</p>',
        'en-US': 'transfer labelkey'
      },
      apis: [
        'TiTransferComponent.properties.labelKey'
      ],
      codeFiles: [
        'transfer-disabled.html',
        'TransferLabelkeyComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-nodatatext',
      name: {
        'zh-CN': '无数据显示文本',
        'en-US': 'transfer nodatatext'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>noDataText</code>配置无数据时显示的文本。</p>',
        'en-US': 'transfer nodatatext'
      },
      apis: [
        'TiTransferComponent.properties.noDataText'
      ],
      codeFiles: [
        'transfer-nodatatext.html',
        'TransferNodatatextComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-titles',
      name: {
        'zh-CN': '自定义面板头部标题',
        'en-US': 'transfer titles'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>leftTitle</code>和<code>rightTitle</code>配置左右面板的头部标题。</p>',
        'en-US': 'transfer titles'
      },
      apis: [
        'TiTransferComponent.properties.leftTitle',
        'TiTransferComponent.properties.rightTitle'
      ],
      codeFiles: [
        'transfer-titles.html',
        'TransferTitlesComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'transfer event'
      },
      desc: {
        'zh-CN': '<p>当点击向右按钮的时侯触发<code>transferToRight</code>事件;当点击向左按钮的时侯触发<code>transferToLeft</code>事件;传递出去的参数为：此次穿梭的数据。</p>',
        'en-US': 'transfer event'
      },
      apis: [
        'TiTransferComponent.events.transferToLeft',
        'TiTransferComponent.events.transferToRight'
      ],
       codeFiles: [
         'transfer-event.html',
         'TransferEventComponent.ts',
         'data.js'
      ]
    },
    {
      demoId: 'transfer-searchable',
      name: {
        'zh-CN': '搜索',
        'en-US': 'transfer searchable'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>searchable</code>配置是否开启搜索。</p>',
        'en-US': 'transfer searchable'
      },
      apis: [ 'TiTransferComponent.properties.searchable' ],
      codeFiles: [
        'transfer-searchable.html',
        'TransferSearchableComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-searchkeys',
      name: {
        'zh-CN': '设置搜索字段',
        'en-US': 'transfer searchkeys'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>searchKeys</code>配置搜索字段。</p>',
        'en-US': 'transfer searchkeys'
      },
      apis: [ 'TiTransferComponent.properties.searchKeys' ],
      codeFiles: [
        'transfer-searchkeys.html',
        'TransferSearchkeysComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-placeholder',
      name: {
        'zh-CN': '搜索框文字提示',
        'en-US': 'transfer placeholder'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>placeholder</code>配置搜索框的文字提示。</p>',
        'en-US': 'transfer placeholder'
      },
      apis: [ 'TiTransferComponent.properties.placeholder' ],
      codeFiles: [
        'transfer-placeholder.html',
        'TransferPlaceholderComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-idkey',
      name: {
        'zh-CN': '唯一标识',
        'en-US': 'transfer idkey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>idKey</code>配置数据唯一标识的键值。</p>',
        'en-US': 'transfer idkey'
      },
      apis: [
        'TiTransferComponent.properties.idKey'
      ],
      codeFiles: [
        'transfer-idkey.html',
        'TransferIdkeyComponent.ts',
        'data.js'
      ]
    },
    {
      demoId: 'transfer-pagination',
      name: {
        'zh-CN': '分页',
        'en-US': 'transfer pagination'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>pageable</code>配置是否开启分页；通过属性<code>pageSize</code>配置每页展示的条数。</p>',
        'en-US': 'transfer pagination'
      },
      apis: [
        'TiTransferComponent.properties.pageable',
        'TiTransferComponent.properties.pageSize'
       ]
    },
    {
      demoId: 'transfer-table',
      name: { 'zh-CN': '表格', 'en-US': 'transfer table' },
      desc: {
        'zh-CN': '<p>通过属性<code>type</code>配置穿梭框的类型，为<code>table</code>时使用表格类型；通过属性<code>columns</code>配置表格的表头列属性。</p>',
        'en-US': 'transfer table'
      },
      apis: [
        'TiTransferComponent.properties.type',
        'TiTransferComponent.properties.columns',
        'TiTransferComponent.slots.rowTemplate',
        'TiTransferColumn'
      ]
    }
  ]
}
