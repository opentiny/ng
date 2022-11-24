import { Component } from "@angular/core";
@Component({
  templateUrl: "./select-template.html",
})
export class SelectTemplateComponent {
  baseUrl: string = window["DEPLOY_URL"] + window["PUBLIC_URL"];
  options: Array<any> = [
    {
      label: '蛋糕',
      englishname: 'Cake',
      url: `${this.baseUrl}assets/food/cake.png`,
    },
    {
      label: '咖啡',
      englishname: 'Coffee',
      url: `${this.baseUrl}assets/food/coffee.png`,
    },
    {
      label: '可乐',
      englishname: 'Cola',
      url: `${this.baseUrl}assets/food/cola.png`,
    },
    {
      label: '炸鸡',
      englishname: 'Fried Chicken',
      url: `${this.baseUrl}assets/food/fried_chicken.png`,
    },
    {
      label: '薯条',
      englishname: 'Fries',
      url: `${this.baseUrl}assets/food/fries.png`,
    },
    {
      label: '汉堡',
      englishname: 'Hamburger',
      url: `${this.baseUrl}assets/food/hamburger.png`,
    },
    {
      label: '牛奶',
      englishname: 'milk',
      url: `${this.baseUrl}assets/food/milk.png`,
    },
    {
      label: '披萨',
      englishname: 'pizza',
      url: `${this.baseUrl}assets/food/pizza.png`,
    }
  ];
  value: any;
}
