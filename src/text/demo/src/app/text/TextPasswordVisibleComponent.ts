import { Component } from '@angular/core';

@Component({
  templateUrl: './text-password-visible.html'
})
export class TextPasswordVisibleComponent {
  myLogs: Array<string> = [];

  passwordValue: string = '123456';
  isVisible: boolean = false;

  visibleChange(passwordVisible: boolean): void {
    this.isVisible = passwordVisible;
    this.myLogs = [...this.myLogs, `passwordVisibleState:${passwordVisible}`];
  }

  changeVisible(): void {
    this.isVisible = !this.isVisible;
    this.myLogs = [...this.myLogs, `passwordVisibleState:${this.isVisible}`];
  }
}
