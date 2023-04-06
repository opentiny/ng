import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TiHalfmodalComponent, TiHalfmodalService } from '@opentiny/ng';
@Component({
  templateUrl: './halfmodal-async.html',
  styleUrls: ['./halfmodalTest.less']
})
export class HalfmodalAsyncComponent {
  constructor(private tiHalfmodalservice: TiHalfmodalService) {}
  @ViewChild('service1', { static: false }) tempRef: TemplateRef<any>;
  click(halfmodal: TiHalfmodalComponent): void {
    setTimeout((): void => {
      halfmodal.show();
    }, 1000);
  }

  click1(): void {
    setTimeout((): void => {
      this.tiHalfmodalservice.open(this.tempRef, {
        backdrop: false,
        width: '450px',
        closeIcon: true,
        dismiss: (): void => {
          console.log('dismiss');
        }
      });
    }, 1000);
  }
}
