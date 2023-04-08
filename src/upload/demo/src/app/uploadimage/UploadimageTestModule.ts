import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiAlertModule, TiButtonModule, TiIconModule, TiTipModule, TiUploadModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { UploadimageBasicComponent } from './UploadimageBasicComponent';
import { UploadimageAutoUploadComponent } from './UploadimageAutoUploadComponent';
import { UploadimageMaxcountComponent } from './UploadimageMaxcountComponent';
import { UploadimageDeletableComponent } from './UploadimageDeletableComponent';
import { UploadimageEventComponent } from './UploadimageEventComponent';
import { UploadimageDragComponent } from './UploadimageDragComponent';
import { UploadimageFilterComponent } from './UploadimageFilterComponent';
import { UploadimageDisabledComponent } from './UploadimageDisabledComponent';
import { UploadimageTemplateComponent } from './UploadimageTemplateComponent';
import { UploadimageInitfilesComponent } from './UploadimageInitfilesComponent';
import { UploadimageChangesComponent } from './UploadimageChangesComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiTipModule,
    TiIconModule,
    TiUploadModule,
    TiAlertModule,
    TiButtonModule,
    DemoLogModule,
    RouterModule.forChild(UploadimageTestModule.ROUTES)
  ],
  declarations: [
    UploadimageBasicComponent,
    UploadimageAutoUploadComponent,
    UploadimageMaxcountComponent,
    UploadimageDeletableComponent,
    UploadimageEventComponent,
    UploadimageDragComponent,
    UploadimageFilterComponent,
    UploadimageDisabledComponent,
    UploadimageTemplateComponent,
    UploadimageInitfilesComponent,
    UploadimageChangesComponent
  ]
})
export class UploadimageTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiUploadimageComponent.html', label: 'Uploadimage' }];
  static readonly ROUTES: Routes = [
    {
      path: 'uploadimage/uploadimage-basic',
      component: UploadimageBasicComponent
    },
    {
      path: 'uploadimage/uploadimage-filter',
      component: UploadimageFilterComponent
    },
    {
      path: 'uploadimage/uploadimage-maxcount',
      component: UploadimageMaxcountComponent
    },
    {
      path: 'uploadimage/uploadimage-deletable',
      component: UploadimageDeletableComponent
    },
    {
      path: 'uploadimage/uploadimage-event',
      component: UploadimageEventComponent
    },
    {
      path: 'uploadimage/uploadimage-initfiles',
      component: UploadimageInitfilesComponent
    },
    {
      path: 'uploadimage/uploadimage-changes',
      component: UploadimageChangesComponent
    },
    {
      path: 'uploadimage/uploadimage-drag',
      component: UploadimageDragComponent
    },
    {
      path: 'uploadimage/uploadimage-disabled',
      component: UploadimageDisabledComponent
    },
    {
      path: 'uploadimage/uploadimage-template',
      component: UploadimageTemplateComponent
    }
  ];
}
