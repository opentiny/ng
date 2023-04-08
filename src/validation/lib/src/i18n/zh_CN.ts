import { TiValidationWords } from './TiValidationWords';

export const zh_CN: TiValidationWords = {
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
      minCharType: '至少包含以下字符中的{0}种：大写字母、小写字母、数字、特殊字符`~!@#$%^&*()-_=+\\|[{}];:\'",<.>/?  和空格。',
      notEqualPosRev: '不能与用户名或倒序的用户名相同。'
    },
    passwordStrength: {
      securityText: '安全程度:',
      levelDecArr: ['弱', '中', '强']
    }
  }
};
