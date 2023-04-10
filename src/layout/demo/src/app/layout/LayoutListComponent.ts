import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TiActionmenuItem, TiLeftmenuItem, TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
  templateUrl: './layout-list.html',
  styleUrls: ['./layout.less'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutListComponent implements OnInit {
  public marginLeft: string = '192px';
  public config: any = {
    serviceName: '云服务器控制台',
    reloadState: true, // 初始设置为true
    toggleable: true,
    collapsed: false, // 默认展开，当设置为true时会收起
    collapsedChangeFn: (collapsed: boolean): void => {
      this.marginLeft = collapsed ? '0' : '192px';
    }
  };
  public items: Array<TiLeftmenuItem> = [
    {
      label: '总览',
      children: [
        {
          label: '二级菜单1'
        },
        {
          label: '二级菜单2'
        }
      ]
    },
    {
      label: '弹性云服务器',
      children: [
        {
          label: '二级菜单'
        },
        {
          label: '二级'
        }
      ]
    },
    {
      label: '裸金属服务器'
    }
  ];
  public active: TiLeftmenuItem;

  public displayed: Array<TiTableRowData> = []; // 表示表格实际呈现的数据（开发者默认设置为[]即可）
  public srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  public columns: Array<TiTableColumns> = [
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
  public currentPage: number = 1;
  public totalNumber: number = 62;
  public pageSize: { options: Array<number>; size: number } = {
    options: [10, 20, 50, 100],
    size: 10
  };

  ngOnInit(): void {
    for (let j: number = 0; j < this.totalNumber; j++) {
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

  public onSelect(item: any): void {
    console.log('onSelect()');
    console.log(item);
  }

  public dataToItemsFn: (data: any) => Array<TiActionmenuItem> = (data: any) => {
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
    if (data.state === '已停止') {
      items[0].disabled = false;
      items[1].disabled = true;
      items = [items[0], items[1]];
    }

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

  public trackByFn(index: number, item: any): number {
    return item.id;
  }
}
