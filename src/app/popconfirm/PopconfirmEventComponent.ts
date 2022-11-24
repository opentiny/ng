import { Component } from '@angular/core';
import { TiPopconfirmConfig } from '@opentiny/ng';

@Component({
  templateUrl: './popconfirm-event.html',
})
export class PopconfirmEventComponent {
  myLogs: Array<string> = [];
  popConfig: TiPopconfirmConfig = {
    id: 'delete',
    content: '确定要删除该安全组规则吗?',
    close: (data: any): void => {
      // 可通过data接口传递参数
      this.myLogs = [...this.myLogs, '确认删除'];
    },
    dismiss: (data: any): void => {
      this.myLogs = [...this.myLogs, '否认删除'];
    },
  };
}
