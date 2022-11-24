export default {
  column: '2',

  demos: [
    {
      demoId: 'validation-basic-directive',
      name: {
        'zh-CN': '模板表单基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p><code>tiValidation</code>指令的基本用法之一。使用模板驱动表单，TinyNG 实现的校验规则及方法见 <a class="api-prop cur-hand" href="../docs/validators" target="blank">TiValidators</a>，你也可以使用 <a href="https://angular.cn/guide/form-validation" target="blank">Angular 表单校验规则</a>或自定义校验规则。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiValidationDirective.properties.tiValidation'],
    },
    {
      demoId: 'validation-basic-control',
      name: {
        'zh-CN': '响应式表单基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p><code>tiValidation</code>指令的另一种基本用法。使用响应式表单，TinyNG 实现的校验规则及方法见 <a class="api-prop cur-hand" href="../docs/validators" target="blank">TiValidators</a>，你也可以使用 <a href="https://angular.cn/guide/form-validation" target="blank">Angular 表单校验规则</a>或自定义校验规则。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'validation-blur-check',
      name: {
        'zh-CN': '失焦校验',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>通过将<code>TiValidationConfig</code>实例的属性<code>type</code>配置为<code>blur</code>开启失焦校验。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiValidationDirective.properties.errorMessageWrapper',
        'TiValidationConfig.properties.type',
      ],
    },
    {
      demoId: 'validation-tip',
      name: {
        'zh-CN': 'Tip',
        'en-US': 'Tip',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>TiValidationConfig</code>实例的属性<code>tip</code>配置 Tip 内容，通过属性<code>tipPosition</code>配置 Tip 弹出位置。注意：Tip 指提示语，是在用户输入内容前对用户输入预期的描述。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiValidationConfig.properties.tip',
        'TiValidationConfig.properties.tipPosition',
        'TiValidationConfig.properties.tipMaxWidth',
      ],
    },
    {
      demoId: 'validation-error-msg',
      name: {
        'zh-CN': '自定义错误信息',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>通过<code>TiValidationConfig</code>实例的属性<code>errorMessage</code>自定义错误提示信息；当<code>type</code>为<code>blur</code>/<code>password</code>时，可以通过属性<code>errorMessageWrapper</code>配置校验信息容器。注意：错误信息指用户输入内容后，对输入内容不符合校验规则部分的提示。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiValidationConfig.properties.errorMessage',
        'TiValidationConfig.properties.errorMessageWrapper',
      ],
    },
    {
      demoId: 'validation-pwd-check',
      name: {
        'zh-CN': '密码校验',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>通过将<code>TiValidationConfig</code>实例的属性<code>type</code>配置为<code>password</code>开启密码校验。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiValidationConfig.properties.passwordConfig',
        'TiPasswordValidatorConfig.properties.rule',
        'TiPasswordValidatorConfig.properties.message',
        'TiPasswordValidatorConfig.properties.params',
      ],
    },
    {
      demoId: 'validation-async-check',
      name: {
        'zh-CN': '异步校验',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>支持在 tiText 组件中通过自定义规则进行异步校验，支持在校验错误信息中通过<code>tiAsyncErrorMessage</code>属性配置校验错误提示信息。注意：异步校验不支持<code>blur</code>、<code>password</code>类型；异步校验只支持 tiText 组件。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'validation-rules-custom-directive',
      name: {
        'zh-CN': '模板表单中自定义规则',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>支持在模板表单中自定义校验规则，规则定义请参考 <a class="api-prop cur-hand" href="https://angular.cn/guide/form-validation#defining-custom-validators" target="blank">Angular 官方说明</a>。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'validation-rules-custom',
      name: {
        'zh-CN': '方法调用形式自定义规则',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>支持在响应式表单中自定义校验规则，通过<code>FormControl</code>构造函数中的参数配置规则，规则定义请参考 <a class="api-prop cur-hand" href="https://angular.cn/guide/form-validation#defining-custom-validators" target="blank">Angular 官方说明</a>。</p>',
        'en-US': '<p></p>',
      },
    },
    {
      demoId: 'validation-form-group',
      name: {
        'zh-CN': '表单整体校验',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>使用<code>TiValidators.check</code>方法调用表单整体校验。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiValidationDirective.properties.tiValidation'],
    },
    {
      demoId: 'validation-form-group-config',
      name: {
        'zh-CN': '表单整体校验自定义配置',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>使用<code>check</code>方法调用表单整体校验；通过<code>TiValidationCheckConfig</code>实例配置校验规则。注意：关于<code>onlySelf</code>和<code>emitEvent</code>属性请参考 <a class="api-prop cur-hand" href="https://angular.io/api/forms/AbstractControl#updatevalueandvalidity" target="blank"> Angular 官方文档</a>。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiValidationCheckConfig.properties.emitEvent',
        'TiValidationCheckConfig.properties.ignoreNames',
        'TiValidationCheckConfig.properties.onlySelf',
        'TiValidationCheckConfig.properties.errorsFlatted',
      ],
    },
  ],
};
