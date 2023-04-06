export default {
  column: '2',

  demos: [
    {
      demoId: 'appendToBody',
      name: {
        'zh-CN': '附着在body上',
        'en-US': 'appendToBody',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>appendToBody</code>配置下拉面板是否附着在<code>body</code>上。在有局部滚动条的场景下，如果配置成false，下拉面板和选择框不会分离',
        'en-US': '<p>button color</p>',
      },
      tag: 'website-tiny-select-appendtobody',
      codeFiles: ['select-appendtobody.html', 'SelectAppendtobodyComponent.ts'],
    },
    {
      demoId: 'beforeOpen',
      name: {
        'zh-CN': '懒加载',
        'en-US': 'beforeOpen',
      },
      desc: {
        'zh-CN': '下拉面板展开前触发的回调，一般用于懒加载场景。',
        'en-US': '<p>button color</p>',
      },
      tag: 'website-tiny-select-lazy',
      codeFiles: ['select-lazy.html', 'SelectLazyComponent.ts'],
    },
    {
      demoId: 'template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'item',
      },
      desc: {
        'zh-CN':
          '通过<code>placeholder</code>配置选择框提示文本的模板。通过<code>selected</code>配置选择框中选中项的模板。通过<code>item</code>配置下拉列表中选项的模板。通过<code>footer</code>配置下拉列表底部的模板。',
        'en-US': '<p>item</p>',
      },
      tag: 'website-tiny-select-template',
      codeFiles: ['select-template.html', 'SelectTemplateComponent.ts'],
    },
  ],
};
