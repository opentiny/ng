import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './text-disabled.html',
})
export class TextDisabledComponent {
  value: string = '长期艰苦奋斗';
  disabled: boolean = true;
}
