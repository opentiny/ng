import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {
  TiButtonModule,
  TiFormfieldModule,
  TiIpModule,
  TiModalModule,
  TiSelectModule,
  TiSpinnerModule,
  TiTextareaModule,
  TiTextModule,
  TiValidationModule
} from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { ModalContentTempComponent } from './ModalContentTempComponent';
import { ModalContentCompComponent, ModalTestComponent } from './ModalContentCompComponent';
import { ModalEventComponent } from './ModalEventComponent';
import { ModalHeaderStyleComponent } from './ModalHeaderStyleComponent';
import { ModalClassComponent } from './ModalClassComponent';
import { ModalTwoTestComponent } from './ModalTwoTestComponent';
import { ModalTwoBackdropComponent } from './ModalTwoBackdropComponent';
import { ModalConfigTestComponent } from './ModalConfigTestComponent';
import { TestComponent } from './TestComponent';
import { ModalAnimationComponent } from './ModalAnimationComponent';
import { ModalBackdropComponent } from './ModalBackdropComponent';
import { ModalCloseIconComponent } from './ModalCloseIconComponent';
import { ModalDraggableComponent } from './ModalDraggableComponent';
import { ModalHeaderAlignComponent } from './ModalHeaderAlignComponent';
import { ModalEscComponent } from './ModalEscComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiIpModule,
    TiModalModule,
    TiButtonModule,
    TiSelectModule,
    TiTextareaModule,
    TiFormfieldModule,
    TiTextModule,
    TiValidationModule,
    TiSpinnerModule,
    DemoLogModule,
    RouterModule.forChild(ModalTestModule.ROUTES)
  ],
  declarations: [
    ModalConfigTestComponent,
    ModalContentTempComponent,
    ModalContentCompComponent,
    TestComponent,
    ModalTestComponent,
    ModalClassComponent,
    ModalTwoTestComponent,
    ModalEventComponent,
    ModalHeaderStyleComponent,
    ModalHeaderStyleComponent,
    ModalTwoBackdropComponent,
    ModalAnimationComponent,
    ModalBackdropComponent,
    ModalCloseIconComponent,
    ModalDraggableComponent,
    ModalHeaderAlignComponent,
    ModalEscComponent
  ]
})
export class ModalTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiModalComponent.html', label: 'Modal' },
    { href: 'components/TiBackdropComponent.html', label: 'Backdrop' },
    { href: 'components/TiModalBodyComponent.html', label: 'ModalBody' },
    { href: 'components/TiModalHeaderComponent.html', label: 'ModalHeader' },
    { href: 'components/TiModalFooterComponent.html', label: 'ModalFooter' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'modal/modal-content-comp',
      component: ModalContentCompComponent
    },
    {
      path: 'modal/modal-content-temp',
      component: ModalContentTempComponent
    },
    {
      path: 'modal/modal-class',
      component: ModalClassComponent
    },
    {
      path: 'modal/modal-animation',
      component: ModalAnimationComponent
    },
    {
      path: 'modal/modal-backdrop',
      component: ModalBackdropComponent
    },
    {
      path: 'modal/modal-close-icon',
      component: ModalCloseIconComponent
    },
    {
      path: 'modal/modal-draggable',
      component: ModalDraggableComponent
    },
    {
      path: 'modal/modal-header-align',
      component: ModalHeaderAlignComponent
    },
    {
      path: 'modal/modal-event',
      component: ModalEventComponent
    },
    {
      path: 'modal/modal-header-style',
      component: ModalHeaderStyleComponent
    },
    {
      path: 'modal/modal-config-test',
      component: ModalConfigTestComponent
    },
    {
      path: 'modal/modal-esc',
      component: ModalEscComponent
    },
    { path: 'modal/modal-two-backdrop', component: ModalTwoBackdropComponent },
    { path: 'modal/modal-two-test', component: ModalTwoTestComponent }
  ];
}
