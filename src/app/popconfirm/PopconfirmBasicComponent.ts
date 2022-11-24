import { Component} from '@angular/core';
import { TiPopconfirmConfig } from '@opentiny/ng';
@Component({
  templateUrl: './popconfirm-basic.html',
})
export class PopconfirmBasicComponent {
  popConfig: TiPopconfirmConfig = {
    id: 'delete',
    content: '确定要删除该安全组规则吗?',
  };
}
