import { Component } from '@angular/core';
import {
  TiFileInfo,
  TiFileItem,
  TiUploadConfig,
  TiUploadRef,
  TiUploadService,
} from '@opentiny/ng';

@Component({
  templateUrl: './upload-service-test.html',
})
export class UploadServiceTestComponent {
  uploader: TiUploadRef;
  uploader1: TiUploadRef;
  constructor(uploaderService: TiUploadService) {
    const config: TiUploadConfig = {
      url: '/upload',
      alias: 'myFileDdd',
      headers: {
        'header-tt': 'aa',
      },
      filters: [
        {
          name: 'maxCount',
          params: [5],
        },
      ],
      onAddItemFailed: (
        fileObject: TiFileInfo,
        validResults: Array<string>
      ): void => {
        console.log('onAddItemFailed');
        console.log(fileObject);
        console.log(validResults);
      },
      onAddItemSuccess: (fileItem: TiFileItem): void => {
        console.log(`filename:${fileItem.file.name}`);
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
        console.log(fileItems);
        console.log(progress);
      },
      onCompleteItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        // 根据状态码和返回消息设置详情信息
        console.log('onCompleteItems');
        console.log(fileItems);
        console.log(`response:${response}`);
        console.log(`status:${status}`);
      },
      onSuccessItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        // 根据状态码和返回消息设置详情信息
        console.log('onSuccessItems');
        console.log(fileItems);
        console.log(`response:${response}`);
        console.log(`status:${status}`);
      },
      onErrorItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        // 根据状态码和返回消息设置详情信息
        console.log('onErrorItems');
        console.log(fileItems);
        console.log(`response:${response}`);
        console.log(`status:${status}`);
      },
      onCancelItems: (
        fileItems: Array<TiFileItem>,
        response: string,
        status: number
      ): void => {
        console.log('onCancelItems');
        console.log(fileItems);
        console.log(`response:${response}`);
        console.log(`status:${status}`);
      },
      onRemoveItems: (fileItems: Array<TiFileItem>): void => {
        console.log('onRemoveItems');
        console.log(fileItems);
      },
      onCompleteAllItems: (fileItems: Array<TiFileItem>): void => {
        console.log('onCompleteAllItems');
        console.log(fileItems);
      },
    };
    this.uploader = uploaderService.create({
      ...config,
      autoUpload: true,
    });
    this.uploader1 = uploaderService.create({
      ...config,
      batchSend: true,
      autoUpload: false,
    });
  }
}
