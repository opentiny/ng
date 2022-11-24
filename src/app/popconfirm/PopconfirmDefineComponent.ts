import { Component } from '@angular/core';
import { TiPopconfirmConfig } from '@opentiny/ng';

@Component({
  templateUrl: './popconfirm-define.html',
})
export class PopconfirmDefineComponent {
  popConfig1: TiPopconfirmConfig = {
    id: 'start',
    yesPrimary: false,
    content: '确定要启用吗？',
    yesText: '确认',
    noText: '取消',
    position: 'right',
  };
}
