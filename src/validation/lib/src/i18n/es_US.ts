import { TiValidationWords } from './TiValidationWords';

export const es_US: TiValidationWords = {
  tiValid: {
    errorMsg: {
      required: 'Este campo es obligatorio.',
      maxLength: 'Ingrese {0} caracteres como máximo.',
      minLength: 'Ingrese {0} caracteres como mínimo.',
      rangeSize: 'Ingrese entre {0} y {1} caracteres.',
      maxValue: 'Ingrese un valor inferior o igual a {0}.',
      minValue: 'Ingrese un valor superior o igual a {0}.',
      rangeValue: 'Ingrese un valor entre {0} y {1}.',
      regExp: 'Valor no válido.',
      contains: 'El valor debe contener los siguientes caracteres: {0}.',
      notContains: 'El valor no puede contener los siguientes caracteres no válidos: {0}.',
      notScript: 'El valor no puede contener etiquetas de scripts.',
      equal: 'El valor debe ser {0}',
      notEqual: 'El valor no puede ser {0}.',
      port: 'Ingrese un número entero entre {0} y {1}.',
      path: 'Ingrese una ruta de archivo válida.',
      email: 'Ingrese una dirección de correo electrónico válida.',
      date: 'Ingrese una fecha válida.',
      url: 'Ingrese un URL válido.',
      integer: 'Ingrese un número entero válido.',
      number: 'Ingrese un número válido.',
      digits: 'Ingrese un número válido.',
      ipv4: 'Ingrese una dirección IPv4 válida.',
      ipv6: 'Ingrese una dirección IPv6 válida.',
      password: 'Contraseña no válida.'
    },
    message: {
      rangeSize: 'Debe contener entre {0} y {1} caracteres.',
      minCharType:
        'Debe contener al menos {0} de los siguientes tipos de caracteres: ' +
        'letras, dígitos y caracteres especiales ( `~!@#$%^&*()-_=+\\|[{}];:\'",<.>/?  o espacios). ',
      notEqualPosRev: 'No puede ser el nombre de usuario ni el nombre de usuario escrito al revés.'
    },
    passwordStrength: {
      securityText: 'Nivel de seguridad:',
      levelDecArr: ['Bajo', 'Medio', 'Alto']
    }
  }
};
