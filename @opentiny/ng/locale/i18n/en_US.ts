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
 * Tiny组件中使用的英文国际化词条
 */
export const en_US: TiLocaleWords = {
  tiLocaleKey: 'en-US',
  tiLocaleDate: {
    date: 'MMM dd, yyyy',
    time: 'HH:mm:ss'
  },
  tiCommon: {
    okBtn: 'OK',
    cancelBtn: 'Cancel'
  },
  tiActionmenu: {
    more: 'More',
    operation: 'Operation'
  },
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
      minCharType: 'Must contain at least {0} of the following character types: ' +
                  'letters, digits, and special characters ( `~!@#$%^&*()-_=+\\|[{}];:\'\",<.>/? and spaces). ',
      notEqualPosRev: 'Cannot be the username or the username spelled backwards.'
    },
    passwordStrength: {
      securityText: 'Password Strength:',
      levelDecArr: ['Weak', 'Medium', 'Strong']
    }
  },
  tiPagination: {
    gotoLabel: 'Go',
    prevTitle: 'Previous',
    nextTitle: 'Next',
    totalLabel: 'Total Records: '
  },
  // message控件词条
  tiMessage: {
    prompt: 'Information',
    warn: 'Warning',
    confirm: 'Confirm',
    error: 'Error',
    ok: 'OK',
    cancel: 'Cancel'
  },
  tiUpload: {
    addFile: 'Select File', // upload_add_file_btn
    error: 'Failed to upload the file.', // upload_error_info
    successInfo: 'File uploaded successfully.', // upload_success_info
    uploadingSingleInfo: 'Uploading', // upload_single_uploading_general_info
    errorSingleInfo: 'Failed to upload the file.', // upload_single_error_general_info
    addSuccessMutiInfo: 'You have added {0} files.', // upload_add_success_general_info
    uploadingMutiInfo: 'Uploading: {0}', // upload_uploading_general_info
    errorMultiInfo: 'Failed to upload {0} files.', // upload_error_general_info
    clearAll: 'Clear All', // upload_remove_files
    upload: 'Upload', // upload_file_btn
    cancel: 'Cancel', // upload_cancel_files
    reload: 'Upload Again', // upload_reload_files
    delete: 'Delete',
    autoUploadFilePlaceholder: 'Select a file to upload.',
    autoUploadFilesPlaceholder: 'Select files to upload.',
    notAutoUploadFilePlaceholder: 'Add a file and upload it.',
    notAutoUploadFilesPlaceholder: 'Add files and upload them.'
  },
  tiDate: {
    datePlaceholder: 'Select a date.',
    datetimePlaceholder: 'Select a date and time.',
    weekNamesAbb: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weeknamesTitle: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNamesAbb: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    btnSliderArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9 months', '1 year', '2 years', '3 years'],
    yearSuffixLabel: '',
    rangeBeginLabel: 'Start Date',
    rangeEndLabel: 'End Date',
    selectTime: 'Select Time',
    selectDate: 'Select Date',
    hour: 'Hour',
    minute: 'Minute',
    second: 'Second',
    yearRangeBeginLabel: 'Start year',
    yearRangeEndLabel: 'End year',
    monthRangeBeginLabel: 'Start month',
    monthRangeEndLabel: 'End month',
    quarterRangeEndLabel: 'End quarter',
    quarterRangeBeginLabel: 'Start quarter',
    yearSelectPlacehoder: 'Select a year.',
    monthSelectPlacehoder: 'Select a month.',
    quarterSelectPlacehoder: 'Select a quarter.',
    utcZone: 'UTC/GMT',
    localZone: 'Local time zone'
  },
  tiSelect: {
    search: 'Search',
    selected: 'Selected'
  },
  tiTable: {
    colsToggleTip: 'Customize Column',
    headFilterDatetimeTitle: 'Enter at least one date.',
    headMenuSelectAll: 'Select All',
    headMenuClearAll: 'Clear All'
  },
  tiList: {
    noDataText: 'No data available',
    selectAll: '(Select all)'
  },
  tiIntro: {
    skip: 'Skip',
    previous: 'Previous',
    next: 'Next',
    finish: 'Finish'
  },
  tiPopconfirm: {
    yesLabel: 'Yes',
    noLabel: 'No'
  },
  tiTree: {
    newNode: 'New node ',
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    more: 'More'
  },
  tiLoadingfail: {
    loadingfail: 'Loading failed. ',
    reload: 'Reload'
  },
  tiTransfer: {
    available: 'Available',
    selected: 'Selected',
    placeholder: 'Enter a keyword.'
  }
};
