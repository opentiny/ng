import { Component } from '@angular/core';

@Component({
  templateUrl: './avatar-style.html'
})
export class AvatarStyleComponent {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];
  imgUrl: string = `${this.baseUrl}assets/nav_logo/logo.png`;
}
