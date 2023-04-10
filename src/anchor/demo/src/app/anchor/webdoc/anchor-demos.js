export default {
  column: '1',
  demos: [
    {
      demoId: 'anchor-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Anchor 组件的最简用法。</p>',
        'en-US': '',
      },
      apis: [
        'TiAnchorComponent.properties.items',
        'TiAnchorItem.properties.id',
        'TiAnchorItem.properties.title'
      ]
    },
    {
      demoId: 'anchor-id',
      name: {
        'zh-CN': '当前激活锚点 id',
        'en-US': 'id',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>anchorId</code>配置当前激活锚点 id，对应容器中联动的 DOM 元素 id；当锚点改变时触发<code>anchorIdChange</code>事件，传出的参数为当前锚点 id。</p>',
        'en-US': '',
      },
      apis: [
        'TiAnchorComponent.properties.anchorId',
        'TiAnchorComponent.events.anchorIdChange'
      ]
    },
    {
      demoId: 'anchor-offsettop',
      name: {
        'zh-CN': '滚动偏移量',
        'en-US': 'offsettop',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>offsetTop</code>配置点击锚点时，容器滚动至 Dom 元素距容器顶部距离达到该值时对应锚点高亮。</p>',
        'en-US': '',
      },
      apis: ['TiAnchorComponent.properties.offsetTop']
    },
    {
      demoId: 'anchor-speed',
      name: {
        'zh-CN': '滚动速度',
        'en-US': 'speed',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>speed</code>配置点击锚点时，容器滚动速度。</p>',
        'en-US': '',
      },
      apis: ['TiAnchorComponent.properties.speed']
    },
    {
      demoId: 'anchor-template',
      name: {
        'zh-CN': '自定义模板',
        'en-US': 'template',
      },
      desc: {
        'zh-CN': '<p>通过<code>#item</code>配置锚点内容区域的模板。</p>',
        'en-US': '',
      },
      apis: ['TiAnchorComponent.slots.itemTemplete']
    },
    {
      demoId: 'anchor-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'events',
      },
      desc: {
        'zh-CN': '<p>当选中锚点时触发<code>select</code>事件，传递出去的参数为当前锚点 id。</p>',
        'en-US': '',
      },
      apis: ['TiAnchorComponent.events.select']
    },
    {
      demoId: 'anchor-scrolltarget',
      name: {
        'zh-CN': '滚动容器',
        'en-US': 'scrolltarget',
      },
      desc: {
        'zh-CN': '<p>通过<code>scrollTarget</code>配置滚动容器，当滚动容器是整个文档时无需配置。</p>',
        'en-US': '',
      },
      apis: ['TiAnchorComponent.properties.scrollTarget']
    },
  ],
};
