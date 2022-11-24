import { Component } from '@angular/core';

@Component({
  templateUrl: './tag-edit.html',
})
export class TagEditComponent {
  myLogs: Array<string> = [];
  inputValue: string = '';
  showInput: boolean = false;

  items: any = [
    {
      label: 'Tag1'
    },
    {
      label: 'Tag2',
      disabled: true
    },
    {
      label: 'Tag3'
    }
  ]
  onDelete(item: any): void {
    if (item.disabled === true) {
      return;
    }
    // 删除选中
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }

    this.myLogs = [...this.myLogs, `delete ${item.label}`];
  }

  onClick(): void {
    this.showInput = true;
  }

  onInputKeyup(event: KeyboardEvent): void {
    // 获取输入框的值
    const value: string = this.inputValue;

    this.inputValue = '';
    this.showInput = false;

    // 输入框为空时或者已经生成当前标签时
    if (value.trim() === '' || this.findFirstIndex(this.items, 'label', value) !== -1) {
          return;
    }

    this.items.push({label: value});
  }

  private findFirstIndex(arr: any, key: string, value: string): number {
    if (!(arr instanceof Array)) {
          return -1;
    }

    return arr.findIndex((i: any) => i[key] === value);
  }
}
