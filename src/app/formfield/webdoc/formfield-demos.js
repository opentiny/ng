export default {
  column: '1',

  demos: [
    {
      demoId: 'formfield-single-column',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>Formfield 组件的最简用法。通过属性<code>title</code>配置表单名称。</p>',
        'en-US': '<p>Basic usage</p>',
      },
      apis: ['TiFormfieldComponent.properties.title', 'TiButtonItemComponent'],
    },
    {
      demoId: 'formfield-multi-column',
      name: {
        'zh-CN': '多列表单',
        'en-US': '',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>colsNumber</code>配置表单列数。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiFormfieldComponent.properties.colsNumber'],
    },
    {
      demoId: 'formfield-label',
      name: {
        'zh-CN': '表单项标签',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>支持两种方式配置表单项标签的内容：1.通过 ti-item 组件的属性<code>label</code>配置字符串变量；2.通过 ti-item-label 组件自定义表单项标签的内容。通过 ti-item 组件的属性<code>labelWidth</code>配置表单项标签的宽度。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiFormfieldComponent.properties.labelWidth',
        'TiItemComponent.properties.label',
      ],
    },
    {
      demoId: 'formfield-colswidth',
      name: {
        'zh-CN': '列宽',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>colsWidth</code>配置表单列宽；通过属性<code>colsGap</code>配置表单列间距。注意：若同时设置<code>colsWidth</code>和<code>colsGap</code>，则列间距为<code>colsGap</code>中第一个元素的值。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiFormfieldComponent.properties.colsGap',
        'TiFormfieldComponent.properties.colsWidth',
      ],
    },
    {
      demoId: 'formfield-show',
      name: {
        'zh-CN': '显示/隐藏表单项',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过 ti-item、ti-button-item 组件的属性<code>show</code>配置是否外显表单项。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiItemComponent.properties.show',
        'TiButtonItemComponent.properties.show',
      ],
    },
    {
      demoId: 'formfield-required',
      name: {
        'zh-CN': '必填项',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过 ti-item 组件的属性<code>required</code>配置是否为必填项。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiItemComponent.properties.required'],
    },
    {
      demoId: 'formfield-vertical-align',
      name: {
        'zh-CN': '垂直方向对齐方式',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>verticalAlign</code>配置表单在垂直方向的对齐方式，包括：<code>top</code>、<code>middle</code>、<code>bottom</code>。你也可以通过 ti-item、ti-button-item 组件的属性<code>verticalAlign</code>配置该表单项在垂直方向的对齐方式。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiFormfieldComponent.properties.verticalAlign',
        'TiButtonItemComponent.properties.verticalAlign',
        'TiItemComponent.properties.verticalAlign',
      ],
    },
    {
      demoId: 'formfield-text-form',
      name: {
        'zh-CN': '纯文本表单',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>type</code>配置表单类型，包括：<code>default</code>（默认）、<code>text</code>（纯文本表单）。通过属性<code>textLineHeight</code>配置纯文本表单的行高。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiFormfieldComponent.properties.textLineHeight',
        'TiFormfieldComponent.properties.type',
      ],
    },
    {
      demoId: 'formfield-vertical',
      name: {
        'zh-CN': '纵向布局',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过 ti-item 组件的属性<code>vertical</code>配置表单为纵向布局。注意：纵向布局不适用于纯文本表单，纵向布局表单不支持通过<code>verticalAlign</code>配置表单项垂直对齐方式。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'formfield-colspan-rowspan',
      name: {
        'zh-CN': '表单合并',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过 ti-item 组件的属性<code>rowspan</code>配置表单项可横跨的行数。通过 ti-item 组件的属性<code>colspan</code>配置表单项可横跨的列数。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiItemComponent.properties.colspan',
        'TiItemComponent.properties.rowspan',
      ],
    },
    {
      demoId: 'formfield-index',
      name: {
        'zh-CN': '表单项顺序',
        'en-US': '',
      },
      desc: {
        'zh-CN':
          '<p>通过 ti-item 组件的属性<code>index</code>配置 Item 的顺序，数值越大越靠后展示。默认按照 ti-item 的解析顺序展示。注意：若使用该属性自定义顺序，则需要为所有 ti-item 设置值。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiItemComponent.properties.index'],
    },
  ],
};
