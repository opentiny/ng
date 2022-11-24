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
 * Tiny组件中使用的葡语国际化词条
 */
export const pt_BR: TiLocaleWords = {
  tiLocaleKey: 'pt-BR',
  tiLocaleDate: {
    date: 'dd/MM/yyyy',
    time: 'HH:mm:ss'
  },
  tiCommon: {
    okBtn: 'OK',
    cancelBtn: 'Cancelar'
  },
  tiActionmenu: {
    more: 'Mais',
    operation: 'Operação'
  },
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
      minCharType: 'Deve conter pelo menos {0} dos seguintes tipos de caracteres: ' +
      'letras, dígitos e caracteres especiais ( `~!@#$%^&*()-_=+\\|[{}];:\'\",<.>/? e espaços). ',
      notEqualPosRev: 'Não pode ser o nome de usuário escrito normalmente ou de trás para frente.'
    },
    passwordStrength: {
      securityText: 'Força da senha:',
      levelDecArr: ['Fraca', 'Média', 'Forte']
    }
  },
  tiPagination: {
    gotoLabel: 'Ir',
    prevTitle: 'Anterior',
    nextTitle: 'Próximo',
    totalLabel: 'Total de registros: '
  },
  tiMessage: {
    prompt: 'Informação',
    warn: 'Aviso',
    confirm: 'Confirmar',
    error: 'Erro',
    ok: 'OK',
    cancel: 'Cancelar'
  },
  tiUpload: {
    addFile: 'Selecionar arquivo',
    error: 'Não foi possível carregar o arquivo.',
    successInfo: 'Arquivo carregado com sucesso.',
    uploadingSingleInfo: 'Carregando',
    errorSingleInfo: 'Não foi possível carregar o arquivo.',
    addSuccessMutiInfo: 'Você adicionou {0} arquivos.',
    uploadingMutiInfo: 'Carregando: {0}',
    errorMultiInfo: 'Não foi possível carregar {0} arquivos.',
    clearAll: 'Limpar tudo',
    upload: 'Carregar',
    cancel: 'Cancelar',
    reload: 'Carregar novamente',
    delete: 'Delete',
    autoUploadFilePlaceholder: 'Selecione um arquivo para ser carregado.',
    autoUploadFilesPlaceholder: 'Selecione arquivos para serem carregados.',
    notAutoUploadFilePlaceholder: 'Adicione um arquivo e carregue-o.',
    notAutoUploadFilesPlaceholder: 'Adicione arquivos e carregue-os.'
  },
  tiDate: {
    datePlaceholder: 'Selecione uma data.',
    datetimePlaceholder: 'Selecione uma data e um horário.',
    weekNamesAbb: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    weeknamesTitle: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    monthNamesAbb: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    btnSliderArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9 meses', '1 ano', '2 anos', '3 anos'],
    yearSuffixLabel: '',
    rangeBeginLabel: 'Data de início',
    rangeEndLabel: 'Data de término',
    selectTime: 'Selecionar horário',
    selectDate: 'Selecionar data',
    hour: 'Hora',
    minute: 'Minuto',
    second: 'Segundo',
    yearSelectPlacehoder: 'Selecione um ano.',
    monthSelectPlacehoder: 'Selecione um mês.',
    quarterSelectPlacehoder: 'Selecione um trimestre.',
    yearRangeBeginLabel: 'Ano de início',
    yearRangeEndLabel: 'Ano de término',
    monthRangeBeginLabel: 'Mês de início',
    monthRangeEndLabel: 'Mês de término',
    quarterRangeBeginLabel: 'Trimestre de início',
    quarterRangeEndLabel: 'Trimestre de término',
    utcZone: 'UTC/GMT',
    localZone: 'Local time zone'
  },
  tiSelect: {
    search: 'Pesquisar',
    selected: 'Selecionados:'
  },
  tiTable: {
    colsToggleTip: 'Personalizar coluna',
    headFilterDatetimeTitle: 'Insira pelo menos uma data.',
    headMenuSelectAll: 'Selecionar tudo',
    headMenuClearAll: 'Limpar tudo'
  },
  tiList: {
    noDataText: 'Nenhum dado disponível',
    selectAll: '(Selecionar tudo)'
  },
  tiIntro: {
    skip: 'Pular',
    previous: 'Anterior',
    next: 'Próximo',
    finish: 'Finalizar'
  },
  tiPopconfirm: {
    yesLabel: 'Sim',
    noLabel: 'Não'
  },
  tiTree: {
    newNode: 'Novo nó ',
    create: 'Criar',
    edit: 'Editar',
    delete: 'Excluir',
    more: 'Mais'
  },
  tiLoadingfail: {
    loadingfail: 'Erro no carregamento. ',
    reload: 'Recarregar'
  },
  tiTransfer: {
    available: 'Disponíveis',
    selected: 'Selecionados',
    placeholder: 'Insira uma palavra-chave.'
  }
};
