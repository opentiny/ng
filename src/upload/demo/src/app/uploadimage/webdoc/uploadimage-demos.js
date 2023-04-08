export default {
  column: '2',
  demos: [
    {
      demoId: 'uploadimage-basic',
      name: {
        'zh-CN': '基本用法',
        'en-US': 'Basic usage',
      },
      desc: {
        'zh-CN':
          '<p>Uploadimage 组件的最简用法。通过属性<code>url</code>配置上传地址。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadimageComponent.properties.url',
        'TiUploadimageComponent.properties.type',
      ],
    },
    {
      demoId: 'uploadimage-disabled',
      name: {
        'zh-CN': '禁用',
        'en-US': 'Disabled',
      },
      desc: {
        'zh-CN': '<p>通过属性<code>disabled</code>配置禁用状态。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiUploadimageComponent.properties.disabled'],
    },
    {
      demoId: 'uploadimage-maxcount',
      name: {
        'zh-CN': '数量限制',
        'en-US': 'Max length',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>maxCount</code>配置最大可上传的图片数；当元素失去焦点的时候触发<code>uploadLimit</code>事件。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadimageComponent.properties.maxCount',
        'TiUploadimageComponent.events.uploadLimit',
      ],
    },
    {
      demoId: 'uploadimage-deletable',
      name: {
        'zh-CN': '图片可删除',
        'en-US': 'Deletable',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>deletable</code>配置已上传的图片是否可以删除。注意：只对上传成功的图片生效。</p>',
        'en-US': '<p></p>',
      },
      apis: ['TiUploadimageComponent.properties.deletable'],
    },
    {
      demoId: 'uploadimage-initfiles',
      name: {
        'zh-CN': '初始图片',
        'en-US': 'Initfiles',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>initfiles</code>配置初始图片列表；通过属性<code>modalClass</code>配置图片预览时弹出框样式。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadimageComponent.properties.initFiles',
        'TiUploadimageComponent.properties.modalClass',
      ],
    },
    {
      demoId: 'uploadimage-changes',
      name: {
        'zh-CN': '常用属性',
        'en-US': 'Used props',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>method</code>配置请求方式，包括<code>get</code>、<code>post</code>；通过属性<code>headers</code>配置请求头信息；通过属性<code>accept</code>配置合法的本地文件类型；通过属性<code>alias</code>配置上传文件字段唯一标识的键值；通过属性<code>formData</code>配置文件上传的附带信息；通过属性<code>formDataFirst</code>配置附带信息是否先于上传文件对象。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadimageComponent.properties.method',
        'TiUploadimageComponent.properties.headers',
        'TiUploadimageComponent.properties.accept',
        'TiUploadimageComponent.properties.alias',
        'TiUploadimageComponent.properties.formData',
        'TiUploadimageComponent.properties.formDataFirst',
      ],
    },
    {
      demoId: 'uploadimage-filter',
      name: {
        'zh-CN': '条件过滤',
        'en-US': 'Filter',
      },
      desc: {
        'zh-CN':
          '<p>通过属性<code>filter</code>配置文件过滤条件，通过事件<code>addItemFailed</code>处理不符合条件的文件，通过事件<code>addItemSuccess</code>处理符合条件的文件。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadimageComponent.properties.filters',
        'TiUploadimageComponent.events.addItemFailed',
        'TiUploadimageComponent.events.addItemSuccess',
      ],
    },
    {
      demoId: 'uploadimage-event',
      name: {
        'zh-CN': '常用事件',
        'en-US': 'Used events',
      },
      desc: {
        'zh-CN':
          '<p>通过事件<code>addItemFailed</code>配置添加图片失败事件回调；通过事件<code>addItemSuccess</code>配置添加图片成功事件回调；通过事件<code>beforeSendItems</code>配置发送图片前置事件回调，常用于上传前添加表单内容；通过事件<code>progressItems</code>配置发送图片过程事件回调；通过事件<code>successItems</code>配置发送图片成功事件回调；通过事件<code>errorItems</code>配置发送图片失败事件回调；通过事件<code>cancelItems</code>配置发送图片取消事件回调；通过事件<code>removeItems</code>配置删除图片事件回调；<code>completeItems</code>事件在图片上传后，不论成功或失败都必定被调用；<code>completeAllItems</code>事件在所有图片上传后，不论成功或失败都必定被调用。</p>',
        'en-US': '<p></p>',
      },
      apis: [
        'TiUploadimageComponent.events.beforeSendItems',
        'TiUploadimageComponent.events.progressItems',
        'TiUploadimageComponent.events.successItems',
        'TiUploadimageComponent.events.errorItems',
        'TiUploadimageComponent.events.cancelItems',
        'TiUploadimageComponent.events.beforeRemoveItems',
        'TiUploadimageComponent.events.removeItems',
        'TiUploadimageComponent.events.completeAllItems',
        'TiUploadimageComponent.events.completeItems',
      ],
    },
  ],
  ignoreApis: [
    'TiUploadimageComponent.properties.autoUpload',
    'TiUploadimageComponent.properties.batchSend',
    'TiUploadimageComponent.methods.upload',
  ],
};
