import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  templateUrl: './accordion-class.html',
  styles: [
    '.headClass {background-color: #DDDDDD !important}',
    '.bodyClass {color: blue !important}',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AccordionClassComponent {
  headClass: string = 'headClass';
  bodyClass: string = 'bodyClass';
}
