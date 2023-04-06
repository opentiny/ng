import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiImagepreviewModule } from '@opentiny/ng';

import { ImagepreviewBasicComponent } from './ImagepreviewBasicComponent';

@NgModule({
  imports: [CommonModule, TiImagepreviewModule, TiButtonModule, RouterModule.forChild(ImagepreviewTestModule.ROUTES)],
  declarations: [ImagepreviewBasicComponent]
})
export class ImagepreviewTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiImagepreviewComponent.html', label: 'Icon' }];
  static readonly ROUTES: Routes = [
    {
      path: 'imagepreview/imagepreview-basic',
      component: ImagepreviewBasicComponent
    }
  ];
}
