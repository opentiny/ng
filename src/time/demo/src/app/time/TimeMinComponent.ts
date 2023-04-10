import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  templateUrl: './time-min.html'
})
export class TimeMinComponent implements OnInit {
  timeValue: string = '9:12:45';
  min: string = '8:23:27';
  max: string = '21:45:47';
  format: string = 'HH:mm:ss';
  disabled: boolean = false;
  timeForm: FormGroup;
  timeBaseValue: string = '18:22:00';
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.timeForm = this.fb.group({
      timeValue: { value: this.timeBaseValue, disabled: this.disabled },
      text1Value: new FormControl(this.timeBaseValue),
      text2Value: '1111'
    });
    this.reactiveFormTimeValueChange();
  }
  changeMinValue(): void {
    this.min = '6:12:13';
  }
  // 响应式表单 对value的监控
  reactiveFormTimeValueChange(): void {
    const spinnerValueControl: AbstractControl = this.timeForm.get('timeValue');
    spinnerValueControl.valueChanges.subscribe((value: string) => {
      console.log(value);
      this.timeForm.patchValue({
        text1Value: value
      });
    });
  }

  // 改变time禁用装态(动态表单形式)
  changeFormGroupDisable(): void {
    this.disabled = !this.disabled;
    this.timeForm.controls['timeValue'].disable({ onlySelf: this.disabled });
    this.timeForm.controls['text1Value'].disable();
  }
}
