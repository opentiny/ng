/**
 * Copyright (c) 2022 - present TinyUI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import { TiLocaleWords } from '../TiLocaleWords';
/**
 * @ignore
 * Tiny组件中使用的中文国际化词条
 */
export const zh_CN: TiLocaleWords = {
  tiLocaleKey: 'zh-CN',
  tiLocaleDate: {
    date: 'yyyy/MM/dd',
    time: 'HH:mm:ss'
  },
  tiCommon: {
    okBtn: '确定',
    cancelBtn: '取消'
  },
  tiActionmenu: {
    more: '更多',
    operation: '操作'
  },
  tiValid: {
    errorMsg: {
      required: '输入不能为空。',
      maxLength: '输入长度不能超过{0}个字符。',
      minLength: '输入长度不能小于{0}个字符。',
      rangeSize: '输入长度范围为{0}到{1}个字符。',
      maxValue: '输入值不能超过{0}。',
      minValue: '输入值不能小于{0}。',
      rangeValue: '输入值必须在{0}到{1}之间。',
      regExp: '输入值无效。',
      contains: '输入值必须包含有字符{0}。',
      notContains: '输入值不能含有非法字符{0}。',
      notScript: '输入值不能含有script标签。',
      equal: '输入值必须等于{0}。',
      notEqual: '输入值不能等于{0}。',
      port: '端口号为{0}到{1}的整数。',
      path: '输入值未满足路径格式要求。',
      email: '输入email地址无效。',
      date: '输入日期无效。',
      url: '输入URL无效。',
      integer: '输入值不是有效整数。',
      number: '输入值不是有效数字。',
      digits: '输入值不是有效数字字符。',
      ipv4: '输入值不是有效IPv4地址。',
      ipv6: '输入值不是有效IPv6地址。',
      password: '密码输入不符合要求，请重新输入。'
    },
    message: {
      rangeSize: '{0}~{1}个字符。',
      minCharType: '至少包含以下字符中的{0}种：大写字母、小写字母、数字、特殊字符`~!@#$%^&*()-_=+\\|[{}];:\'\",<.>/?  和空格。',
      notEqualPosRev: '不能与用户名或倒序的用户名相同。'
    },
    passwordStrength: {
      securityText: '安全程度:',
      levelDecArr: ['弱', '中', '强']
    }
  },
  tiPagination: {
    gotoLabel: '跳转',
    prevTitle: '上一页',
    nextTitle: '下一页',
    totalLabel: '总条数：'
  },
  tiMessage: {
    prompt: '提示',
    warn: '警告',
    confirm: '确认',
    error: '错误',
    ok: '确认',
    cancel: '取消'
  },
  tiUpload: {
    addFile: '添加文件',
    error: '上传失败！', // upload_error_info
    successInfo: '上传成功！',
    uploadingSingleInfo: '正在上传',
    errorSingleInfo: '上传失败！',
    addSuccessMutiInfo: '已添加{0}个文件',
    uploadingMutiInfo: '{0} 正在上传',
    errorMultiInfo: '{0}个文件上传失败！',
    clearAll: '清空选择',
    upload: '上传文件',
    cancel: '取消上传',
    reload: '重新上传',
    delete: '删除',
    autoUploadFilePlaceholder: '点击右侧按钮上传文件',
    autoUploadFilesPlaceholder: '点击右侧按钮上传文件',
    notAutoUploadFilePlaceholder: '点击右侧按钮先添加再上传',
    notAutoUploadFilesPlaceholder: '点击右侧按钮先添加再上传'
  },
  tiDate: {
    datePlaceholder: '请选择日期',
    datetimePlaceholder: '请选择日期时间',
    weekNamesAbb: ['日', '一', '二', '三', '四', '五', '六'],
    weeknamesTitle: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    monthNamesAbb: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    btnSliderArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9个月', '1 年', '2 年', '3 年'],
    yearSuffixLabel: '年',
    rangeBeginLabel: '开始日期',
    rangeEndLabel: '结束日期',
    selectTime: '选择时间',
    selectDate: '选择日期',
    hour: '时',
    minute: '分',
    second: '秒',
    yearRangeBeginLabel: '开始年份',
    yearRangeEndLabel: '结束年份',
    monthRangeBeginLabel: '开始月份',
    monthRangeEndLabel: '结束月份',
    quarterRangeEndLabel: '结束季度',
    quarterRangeBeginLabel: '开始季度',
    yearSelectPlacehoder: '请选择年份',
    monthSelectPlacehoder: '请选择月份',
    quarterSelectPlacehoder: '请选择季度',
    utcZone: 'UTC/GMT',
    localZone: '本地时区'
  },
  tiSelect: {
    search: '搜索',
    selected: '已选'
  },
  tiTable: {
    colsToggleTip: '自定义列表项',
    headFilterDatetimeTitle: '请至少输入一个日期',
    headMenuSelectAll: '选择所有',
    headMenuClearAll: '清空所有'
  },
  tiList: {
    noDataText: '暂无数据',
    selectAll: '(全选)'
  },
  tiIntro: {
    skip: '跳过',
    previous: '上一步',
    next: '下一步',
    finish: '立即体验'
  },
  tiPopconfirm: {
    yesLabel: '是',
    noLabel: '否'
  },
  tiTree: {
    newNode: '新节点',
    create: '新增',
    edit: '编辑',
    delete: '删除',
    more: '更多'
  },
  tiLoadingfail: {
    loadingfail: '加载失败，',
    reload: '重新加载'
  },
  tiTransfer: {
    available: '可选项',
    selected: '已选项',
    placeholder: '请输入关键字搜索'
  }
};
