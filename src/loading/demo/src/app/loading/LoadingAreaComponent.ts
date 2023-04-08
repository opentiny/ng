import { Component } from '@angular/core';

@Component({
  templateUrl: './loading-area.html'
})
export class LoadingAreaComponent {
  showBlockLoading: boolean = false;
  showFullscreenLoading: boolean = false;
  showFullscreenLoadingWithMask: boolean = false;

  onClickShowBlockLoading(): void {
    this.showBlockLoading = true;
    setTimeout(() => {
      this.showBlockLoading = false; // 3s后关闭
    }, 3000);
  }

  onClickShowFullscreenLoading(): void {
    this.showFullscreenLoading = true;
    setTimeout(() => {
      this.showFullscreenLoading = false; // 3s后关闭
    }, 3000);
  }

  onClickShowFullscreenLoadingWithMask(): void {
    this.showFullscreenLoadingWithMask = true;
    setTimeout(() => {
      this.showFullscreenLoadingWithMask = false; // 3s后关闭
    }, 3000);
  }
}
