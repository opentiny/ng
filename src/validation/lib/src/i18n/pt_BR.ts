import { TiValidationWords } from './TiValidationWords';

export const pt_BR: TiValidationWords = {
  tiValid: {
    errorMsg: {
      required: 'Este campo não pode ser deixado em branco.',
      maxLength: 'Insira um máximo de {0} caracteres.',
      minLength: 'Insira pelo menos {0} caracteres.',
      rangeSize: 'Insira de {0} a {1} caracteres.',
      maxValue: 'Insira um valor inferior ou igual a {0}.',
      minValue: 'Insira um valor superior ou igual a {0}.',
      rangeValue: 'Insira um valor de {0} a {1}.',
      regExp: 'Valor inválido.',
      contains: 'O valor deve conter os caracteres a seguir: {0}.',
      notContains: 'O valor não pode conter os caracteres a seguir: {0}.',
      notScript: 'O valor não pode conter tags de scripts.',
      equal: 'O valor deve ser {0}.',
      notEqual: 'O valor não pode ser {0}.',
      port: 'Insira um número inteiro de {0} a {1}.',
      path: 'Insira um caminho de arquivo válido.',
      email: 'Insira um endereço de e-mail válido.',
      date: 'Insira uma data válida.',
      url: 'Insira uma URL válida.',
      integer: 'Insira um número inteiro válido.',
      number: 'Insira um número válido.',
      digits: 'Insira um número válido.',
      ipv4: 'Insira um endereço IPv4 válido.',
      ipv6: 'Insira um endereço IPv6 válido.',
      password: 'Senha inválida.'
    },
    message: {
      rangeSize: 'Deve ter de {0} a {1} caracteres.',
      minCharType:
        'Deve conter pelo menos {0} dos seguintes tipos de caracteres: ' +
        'letras, dígitos e caracteres especiais ( `~!@#$%^&*()-_=+\\|[{}];:\'",<.>/? e espaços). ',
      notEqualPosRev: 'Não pode ser o nome de usuário escrito normalmente ou de trás para frente.'
    },
    passwordStrength: {
      securityText: 'Força da senha:',
      levelDecArr: ['Fraca', 'Média', 'Forte']
    }
  }
};
