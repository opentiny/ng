import { Component, ViewEncapsulation } from '@angular/core';
import { TiSubtitleItem } from '@opentiny/ng';

@Component({
  templateUrl: './layout-detail-column.html',
  styleUrls: ['./layout.less'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutDetailColumnComponent {
  public items1: Array<TiSubtitleItem> = [
    {
      id: '1',
      label: 'ECS-name-1'
    }
  ];
  public textForm1: any = {
    // 多列
    colsNumber: 2,
    colsGap: ['150px'],

    fieldVerticalAlign: 'middle',

    firstItem: {
      label: 'ID:',
      value: '9fd3121221-fa4112'
    },
    secondItem: {
      label: '名称:',
      value: '某某产品'
    },
    thirdItem: {
      label: '描述:',
      value: 'some support services'
    },
    fourthItem: {
      label: '启动盘:',
      value: '是'
    },
    fifthItem: {
      label: '创建时间:',
      value: '2015-06-20 21:13'
    },
    sixthItem: {
      label: '挂载点:',
      value: '/dev/happy'
    }
  };
  public tabs = [
    {
      title: '基本信息',
      content:
        "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse."
    },
    { title: '云硬盘', content: 'Dynamic content 2' },
    { title: '网卡', content: 'Dynamic content 2' },
    { title: '安全组', content: 'Dynamic content 2' },
    { title: '弹性公网IP', content: 'Dynamic content 2' },
    { title: '监控', content: 'Dynamic content 2' },
    { title: '标签', content: 'Dynamic content 2' }
  ];
}
