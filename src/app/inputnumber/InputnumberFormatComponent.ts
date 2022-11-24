import { Component } from '@angular/core';

@Component({
  templateUrl: './inputnumber-format.html',
})
export class InputnumberFormatComponent {
  format: string = 'n2';
  formatValue: number = 33333.45678;
}
