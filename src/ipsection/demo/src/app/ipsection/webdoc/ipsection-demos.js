export default {
  column: '2',

  demos: [
    {
      demoId: 'ipsection-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'ipsection basic',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>configs</code>配置组件各网段的渲染数据。',
        'en-US': '<p>ipsection basic</p>',
      },
      apis: [
        'TiIpsectionComponent.properties.configs',
        'TiIpsectionConfig.properties.section',
        'TiIpsectionConfig.properties.options',
        'TiIpsectionConfig.properties.bold',
      ],
    },
    {
      demoId: 'ipsection-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'ipsection disabled',
      },
      desc: {
        'zh-CN':
          '通过属性<code>disabled</code>配置整体是否为禁用状态；通过属性<code>configs</code>配置各网段是否为禁用状态。',
        'en-US': '<p>ipsection disabled</p>',
      },
      apis: [
        'TiIpsectionComponent.properties.disabled',
        'TiIpsectionConfig.properties.disabled',
      ],
    },
    {
      demoId: 'ipsection-valid',
      name: {
        'zh-CN': '表单校验',
        'en-US': 'ipsection valid',
      },
      desc: {
        'zh-CN':
          '通过属性<code>configs</code>配置组件各网段的校验规则和 tip 等配置项。',
        'en-US': '<p>ipsection valid</p>',
      },
      apis: [
        'TiIpsectionConfig.properties.validation',
        'TiIpsectionConfig.properties.validationRules',
      ],
    },
    {
      demoId: 'ipsection-valid-formgroup',
      name: {
        'zh-CN': '响应式表单',
        'en-US': 'ipsection valid formgroup',
      },
      desc: {
        'zh-CN': '响应式表单的用法。',
        'en-US': '<p>ipsection valid formgroup</p>',
      },
    },
  ],
};
