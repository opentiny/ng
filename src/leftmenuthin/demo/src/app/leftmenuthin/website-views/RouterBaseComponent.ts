import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  template: ''
})
export class RouterBaseWebsiteViewsComponent {
  @Input() queryParams: string;
  @Output() readonly routerChange: EventEmitter<string> = new EventEmitter();
  onClick(): void {
    this.routerChange.emit();
  }
}
