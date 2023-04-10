export default {
  column: '1',
  demos: [
    {
      demoId: 'skeleton-type',
      name: {
        'zh-CN': '类型',
        'en-US': 'skeleton type'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>type</code>配置骨架屏的类型，包含<code>rows</code>、<code>block</code>两种类型。',
        'en-US': 'skeleton type'
      },
      apis: ['TiSkeletonComponent.properties.type'],
      codeFiles: ['skeleton-type.html', 'SkeletonTypeComponent.ts', 'skeleton.less']
    },
    {
      demoId: 'skeleton-title',
      name: {
        'zh-CN': '标题',
        'en-US': 'skeleton title'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>title</code>配置是否有标题。',
        'en-US': 'skeleton title'
      },
      apis: ['TiSkeletonComponent.properties.title'],
      codeFiles: ['skeleton-title.html', 'SkeletonTitleComponent.ts', 'skeleton.less']
    },
    {
      demoId: 'skeleton-page',
      name: {
        'zh-CN': '在典型页面中使用',
        'en-US': 'skeleton page'
      },
      desc: {
        'zh-CN': 'skeleton 组件在典型页面中使用。',
        'en-US': '<p>skeleton page</p>'
      },
      codeFiles: ['skeleton-page.html', 'SkeletonPageComponent.ts', 'skeleton-page.less']
    }
  ]
};
