import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  TiActionmenuItem,
  TiButtonItem,
  TiDateValue,
  TiIntroRef,
  TiIntroService,
  TiIntroStep,
  TiLeftmenuItem,
  TiMenuItem,
  TiMessageService,
  TiModalRef,
  TiModalService,
  TiPopconfirmConfig,
  TiTableColumns,
  TiTableRowData,
  TiTableSrcData,
  TiTreeNode,
  TiTreeUtil,
  TiValidationConfig,
} from '@opentiny/ng';
import { SuggestionItem } from '../tagsinput/TagsinputPanelwidthComponent';

@Component({
  selector: 'ti-allcomp',
  templateUrl: './allcomp-basic.html',
})
export class AllcompBasicComponent {
  @ViewChild('introStep1', { static: true }) introStep1: ElementRef;
  @ViewChild('introStep2', { static: true }) introStep2: ElementRef;
  @ViewChild('introStep3', { static: true }) introStep3: ElementRef;
  constructor(
    private tiMessage: TiMessageService,
    private tiModal: TiModalService,
    private TiIntro: TiIntroService
  ) {}
  buttons: Array<object> = [
    {
      id: 'button1',
      color: 'default',
      text: '次要按钮',
    },
    {
      id: 'button2',
      color: 'danger',
      text: '强调按钮',
    },
    {
      id: 'button3',
      color: 'primary',
      text: '主题色按钮',
    },
  ];

  buttonGroup: Array<TiButtonItem> = [
    {
      text: '近1小时',
      disabled: true,
    },
    {
      text: '近12小时',
    },
    {
      text: '近1天',
    },
    {
      text: 'Last 1 year',
    },
  ];
  buttonGroup1: Array<TiButtonItem> = [
    {
      text: '近1小时',
      disabled: true,
    },
    {
      text: '近12小时',
    },
    {
      text: '近1天',
    },
    {
      text: 'Last 1 year',
    },
  ];
  selected: TiButtonItem = this.buttonGroup[2];
  selected1: Array<TiButtonItem> = [this.buttonGroup1[2]];

  radioList: Array<{ key: string; id: string; disable?: boolean }> = [
    {
      key: '选项1',
      id: '1',
    },
    {
      key: '选项2',
      id: '2',
      disable: false,
    },
    {
      key: '选项3',
      id: '3',
    },
  ];

  checkList: Array<any> = [
    {
      title: '香港',
      checked: false,
    },
    {
      title: '大陆',
      checked: true,
    },
    {
      title: '台湾',
      checked: true,
    },
  ];

  checkgroup: Array<any> = [
    { id: 1, text: 'guest' },
    { id: 2, text: 'user' },
    { id: 3, text: 'customer' },
    { id: 4, text: 'admin' },
  ];
  checkedArray3: Array<any> = [this.checkgroup[0], this.checkgroup[2]];

