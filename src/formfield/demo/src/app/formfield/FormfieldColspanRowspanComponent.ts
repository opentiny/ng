import { Component } from '@angular/core';

@Component({
  templateUrl: './formfield-colspan-rowspan.html'
})
export class FormfieldColspanRowspanComponent {
  colsNumber: number = 3;
  colsGap: Array<string> = ['100px', '120px'];
  checkboxValue: boolean = true;
  inputValueyle: string = 'hello tiny';
}
