import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-isallowbeginequalend.html'
})
export class DaterangeIsallowbeginequalendComponent {
  isAllowBeginEqualEnd: boolean = false;
  value: TiDateValue = null;
}
