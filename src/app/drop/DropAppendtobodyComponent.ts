import { Component } from '@angular/core';
import { TiPositionType } from '@opentiny/ng';

@Component({
  templateUrl: './drop-appendtobody.html',
})
export class DropAppendtobodyComponent {
  positions: Array<TiPositionType> = [
    'top',
    'top-left',
    'top-right',
    'bottom',
    'bottom-left',
    'bottom-right',
    'left',
    'left-top',
    'left-bottom',
    'right',
    'right-top',
    'right-bottom',
    'center',
  ];
  position: TiPositionType = 'top';
  positionFn = () => {
    return this.position;
  };
  change(item): void {
    this.position = item;
  }
}
