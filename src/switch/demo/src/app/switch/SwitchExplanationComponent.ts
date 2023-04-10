import { Component } from '@angular/core';

@Component({
  templateUrl: './switch-explanation.html'
})
export class SwitchExplanationComponent {
  switchState: boolean = true;
  textOn: string = '编辑';
  textOff: string = '查看';
}
