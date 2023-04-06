export default {
  column: '2',
  demos: [
    {
      demoId: 'intro-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'basic',
      },
      desc: {
        'zh-CN': '<p>通过<code>create</code>方法创建 intro 实例。</p>',
        'en-US': '<p>basic</p>',
      },
      apis: [
        'TiIntroService.methods.create',
        'TiIntroStep.properties.element',
        'TiIntroStep.properties.step',
        'TiIntroStep.properties.shape',
        'TiIntroStep.properties.title',
        'TiIntroStep.properties.content',
        'TiIntroStep.properties.position',
        'TiIntroStep.properties.isAction',
      ],
    },
    {
      demoId: 'intro-event',
      name: {
        'zh-CN': '事件',
        'en-US': 'event',
      },
      desc: {
        'zh-CN':
          '<p>当每一步打开前的时候触发<code>beforeStep</code>事件，当完成引导的时候触发<code>onFinish</code>事件，当退出引导的时候触发<code>onExit</code>事件。</p>',
        'en-US': '<p>event</p>',
      },
      apis: [
        'TiIntroConfig.properties.steps',
        'TiIntroConfig.properties.skipable',
        'TiIntroConfig.methods.beforeStep',
        'TiIntroConfig.methods.onExit',
        'TiIntroConfig.methods.onFinish',
        'TiIntroConfig.properties.finishButtonText',
        'TiIntroConfig.properties.id',
      ],
    },
  ],
};
