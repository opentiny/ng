import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  templateUrl: './text-readonly.html'
})
export class TextReadonlyComponent {
  value: string = '长期艰苦奋斗';
}
