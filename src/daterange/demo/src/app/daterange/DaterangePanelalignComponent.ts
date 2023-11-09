import { Component } from '@angular/core';
import { TiDateValue } from '@opentiny/ng';

@Component({
  templateUrl: './daterange-panelalign.html'
})
export class DaterangePanelalignComponent {
  panelAlign: 'left' | 'right' = 'right';
  value: TiDateValue = {
    begin: new Date(2015, 3, 12),
    end: new Date(2056, 2, 1)
  };
}
