export default {
  column: '2',
  demos: [
    {
      demoId: 'overflow-maxline',
      name: {
        'zh-CN': '单行、多行溢出',
        'en-US': 'maxline',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>maxline</code>配置文本最大行数。注意：多行效果需要设置宿主元素的 line-height</p>',
        'en-US': '<p>button color</p>',
      },
      apis: [
        'TiOverflowDirective.properties.tiOverflow',
        'TiOverflowMaxlineDirective.properties.tiOverflow',
        'TiOverflowMaxlineDirective.properties.maxLine',
        'TiOverflowMaxlineDirective.properties.textContent',
      ],
    },
    {
      demoId: 'overflow-maxwidth',
      name: {
        'zh-CN': '溢出提示的最大宽度',
        'en-US': 'maxwidth',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipMaxWidth</code>配置文本过长时显示的 tip 的最大宽度。</p>',
        'en-US': '<p>maxwidth</p>',
      },
      apis: [
        'TiOverflowDirective.properties.tiTipMaxWidth',
        'TiOverflowMaxlineDirective.properties.tiTipMaxWidth',
      ],
    },
    {
      demoId: 'overflow-tipcontent',
      name: {
        'zh-CN': 'tip内容',
        'en-US': 'item',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipContent</code>配置文本过长时显示的 tip 内容，默认为宿主元素文本。</p>',
        'en-US': '<p>item</p>',
      },
      apis: [
        'TiOverflowDirective.properties.tiTipContent',
        'TiOverflowMaxlineDirective.properties.tiTipContent',
      ],
    },
    {
      demoId: 'overflow-position',
      name: {
        'zh-CN': 'tip方向',
        'en-US': 'item',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>tiTipPosition</code>配置文本过长时显示的 tip 位置。</p>',
        'en-US': '<p>tipposition</p>',
      },
      apis: [
        'TiOverflowDirective.properties.tiTipPosition',
        'TiOverflowMaxlineDirective.properties.tiTipPosition',
      ],
    },
  ],
};
