import { Component } from '@angular/core';

@Component({
  template: ` <ti-spinner [id]="elementId" [(ngModel)]="pinnerValue"></ti-spinner> `
})
export class SpinnerIdComponent {
  elementId: string = 'spinner';
  pinnerValue: number = 12;
}
