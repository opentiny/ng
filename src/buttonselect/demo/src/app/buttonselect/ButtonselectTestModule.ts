import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TiButtonselectModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { ButtonselectBasicComponent } from './ButtonselectBasicComponent';
import { ButtonselectLabelkeyComponent } from './ButtonselectLabelkeyComponent';

@NgModule({
  imports: [CommonModule, FormsModule, TiButtonselectModule, DemoLogModule, RouterModule.forChild(ButtonselectTestModule.ROUTES)],
  declarations: [ButtonselectBasicComponent, ButtonselectLabelkeyComponent]
})
export class ButtonselectTestModule {
  static readonly ROUTES: Routes = [
    {
      path: 'buttonselect/buttonselect-basic',
      component: ButtonselectBasicComponent
    },
    {
      path: 'buttonselect/buttonselect-label',
      component: ButtonselectLabelkeyComponent
    }
  ];
}
