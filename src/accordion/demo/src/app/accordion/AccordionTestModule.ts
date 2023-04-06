import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { TiAccordionModule, TiButtonModule, TiTextareaModule } from '@opentiny/ng';

import { AccordionBasicComponent } from './AccordionBasicComponent';
import { AccordionOpenComponent } from './AccordionOpenComponent';
import { AccordionClassComponent } from './AccordionClassComponent';
import { AccordionClickToggleComponent } from './AccordionClickToggleComponent';
import { AccordionCloseOthersComponent } from './AccordionCloseOthersComponent';
import { AccordionDisabledComponent } from './AccordionDisabledComponent';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TiAccordionModule,
    TiTextareaModule,
    TiButtonModule,
    RouterModule.forChild(AccordionTestModule.ROUTES)
  ],
  declarations: [
    AccordionBasicComponent,
    AccordionOpenComponent,
    AccordionClassComponent,
    AccordionClickToggleComponent,
    AccordionCloseOthersComponent,
    AccordionDisabledComponent
  ]
})
export class AccordionTestModule {
  static readonly LINKS: Array<object> = [
    { href: 'components/TiAccordionComponent.html', label: 'Accordion' },
    {
      href: 'components/TiAccordionHeadComponent.html',
      label: 'AccordionHead'
    },
    {
      href: 'components/TiAccordionItemComponent.html',
      label: 'AccordionItem'
    }
  ];
  static readonly ROUTES: Routes = [
    {
      path: 'accordion/accordion-basic',
      component: AccordionBasicComponent
    },
    {
      path: 'accordion/accordion-open',
      component: AccordionOpenComponent
    },
    {
      path: 'accordion/accordion-class',
      component: AccordionClassComponent
    },
    {
      path: 'accordion/accordion-click-toggle',
      component: AccordionClickToggleComponent
    },
    {
      path: 'accordion/accordion-close-others',
      component: AccordionCloseOthersComponent
    },
    {
      path: 'accordion/accordion-disabled',
      component: AccordionDisabledComponent
    }
  ];
}
