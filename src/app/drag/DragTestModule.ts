import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiDraggableModule } from '@opentiny/ng';

import { DragTestComponent } from './DragTestComponent';
import { DragBasicComponent } from './DragBasicComponent';
import { DragServiceComponent } from './DragServiceComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TiDraggableModule,
    RouterModule.forChild(DragTestModule.ROUTES)
  ],
  declarations: [DragTestComponent, DragBasicComponent, DragServiceComponent]
})
export class DragTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'directives/TiDraggableDirective.html', label: 'Draggable' }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'drag/drag-basic',
      component: DragBasicComponent
    },
    {
      path: 'drag/drag-service',
      component: DragServiceComponent
    },
    { path: 'drag/drag-test', component: DragTestComponent }
  ];
}
