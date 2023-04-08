import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './slider-formcontrol.html',
  encapsulation: ViewEncapsulation.None
})
export class SliderFormcontrolComponent implements OnInit {
  value: number = 6;
  value1: number = 2;
  value2: number = 10;
  singleValue: string = '';
  rangeValue: string = '';
  min: number = 1;
  max: number = 12;
  scales: Array<string> = ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '1年', '2年', '3年'];
  sliderForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.sliderForm = this.fb.group({
      singleValue: `${this.value}`,
      rangeValue: `${this.value1};${this.value2}`
    });
  }
}
