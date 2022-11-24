import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-level.html',
})
export class CheckgroupLevelComponent {
  dataArray1: Array<any> = [
    { id: 1, name: '流川枫', age: 15, sex: 'male' },
    { id: 2, name: '小红帽', age: 5, sex: 'female' },
    { id: 3, name: '花木兰', age: 18, sex: 'female' },
    { id: 4, name: '雅典娜', age: 22, sex: 'female' },
    { id: 5, name: '舒克', age: 3, sex: 'male' },
    { id: 6, name: '机器猫', age: 4, sex: 'male' },
    { id: 7, name: '灰姑娘', age: 18, sex: 'female' },
    { id: 8, name: '天线宝宝', age: 1, sex: 'male' },
    { id: 9, name: '葫芦娃', age: 2, sex: 'male' },
    { id: 10, name: '孙悟空', age: 25, sex: 'male' },
  ];

  older10: Array<any> = this.dataArray1.filter((x: any) => x.age > 10);
  males: Array<any> = this.dataArray1.filter((x: any) => x.sex === 'male');
  females: Array<any> = this.dataArray1.filter((x: any) => x.sex === 'female');

  older10Set: Array<any> = [];
  malesSet: Array<any> = [];
  femalesSet: Array<any> = [];

  dataArray2: Array<any> = [
    { items: this.older10, checkeds: this.older10Set, label: '大于10岁' },
    { items: this.males, checkeds: this.malesSet, label: '男性' },
    { items: this.females, checkeds: this.femalesSet, label: '女性' },
  ];

  checkedSet1: Array<any> = [];
}
