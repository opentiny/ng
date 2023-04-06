import { Component } from '@angular/core';
import { TiActionmenuItem } from '@opentiny/ng';

@Component({
  templateUrl: './actionmenu-many.html'
})
export class ActionmenuManyComponent {
  displayed: Array<any> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  srcData: Object;
  data: Array<any> = [];
  columns: Array<any> = [
    {
      label: 'first name',
      width: '25%'
    },
    {
      label: 'last name',
      width: '20%'
    },
    {
      label: 'birth date',
      width: '20%'
    },
    {
      label: 'state',
      width: '15%'
    },
    {
      label: 'email',
      width: '20%'
    }
  ];

  onSelect(item: any): void {
    console.log('onSelect()');
    console.log(item);
  }

  ngOnInit(): void {
    for (let j: number = 0; j < 1000; j++) {
      // 生成10条数据
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      // 表格源数据，开发者对表格的数据设置请在这里进行
      data: this.data, // 源数据
      // 用来标识传进来的源数据是否已经进行过排序、过滤、分页等操作，
      // 已经做过的，tiny就不再做了
      // 如果没做，tiny会对传入的源数据做进一步处理（前提是开发者设置了相关特性，比如分页），然后作为$scope.displayed显示出来
      // 本示例中，开发者没有设置分页、过滤和排序这些特性，因此tiny不会对数据进行进一步的处理
      state: {
        searched: false, // 源数据未进行搜索处理
        sorted: false, // 源数据未进行排序处理
        paginated: false // 源数据未进行分页处理
      }
    };
  }

  dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
    let items: Array<TiActionmenuItem> = [
      {
        label: '启用',
        association: 'switch',
        disabled: true
      },
      {
        label: '禁用',
        association: 'switch'
      },
      {
        label: '制作镜像'
      },
      {
        label: '这是一个很长的选项'
      },
      {
        label: '制作镜像2',
        disabled: true
      }
    ];

    return items;
  };

  private createRandomItem(id: number): any {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[Math.floor(Math.random() * 4)];
    const lastName: string = familyName[Math.floor(Math.random() * 4)];
    const age: number = Math.floor(Math.random() * 100);
    const state: string = ['已启动', '已停止'][Math.floor(Math.random() * 2)];

    return {
      firstName,
      lastName,
      age,
      state,
      id
    };
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
