export default {
  column: '2',
  demos: [
    {
      demoId: 'score-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>Score 组件的最简用法。</p>',
        'en-US': '<p>score basic</p>',
      },
    },
    {
      demoId: 'score-limittext',
      name: {
        'zh-CN': '文本',
        'en-US': 'limittext',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>minText</code>和<code>maxText</code>配置两侧文本。</p>',
        'en-US': '<p>score limittext</p>',
      },
      apis: [
        'TiScoreComponent.properties.minText',
        'TiScoreComponent.properties.maxText',
      ],
    },
  ],
};
