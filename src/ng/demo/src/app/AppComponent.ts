import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, ChildActivationEnd, Router } from '@angular/router';
// import { TiLog } from '@cloud/tiny3';
import { environment } from '../../../../environments/environment';

export interface DemoTab {
  title: string;
  src: any;
  active?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent {
  constructor(router: Router) {
    // 日志控制
    // TiLog.setLevel(environment.production ? TiLog.LEVEL_OFF : TiLog.LEVEL_LOG);

    router.events.subscribe((event: any) => {
      if (event instanceof ChildActivationEnd) {
        const snapshot: ActivatedRouteSnapshot = event.snapshot;
        const routerPath: string = snapshot.firstChild.routeConfig.path;

        // 设置网页标题
        const pathArray: Array<string> = routerPath.split('/');
        document.getElementsByTagName('title')[0].innerText = pathArray[pathArray.length - 1];
      }
    });
  }
}