  selectArray: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
    },
    {
      label: '巴西',
      englishname: 'Brazil',
    },
    {
      label: '加拿大',
      englishname: 'Canada',
    },
    {
      label: '中国',
      englishname: 'China',
    },
    {
      label: '法国',
      englishname: 'France',
    },
    {
      label: '德国',
      englishname: 'Germany',
    },
  ];
  select: any = this.selectArray[3];

  value1: number = 300;
  value2: number = 650;
  value: string = `${this.value1};${this.value2}`;

  spinnerValue: number = 8;

  switchState: boolean = true;

  treeSelect: Array<TiTreeNode> = [
    {
      label: '家用电器',
      expanded: true,
      children: [
        {
          label: '大家电',
          expanded: true,
          children: [
            {
              label: '空调',
              expanded: true,
              disabled: false,
              children: [
                {
                  label: '海尔空调',
                },
                {
                  label: '美的空调',
                },
              ],
            },
            {
              label: '冰箱',
              disabled: false,
            },
            {
              label: '洗衣机',
            },
            {
              label: '热水器',
            },
          ],
        },
        {
          label: '生活电器',
          children: [
            {
              label: '加湿器',
            },
            {
              label: '电熨斗',
            },
          ],
        },
      ],
    },
    {
      label: '服饰',
      expanded: true,
      checked: 'indeterminate',
      children: [
        {
          label: '男装',
          checked: true,
        },
        {
          label: '女装',
        },
      ],
    },
    {
      label: '化妆',
      children: [
        {
          label: '面部护理',
        },
        {
          label: '口腔护理',
        },
      ],
    },
  ];

  treeSelected: any = TiTreeUtil.getSelectedData(this.treeSelect, true, false);

  textValue: string = '';
  textareaValue: string = '';
  autocomplete: Array<object> = [
    {
      label: '华北',
    },
    {
      label: '华南',
    },
    {
      label: '西北',
    },
    {
      label: '西南',
    },
  ];
  autocompleteValue: string = '';
  searchboxValue: string = '';
  maskValue: string = '1234567';
  ipv4Value: string = '127.0.0.1';
  ipv6Value: string = '0:0:0:0:0:0:0:1';

  ipsectionValue: any = '127.0.0.1/255';
  configs: any = [
    { section: 0 },
    { section: 1, options: ['0'] },
    { section: 2, options: ['0'] },
    { section: 3 },
    { section: 4, options: ['198', '134', '255'] },
  ];
  tagsSuggestions: Array<SuggestionItem> = [
    { id: '1', label: '中文 Chinese' },
    { id: '2', label: '英文 English' },
    { id: '3', label: '拉美西语 Latin American' },
    { id: '4', label: '欧洲西语 European Spanish' },
    { id: '5', label: '法语 French' },
    { id: '6', label: '葡萄牙语 Portuguese' },
  ];
  tagsSelected: Array<any> = [];
  inputNumberValue: string = '12122323';
  dateValue: Date = new Date();
  dateRangeValue: TiDateValue = {
    begin: new Date(2015, 8, 27),
    end: new Date(2016, 5, 6),
  };
  datetimeValue: Date = new Date();
  datetimeRangeValue: TiDateValue = {
    begin: new Date(2017, 8, 27, 11, 20, 12),
    end: new Date(2018, 5, 6, 4, 12, 12),
  };
  timeValue: string = '8:23:27';
  validationValue: string = '';
  validationValue1: string = '';
  validation: TiValidationConfig = {
    type: 'blur',
  };
  item1: any = {
    show: true,
    label: '姓名:',
    required: true,
  };
  item2: any = {
    label: '输入框:',
    required: true,
    value: 'happy',
  };
  item3: any = {
    show: false,
    label: 'span标签:',
    required: true,
    verticalAlign: 'middle',
  };
  menuOptions: Array<TiMenuItem> = [
    {
      label: '一级菜单',
      tip: '远程登录',
      tipPosition: 'right',
      children: [{ label: '二级菜单' }],
      click(): void {
        console.log(this.label + 'clicked');
      },
    },
    {
      label: '变更规格',
      disabled: true,
    },
    {
      label: '制作镜像',
      tip: '远程登录',
      tipPosition: 'left',
    },
    {
      label: '云服务器这是一个很长的选项只有云服务器处于关机状态才能执行该操作',
    },
    {
      label: '规格',
    },
    {
      label: '镜像',
      disabled: true,
    },
  ];
  actionmenu: Array<TiActionmenuItem> = [
    {
      title: '启用',
      label: '远程登录',
      association: 'switch',
    },
    {
      title: '禁用',
      label: '变更规格',
      association: 'switch',
      disabled: true,
    },
    {
      title: '制作镜像',
      label: '制作镜像',
    },
    {
      title: '变更规格2',
      label: '规格',
      children: [
        {
          title: '制作镜像',
          label: '制作规格',
          children: [
            {
              title: '制作镜像',
              label: '规格1',
            },
            {
              title: '变更规格',
              label: '规格2',
              disabled: true,
            },
          ],
        },
        {
          title: '变更规格',
          label: '规格',
          disabled: true,
        },
      ],
    },
  ];

  leftmenuItems: Array<TiLeftmenuItem> = [
    {
      label: '一级菜单',
      children: [
        {
          label: '二级菜单',
        },
        {
          label: '二级菜单',
        },
      ],
    },
    {
      label: '一级菜单',
    },
    {
      label: '一级菜单',
      children: [
        {
          label: '二级菜单',
        },
        {
          label: '二级菜单',
        },
      ],
    },
  ];

  active: TiLeftmenuItem = this.leftmenuItems[0].children[0];
  routable: boolean = false;

  steps: Array<any> = [
    {
      label: 'Host Group',
    },
    {
      label: 'Policy',
    },
    {
      label: 'Names',
    },
  ];
  activeStep: any = this.steps[2];

  showMsg(): void {
    this.tiMessage.open({
      content: 'this is a message',
      close(messageRef: TiModalRef): void {
        console.log('on close', messageRef);
      },
      dismiss(messageRef: TiModalRef): void {
        console.log('on dismiss', messageRef);
      },
    });
  }

  show(content: string): void {
    this.tiModal.open(content, {
      modalClass: 'modal-class',
    });
  }

  popConfig: TiPopconfirmConfig = {
    id: 'delete', // 标识确认框
    content: '确定要删除该安全组规则吗?',
  };

  displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: TiTableSrcData;
  data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: '20%',
    },
    {
      title: 'last name',
      width: '20%',
    },
    {
      title: 'birth date',
      width: '10%',
    },
    {
      title: 'balance',
      width: '30%',
    },
    {
      title: 'email',
      width: '20%',
    },
  ];
  currentPage: number = 10;
  totalNumber: number = 320;
  pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50, 100],
    size: 10,
  };
  intro: TiIntroRef;
  ngOnInit(): void {
    for (let j: number = 0; j < this.totalNumber; j++) {
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false, // 源数据未进行分页处理
      },
    };

    const steps: Array<TiIntroStep> = [
      {
        element: this.introStep1.nativeElement,
        step: 0,
        title: '第一条标题',
        content: '第一条内容',
        position: 'bottom-left',
      },
      {
        element: this.introStep2.nativeElement,
        step: 1,
        title: '第二条标题',
        content: '第二条内容',
      },
      {
        element: this.introStep3.nativeElement,
        step: 2,
        title: '第三条',
        content: '第三条内容',
        position: 'left',
      },
    ];

    this.intro = this.TiIntro.create({
      id: 'intro_id',
      steps,
    });
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = [
      'Pierre',
      'Pol',
      'Jacques',
      'Robert',
      'Elisa',
    ];
    const familyName: Array<string> = [
      'Dupont',
      'Germain',
      'Delcourt',
      'bjip',
      'Menez',
    ];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      id,
    };
  }

  start(): void {
    this.intro.start();
  }
}
