import { CanDeactivate } from '@angular/router';
import { TiLeftmenuLevel2Component } from '@opentiny/ng';

export class UnsaveGuard implements CanDeactivate<TiLeftmenuLevel2Component> {
  canDeactivate(component: TiLeftmenuLevel2Component) {
    return window.confirm('确定要离开当前菜单吗?');
  }
}
