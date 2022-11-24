import { Component } from '@angular/core';

@Component({
  templateUrl: './validation-param-change.html',
})
export class ValidationParamChangeComponent {
  myValue: string = 'a';
  myValue1: number = 11;
  equal: string = 'aa';
  number: boolean = true;

  onClick(): void {
    this.equal = 'bb';
  }

  onClick1(): void {
    this.number = !this.number;
  }
}
