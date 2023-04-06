import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './slider-template.html',
  encapsulation: ViewEncapsulation.None
})
export class SliderTemplateComponent {
  value: string = '2;11';
  min: number = 1;
  max: number = 12;
  scales: Array<any> = [
    {
      label: '1个月'
    },
    {
      label: '2个月'
    },
    {
      label: '3个月',
      iconName: 'discount-sup'
    },
    {
      label: '4个月'
    },
    {
      label: '5个月'
    },
    {
      label: '6个月',
      iconName: 'discount-sup'
    },
    {
      label: '7个月'
    },
    {
      label: '8个月'
    },
    {
      label: '9个月'
    },
    {
      label: '1年',
      iconName: 'discount'
    },
    {
      label: '2年',
      iconName: 'discount'
    },
    {
      label: '3年',
      iconName: 'discount'
    }
  ];
}
