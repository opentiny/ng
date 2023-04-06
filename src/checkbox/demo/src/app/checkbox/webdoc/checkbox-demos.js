export default {
  column: '2',

  demos: [
    {
      demoId: 'checkbox-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': 'Checkbox 组件的最简用法。',
        'en-US': ''
      },
      apis: ['TiCheckboxComponent.properties.label']
    },
    {
      demoId: 'checkbox-group',
      name: {
        'zh-CN': '复选组',
        'en-US': 'group'
      },
      desc: {
        'zh-CN':
          '<p>通过<code>tiCheckitem</code>的<code>beCheckeds</code>获取选中值；通过属性<code>items</code>配置<code>checkbox-group</code>所有选项的数据集合。</p>',
        'en-US': ''
      },
      apis: [
        'TiCheckgroupComponent.properties.beCheckeds',
        'TiCheckgroupComponent.properties.item',
        'TiCheckgroupComponent.properties.label',
        'TiCheckboxGroupComponent.properties.items',
        'TiCheckboxItem.properties.label',
        'TiCheckboxItem.properties.id'
      ]
    },
    {
      demoId: 'checkbox-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>disabled</code>配置禁用状态，通过属性<code>item.disabled</code>配置<code>checkbox-group</code>选项禁用状态。</p>',
        'en-US': ''
      },
      apis: ['TiCheckboxComponent.properties.disabled', 'TiCheckgroupComponent.properties.disabled', 'TiCheckboxItem.properties.disabled']
    },
    {
      demoId: 'checkbox-label',
      name: {
        'zh-CN': '自定义文本',
        'en-US': 'label'
      },
      desc: {
        'zh-CN': '通过<code>label</code>标签自定义显示文本；通过<code>#item</code>配置<code>checkbox-group</code>选项区域的模板。',
        'en-US': ''
      },
      apis: ['TiCheckboxGroupComponent.slots.itemTemplate']
    },
    {
      demoId: 'checkbox-indeterminate',
      name: {
        'zh-CN': '全选',
        'en-US': 'indeterminate'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>indeterminate</code>配置半选状态；通过<code>tiCheckgroup</code>与<code>tiCheckitem</code>，实现一组数据的全选功能。</p>',
        'en-US': ''
      },
      apis: ['TiCheckgroupComponent.properties.checkeds', 'TiCheckgroupComponent.properties.items']
    },
    {
      demoId: 'checkbox-group-direction',
      name: {
        'zh-CN': '竖向排列',
        'en-US': 'direction'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>direction</code>配置<code>checkbox-group</code>排列方向，包括<code>vertical</code>、<code>horizontal</code>（默认）两种类型。</p>',
        'en-US': ''
      },
      apis: ['TiCheckboxGroupComponent.properties.direction']
    },
    {
      demoId: 'checkbox-group-labelkey',
      name: {
        'zh-CN': '显示字段',
        'en-US': 'labelkey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置 Checkboxgroup 组件显示数据的键值。',
        'en-US': 'labelkey'
      },
      apis: ['TiCheckboxGroupComponent.properties.labelKey']
    },
    {
      demoId: 'checkbox-group-valuekey',
      name: {
        'zh-CN': '选中值',
        'en-US': 'valuekey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>valueKey</code>配置组件选中项数据的键值。',
        'en-US': 'valuekey'
      },
      apis: ['TiCheckboxGroupComponent.properties.valueKey', 'TiCheckgroupComponent.properties.valueKey']
    },
    {
      demoId: 'checkbox-group-validation',
      name: {
        'zh-CN': '表单校验',
        'en-US': 'validation'
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'checkbox-group-linewrap',
      name: {
        'zh-CN': '自动换行',
        'en-US': 'linewrap'
      },
      desc: {
        'zh-CN': '超过固定宽度会自动换行。',
        'en-US': ''
      }
    },
    {
      demoId: 'checkbox-group-level',
      name: {
        'zh-CN': '关系复杂的数据',
        'en-US': 'level'
      },
      desc: {
        'zh-CN': '通过<code>tiCheckgroup</code>与<code>tiCheckitem</code>管理较为复杂的数据。',
        'en-US': ''
      }
    },
    {
      demoId: 'checkbox-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event'
      },
      desc: {
        'zh-CN': '当元素的值发生变化时触发<code>ngModelChange</code>事件。',
        'en-US': ''
      }
    }
  ],
  ignoreApis: ['TiCheckboxGroupComponent.properties.disabled']
};
