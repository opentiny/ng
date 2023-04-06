import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TiCardModule, TiGridModule } from '@opentiny/ng';

import { DemoLogModule } from '../../../../../ng/demolog/DemoLogModule';
import { CardAddComponent } from './CardAddComponent';
import { CardBasicComponent } from './CardBasicComponent';
import { CardGridComponent } from './CardGridComponent';
import { CardGrid2Component } from './CardGrid2Component';
import { CardHeaderComponent } from './CardHeaderComponent';

@NgModule({
  declarations: [CardBasicComponent, CardAddComponent, CardGridComponent, CardGrid2Component, CardHeaderComponent],
  imports: [CommonModule, TiCardModule, TiGridModule, DemoLogModule, RouterModule.forChild(CardTestModule.ROUTES)]
})
export class CardTestModule {
  static readonly LINKS: Array<object> = [{ href: 'components/TiCardComponent.html', label: 'Card' }];
  public static readonly ROUTES: Routes = [
    { path: 'card/card-basic', component: CardBasicComponent },
    { path: 'card/card-add', component: CardAddComponent },
    { path: 'card/card-header', component: CardHeaderComponent },
    { path: 'card/card-grid', component: CardGridComponent },
    { path: 'card/card-grid2', component: CardGrid2Component }
  ];
}
