import { Component, ViewEncapsulation } from '@angular/core';
import { TiUploadimageInitFile } from '@opentiny/ng';

@Component({
  templateUrl: `./uploadimage-initfiles.html`,
  styles: ['.preview-modal-class { width: 400px !important; }'],
  encapsulation: ViewEncapsulation.None // 要想设置的样式生效，此处必须配置成 ViewEncapsulation.None
})
export class UploadimageInitfilesComponent {
  baseUrl: string = window['DEPLOY_URL'] + window['PUBLIC_URL'];
  initFiles: Array<TiUploadimageInitFile> = [
    {
      name: 'first.jpg',
      previewUrl: `${this.baseUrl}assets/image/1.jpg`
    },
    {
      name: 'second.jpg',
      previewUrl: `${this.baseUrl}assets/image/2.jpg`
    },
    {
      name: 'third.jpg',
      previewUrl: `${this.baseUrl}assets/image/3.jpg`
    }
  ];
}
