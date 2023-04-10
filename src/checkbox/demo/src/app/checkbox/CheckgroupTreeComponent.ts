import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-tree.html'
})
export class CheckgroupTreeComponent {
  /*方案一start************************************************ */
  // 数据列表
  dataArray: Array<any> = [
    { id: 1, name: '流川枫', age: 15, sex: 'male' },
    { id: 2, name: '小红帽', age: 5, sex: 'female', checked: true },
    { id: 3, name: '花木兰', age: 18, sex: 'female' },
    { id: 4, name: '雅典娜', age: 22, sex: 'female' },
    { id: 5, name: '舒克', age: 3, sex: 'male' },
    { id: 6, name: '机器猫', age: 4, sex: 'male' }
  ];

  males: Array<any> = this.dataArray.filter((x: any) => x.sex === 'male');
  females: Array<any> = this.dataArray.filter((x: any) => x.sex === 'female');

  // 方案一：专门定义item作为身份标识
  malesItem: any = { id: 11, name: '男性组', age: 0, sex: 'male' };
  femalesItem: any = { id: 12, name: '女性组', age: 0, sex: 'female' };
  rootArray: Array<any> = [this.malesItem, this.femalesItem];

  rootCheckeds: Array<any> = [];
  malesCheckeds: Array<any> = this.males.filter((x: any) => (x as any).checked); // 不用as any的话，ts编译报错，因为上面定义的选项数据，有的项目没有chekced属性。
  femalesCheckeds: Array<any> = this.females.filter((x: any) => (x as any).checked);
  /*方案一end************************************************ */
  /*方案二start************************************************ */
  // 数据列表
  dataArray2: Array<any> = [
    { id: 201, name: '流川枫', age: 15, sex: 'male', checked: true },
    { id: 202, name: '小红帽', age: 5, sex: 'female' },
    { id: 203, name: '花木兰', age: 18, sex: 'female' },
    { id: 204, name: '雅典娜', age: 22, sex: 'female' },
    { id: 205, name: '舒克', age: 3, sex: 'male' },
    { id: 206, name: '机器猫', age: 4, sex: 'male' }
  ];

  males2: Array<any> = this.dataArray2.filter((x: any) => x.sex === 'male');
  females2: Array<any> = this.dataArray2.filter((x: any) => x.sex === 'female');

  // 方案二：临时用已经有的唯一对象（数组）作为身份标识
  rootArray2: Array<any> = [this.males2, this.females2];

  rootCheckeds2: Array<any> = [];
  malesCheckeds2: Array<any> = this.males2.filter((x: any) => (x as any).checked); // 不用as any的话，ts编译报错，因为上面定义的选项数据，有的项目没有chekced属性。
  femalesCheckeds2: Array<any> = this.females2.filter((x: any) => (x as any).checked);
  /*方案二end************************************************* */
  /*方案三start************************************************ */
  // 数据列表
  dataArray3: Array<any> = [
    { id: 301, name: '流川枫', age: 15, sex: 'male', checked: true },
    { id: 302, name: '小红帽', age: 5, sex: 'female' },
    { id: 303, name: '花木兰', age: 18, sex: 'female', checked: true },
    { id: 304, name: '雅典娜', age: 22, sex: 'female' },
    { id: 305, name: '舒克', age: 3, sex: 'male' },
    { id: 306, name: '机器猫', age: 4, sex: 'male' }
  ];

  males3: Array<any> = this.dataArray3.filter((x: any) => x.sex === 'male');
  females3: Array<any> = this.dataArray3.filter((x: any) => x.sex === 'female');

  // 方案三：全选按钮管理所有叶子选项。
  rootArray3: Array<any> = this.dataArray3;

  rootCheckeds3: Array<any> = this.dataArray3.filter((x: any) => (x as any).checked); // 不用as any的话，ts编译报错，因为上面定义的选项数据，有的项目没有chekced属性。
  malesCheckeds3: Array<any> = this.males3.filter((x: any) => (x as any).checked);
  femalesCheckeds3: Array<any> = this.females3.filter((x: any) => (x as any).checked);
  /*方案三end************************************************* */
  myitems: Array<any> = [
    { id: 1, text: '刘德华', singer: true, actor: true },
    { id: 2, text: '孙燕姿', singer: true, actor: false },
    { id: 3, text: '周杰伦', singer: true, actor: false },
    { id: 4, text: '邓丽君', singer: true, actor: false },
    { id: 5, text: '周星驰', singer: false, actor: true },
    { id: 6, text: '成龙', singer: false, actor: true },
    { id: 7, text: '周润发', singer: false, actor: true }
  ];
  singers: Array<any> = this.myitems.filter((x: any) => x.singer === true);
  actors: Array<any> = this.myitems.filter((x: any) => x.actor === true);

  rootItems: Array<any> = [this.singers, this.actors];

  rootItemsCheckeds: Array<any> = [];
  singersCheckeds: Array<any> = [];
  actorsCheckeds: Array<any> = [];
}
