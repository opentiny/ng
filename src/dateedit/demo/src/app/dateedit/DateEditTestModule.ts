import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TiDateEditModule } from '@opentiny/ng';

import { DateEditComponent } from './DateEditComponent';
import { DateEditFormatComponent } from './DateEditFormatComponent';
import { DateEditMaxComponent } from './DateEditMaxComponent';
import { DateEditValueComponent } from './DateEditValueComponent';
import { DateEditMinComponent } from './DateEditMinComponent';

@NgModule({
  imports: [CommonModule, FormsModule, TiDateEditModule, RouterModule.forChild(DateeditTestModule.ROUTES)],
  declarations: [DateEditComponent, DateEditFormatComponent, DateEditMaxComponent, DateEditValueComponent, DateEditMinComponent]
})
export class DateeditTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiDateEditComponent.html', label: 'DateEdit' }];
  static readonly ROUTES: Routes = [
    { path: 'dateedit/dateedit-basic', component: DateEditComponent },
    { path: 'dateedit/dateedit-value', component: DateEditValueComponent },
    { path: 'dateedit/dateedit-format', component: DateEditFormatComponent },
    { path: 'dateedit/dateedit-max', component: DateEditMaxComponent },
    { path: 'dateedit/dateedit-min', component: DateEditMinComponent }
  ];
}
