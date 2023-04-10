import { TiValidationWords } from './TiValidationWords';

export const en_US: TiValidationWords = {
  tiValid: {
    errorMsg: {
      required: 'This field cannot be left blank.',
      maxLength: 'Enter a maximum of {0} characters.',
      minLength: 'Enter at least {0} characters.',
      rangeSize: 'Enter {0} to {1} characters.',
      maxValue: 'Enter a value less than or equal to {0}.',
      minValue: 'Enter a value greater than or equal to {0}.',
      rangeValue: 'Enter a value from {0} to {1}.',
      regExp: 'Invalid value.',
      contains: 'The value must contain the following characters: {0}.',
      notContains: 'The value cannot contain the following invalid characters: {0}.',
      notScript: 'The value cannot contain script tags.',
      equal: 'The value must be {0}.',
      notEqual: 'The value cannot be {0}.',
      port: 'Enter an integer from {0} to {1}.',
      path: 'Enter a valid file path.',
      email: 'Enter a valid email address.',
      date: 'Enter a valid date.',
      url: 'Enter a valid URL.',
      integer: 'Enter a valid integer.',
      number: 'Enter a valid number.',
      digits: 'Enter a valid number.',
      ipv4: 'Enter a valid IPv4 address.',
      ipv6: 'Enter a valid IPv6 address.',
      password: 'Invalid password.'
    },
    message: {
      rangeSize: 'Must be {0} to {1} characters long.',
      minCharType:
        'Must contain at least {0} of the following character types: ' +
        'letters, digits, and special characters ( `~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? and spaces). ',
      notEqualPosRev: 'Cannot be the username or the username spelled backwards.'
    },
    passwordStrength: {
      securityText: 'Password Strength:',
      levelDecArr: ['Weak', 'Medium', 'Strong']
    }
  }
};
