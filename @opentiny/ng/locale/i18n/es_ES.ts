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
 * Tiny组件中使用的欧洲西语国际化词条
 */
export const es_ES: TiLocaleWords = {
  tiLocaleKey: 'es-ES',
  tiLocaleDate: {
    date: 'dd/MM/yyyy',
    time: 'HH:mm:ss'
  },
  tiCommon: {
    okBtn: 'Aceptar',
    cancelBtn: 'Cancelar'
  },
  tiActionmenu: {
    more: 'Más',
    operation: 'Operar'
  },
  tiValid: {
    errorMsg: {
      required: 'Este campo es obligatorio.',
      maxLength: 'Introduzca {0} caracteres como máximo.',
      minLength: 'Introduzca {0} caracteres como mínimo.',
      rangeSize: 'Introduzca entre {0} y {1} caracteres.',
      maxValue: 'Introduzca un valor inferior o igual a {0}.',
      minValue: 'Introduzca un valor superior o igual a {0}.',
      rangeValue: 'Introduzca un valor entre {0} y {1}.',
      regExp: 'Valor no válido.',
      contains: 'El valor debe contener los siguientes caracteres: {0}.',
      notContains: 'El valor no puede contener los siguientes caracteres no válidos: {0}.',
      notScript: 'El valor no puede contener etiquetas de scripts.',
      equal: 'El valor debe ser {0}',
      notEqual: 'El valor no puede ser {0}.',
      port: 'Introduzca un número entero entre {0} y {1}.',
      path: 'Introduzca una ruta de fichero válida.',
      email: 'Introduzca una dirección de correo electrónico válida.',
      date: 'Introduzca una fecha válida.',
      url: 'Introduzca un URL válido.',
      integer: 'Introduzca un número entero válido.',
      number: 'Introduzca un número válido.',
      digits: 'Introduzca un número válido.',
      ipv4: 'Introduzca una dirección IPv4 válida.',
      ipv6: 'Introduzca una dirección IPv6 válida.',
      password: 'Contraseña no válida.'
    },
    message: {
      rangeSize: 'Debe contener entre {0} y {1} caracteres.',
      minCharType: 'Debe contener al menos {0} de los siguientes tipos de caracteres: ' +
            'letras, dígitos y caracteres especiales ( `~!@#$%^&*()-_=+\\|[{}];:\'\",<.>/?  o espacios). ',
      notEqualPosRev: 'No puede ser el nombre de usuario ni el nombre de usuario escrito al revés.'
    },
    passwordStrength: {
      securityText: 'Nivel de seguridad:',
      levelDecArr: ['Bajo', 'Medio', 'Alto']
    }
  },
  tiPagination: {
    gotoLabel: 'Ir',
    prevTitle: 'Anterior',
    nextTitle: 'Siguiente',
    totalLabel: 'Cantidad total de registros: '
  },
  tiMessage: {
    prompt: 'Información',
    warn: 'Advertencia',
    confirm: 'Confirmar',
    error: 'Error',
    ok: 'Aceptar',
    cancel: 'Cancelar'
  },
  tiUpload: {
    addFile: 'Seleccionar fichero',
    error: 'Error al cargar el fichero.',
    successInfo: 'Se ha cargado el fichero.',
    uploadingSingleInfo: 'Cargando',
    errorSingleInfo: 'Error al cargar el fichero.',
    addSuccessMutiInfo: 'Se han agregado {0} ficheros.',
    uploadingMutiInfo: 'Cargando: {0}',
    errorMultiInfo: 'Error al cargar {0} ficheros.',
    clearAll: 'Eliminar todo',
    upload: 'Cargar',
    cancel: 'Cancelar',
    reload: 'Volver a cargar',
    delete: 'Delete',
    autoUploadFilePlaceholder: 'Seleccione un fichero para cargar.',
    autoUploadFilesPlaceholder: 'Seleccione ficheros para cargar.',
    notAutoUploadFilePlaceholder: 'Añada un fichero y cárguelo.',
    notAutoUploadFilesPlaceholder: 'Añada ficheros y cárguelos.'
  },
  tiDate: {
    datePlaceholder: 'Seleccione una fecha.',
    datetimePlaceholder: 'Seleccione una fecha y hora.',
    weekNamesAbb: ['Do.', 'Lu.', 'Ma.', 'Mi.', 'Ju.', 'Vi.', 'Sá.'],
    weeknamesTitle: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    monthNamesAbb: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
    btnSliderArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9 meses', '1 año', '2 años', '3 años'],
    yearSuffixLabel: '',
    rangeBeginLabel: 'Inicio',
    rangeEndLabel: 'Fin',
    selectTime: 'Seleccionar hora',
    selectDate: 'Seleccionar fecha',
    hour: 'Hora',
    minute: 'Minuto',
    second: 'Segundo',
    yearSelectPlacehoder: 'Seleccione un año.',
    monthSelectPlacehoder: 'Seleccione un mes.',
    quarterSelectPlacehoder: 'Seleccione un trimestre.',
    yearRangeBeginLabel: 'Año de inicio',
    yearRangeEndLabel: 'Año de fin',
    monthRangeBeginLabel: 'Mes de inicio',
    monthRangeEndLabel: 'Mes de fin',
    quarterRangeBeginLabel: 'Trimestre de inicio',
    quarterRangeEndLabel: 'Trimestre de fin',
    utcZone: 'UTC/GMT',
    localZone: 'Local time zone'
  },
  tiSelect: {
    search: 'Buscar',
    selected: 'Seleccionados'
  },
  tiTable: {
    colsToggleTip: 'Personalizar columna',
    headFilterDatetimeTitle: 'Introduzca al menos una fecha.',
    headMenuSelectAll: 'Seleccionar todo',
    headMenuClearAll: 'Deseleccionar todo'
  },
  tiList: {
    noDataText: 'No hay datos disponibles',
    selectAll: '(Seleccionar todo)'
  },
  tiIntro: {
    skip: 'Omitir',
    previous: 'Anterior',
    next: 'Siguiente',
    finish: 'Finalizar'
  },
  tiPopconfirm: {
    yesLabel: 'Sí',
    noLabel: 'No'
  },
  tiTree: {
    newNode: 'Nodo nuevo ',
    create: 'Crear',
    edit: 'Editar',
    delete: 'Eliminar',
    more: 'Más'
  },
  tiLoadingfail: {
    loadingfail: 'Error al cargar. ',
    reload: 'Volver a cargar'
  },
  tiTransfer: {
    available: 'Disponible',
    selected: 'Seleccionado/s',
    placeholder: 'Introduzca una palabra clave.'
  }
};
