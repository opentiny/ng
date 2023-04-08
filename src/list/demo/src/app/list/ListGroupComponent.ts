import { Component, HostBinding } from '@angular/core';

@Component({
  templateUrl: './list-group.html'
})
export class ListGroupComponent {
  options: Array<any> = [
    {
      id: 'group1',
      label: 'Group1',
      children: [
        {
          id: '11',
          label: '1111'
        },
        {
          id: '12',
          label: '2222'
        }
      ]
    },
    {
      id: 'group2',
      label: 'Group2',
      children: [
        {
          id: '21',
          label: '3333ds'
        },
        {
          id: '22',
          label: '4444'
        }
      ]
    },
    {
      id: 'group3',
      label: 'Group3',
      children: [
        {
          id: '31',
          label: '65476543'
        },
        {
          id: '32',
          label: '231356'
        },
        {
          id: '33',
          label: '23were 1356'
        }
      ]
    },
    {
      id: 'group4',
      label: 'Group4',
      children: [
        {
          id: '41',
          label: '刷卡了U的防护哈哈'
        },
        {
          id: '42',
          label: '手动if玩儿'
        },
        {
          id: '43',
          label: '2如价格的开发'
        }
      ]
    },
    {
      id: 'group5',
      label: 'Group5',
      children: [
        {
          id: '51',
          label: '问我我李开复路口IE我让'
        },
        {
          id: '52',
          label: '我欧文UR了我二'
        },
        {
          id: '53',
          label: '未入库虑多敷第三方了'
        }
      ]
    }
  ];
  selected: any = this.options[0].children[0];
}
