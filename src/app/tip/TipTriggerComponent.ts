import { Component, ViewChild } from '@angular/core';
import { TiTipDirective } from '@opentiny/ng';

@Component({
  templateUrl: './tip-trigger.html',
})
export class TipTriggerComponent {
  @ViewChild('tip', { static: true }) tipDirective: TiTipDirective;
  tipContent: string = 'click to show tip';
  show: boolean = false;
  onClick(): void {
    this.show = !this.show;
    this.show ? this.tipDirective.hide() : this.tipDirective.show();
  }
}
