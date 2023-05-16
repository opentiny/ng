import { Component } from '@angular/core';
import { TiTheme } from '@opentiny/ng';
@Component({
  templateUrl: './theme-palette.html'
})
export class ThemePaletteComponent {
  tiBaseColorBrand6: any = '#3b9656';
  ngModelChange(): void {
    TiTheme.setBrandColor(this.tiBaseColorBrand6);
  }
}
