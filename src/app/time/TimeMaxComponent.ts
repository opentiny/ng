import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
@Component({
  templateUrl: './time-max.html',
})
export class TimeMaxComponent implements OnInit {
  timeValue: string = 'sss';
  disabled: boolean = false;
  timeId: string = 'timeId';
  min: string = '8:23:27';
  max: string = '21:45:47';
  format: string = 'HH:mm:ss';
  timeForm: FormGroup;
  timeBaseValue: string = '18:22:00';
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.timeForm = this.fb.group({
      timeValue: { value: this.timeBaseValue, disabled: this.disabled },
      text1Value: new FormControl(this.timeBaseValue),
      text2Value: '1111',
    });
    this.reactiveFormTimeValueChange();
  }
  changeMaxValue(): void {
    this.max = '9:10:21';
  }
  changeDisable(): void {
    this.disabled = !this.disabled;
  }
  // 响应式表单 对value的监控
  reactiveFormTimeValueChange(): void {
    const spinnerValueControl: AbstractControl = this.timeForm.get('timeValue');
    spinnerValueControl.valueChanges.subscribe((value: string) => {
      console.log(value);
      this.timeForm.patchValue({
        text1Value: value,
      });
    });
  }
}
