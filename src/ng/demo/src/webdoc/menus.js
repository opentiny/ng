// 注意，删除了useFor属性

// title,label增加英文版，以应对将来的国际化功能
export const docMenus = [
  {
    label: '使用指南',
    labelEn: 'Guide', // ***********
    key: 'doc_use',
    children: [
      {
        title: '介绍',
        titleEn: 'Introduce',
        key: 'introduce'
      },
      {
        title: '快速上手',
        titleEn: 'Quick Start',
        key: 'getstart'
      },
      {
        title: '主题配置',
        titleEn: 'Theme Customization',
        key: 'themedoc'
      },
      {
        title: '国际化',
        titleEn: 'Internationalization',
        key: 'language'
      },
      {
        title: '常见问题',
        titleEn: 'FAQ',
        key: 'faq'
      },
      {
        title: '更新日志',
        titleEn: 'Change Log',
        key: 'changelog'
      },
      {
        title: '加入我们',
        titleEn: 'Join Us',
        key: 'joinus'
      }
    ]
  }
];

// -------------------------------------------------------------------
export const cmpMenus = [
  {
    label: '表单选择',
    labelEn: 'Form Selection',
    key: 'cmp_formselect',
    children: [
      { name: 'Button', nameCn: '按钮', key: 'button' },
      { name: 'Select', nameCn: '选择器', key: 'select' },
      { name: 'Radio', nameCn: '单选框', key: 'radio' },
      { name: 'Checkbox', nameCn: '复选框', key: 'checkbox' },
      { name: 'Slider', nameCn: '滑块', key: 'slider' },
      { name: 'Switch', nameCn: '开关', key: 'switch' },
      { name: 'Buttongroup', nameCn: '选块组', key: 'buttongroup' },
      { name: 'Spinner', nameCn: '数字微调', key: 'spinner' },
      { name: 'Treeselect', nameCn: '树选择', key: 'treeselect' },
      { name: 'Cascader', nameCn: '级联选择', key: 'cascader' },
      { name: 'Transfer', nameCn: '穿梭框', key: 'transfer' },
      { name: 'Score', nameCn: '评分', key: 'score' },
      { name: 'Linkbutton', nameCn: '按钮链接', key: 'linkbutton' },
      { name: 'Selectgroup', nameCn: '选择组', key: 'selectgroup' }
    ]
  },
  {
    label: '表单文本',
    labelEn: 'Form Text',
    key: 'cmp_formtext',
    children: [
      { name: 'Text', nameCn: '文本框', key: 'text' },
      { name: 'Textarea', nameCn: '多行文本框', key: 'textarea' },
      { name: 'Autocomplete', nameCn: '自动补全', key: 'autocomplete' },
      { name: 'Searchbox', nameCn: '搜索框', key: 'searchbox' },
      { name: 'IP', nameCn: '输入IP', key: 'ip' },
      { name: 'IPsection', nameCn: 'IP分段', key: 'ipsection' },
      { name: 'Tag', nameCn: '标签', key: 'tag' },
      { name: 'TagsInput', nameCn: '标签输入', key: 'tagsinput' },
      { name: 'InputNumber', nameCn: '数字输入框', key: 'inputnumber' },
      { name: 'Labeleditor', nameCn: '可编辑文本', key: 'labeleditor' },
      { name: 'PhoneNumber', nameCn: '电话号码', key: 'phonenumber' },
      { name: 'Path', nameCn: '路径', key: 'path' }
    ]
  },
  {
    label: '表单日期',
    labelEn: 'Form Date',
    key: 'cmp_formdate',
    children: [
      { name: 'Date', nameCn: '日期', key: 'date' },
      { name: 'DateRange', nameCn: '日期范围', key: 'daterange' },
      { name: 'Datetime', nameCn: '日期时间', key: 'datetime' },
      { name: 'DatetimeRange', nameCn: '日期时间范围', key: 'datetimerange' },
      { name: 'Time', nameCn: '时间', key: 'time' }
    ]
  },
  {
    label: '表单辅助',
    labelEn: 'Form Assist',
    key: 'cmp_formassist',
    children: [
      { name: 'Validation', nameCn: '表单校验', key: 'validation' },
      { name: 'Formfield', nameCn: '表单布局', key: 'formfield' },
      { name: 'Upload', nameCn: '文件上传', key: 'upload' },
      { name: 'Uploadimage', nameCn: '图片上传', key: 'uploadimage' },
      { name: 'Buttonselect', nameCn: '选块下拉', key: 'buttonselect' }
    ]
  },
  {
    label: '导航',
    labelEn: 'Menu navigation',
    key: 'cmp_nav',
    children: [
      { name: 'Leftmenu', nameCn: '左侧菜单', key: 'leftmenu' },
      { name: 'Menu', nameCn: '下拉菜单', key: 'menu' },
      { name: 'Nav', nameCn: '顶部导航', key: 'nav' },
      { name: 'Actionmenu', nameCn: '菜单按钮', key: 'actionmenu' },
      { name: 'Accordion', nameCn: '手风琴', key: 'accordion' },
      { name: 'Tabs', nameCn: '页签', key: 'tab' },
      { name: 'Steps', nameCn: '步骤导航', key: 'steps' },
      { name: 'Crumb', nameCn: '面包屑', key: 'crumb' },
      { name: 'Timeline', nameCn: '时间线', key: 'timeline' },
      { name: 'Subtitle', nameCn: '返回标题', key: 'subtitle' },
      { name: 'Anchor', nameCn: '锚点', key: 'anchor' }
    ]
  },
  {
    label: '弹出提示',
    labelEn: 'Popup Prompt',
    key: 'cmp_popup',
    children: [
      { name: 'Tip', nameCn: '气泡提示', key: 'tip' },
      { name: 'Overflow', nameCn: '溢出提示', key: 'overflow' },
      { name: 'Collapse', nameCn: '折叠面板', key: 'collapse' },
      { name: 'Collapsebox', nameCn: '折叠框', key: 'collapsebox' },
      { name: 'Alert', nameCn: '警告', key: 'alert' },
      { name: 'Modal', nameCn: '弹出框', key: 'modal' },
      { name: 'Message', nameCn: '消息弹框', key: 'message' },
      { name: 'Notification', nameCn: '通知弹框', key: 'notification' },
      { name: 'Popconfirm', nameCn: '气泡确认框', key: 'popconfirm' },
      { name: 'Halfmodal', nameCn: '半屏弹窗', key: 'halfmodal' }
    ]
  },
  {
    label: '其他组件',
    labelEn: 'Others',
    key: 'cmp_others',
    children: [
      { name: 'Avatar', nameCn: '头像', key: 'avatar' },
      { name: 'Table', nameCn: '表格', key: 'table' },
      { name: 'Progressbar', nameCn: '进度条', key: 'progressbar' },
      { name: 'Loading', nameCn: '加载', key: 'loading' },
      { name: 'Pagination', nameCn: '分页', key: 'pagination' },
      { name: 'Tree', nameCn: '树', key: 'tree' },
      { name: 'Icon', nameCn: '图标', key: 'icon' },
      { name: 'Iconaction', nameCn: '图标文本链接', key: 'iconaction' },
      { name: 'Intro', nameCn: '新手引导', key: 'intro' },
      { name: 'Swiper', nameCn: '轮播', key: 'swiper' },
      { name: 'Card', nameCn: '卡片', key: 'card' },
      { name: 'Layout', nameCn: '布局', key: 'layout' },
      { name: 'Rate', nameCn: '评分', key: 'rate' },
      { name: 'Rights', nameCn: '权益', key: 'rights' },
      { name: 'Skeleton', nameCn: '骨架屏', key: 'skeleton' },
      { name: 'Rate', nameCn: '评分', key: 'rate' },
      { name: 'Guides', nameCn: '情景引导', key: 'guides' },
      { name: 'Foldtext', nameCn: '折叠文本', key: 'foldtext' },
      { name: 'Productpreview', nameCn: '商品预览', key: 'productpreview' },
      { name: 'Collapsetext', nameCn: '下展文本', key: 'collapsetext' },
      { name: 'Guidesteps', nameCn: '小步骤引导', key: 'guidesteps' },
      { name: 'Collapsebutton', nameCn: '折叠按钮', key: 'collapsebutton' },
      { name: 'Copy', nameCn: '复制', key: 'copy' }
    ]
  },
  {
    label: '工具组件',
    labelEn: 'Tools',
    key: 'cmp_tools',
    children: [
      { name: 'Browser', nameCn: '浏览器信息', key: 'browser' },
      { name: 'Keymap', nameCn: '键值查询', key: 'keymap' },
      { name: 'Log', nameCn: '日志打印', key: 'log' },
      { name: 'Theme', nameCn: '主题配置', key: 'theme' }
    ]
  },
  {
    label: '国际化',
    labelEn: 'Locale',
    key: 'cmp_locale',
    children: [{ name: 'Locale', nameCn: '国际化语言', key: 'locale' }]
  },
  {
    label: '接口 & 类型',
    labelEn: 'Interfaces & Types',
    key: 'cmp_interfacesandtypes',
    children: [
      { name: 'Interfaces', nameCn: '接口', key: 'interfaces' },
      { name: 'Types', nameCn: '类型', key: 'types' }
    ]
  }
];
