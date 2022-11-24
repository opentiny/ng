import { Component } from '@angular/core';
import { TiFileItem } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-beforeRemove.html`,
})
export class UploadBeforeremoveComponent {
  url: string = '/upload';

  onBeforeRemoveItems(fileItemArry: Array<TiFileItem>): void {
    setTimeout(() => {
      fileItemArry[0].remove();
    }, 1000);
  }
}
