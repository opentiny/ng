import { Component } from '@angular/core';
import { TiCheckboxItem } from '@opentiny/ng';

@Component({
  templateUrl: './checkboxgroup-linewrap.html',
})
export class CheckboxgroupLinewrapComponent {
  items: Array<TiCheckboxItem> = [
    { id: '1', label: '小猪佩琪' },
    { id: '2', label: '小红帽' },
    { id: '3', label: '花木兰' },
    { id: '4', label: '雅典娜' },
    { id: '5', label: '舒克' },
    { id: '6', label: '机器猫' },
    { id: '7', label: '灰姑娘' },
    { id: '8', label: '天线宝宝' },
    { id: '9', label: '葫芦娃' },
    { id: '10', label: '孙悟空' },
  ];
  value: Array<any> = [];
}
