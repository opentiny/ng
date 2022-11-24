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
 * Tiny组件中使用的德语国际化词条
 */
export const de_DE: TiLocaleWords = {
  tiLocaleKey: 'de-DE',
  tiLocaleDate: {
    date: 'dd.MM.yyyy',
    time: 'HH:mm:ss'
  },
  tiCommon: {
    okBtn: 'OK',
    cancelBtn: 'Abbrechen'
  },
  tiActionmenu: {
    more: 'Mehr',
    operation: 'Betrieb'
  },
  tiValid: {
    errorMsg: {
      required: 'Die Eingabe muss erfolgen.',
      maxLength: 'Die Länge der Eingabe kann {0} nicht überschreiten.',
      minLength: 'Die Länge der Eingabe kann nicht kleiner als {0} sein.',
      rangeSize: 'Die Länge der Eingabe muss zwischen {0} und {1} liegen.',
      maxValue: 'Der Eingabewert kann {0} nicht überschreiten.',
      minValue: 'Der Eingabewert kann nicht kleiner als {0} sein.',
      rangeValue: 'Der Eingabewert muss im Bereich zwischen {0} und {1} liegen.',
      regExp: 'Der Eingabewert ist ungültig.',
      contains: 'The value must contain the following characters: {0}.',
      notContains: 'Der Eingabewert kann keine unzulässigen Zeichen enthalten {0}.',
      notScript: 'Der Eingabewert kann keinen Skript-Tag enthalten.',
      equal: 'Der Eingabewert muss gleich {0} sein.',
      notEqual: 'The value cannot be {0}.',
      port: 'Die Portnummer ist eine ganze Zahl zwischen {0} und {1}.',
      path: 'Der Eingabewert entspricht nicht den Anforderungen an das Pfadformat.',
      email: 'Der Eingabewert ist keine gültige E-Mails-Adresse.',
      date: '"Der Eingabewert ist keine gültiges Datum.',
      url: 'Der Eingabewert ist keine gültige URL.',
      integer: 'Der Eingabewert ist keine gültige ganze Zahl.',
      number: '"Der Eingabewert ist keine gültige Zahl.',
      digits: 'Der Eingabewert ist keine gültige Zahl.',
      ipv4: 'Der Eingabewert ist keine gültige IPv4-Adresse.',
      ipv6: 'Der Eingabewert ist keine gültige IPv6-Adresse.',
      password: 'Invalid password.'
    },
    message: {
      rangeSize: 'Must be {0} to {1} characters long.',
      minCharType: 'Must contain at least {0} of the following character types: ' +
                  'uppercase letters, lowercase letters, digits, and special characters ( `~!@#$%^&*()-_=+\\|[{}];:\'\",<.>/? and spaces).',
      notEqualPosRev: 'Cannot be the username or the username spelled backwards.'
    },
    passwordStrength: {
      securityText: 'Password Strength:',
      levelDecArr: ['Weak', 'Medium', 'Strong']
    }
  },
  tiPagination: {
    gotoLabel: 'Navigieren Sie',
    prevTitle: 'Vorherige',
    nextTitle: 'Weiter',
    totalLabel: 'Gesamtzahl der Datensätze: '
  },
  tiMessage: {
    prompt: 'Informationen',
    warn: 'Warnung',
    confirm: 'Bestätigen',
    error: 'Fehler',
    ok: 'OK',
    cancel: 'Abbrechen'
  },
  tiUpload: {
    addFile: 'Datei hinzufügen',
    error: 'Failed to upload the file.',
    successInfo: 'Hochladen.',
    uploadingSingleInfo: 'Uploading',
    errorSingleInfo: 'Failed to upload the file.',
    addSuccessMutiInfo: 'You have added {0} files.',
    uploadingMutiInfo: 'Uploading: {0}',
    errorMultiInfo: 'Failed to upload {0} files.',
    clearAll: 'Clear All',
    upload: 'Upload',
    cancel: 'Cancel',
    reload: 'Upload Again',
    delete: 'Delete',
    autoUploadFilePlaceholder: 'Select a file to upload.',
    autoUploadFilesPlaceholder: 'Select files to upload.',
    notAutoUploadFilePlaceholder: 'Add a file and upload it.',
    notAutoUploadFilesPlaceholder: 'Add files and upload them.'
  },
  tiDate: {
    datePlaceholder: 'Select a date.',
    datetimePlaceholder: 'Select a date and time.',
    weekNamesAbb: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    weeknamesTitle: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    monthNamesAbb: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
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
    selectAll: '(Alle auswählen)'
  },
  tiIntro: {
    skip: 'Skip',
    previous: 'Previous',
    next: 'Next',
    finish: 'Try Now'
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
    more: 'Mehr'
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
