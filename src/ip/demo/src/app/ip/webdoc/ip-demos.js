export default {
  column: '2',

  demos: [
    {
      demoId: 'ip-basic',
      name: {
        'zh-CN': '基本使用',
        'en-US': 'ip basic',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>version</code>配置 ip 版本号；IPv6 支持缩略格式，例如 1111::8888。</p>',
        'en-US': '<p>ip basic</p>',
      },
      apis: ['TiIpComponent.properties.version'],
    },
    {
      demoId: 'ip-formcontrol',
      name: {
        'zh-CN': '响应式表单',
        'en-US': 'ip formcontrol',
      },
      desc: {
        'zh-CN': '<p>响应式表单的用法。</p>',
        'en-US': '<p>ip formcontrol</p>',
      },
    },
    {
      demoId: 'ip-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'ip disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置是否禁用。</p>',
        'en-US': '<p>ip disabled</p>',
      },
      apis: ['TiIpComponent.properties.disabled'],
    },
    {
      demoId: 'ip-valid',
      name: {
        'zh-CN': '表单校验',
        'en-US': 'ip valid',
      },
      desc: {
        'zh-CN': '<p>表单校验的用法。</p>',
        'en-US': '<p>ip valid</p>',
      },
    },
  ],
};
