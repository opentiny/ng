import { Component } from '@angular/core';

@Component({
  templateUrl: './steps-adaptive-test.html',
})
export class StepsAdaptiveTestComponent {
  steps1: Array<any> = [
    {
      label: '基础配置',
    },
    {
      label: '网络系统配置',
    },
    {
      label: '其他各种配置',
    },
    {
      label: '确认配置',
    },
  ];
  steps2: Array<any> = [
    {
      label: 'API设计',
    },
    {
      label: 'API代理',
    },
    {
      label: 'API产品',
    },
    {
      label: '资产中心',
    },
  ];
  activeStep1: any = this.steps1[2];
  activeStep2: any = this.steps2[1];
  changeLabel1(): void {
    this.steps1[0].label =
      'General General General General General General General';
  }
  changeSteps1(): void {
    this.steps1 = [
      {
        label: 'dfhaashdfa dhajdh dhfahdj sd',
      },
      {
        label: 'fajksdj djfa fjasj  fjakd',
      },
      {
        label: '其他各种系统配置',
      },
      {
        label: '江山如此多娇，引无数英雄竞折腰',
      },
      {
        label: '快乐旋转',
      },
    ];
  }
  changeContainerWidht1(container: any): void {
    container.style.width = '1200px';
  }
  changeLabel2(): void {
    this.steps2[2].label =
      'General General General General General General General';
  }
  changeContainerWidht2(container: any): void {
    container.style.marginLeft = '0px';
  }
}
