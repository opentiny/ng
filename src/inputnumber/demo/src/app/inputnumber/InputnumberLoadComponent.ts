import { Component } from '@angular/core';

@Component({
  templateUrl: './inputnumber-load.html'
})
export class InputnumberLoadComponent {
  inputValue: any = undefined;
  inputValue1: any = 1234.56789;
  changeA(): void {
    this.inputValue = 123456.789;
  }
  changeB(): void {
    this.inputValue = 123456.782199;
  }
  changeC(): void {
    this.inputValue1 = 2222.4567;
  }
  changeInvalid(): void {
    this.inputValue1 = 'dfasd';
  }
  clear(): void {
    this.inputValue1 = undefined;
  }
}
