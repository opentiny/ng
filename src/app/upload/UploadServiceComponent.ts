import { Component } from '@angular/core';
import {
  TiFileInfo,
  TiFileItem,
  TiUploadConfig,
  TiUploadRef,
  TiUploadService,
} from '@opentiny/ng';

@Component({
  templateUrl: './upload-service.html',
})
export class UploadServiceComponent {
  uploader: TiUploadRef;
  constructor(uploaderService: TiUploadService) {
    const config: TiUploadConfig = {
      url: '/upload',
      onAddItemFailed: (
        fileObject: TiFileInfo,
        validResults: Array<string>
      ): void => {
        console.log('onAddItemFailed');
        console.log('onAddItemFailed.fileObject:', fileObject);
        console.log('onAddItemFailed.validResults:', validResults);
      },
      onAddItemSuccess: (fileItem: TiFileItem): void => {
        // 需要给每个文件设置allowDelete和allowReload才能调用相应的事件
        // 单文件上传需要设置allowDelete = true才能替换原有的文件
        fileItem.allowDelete = true;
        fileItem.allowReload = true;
      },
      onBeforeSendItems: (fileItems: Array<TiFileItem>): void => {
        for (let i: number = 0; i < fileItems.length; i++) {
          fileItems[i].formData = {
            data: `data${i}`,
          };
        }
      },
      onProgressItems: (
        fileItems: Array<TiFileItem>,
        progress: number
      ): void => {
        console.log(`onProgressItems`);
        console.log('onProgressItems.fileItems:', fileItems);
        console.log('onProgressItems.progress:', progress);
      },
      onCompleteItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        console.log('onCompleteItems');
        console.log('onCompleteItems.fileItems:', fileItems);
        console.log(`onCompleteItems.response:${response}`);
        console.log(`onCompleteItems.status:${status}`);
      },
      onSuccessItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        // 根据状态码和返回消息设置详情信息
        console.log('onSuccessItems');
        console.log('onSuccessItems.fileItems:', fileItems);
        console.log(`onSuccessItems.response:${response}`);
        console.log(`onSuccessItems.status:${status}`);
      },
      onErrorItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        // 根据状态码和返回消息设置详情信息
        console.log('onErrorItems');
        console.log('onErrorItems.fileItems:', fileItems);
        console.log(`onErrorItems.response:${response}`);
        console.log(`onErrorItems.status:${status}`);
      },
      onCancelItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        console.log('onCancelItems');
        console.log('onCancelItems.fileItems:', fileItems);
        console.log(`onCancelItems.response:${response}`);
        console.log(`onCancelItems.status:${status}`);
      },
      onRemoveItems: (fileItems: Array<TiFileItem>): void => {
        console.log('onRemoveItems');
        console.log('onRemoveItems.fileItems:', fileItems);
      },
      onCompleteAllItems: (fileItems: Array<TiFileItem>): void => {
        console.log('onCompleteAllItems');
        console.log('onCompleteAllItems.fileItems', fileItems);
      },
    };
    this.uploader = uploaderService.create(config);
  }
}
