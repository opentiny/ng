import { Component } from '@angular/core';

@Component({
  templateUrl: `./upload-props.html`,
})
export class UploadPropsComponent {
  public isOpen: boolean = true;
  public showUploadList: boolean = true;
  public showErrorMessage: boolean = true;
  initFiles: Array<any> = [
    {
      name: 'demo.txt',
      allowDelete: false,
    },
    {
      name: 'demo.sh',
    }
  ];
  changeDisabled(): void {
    this.isOpen = !this.isOpen;
  }
  changeShowList(): void {
    this.showUploadList = !this.showUploadList;
  }
  changeShowError(): void {
    this.showErrorMessage = !this.showErrorMessage;
  }
}
