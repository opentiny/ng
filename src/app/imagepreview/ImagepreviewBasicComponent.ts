import { Component, ViewEncapsulation } from '@angular/core';

import {
  TiFilePreviewInfo,
  TiImagepreviewComponent,
  TiModalService,
} from '@opentiny/ng';

@Component({
  templateUrl: './imagepreview-basic.html',
  styleUrls: ['./imagepreview.less'],
  encapsulation: ViewEncapsulation.None, // 要想设置的样式生效，此处必须配置成 ViewEncapsulation.None
})
export class ImagepreviewBasicComponent {
  files: Array<TiFilePreviewInfo> = [
    {
      previewUrl: 'assets/zoom/1.jpg',
    },
    {
      previewUrl: 'assets/zoom/3.jpg',
    },
    {
      previewUrl: 'assets/zoom/1.jpg',
    },
    {
      previewUrl: 'assets/zoom/3.jpg',
    },
  ];

  constructor(private tiModal: TiModalService) {}

  showImagepreview(): void {
    this.tiModal.open(TiImagepreviewComponent, {
      id: 'productPreviewModal',
      modalClass: 'tp-product-preview-modal',
      context: {
        index: 0, // 当前文件索引
        fileList: this.files,
      },
    });
  }
}
