import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiButtonModule, TiSwitchModule, TiTextModule, TiUploadModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { UploadBasicComponent } from './UploadBasicComponent';
import { UploadButtonComponent } from './UploadButtonComponent';
import { UploadPropsComponent } from './UploadPropsComponent';
import { UploadAutoUploadComponent } from './UploadAutoUploadComponent';
import { UploadBatchSendComponent } from './UploadBatchSendComponent';
import { UploadEventComponent } from './UploadEventComponent';
import { UploadFilterComponent } from './UploadFilterComponent';
import { UploadFormDataComponent } from './UploadFormDataComponent';
import { UploadServiceComponent } from './UploadServiceComponent';
import { UploadSingleComponent } from './UploadSingleComponent';
import { UploadServiceTestComponent } from './UploadServiceTestComponent';
import { UploadInputFieldTestComponent } from './UploadInputFieldTestComponent';
import { UploadButtonTestComponent } from './UploadButtonTestComponent';
import { UploadCaseTestComponent } from './UploadCaseTestComponent';
import { UploadBeforeremoveComponent } from './UploadBeforeremoveComponent';
import { UploadChangesComponent } from './UploadChangesComponent';
import { UploadCustomComponent } from './UploadCustomComponent';
import { UploadInitfilesTestComponent } from './UploadInitfilesTestComponent';
import { UploadChunksizeComponent } from './UploadChunksizeComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiTextModule,
    TiButtonModule,
    TiUploadModule,
    TiSwitchModule,
    DemoLogModule,
    RouterModule.forChild(UploadTestModule.ROUTES)
  ],
  declarations: [
    UploadBasicComponent,
    UploadButtonComponent,
    UploadPropsComponent,
    UploadServiceComponent,
    UploadAutoUploadComponent,
    UploadFormDataComponent,
    UploadFilterComponent,
    UploadSingleComponent,
    UploadBatchSendComponent,
    UploadEventComponent,
    UploadServiceTestComponent,
    UploadInputFieldTestComponent,
    UploadButtonTestComponent,
    UploadBeforeremoveComponent,
    UploadChangesComponent,
    UploadCaseTestComponent,
    UploadCustomComponent,
    UploadInitfilesTestComponent,
    UploadChunksizeComponent
  ]
})
export class UploadTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiUploadComponent.html', label: 'Upload' },
    { href: 'directives/TiFileSelectDirective.html', label: 'FileSelect' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'upload/upload-basic',
      component: UploadBasicComponent
    },
    {
      path: 'upload/upload-button',
      component: UploadButtonComponent
    },
    {
      path: 'upload/upload-props',
      component: UploadPropsComponent
    },
    {
      path: 'upload/upload-service',
      component: UploadServiceComponent
    },
    {
      path: 'upload/upload-custom',
      component: UploadCustomComponent
    },
    {
      path: 'upload/upload-auto-upload',
      component: UploadAutoUploadComponent
    },
    {
      path: 'upload/upload-form-data',
      component: UploadFormDataComponent
    },
    {
      path: 'upload/upload-filter',
      component: UploadFilterComponent
    },
    {
      path: 'upload/upload-single',
      component: UploadSingleComponent
    },
    {
      path: 'upload/upload-batch-send',
      component: UploadBatchSendComponent
    },
    {
      path: 'upload/upload-beforeRemove',
      component: UploadBeforeremoveComponent
    },
    {
      path: 'upload/upload-event',
      component: UploadEventComponent
    },
    {
      path: 'upload/upload-changes',
      component: UploadChangesComponent
    },
    { path: 'upload/upload-chunksize', component: UploadChunksizeComponent },
    {
      path: 'upload/uploadupload-service-test',
      component: UploadServiceTestComponent
    },
    {
      path: 'upload/upload-input-field-test',
      component: UploadInputFieldTestComponent
    },
    { path: 'upload/upload-button-test', component: UploadButtonTestComponent },
    { path: 'upload/upload-case-test', component: UploadCaseTestComponent },
    {
      path: 'upload/upload-initfiles-test',
      component: UploadInitfilesTestComponent
    }
  ];
}
