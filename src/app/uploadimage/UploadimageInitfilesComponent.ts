import { Component } from '@angular/core';
import { TiUploadimageInitFile } from '@opentiny/ng';

@Component({
  templateUrl: `./uploadimage-initfiles.html`,
})
export class UploadimageInitfilesComponent {
  baseUrl: string = window["DEPLOY_URL"] + window["PUBLIC_URL"];
  initFiles: Array<TiUploadimageInitFile> = [
    {
      name: 'first.jpg',
      previewUrl: `${this.baseUrl}assets/uploadimage/1.jpg`,
    },
    {
      name: 'second.jpg',
      previewUrl: `${this.baseUrl}assets/uploadimage/2.jpg`,
    },
    {
      name: 'third.jpg',
      previewUrl: `${this.baseUrl}assets/uploadimage/3.jpg`,
    },
  ];
}
