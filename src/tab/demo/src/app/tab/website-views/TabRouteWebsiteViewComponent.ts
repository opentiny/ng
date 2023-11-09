import { Component } from '@angular/core';

@Component({
  template: ` <div style="color: red">Welcome to School!</div> `
})
export class SchoolComponent {}

@Component({
  template: ` <div>Welcome to home!</div> `
})
export class HomeComponent {}

@Component({
  templateUrl: './tab-route-website-view.html'
})
export class TabRouteWebsiteViewComponent {
  tabs: any = [
    {
      title: 'home',
      active: false
    },
    {
      title: 'school',
      active: true
    }
  ];
}
