export default {
  column: '1',
  demos: [
    {
      demoId: 'guides-basic',
      name: {
        'zh-CN': '基础',
        'en-US': 'guides basic'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>small</code>配置小尺寸样式。</p>',
        'en-US': 'guides basic'
      }
    },
    {
      demoId: 'guides-type',
      name: {
        'zh-CN': '错误/失败状态',
        'en-US': 'guides type'
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>activeIndex</code>配置当前激活项；通过属性<code>type</code>配置错误/失败状态，包含<code>info</code>、<code>error</code>两种类型。</p>',
        'en-US': 'guides type'
      },
      apis: ['TiGuideComponent.properties.type', 'TiGuidesComponent.properties.activeIndex']
    }
  ]
};
