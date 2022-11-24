import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './select-validgroup.html',
})
export class SelectValidgroupComponent {
  myOptions: Array<any> = [
    {
      label: '美国',
      englishname: 'America',
      disabled: true,
    },
    {
      label: '巴西',
      englishname: 'Brazil',
      disabled: false,
    },
    {
      label: '加拿大',
      englishname: 'Canada',
      disabled: true,
    },
    {
      label: '中国',
      englishname: 'China',
      disabled: false,
    },
    {
      label: '法国',
      englishname: 'France',
      disabled: true,
    },
    {
      label: '德国',
      englishname: 'Germany',
      disabled: false,
    },
    {
      label: '日本',
      englishname: 'Japan',
    },
    {
      label: '韩国',
      englishname: 'South Korea',
    },
    {
      label: '土耳其',
      englishname: 'Turkey',
    },
    {
      label: '大不列颠和北爱兰联合王国',
      englishname: 'United Kingdom',
    },
  ];

  mySelected: any;

  mySelecteds: any;

  myinputvalue: string;

  constructor(private fb: FormBuilder) {}
  myFormGroup: FormGroup;
  ngOnInit(): void {
    this.myFormGroup = this.fb.group({
      name: '',
      home: '',
      age: '',
    });
  }
  onBlurSelect(): void {
    console.log('onBlurSelect');
  }
}
