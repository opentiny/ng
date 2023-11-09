import { Component } from '@angular/core';

@Component({
  templateUrl: './alert-darktheme.html'
})
export class AlertDarkthemeComponent {
  public isShow: boolean = false;
  //当10000ms之后，所有的提示都消失后，显示提示信息，避免服务误认为啥都没显示。
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isShow = true;
    }, 10100);
  }
}
