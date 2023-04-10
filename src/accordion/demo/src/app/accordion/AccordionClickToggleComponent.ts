import { Component } from '@angular/core';

@Component({
  templateUrl: './accordion-click-toggle.html'
})
export class AccordionClickToggleComponent {
  isOpen: boolean = false;
  headClick($event: any): void {
    console.log($event);
  }
  changeState(): void {
    this.isOpen = !this.isOpen;
  }
}
