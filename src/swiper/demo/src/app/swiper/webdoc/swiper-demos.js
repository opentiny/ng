export default {
  column: '2',
  demos: [
    {
      demoId: 'swiper-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'swiper basic'
      },
      desc: {
        'zh-CN': '<p>Swiper 组件的最简用法。</p>',
        'en-US': 'swiper basic'
      },
      codeFiles: ['swiper-basic.html', 'SwiperBasicComponent.ts', 'swiper.less']
    },
    {
      demoId: 'swiper-loop',
      name: {
        'zh-CN': '禁止无限循环',
        'en-US': 'swiper loop'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>loop</code>配置是否无限循环。</p>',
        'en-US': 'swiper loop'
      },
      codeFiles: ['swiper-loop.html', 'SwiperLoopComponent.ts', 'swiper.less'],
      apis: ['TiSwiperComponent.properties.loop']
    },
    {
      demoId: 'swiper-autoplay',
      name: {
        'zh-CN': '自动播放',
        'en-US': 'swiper autoplay'
      },
      desc: {
        'zh-CN': '<>通过属性<code>autoplay</code>配置是否自动播放。</p>',
        'en-US': 'swiper autoplay'
      },
      codeFiles: ['swiper-autoplay.html', 'SwiperAutoplayComponent.ts', 'swiper.less'],
      apis: ['TiSwiperComponent.properties.autoplay', 'TiSwiperComponent.properties.autoplaySpeed']
    },
    {
      demoId: 'swiper-activeindex',
      name: {
        'zh-CN': '指定当前展示项',
        'en-US': 'swiper activeindex'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>activeindex</code>配置当前展示项。</p>',
        'en-US': 'swiper activeindex'
      },
      codeFiles: ['swiper-activeindex.html', 'SwiperActiveindexComponent.ts', 'swiper.less'],

      apis: ['TiSwiperComponent.properties.activeIndex']
    },
    {
      demoId: 'swiper-showcardnum',
      name: {
        'zh-CN': '每页展示卡片数',
        'en-US': 'swiper showcardnum'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>showcardnum</code>配置每页展示卡片数。</p>',
        'en-US': 'swiper showcardnum'
      },
      codeFiles: ['swiper-showcardnum.html', 'SwiperShowcardnumComponent.ts', 'swiper.less'],
      apis: ['TiSwiperComponent.properties.showCardNum', 'TiSwiperComponent.properties.cardGap']
    },
    {
      demoId: 'swiper-indicatorposition',
      name: {
        'zh-CN': '指示器位置',
        'en-US': 'swiper indicatorposition'
      },
      desc: {
        'zh-CN': '<p>通过属性<code>indicatorposition</code>配置指示器位置。</p>',
        'en-US': 'swiper indicatorposition'
      },
      codeFiles: ['swiper-indicatorposition.html', 'SwiperIndicatorpositionComponent.ts', 'swiper.less'],
      apis: ['TiSwiperComponent.properties.indicatorPosition']
    },
    {
      demoId: 'swiper-events',
      name: {
        'zh-CN': '事件',
        'en-US': 'swiper events'
      },
      desc: {
        'zh-CN': '<p><code>activeIndex</code>改变时触发的回调，参数为改变后的<code>activeIndex</code>。</p>',
        'en-US': 'swiper events'
      },
      codeFiles: ['swiper-events.html', 'SwiperEventsComponent.ts', 'swiper.less'],
      apis: ['TiSwiperComponent.properties.']
    }
  ]
};
