import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLogComponent } from './DemoLogComponent';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [DemoLogComponent],
  declarations: [DemoLogComponent]
})
export class DemoLogModule {
}
export { DemoLogComponent } from './DemoLogComponent';
