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
 * Tiny组件中使用的法语国际化词条
 */
export const fr_FR: TiLocaleWords = {
  tiLocaleKey: 'fr-FR',
  tiLocaleDate: {
    date: 'dd/MM/yyyy',
    time: 'HH:mm:ss'
  },
  tiCommon: {
    okBtn: 'OK',
    cancelBtn: 'Annuler'
  },
  tiActionmenu: {
    more: 'Plus',
    operation: 'Opérer'
  },
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
      equal: 'La valeur d\'entrée doit être égale à {0}.',
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
      minCharType: 'Doit contenir au moins {0} des types de caractères suivants: ' +
            'lettres, chiffres et caractères spéciaux ( `~!@#$%^&*()-_=+\|[{}];:\'\",<.>/ ? et espaces). ',
      notEqualPosRev: 'Il ne peut s\'agir du nom d\'utilisateur ou du nom d\'utilisateur orthographié à l\'envers.'
    },
    passwordStrength: {
      securityText: 'Force du mot de passe :',
      levelDecArr: ['Faible', 'Moyen', 'Fort']
    }
  },
  tiPagination: {
    gotoLabel: 'Aller',
    prevTitle: 'Précédent',
    nextTitle: 'Prochain',
    totalLabel: 'Total des enregistrements: '
  },
  tiMessage: {
    prompt: 'Information',
    warn: 'Attention',
    confirm: 'Confirmer',
    error: 'Erreur',
    ok: 'OK',
    cancel: 'Annuler'
  },
  tiUpload: {
    addFile: 'Ajouter le fichier',
    error: 'Échec à télécharger le fichier.',
    successInfo: 'Etape réalisée avec succès.',
    uploadingSingleInfo: 'Téléchargement',
    errorSingleInfo: 'Échec à télécharger le fichier.',
    addSuccessMutiInfo: 'Vous avez ajouté {0} fichiers.',
    uploadingMutiInfo: 'Téléchargement : {0}',
    errorMultiInfo: 'Echec à télécharger {0} fichiers.',
    clearAll: 'Tout effacer',
    upload: 'Télécharger',
    cancel: 'Annuler',
    reload: 'Télécharger à nouveau',
    delete: 'Delete',
    autoUploadFilePlaceholder: 'Sélectionnez un fichier à télécharger.',
    autoUploadFilesPlaceholder: 'Sélectionnez les fichiers à télécharger.',
    notAutoUploadFilePlaceholder: 'Ajoutez un fichier et le télécharger.',
    notAutoUploadFilesPlaceholder: 'Ajoutez des fichiers et les télécharger.'
  },
  tiDate: {
    datePlaceholder: 'Sélectionnez une date.',
    datetimePlaceholder: 'Sélectionnez une date et une heure.',
    weekNamesAbb: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    weeknamesTitle: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    monthNamesAbb: ['Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    btnSliderArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9 mois', '1 an', '2 ans', '3 ans'],
    yearSuffixLabel: '',
    rangeBeginLabel: 'Date de début',
    rangeEndLabel: 'Date de fin',
    selectTime: `Sélectionner l'heure`,
    selectDate: 'Sélectionner la date',
    hour: 'Heure',
    minute: 'Minute',
    second: 'Second',
    yearSelectPlacehoder: 'Sélectionnez une année.',
    monthSelectPlacehoder: 'Sélectionnez un mois.',
    quarterSelectPlacehoder: 'Sélectionnez un trimestre.',
    yearRangeBeginLabel: 'Année de début',
    yearRangeEndLabel: 'Année de fin',
    monthRangeBeginLabel: 'Mois de début',
    monthRangeEndLabel: 'Fin du mois',
    quarterRangeBeginLabel: 'Début du trimestre',
    quarterRangeEndLabel: 'Fin du trimestre',
    utcZone: 'UTC/GMT',
    localZone: 'Local time zone'
  },
  tiSelect: {
    search: 'Recherchez',
    selected: 'Sélectionné'
  },
  tiTable: {
    colsToggleTip: 'Personnaliser la colonne',
    headFilterDatetimeTitle: 'Saisissez au moins une date.',
    headMenuSelectAll: 'Sélectionner tout',
    headMenuClearAll: 'Effacer tout'
  },
  tiList: {
    noDataText: 'Aucune donnée disponible',
    selectAll: '(Sélectionner tout)'
  },
  tiIntro: {
    skip: 'Sauter',
    previous: 'Précédent',
    next: 'Suivant',
    finish: 'Terminer'
  },
  tiPopconfirm: {
    yesLabel: 'Oui',
    noLabel: 'Non'
  },
  tiTree: {
    newNode: 'Nouveau nœud ',
    create: 'Créer',
    edit: 'Editer',
    delete: 'Supprimer',
    more: 'Plus'
  },
  tiLoadingfail: {
    loadingfail: 'Le chargement a échoué. ',
    reload: 'Recharger'
  },
  tiTransfer: {
    available: 'Disponible',
    selected: 'Sélectionné',
    placeholder: 'Entrez un mot-clé.'
  }
};
