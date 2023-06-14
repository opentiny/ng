import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TiIconModule, TiLabeleditorModule, TiButtonModule, TiValidationModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { LabeleditorBasicComponent } from './LabeleditorBasicComponent';
import { LabeleditorAutotipComponent } from './LabeleditorAutotipComponent';
import { LabeleditorResizeComponent } from './LabeleditorResizeComponent';
import { LabeleditorMaxlengthComponent } from './LabeleditorMaxlengthComponent';
import { LabeleditorEventsComponent } from './LabeleditorEventsComponent';
import { LabeleditorValidationComponent } from './LabeleditorValidationComponent';
import { LabeleditorDisabledComponent } from './LabeleditorDisabledComponent';
import { LabeleditorMultilineSizeComponent } from './LabeleditorMultilineSizeComponent';
import { LabeleditorMaxlineComponent } from './LabeleditorMaxlineComponent';
import { LabeleditorValidationAsyncComponent } from './LabeleditorValidationAsyncComponent';
import { LabeleditorIconTipContextComponent, TemplateComponent } from './LabeleditorIcontipcontextComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiIconModule,
    TiButtonModule,
    ReactiveFormsModule,
    TiLabeleditorModule,
    TiValidationModule,
    DemoLogModule,
    RouterModule.forChild(LabeleditorTestModule.ROUTES)
  ],
  declarations: [
    LabeleditorBasicComponent,
    LabeleditorAutotipComponent,
    LabeleditorResizeComponent,
    LabeleditorMaxlengthComponent,
    LabeleditorValidationComponent,
    LabeleditorEventsComponent,
    LabeleditorDisabledComponent,
    LabeleditorMaxlineComponent,
    LabeleditorMultilineSizeComponent,
    TemplateComponent,
    LabeleditorValidationAsyncComponent,
    LabeleditorIconTipContextComponent
  ]
})
export class LabeleditorTestModule {
  static readonly ROUTES: Routes = [
    { path: 'labeleditor/labeleditor-basic', component: LabeleditorBasicComponent, data: { label: '基础' } },
    { path: 'labeleditor/labeleditor-autotip', component: LabeleditorAutotipComponent, data: { label: '智能提示' } },
    {
      path: 'labeleditor/labeleditor-iconTipContext',
      component: LabeleditorIconTipContextComponent,
      data: { label: '图标提示为插槽或组件' }
    },
    { path: 'labeleditor/labeleditor-resize', component: LabeleditorResizeComponent, data: { label: '多行文本框调整大小' } },
    { path: 'labeleditor/labeleditor-maxline', component: LabeleditorMaxlineComponent, data: { label: '最大行数' } },
    { path: 'labeleditor/labeleditor-maxlength', component: LabeleditorMaxlengthComponent, data: { label: '文本长度' } },
    { path: 'labeleditor/labeleditor-validation', component: LabeleditorValidationComponent, data: { label: '校验' } },
    { path: 'labeleditor/labeleditor-validation-async', component: LabeleditorValidationAsyncComponent, data: { label: '异步校验' } },
    { path: 'labeleditor/labeleditor-disabled', component: LabeleditorDisabledComponent, data: { label: '禁用' } },
    { path: 'labeleditor/labeleditor-events', component: LabeleditorEventsComponent, data: { label: '事件' } },
    {
      path: 'labeleditor/labeleditor-multiline-size',
      component: LabeleditorMultilineSizeComponent,
      data: { label: '多行文本框可设置宽高' }
    }
  ];
}
