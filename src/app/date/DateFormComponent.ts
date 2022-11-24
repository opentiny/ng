import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  templateUrl: './date-form.html',
})
export class DateFormComponent {
  myFormControls: FormGroup;

  ngOnInit(): void {
    this.myFormControls = new FormGroup({
      // 初始化值为null
      field1: new FormControl(null),
      // 初始化值为正常日期
      field2: new FormControl(new Date(2025, 8, 27)),
    });
  }

  onNgModelChange(model: Date): void {
    console.log(model, 'model');
  }
}
