import { Component, OnInit } from '@angular/core';
import { TiActionmenuItem, TiMessageService, TiModalRef, TiTableColumns, TiTableRowData, TiTableSrcData, TiValidators } from '@opentiny/ng';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  styleUrls: ['./tableTest.less'],
  templateUrl: './table-editall-test.html'
})
export class TableEditallTestComponent implements OnInit {
  // 表格数据
  displayed: Array<TiTableRowData> = [];
  srcData: TiTableSrcData;
  private data: Array<TiTableRowData> = [];
  columns: Array<TiTableColumns> = [
    {
      title: '名称/ID'
    },
    {
      title: '客户等级'
    },
    {
      title: '信用账户金额'
    },
    {
      title: '退订次数'
    },
    {
      title: '创建时间'
    },
    {
      title: '操作员'
    },
    {
      title: '操作'
    }
  ];

  //  等级
  levelOptions = [
    {
      label: '一级'
    },
    {
      label: '二级'
    },
    {
      label: '三级'
    }
  ];

  // 表单所有元素
  allFormControl: FormArray = new FormArray([], atLeastOneValidator);

  // 正常行actionmenu选项
  items: Array<TiActionmenuItem> = [
    {
      label: '删除'
    }
  ];

  constructor(private fb: FormBuilder, private tiMessage: TiMessageService) {}

  ngOnInit(): void {
    for (let j: number = 0; j < 5; j++) {
      const item = this.createRandomItem(j);
      this.data.push(item);
      // 每一行是一个FormGroup, 每一个可输入单元格是一个FormControl
      // 所有行组成一个FormArray
      this.allFormControl.push(item.formgroupCtrl);
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

  // 模拟提交
  onClickSubmit(): void {
    this.srcData.data.forEach((item) => {
      console.log(item.formgroupCtrl.status);
    });

    this.tiMessage.open({
      content: '提交成功',
      close(messageRef: TiModalRef): void {
        console.log('on close', messageRef);
      },
      dismiss(messageRef: TiModalRef): void {
        console.log('on dismiss', messageRef);
      }
    });
  }

  // 删除
  onSelect(item: any, row: TiTableRowData): void {
    if (item.label === '删除') {
      const index = this.srcData.data.findIndex((current: TiTableRowData): boolean => {
        return current.id === row.id;
      });
      this.allFormControl.removeAt(index);
      this.srcData.data.splice(index, 1);
    }
  }

  // 新增一行
  addRow(): void {
    const size: Array<string> = ['small', 'medium', 'medium', 'xlargr'];
    const sourceName = 's2.' + size[(this.srcData.data.length * 27) % 4] + '.2';
    const id = 'row_' + this.srcData.data.length;
    const newRow = {
      sourceName,
      id,
      formgroupCtrl: this.fb.group({
        level: [null, TiValidators.required],
        balance: [null, TiValidators.rangeValue(50, 1000)],
        unsubscribe: [null, TiValidators.required],
        createTime: [null, TiValidators.required],
        operator: [null, TiValidators.required]
      })
    };

    this.allFormControl.push(newRow.formgroupCtrl);

    this.srcData.data = [...this.srcData.data, newRow];
  }

  private createRandomItem(id: number): TiTableRowData {
    const size: Array<string> = ['small', 'medium', 'medium', 'xlargr'];
    const sourceName = 's2.' + size[(id * 27) % 4] + '.2';
    return {
      sourceName,
      formgroupCtrl: this.fb.group({
        level: [undefined, TiValidators.required],
        balance: [null, TiValidators.rangeValue(100, 1000)],
        unsubscribe: [null, TiValidators.required],
        createTime: [null, TiValidators.required],
        operator: [null, TiValidators.required]
      }),
      id: 'row_' + id
    };
  }

  trackByFn(index: number, item: any): number {
    return item.id;
  }
}

// 自定义校验器
export const atLeastOneValidator: ValidatorFn = (control: FormArray): ValidationErrors | null => {
  let validNum = 0;
  control.controls.forEach((ctrl: AbstractControl) => {
    if (ctrl.status === 'VALID') {
      validNum++;
    }
    console.log(ctrl.status);
  });

  return validNum > 0
    ? null
    : {
        message: '表格至少填写一行有效数据'
      };
};
