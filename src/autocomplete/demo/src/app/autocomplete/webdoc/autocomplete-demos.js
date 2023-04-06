export default {
  column: '2',
  demos: [
    {
      demoId: 'autocomplete-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN':
          '<p>通过<code>options</code>配置下拉建议项固定的场景，在输入过程中对下拉建议项进行模糊过滤。通过<code>suggest</code>配置下拉建议项不固定的场景，在聚焦或值改变时，调用<code>setSuggestions</code>方法设置下拉建议项。</p>',
        'en-US': ''
      },
      apis: [
        'TiAutocompleteComponent.properties.options',
        'TiAutocompleteComponent.properties.placeholder',
        'TiAutocompleteComponent.events.suggest',
        'TiAutocompleteComponent.methods.setSuggestions'
      ]
    },
    {
      demoId: 'autocomplete-appendtobody',
      name: {
        'zh-CN': '附着在body上',
        'en-US': 'appendToBody'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>appendToBody</code>配置下拉面板是否附着在 body 上。在有局部滚动条的场景下，如果配置成 false，下拉面板和选择框不会分离。',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.appendToBody']
    },
    {
      demoId: 'autocomplete-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'disabled'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.disabled']
    },
    {
      demoId: 'autocomplete-clearable',
      name: {
        'zh-CN': '清除功能',
        'en-US': 'clearable'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>clearable</code>配置一键清除功能。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.clearable']
    },
    {
      demoId: 'autocomplete-labelkey',
      name: {
        'zh-CN': '显示文本',
        'en-US': 'labelkey'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>labelKey</code>配置显示文本的键值。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.labelKey']
    },
    {
      demoId: 'autocomplete-maxlength',
      name: {
        'zh-CN': '允许的最大字符数',
        'en-US': 'maxlength'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>maxlength</code>配置输入框中允许的最大字符数。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.maxlength']
    },
    {
      demoId: 'autocomplete-panel-size',
      name: {
        'zh-CN': '下拉面板大小',
        'en-US': 'panelSize'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>panelWidth</code>配置下拉面板的宽度，包括<code>auto</code>、<code>justified</code>、<code>string</code>三种类型。通过属性<code>panelMaxHeight</code>配置下拉面板的最大高度。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.panelWidth', 'TiAutocompleteComponent.properties.panelMaxHeight']
    },
    {
      demoId: 'autocomplete-tip',
      name: {
        'zh-CN': '下拉面板 tip 提示',
        'en-US': 'tip'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tipPosition</code>配置下拉 tip 提示方向。通过属性<code>tipMaxWidth</code>配置 tip 框最大宽度。通过<code>options</code>接口中<code>tip</code>属性配置 tip 内容。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.tipPosition', 'TiAutocompleteComponent.properties.tipMaxWidth']
    },
    {
      demoId: 'autocomplete-valid',
      name: {
        'zh-CN': '校验',
        'en-US': 'autocomplete validation'
      },
      desc: {
        'zh-CN': '<p>通过指令<code>tiValidation</code>实现校验。</p>',
        'en-US': ''
      }
    },
    {
      demoId: 'autocomplete-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'events'
      },
      desc: {
        'zh-CN':
          '<p>当元素聚焦的时候触发<code>focus</code>事件。当元素失焦的时候触发<code>blur</code>事件。当元素内容发生变化的时候触发<code>ngModelChange</code>事件。当点击叉号清除时触发<code>clear</code>事件。当选中选项时触发<code>select</code>事件。</p>',
        'en-US': ''
      },
      apis: [
        'TiAutocompleteComponent.events.focus',
        'TiAutocompleteComponent.events.blur',
        'TiAutocompleteComponent.events.ngModelChange',
        'TiAutocompleteComponent.events.clear',
        'TiAutocompleteComponent.events.select'
      ]
    },
    {
      demoId: 'autocomplete-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'template'
      },
      desc: {
        'zh-CN': '<p>通过<code>#item</code>配置下拉面板中选项的模板。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.slots.itemTemplate']
    },
    {
      demoId: 'autocomplete-group',
      name: {
        'zh-CN': '分组',
        'en-US': 'group'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>options</code>中的<code>children</code>属性设置分组。</p>',
        'en-US': ''
      },
      apis: ['TiAutocompleteComponent.properties.options']
    }
  ]
};
