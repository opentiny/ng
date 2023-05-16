export default {
  column: '2',

  demos: [
    {
      demoId: 'searchbox-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic'
      },
      desc: {
        'zh-CN': '<p>Searchbox 组件的最简用法。</p>',
        'en-US': '<p>button color</p>'
      },
      apis: ['TiSearchboxComponent.properties.placeholder']
    },
    {
      demoId: 'searchbox-template',
      name: {
        'zh-CN': '下拉建议项模板',
        'en-US': 'template'
      },
      desc: {
        'zh-CN': '<p>自定义下拉建议项模板。</p>',
        'en-US': '<p>button color</p>'
      },
      apis: ['TiSearchboxComponent.slots.itemTemplate']
    },
    {
      demoId: 'searchbox-trimmed',
      name: {
        'zh-CN': '删除搜索内容的首尾空格',
        'en-US': 'trimmed'
      },
      desc: {
        'zh-CN': '<p>通过<code>trimmed</code>配置是否删除用户搜索内容的首尾空格，不配置时不删除空格。</p>',
        'en-US': '<p>trimmed</p>'
      },
      apis: ['TiSearchboxComponent.properties.trimmed']
    },
    {
      demoId: 'searchbox-options',
      name: {
        'zh-CN': '固定下拉建议项',
        'en-US': 'options'
      },
      desc: {
        'zh-CN': '<p>通过<code>options</code>配置下拉建议项。</p>',
        'en-US': '<p>options</p>'
      },
      apis: ['TiSearchboxComponent.properties.options']
    },
    {
      demoId: 'searchbox-appendtobody',
      name: {
        'zh-CN': '附着在body上',
        'en-US': 'appendtobody'
      },
      desc: {
        'zh-CN':
          '<p>通过<code>appendToBody</code>配置下拉面板是否添加在 body 上，在有局部滚动条的场景下，如果配置成 false，下拉面板和选择框不会分离。</p>',
        'en-US': '<p>appendtobody</p>'
      },
      apis: ['TiSearchboxComponent.properties.appendToBody']
    },
    {
      demoId: 'searchbox-suggest',
      name: {
        'zh-CN': '动态加载下拉项',
        'en-US': 'item'
      },
      desc: {
        'zh-CN':
          '<p>通过<code>suggest</code>事件配置当聚焦或值改变时触发事件，为开发者提供设置建议项的时机。通过<code>setLoading()</code>方法设置加载状态。</p>',
        'en-US': '<p>item</p>'
      },
      apis: [
        'TiSearchboxComponent.events.suggest',
        'TiSearchboxComponent.methods.setSuggestions',
        'TiSearchboxComponent.methods.setLoading'
      ]
    },
    {
      demoId: 'searchbox-maxlength',
      name: {
        'zh-CN': '文本最大显示长度',
        'en-US': 'item'
      },
      desc: {
        'zh-CN': '<p>通过<code>maxlength</code>配置最大文本输入长度。</p>',
        'en-US': '<p>item</p>'
      },
      apis: ['TiSearchboxComponent.properties.maxlength']
    },
    {
      demoId: 'searchbox-panelsize',
      name: {
        'zh-CN': '下拉面板大小',
        'en-US': 'item'
      },
      desc: {
        'zh-CN': '<p>通过<code>panelWidth</code>配置下拉框的宽度。通过<code>panelMaxHeight</code>配置面板最大高度。</p>',
        'en-US': '<p>item</p>'
      },
      apis: ['TiSearchboxComponent.properties.panelWidth', 'TiSearchboxComponent.properties.panelMaxHeight']
    },
    {
      demoId: 'searchbox-reactive',
      name: {
        'zh-CN': '响应式表单',
        'en-US': 'item'
      },
      desc: {
        'zh-CN': '<p>响应式表单的基本用法。</p>',
        'en-US': '<p>item</p>'
      },
      apis: ['TiSearchboxComponent.properties.placeholder']
    },
    {
      demoId: 'searchbox-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'item'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否为禁用状态。</p>',
        'en-US': '<p>item</p>'
      },
      apis: ['TiSearchboxComponent.properties.disabled']
    },
    {
      demoId: 'searchbox-valid',
      name: {
        'zh-CN': '表单校验',
        'en-US': 'item'
      },
      desc: {
        'zh-CN': '<p>表单校验的用法。</p>',
        'en-US': '<p>item</p>'
      }
    },
    {
      demoId: 'searchbox-virtualscroll',
      name: {
        'zh-CN': '虚拟滚动',
        'en-US': 'virtualscroll'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>virtual</code>配置组件是否开启虚拟滚动，一般用于下拉数据量大的场景。</p>',
        'en-US': ''
      },
      apis: ['TiSearchboxComponent.properties.virtual']
    },
    {
      demoId: 'searchbox-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'item'
      },
      desc: {
        'zh-CN':
          '<p>当输入框聚焦按下 enter 键、点击下拉项、点击搜索按钮的时候触发<code>search</code>事件；当点击叉号的时候触发<code>clear</code>事件；当点击下拉项的时候触发<code>select</code>事件；当聚焦的时候触发<code>focus</code>事件；当失焦的时候触发<code>blur</code>事件。</p>',
        'en-US': '<p>item</p>'
      },
      apis: [
        'TiSearchboxComponent.events.search',
        'TiSearchboxComponent.events.clear',
        'TiSearchboxComponent.events.select',
        'TiSearchboxComponent.events.blur',
        'TiSearchboxComponent.events.focus'
      ]
    }
  ]
};
