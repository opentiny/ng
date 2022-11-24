import { Component } from '@angular/core';
const DEFAULTVALUE = 'hello tiny';
@Component({
  templateUrl: './formfield-label.html',
})
export class FormfieldLabelComponent {
  labelName: string = '输入框：';
  labelWidth: string = '200px';

  inputValue: string = DEFAULTVALUE;
  customInputValue: string = DEFAULTVALUE;
  labelWidthInputValue: string = DEFAULTVALUE;

  clickHandle() :void {
    this.labelName = '自定义 Label：'
  }
}
