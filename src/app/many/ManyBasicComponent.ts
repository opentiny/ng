import { Component } from '@angular/core';
import {
  TiButtonItem,
  TiMenuItem,
  TiModalRef,
  TiPageSizeConfig,
  TiMessageService,
} from '@opentiny/ng';

@Component({
  templateUrl: './many-basic.html',
})
export class ManyBasicComponent {
  constructor(private tiMessage: TiMessageService) {}
  rows: Array<string> = ['dfasd', 'sdfasd', 'sdfasdfa'];
  value: string = '123';
  placeholder: string = '欢迎使用Tiny UI';
  add(): void {
    const x: string = 'hello world!';
    this.rows.push(x);
  }
  items: Array<TiButtonItem> = [];

  selected: TiButtonItem;
  item: TiButtonItem;
  min: Date = new Date(1991, 6, 2);
  max: Date = new Date(2017, 8, 27);
  format: string = 'yyyy.M.d';
  valueData: string = '';
  ipv4Value: string = '';
  panelMaxWidth: string = '200px';
  options: Array<TiMenuItem> = [];
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
  disabled: boolean = true;
  currentPage: number = 10;
  totalNumber: number = 400;
  pageSize: TiPageSizeConfig = {
    options: [20, 40, 60, 80],
    size: 10,
  };

  type: string = 'simple';

  progressbarvalue: number = 80;
  progressbarmax: number = 200;

  myOptions: Array<any> = [
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
    {
      label: '日本',
      englishname: 'Japan',
    },
    {
      label: '韩国',
      englishname: 'South Korea',
    },
    {
      label: '土耳其',
      englishname: 'Turkey',
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom',
    },
  ];

  mySelected1: any = this.myOptions[3];

  spinnermax: number = 10000;
  spinnermin: number = -400;
  spinnerValue: number = 8;
  spinnerplaceholder: string = '-400~10000';

  steps: Array<any> = [
    {
      label: 'General',
    },
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
  switchState: boolean = true;
  tab1: any = {
    title: 'Profile',
    active: true,
    onActiveChange: (isActive: boolean): void => {
      if (isActive) {
        console.log('tab1: not active => active');
      } else {
        console.log('tab1: active => not active');
      }
    },
  };
  tab2: any = {
    active: false,
  };
  tab3: any = {
    title: 'School',
    disabled: true,
  };
  tab4: any = {
    title: 'About',
  };

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

  lists: Array<any> = [
    {
      id: 'xianggang',
      title: '香港',
      checked: false,
    },
    {
      id: 'dalu',
      title: '大陆',
      checked: true,
    },
    {
      id: 'taiwan',
      title: '台湾',
      checked: true,
    },
  ];
  typePrompt: string = 'prompt';
  collapsed: boolean = false;
  value1: number;
}
