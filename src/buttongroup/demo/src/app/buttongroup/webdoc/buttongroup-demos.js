export default {
  column: '2',

  demos: [
    {
      demoId: 'buttongroup-items',
      name: {
        'zh-CN': '基本使用',
        'en-US': '',
      },
      desc: {
        'zh-CN': 'Buttongroup 组件的最简用法。默认单选。',
        'en-US': '',
      },
      apis: [
        'TiButtongroupComponent.properties.items',
        'TiButtonItem.properties.text',
      ],
    },
    {
      demoId: 'buttongroup-multiple',
      name: {
        'zh-CN': '多选',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>multiple</code>配置为多选选块组，注意 ngModel 绑定值为数组。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.multiple'],
    },
    {
      demoId: 'buttongroup-radio-type',
      name: {
        'zh-CN': '不同样式的单选选块组',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>type</code>属性配置选块样式，默认为<code>large</code>，包括<code>large</code>、<code>small</code>、<code>noBorder</code>三种类型。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.type'],
    },
    {
      demoId: 'buttongroup-multi-type',
      name: {
        'zh-CN': '不同大小的多选选块组',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>type</code>属性配置选块样式，默认为<code>large</code>，包括<code>large</code>、<code>small</code>两种类型。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.type'],
    },
    {
      demoId: 'buttongroup-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过属性<code>disabled</code>配置整体是否为禁用状态，仅限于单选模式；通过<code>items.disabled</code>配置单个选块是否为禁用状态。',
        'en-US': '',
      },
      apis: [
        'TiButtongroupComponent.properties.disabled',
        'TiButtonItem.properties.disabled',
      ],
    },
    {
      demoId: 'buttongroup-valuekey',
      name: {
        'zh-CN': '选中值是一个基本类型数据',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>valueKey</code>配置选中值是一个基本类型的数据，而不是默认的引用类型。<code>valueKey</code>传入<code>item</code>对象某个键名，选中值即为该键名的值。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.valueKey'],
    },
    {
      demoId: 'buttongroup-sup',
      name: {
        'zh-CN': '选块角标',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>#sup</code>模板配置选块角标。角标样式由业务自定义，不提供公共样式。如果不显示，排查是否设置<code>encapsulation: ViewEncapsulation.None</code>。</p>',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.slots.supTemplate'],
    },
    {
      demoId: 'buttongroup-deselectable',
      name: {
        'zh-CN': '取消单选选中',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>deselectable</code>属性配置是否可以取消选中，仅限于单选模式。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.deselectable'],
    },
    {
      demoId: 'buttongroup-minwidth',
      name: {
        'zh-CN': '每个选块的最小宽度',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>minwidth</code>配置每个选块的最小宽度。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.minWidth'],
    },
    {
      demoId: 'buttongroup-template',
      name: {
        'zh-CN': '自定义内容',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>#item</code>模板配置选块内容。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.slots.itemTemplate'],
    },
    {
      demoId: 'buttongroup-tip',
      name: {
        'zh-CN': '添加 tip 提示',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '通过<code>items.tipContent</code>配置提示信息，10.1.1 版本起，tip 接口的类型扩展为：string | TemplateRef<any> | Component<any>，旧版本为：string。通过<code>items.tipPosition</code>配置提示信息方位。超长文本以 title 显示，不建议使用 tip 提示。',
        'en-US': '',
      },
      apis: [
        'TiButtonItem.properties.tipContent',
        'TiButtonItem.properties.tipPosition',
      ],
    },
    {
      demoId: 'buttongroup-multiline',
      name: {
        'zh-CN': '较多的选块折行显示',
        'en-US': '',
      },
      desc: {
        'zh-CN': '通过<code>multiline</code>配置多个选块在折行显示时有行间距。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.properties.multiline'],
    },
    {
      demoId: 'buttongroup-beforeclick',
      name: {
        'zh-CN': 'beforeClick事件',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '按下非禁用的选块时触发的回调，参数为当前选块<code>item</code>，是否选中由业务处理，一般用于阻止选中。',
        'en-US': '',
      },
      apis: ['TiButtongroupComponent.events.beforeClick'],
    },
  ],
};
