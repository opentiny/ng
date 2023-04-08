import { Component } from '@angular/core';
import { TiFilePreviewInfo } from '@opentiny/ng';

@Component({
  templateUrl: './productpreview-basic.html'
})
export class ProductpreviewBasicComponent {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];
  fileList: Array<TiFilePreviewInfo> = [
    {
      previewUrl: `${this.baseUrl}assets/image/1.jpg`
    },
    {
      previewUrl: `${this.baseUrl}assets/image/2.jpg`
    },
    {
      previewUrl: `${this.baseUrl}assets/image/3.jpg`
    },
    {
      previewUrl: `${this.baseUrl}assets/image/1.jpg`
    },
    {
      previewUrl: `${this.baseUrl}assets/image/2.jpg`
    },
    {
      previewUrl: `${this.baseUrl}assets/image/3.jpg`
    }
  ];
}
