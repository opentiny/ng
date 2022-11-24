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
/**
 * @ignore
 * 命名规则：以组件为单位，所有key值以ti开头使用驼峰形式定义
 */
export interface TiLocaleWords {
  tiLocaleKey: string;
  tiLocaleDate: {
    date: string,
    time: string
  };
  tiCommon: {
    okBtn: string,
    cancelBtn: string
  };
  tiActionmenu: {
    more: string,
    operation: string
  };
  tiValid: {
    errorMsg: {
      required: string,
      maxLength: string,
      minLength: string,
      rangeSize: string,
      maxValue: string,
      minValue: string,
      rangeValue: string,
      regExp: string,
      contains: string,
      notContains: string,
      notScript: string,
      equal: string,
      notEqual: string,
      port: string,
      path: string,
      email: string,
      date: string,
      url: string,
      integer: string,
      number: string,
      digits: string,
      ipv4: string,
      ipv6: string,
      password: string
    },
    message: {
      rangeSize: string,
      minCharType: string,
      notEqualPosRev: string
    },
    passwordStrength: {
      securityText: string,
      levelDecArr: Array<string>
    }
  };
  tiPagination: {
    gotoLabel: string,
    prevTitle: string,
    nextTitle: string,
    totalLabel: string
  };
  tiMessage: {
    prompt: string,
    warn: string,
    confirm: string,
    error: string,
    ok: string,
    cancel: string
  };
  tiUpload: {
    addFile: string,
    error: string,
    successInfo: string,
    uploadingSingleInfo: string,
    errorSingleInfo: string,
    addSuccessMutiInfo: string,
    uploadingMutiInfo: string,
    errorMultiInfo: string,
    clearAll: string,
    upload: string,
    cancel: string,
    reload: string,
    delete: string,
    autoUploadFilePlaceholder: string,
    autoUploadFilesPlaceholder: string,
    notAutoUploadFilePlaceholder: string,
    notAutoUploadFilesPlaceholder: string
  };
  tiDate: {
    datePlaceholder: string,
    datetimePlaceholder: string,
    weekNamesAbb: Array<string>,
    weeknamesTitle: Array<string>,
    monthNamesAbb: Array<string>,
    btnSliderArr: Array<string>,
    yearSuffixLabel: string,
    rangeBeginLabel: string,
    rangeEndLabel: string,
    selectTime: string,
    selectDate: string,
    hour: string,
    minute: string,
    second: string,
    yearRangeBeginLabel: string,
    yearRangeEndLabel: string,
    monthRangeBeginLabel: string,
    monthRangeEndLabel: string,
    quarterRangeEndLabel: string,
    quarterRangeBeginLabel: string,
    yearSelectPlacehoder: string,
    monthSelectPlacehoder: string,
    quarterSelectPlacehoder: string,
    utcZone: string,
    localZone: string
  };
  tiSelect: {
    search: string,
    selected: string
  };
  tiTable: {
    colsToggleTip: string,
    headFilterDatetimeTitle: string,
    headMenuSelectAll: string,
    headMenuClearAll: string
  };
  tiList: {
    noDataText: string;
    selectAll: string
  };
  tiIntro: {
    skip: string;
    previous: string;
    next: string;
    finish: string;
  };
  tiPopconfirm: {
    yesLabel: string,
    noLabel: string
  };
  tiTree: {
    newNode: string,
    create: string,
    edit: string,
    delete: string,
    more: string
  };
  tiLoadingfail: {
    loadingfail: string,
    reload: string
  };
  tiTransfer: {
    available: string,
    selected: string,
    placeholder: string
  };
}
