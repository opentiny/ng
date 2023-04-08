export default {
  column: '2',
  demos: [
    {
      demoId: 'progressbar-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>Progressbar 组件的最简用法。通过属性<code>max</code>配置边界值。通过属性<code>value</code>配置当前进度值。</p>',
        'en-US':
          '<p>Progressbar 组件的最简用法。通过属性max配置边界值。通过属性value配置当前进度值。</p>',
      },
      apis: [
        'TiProgressbarComponent.properties.max',
        'TiProgressbarComponent.properties.value',
      ],
    },
    {
      demoId: 'progressbar-class',
      name: {
        'zh-CN': '样式设置',
        'en-US': 'Class',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>progressClass</code>配置进度条样式。</p>',
        'en-US': '<p>通过属性<code>progressClass</code>配置进度条样式。</p>',
      },
      apis: ['TiProgressbarComponent.properties.progressClass'],
    },
    {
      demoId: 'progressbar-animation',
      name: {
        'zh-CN': '动画',
        'en-US': 'Animation',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>animation</code>配置是否打开动画效果，默认开启。</p>',
        'en-US':
          '<p>通过属性<code>animation</code>配置是否打开动画效果，默认开启。</p>',
      },
      apis: ['TiProgressbarComponent.properties.animation'],
    },
  ],
};
