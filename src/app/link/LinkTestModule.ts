import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LinkNavigationComponent } from './LinkNavigationComponent';
import { LinkRichtextComponent } from './LinkRichtextComponent';

@NgModule({
  imports: [RouterModule.forChild(LinkTestModule.ROUTES)],
  declarations: [LinkNavigationComponent]
})
export class LinkTestModule {
  static readonly LINKS: Array<object> = [];
  static readonly ROUTES: Routes = [
    {
      path: 'link/link-navigation',
      component: LinkNavigationComponent
    },
    {
      path: 'link/link-richtext',
      component: LinkRichtextComponent
    }
  ];
}
