import { TiTimelineOption } from '@opentiny/ng';
import { Component } from '@angular/core';

@Component({
  templateUrl: './timeline-test.html'
})
export class TimelineTestComponent {
  activeIndex: number = 4;
  activeIndex1: number = 0;
  options: Array<TiTimelineOption> = [
    {
      label: '部署准备',
      isTitle: true
    },
    {
      label: '下发部署任务',
      time: '2021年3月19日  11:30:26'
    },
    {
      label: '服务器部署',
      iconTip: 'tip',
      isTitle: true
    },
    {
      label: '分配服务器',
      time: '2021年3月19日  11:35:26'
    },
    {
      label: '部署服务器',
      time: '2021年3月19日  11:36:26'
    },
    {
      label: '网络配置',
      isTitle: true
    },
    {
      label: '绑定EIP',
      time: '2021年3月19日  11:40:26'
    },
    {
      label: '绑定安全组',
      time: '2021年3月19日  11:45:26',
      errorMessage: `失败原因：链接超时<a href="#" class="link">查看解决方案</a>`
    },
    {
      label: '绑定设备IP',
      time: '2021年3月19日  11:48:26'
    },
    {
      label: '实例发放',
      isTitle: true
    },
    {
      label: '开始发放实例',
      time: '2021年3月19日  11:50:26'
    }
  ];
  options1: Array<TiTimelineOption> = [
    {
      label: '部署准备',
      isTitle: true
    },
    {
      label: '下发部署任务',
      time: '2021年3月19日  11:30:26'
    },
    {
      label: '服务器部署',
      iconTip: 'tip',
      isTitle: true
    },
    {
      label: '分配服务器',
      time: '2021年3月19日  11:35:26'
    },
    {
      label: '部署服务器',
      time: '2021年3月19日  11:36:26'
    },
    {
      label: '网络配置',
      isTitle: true
    },
    {
      label: '绑定EIP',
      time: '2021年3月19日  11:40:26'
    },
    {
      label: '绑定安全组',
      time: '2021年3月19日  11:45:26',
      errorMessage: `失败原因：链接超时<a href="#" class="link">查看解决方案</a>`
    },
    {
      label: '绑定设备IP',
      time: '2021年3月19日  11:48:26'
    },
    {
      label: '实例发放',
      isTitle: true
    },
    {
      label: '开始发放实例',
      time: '2021年3月19日  11:50:26'
    }
  ];
  changeActiveStep(): void {
    this.activeIndex = 7;
    this.activeIndex1 = 7;
  }
  changeDanger(): void {
    this.options[7].type = 'danger';
  }
}
