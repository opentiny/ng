import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftmenuthinWebsiteComponent } from './LeftmenuthinWebsiteComponent';
import { TiIconModule } from '@opentiny/ng-icon';
import { TiOutlineModule } from '@opentiny/ng-outline';

@NgModule({
  imports: [CommonModule, TiIconModule, TiOutlineModule],
  exports: [LeftmenuthinWebsiteComponent],
  declarations: [LeftmenuthinWebsiteComponent]
})
export class LeftmenuthinWebsiteModule {}
export { LeftmenuthinWebsiteComponent } from './LeftmenuthinWebsiteComponent';
