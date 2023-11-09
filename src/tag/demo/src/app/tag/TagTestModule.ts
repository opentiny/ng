import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiButtonModule, TiIconModule, TiTagModule, TiTextModule } from '@opentiny/ng';
import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';

import { TagBasicComponent } from './TagBasicComponent';
import { TagDisabledComponent } from './TagDisabledComponent';
import { TagEditComponent } from './TagEditComponent';
import { TagDefaultComponent } from './TagDefaultComponent';
import { TagEventsComponent } from './TagEventsComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiIconModule,
    TiTagModule,
    TiButtonModule,
    TiIconModule,
    TiTextModule,
    DemoLogModule,
    RouterModule.forChild(TagTestModule.ROUTES)
  ],
  declarations: [TagBasicComponent, TagDisabledComponent, TagEditComponent, TagDefaultComponent, TagEventsComponent]
})
export class TagTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiTagComponent.html', label: 'Tag' }];
  static readonly ROUTES: Routes = [
    {
      path: 'tag/tag-basic',
      component: TagBasicComponent
    },
    {
      path: 'tag/tag-disabled',
      component: TagDisabledComponent
    },
    {
      path: 'tag/tag-edit',
      component: TagEditComponent
    },
    {
      path: 'tag/tag-default',
      component: TagDefaultComponent
    },
    {
      path: 'tag/tag-events',
      component: TagEventsComponent
    }
  ];
}
