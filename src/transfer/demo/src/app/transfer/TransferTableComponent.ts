import { Component } from '@angular/core';
import { TiTableRowData, TiTransferColumn } from '@opentiny/ng';
@Component({
  templateUrl: './transfer-table.html'
})
export class TransferTableComponent {
  myOptions: Array<any>;
  mySelecteds: Array<any>;
  myOptions1: Array<any>;
  mySelecteds1: Array<any>;
  myOptions2: Array<any>;
  mySelecteds2: Array<any>;
  searchable: boolean = true;
  searchKeys: Array<string> = ['firstName', 'lastName'];
  columns: Array<TiTransferColumn> = [
    {
      title: 'First Name', // 表头列文本内容
      field: 'firstName', // 不自定义行展示模板时，表格每列按照源数据哪一项属性展示数据的标识值
      width: '40%'
    },
    {
      title: 'Last Name',
      field: 'lastName',
      width: '30%'
    },
    {
      title: 'Age',
      field: 'age',
      width: '30%'
    }
  ];
  ngOnInit(): void {
    const data: Array<any> = [];
    for (let j: number = 0; j < 100; j++) {
      data.push(this.createRandomItem(j));
    }
    this.myOptions = data;
    this.myOptions1 = JSON.parse(JSON.stringify(this.myOptions));
    this.myOptions2 = JSON.parse(JSON.stringify(this.myOptions));
  }
  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[Math.floor(Math.random() * 5)];
    const lastName: string = familyName[Math.floor(Math.random() * 5)];
    const age: number = ((id + 3) * 13) % 100;
    const disabled: boolean = Math.random() > 0.7 ? true : false;

    return {
      firstName,
      lastName,
      age,
      disabled
    };
  }
}
