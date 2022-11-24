import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
export interface SpinnerModel {
  min?: number;
  max?: number;
  spinnerValue?: any;
  spinnerValue1?: any;
  spinnerValue2?: any;
  spinnerValue3?: any;
  step?: number;
  format?: string;
  disable?: any;
  placeholder?: any;
  blur?: any;
  change?: any;
}
@Component({
  templateUrl: './spinner-basic-test.html',
  styleUrls: ['./spinnerTest.less'],
})
export class SpinnerBasicTestComponent implements OnInit {
  max: number = 10000;
  min: number = -400;
  spinnerModel: SpinnerModel = {
    max: this.max,
    min: this.min,
    spinnerValue: 8,
    spinnerValue1: '',
    spinnerValue2: 10,
    spinnerValue3: 10,
    step: 1,
    format: 'N2',
    disable: false,
    placeholder: `请输入${this.min}到${this.max}的数值`,
    change: (value: number): void => {
      console.log('change evt:' + value);
    },
  };
  @ViewChild('form', { static: true }) form: any;
  @ViewChild('spinner1', { static: true }) spinner1: any;
  ngForm: any;
  spinnerValue: number = 11;
  format: string = 'N4';
  spinnerForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    const baseValue: number = 1200;
    this.spinnerForm = this.fb.group({
      spinnerValue: baseValue, // 设置初始值
      text1Value: 14, // 设置初始值
      text2Value: baseValue, // 设置初始值
    });
    // 订阅响应式表单的值的改变和状态改变
    this.reactiveFormSpinnerValueChange();
    this.reactiveFormValueChanges();
    this.reactiveFormStatusChanges();
  }
  // ngModel形式（模板驱动表单）对value的监控
  changeFn(value: number): void {
    console.log('change evt:' + value);
  }
  // 响应式表单 对value的监控
  reactiveFormSpinnerValueChange(): void {
    const spinnerValueControl: AbstractControl =
      this.spinnerForm.get('spinnerValue');

    spinnerValueControl.valueChanges.subscribe((value: number) => {
      console.log(value);
      this.spinnerForm.patchValue({
        text2Value: value,
      });
    });
  }
  // 整个响应式表单监控
  reactiveFormValueChanges(): void {
    this.spinnerForm.valueChanges.subscribe((data: number) => {
      console.log(data);
    });
  }
  reactiveFormStatusChanges(): void {
    this.spinnerForm.statusChanges.subscribe((states: any) => {
      console.log(states);
    });
  }
  focusFn($event: any): void {
    console.log('focusEvent');
  }
  blurFn($event: any): void {
    console.log('blurEvent');
  }
  changeValue(): void {
    this.spinnerModel.spinnerValue = -401;
    console.log(this.spinnerModel.spinnerValue);
  }
  changeReactiveValue(): void {
    this.spinnerForm.patchValue({
      spinnerValue: 1300, // 设置初始值
    });
  }
  changeMax(): void {
    this.spinnerModel.max = 0;
  }
  changeMin(): void {
    this.spinnerModel.min = 20;
  }
  changeDisable(): void {
    this.spinnerModel.disable = !this.spinnerModel.disable;
  }
  changePlaceholder(): void {
    this.spinnerModel.placeholder = 'Please input the number from -100 to 100.';
  }
  focusSpinner1(): void {
    const spinner1: any = this.spinner1;
    console.log(spinner1);
    spinner1.focus();
    setTimeout(() => {
      spinner1.blur();
    }, 1000);
  }
}
