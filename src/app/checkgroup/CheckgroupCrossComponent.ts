import { Component } from '@angular/core';

@Component({
  templateUrl: './checkgroup-cross.html',
})
export class CheckgroupCrossComponent {
  checkedSet1: Array<any> = [];

  myitems: Array<any> = [
    { id: 1, text: '刘德华', singer: true, actor: true },
    { id: 2, text: '孙燕姿', singer: true, actor: false },
    { id: 3, text: '周杰伦', singer: true, actor: false },
    { id: 4, text: '邓丽君', singer: true, actor: false },
    { id: 5, text: '周星驰', singer: false, actor: true },
    { id: 6, text: '成龙', singer: false, actor: true },
    { id: 7, text: '周润发', singer: false, actor: true },
  ];
  singers: Array<any> = this.myitems.filter((x: any) => x.singer === true);
  actors: Array<any> = this.myitems.filter((x: any) => x.actor === true);

  singersCheckeds: Array<any> = [];
  actorsCheckeds: Array<any> = [];
}
