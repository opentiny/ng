import { Component } from '@angular/core';
import { TiRightsItem } from '@opentiny/ng';

@Component({
  templateUrl: './rights-basic.html'
})
export class RightsBasicComponent {
  items: Array<TiRightsItem> = [
    {
      label: '灵活调整'
    },
    {
      label: '默认开启基础监控',
      tip: '默认开启基础监控的信息描述',
      tipPosition: 'bottom'
    },
    {
      label: '企业级存储',
      tip: '企业级村存储信息描述'
    },
    {
      label: '智能数据底座',
      tip: '智能数据底座信息描述'
    },
    {
      label: '不支持调整',
      tip: '负向权益信息描述',
      type: 'noSupport'
    }
  ];
}
