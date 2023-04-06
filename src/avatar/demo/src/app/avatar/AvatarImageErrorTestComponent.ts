import { Component } from '@angular/core';

@Component({
  templateUrl: './avatar-image-error-test.html'
})
export class AvatarImageErrorTestComponent {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];
  imgUrl: string = `${this.baseUrl}assets/nav_logo/logo.png`;
}
