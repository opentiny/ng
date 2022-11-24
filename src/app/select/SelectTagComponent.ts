import { Component } from '@angular/core';

@Component({
  templateUrl: './select-tag.html',
  styleUrls: ['./select-tag.less'],
})
export class SelectTagComponent {
  myOptions: Array<any> = [
    {
      label: '蛋糕',
      englishname: 'Cake',
      url: 'assets/food/cake.png',
      disabled: true,
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    },
    {
      label: '咖啡',
      englishname: 'Coffee',
      url: 'assets/food/coffee.png',
      disabled: false,
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    },
    {
      label: '可乐',
      englishname: 'Cola',
      url: 'assets/food/cola.png',
      disabled: true,
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    },
    {
      label: '炸鸡',
      englishname: 'Fried Chicken',
      url: 'assets/food/fried_chicken.png',
      disabled: false,
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    },
    {
      label: '薯条',
      englishname: 'Fries',
      url: 'assets/food/fries.png',
      disabled: true,
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    },
    {
      label: '汉堡',
      englishname: 'Hamburger',
      url: 'assets/food/hamburger.png',
      disabled: false,
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    },
    {
      label: '牛奶',
      englishname: 'milk',
      url: 'assets/food/milk.png',
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    },
    {
      label: '披萨',
      englishname: 'pizza',
      url: 'assets/food/pizza.png',
      mark: '前标识',
      tag: '端口后标识',
      tip: '服务自定义tip111111',
    }
  ];

  mySelected: any;
  // 也是有初值/有禁用项/带模板的一个测试用例，
  mySelecteds: any = [];
}
