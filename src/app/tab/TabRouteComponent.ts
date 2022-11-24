import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  UrlTree
} from '@angular/router';

@Component({
  template: `
    <div style="color: red">
      Welcome to School!
    </div>
  `
})
export class SchoolComponent {}

@Component({
  template: `
    <div>
      Welcome to home!
    </div>
  `
})
export class HomeComponent {}

@Component({
  templateUrl: './tab-route.html'
})
export class TabRouteComponent {
  tabs: any = [
    {
      title: 'home',
      active: false,
      onActiveChange: (isActive: boolean, title: string): void => {
        if (isActive) {
          this.router.navigate([title], { relativeTo: this.activeRoute });
        }
      }
    },
    {
      title: 'school',
      active: true,
      onActiveChange: (isActive: boolean, title: string): void => {
        if (isActive) {
          this.router.navigate([title], { relativeTo: this.activeRoute });
        }
      }
    }
  ];

  private urlArray: Array<UrlTree> = this.getUrlTree(this.router);
  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    // 页面回退时，监听当前路由设置激活项
    router.events.forEach((event: any) => {
      if (event instanceof NavigationEnd) {
        const index: number = this.urlArray.findIndex((url: UrlTree) => {
          return this.router.isActive(url, false);
        });

        if (this.tabs[index]) {
          this.tabs[index].active = true;
        }
      }
    });
  }

  private getUrlTree(router: Router): Array<UrlTree> {
    const urlArry: Array<UrlTree> = [];
    for (const tab of this.tabs) {
      const url: UrlTree = router.createUrlTree([tab.title], {
        relativeTo: this.activeRoute
      });
      urlArry.push(url);
    }

    return urlArry;
  }
}
