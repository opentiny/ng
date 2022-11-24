import { Component } from '@angular/core';
import { TiFileItem, TiFilter } from '@opentiny/ng';

@Component({
  templateUrl: `./upload-initfiles-test.html`,
})
export class UploadInitfilesTestComponent {
  initFiles: Array<any> = [
    {
      name: 'demo.txt',
    },
    {
      name: 'demo.sh',
    },
  ];
  filters: Array<TiFilter> = [
    {
      name: 'maxCount',
      params: [4],
    },
  ];
  initFiles1: Array<any> = [
    {
      name: 'demo.txt',
    },
  ];
  filters1: Array<TiFilter> = [
    {
      name: 'maxCount',
      params: [1],
    },
  ];
  onBeforeRemoveItems(fileItemArry: Array<TiFileItem>): void {
    fileItemArry[0].remove();
  }
}
