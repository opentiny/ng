export interface TiValidationWords {
  tiValid: {
    errorMsg: {
      required: string;
      maxLength: string;
      minLength: string;
      rangeSize: string;
      maxValue: string;
      minValue: string;
      rangeValue: string;
      regExp: string;
      contains: string;
      notContains: string;
      notScript: string;
      equal: string;
      notEqual: string;
      port: string;
      path: string;
      email: string;
      date: string;
      url: string;
      integer: string;
      number: string;
      digits: string;
      ipv4: string;
      ipv6: string;
      password: string;
    };
    message: {
      rangeSize: string;
      minCharType: string;
      notEqualPosRev: string;
    };
    passwordStrength: {
      securityText: string;
      levelDecArr: Array<string>;
    };
  };
}
