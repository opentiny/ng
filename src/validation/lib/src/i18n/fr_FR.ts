import { TiValidationWords } from './TiValidationWords';

export const fr_FR: TiValidationWords = {
  tiValid: {
    errorMsg: {
      required: 'Ce champs ne peut pas être vide.',
      maxLength: 'Saisissez un maximum de {0} caractères.',
      minLength: 'Saisissez au moins {0} caractères.',
      rangeSize: 'Saisissez les caractères {0} à {1}.',
      maxValue: 'Saisissez une valeur inférieure ou égale à {0}.',
      minValue: 'Saisissez une valeur supérieure ou égale à {0}.',
      rangeValue: 'Saisissez une valeur comprise entre {0} et {1}.',
      regExp: 'Valeur non valable.',
      contains: 'La valeur doit contenir les caractères suivants : {0}.',
      notContains: 'La valeur ne peut pas contenir les caractères non valables suivants : {0}.',
      notScript: 'La valeur ne peut pas contenir de script tags.',
      equal: "La valeur d'entrée doit être égale à {0}.",
      notEqual: 'La valeur ne peut pas être {0}',
      port: 'Le numéro de port est un nombre entier allant de {0} à {1}.',
      path: 'Entrez un chemin de fichier valide.',
      email: 'Entrez une adresse électronique valide.',
      date: 'Saisissez une date valide.',
      url: 'Saisissez une URL valide.',
      integer: 'Saisissez un nombre entier valide.',
      number: 'Saisissez un nombre valide.',
      digits: 'Saisissez un nombre valide.',
      ipv4: 'Saisissez une adresse IPv4 valide.',
      ipv6: 'Saisissez une adresse IPv6 valide.',
      password: 'Mot de passe non valide.'
    },
    message: {
      rangeSize: 'Doit comporter de {0} à {1} caractères.',
      minCharType:
        'Doit contenir au moins {0} des types de caractères suivants: ' +
        'lettres, chiffres et caractères spéciaux ( `~!@#$%^&*()-_=+|[{}];:\'",<.>/ ? et espaces). ',
      notEqualPosRev: "Il ne peut s'agir du nom d'utilisateur ou du nom d'utilisateur orthographié à l'envers."
    },
    passwordStrength: {
      securityText: 'Force du mot de passe :',
      levelDecArr: ['Faible', 'Moyen', 'Fort']
    }
  }
};
