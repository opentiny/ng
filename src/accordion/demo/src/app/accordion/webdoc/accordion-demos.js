export default {
  column: '2',
  demos: [
    {
      demoId: 'accordion-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>Accordion 组件的最简用法。注意：（1）同时只有一个面板是展开状态（2）使用<code><ti-accordion-item></code>分割多个面板。<code>ti-accordion-head</code>定义面板标题。</p>',
        'en-US':
          '<p>only one panel can be expanded at the same time.</p><p>Use <code>ti-accordion-item</code> to separate group of content. <code>ti-accordion-head</code> is used for title of panels.</p>',
      },
    },
    {
      demoId: 'accordion-class',
      name: {
        'zh-CN': '样式设置',
        'en-US': 'Class',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>headClass</code>、<code>bodyClass</code>分别配置面板标题及内容区域的样式。</p>',
        'en-US':
          '<p>Set the styles of the head and content through <code>headClass</code> <code>bodyClass</code> props respectively.</p>',
      },
      apis: [
        'TiAccordionComponent.properties.bodyClass',
        'TiAccordionComponent.properties.headClass',
      ],
    },
    {
      demoId: 'accordion-open',
      name: {
        'zh-CN': '默认打开',
        'en-US': 'Active',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>open</code>配置面板展开状态。</p>',
        'en-US':
          '<p>Use the <code>open</code> prop to control the active panels.</p>',
      },
      apis: ['TiAccordionItemComponent.properties.open'],
    },
    {
      demoId: 'accordion-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'Disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置面板禁用状态。</p>',
        'en-US':
          '<p>Use the <code>disabled</code> prop to disable the panel.</p>',
      },
      apis: ['TiAccordionItemComponent.properties.disabled'],
    },
    {
      demoId: 'accordion-close-others',
      name: {
        'zh-CN': '关闭其他',
        'en-US': 'Close Others',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>closeOthers</code>配置用户打开一个面板时其他面板的展开状态。</p>',
        'en-US':
          '<p>The <code>closeOthers</code> prop is used to control whether other panel is expanded when user opens a panel.</p>',
      },
      apis: ['TiAccordionComponent.properties.closeOthers'],
    },
    {
      demoId: 'accordion-click-toggle',
      name: {
        'zh-CN': '点击不展开面板',
        'en-US': 'clickabled',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>clickToggle</code>配置用户点击面板标题是否展开内容区域。注意：此属性设置为 false 后，您仍然可以通过属性<code>open</code>实现面板展开状态的变更。</p>',
        'en-US':
          '<p>The <code>clickToggle</code> prop is used to control whether the panel is expanded when user clicks.</p><p>You can also control the panel by changing the value of the <code>open</code> prop</p>',
      },
      apis: [
        'TiAccordionItemComponent.properties.clickToggle',
        'TiAccordionItemComponent.events.headClick',
      ],
    },
  ],
};
