import { Component, ViewChild } from '@angular/core';
import { TiHalfmodalComponent } from '@opentiny/ng';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';
@Component({
  templateUrl: './halfmodal-content.html'
})
export class HalfmodalContentComponent {
  @ViewChild('modal', { static: true }) halfmodal: TiHalfmodalComponent;
  myLogs: Array<string> = [];
  item1: any = {
    show: true,
    label: '姓名:',
    required: true,
    value: ''
  };
  item2: any = {
    label: '输入框:',
    required: true,
    value: ''
  };
  item3: any = {
    show: true,
    label: 'span标签:',
    required: true,
    verticalAlign: 'middle'
  };
  item4: any = {
    label: '',
    required: true,
    labelShow: true,
    verticalAlign: 'middle'
  };
  item5: any = {
    show: true,
    required: true,
    verticalAlign: 'middle'
  };
  item6: any = {
    show: true,
    required: true,
    verticalAlign: 'middle',
    radioList: [
      {
        key: '男人',
        id: 'man'
      },
      {
        key: '女人',
        id: 'woman'
      }
    ]
  };

  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: 'first name',
      width: ''
    },
    {
      title: 'last name',
      width: '20%'
    },
    {
      title: 'birth date',
      width: '10%'
    },
    {
      title: 'balance',
      width: '30%'
    },
    {
      title: 'email',
      width: '20%'
    }
  ];

  ngOnInit(): void {
    for (let j: number = 0; j < 10; j++) {
      this.data.push(this.createRandomItem(j));
    }
    this.srcData = {
      data: this.data,
      state: {
        searched: false,
        sorted: false,
        paginated: false
      }
    };
  }

  private createRandomItem(id: number): TiTableRowData {
    const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
    const familyName: Array<string> = ['Dupont', 'Germain', 'Delcourt', 'bjip', 'Menez'];
    const firstName: string = nameList[((id + 3) * 19) % 4];
    const lastName: string = familyName[((id + 3) * 29) % 4];
    const age: number = ((id + 3) * 13) % 100;
    const email: string = `${firstName}${lastName}@whatever.com`;
    const balance: number = ((id + 3) * 761) % 10000;

    return {
      firstName,
      lastName,
      age,
      email,
      balance,
      id
    };
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }

  show(): void {
    this.halfmodal.show();
  }

  close(): void {
    this.halfmodal.hide();
  }

  dismiss(): void {
    this.halfmodal.hide();
  }
}
