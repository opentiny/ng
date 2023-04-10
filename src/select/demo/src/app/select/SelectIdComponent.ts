import { Component, DoCheck, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  templateUrl: './select-id.html'
})
export class SelectIdComponent implements DoCheck {
  myOptions: Array<any> = [
    {
      label: '蛋糕',
      englishname: 'Cake',
      url: 'assets/food/cake.png'
    },
    {
      label: '咖啡',
      englishname: 'Coffee',
      url: 'assets/food/coffee.png'
    },
    {
      label: '可乐',
      englishname: 'Cola',
      url: 'assets/food/cola.png'
    },
    {
      label: '炸鸡',
      englishname: 'Fried Chicken',
      url: 'assets/food/fried_chicken.png'
    },
    {
      label: '薯条',
      englishname: 'Fries',
      url: 'assets/food/fries.png'
    },
    {
      label: '汉堡',
      englishname: 'Hamburger',
      url: 'assets/food/hamburger.png'
    },
    {
      label: '牛奶',
      englishname: 'milk',
      url: 'assets/food/milk.png'
    },
    {
      label: '披萨',
      englishname: 'pizza',
      url: 'assets/food/pizza.png'
    }
  ];

  myGroupOptions: Array<any> = [
    {
      label: '北美洲',
      children: [
        {
          label: '美国',
          englishname: 'America',
          disabled: true
        },
        {
          label: '加拿大',
          englishname: 'Canada',
          disabled: true
        }
      ]
    },
    {
      label: '南美洲',
      children: [
        {
          label: '巴西',
          englishname: 'Brazil',
          disabled: false
        }
      ]
    },
    {
      label: '亚洲',
      children: [
        {
          label: '中国',
          englishname: 'China',
          disabled: false
        },
        {
          label: '日本',
          englishname: 'Japan'
        },
        {
          label: '韩国',
          englishname: 'South Korea'
        }
      ]
    },
    {
      label: '欧洲',
      children: [
        {
          label: '法国',
          englishname: 'France',
          disabled: true
        },
        {
          label: '德国',
          englishname: 'Germany',
          disabled: false
        },
        {
          label: '土耳其',
          englishname: 'Turkey'
        },
        {
          label: '大不列颠和北爱兰联合王国',
          englishname: 'United Kingdom'
        }
      ]
    }
  ];

  mySelected: any = this.myOptions[0];
  myGroupSelected: any = this.myOptions[0];
  mySelecteds: any = [this.myOptions[2], this.myOptions[3]];

  idExistMap: Map<string, boolean> = new Map<string, boolean>();
  ids: Array<string> = [
    'myselect1',
    'myselect1_dominator',
    'myselect1_dominator_input',
    'myselect1_dominator_btn',
    'myselect1_droplist',
    'myselect1_droplist_list',
    'myselect1_droplist_list_0',
    'myselect2_droplist_list_0',
    'myselect3_dominator_tag0',
    'myselect3_dominator_tag0_closeicon',
    'myselect3_droplist_list_3',
    'myselect4_droplist_searchbox',
    'myselect4_droplist_searchbox_input',
    'myselect5_dominator_input',
    'myselect5_droplist_list_0',
    'myselect5_droplist_list_0_0',
    'myselect5_droplist_list_2',
    'myselect5_droplist_list_2_0',
    'myselect5_droplist_list_2_1'
  ];
  allIdExist: boolean = false;

  // 修复SSR报错：ERROR ReferenceError: document is not defined
  constructor(@Inject(DOCUMENT) private document) {}

  ngDoCheck(): void {
    this.allIdExist = true;
    this.ids.forEach((id: string) => {
      const idExist: boolean = this.document.getElementById(id) != undefined;
      this.idExistMap.set(id, idExist);
      if (!idExist) {
        this.allIdExist = false;
      }
    });
  }
}
