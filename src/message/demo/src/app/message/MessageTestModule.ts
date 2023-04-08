import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiMessageModule } from '@opentiny/ng';

import { MessageContentComponent, TestComponent } from './MessageContentComponent';
import { MessageTypeComponent } from './MessageTypeComponent';
import { MessageBtnComponent } from './MessageBtnComponent';
import { MessageTitleComponent } from './MessageTitleComponent';
import { MessageBasicComponent } from './MessageBasicComponent';
import { MessageBtnTestComponent } from './MessageBtnTestComponent';
import { MessageIdComponent } from './MessageIdComponent';
import { MessageSecurityComponent } from './MessageSecurityComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiMessageModule,
    TiButtonModule,
    RouterModule.forChild(MessageTestModule.ROUTES)
  ],
  declarations: [
    MessageContentComponent,
    MessageBasicComponent,
    MessageBtnTestComponent,
    MessageTypeComponent,
    TestComponent,
    MessageBtnComponent,
    MessageTitleComponent,
    MessageIdComponent,
    MessageSecurityComponent
  ],
  entryComponents: [TestComponent]
})
export class MessageTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiMessageComponent.html', label: 'Message' },
    {
      href: 'components/TiContentWrapperComponent.html',
      label: 'ContentWrapper'
    },
    {
      href: 'directives/TiTranscludeDirective.html',
      label: 'TiTranscludeDirective'
    }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'message/message-basic',
      component: MessageBasicComponent
    },
    {
      path: 'message/message-type',
      component: MessageTypeComponent
    },
    {
      path: 'message/message-title',
      component: MessageTitleComponent
    },
    {
      path: 'message/message-content',
      component: MessageContentComponent
    },
    {
      path: 'message/message-btn',
      component: MessageBtnComponent
    },
    { path: 'message/message-btn-test', component: MessageBtnTestComponent },
    {
      path: 'message/message-id',
      component: MessageIdComponent
    },
    { path: 'message/message-security', component: MessageSecurityComponent }
  ];
}
