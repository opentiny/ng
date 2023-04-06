import { Component } from '@angular/core';
@Component({
  templateUrl: './transfer-pagination.html'
})
export class TransferPaginationComponent {
  myOptions: Array<any>;
  mySelecteds: Array<any>;
  myOptionsSearchable: Array<any>;
  mySelectedsSearchable: Array<any>;
  searchable: boolean = true;
  // 设置搜索字段, 该数组中设置多个字段，就会根据该数组中的任意一个字段进行搜索匹配
  searchKeys: Array<string> = ['label'];
  private database: Array<any> = [
    { label: 'America', disabled: true },
    { label: 'Brazil' },
    { label: 'Canada', disabled: true },
    { label: 'China' },
    { label: 'France', disabled: true },
    { label: 'Germany' },
    { label: 'Japan' },
    { label: 'South Korea' },
    { label: 'Turkey' },
    { label: 'United Kingdom' }
  ];
  ngOnInit(): void {
    const data: Array<any> = [];
    for (let i: number = 0; i < 136; i++) {
      const item: any = this.database[i % 10];
      data.push({ ...item, label: i + item.label });
    }
    this.myOptions = data;
    this.myOptionsSearchable = [...data];
  }
}
